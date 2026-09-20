create table if not exists public.teacher_invitations (
  email text primary key check (email = lower(email)),
  role text not null default 'teacher' check (role in ('teacher','coordinator','admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.teacher_invitations enable row level security;
revoke all on public.teacher_invitations from anon, authenticated;
grant select on public.teacher_invitations to supabase_auth_admin;
drop policy if exists "Auth checks teacher invitations" on public.teacher_invitations;
create policy "Auth checks teacher invitations"
on public.teacher_invitations for select
to supabase_auth_admin
using (true);

insert into public.teacher_invitations(email,role)
select lower(email),'teacher' from auth.users where email is not null
on conflict (email) do nothing;

drop policy if exists "Teachers create their own profile" on public.teacher_profiles;

create or replace function public.create_teacher_profile()
returns trigger language plpgsql security definer set search_path=public as $$
declare invitation_role text;
begin
  select role into invitation_role
  from public.teacher_invitations
  where email=lower(new.email) and active=true;
  if invitation_role is not null then
    insert into public.teacher_profiles(user_id,role)
    values(new.id,invitation_role)
    on conflict do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_teacher_created on auth.users;
create trigger on_teacher_created after insert on auth.users
for each row execute function public.create_teacher_profile();

-- Select this function in Authentication > Hooks > Before User Created.
create or replace function public.hook_restrict_teacher_signup(event jsonb)
returns jsonb
language plpgsql
set search_path = public
as $$
declare requested_email text;
begin
  requested_email := lower(trim(event->'user'->>'email'));
  if requested_email is not null and exists (
    select 1 from public.teacher_invitations
    where email = requested_email and active = true
  ) then
    return '{}'::jsonb;
  end if;
  return jsonb_build_object(
    'error', jsonb_build_object(
      'http_code', 403,
      'message', 'Teacher invitation required.'
    )
  );
end;
$$;

grant execute on function public.hook_restrict_teacher_signup(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_restrict_teacher_signup(jsonb) from authenticated, anon, public;
