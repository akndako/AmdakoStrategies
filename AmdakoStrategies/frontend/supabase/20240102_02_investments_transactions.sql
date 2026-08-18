-- Supabase PostgreSQL Schema for Amdako Strategies
-- Phase 5: Real Investor Data Model
-- Investments and Transactions tables

-- ============================================================
-- 1. Investments table
-- ============================================================

create table if not exists public.investments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  investment_name text not null,
  amount numeric(12, 2) not null default 0,
  current_value numeric(12, 2) not null default 0,
  profit_loss numeric(12, 2) not null default 0,
  status text check (status in ('active', 'completed', 'pending', 'cancelled')) default 'active',
  start_date date not null default current_date,
  maturity_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint investments_status_check check (status in ('active', 'completed', 'pending', 'cancelled'))
);

-- Trigger to update updated_at on investments
create or replace function handle_investments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger investments_updated_at
  before update on public.investments
  for each row
  execute function handle_investments_updated_at();

-- ===== RLS POLICIES: investments =====

-- Enable RLS
alter table public.investments enable row level security;

-- Users can create their own investments
create policy "Users can create own investments"
  on public.investments for insert
  with check ( auth.uid() = user_id );

-- Users can read their own investments
create policy "Users can read own investments"
  on public.investments for select
  using ( auth.uid() = user_id );

-- Users can update their own investments
create policy "Users can update own investments"
  on public.investments for update
  using ( auth.uid() = user_id );

-- Users can delete their own investments
create policy "Users can delete own investments"
  on public.investments for delete
  using ( auth.uid() = user_id );

-- Admins can read all investments
create policy "Admins can read all investments"
  on public.investments for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all investments
create policy "Admins can update all investments"
  on public.investments for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can delete all investments
create policy "Admins can delete all investments"
  on public.investments for delete
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 2. Transactions table
-- ============================================================

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  type text check (type in ('deposit', 'withdrawal', 'profit', 'referral', 'fee', 'adjustment')) not null,
  description text,
  amount numeric(12, 2) not null default 0,
  status text check (status in ('pending', 'completed', 'failed', 'cancelled')) default 'pending',
  reference text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  constraint transactions_type_check check (type in ('deposit', 'withdrawal', 'profit', 'referral', 'fee', 'adjustment')),
  constraint transactions_status_check check (status in ('pending', 'completed', 'failed', 'cancelled'))
);

-- Trigger to update updated_at on transactions
create or replace function handle_transactions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger transactions_updated_at
  before update on public.transactions
  for each row
  execute function handle_transactions_updated_at();

-- ===== RLS POLICIES: transactions =====

-- Enable RLS
alter table public.transactions enable row level security;

-- Users can create their own transactions
create policy "Users can create own transactions"
  on public.transactions for insert
  with check ( auth.uid() = user_id );

-- Users can read their own transactions
create policy "Users can read own transactions"
  on public.transactions for select
  using ( auth.uid() = user_id );

-- Users can update their own transactions
create policy "Users can update own transactions"
  on public.transactions for update
  using ( auth.uid() = user_id );

-- Users can delete their own transactions
create policy "Users can delete own transactions"
  on public.transactions for delete
  using ( auth.uid() = user_id );

-- Admins can read all transactions
create policy "Admins can read all transactions"
  on public.transactions for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all transactions
create policy "Admins can update all transactions"
  on public.transactions for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can delete all transactions
create policy "Admins can delete all transactions"
  on public.transactions for delete
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 3. Add avatar_url and status to profiles
-- ============================================================

alter table public.profiles
  add column if not exists avatar_url text,
  add column if not exists status text check (status in ('active', 'pending', 'suspended', 'inactive')) default 'active';

-- ============================================================
-- 4. Add signed_at and document_url to agreements
-- ============================================================

alter table public.agreements
  add column if not exists signed_at timestamptz,
  add column if not exists document_url text;

-- ============================================================
-- 5. Fix handle_new_user trigger to include first_name, last_name
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, first_name, last_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

-- ============================================================
-- 6. Indexes for performance
-- ============================================================

create index if not exists idx_investments_user_id on public.investments (user_id);
create index if not exists idx_investments_status on public.investments (status);
create index if not exists idx_transactions_user_id on public.transactions (user_id);
create index if not exists idx_transactions_type on public.transactions (type);
create index if not exists idx_transactions_status on public.transactions (status);
create index if not exists idx_transactions_created_at on public.transactions (created_at desc);

-- ============================================================
-- 7. Comments
-- ============================================================

comment on table public.investments is 'Investment records owned by users';
comment on table public.transactions is 'Financial transactions (deposits, withdrawals, profits) per user';