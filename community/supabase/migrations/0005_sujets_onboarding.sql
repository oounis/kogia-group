-- ════════════════════════════════════════════════════════════════════════
-- 0005 — Les sujets de l'onboarding existent enfin en base.
--
-- Défaut constaté le 2026-08-26 sur la base de production : la table
-- `topics` contenait UNE seule ligne (`technologie`), alors que l'écran
-- d'onboarding proposait dix sujets écrits en dur dans le composant React
-- et exigeait d'en choisir trois. Deux conséquences :
--   1. neuf des dix sujets ne correspondaient à aucune ligne, donc toute
--      écriture dans `profile_topics` aurait violé la clé étrangère ;
--   2. la liste vivait dans le code, la vérité en base, et les deux
--      divergeaient sans que rien ne le signale.
-- `profile_topics` comptait 0 ligne : les choix étaient bel et bien jetés.
--
-- Depuis ce correctif, l'onboarding LIT `topics`. Ajouter un sujet se fait
-- ici, plus dans le composant.
-- ════════════════════════════════════════════════════════════════════════

insert into topics (slug, name) values
  ('technologie',              'Technologie'),
  ('intelligence-artificielle','Intelligence artificielle'),
  ('entrepreneuriat',          'Entrepreneuriat'),
  ('idees-de-projet',          'Idées de projet'),
  ('opportunites-affaires',    'Opportunités d''affaires'),
  ('design',                   'Design'),
  ('education',                'Éducation'),
  ('durabilite',               'Durabilité'),
  ('communaute',               'Communauté'),
  ('creativite',               'Créativité')
on conflict (slug) do nothing;

-- Retour en arrière, si jamais : supprimer les sujets sans rattachement.
--   delete from topics t where not exists (
--     select 1 from profile_topics pt where pt.topic_id = t.id)
--   and not exists (
--     select 1 from article_topics at where at.topic_id = t.id);
