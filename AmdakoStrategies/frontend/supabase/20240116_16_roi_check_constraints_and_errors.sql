-- ============================================================
-- Migration: 20240116_16_roi_check_constraints_and_errors
-- Description:
--   1. The live database has check constraints that differ from the repo
--      migrations (agreements.status did not allow 'approved'). Rebuild the
--      checks on the columns the ROI system writes so they allow the values
--      it needs, plus any value already stored.
--   2. process_monthly_roi() now returns the error for every investment it
--      could not credit, instead of only a count.
--
-- Run after migrations 13-15. Safe to re-run.
-- ============================================================

create or replace function pg_temp.widen_check(
  p_table text,
  p_column text,
  p_required text[],
  p_only_if_exists boolean
)
returns void
language plpgsql
as $$
declare
  v_constraint record;
  v_found boolean := false;
  v_allowed text;
begin
  for v_constraint in
    select conname
    from pg_constraint
    where conrelid = format('public.%I', p_table)::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ~ ('\m' || p_column || '\M')
  loop
    v_found := true;
    execute format('alter table public.%I drop constraint %I', p_table, v_constraint.conname);
  end loop;

  if not v_found and p_only_if_exists then
    return;
  end if;

  execute format(
    'select string_agg(quote_literal(v), %L order by v) from (
       select unnest($1) as v
       union
       select distinct %I::text from public.%I where %I is not null
     ) allowed',
    ', ', p_column, p_table, p_column
  )
  into v_allowed
  using p_required;

  execute format(
    'alter table public.%I add constraint %I check (%I in (%s))',
    p_table, p_table || '_' || p_column || '_check', p_column, v_allowed
  );
end;
$$;

select pg_temp.widen_check('transactions', 'type',
  array['deposit', 'withdrawal', 'profit', 'referral', 'fee', 'adjustment'], false);
select pg_temp.widen_check('transactions', 'status',
  array['pending', 'completed', 'failed', 'cancelled'], false);
select pg_temp.widen_check('investments', 'status',
  array['active', 'completed', 'pending', 'cancelled'], false);
select pg_temp.widen_check('investor_accounts', 'status',
  array['active', 'pending', 'suspended', 'inactive'], false);
select pg_temp.widen_check('notifications', 'type',
  array['investment', 'roi'], true);

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
  v_errors jsonb := '[]'::jsonb;
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
      v_errors := v_errors || jsonb_build_object(
        'investment_id', v_investment.id,
        'user_id', v_investment.user_id,
        'error', sqlerrm,
        'sqlstate', sqlstate
      );
      raise warning 'ROI processing failed for investment %: %', v_investment.id, sqlerrm;
    end;
  end loop;

  return jsonb_build_object(
    'run_date', v_run_date,
    'roi_period', v_period,
    'credited', v_credited,
    'already_processed', v_skipped,
    'failed', jsonb_array_length(v_errors),
    'errors', v_errors,
    'total_credited', v_total
  );
end;
$$;

revoke all on function public.process_monthly_roi(date) from public, anon, authenticated;
grant execute on function public.process_monthly_roi(date) to service_role;
