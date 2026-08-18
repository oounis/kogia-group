# État du projet

Dernière mise à jour : 18 août 2026.

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

## Ce qui est construit mais incomplet

- **L'inscription de bout en bout n'a jamais été menée à terme par un vrai
  nouveau compte.** C'est la lacune la plus importante du produit
  aujourd'hui. Quatre défauts connus :
  1. la vérification du code e-mail redirige sans vérifier
     `onboarding_completed_at` (seul le rappel OAuth le fait) ;
  2. l'onboarding n'enregistre pas les trois sujets choisis ;
  3. `/login` et `/join` appellent exactement le même `signInWithOtp`, donc
     « Se connecter » crée un compte au lieu de dire qu'il n'y en a pas ;
  4. `user_consents` a ses politiques mais aucun code n'y écrit : le
     formulaire affirme une acceptation que rien n'enregistre.
- **Google OAuth** : le code existe, mais le fournisseur n'est pas activé
  côté Supabase (vérifié, HTTP 400). Le bouton est masqué derrière
  `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` en attendant.
- **L'e-mail d'authentification** part par le SMTP intégré de Supabase,
  limité à quelques envois par heure. Resend est vérifié et prêt mais n'est
  pas raccordé — cela demande le tableau de bord Supabase.

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

Terminer le parcours d'inscription (les quatre points ci-dessus), avec un
test de bout en bout sur un compte réellement neuf. Ensuite seulement :
en-tête partagé, contrat de jetons unique, icônes en React.
