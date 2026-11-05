-- ============================================================
-- Migration: 20240115_15_auto_approve_signed_agreements
-- Description: An investor's agreement is approved automatically once it is
--   signed and its PDF is saved, which confirms the investment immediately
--   (via handle_agreement_approved from migration 13).
--
--   For investors (API requests with an authenticated/anon JWT) the database
--   decides the status: 'approved' when the agreement is complete, otherwise
--   'pending'. Requests from the Supabase dashboard or service role keep
--   whatever status they set.
--
-- Run after 20240113_13_investment_roi_processing.sql. Safe to re-run.
-- ============================================================

-- The live agreements_status_check does not allow 'approved'. Rebuild it to
-- allow pending/approved/rejected plus any status already stored.
do $$
declare
  v_allowed text;
begin
  alter table public.agreements drop constraint if exists agreements_status_check;

  select string_agg(quote_literal(s), ', ' order by s)
  into v_allowed
  from (
    select unnest(array['pending', 'approved', 'rejected']) as s
    union
    select distinct status from public.agreements where status is not null
  ) statuses;

  execute format(
    'alter table public.agreements add constraint agreements_status_check check (status in (%s))',
    v_allowed
  );
end $$;

create or replace function public.set_agreement_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role';
begin
  if coalesce(v_role, '') not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.status := 'pending';
    return new;
  end if;

  if new.signature_url is not null
    and new.signed_at is not null
    and new.document_url is not null
    and new.start_date is not null
    and coalesce(new.investment_amount, 0) >= 750000
    and new.signature_url like new.user_id::text || '/%'
    and new.document_url like new.user_id::text || '/%'
    and exists (
      select 1 from storage.objects o
      where o.bucket_id = 'agreements' and o.name = new.signature_url
    )
    and exists (
      select 1 from storage.objects o
      where o.bucket_id = 'agreements' and o.name = new.document_url
    )
  then
    new.status := 'approved';
  else
    new.status := 'pending';
  end if;

  return new;
end;
$$;

revoke all on function public.set_agreement_status() from public, anon, authenticated;

drop trigger if exists set_agreement_status on public.agreements;
create trigger set_agreement_status
  before insert or update on public.agreements
  for each row
  execute function public.set_agreement_status();

-- Must fire for any update: a status changed by the trigger above is not
-- listed in the UPDATE's SET clause, so "update of status" would miss it.
drop trigger if exists on_agreement_approved on public.agreements;
create trigger on_agreement_approved
  after insert or update on public.agreements
  for each row
  execute function public.handle_agreement_approved();

-- Investors may write 'approved' only because set_agreement_status decides it.
drop policy if exists "Investors edit own unapproved agreements" on public.agreements;
create policy "Investors edit own unapproved agreements"
  on public.agreements for update
  to authenticated
  using ( auth.uid() = user_id and status is distinct from 'approved' )
  with check ( auth.uid() = user_id and status in ('pending', 'approved') );

-- Agreements already signed before this migration are approved now.
update public.agreements
set status = 'approved', updated_at = now()
where status = 'pending'
  and signature_url is not null
  and signed_at is not null
  and document_url is not null
  and coalesce(investment_amount, 0) >= 750000;
