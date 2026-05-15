-- Users (extends Supabase auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('client', 'therapist')),
  first_name text not null,
  last_name text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can read own row" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own row" on public.users
  for update using (auth.uid() = id);

create policy "Insert on signup" on public.users
  for insert with check (auth.uid() = id);

-- Therapist profiles
create table public.therapist_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  license_number text not null unique,
  crpo_status text not null default 'pending' check (crpo_status in ('verified', 'pending', 'rejected')),
  photo_url text,
  bio text,
  years_experience int,
  session_type text not null default 'both' check (session_type in ('in_person', 'online', 'both')),
  city text not null,
  fees_per_session int not null,
  sliding_scale boolean not null default false,
  languages text[] not null default '{"English"}',
  gender text,
  specialties text[] not null default '{}',
  client_focus_text text,
  therapy_approaches text[] not null default '{}',
  contact_email text,
  is_active boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

alter table public.therapist_profiles enable row level security;

create policy "Anyone can read active verified profiles" on public.therapist_profiles
  for select using (is_active = true and crpo_status = 'verified');

create policy "Therapist can read own profile" on public.therapist_profiles
  for select using (auth.uid() = user_id);

create policy "Therapist can update own profile" on public.therapist_profiles
  for update using (auth.uid() = user_id);

create policy "Therapist can insert own profile" on public.therapist_profiles
  for insert with check (auth.uid() = user_id);

-- Client surveys
create table public.client_surveys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  answers jsonb not null,
  completed_at timestamptz default now(),
  unique(user_id)
);

alter table public.client_surveys enable row level security;

create policy "Client can read own survey" on public.client_surveys
  for select using (auth.uid() = user_id);

create policy "Client can insert own survey" on public.client_surveys
  for insert with check (auth.uid() = user_id);

create policy "Client can update own survey" on public.client_surveys
  for update using (auth.uid() = user_id);

-- Swipe history
create table public.swipe_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.users(id) on delete cascade,
  therapist_id uuid not null references public.therapist_profiles(id) on delete cascade,
  action text not null check (action in ('skip', 'save')),
  created_at timestamptz default now(),
  unique(client_id, therapist_id)
);

alter table public.swipe_history enable row level security;

create policy "Client can read own swipe history" on public.swipe_history
  for select using (auth.uid() = client_id);

create policy "Client can insert own swipe history" on public.swipe_history
  for insert with check (auth.uid() = client_id);

-- Saved therapists (convenience view of swipe_history saves)
create view public.saved_therapists as
  select client_id, therapist_id, created_at
  from public.swipe_history
  where action = 'save';
