create table if not exists public.teacher_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'teacher' check (role in ('teacher','coordinator','admin')),
  display_name text not null default '',
  school_name text not null default '',
  education_province text not null default 'Kinshasa',
  cycle text not null default 'primary' check (cycle in ('primary','cteb','humanities','other')),
  subjects text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.teacher_invitations (
  email text primary key check (email = lower(email)),
  role text not null default 'teacher' check (role in ('teacher','coordinator','admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.teacher_profiles enable row level security;
alter table public.teacher_invitations enable row level security;
revoke all on public.teacher_profiles from anon;
revoke all on public.teacher_invitations from anon, authenticated;
grant select on public.teacher_invitations to supabase_auth_admin;
create policy "Auth checks teacher invitations" on public.teacher_invitations for select to supabase_auth_admin using (true);
grant select, insert, update on public.teacher_profiles to authenticated;
create policy "Teachers read their own profile" on public.teacher_profiles for select using (auth.uid() = user_id);
create policy "Teachers update their own profile" on public.teacher_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create or replace function public.protect_teacher_role() returns trigger language plpgsql as $$ begin if new.role <> old.role and coalesce(current_setting('request.jwt.claim.role',true),'') <> 'service_role' then raise exception 'Only an administrator may change a teacher role'; end if; new.updated_at=now(); return new; end; $$;
drop trigger if exists protect_teacher_role_update on public.teacher_profiles;
create trigger protect_teacher_role_update before update on public.teacher_profiles for each row execute function public.protect_teacher_role();
create or replace function public.create_teacher_profile() returns trigger language plpgsql security definer set search_path=public as $$ declare invitation_role text; begin select role into invitation_role from public.teacher_invitations where email=lower(new.email) and active=true; if invitation_role is not null then insert into public.teacher_profiles(user_id,role) values(new.id,invitation_role) on conflict do nothing; end if; return new; end; $$;
drop trigger if exists on_teacher_created on auth.users;
create trigger on_teacher_created after insert on auth.users for each row execute function public.create_teacher_profile();
create or replace function public.hook_restrict_teacher_signup(event jsonb) returns jsonb language plpgsql set search_path=public as $$ declare requested_email text; begin requested_email:=lower(trim(event->'user'->>'email')); if requested_email is not null and exists(select 1 from public.teacher_invitations where email=requested_email and active=true) then return '{}'::jsonb; end if; return jsonb_build_object('error',jsonb_build_object('http_code',403,'message','Teacher invitation required.')); end; $$;
grant execute on function public.hook_restrict_teacher_signup(jsonb) to supabase_auth_admin;
revoke execute on function public.hook_restrict_teacher_signup(jsonb) from authenticated, anon, public;
