# Feuille de route

Ordre de construction, pas de dates fixes. Chaque étape suppose la
précédente terminée et vérifiée (build + lint + test manuel réel, jamais
supposé).

## Étape 0 — Débloquer (Othman)
Voir la liste précise dans `docs/STATUS.md`. Rien ci-dessous ne peut être
vérifié en conditions réelles avant que cette étape soit faite.

## Étape 1 — Fondations vérifiées
- Appliquer les migrations SQL contre le vrai projet Supabase.
- Vérifier l'inscription (Google + OTP e-mail) et l'onboarding de bout en
  bout, avec de vrais comptes de test.
- Vérifier que RLS bloque bien ce qu'elle doit bloquer (tester en tant
  qu'utilisateur non connecté, utilisateur normal, et modérateur).

## Étape 2 — Publier un premier article réel
- `/write` : éditeur d'article minimal (titre, contenu, sujets, publication).
- `/articles/[slug]` : rendu serveur réel, indexable, métadonnées Open Graph.
- Migrer l'article Kharbga déjà publié sur kogiagroup.com vers la plateforme,
  ou le laisser en place et ne publier que du contenu neuf ici, décision à
  prendre avec Othman le moment venu.

## Étape 3 — Participation
- Réactions, commentaires, signalement.
- Suivre un sujet, suivre un auteur.
- `/feed` réel à partir des sujets et auteurs suivis.

## Étape 4 — Modération
- `/admin/moderation` réel : file de signalements, actions, historique.
- Notifications de base (nouveau commentaire, nouvelle réponse).

## Étape 5 — Paramètres complets
- `/settings/*` réels : profil, compte, sécurité, notifications,
  confidentialité, export et suppression des données.

## Après validation
Seulement si Othman approuve la plateforme en usage réel : discuter d'une
éventuelle migration du domaine principal kogiagroup.com vers cette app.
Décision explicite requise, voir `CLAUDE.md`.
