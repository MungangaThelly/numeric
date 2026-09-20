create or replace function public.is_teacher_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.teacher_profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.admin_list_teacher_invitations()
returns table(email text, role text, active boolean, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_teacher_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  return query
    select invitation.email, invitation.role, invitation.active, invitation.created_at
    from public.teacher_invitations invitation
    order by invitation.created_at desc;
end;
$$;

create or replace function public.admin_upsert_teacher_invitation(
  invited_email text,
  invited_role text default 'teacher',
  invited_active boolean default true
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare normalized_email text := lower(trim(invited_email));
begin
  if not public.is_teacher_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Invalid email';
  end if;
  if invited_role not in ('teacher','coordinator','admin') then
    raise exception 'Invalid role';
  end if;
  insert into public.teacher_invitations(email,role,active)
  values(normalized_email,invited_role,invited_active)
  on conflict(email) do update
  set role=excluded.role,active=excluded.active;
end;
$$;

grant execute on function public.is_teacher_admin() to authenticated;
grant execute on function public.admin_list_teacher_invitations() to authenticated;
grant execute on function public.admin_upsert_teacher_invitation(text,text,boolean) to authenticated;
revoke execute on function public.is_teacher_admin() from anon, public;
revoke execute on function public.admin_list_teacher_invitations() from anon, public;
revoke execute on function public.admin_upsert_teacher_invitation(text,text,boolean) from anon, public;
