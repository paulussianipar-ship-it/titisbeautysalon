create table if not exists public.services (
    id text primary key,
    name text not null unique,
    description text not null default '',
    image text not null default '',
    price integer not null default 0 check (price >= 0),
    created_at timestamptz not null default now()
);

create table if not exists public.reservations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    phone text not null,
    service text not null,
    appointment_date date not null,
    appointment_time time not null,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at timestamptz not null default now()
);

create table if not exists public.patients (
    id text primary key,
    name text not null,
    contact text not null,
    email text,
    created_at timestamptz not null default now()
);

create table if not exists public.staff (
    id text primary key,
    name text not null,
    position text not null,
    contact text,
    created_at timestamptz not null default now()
);

create table if not exists public.sales (
    id text primary key,
    sale_date date not null,
    service text not null,
    customer text not null,
    amount integer not null check (amount >= 0),
    created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.reservations enable row level security;
alter table public.patients enable row level security;
alter table public.staff enable row level security;
alter table public.sales enable row level security;

create policy "public can read services" on public.services for select to anon, authenticated using (true);
create policy "public can insert reservations" on public.reservations for insert to anon, authenticated with check (true);
create policy "public can manage patients for testing" on public.patients for all to anon, authenticated using (true) with check (true);
create policy "public can manage staff for testing" on public.staff for all to anon, authenticated using (true) with check (true);
create policy "public can manage sales for testing" on public.sales for all to anon, authenticated using (true) with check (true);