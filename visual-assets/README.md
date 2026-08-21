# Kogia visual assets

L'art **partagé** de KogiaGroup pour les sites et les applications mobiles. Ce paquet ne contient volontairement **aucun logo, mot-symbole, favicon ni marque de remplacement** : l'identité vit dans `../brand/`, et seulement là. L'état de la consolidation (ce qui est canonique, archivé, à faire) est dans `CONSOLIDATION.md`.

## Contenu

- `icons/svg/` : 60 icônes fonctionnelles sur grille 24 × 24, trait 1,75, dont les contrôles propres au mobile.
- `loaders/svg/` : 6 loaders SVG animés à sens sémantique, avec repli `prefers-reduced-motion`.
- `avatars/png/` : 6 avatars de personnages, 512 × 512, fond transparent.
- `reactions/png/` : 12 réactions, 512 × 512, fond transparent.
- `tokens/` : les couloirs de couleur produit. La géométrie ne change jamais, la couleur si.
- `manifests/assets.json`, `manifests/vector-assets.json` : inventaires lisibles par machine, pour l'adoption et la validation.
- `gallery/` : page de revue locale. Servir le dépôt et ouvrir `/visual-assets/gallery/`.
- `PROMPTS.md` : les invites exactes de génération et la provenance (les planches de direction IA sont archivées hors dépôt).

## Règles

1. Ne pas redessiner le logo Kogia ; aucun personnage ne tient lieu de logo.
2. Une icône hérite de `currentColor` ; la seconde teinte, facultative, suit `--kg-icon-accent`.
3. Même fichier d'icône sur le web et le mobile. On change le couloir produit, pas la géométrie.
4. Tailles visibles : 16 en ligne, 18 dans un contrôle, 20 en navigation, 24 en mise en avant. Cible tactile ≥ 44 × 44.
5. Un loader n'apparaît qu'après ~300 ms. Une longue attente a un texte, une progression si elle est connue, un état d'erreur et de reprise.
6. Les réactions complètent la discussion, elles ne remplacent pas un désaccord écrit ni un signalement de sécurité.
7. Les personnages servent la communauté, l'accueil, les états vides, le guidage éditorial, jamais une décision légale, de paiement, destructive ou de sécurité.

## Adopter le paquet

Sur le site, **ne pas coller de SVG** : le registre `community/src/components/icons/chemins.ts` est généré depuis ce dossier par `node community/tools/generer-icones.mjs` (`--check` en CI). Le composant `<Icone nom="search" />` reste la seule façon d'afficher une icône.

Couleur produit : un attribut à la racine, puis l'import de `tokens/product-colors.css`.

```html
<html data-kogia-product="faz3a">
```

`group`, `coreon` et `job` sont des familles Harmony approuvées ; `faz3a` et `kharbga` reflètent leurs dépôts ; les autres sont **proposées** et attendent l'accord de la marque avant tout lancement public.

## Régénérer et valider

```bash
node visual-assets/tools/build-vectors.mjs     # icônes + loaders SVG
node visual-assets/tools/build-manifest.mjs    # manifests/*.json
node visual-assets/tools/validate.mjs          # 84 actifs : chemins, sécurité SVG, 512×512 RGBA, frontière d'identité, mouvement réduit
node visual-assets/tools/smoke-gallery.mjs     # la galerie rend tout et change de couloir (Playwright)
```

Les PNG finaux sont versionnés : adopter le paquet ne demande aucun outil de génération raster.
