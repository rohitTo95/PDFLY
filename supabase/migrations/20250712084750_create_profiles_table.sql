create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text unique,
  created_at timestamp with time zone default timezone('utc', now())
);
