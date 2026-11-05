create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text not null check (char_length(btrim(email)) between 1 and 254),
  message text not null check (char_length(btrim(message)) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

grant insert on public.contact_messages to anon, authenticated;
grant select on public.contact_messages to authenticated;

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (has_role('admin'));

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);
