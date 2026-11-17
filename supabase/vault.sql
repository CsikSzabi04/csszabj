-- Private Files (owner-only vault).
-- Run ONCE in the Supabase SQL editor of THIS site's project (the one in NEXT_PUBLIC_SUPABASE_URL).
-- Safe to re-run. Only the server (secret key / service_role) can touch these tables:
-- RLS is on with no policies, and anon/authenticated have no grants.

create table if not exists public.vault_partitions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  color text not null default 'violet',
  quota_bytes bigint not null check (quota_bytes > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.vault_items (
  id uuid primary key default gen_random_uuid(),
  partition_id uuid not null references public.vault_partitions(id) on delete cascade,
  parent_id uuid references public.vault_items(id) on delete cascade,
  kind text not null check (kind in ('folder', 'file')),
  name text not null check (char_length(name) between 1 and 255),
  size bigint not null default 0 check (size >= 0),
  mime text,
  object_key text unique,
  status text not null default 'ready' check (status in ('pending', 'ready')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vault_items_parent_idx on public.vault_items (partition_id, parent_id);
create unique index if not exists vault_items_name_uq on public.vault_items
  (partition_id, coalesce(parent_id, '00000000-0000-0000-0000-000000000000'::uuid), lower(name));

create table if not exists public.vault_settings (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.vault_partitions enable row level security;
alter table public.vault_items enable row level security;
alter table public.vault_settings enable row level security;

revoke all on public.vault_partitions, public.vault_items, public.vault_settings from anon, authenticated;
grant select, insert, update, delete on public.vault_partitions, public.vault_items, public.vault_settings to service_role;

-- Used bytes (pending uploads count as reserved) and ready file count per partition.
create or replace function public.vault_usage()
returns table (partition_id uuid, used bigint, files bigint)
language sql stable security invoker set search_path = ''
as $$
  select i.partition_id,
         coalesce(sum(i.size), 0)::bigint,
         count(*) filter (where i.kind = 'file' and i.status = 'ready')
  from public.vault_items i
  group by i.partition_id
$$;

revoke execute on function public.vault_usage() from public, anon, authenticated;
grant execute on function public.vault_usage() to service_role;

notify pgrst, 'reload schema';
