-- ============================================================
-- ROI acceptance tests
-- Run in the Supabase SQL editor after migrations 13 and 14.
-- Everything runs inside one transaction and is rolled back, so no test
-- users, investments, or credits are left behind. Any failure stops the
-- script with a "FAIL:" message.
-- ============================================================

begin;

-- ------------------------------------------------------------
-- Fixtures: investors A and B (ROI tests) and C (signing tests).
-- Each user may only have one agreement.
-- ------------------------------------------------------------
do $$
declare
  a uuid := gen_random_uuid();
  b uuid := gen_random_uuid();
  c uuid := gen_random_uuid();
begin
  insert into auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_user_meta_data, raw_app_meta_data, created_at, updated_at
  )
  values
    (a, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'roi-test-a-' || a || '@example.com', '', now(),
     jsonb_build_object('full_name', 'ROI Test A', 'first_name', 'ROI', 'last_name', 'Test A', 'phone', '+2348000000001'),
     '{}'::jsonb, now(), now()),
    (b, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'roi-test-b-' || b || '@example.com', '', now(),
     jsonb_build_object('full_name', 'ROI Test B', 'first_name', 'ROI', 'last_name', 'Test B', 'phone', '+2348000000002'),
     '{}'::jsonb, now(), now()),
    (c, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'roi-test-c-' || c || '@example.com', '', now(),
     jsonb_build_object('full_name', 'ROI Test C', 'first_name', 'ROI', 'last_name', 'Test C', 'phone', '+2348000000003'),
     '{}'::jsonb, now(), now());

  insert into public.profiles (id, full_name, phone, email)
  values
    (a, 'ROI Test A', '+2348000000001', 'roi-test-a-' || a || '@example.com'),
    (b, 'ROI Test B', '+2348000000002', 'roi-test-b-' || b || '@example.com'),
    (c, 'ROI Test C', '+2348000000003', 'roi-test-c-' || c || '@example.com')
  on conflict (id) do nothing;

  perform set_config('roi_test.a', a::text, true);
  perform set_config('roi_test.b', b::text, true);
  perform set_config('roi_test.c', c::text, true);
end $$;

-- ------------------------------------------------------------
-- Payout calendar
-- ------------------------------------------------------------
do $$
begin
  if public.roi_payout_date('2026-01-10') <> '2026-01-30' then raise exception 'FAIL: January payout is not the 30th'; end if;
  if public.roi_payout_date('2027-02-10') <> '2027-02-28' then raise exception 'FAIL: February payout is not the 28th'; end if;
  if public.roi_payout_date('2028-02-10') <> '2028-02-29' then raise exception 'FAIL: leap February payout is not the 29th'; end if;
  if public.roi_payout_date('2026-04-10') <> '2026-04-30' then raise exception 'FAIL: April payout is not the 30th'; end if;
  if public.latest_roi_payout_date('2026-11-05') <> '2026-10-30' then raise exception 'FAIL: latest payout before Nov 5'; end if;
end $$;

-- ------------------------------------------------------------
-- 1. Register and skip: amount remains 0
-- ------------------------------------------------------------
do $$
declare
  a uuid := current_setting('roi_test.a')::uuid;
begin
  if exists (select 1 from public.investments where user_id = a) then
    raise exception 'FAIL: skipped registration created an investment';
  end if;
end $$;

-- ------------------------------------------------------------
-- 2. Agreement submitted later; investment saved only on approval
-- ------------------------------------------------------------
do $$
declare
  a uuid := current_setting('roi_test.a')::uuid;
  b uuid := current_setting('roi_test.b')::uuid;
begin
  insert into public.agreements (user_id, full_name, phone, email, investment_amount, start_date, status)
  values
    (a, 'ROI Test A', '+2348000000001', 'a@example.com', 1000000, '2026-11-01', 'pending'),
    (b, 'ROI Test B', '+2348000000002', 'b@example.com', 2500000, '2026-11-01', 'pending');

  if exists (select 1 from public.investments where user_id in (a, b)) then
    raise exception 'FAIL: pending agreement created an investment';
  end if;

  update public.agreements set status = 'approved' where user_id in (a, b);

  if (select amount from public.investments where user_id = a and confirmed_at is not null) <> 1000000 then
    raise exception 'FAIL: investor A confirmed amount is not 1,000,000';
  end if;
  if (select amount from public.investments where user_id = b and confirmed_at is not null) <> 2500000 then
    raise exception 'FAIL: investor B confirmed amount is not 2,500,000';
  end if;
  if (select count(*) from public.transactions where user_id = a and type = 'deposit' and status = 'completed') <> 1 then
    raise exception 'FAIL: funding transaction missing for investor A';
  end if;
  if not exists (
    select 1 from public.investment_transactions it
    join public.investments i on i.id = it.investment_id
    where i.user_id = a
  ) then
    raise exception 'FAIL: investment_transactions link missing for investor A';
  end if;

  -- Re-approving must not create a second investment.
  update public.agreements set status = 'pending' where user_id = a;
  update public.agreements set status = 'approved' where user_id = a;
  if (select count(*) from public.investments where user_id = a) <> 1 then
    raise exception 'FAIL: re-approval duplicated the investment';
  end if;

  -- Backdate confirmation so the November payout applies.
  update public.investments
  set confirmed_at = '2026-11-01 09:00:00+01'
  where user_id in (a, b);
end $$;

-- ------------------------------------------------------------
-- 3. Monthly processing: correct 10%, no duplicate on re-run,
--    separate balances per investor
-- ------------------------------------------------------------
do $$
declare
  a uuid := current_setting('roi_test.a')::uuid;
  b uuid := current_setting('roi_test.b')::uuid;
  result jsonb;
begin
  -- Before the payout day nothing is due for November yet.
  perform public.process_monthly_roi('2026-11-29');
  if exists (select 1 from public.transactions where user_id in (a, b) and type = 'profit') then
    raise exception 'FAIL: ROI credited before the payout day';
  end if;

  result := public.process_monthly_roi('2026-11-30');
  perform public.process_monthly_roi('2026-11-30');
  perform public.process_monthly_roi('2026-12-03');

  if (select count(*) from public.transactions where user_id = a and type = 'profit') <> 1 then
    raise exception 'FAIL: investor A has % ROI credits for November, expected 1. Processing result: %',
      (select count(*) from public.transactions where user_id = a and type = 'profit'),
      result;
  end if;
  if (select amount from public.transactions where user_id = a and type = 'profit') <> 100000 then
    raise exception 'FAIL: investor A ROI is not 100,000';
  end if;
  if (select amount from public.transactions where user_id = b and type = 'profit') <> 250000 then
    raise exception 'FAIL: investor B ROI is not 250,000';
  end if;
  if (select roi_balance from public.investor_accounts where user_id = a) <> 100000 then
    raise exception 'FAIL: investor A ROI balance is not 100,000';
  end if;
  if (select roi_balance from public.investor_accounts where user_id = b) <> 250000 then
    raise exception 'FAIL: investor B ROI balance is not 250,000';
  end if;
  if not exists (
    select 1 from public.transactions
    where user_id = a and type = 'profit' and status = 'completed'
      and roi_percentage = 10 and roi_period = '2026-11-30'
      and reference like 'ROI-202611-%'
  ) then
    raise exception 'FAIL: ROI transaction is missing date, reference, rate or status';
  end if;
  if (select count(*) from public.notifications where user_id = a and type = 'roi') <> 1 then
    raise exception 'FAIL: expected exactly one ROI notification for investor A';
  end if;

  -- February pays on its last day.
  perform public.process_monthly_roi('2027-02-28');
  if not exists (
    select 1 from public.transactions where user_id = a and type = 'profit' and roi_period = '2027-02-28'
  ) then
    raise exception 'FAIL: February ROI not credited on the 28th';
  end if;
end $$;

-- ------------------------------------------------------------
-- 4. Unauthorized access: investor A acting through the API
-- ------------------------------------------------------------
insert into storage.objects (bucket_id, name)
values
  ('agreements', current_setting('roi_test.c') || '/roi-test-signature.png'),
  ('agreements', current_setting('roi_test.c') || '/roi-test-agreement.pdf');

select set_config(
  'request.jwt.claims',
  json_build_object('sub', current_setting('roi_test.a'), 'role', 'authenticated')::text,
  true
);
set local role authenticated;

do $$
declare
  a uuid := current_setting('roi_test.a')::uuid;
  b uuid := current_setting('roi_test.b')::uuid;
  blocked boolean;
begin
  if exists (select 1 from public.transactions where user_id = b) then raise exception 'FAIL: A can read B transactions'; end if;
  if exists (select 1 from public.investments where user_id = b) then raise exception 'FAIL: A can read B investments'; end if;
  if exists (select 1 from public.investor_accounts where user_id = b) then raise exception 'FAIL: A can read B account'; end if;
  if exists (select 1 from public.notifications where user_id = b) then raise exception 'FAIL: A can read B notifications'; end if;
  if exists (select 1 from public.agreements where user_id = b) then raise exception 'FAIL: A can read B agreement'; end if;
  if not exists (select 1 from public.transactions where user_id = a) then raise exception 'FAIL: A cannot read own transactions'; end if;

  blocked := false;
  begin
    update public.investor_accounts set roi_balance = 999999999 where user_id = a;
  exception when insufficient_privilege then blocked := true;
  end;
  if not blocked then raise exception 'FAIL: A can change own ROI balance'; end if;

  blocked := false;
  begin
    insert into public.transactions (user_id, type, amount, status) values (a, 'profit', 1000000, 'completed');
  exception when insufficient_privilege then blocked := true;
  end;
  if not blocked then raise exception 'FAIL: A can insert transactions'; end if;

  blocked := false;
  begin
    update public.investments set amount = 999999999 where user_id = a;
  exception when insufficient_privilege then blocked := true;
  end;
  if not blocked then raise exception 'FAIL: A can change own investment'; end if;

  blocked := false;
  begin
    perform public.process_monthly_roi('2026-12-30');
  exception when insufficient_privilege then blocked := true;
  end;
  if not blocked then raise exception 'FAIL: A can run ROI processing'; end if;
end $$;

-- ------------------------------------------------------------
-- 5. Auto-approval: investor C signs through the API
-- ------------------------------------------------------------
select set_config(
  'request.jwt.claims',
  json_build_object('sub', current_setting('roi_test.c'), 'role', 'authenticated')::text,
  true
);

do $$
declare
  c uuid := current_setting('roi_test.c')::uuid;
  new_agreement uuid;
begin
  -- Approval without signing is ignored; signing (signature + PDF saved) approves.
  insert into public.agreements (user_id, full_name, phone, email, investment_amount, start_date, status)
  values (c, 'ROI Test C', '+2348000000003', 'c@example.com', 800000, '2026-11-01', 'approved')
  returning id into new_agreement;
  if (select status from public.agreements where id = new_agreement) <> 'pending' then
    raise exception 'FAIL: C can self-approve an unsigned agreement';
  end if;

  update public.agreements set status = 'approved' where id = new_agreement;
  if (select status from public.agreements where id = new_agreement) <> 'pending' then
    raise exception 'FAIL: C can approve an unsigned agreement by update';
  end if;

  update public.agreements
  set signature_url = c || '/roi-test-signature.png', signed_at = now()
  where id = new_agreement;
  if (select status from public.agreements where id = new_agreement) <> 'pending' then
    raise exception 'FAIL: agreement approved before its PDF was saved';
  end if;

  update public.agreements
  set document_url = c || '/roi-test-agreement.pdf'
  where id = new_agreement;
  if (select status from public.agreements where id = new_agreement) <> 'approved' then
    raise exception 'FAIL: signed agreement was not approved automatically';
  end if;
  if (select amount from public.investments where agreement_id = new_agreement and confirmed_at is not null) <> 800000 then
    raise exception 'FAIL: signed agreement did not create an 800,000 investment';
  end if;

  update public.agreements set investment_amount = 99999999 where id = new_agreement;
  if (select investment_amount from public.agreements where id = new_agreement) <> 800000 then
    raise exception 'FAIL: C can edit a signed agreement';
  end if;
end $$;

reset role;

rollback;

select 'All ROI acceptance tests passed (all test data rolled back)' as result;
