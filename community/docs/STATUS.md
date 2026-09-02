# État du projet

Dernière mise à jour : 2 septembre 2026.

> **Ce dossier EST kogiagroup.com** depuis le 16 août 2026. Il ne s'agit ni
> d'un produit séparé, ni d'une préversion : le domaine public pointe ici.
> Les versions précédentes de ce fichier décrivaient un projet bloqué en
> attente d'un projet Supabase — c'est faux depuis le 15 août, et cette
> description périmée a réellement fait perdre du temps.

## Ce qui fonctionne réellement, vérifié en production

- **Le domaine public.** kogiagroup.com est servi par **kogia-prod-01**
  (Contabo, `13.140.153.6`), en deux répliques derrière Traefik, depuis le
  30 août 2026. Ce n'est plus Render : le paragraphe qui décrivait ici un
  service suspendu répondant 503 a été vrai du 20 au 30 août et faux ensuite,
  et il est resté trois jours de trop. Déploiement sans coupure par
  `/opt/kogia/apps/kogiagroup/src/community/deploy/deploy.sh`, lancé en tant
  que `kogia`, jamais avec `sudo`. TLS actif, `edu.kogiagroup.com` intact,
  enregistrements Zoho intacts.
- **La vitrine.** `/realisations` et ses dix pages de projet, `/journal`
  (vingt-sept faits datés) et `/savoir-faire`, en ligne depuis le
  2 septembre 2026. La liste des produits a une seule source,
  `src/lib/travaux.ts`, dont dérivent quatre pages et le plan du site.
- **L'en-tête et le pied de page sont partagés** (`src/components/Chrome.tsx`).
  Ils étaient recopiés page par page, ce qui avait déjà fait qu'une correction
  mobile ne touchait qu'une seule page.
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
  **12 routes × 8 largeurs** (320 → 1440) plus sécurité, images, liens
  internes, cibles tactiles et image de partage. **40 tests, tous verts en
  production le 2 septembre 2026.**

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
- **En-tête dupliqué, en grande partie résorbé le 2026-09-02.** Neuf pages
  publiques passent par `components/Chrome.tsx` : l'accueil, à propos,
  réalisations et ses pages de projet, journal, savoir-faire, explorer,
  conditions, confidentialité. Le CSS mort qu'elles laissaient derrière elles
  a été supprimé de `page.module.css`, `about.module.css`, `legal.module.css`
  et `explore.module.css`. **Restent quatre pages** avec leur propre en-tête :
  `articles/[slug]`, `drafts`, `write` et les réglages. Les deux premières
  partagent encore `.top`/`.topIn`/`.nav` dans `explore.module.css`, qui ne
  peut donc pas encore être nettoyé complètement.
- 24 icônes dessinées dans Figma, une seule (la baleine) livrée en React.
- **La CI rapporte, elle ne bloque toujours pas**, mais plus pour la même
  raison. Render n'existe plus dans le circuit : le déploiement est lancé à
  la main sur kogia-prod-01 par `deploy.sh`. Rien n'empêche donc de déployer
  un commit dont la CI est rouge, sauf la discipline. En faire une barrière
  demande d'appeler la fumée avant le basculement des répliques, dans
  `deploy.sh` lui-même.

## Prochaine tâche

L'inscription est terminée et prouvée, la vitrine est en ligne, l'en-tête
partagé existe. La suite, dans cet ordre :

1. **Semer les dix sujets en base** (une commande, ci-dessus). L'onboarding
   fonctionne déjà, mais il n'a qu'un sujet à proposer, donc la première
   question posée à une nouvelle personne n'a qu'une réponse possible.
2. **Donner à `/explore` de quoi exister.** Un seul article publié depuis le
   18 juin. La vitrine dit maintenant la vérité sur les produits, mais la
   partie « idées » du site promet une lecture qu'elle n'a pas.
3. **Le contrat de jetons unique**, puis les icônes en React.
4. **Une image de partage par projet.** Les dix pages retombent sur `og.png`,
   ce qui vaut mieux que rien mais donne dix aperçus identiques.

Non bloquant mais utile : brancher Resend, et activer Google côté Supabase
(le code du bouton attend derrière `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`).
