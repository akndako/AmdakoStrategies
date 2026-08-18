-- AMDAKO STRATEGIES - INVESTMENT AMOUNT REMOVAL & INVESTOR ACCOUNT INSERT POLICY
-- Run this AFTER the initial schema migrations
-- This migration:
--   1. Adds monthly_roi column to profiles (fixed 10% default)
--   2. Adds description and monthly_roi columns to investments
--   3. Adds metadata column to transactions
--   4. Adds insert policy for investor_accounts for regular users
--   5. Updates handle_new_user trigger to set monthly_roi and include address/location/state_of_origin
--   6. Removes investment_amount from profiles (moved to investments table)

-- ============================================================
-- 1. Add monthly_roi to profiles (fixed 10% default, not editable by user)
-- ============================================================

alter table public.profiles
  add column if not exists monthly_roi numeric(5, 2) default 10;

-- ============================================================
-- 2. Add description and monthly_roi to investments
-- ============================================================

alter table public.investments
  add column if not exists description text,
  add column if not exists monthly_roi numeric(5, 2) default 10;

-- ============================================================
-- 3. Add metadata column to transactions
-- ============================================================

alter table public.transactions
  add column if not exists metadata jsonb default '{}'::jsonb;

-- ============================================================
-- 4. Add insert policy for investor_accounts for regular users
--    (Users can create their own investor account when setting up investment)
-- ============================================================

create policy "Users can insert own investor account"
  on public.investor_accounts for insert
  with check ( auth.uid() = user_id );

-- ============================================================
-- 5. Update handle_new_user trigger to set monthly_roi and include
--    address, location, state_of_origin (investment_amount removed from profiles)
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (
    id, full_name, first_name, last_name, email, phone,
    address, location, state_of_origin, monthly_roi
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'location',
    new.raw_user_meta_data->>'state_of_origin',
    10
  );
  return new;
end;
$$;

-- ============================================================
-- 6. Remove investment_amount from profiles (moved to investments table)
-- ============================================================

alter table public.profiles
  drop column if exists investment_amount;

-- ============================================================
-- 7. Add index for investor_accounts account_number (already unique)
-- ============================================================

create index if not exists idx_investments_monthly_roi on public.investments (monthly_roi);
