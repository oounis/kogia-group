# community/ — instructions Claude (nouvelle couche de kogiagroup.com)

Plateforme communautaire de Kogia : comptes, publication, follows, réactions,
commentaires. Ce dossier vit **dans le dépôt `kogia-group`**, à côté de
`site/` (le site statique actuel), `app/` (Owner Console) et `api/`. Le
site statique reste la vérité tant que cette app n'est pas testée et
approuvée. Ne jamais migrer le domaine principal `kogiagroup.com` vers cette
app avant validation explicite d'Othman.

## Premiers pas, à chaque session
- Lire `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/STATUS.md` avant tout.
- `docs/STATUS.md` dit exactement où on en est et quelle est la prochaine tâche —
  ne jamais supposer l'état du projet depuis la conversation, le lire.
- Inspecter le code existant avant de proposer un changement.

## Décision produit (verrouillée)
Kogia est un site article-first : **lecture publique, participation avec
compte**. Jamais de mur d'inscription devant le contenu.
- Sans compte : lire les articles publiés, parcourir les sujets, chercher,
  voir les profils publics, voir réactions/commentaires, partager des liens.
- Avec compte : réagir, sauvegarder, suivre, commenter, signaler, publier,
  profil public, notifications, fil personnalisé.
- Le modal d'authentification est **contextuel** (« Créez un compte pour… »),
  jamais un mur générique au chargement.

## Règles de travail
- Le plus petit changement qui satisfait la demande.
- Jamais de mot de passe stocké — Supabase Auth uniquement (Google OAuth +
  OTP e-mail 6 chiffres pour la V1).
- La clé `service_role` de Supabase ne doit **jamais** apparaître côté client.
- RLS activé sur **chaque** table exposée — pas d'exception « je fais confiance
  au frontend ».
- Ne jamais annoncer une tâche terminée si les tests ou le build échouent.
- Français dans les commentaires et messages de commit (convention Kogia) ;
  le code (noms de variables, SQL) reste en anglais.
- **Jamais de tiret cadratin (—) ni de point-virgule ( ; ) dans les textes
  visibles à l'utilisateur** — règle de style Kogia, valable dans tout le
  dépôt. Virgule, point ou deux-points selon la phrase.
- Pas de dark pattern : jamais de faux compteur, de fausse urgence, de case
  pré-cochée pour le marketing, de bouton de refus caché ou terne.

## Qualité avant de dire « fini »
- `npm run build` doit passer.
- `npm run lint` doit passer.
- Tout changement de comportement a un test.
- Mettre à jour `docs/STATUS.md` en fin de session : ce qui marche, ce qui est
  en cours, ce qui bloque, la prochaine tâche.

## Ce qui bloque et attend Othman
Voir la liste précise dans `docs/STATUS.md` — ne pas inventer de identifiants,
ne jamais placer un vrai secret dans le dépôt, même dans un commit de test.
