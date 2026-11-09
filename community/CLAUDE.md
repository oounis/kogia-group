# community/ : kogiagroup.com (site de la société)

Ce dossier EST kogiagroup.com. Depuis le 2026-11-09 : site corporate à trois
niveaux (KogiaGroup › secteurs › produits), en arabe (RTL réel), français et
anglais, sans compte ni base de données. Servi par kogia-prod-01 (Docker +
Traefik, 2 répliques, `deploy/deploy.sh`).

## Où vit quoi
- `src/lib/catalog.ts` : LA source des secteurs et produits. Ajouter un produit
  = une entrée ici. Accueil, pages secteur, annuaire, pages produit, pied de
  page et sitemap en dérivent.
- `src/lib/copy.ts` : tous les textes visibles, en en/fr/ar.
- `src/lib/i18n.ts` : langues, direction, alternates hreflang.
- `src/proxy.ts` : une adresse sans langue renvoie vers /en, /fr ou /ar.
- `next.config.ts` : redirections des anciennes adresses françaises.
- `src/app/site.css` : jetons Harmony uniquement (`jetons-harmony.css` est
  GÉNÉRÉ depuis `brand/tokens/kogia.css`).

## Règles
- Le site dit ce qui est vrai : aucun client, certification ou chiffre
  inventé. Un statut produit doit être exact.
- Jamais de tiret cadratin (—) ni de point-virgule dans le texte visible.
- Les trois langues à chaque changement de texte. Propriétés logiques CSS
  (inline-start/end), jamais left/right.
- Le nom du fondateur n'apparaît pas sur le site.
- Ne jamais citer l'employeur du fondateur ni ses projets.

## Avant de dire « fini »
`npx next build`, `npx eslint src`, puis la fumée :
`SMOKE_BASE_URL=http://localhost:3100 npm run smoke` (serveur local) et contre
la production après déploiement (`npm run smoke`). En local, la canonique
pointe sur localhost si `.env.local` le dit : seule la production fait foi.
