-- AMDAKO STRATEGIES - INVESTOR ACCOUNTS & NOTIFICATIONS
-- Run this AFTER the initial schema migrations

-- ============================================================
-- 1. Investor Accounts table
-- ============================================================

create table if not exists public.investor_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  account_number text not null unique,
  status text check (status in ('active', 'pending', 'suspended', 'inactive')) default 'pending',
  available_balance numeric(14, 2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update updated_at on investor_accounts
create or replace function handle_investor_accounts_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger investor_accounts_updated_at
  before update on public.investor_accounts
  for each row
  execute function handle_investor_accounts_updated_at();

-- ===== RLS POLICIES: investor_accounts =====

-- Enable RLS
alter table public.investor_accounts enable row level security;

-- Users can read their own investor account
create policy "Users can read own investor account"
  on public.investor_accounts for select
  using ( auth.uid() = user_id );

-- Users can update their own investor account (e.g. status changes by admin)
create policy "Users can update own investor account"
  on public.investor_accounts for update
  using ( auth.uid() = user_id );

-- Admins can read all investor accounts
create policy "Admins can read all investor accounts"
  on public.investor_accounts for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all investor accounts
create policy "Admins can update all investor accounts"
  on public.investor_accounts for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can insert investor accounts
create policy "Admins can insert investor accounts"
  on public.investor_accounts for insert
  with check ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 2. Notifications table
-- ============================================================

create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  title text not null,
  message text,
  type text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ===== RLS POLICIES: notifications =====

-- Enable RLS
alter table public.notifications enable row level security;

-- Users can read their own notifications
create policy "Users can read own notifications"
  on public.notifications for select
  using ( auth.uid() = user_id );

-- Users can update their own notifications (mark as read)
create policy "Users can update own notifications"
  on public.notifications for update
  using ( auth.uid() = user_id );

-- Admins can read all notifications
create policy "Admins can read all notifications"
  on public.notifications for select
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can update all notifications
create policy "Admins can update all notifications"
  on public.notifications for update
  using ( auth.role() = 'authenticated' AND has_role('admin') );

-- Admins can insert notifications
create policy "Admins can insert notifications"
  on public.notifications for insert
  with check ( auth.role() = 'authenticated' AND has_role('admin') );

-- ============================================================
-- 3. Indexes for performance
-- ============================================================

create index if not exists idx_investor_accounts_user_id on public.investor_accounts (user_id);
create index if not exists idx_notifications_user_id on public.notifications (user_id);
create index if not exists idx_notifications_is_read on public.notifications (is_read);
create index if not exists idx_notifications_created_at on public.notifications (created_at desc);

-- ============================================================
-- 4. Comments
-- ============================================================

comment on table public.investor_accounts is 'Investor account details (account number, balance) per user';
comment on table public.notifications is 'User notifications (messages, alerts) per user';
