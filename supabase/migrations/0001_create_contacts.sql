-- Contacts table backing the contact form CRUD model.
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now(),
  emailed_at timestamptz
);

alter table public.contacts enable row level security;

-- Allow anyone (including anon) to submit a contact message.
create policy "Anyone can insert contacts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users (e.g. staff) can read, update, or delete messages.
create policy "Authenticated users can read contacts"
  on public.contacts
  for select
  to authenticated
  using (true);

create policy "Authenticated users can update contacts"
  on public.contacts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete contacts"
  on public.contacts
  for delete
  to authenticated
  using (true);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
