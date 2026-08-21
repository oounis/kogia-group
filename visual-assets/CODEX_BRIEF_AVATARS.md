# Brief Codex — avatars et réactions Kogia, deuxième vague

> **LE FEU VERT EST DONNÉ (Othman, 2026-08-21). Pas de nouvelle analyse, pas de demande de confirmation : produire la planche, détourer, déposer les PNG, prévenir Claude.** L'analyse de Codex du même jour est acceptée telle quelle et intégrée ci-dessous.

Owner: Othman. Priorité: haute. Ce stade (la galerie `visual-assets/gallery/`) est celui qu'il regarde. Il veut **plus de personnalités** (drôles, bizarres, sérieuses) au niveau de finition des six premiers avatars, et la collection complète pour **chaque produit de Kogia World**, EduPlus Connect inclus.

Claude a tenté sept avatars en vecteur le 2026-08-21 : **rejetés par Othman**, retirés du paquet. L'illustration revient à Codex (génération d'images + détourage) ; Claude garde la structure, la validation, la galerie et l'intégration dans les produits.

## Où sont les choses

| Quoi | Chemin |
|---|---|
| Les 6 avatars approuvés (référence de style) | `KogiaGroup/visual-assets/avatars/png/{kogi,nara,rasm,mira,bunyan,sada}.png` |
| Les 12 réactions approuvées | `KogiaGroup/visual-assets/reactions/png/` |
| Les invites exactes qui ont produit les six | `KogiaGroup/visual-assets/PROMPTS.md` |
| Les planches de direction d'origine (hors dépôt) | `Current LAB/_Archive/2026-08-21-consolidation-visuelle/visual-assets-sources/creative-sources/` |
| L'outil de détourage d'origine (chroma magenta → PNG 512 RGBA) | `…/visual-assets-sources/build-raster.py` |
| Couloirs de couleur produit | `KogiaGroup/visual-assets/tokens/product-colors.{css,json}` |
| La marque et ses déclinaisons générées (ne pas toucher) | `KogiaGroup/brand/kogia-mark.svg`, `KogiaGroup/brand/marque/` |
| La charte | `KogiaGroup/brand/KOGIA_HARMONY.md` (§4 : le cachalot n'est jamais redessiné ; §11 : jamais la couleur seule) |
| Le validateur | `node KogiaGroup/visual-assets/tools/validate.mjs` |
| La galerie (servie depuis la racine du dépôt) | `http://localhost:8984/visual-assets/gallery/` |

## Le contrat de style (dérivé des six approuvés, à respecter au pixel)

- **Buste** : personnage anthropomorphe inspiré du cachalot pygmée, vu de trois-quarts, tête vers la droite, museau court terminé par une petite nageoire, cadré des épaules au sommet de la tête, centré, même échelle sur tous.
- **Anatomie** : ventre crème `#F1E8D2` en larme sur le bas du museau avec deux taches `#D9CDB2` ; œil minuscule, rond, sombre ; pas de bouche dessinée sauf expression explicite.
- **Trait et matière** : contour marin sombre continu, épaisseur constante (équivalent 6–8 px à 512) ; 2 à 3 couleurs dominantes par personnage. **Correction Codex, acceptée : ressembler aux six approuvés prime sur « tout plat ».** Les six ont une profondeur discrète (légers ombrages, nuances de teinte) : la garder. Éditorial et propre, jamais du clip-art plat ni, à l'inverse, du 3D, du photoréalisme ou des textures lourdes.
- **Anatomie du cachalot, non négociable** (c'est ce qui a coulé la tentative de Claude) : tête et corps d'un seul tenant, pas un cercle sur un torse ; pas de bec ; le ventre crème est une forme organique qui épouse le museau, pas une pastille collée ; l'accessoire soutient la personnalité, il ne la remplace pas ; recadrage et échelle identiques aux six ; lisible à **40 px** réels.
- **Un accessoire par personnage**, lisible à 40 px, qui porte la personnalité ; jamais de lettre, de logo, de texte, de marque.
- **Palette** : une couleur dominante par personnage, tirée ou accordée aux couloirs produit (`product-colors.json`) ou aux neutres Harmony ; les six existants occupent déjà océan, terracotta, sauge, violet, ambre, sarcelle : **choisir d'autres teintes** (corail, citron, indigo nuit, olive, prune, gris ardoise, turquoise, brique).
- **Fond** : chroma magenta `#FF00FF` parfaitement plat, puis détourage → **PNG 512 × 512 RGBA**, bord doux, aucun halo magenta.
- **Nom de fichier** : un prénom court, minuscules, sans accent : `avatars/png/<prenom>.png`. Le prénom devient l'identifiant stable dans les produits.
- **Culturellement respectueux, neutre en genre, chaleureux, professionnel** ; l'humour passe par l'accessoire et l'expression, pas par la caricature.

## Ce qu'Othman veut (vague 2)

Au moins **sept** nouveaux personnages, personnalités tranchées, par exemple :
1. le sceptique sérieux (lunettes carrées, sourcil levé)
2. le farceur (quelque chose qui surprend : chapeau de fête, nez de clown discret)
3. le bizarre (antenne, lunettes spirales, bonnet étrange)
4. le sage (lunettes rondes, nœud papillon, un petit livre)
5. la rêveuse (casque audio, yeux fermés, étoiles)
6. le cuistot (toque, cuillère)
7. le capitaine (casquette, caban)
Autres bienvenus : le grincheux, l'hyperactif, l'espion mystérieux, la grand-mère, le sportif, le jardinier, la scientifique.

Livrer en **une planche de direction** (grille propre, gouttières nettes, chroma magenta) comme la première fois, puis les PNG détourés individuels.

## Réactions : complétude par produit

Les 12 réactions sont universelles (couleur océan). Othman veut la collection **pour chaque produit**. Deux options, à discuter avec Claude avant de produire :
- **A. (recommandée)** garder un seul jeu de 12 et laisser le couloir produit colorer le cadre/le fond (déjà géré par `product-colors.css`) ; zéro nouvelle image.
- **B.** redessiner les 12 dans la teinte de chaque couloir (group, coreon, job, faz3a, kharbga, **eduplus**, coffee, suite) : 96 images, à ne faire que si A ne suffit pas à ses yeux.

## Critères d'acceptation

1. Déposer les PNG dans `visual-assets/avatars/png/` (et rien d'autre : pas de SVG, pas de manifest à la main).
2. Claude lance `tools/build-manifest.mjs` puis `tools/validate.mjs` : 512 × 512, RGBA, aucun logo, identifiants uniques.
3. Revue dans la galerie à 1440 et 390 px : lisibles à 40 px, même famille que les six, pas de halo.
4. Othman tranche dans la galerie ; ce qui n'est pas retenu est archivé, pas supprimé.

## Ce que Claude fait en parallèle (ne pas dupliquer)

- Couloir **EduPlus Connect** ajouté aux jetons (bleu 600 `#223DE7`, 500 `#3459F2`, depuis son `globals.css`) ; marques, tuiles, niveaux de compte et loaders régénérés par script.
- Intégration du paquet dans kogiagroup.com (badge de niveau, avatars de profil, loaders, réactions), puis Coreon, Faz3a, Kharbga, EduPlus.
