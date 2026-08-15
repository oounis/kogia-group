-- Kogia Community — schéma initial
-- Convention : citext pour les identifiants insensibles à la casse,
-- uuid partout pour les clés, timestamptz pour toute date.

create extension if not exists citext;
create extension if not exists pgcrypto;

-- ═══════════════════════════════════════════════════════════════
-- PROFILS — un par utilisateur Supabase Auth
-- ═══════════════════════════════════════════════════════════════
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle citext unique not null,
  display_name text not null,
  bio text,
  avatar_url text,
  locale text not null default 'fr',
  role text not null default 'member' check (role in ('member','moderator','admin')),
  status text not null default 'active' check (status in ('active','suspended','deleted')),
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint handle_format check (handle ~ '^[a-z0-9_]{3,30}$')
);
-- Identifiants réservés — voir docs/PRODUCT.md. Insérés en donnée, pas en
-- contrainte SQL : la liste doit pouvoir grandir sans migration.
create table reserved_handles (
  handle citext primary key,
  reason text not null
);
insert into reserved_handles (handle, reason) values
  ('admin','officiel'), ('support','officiel'), ('kogia','officiel'),
  ('moderator','officiel'), ('api','technique'), ('kogiagroup','officiel'),
  ('root','technique'), ('help','officiel');

-- ═══════════════════════════════════════════════════════════════
-- SUJETS
-- ═══════════════════════════════════════════════════════════════
create table topics (
  id uuid primary key default gen_random_uuid(),
  slug citext unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table profile_topics (
  profile_id uuid not null references profiles(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, topic_id)
);

-- ═══════════════════════════════════════════════════════════════
-- FOLLOWS
-- ═══════════════════════════════════════════════════════════════
create table user_follows (
  follower_id uuid not null references profiles(id) on delete cascade,
  followee_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id),
  constraint no_self_follow check (follower_id <> followee_id)
);

create table topic_follows (
  profile_id uuid not null references profiles(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, topic_id)
);

-- ═══════════════════════════════════════════════════════════════
-- ARTICLES
-- ═══════════════════════════════════════════════════════════════
create table articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles(id) on delete cascade,
  slug citext unique not null,
  title text not null,
  subtitle text,
  body text not null default '',
  cover_url text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  visibility text not null default 'public' check (visibility in ('public','unlisted')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index articles_author_idx on articles(author_id);
create index articles_status_idx on articles(status) where status = 'published';
create index articles_published_at_idx on articles(published_at desc) where status = 'published';

-- Historique des versions — permet de revenir en arrière, et sert de piste
-- d'audit pour la modération.
create table article_versions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  title text not null,
  subtitle text,
  body text not null,
  edited_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table article_topics (
  article_id uuid not null references articles(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete cascade,
  primary key (article_id, topic_id)
);

-- ═══════════════════════════════════════════════════════════════
-- RÉACTIONS, SAUVEGARDES, COMMENTAIRES
-- ═══════════════════════════════════════════════════════════════
create table reactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  article_id uuid not null references articles(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('marcherait','marcherait_pas','utiliserais','investirais')),
  created_at timestamptz not null default now(),
  unique (user_id, article_id, reaction_type)
);
create index reactions_article_idx on reactions(article_id);

create table bookmarks (
  user_id uuid not null references profiles(id) on delete cascade,
  article_id uuid not null references articles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, article_id)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  body text not null,
  status text not null default 'visible' check (status in ('visible','hidden','deleted')),
  created_at timestamptz not null default now(),
  edited_at timestamptz
);
create index comments_article_idx on comments(article_id);

-- ═══════════════════════════════════════════════════════════════
-- SÉCURITÉ COMMUNAUTAIRE
-- ═══════════════════════════════════════════════════════════════
create table reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references profiles(id) on delete cascade,
  target_type text not null check (target_type in ('article','comment','profile')),
  target_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references profiles(id)
);

create table blocks (
  blocker_id uuid not null references profiles(id) on delete cascade,
  blocked_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

create table mutes (
  muter_id uuid not null references profiles(id) on delete cascade,
  muted_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (muter_id, muted_id)
);

create table moderation_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references profiles(id),
  target_type text not null,
  target_id uuid not null,
  action text not null,
  reason text,
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- NOTIFICATIONS ET CONSENTEMENTS
-- ═══════════════════════════════════════════════════════════════
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_unread_idx on notifications(user_id) where read_at is null;

-- Le consentement newsletter est TOUJOURS séparé de l'acceptation des CGU —
-- jamais combinés dans une seule case à cocher.
create table user_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  document_type text not null check (document_type in ('terms','privacy','newsletter')),
  document_version text not null,
  accepted_at timestamptz not null default now(),
  source text
);

-- updated_at automatique
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger articles_updated_at before update on articles
  for each row execute function set_updated_at();
