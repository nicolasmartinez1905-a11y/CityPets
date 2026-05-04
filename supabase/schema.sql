create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  email text not null unique,
  ciudad text not null default 'Ushuaia',
  zona text,
  foto_url text,
  bio text,
  verificado boolean not null default false,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.mascotas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  nombre text not null,
  especie text not null,
  raza text,
  edad int,
  ciudad text not null default 'Ushuaia',
  zona text,
  foto_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  mascota_id uuid references public.mascotas(id) on delete set null,
  imagen_url text,
  descripcion text not null,
  ciudad text not null default 'Ushuaia',
  zona text,
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create table if not exists public.comentarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  texto text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.servicios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  titulo text not null,
  descripcion text not null,
  precio text,
  ciudad text not null default 'Ushuaia',
  zona text,
  categoria text not null default 'Paseadores',
  imagen_url text,
  verificado boolean not null default false,
  rating numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists users_ciudad_idx on public.users(ciudad);
create index if not exists mascotas_user_id_idx on public.mascotas(user_id);
create index if not exists mascotas_ciudad_idx on public.mascotas(ciudad);
create index if not exists posts_user_id_idx on public.posts(user_id);
create index if not exists posts_ciudad_created_idx on public.posts(ciudad, created_at desc);
create index if not exists likes_user_id_idx on public.likes(user_id);
create index if not exists likes_post_id_idx on public.likes(post_id);
create index if not exists comentarios_post_id_created_idx on public.comentarios(post_id, created_at asc);
create index if not exists servicios_user_id_idx on public.servicios(user_id);
create index if not exists servicios_ciudad_idx on public.servicios(ciudad);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.users enable row level security;
alter table public.mascotas enable row level security;
alter table public.posts enable row level security;
alter table public.likes enable row level security;
alter table public.comentarios enable row level security;
alter table public.servicios enable row level security;

drop policy if exists "profiles readable" on public.users;
create policy "profiles readable" on public.users for select using (true);
drop policy if exists "users insert own profile" on public.users;
create policy "users insert own profile" on public.users for insert with check (auth.uid() = id);
drop policy if exists "users update own profile" on public.users;
create policy "users update own profile" on public.users for update using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "users admin update" on public.users;
create policy "users admin update" on public.users for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "mascotas readable" on public.mascotas;
create policy "mascotas readable" on public.mascotas for select using (true);
drop policy if exists "mascotas insert own" on public.mascotas;
create policy "mascotas insert own" on public.mascotas for insert with check (auth.uid() = user_id);
drop policy if exists "mascotas update own" on public.mascotas;
create policy "mascotas update own" on public.mascotas for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "mascotas delete own" on public.mascotas;
create policy "mascotas delete own" on public.mascotas for delete using (auth.uid() = user_id);

drop policy if exists "posts readable" on public.posts;
create policy "posts readable" on public.posts for select using (true);
drop policy if exists "posts insert own" on public.posts;
create policy "posts insert own" on public.posts for insert with check (auth.uid() = user_id);
drop policy if exists "posts update own" on public.posts;
create policy "posts update own" on public.posts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "posts delete own" on public.posts;
create policy "posts delete own" on public.posts for delete using (auth.uid() = user_id);

drop policy if exists "likes readable" on public.likes;
create policy "likes readable" on public.likes for select using (true);
drop policy if exists "likes insert own" on public.likes;
create policy "likes insert own" on public.likes for insert with check (auth.uid() = user_id);
drop policy if exists "likes delete own" on public.likes;
create policy "likes delete own" on public.likes for delete using (auth.uid() = user_id);

drop policy if exists "comentarios readable" on public.comentarios;
create policy "comentarios readable" on public.comentarios for select using (true);
drop policy if exists "comentarios insert own" on public.comentarios;
create policy "comentarios insert own" on public.comentarios for insert with check (auth.uid() = user_id);
drop policy if exists "comentarios delete own" on public.comentarios;
create policy "comentarios delete own" on public.comentarios for delete using (auth.uid() = user_id);

drop policy if exists "servicios readable" on public.servicios;
create policy "servicios readable" on public.servicios for select using (true);
drop policy if exists "servicios insert own" on public.servicios;
create policy "servicios insert own" on public.servicios for insert with check (auth.uid() = user_id);
drop policy if exists "servicios update own" on public.servicios;
create policy "servicios update own" on public.servicios for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "servicios admin update" on public.servicios;
create policy "servicios admin update" on public.servicios for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "servicios delete own" on public.servicios;
create policy "servicios delete own" on public.servicios for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values
  ('fotos-perfil', 'fotos-perfil', true),
  ('mascotas', 'mascotas', true),
  ('publicaciones', 'publicaciones', true)
on conflict (id) do nothing;

drop policy if exists "public read fotos-perfil" on storage.objects;
create policy "public read fotos-perfil" on storage.objects for select using (bucket_id = 'fotos-perfil');
drop policy if exists "public read mascotas" on storage.objects;
create policy "public read mascotas" on storage.objects for select using (bucket_id = 'mascotas');
drop policy if exists "public read publicaciones" on storage.objects;
create policy "public read publicaciones" on storage.objects for select using (bucket_id = 'publicaciones');

drop policy if exists "authenticated upload own files" on storage.objects;
create policy "authenticated upload own files" on storage.objects
for insert
with check (
  auth.role() = 'authenticated'
  and bucket_id in ('fotos-perfil', 'mascotas', 'publicaciones')
  and owner = auth.uid()
);

drop policy if exists "authenticated update own files" on storage.objects;
create policy "authenticated update own files" on storage.objects
for update
using (auth.uid() = owner)
with check (auth.uid() = owner);

drop policy if exists "authenticated delete own files" on storage.objects;
create policy "authenticated delete own files" on storage.objects
for delete
using (auth.uid() = owner);
