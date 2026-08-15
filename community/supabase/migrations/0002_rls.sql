-- Kogia Community — Row Level Security
-- Chaque table exposée a RLS activé. Défaut = refus ; chaque accès est une
-- permission explicite, jamais une exception.

alter table profiles enable row level security;
alter table topics enable row level security;
alter table profile_topics enable row level security;
alter table user_follows enable row level security;
alter table topic_follows enable row level security;
alter table articles enable row level security;
alter table article_versions enable row level security;
alter table article_topics enable row level security;
alter table reactions enable row level security;
alter table bookmarks enable row level security;
alter table comments enable row level security;
alter table reports enable row level security;
alter table blocks enable row level security;
alter table mutes enable row level security;
alter table moderation_actions enable row level security;
alter table notifications enable row level security;
alter table user_consents enable row level security;
alter table reserved_handles enable row level security;

-- Fonction utilitaire : le compte courant est-il modérateur/admin actif ?
create or replace function is_staff() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('moderator','admin') and status = 'active'
  );
$$ language sql stable security definer;

create or replace function is_active_self(target uuid) returns boolean as $$
  select auth.uid() = target and exists (
    select 1 from profiles where id = auth.uid() and status = 'active'
  );
$$ language sql stable security definer;

-- ═══ PROFILS ═══
-- Tout le monde lit les profils actifs (profil public) ; le staff voit tout.
create policy profiles_public_read on profiles for select
  using (status = 'active' or is_staff() or id = auth.uid());
create policy profiles_self_update on profiles for update
  using (is_active_self(id)) with check (is_active_self(id));
create policy profiles_staff_update on profiles for update
  using (is_staff());

-- ═══ SUJETS — lecture publique, écriture staff seulement ═══
create policy topics_public_read on topics for select using (true);
create policy topics_staff_write on topics for insert with check (is_staff());
create policy topics_staff_update on topics for update using (is_staff());

create policy reserved_handles_read on reserved_handles for select using (true);

-- ═══ FOLLOWS — visibles publiquement, gérés par leur propriétaire ═══
create policy profile_topics_read on profile_topics for select using (true);
create policy profile_topics_owner on profile_topics for all
  using (is_active_self(profile_id)) with check (is_active_self(profile_id));

create policy user_follows_read on user_follows for select using (true);
create policy user_follows_owner on user_follows for all
  using (is_active_self(follower_id)) with check (is_active_self(follower_id));

create policy topic_follows_read on topic_follows for select using (true);
create policy topic_follows_owner on topic_follows for all
  using (is_active_self(profile_id)) with check (is_active_self(profile_id));

-- ═══ ARTICLES — publié = public ; brouillon = auteur + staff seulement ═══
create policy articles_public_read on articles for select
  using (status = 'published' and visibility = 'public');
create policy articles_author_read_own on articles for select
  using (author_id = auth.uid());
create policy articles_staff_read on articles for select using (is_staff());
create policy articles_author_write on articles for insert
  with check (is_active_self(author_id));
create policy articles_author_update on articles for update
  using (is_active_self(author_id)) with check (is_active_self(author_id));
create policy articles_staff_update on articles for update using (is_staff());

create policy article_versions_author_staff on article_versions for select
  using (
    exists (select 1 from articles a where a.id = article_id and a.author_id = auth.uid())
    or is_staff()
  );
create policy article_versions_insert on article_versions for insert
  with check (
    exists (select 1 from articles a where a.id = article_id and a.author_id = auth.uid())
  );

create policy article_topics_read on article_topics for select
  using (
    exists (select 1 from articles a where a.id = article_id and a.status = 'published')
    or exists (select 1 from articles a where a.id = article_id and a.author_id = auth.uid())
    or is_staff()
  );
create policy article_topics_owner on article_topics for all
  using (exists (select 1 from articles a where a.id = article_id and a.author_id = auth.uid()))
  with check (exists (select 1 from articles a where a.id = article_id and a.author_id = auth.uid()));

-- ═══ RÉACTIONS ET SAUVEGARDES — publiques en lecture, privées en écriture ═══
create policy reactions_read on reactions for select using (true);
create policy reactions_owner on reactions for all
  using (is_active_self(user_id)) with check (is_active_self(user_id));

create policy bookmarks_owner_only on bookmarks for all
  using (is_active_self(user_id)) with check (is_active_self(user_id));

-- ═══ COMMENTAIRES — visibles publiquement sauf masqués, éditables par l'auteur ═══
create policy comments_public_read on comments for select
  using (status = 'visible' or author_id = auth.uid() or is_staff());
create policy comments_author_write on comments for insert
  with check (is_active_self(author_id));
create policy comments_author_update on comments for update
  using (is_active_self(author_id)) with check (is_active_self(author_id));
create policy comments_staff_update on comments for update using (is_staff());

-- ═══ SIGNALEMENTS, BLOCAGES, SOURDINES — strictement privés ═══
create policy reports_create on reports for insert
  with check (is_active_self(reporter_id));
create policy reports_own_read on reports for select
  using (reporter_id = auth.uid() or is_staff());
create policy reports_staff_update on reports for update using (is_staff());

create policy blocks_owner_only on blocks for all
  using (is_active_self(blocker_id)) with check (is_active_self(blocker_id));
create policy mutes_owner_only on mutes for all
  using (is_active_self(muter_id)) with check (is_active_self(muter_id));

-- ═══ MODÉRATION — lecture/écriture staff uniquement ═══
create policy moderation_actions_staff on moderation_actions for all using (is_staff());

-- ═══ NOTIFICATIONS — strictement privées à leur destinataire ═══
create policy notifications_owner_only on notifications for all
  using (is_active_self(user_id)) with check (is_active_self(user_id));

-- ═══ CONSENTEMENTS — strictement privés, jamais modifiables après coup ═══
create policy consents_owner_read on user_consents for select
  using (user_id = auth.uid() or is_staff());
create policy consents_owner_insert on user_consents for insert
  with check (is_active_self(user_id));
