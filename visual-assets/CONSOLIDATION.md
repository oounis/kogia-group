# Consolidation visuelle Kogia — état au 2026-08-21

Un seul document, à la place des quatre du matin (carte des actifs, carte des styles, handoff, registres JSON). Il dit ce qui est canonique, ce qui a été fait, et ce qui reste.

## La décision, en une phrase

Deux sources au niveau de la société, pas une de plus :

1. **Identité officielle** : `KogiaGroup/brand/` (marque, tuile/favicon, lockups, le livre **Kogia Harmony** et ses jetons `tokens/kogia.css` / `kogia.js`).
2. **Art partagé** : `KogiaGroup/visual-assets/` (60 icônes, 12 réactions, 6 avatars, 6 loaders, couloirs de couleur produit).

Les produits gardent un **couloir** (couleur, art de domaine), jamais un système général à part : Faz3a Iris, Coreon violet, Fixéo terracotta, Kharbga « Living Heritage ». Le site kogiagroup.com est un **couloir éditorial** de Harmony (fond blanc, Inter seul, un accent), consigné dans le changelog v5.1 du livre.

## Fait le 2026-08-21

| Quoi | Où | Preuve |
|---|---|---|
| Le registre d'icônes du site est **généré** depuis `visual-assets/icons/svg` (60) au lieu d'un ancien système de 46 | `community/tools/generer-icones.mjs` → `community/src/components/icons/chemins.ts` | `npm run typecheck` vert ; `--check` échoue si le registre est périmé |
| Le site parle Harmony : ses variables sont des alias de `brand/tokens/kogia.css` | `community/src/app/globals.css` (`@import` + alias) | captures avant/après 1440/390 |
| Harmony gagne `--k-t-instant` (100 ms) et le changelog v5.1 | `brand/tokens/kogia.css`, `kogia.js`, `KOGIA_HARMONY.md` | — |
| Débris de gabarit Next supprimés | `community/public/{file,globe,next,vercel,window}.svg` | aucun usage dans `src/` |
| Favicon de l'Owner Console réaligné sur la marque | `app/public/favicon.svg` = `brand/favicon.svg` | `cmp` |
| Ce paquet allégé : planches de direction IA (2,5 Mo), captures, outils raster retirés du dépôt | archivés dans `Current LAB/_Archive/2026-08-21-consolidation-visuelle/visual-assets-sources/` | `tools/validate.mjs` : 84 actifs OK |
| Ancien système concurrent de 114 actifs (21 Mo), ses deux DOCX, l'ancien catalogue, un DOCX de design en double | **archivés, pas détruits** : `Current LAB/_Archive/2026-08-21-consolidation-visuelle/` | le doublon octet pour octet `Kogia_Design_System_Arabic (2).docx` a été supprimé |

## Ce qui reste en place, et pourquoi

- `site/` (ancien site statique, 1 Mo) : **voie de retour** si kogiagroup.com doit quitter Render (`deploy.yml` en `workflow_dispatch`). Ses copies de logos sont identiques octet pour octet à `brand/`. On ne le retire qu'avec la décision de retirer la voie de retour.
- `site/assets/whales/` : baleines colorées du site statique. Partent avec `site/`.
- `kogia-characters/` (122 Mo, hors dépôt) : bibliothèque créative des baleines aquarelle. Source des mascottes ; reste hors production. Archivage possible une fois les avatars de ce paquet adoptés sur le site.
- `KOGIAGROUP_CATALOGUE_ASSETS_2026-08-18/` : illustrations du catalogue d'entreprise, pas des actifs d'interface.
- `Kharbga/04-UXUI/design-v3-claude/` : pièces, médaillons, réactions du jeu — art de domaine, intégré le 2026-08-20.
- Lanceurs / splash des mobiles (Coreon, Fixéo, Faz3a) : sorties de build requises, régénérées depuis l'identité officielle.
- `community/public/og.png`, `favicon.ico` : sorties déployées, à régénérer depuis `brand/` quand on le décide.

## Reste à faire (ordre conseillé)

1. **Réactions et avatars du paquet sur le site** : remplacer les baleines colorées et les emoji d'interface restants par `reactions/png` et `avatars/png`, avec des valeurs sémantiques stables (`thoughtful`, `inspired`…), jamais des chemins d'image en base.
2. **Owner Console (`app/`)** : importer les jetons et la marque depuis `brand/` au lieu de la géométrie en ligne de `src/ui.jsx` ; le `index.css` Tailwind doit se générer depuis `kogia.js`.
3. **Coreon / Fixéo / Faz3a** : importer la base Harmony (neutres, statuts, espacement, rayons, mouvement) et ne garder localement que le couloir produit. Fixéo porte encore l'ancienne ardoise `#5B6B7D`.
4. **Suite** : ne plus copier le CSS compilé (`community/public/suite`, `site/suite`) ; le reconstruire depuis `kogia-platform`.
5. **Kharbga** : vérifier que `08-Website/style.css` suit `tokens.json` ; retirer les restes violets/romains ; trancher `_rejected/` et les trois `Gemini_Generated_Image_*` (archiver).
6. `Kogia_Design_System_Arabic.docx` (survivant unique) : le faire pointer vers Harmony ; c'est une source d'idées, plus une autorité.
7. Tests à chaque étape : build + lint + typecheck, captures 1440/390 en thème clair, mouvement réduit, zoom 200 %, RTL là où ça existe.

## Couleurs produit (couloirs)

`tokens/product-colors.css` : `group` (océan Harmony), `coreon` (violet), `job` (terracotta) sont approuvés ; `faz3a` et `kharbga` reflètent leurs dépôts ; `coffee`, `suite` et les modules de la suite sont **proposés** et attendent l'accord d'Othman avant tout lancement public.

## Règles qui ne bougent pas

- Ne jamais redessiner la baleine ni utiliser un personnage comme logo.
- Une icône fonctionnelle hérite de `currentColor` ; la seconde teinte suit `--icone-accent` (site) / `--kg-icon-accent` (paquet).
- Même fichier d'icône sur le web et le mobile : on change le couloir, pas la géométrie.
- Aucune application n'invente ni ne stocke sa propre icône, réaction, avatar ou loader presque identique.
- Rien ne se supprime par déduction : on archive, et on supprime sur décision.
