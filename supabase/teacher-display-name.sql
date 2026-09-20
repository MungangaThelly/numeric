alter table public.teacher_profiles
add column if not exists display_name text not null default '';
