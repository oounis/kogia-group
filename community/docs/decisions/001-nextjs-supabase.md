# 001 — Next.js + Supabase, pas d'ajout au site statique existant

**Date :** 2026-08-15
**Statut :** décidé

## Contexte

kogiagroup.com est un site statique (HTML/CSS/JS, zéro framework) qui
fonctionne bien : Lighthouse 98-100 partout, un article publié, un entonnoir
Facebook/Reddit qui commence tout juste à amener des visiteurs. Othman veut
maintenant des comptes, la publication communautaire, les réactions/follows.

## Options considérées

1. **Injecter l'authentification dans le site statique existant** (un script
   Supabase Auth ajouté à kogia.js). Rejeté : casserait le rendu serveur des
   pages publiques, fragiliserait un site qui marche, et mélangerait deux
   architectures très différentes dans un seul dépôt.
2. **Next.js + Supabase, nouveau dépôt, nouveau sous-domaine.** Retenu.
3. **Alternative à Supabase : Clerk** (auth seule, plus poli hors de la boîte)
   ou **Firebase** (Firestore moins naturel pour un modèle relationnel
   follows/réactions/commentaires) ou **Auth0** (trop lourd pour une V1).

## Décision

Next.js (App Router, TypeScript) + Supabase (Auth, Postgres, Storage, RLS),
dans un dépôt séparé (`kogia-community`), déployé sur un sous-domaine séparé.
Le site statique kogiagroup.com continue de vivre et d'être mis à jour
pendant la construction. Migration du domaine principal seulement après
validation.

## Pourquoi Supabase plutôt que Clerk

Kogia n'est pas qu'un projet d'authentification : il a besoin de données
relationnelles réelles (articles, follows, réactions, sujets, commentaires,
modération, notifications). Supabase donne l'auth ET la base au même endroit,
avec RLS branché directement sur les mêmes règles de sécurité. Clerk reste
une alternative valable si la vitesse de mise en place prime un jour sur
l'unification du backend.

## Mise à jour — 2026-08-15

Le « dépôt séparé » de la décision ci-dessus (`oounis/kogia-community`) a été
fusionné dans `oounis/kogia-group`, comme dossier `community/` à côté de
`site/`, `app/` et `api/` : un seul dépôt pour tout le projet, à la demande
d'Othman. La raison technique de la décision reste valable, Next.js et le
site statique restent deux architectures différentes, mais elles vivent
maintenant dans le même dépôt Git plutôt que deux. Le sous-domaine de
déploiement reste une décision ouverte, voir `docs/STATUS.md`.
