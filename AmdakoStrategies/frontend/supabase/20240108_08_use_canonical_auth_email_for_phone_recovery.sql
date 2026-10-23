create or replace function public.find_email_by_phone(p_phone text)
  returns table(email text)
  language sql
  security definer
  set search_path = public, auth
as $$
  with normalized_input as (
    select case
      when regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g') like '234%'
        then regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g')
      when regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g') like '0%'
        then '234' || substring(regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g') from 2)
      else regexp_replace(coalesce(p_phone, ''), '[^0-9]', '', 'g')
    end as phone
  )
  select u.email
  from public.profiles p
  join auth.users u on u.id = p.id
  cross join normalized_input i
  where case
      when regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g') like '234%'
        then regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g')
      when regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g') like '0%'
        then '234' || substring(regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g') from 2)
      else regexp_replace(coalesce(p.phone, ''), '[^0-9]', '', 'g')
    end = i.phone
    and u.email is not null
    and u.email <> ''
  order by p.created_at asc
  limit 1;
$$;

revoke all on function public.find_email_by_phone(text) from public;
grant execute on function public.find_email_by_phone(text) to anon, authenticated;