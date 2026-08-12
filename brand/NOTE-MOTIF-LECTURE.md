# Note de motif — la page de lecture

Établie le 2026-08-12, après mesure de Medium et de Reddit en conditions
réelles (navigateur pilote, 1440×900 et 390×844). Rien n'est copié : ni
feuille de style, ni image, ni texte, ni code. On relève des **intentions
chiffrées**, on les réécrit avec les jetons Kogia.

## Ce qui a été mesuré, et ce qui ne l'a pas été

| Source | État | Méthode |
|---|---|---|
| Reddit `r/programming` | **mesuré** | géométrie calculée + règles de transition lues dans le CSSOM |
| Medium, page d'accueil | **mesuré** | idem — mais c'est leur page vitrine, pas l'application de lecture |
| Medium, page d'article | **non mesuré** | Cloudflare refuse le navigateur pilote (403) |
| kogiagroup.com | **mesuré** | le même script, pour que la comparaison soit honnête |

Aucune valeur Medium de page d'article n'est citée dans cette note. Les
corrections ci-dessous se justifient par nos propres mesures et par des
règles d'accessibilité publiques, pas par des chiffres supposés.

## 1. Intention

Une page de lecture a **un seul travail** : faire disparaître l'interface
pendant la lecture. Tout ce qui attire l'œil hors de la colonne centrale
est un défaut, sauf s'il aide à décider de lire ou non.

## 2. Hiérarchie

Le défaut mesuré chez nous : les titres ne suivaient pas la taille de
l'écran. Sur téléphone, `h1` tombait à 28 px pendant que `h2` restait figé
à 26 px — **la hiérarchie s'écrasait**, et l'article ressemblait à une
suite de blocs de même poids.

Échelle retenue, fluide de 390 à 1440, sans palier :

| Rôle | Téléphone | Bureau | Rapport au texte |
|---|---|---|---|
| Corps de texte | 18 px | 21 px | 1 |
| Chapeau (résumé) | 19 px | 23 px | ×1,1 — gris ardoise |
| `h1` | 32 px | 44 px | ×2,1 |
| `h2` | 23 px | 30 px | ×1,45 |
| `h3` | 20 px | 23 px | ×1,15 |

`h3` ne se distingue presque pas par la taille : il tient par le Sora, la
graisse 700 et la marge. C'est voulu — au-delà de trois niveaux, agrandir
encore casse le calme de la page.

Interligne 1,62. Les marges entre paragraphes sont exprimées en `em`, donc
elles grandissent avec le texte au lieu de rester figées.

**Largeur de lecture : 54 caractères** en colonne centrale à 21 px. C'est
la contrainte de la grille à trois rails, et elle est acceptable. Sous
45 ou au-dessus de 80, il faudrait revoir la grille.

## 3. État

Un état doit être visible **sans lire** : couleur, épaisseur, position.

- Onglet actif : encre pleine + trait sous l'onglet, jamais la couleur seule.
- Vote choisi : fond indigo pâle + bordure indigo + compteur en indigo foncé.
- Champ en erreur : le message se place **à côté de l'action**, et la saisie
  est conservée. Jamais d'alerte modale.
- Rien ne dépend uniquement de la couleur.

## 4. Rythme

Jetons inchangés (étude micro-interactions du 2026-08-12) :
`instant` 80–120 ms · `quick` 160–200 ms · `standard` 220–280 ms ·
`emphasis` 320–450 ms, réservé.

Mesure Reddit à titre de repère : 11 règles à `0.15s` sur
`cubic-bezier(0.4, 0, 0.2, 1)` — une courbe unique, appliquée partout. La
nôtre est `cubic-bezier(.2,.75,.2,1)`, et elle reste la seule courbe du
site. Un site sérieux n'a pas dix courbes.

Règle non négociable : **le retour visuel arrive avant la réponse réseau.**

## 5. Accessibilité

- **Plancher tactile 44 px** sur tout ce qui est cliquable. C'était le
  défaut le plus lourd : lien de retour à 14 px, liens du rail à 35 px,
  puces de sujet à 29 px, et un bouton « Publier » à **16 px**.
- Les puces de sujet s'arrêtent à 36 px, avec 0,6 rem d'écart entre elles :
  compromis assumé pour une commande secondaire dense.
- La page d'accueil n'avait **aucun `h1`**. Ajouté hors écran : la
  hiérarchie est correcte pour les lecteurs d'écran sans ajouter de texte
  à l'image.
- `prefers-reduced-motion` remplace le mouvement par couleur et bordure.

## 6. Ce qui n'est pas repris

Flux infini · karma · votes publics de popularité · classement par
indignation · confettis sur une action ordinaire. Voir la charte de design.

## Comment vérifier

```
python3 -m http.server 8899 --directory site
```
puis mesurer à 1440 et 390 : aucun débordement horizontal, aucune erreur
console, aucune cible cliquable sous 44 px (hors piège à robots), et
Lighthouse à 100 sur le site publié.
