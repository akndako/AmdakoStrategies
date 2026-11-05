-- ============================================================
-- Migration: 20240113_13_investment_roi_processing
-- Description:
--   1. Adds confirmation fields to investments and ROI fields to transactions
--   2. Adds roi_balance to investor_accounts
--   3. Confirms an investment automatically when its agreement is approved
--      (investment row + funding transaction + investment_transactions link)
--   4. Adds process_monthly_roi(): idempotent, atomic 10% monthly ROI credit
--      on the 30th (or the month's last day when it has fewer than 30 days)
--   5. Locks financial tables so investors can only read their own rows
--
-- Run in the Supabase SQL editor. Safe to re-run.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Columns
-- ------------------------------------------------------------

alter table public.investments
  add column if not exists agreement_id uuid references public.agreements (id) on delete set null,
  add column if not exists confirmed_at timestamptz;

create unique index if not exists investments_agreement_id_key
  on public.investments (agreement_id)
  where agreement_id is not null;

create index if not exists idx_investments_confirmed
  on public.investments (status, confirmed_at);

alter table public.transactions
  add column if not exists investment_id uuid references public.investments (id) on delete set null,
  add column if not exists roi_percentage numeric(5, 2),
  add column if not exists roi_period date;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'transactions' and column_name = 'transaction_type'
  ) then
    alter table public.transactions
      add column transaction_type text generated always as (type) stored;
  end if;
end $$;

-- One ROI credit per investment per payout period.
create unique index if not exists transactions_investment_roi_period_key
  on public.transactions (investment_id, roi_period)
  where type = 'profit';

create index if not exists idx_transactions_investment_id
  on public.transactions (investment_id);

alter table public.investor_accounts
  add column if not exists roi_balance numeric(14, 2) not null default 0;

-- One account per investor, when existing data allows it.
do $$
begin
  if not exists (
    select user_id from public.investor_accounts group by user_id having count(*) > 1
  ) then
    create unique index if not exists investor_accounts_user_id_key
      on public.investor_accounts (user_id);
  else
    raise notice 'investor_accounts has duplicate user_id rows; unique index skipped';
  end if;
end $$;

-- ------------------------------------------------------------
-- 2. Helpers
-- ------------------------------------------------------------

-- Payout day for the month containing p_date: the 30th, or the last day
-- of the month when it has fewer than 30 days (February).
create or replace function public.roi_payout_date(p_date date)
returns date
language sql
immutable
as $$
  select make_date(
    extract(year from p_date)::int,
    extract(month from p_date)::int,
    least(
      30,
      extract(day from (date_trunc('month', p_date) + interval '1 month - 1 day'))::int
    )
  );
$$;

-- Most recent payout day on or before p_date.
create or replace function public.latest_roi_payout_date(p_date date)
returns date
language sql
immutable
as $$
  select case
    when p_date >= public.roi_payout_date(p_date) then public.roi_payout_date(p_date)
    else public.roi_payout_date((date_trunc('month', p_date) - interval '1 day')::date)
  end;
$$;

create or replace function public.ensure_investor_account(p_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_account_id uuid;
begin
  select id into v_account_id
  from public.investor_accounts
  where user_id = p_user_id
  order by created_at
  limit 1;

  if v_account_id is null then
    insert into public.investor_accounts (user_id, account_number, status, available_balance, roi_balance)
    values (
      p_user_id,
      'IA' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
      'active',
      0,
      0
    )
    returning id into v_account_id;
  end if;

  return v_account_id;
end;
$$;

-- ------------------------------------------------------------
-- 3. Investment confirmation on agreement approval
-- ------------------------------------------------------------

create or replace function public.confirm_agreement_investment(
  p_agreement_id uuid,
  p_notify boolean default true
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_agreement public.agreements%rowtype;
  v_investment_id uuid;
  v_transaction_id uuid;
  v_account_id uuid;
begin
  select * into v_agreement from public.agreements where id = p_agreement_id;
  if not found then
    raise exception 'Agreement % not found', p_agreement_id;
  end if;

  if v_agreement.status <> 'approved' then
    raise exception 'Agreement % is not approved', p_agreement_id;
  end if;

  select id into v_investment_id from public.investments where agreement_id = p_agreement_id;
  if v_investment_id is not null then
    return v_investment_id;
  end if;

  if coalesce(v_agreement.investment_amount, 0) <= 0 then
    raise exception 'Agreement % has no investment amount; set it before approving', p_agreement_id;
  end if;

  v_account_id := public.ensure_investor_account(v_agreement.user_id);
  update public.investor_accounts
  set status = 'active', updated_at = now()
  where id = v_account_id and status = 'pending';

  -- Adopt an unconfirmed investment of the same amount created by the old
  -- registration flow instead of creating a duplicate.
  update public.investments
  set agreement_id = p_agreement_id,
      confirmed_at = now(),
      status = 'active',
      monthly_roi = 10,
      current_value = amount,
      maturity_date = coalesce(v_agreement.maturity_date, maturity_date),
      updated_at = now()
  where id = (
    select id from public.investments
    where user_id = v_agreement.user_id
      and agreement_id is null
      and confirmed_at is null
      and amount = v_agreement.investment_amount
    order by created_at
    limit 1
  )
  returning id into v_investment_id;

  if v_investment_id is null then
    insert into public.investments (
      user_id, investment_name, description, amount, current_value, profit_loss,
      monthly_roi, status, start_date, maturity_date, agreement_id, confirmed_at
    )
    values (
      v_agreement.user_id,
      'Amdako Strategic Investment',
      'Confirmed from investment agreement',
      v_agreement.investment_amount,
      v_agreement.investment_amount,
      0,
      10,
      'active',
      coalesce(v_agreement.start_date, current_date),
      v_agreement.maturity_date,
      p_agreement_id,
      now()
    )
    returning id into v_investment_id;
  end if;

  insert into public.transactions (user_id, investment_id, type, description, amount, status, reference)
  values (
    v_agreement.user_id,
    v_investment_id,
    'deposit',
    'Investment funding confirmed',
    v_agreement.investment_amount,
    'completed',
    coalesce(
      nullif(trim(v_agreement.transaction_reference), ''),
      'INV-' || upper(substr(replace(v_investment_id::text, '-', ''), 1, 12))
    )
  )
  returning id into v_transaction_id;

  insert into public.investment_transactions (investment_id, transaction_id)
  values (v_investment_id, v_transaction_id);

  if p_notify then
    insert into public.notifications (user_id, title, message, type)
    values (
      v_agreement.user_id,
      'Investment confirmed',
      'Your investment of ₦' || to_char(v_agreement.investment_amount, 'FM999,999,999,990.00')
        || ' is confirmed. Monthly ROI is paid on the 30th (last day in February).',
      'investment'
    );
  end if;

  return v_investment_id;
end;
$$;

create or replace function public.handle_agreement_approved()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'approved' and (tg_op = 'INSERT' or old.status is distinct from 'approved') then
    perform public.confirm_agreement_investment(new.id, true);
  end if;
  return new;
end;
$$;

drop trigger if exists on_agreement_approved on public.agreements;
create trigger on_agreement_approved
  after insert or update of status on public.agreements
  for each row
  execute function public.handle_agreement_approved();

-- ------------------------------------------------------------
-- 4. Monthly ROI processing
-- ------------------------------------------------------------

-- Processes the most recent payout day on or before p_run_date (default:
-- today in Lagos). Running it daily is safe: each investment is credited at
-- most once per payout period, and a missed run is caught up next time.
-- An investment is eligible when it is active, confirmed before the payout
-- day, and not matured before it.
create or replace function public.process_monthly_roi(p_run_date date default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c_roi_percentage constant numeric := 10;
  v_run_date date := coalesce(p_run_date, (now() at time zone 'Africa/Lagos')::date);
  v_period date := public.latest_roi_payout_date(v_run_date);
  v_investment record;
  v_transaction_id uuid;
  v_account_id uuid;
  v_roi_amount numeric(14, 2);
  v_credited int := 0;
  v_skipped int := 0;
  v_failed int := 0;
  v_total numeric(14, 2) := 0;
begin
  perform pg_advisory_xact_lock(hashtext('public.process_monthly_roi'));

  for v_investment in
    select i.id, i.user_id, i.amount
    from public.investments i
    where i.status = 'active'
      and i.confirmed_at is not null
      and (i.confirmed_at at time zone 'Africa/Lagos')::date < v_period
      and (i.maturity_date is null or i.maturity_date >= v_period)
      and i.amount > 0
    order by i.confirmed_at
  loop
    begin
      v_roi_amount := round(v_investment.amount * (c_roi_percentage / 100), 2);
      v_transaction_id := null;

      insert into public.transactions (
        user_id, investment_id, type, description, amount, status,
        reference, roi_percentage, roi_period
      )
      values (
        v_investment.user_id,
        v_investment.id,
        'profit',
        'Monthly ROI for ' || to_char(v_period, 'FMMonth YYYY'),
        v_roi_amount,
        'completed',
        'ROI-' || to_char(v_period, 'YYYYMM') || '-'
          || upper(substr(replace(v_investment.id::text, '-', ''), 1, 12)),
        c_roi_percentage,
        v_period
      )
      on conflict (investment_id, roi_period) where type = 'profit' do nothing
      returning id into v_transaction_id;

      if v_transaction_id is null then
        v_skipped := v_skipped + 1;
        continue;
      end if;

      v_account_id := public.ensure_investor_account(v_investment.user_id);
      update public.investor_accounts
      set roi_balance = roi_balance + v_roi_amount,
          updated_at = now()
      where id = v_account_id;

      insert into public.notifications (user_id, title, message, type)
      values (
        v_investment.user_id,
        'Monthly ROI credited',
        '₦' || to_char(v_roi_amount, 'FM999,999,999,990.00') || ' (' || c_roi_percentage
          || '%) ROI for ' || to_char(v_period, 'FMMonth YYYY') || ' has been added to your ROI balance.',
        'roi'
      );

      v_credited := v_credited + 1;
      v_total := v_total + v_roi_amount;
    exception when others then
      v_failed := v_failed + 1;
      raise warning 'ROI processing failed for investment %: %', v_investment.id, sqlerrm;
    end;
  end loop;

  return jsonb_build_object(
    'run_date', v_run_date,
    'roi_period', v_period,
    'credited', v_credited,
    'already_processed', v_skipped,
    'failed', v_failed,
    'total_credited', v_total
  );
end;
$$;

revoke all on function public.ensure_investor_account(uuid) from public, anon, authenticated;
revoke all on function public.confirm_agreement_investment(uuid, boolean) from public, anon, authenticated;
revoke all on function public.handle_agreement_approved() from public, anon, authenticated;
revoke all on function public.process_monthly_roi(date) from public, anon, authenticated;
grant execute on function public.process_monthly_roi(date) to service_role;
grant execute on function public.confirm_agreement_investment(uuid, boolean) to service_role;

-- ------------------------------------------------------------
-- 5. Row level security: investors read their own financial data only
-- ------------------------------------------------------------

do $$
declare
  p record;
begin
  for p in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'agreements', 'investments', 'transactions',
        'investment_transactions', 'investor_accounts', 'notifications'
      )
  loop
    execute format('drop policy if exists %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

alter table public.agreements enable row level security;
alter table public.investments enable row level security;
alter table public.transactions enable row level security;
alter table public.investment_transactions enable row level security;
alter table public.investor_accounts enable row level security;
alter table public.notifications enable row level security;

revoke insert, update, delete on public.investments from anon, authenticated;
revoke insert, update, delete on public.transactions from anon, authenticated;
revoke insert, update, delete on public.investment_transactions from anon, authenticated;
revoke update, delete on public.investor_accounts from anon, authenticated;
revoke delete on public.agreements from anon, authenticated;
revoke insert, update, delete on public.notifications from anon, authenticated;
grant update (is_read) on public.notifications to authenticated;

-- Agreements: investors submit and edit their own until approved; only the
-- service role (Supabase dashboard / backend) can approve.
create policy "Investors read own agreements"
  on public.agreements for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Investors submit own pending agreements"
  on public.agreements for insert
  to authenticated
  with check ( auth.uid() = user_id and status = 'pending' );

create policy "Investors edit own unapproved agreements"
  on public.agreements for update
  to authenticated
  using ( auth.uid() = user_id and status is distinct from 'approved' )
  with check ( auth.uid() = user_id and status = 'pending' );

create policy "Investors read own investments"
  on public.investments for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Investors read own transactions"
  on public.transactions for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Investors read own investment funding records"
  on public.investment_transactions for select
  to authenticated
  using (
    exists (
      select 1 from public.investments i
      where i.id = investment_transactions.investment_id
        and i.user_id = auth.uid()
    )
  );

create policy "Investors read own investor account"
  on public.investor_accounts for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Investors open own empty investor account"
  on public.investor_accounts for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and status = 'pending'
    and coalesce(available_balance, 0) = 0
    and coalesce(roi_balance, 0) = 0
  );

create policy "Investors read own notifications"
  on public.notifications for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Investors mark own notifications read"
  on public.notifications for update
  to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- ------------------------------------------------------------
-- 6. Existing data
-- ------------------------------------------------------------

-- Approved agreements without an investment get one now. confirmed_at is
-- set to now(), so the first ROI credit is the next payout day.
do $$
declare
  a record;
begin
  for a in
    select ag.id
    from public.agreements ag
    where ag.status = 'approved'
      and coalesce(ag.investment_amount, 0) > 0
      and not exists (select 1 from public.investments i where i.agreement_id = ag.id)
  loop
    perform public.confirm_agreement_investment(a.id, false);
  end loop;
end $$;

-- Investments created directly by the old registration flow were never
-- confirmed; they stay visible as pending and earn nothing.
update public.investments
set status = 'pending', updated_at = now()
where confirmed_at is null
  and agreement_id is null
  and status = 'active';
