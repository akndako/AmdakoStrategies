

create or replace function public.find_email_by_phone(p_phone text)
  returns table(email text)
  language sql
  security definer
  set search_path = public
as $$
  select p.email
  from public.profiles p
  where regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g') =
        regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g')
    and p.email is not null
    and p.email <> ''
  order by p.created_at asc
  limit 1;
$$;



revoke all on function public.find_email_by_phone(text) from public;
grant execute on function public.find_email_by_phone(text) to anon, authenticated;



create index if not exists idx_profiles_phone on public.profiles (phone);