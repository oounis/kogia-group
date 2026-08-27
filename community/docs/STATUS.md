# État du projet

Dernière mise à jour : 27 août 2026.

> **Ce dossier EST kogiagroup.com** depuis le 16 août 2026. Il ne s'agit ni
> d'un produit séparé, ni d'une préversion : le domaine public pointe ici.
> Les versions précédentes de ce fichier décrivaient un projet bloqué en
> attente d'un projet Supabase — c'est faux depuis le 15 août, et cette
> description périmée a réellement fait perdre du temps.

## Ce qui fonctionne réellement, vérifié en production

- **Le domaine public.** kogiagroup.com et www sont servis par Render
  (service `kogia-community`), via un CNAME aplati par Cloudflare. TLS actif,
  `edu.kogiagroup.com` intact, tous les enregistrements de messagerie Zoho
  intacts.
- **Les articles viennent de la base.** L'article Kharbga est stocké dans
  Supabase avec son auteur réel, rendu côté serveur, indexable.
  `/explore` liste depuis la base, `sitemap.xml` aussi.
- **Authentification par code e-mail.** Envoi vérifié (HTTP 200). Le code à
  six chiffres passe par `verifyOtp`, pas par un lien magique.
- **Autorisation en base (RLS).** Un membre ne peut créer qu'en `draft` ou
  `review`. Publier est réservé au staff. Un membre ne peut pas se promouvoir
  administrateur. Vérifié en rejouant les attaques après correction.
- **Assainissement du HTML stocké** à l'affichage, liste blanche stricte.
- **En-têtes de sécurité** : CSP sans `unsafe-inline` sur `script-src`,
  `nosniff`, HSTS, Referrer-Policy, Permissions-Policy, X-Frame-Options,
  `x-powered-by` supprimé.
- **Métadonnées sociales** absolues, canoniques, JSON-LD.
- **La démo Suite** reste servie sur `/suite/`.
- **Redirections** des anciennes URL `/idees/<slug>.html` partagées sur
  Facebook et Reddit.
- **CI** : lint, types, build sur Node 26, puis une fumée de production de
  8 routes × 8 largeurs (320 → 1440) plus sécurité, images et liens internes.

## L'inscription, menée à terme le 27 août 2026

C'était « la lacune la plus importante du produit ». Elle est fermée, et
prouvée par un test qui rejoue le parcours complet sur un compte réellement
neuf : `npm run e2e` (3 tests, verts). Les cinq défauts corrigés :

1. **La vérification du code e-mail ne regardait pas
   `onboarding_completed_at`.** Seul le rappel Google le faisait. Un compte
   neuf arrivé par code atterrissait sur l'accueil sans pseudo ni profil, et
   l'onboarding ne se déclenchait plus jamais.
2. **Les sujets choisis étaient jetés.** L'écran en exigeait trois et
   n'écrivait rien : `profile_topics` comptait 0 ligne en production.
3. **`/login` créait des comptes.** Les deux pages appelaient le même
   `signInWithOtp` avec ses réglages par défaut. `/login` passe désormais
   `shouldCreateUser: false` et le dit quand l'adresse est inconnue.
4. **`user_consents` n'était jamais écrit.** Le formulaire affirmait une
   acceptation que rien n'enregistrait. Les Conditions et la Politique de
   confidentialité sont maintenant consignées à la création du profil, avec
   leur version, lue depuis `src/lib/legal.ts` — la même constante
   qu'affichent les deux pages, pour qu'un consentement ne puisse pas
   référencer une version que personne n'a vue.
5. **La connexion par e-mail était impossible, et personne ne le savait.**
   Découvert en menant le parcours : le projet Supabase émet des codes de
   **8 chiffres** (mesuré, trois tirages), alors que le champ imposait
   `maxLength={6}` et `pattern="[0-9]{6}"`. Le navigateur tronquait chaque
   code reçu à six caractères, donc aucune vérification ne pouvait aboutir.
   Le champ accepte désormais l'intervalle permis par GoTrue (6 à 10) au
   lieu d'une longueur en dur.

Ce que le test exerce pour de vrai : l'interface construite depuis ce dépôt,
la vérification du code par Supabase, les politiques RLS, et toutes les
écritures en base (relues ensuite pour les vérifier). Seul l'ENVOI de
l'e-mail est simulé — ce n'est pas la logique testée, le SMTP intégré de
Supabase est limité à quelques messages par heure, et cela expédierait du
courrier à des adresses inventées. Le code saisi, lui, est un vrai code.
Le compte jetable est supprimé en fin de test, vérifié : aucun résidu.

## Ce qui est construit mais incomplet

- **Google OAuth** : le code existe, mais le fournisseur n'est pas activé
  côté Supabase (vérifié, HTTP 400). Le bouton est masqué derrière
  `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` en attendant.
- **L'e-mail d'authentification** part par le SMTP intégré de Supabase,
  limité à quelques envois par heure. Resend est vérifié et prêt mais n'est
  pas raccordé — cela demande le tableau de bord Supabase.

## Ce qui attend une décision d'Othman

- **Le domaine est suspendu, pas cassé.** kogiagroup.com répond 503 avec la
  page « Service Suspended » de Render, comme les sept services depuis le
  2026-08-20 : c'est la facturation, pas le code. Tant que ça dure, la fumée
  de production (`playwright.smoke.config.ts`) est rouge pour cette raison et
  pour aucune autre, et le site ne sert rien au public.
- **Les dix sujets ne sont pas encore semés en base.** La production ne
  contient qu'un sujet (`technologie`). Le correctif de code fonctionne avec
  ce qu'il trouve — l'onboarding exige `min(3, nombre de sujets)` et n'est
  donc pas bloqué — mais tant que la table n'est pas peuplée, une nouvelle
  personne ne peut choisir qu'un centre d'intérêt. La migration de données
  est écrite (`supabase/migrations/0005_sujets_onboarding.sql`) et
  rejouable sans risque de doublon :

      node tools/semer-sujets.mjs             # liste, n'écrit rien
      node tools/semer-sujets.mjs --appliquer # écrit

  Ce sont des lignes de référence, additives, et le retour en arrière est
  écrit en commentaire dans la migration.
- **`npm run e2e` n'est pas en CI.** Le lancer en CI demande de poser
  `SUPABASE_SERVICE_ROLE_KEY` dans les secrets GitHub, ce qui est un choix
  de sécurité à faire en conscience, pas une évidence. Pour l'instant il se
  lance à la main, contre un serveur local.

## Ce qui n'existe pas encore

`/feed`, `/topics`, les réglages, la modération : pages honnêtes annonçant
leur absence. Réactions, commentaires, follows : le schéma existe, l'interface
non. Le rendu d'article est plus pauvre que celui de l'ancien site statique
(pas de partage, votes, commentaires, articles liés) — la présentation a été
perdue à la migration, pas seulement recolorée.

## Dette connue, assumée

- Trois systèmes de jetons concurrents (`brand/`, `site/`, `community/`) qui
  se contredisent. Les 38 variables Figma ne sont donc pas la vérité du code.
- Cinq routes redéfinissent chacune le même en-tête ; quatre modules CSS
  redéfinissent `.top`/`.topIn`/`.nav`. C'est la raison pour laquelle une
  correction mobile n'a d'abord touché qu'une seule page.
- 24 icônes dessinées dans Figma, une seule (la baleine) livrée en React.
- La CI rapporte sur un déploiement, elle ne le bloque pas : Render déploie
  de son côté. Pour en faire une vraie barrière, il faut couper le
  déploiement automatique de Render — décision d'Othman.

## Prochaine tâche

L'inscription est terminée et prouvée. La suite, dans cet ordre :

1. Semer les dix sujets en base (une commande, ci-dessus) — l'onboarding
   fonctionne déjà, mais il n'a qu'un sujet à proposer.
2. L'en-tête partagé : cinq routes le redéfinissent, quatre modules CSS
   redéfinissent `.top`/`.topIn`/`.nav`. C'est la cause directe d'une
   correction mobile qui n'avait touché qu'une seule page.
3. Le contrat de jetons unique, puis les icônes en React.

Non bloquant mais utile : brancher Resend, et activer Google côté Supabase
(le code du bouton attend derrière `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`).
