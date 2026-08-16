# community/ — architecture (nouvelle couche de kogiagroup.com)

## Vue d'ensemble

```
Navigateur
   │
   ▼
Next.js (App Router, TypeScript) ── déploiement Vercel (ou équivalent)
   │  server components pour les pages publiques (SEO)
   │  @supabase/ssr pour les sessions en cookies
   ▼
Supabase
   ├─ Auth (Google OAuth, OTP e-mail)
   ├─ Postgres (RLS activé sur chaque table exposée)
   └─ Storage (avatars, images d'articles)
```

## Pourquoi Next.js + Supabase (voir `decisions/001-nextjs-supabase.md`)

Le site public (kogiagroup.com) est statique et **reste statique** — cette
app est un service séparé, sur un sous-domaine à décider (proposition :
`app.kogiagroup.com` ou `community.kogiagroup.com`), tant que la V1 n'a pas
prouvé qu'elle tient la route. Aucune migration du domaine principal sans
validation explicite.

## Sessions et authentification

- `@supabase/ssr`, cookies, pas de tokens dans le localStorage.
- PKCE pour le flux OAuth.
- Seules URL de callback approuvées explicitement en whitelist.
- `returnTo` validé comme chemin interne relatif uniquement — jamais une URL
  externe (protection open-redirect).
- Messages neutres à l'échec d'auth (« Si cette adresse existe, un code a été
  envoyé ») pour limiter l'énumération de comptes.

## Autorisation

L'authentification répond « qui es-tu ». L'autorisation répond « que peux-tu
faire ». Les deux sont nécessaires : RLS côté base **et** vérification côté
serveur dans les routes Next.js — jamais seulement un bouton caché côté client.

## Modèle de données

Voir `supabase/migrations/` pour le schéma exact. Tables principales :
`profiles`, `topics`, `articles`, `article_versions`, `comments`,
`reactions`, `bookmarks`, `user_follows`, `topic_follows`, `reports`,
`notifications`, `blocks`, `mutes`, `moderation_actions`, `user_consents`.

## SEO

Les pages d'articles, de sujets et de profils publics sont **rendues côté
serveur**, jamais derrière l'authentification. `noindex` sur `/join`,
`/login`, `/onboarding`, `/feed`, `/settings/*`, `/admin/*`.

## Sécurité — non négociable

- Aucune clé `service_role` côté client, jamais.
- RLS sur chaque table exposée.
- Limites de fréquence sur connexion, commentaires, réactions, follows,
  signalements, publication.
- E-mail vérifié requis avant de commenter ou publier.
- MFA (TOTP) requis pour les rôles modérateur/admin.
- Cloudflare Turnstile sur les tentatives d'inscription suspectes.
- SMTP dédié en production (le SMTP par défaut de Supabase est limité à 2
  e-mails/heure — inutilisable en production).
