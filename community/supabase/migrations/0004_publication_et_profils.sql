-- ════════════════════════════════════════════════════════════════════════
-- 0004 — Ferme une escalade de privilège réelle, et répare l'inscription.
--
-- ⚠️ FAILLE PROUVÉE le 2026-08-18, pas supposée. Scénario exécuté avec un
-- vrai compte `role = member` :
--   1. POST /rest/v1/articles avec status='published'  -> ACCEPTÉ
--   2. l'article devient visible par le public anonyme -> OUI
--   3. son corps est rendu via dangerouslySetInnerHTML -> XSS stocké
-- Autrement dit : n'importe qui pouvant créer un compte pouvait publier du
-- JavaScript exécuté dans le navigateur de chaque visiteur.
--
-- La page /write vérifiait bien le rôle, mais une vérification d'interface
-- ne protège rien : l'API PostgREST est publique. L'autorisation doit vivre
-- dans la base.
-- ════════════════════════════════════════════════════════════════════════

-- ═══ 1. PUBLICATION RÉSERVÉE AU STAFF ═══
drop policy if exists articles_author_write on articles;
drop policy if exists articles_author_update on articles;

-- Un membre peut créer, mais UNIQUEMENT en brouillon ou en relecture.
create policy articles_author_insert_draft on articles for insert
  with check (
    is_active_self(author_id)
    and status in ('draft', 'review')
  );

-- Un membre peut modifier ses propres articles, sans jamais pouvoir les
-- faire passer à `published` ou `archived` lui-même.
create policy articles_author_update_own_draft on articles for update
  using (is_active_self(author_id) and status in ('draft', 'review'))
  with check (is_active_self(author_id) and status in ('draft', 'review'));

-- Le staff (moderator/admin) publie. `articles_staff_update` existe déjà
-- pour la modification ; il lui manquait le droit d'insertion directe.
create policy articles_staff_insert on articles for insert
  with check (is_staff());

-- ═══ 2. PROFILS : l'inscription était cassée ═══
-- `profiles` avait RLS activé mais AUCUNE politique d'insertion, alors que
-- l'onboarding appelle upsert(). Un tout nouveau compte ne pouvait donc pas
-- créer son profil. Le seul profil existant avait été inséré via psql, ce
-- qui contourne RLS — d'où le fait que personne ne l'ait vu.
create policy profiles_insert_self on profiles for insert
  with check (
    id = auth.uid()
    and role = 'member'      -- personne ne s'auto-promeut au moment de créer son profil
    and status = 'active'
  );

-- Empêche aussi une escalade par UPDATE : la politique existante
-- (`profiles_self_update`) laissait un membre modifier son propre profil
-- sans restreindre les colonnes — donc se promouvoir `admin` lui-même.
-- Vérifié : cette politique existe bien sous ce nom exact.
drop policy if exists profiles_self_update on profiles;
create policy profiles_self_update on profiles for update
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select p.role from profiles p where p.id = auth.uid())
    and status = (select p.status from profiles p where p.id = auth.uid())
  );

-- NOTE : `user_consents` a DÉJÀ ses politiques (consents_owner_insert,
-- consents_owner_read) — vérifié dans pg_policies avant d'écrire ce
-- fichier. Le manque est côté application : rien n'écrit dedans. Rien à
-- corriger ici.
