# Note de motif — le flux et la discussion

Deuxième note de la série, après `NOTE-MOTIF-LECTURE.md`. Établie le
2026-08-12 en mesurant Reddit au navigateur pilote (1440×1000, feuilles de
style lues dans le CSSOM, géométrie calculée sur les éléments rendus).

Rien n'est copié : ni feuille de style, ni image, ni icône, ni texte, ni
code, ni couleur. On relève des **intentions chiffrées**, on les réécrit
avec les jetons Kogia.

## Ce que Reddit fait, mesuré

| Élément | Mesure | Kogia |
|---|---|---|
| Carte de publication | 732×132, `padding 4px 16px`, `radius 16px` | **repris** — carte compacte, rayon 14 px |
| Ombre de la carte | **aucune** (`box-shadow: none`) | **repris** — l'élévation est réservée aux surfaces flottantes |
| Bordure de la carte | **aucune** | **adapté** — un filet bas sépare, sans encadrer |
| Titre | 18 px / 24, graisse 600 | **adapté** — 24 px Sora : notre flux tient trois idées, pas trois cents |
| Ligne de méta (auteur) | 12 px, graisse 700 | **repris** — 13 px, auteur · date · durée de lecture |
| Compteurs (votes, commentaires) | **12 px, sur chaque carte** | **repris** — c'est le motif décisif, voir plus bas |
| Boutons d'action | 32 px de haut, `radius 999px` | **adapté** — 36 px, plancher tactile Kogia |
| Échelle de rayons | 0,25 / 0,5 / 1 / 1,25 / 1,5 / 2 rem | **adapté** — 8 / 14 / 20 / 28 px + plein |
| Échelle d'espacement | 0,125 / 0,25 / 0,75 / 1 / 3 rem | **repris** dans l'esprit |
| Élévation | jetons dédiés `modal`, `navigation`, `tooltip` | **repris** — trois ombres, jamais sur une carte |
| Variables CSS sur `:root` | **641** | **rejeté** — 34 chez nous. Un système qu'une personne seule doit tenir |
| Courbe de mouvement | `cubic-bezier(0.4, 0, 0.2, 1)`, 11 règles à `0.15s` | **adapté** — une seule courbe, `cubic-bezier(.2,.75,.2,1)` |

## Le motif décisif : le signal de communauté

**Chaque carte Reddit porte ses compteurs.** Nos cartes n'en portaient
aucun. C'est la vraie raison pour laquelle notre flux ressemblait à une
liste d'articles et pas à une place publique — pas la typographie.

Repris, avec trois différences assumées :

- **Une seule requête** pour tout le flux (`/idees/compteurs`), agrégée en
  base. Une requête par carte réveillerait l'instance gratuite autant de
  fois qu'il y a d'idées.
- **`—` tant que la réponse n'est pas arrivée**, jamais `0`. Zéro serait un
  mensonge ; le tiret dit honnêtement « pas encore su ».
- **Si l'API ne répond pas, les compteurs disparaissent** au lieu de rester
  en tiret pour toujours. Le flux reste entièrement lisible sans eux.

## Ce que nous refusons, et pourquoi

| Motif | Pourquoi non |
|---|---|
| Flux infini | Il retire la décision d'arrêter. Une bibliothèque a une fin |
| Karma, score public de personne | Transforme la discussion en compétition |
| Tri « populaire » | Classer par approbation, c'est le mécanisme d'addiction lui-même. Nous trions par **conversation** : « Récentes » et « Plus discutées » |
| Vote négatif sur un commentaire | Fait taire au lieu de répondre |
| Notification de badge, compteur rouge | Fabrique une urgence qui n'existe pas |
| Confettis sur une action ordinaire | Le mouvement ample est réservé à un résultat vérifié |

Nos quatre votes ne sont d'ailleurs pas un score : *ça marcherait · ça ne
marcherait pas · je l'utiliserais · j'y investirais*. Ce sont quatre
questions, pas un pouce levé.

## La chaîne d'interaction

Le schéma appliqué partout, dans cet ordre :

**intention → état d'interface visible → interpolation courte → retour
visuel → résultat stable et accessible**

Exemple, le vote : appui (`scale .98`, 110 ms) → la carte prend l'état
`choisi` **avant** l'appel réseau → le compteur change par un fondu de
180 ms → si le réseau échoue, l'état revient et le message se pose à côté
du bouton, jamais dans une alerte.

## États de chargement et d'erreur

Trois états, jamais une page blanche :

- **Chargement** — silhouettes à la forme exacte des cartes (`.sq-carte`)
  et des commentaires (`.sq-comm`). La place ne bouge plus ensuite.
- **Vide** — une phrase qui explique, et une action.
- **Erreur** — ce qui a échoué, et un bouton **Réessayer**. La saisie d'un
  commentaire n'est jamais perdue.

L'instance API est gratuite : après une période de sommeil, la première
requête peut prendre ~30 s. C'est annoncé pendant l'envoi, pas caché.

## Techniques, dans l'ordre de préférence

1. CSS : `transform`, `opacity`, `@keyframes` — jamais `width`/`top`
2. SVG en ligne pour les petites illustrations et les icônes
3. `animation-timeline: scroll()` et `view()` — barre de progression et
   apparition des cartes, zéro JavaScript, exécuté sur le compositeur
4. `document.startViewTransition()` pour l'échange de la colonne centrale
5. JavaScript **seulement** pour l'état d'interaction, les compteurs en
   direct et l'amélioration progressive

Aucune bibliothèque d'animation. GSAP, Canvas ou Three.js seraient
justifiés par une fonctionnalité qui les exige réellement — reproduire un
fondu n'en est pas une.

## Mouvement réduit

`prefers-reduced-motion: reduce` ramène toute durée à 1 ms, supprime les
scintillements de silhouette, la barre de progression et les
transformations au survol. L'information passe alors par la couleur, la
bordure et le texte — jamais par le mouvement seul.

## Comment vérifier

```
python3 -m http.server 8899 --directory site
```

À contrôler à 1440 et 390 : les trois états du flux (retarder puis couper
`idees.json`), les compteurs, le tri, les silhouettes de discussion, aucun
débordement horizontal, aucune cible cliquable sous 44 px.
