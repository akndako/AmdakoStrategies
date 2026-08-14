-- Supabase PostgreSQL Schema for Amdako Strategies
-- Phase 3: Database Design
-- Phase 4: Database Security - RLS Policies

-- ============================================================
-- Helper Functions (must be defined before RLS policies that use them)
-- ============================================================

-- Helper function for role checking
create or replace function has_role(role_name text)
returns boolean
language sql
security definer
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() AND role = role_name
  );
end;
$$;

-- ============================================================
-- 1. Profiles table (extends Supabase auth.users)
-- ============================================================

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  first_name text,
  last_name text,
  email text,
  phone text not null,
  role text check (role in ('user', 'admin')) default 'user',
  is_active boolean default true,
  last_login timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint profiles_role_check check (role in ('user', 'admin'))
);

-- Trigger to update updated_at on profiles
create or replace function handle_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function handle_profiles_updated_at();

-- Trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ===== RLS POLICIES: profiles =====

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Admins can read all profiles
create policy "Admins can read all profiles"
  on public.profiles for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all profiles
create policy "Admins can update all profiles"
  on public.profiles for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can insert profiles (typically during onboarding)
create policy "Admins can insert profiles"
  on public.profiles for insert
  with check ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 2. Agreements table (investment agreement forms)
-- ============================================================

create table if not exists public.agreements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  full_name text not null,
  address text,
  phone text not null,
  email text not null,
  id_type text check (id_type in ('nationalId', 'votersCard', 'internationalPassport', 'driversLicense')),
  id_number text,
  investment_amount numeric(12, 2) not null,
  start_date date not null,
  maturity_date date,
  payment_method text default 'Bank Transfer',
  payment_bank_name text,
  payment_account_name text,
  transaction_reference text,
  returns_bank_name text,
  returns_account_number text,
  returns_account_name text,
  returns_phone_number text,
  signature_url text,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint agreements_id_type_check check (id_type in ('nationalId', 'votersCard', 'internationalPassport', 'driversLicense'))
);

-- Trigger to update updated_at on agreements
create or replace function handle_agreements_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger agreements_updated_at
  before update on public.agreements
  for each row
  execute function handle_agreements_updated_at();

-- ===== RLS POLICIES: agreements =====

-- Enable RLS
alter table public.agreements enable row level security;

-- Users can create their own agreements
create policy "Users can create own agreements"
  on public.agreements for insert
  with check ( auth.uid() = user_id );

-- Users can read their own agreements
create policy "Users can read own agreements"
  on public.agreements for select
  using ( auth.uid() = user_id );

-- Users can update their own agreements (pending -> approved by admin)
create policy "Users can update own agreements"
  on public.agreements for update
  using ( auth.uid() = user_id );

-- Admins can read all agreements
create policy "Admins can read all agreements"
  on public.agreements for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all agreements
create policy "Admins can update all agreements"
  on public.agreements for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can delete all agreements
create policy "Admins can delete all agreements"
  on public.agreements for delete
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 3. Dashboard metrics table (performance tracking)
-- ============================================================

create table if not exists public.dashboard_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles,
  performance text,
  balance text,
  open_positions integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint dashboard_metrics_user_fk foreign key (user_id) references public.profiles(id) on delete set null
);

-- Trigger to update updated_at on dashboard_metrics
create or replace function handle_dashboard_metrics_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger dashboard_metrics_updated_at
  before update on public.dashboard_metrics
  for each row
  execute function handle_dashboard_metrics_updated_at();

-- ===== RLS POLICIES: dashboard_metrics =====

-- Enable RLS
alter table public.dashboard_metrics enable row level security;

-- Users can read their own dashboard metrics
create policy "Users can read own dashboard metrics"
  on public.dashboard_metrics for select
  using ( user_id = auth.uid() );

-- Admins can read all dashboard metrics
create policy "Admins can read all dashboard metrics"
  on public.dashboard_metrics for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 4. Records table (user activity/investment records)
-- ============================================================

create table if not exists public.records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  content text,
  type text,
  amount numeric(12, 2),
  date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update updated_at on records
create or replace function handle_records_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger records_updated_at
  before update on public.records
  for each row
  execute function handle_records_updated_at();

-- ===== RLS POLICIES: records =====

-- Enable RLS
alter table public.records enable row level security;

-- Users can create their own records
create policy "Users can create own records"
  on public.records for insert
  with check ( auth.uid() = user_id );

-- Users can read their own records
create policy "Users can read own records"
  on public.records for select
  using ( auth.uid() = user_id );

-- Users can update their own records
create policy "Users can update own records"
  on public.records for update
  using ( auth.uid() = user_id );

-- Users can delete their own records
create policy "Users can delete own records"
  on public.records for delete
  using ( auth.uid() = user_id );

-- Admins can read all records
create policy "Admins can read all records"
  on public.records for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all records
create policy "Admins can update all records"
  on public.records for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can delete all records
create policy "Admins can delete all records"
  on public.records for delete
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 5. Products table (investment products/strategies)
-- ============================================================

create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  price numeric(12, 2),
  image text,
  roi text,
  min_investment numeric(12, 2),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update updated_at on products
create or replace function handle_products_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger products_updated_at
  before update on public.products
  for each row
  execute function handle_products_updated_at();

-- ===== RLS POLICIES: products =====

-- Enable RLS
alter table public.products enable row level security;

-- Everyone can read products (public catalog)
create policy "Public can read products"
  on public.products for select
  using ( true );

-- Admins can insert products
create policy "Admins can insert products"
  on public.products for insert
  with check ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update products
create policy "Admins can update products"
  on public.products for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can delete products
create policy "Admins can delete products"
  on public.products for delete
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 6. Indexes for performance
-- ============================================================

create index if not exists idx_agreements_user_id on public.agreements (user_id);
create index if not exists idx_agreements_status on public.agreements (status);
create index if not exists idx_dashboard_metrics_user_id on public.dashboard_metrics (user_id);
create index if not exists idx_profiles_role on public.profiles (role);
create index if not exists idx_profiles_active on public.profiles (is_active);
create index if not exists idx_records_user_id on public.records (user_id);
create index if not exists idx_records_type on public.records (type);
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_active on public.products (is_active);

-- ============================================================
-- 7. Comments
-- ============================================================

comment on table public.profiles is 'Extended user profile data linked to Supabase auth';
comment on table public.agreements is 'Investment agreement forms signed by users';
comment on table public.dashboard_metrics is 'Dashboard performance metrics per user';
comment on table public.records is 'User activity and investment records';
comment on table public.products is 'Investment products and strategies available to users';
