# Carte des interactions — Kogia Ideas

Écrite avant le code, tenue à jour avec lui. Une ligne par interaction :
**action → changement d'état → retour visuel → résultat serveur / échec.**

Règle : aucune commande décorative. Si un élément est visible, il agit ; s'il
n'agit pas, il n'existe pas.

## Flux

| Action | État | Retour visuel | Serveur / échec |
|---|---|---|---|
| Ouvrir la page | `chargement` | 3 silhouettes à la forme des cartes | `idees.json` ; échec → message + **Réessayer** |
| Compteurs demandés | `inconnu` → `connu` | `—` puis le nombre monte par interpolation | 1 requête `/idees/compteurs` ; échec → les compteurs disparaissent, le flux reste lisible |
| Saisir dans la recherche | `filtre-texte` | cartes masquées en direct, message si zéro | aucun réseau |
| Cliquer un sujet | `filtre-sujet` | onglet actif souligné, `aria-selected` | aucun réseau |
| Flèches ← → sur les onglets | `focus` | l'onglet suivant prend le focus et s'active | aucun réseau |
| Cliquer un tri | `tri` | puce pleine ; les cartes se réordonnent | aucun réseau ; masqué tant que les compteurs manquent |
| Survoler une carte | `survol` | filet à la couleur du sujet, vignette inclinée en 3D | aucun réseau |
| Cliquer une carte | `navigation` | transition de vue, seule la colonne centrale change | article chargé ; échec → navigation classique |

## Article

| Action | État | Retour visuel | Serveur / échec |
|---|---|---|---|
| Ouvrir l'article | `chargement` | barre de progression de lecture au défilement | — |
| Réactions demandées | `inconnu` → `connu` + `mien` | les 4 nombres montent ; **mon choix revient en surbrillance** | `GET /reactions` renvoie `mien` ; échec → nombres à `—` |
| Cliquer une réaction | `choisi` **immédiat** | glyphe qui rebondit, 6 étincelles, nombre qui monte | `POST /reactions` ; **échec → l'état revient et le message se pose sous la barre** |
| Copier le lien | `copié` | le bouton devient « Lien copié » 2 s, puis revient | `navigator.clipboard` ; échec → sélection de repli |
| Charger la discussion | `chargement` | 2 silhouettes de commentaire | `GET /commentaires` ; échec → message + **Réessayer** |
| Publier un commentaire | `envoi` | bouton désactivé + chargeur circulaire | `POST` ; **la saisie n'est jamais perdue en cas d'échec** |
| Commentaire publié | `publié` | le champ se vide, le compteur monte, la liste se recharge | — |
| Idées connexes | `prêt` | 3 cartes compactes, même sujet d'abord | construites depuis `idees.json` ; si aucune, la section est absente |

## Ce qui est réservé

Le mouvement ample (380 ms) sert **uniquement** à un résultat obtenu :
réaction enregistrée, commentaire publié. Jamais à une action ordinaire.

## Critères de recette

À vérifier à 390 et 1440, en clair et en sombre, avant de dire qu'une page
est finie :

1. Un visiteur découvre une idée, la lit, vote, commente, cherche une autre
   idée, et revient — sans hésitation.
2. Toute commande visible agit, ou n'est pas là.
3. Les états vide, chargement, erreur et réveil à froid sont dessinés.
4. Clavier, tactile, thème sombre et mouvement réduit fonctionnent.
5. La page a une vraie densité d'information — pas une grande page d'accueil vide.

L'instance API est gratuite : après une période de sommeil, la première
requête peut prendre ~30 s. Cet état est annoncé, jamais caché.
