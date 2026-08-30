-- Ashvern Holdings — contact form storage
-- Run once in the Supabase SQL editor for the Ashvern project.

create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  company    text,
  message    text not null
);

-- RLS on, no policies: anon/authenticated clients get nothing.
-- The contact Route Handler writes with the service_role key, which
-- bypasses RLS. Read submissions from the Supabase dashboard.
alter table public.contact_submissions enable row level security;
