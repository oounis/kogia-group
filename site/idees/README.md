# Publier une idée Kogia

Trois étapes. Pas de build, pas de base de données à gérer.

## 1. Copier le modèle

```
cp _modele.html mon-idee.html
```

Le nom du fichier EST l'adresse : `mon-idee.html` → `kogiagroup.com/idees/mon-idee.html`.
Choisir un nom lisible (`lavage-auto-mobile-tunisie`), jamais un identifiant.

## 2. Remplacer les marqueurs

| Marqueur | À remplacer par |
|---|---|
| `{{TITRE}}` | le titre de l'idée |
| `{{RESUME}}` | 1–2 phrases — sert aussi à l'aperçu sur les réseaux |
| `{{CATEGORIE}}` | Technologie · Business · Éducation · Fintech · Quotidien |
| `{{PAYS}}` | Tunisie, Bahreïn, Qatar… ou retirer la balise |
| `{{DATE}}` | ex. `14 août 2026` |
| `{{LECTURE}}` | durée estimée, en minutes |
| `{{SLUG}}` | **le nom du fichier sans `.html`** — c'est la clé des votes et commentaires |
| `{{CORPS}}` | l'article |

⚠️ `{{SLUG}}` doit correspondre exactement au nom du fichier, sinon les
commentaires d'un article s'afficheraient sous un autre.

## 3. Inscrire l'idée dans la bibliothèque

Ajouter un objet dans `../idees.json` :

```json
{
  "slug": "mon-idee",
  "titre": "…",
  "resume": "…",
  "categorie": "Business",
  "pays": "Tunisie",
  "date": "2026-08-14",
  "lecture": 9,
  "couleur": "indigo"
}
```

`couleur` : `indigo`, `violet`, `cyan` ou `terra` (la barre à gauche de la carte).
`"brouillon": true` cache l'idée de la page d'accueil sans supprimer le fichier.

Puis `git push` — le site se met à jour tout seul.

## Les étiquettes d'honnêteté

C'est la règle éditoriale de Kogia, rendue visible dans le texte :

```html
<span class="tag fait">Fait</span>        vérifiable, avec source
<span class="tag estim">Estimation</span>  calculé, méthode expliquée
<span class="tag hypo">Hypothèse</span>    supposé, non vérifié
<span class="tag avis">Avis Kogia</span>   notre opinion assumée
```

Un lecteur doit toujours savoir sur quoi il s'appuie. C'est ce qui distingue
Kogia d'un blog qui invente des chiffres.

## Ce qui fonctionne déjà dans chaque article

- **4 votes** : ça marcherait · ça ne marcherait pas · je l'utiliserais · j'y investirais.
  Un vote par personne et par choix, sans compte.
- **Commentaires**, sans compte : un nom, un message.
- Piège à robots + limite de débit côté serveur.

API : `https://kogia-site-api.onrender.com` (dépôt `api/`).
⚠️ Instance gratuite : après une période sans visite, la première requête peut
prendre ~30 s le temps du réveil. C'est annoncé à l'utilisateur pendant l'envoi.
