# État du projet

Dernière mise à jour : 2026-08-15.

> Ce dossier vivait dans un dépôt séparé (`oounis/kogia-community`), fusionné
> dans `kogia-group` le 2026-08-15 à la demande d'Othman : un seul dépôt pour
> tout le projet, pas de repo à part. L'ancien dépôt a été supprimé.

## Ce qui existe et fonctionne

- Squelette Next.js 15 (App Router, TypeScript, Turbopack) : `npm run build`
  et `npm run lint` passent tous les deux, sans erreur ni avertissement.
- 19 routes générées, toutes listées ci-dessous. Aucune route n'affiche de
  fausse donnée : celles qui n'ont pas encore de logique réelle utilisent le
  composant `PlaceholderPage`, honnête sur ce qui manque.
- Schéma de base de données complet et non appliqué : `supabase/migrations/0001_init.sql`
  (18 tables) et `0002_rls.sql` (RLS activé partout, fonctions `is_staff()` /
  `is_active_self()`, une politique par action). Ces fichiers sont prêts mais
  n'ont encore jamais été exécutés contre un vrai projet Supabase.
- Authentification réelle codée (Google OAuth PKCE + OTP e-mail 6 chiffres),
  partagée entre `/join` et `/login` via `AuthForm`. Callback OAuth réel
  (`/auth/callback`) avec protection anti-redirection-ouverte (`safeReturnTo`).
  Rien de tout ça n'a pu être testé en conditions réelles : il n'y a pas
  encore de projet Supabase ni d'identifiants Google OAuth.
- Onboarding réel en 3 étapes (`/onboarding`) : identifiant + nom, choix de
  3 sujets minimum, confirmation. Logique de validation d'identifiant
  (regex, liste de réservés) codée mais pas testée contre une vraie base.
- Page d'accueil réelle (`/`) : héro, lien réel vers l'article Kharbga déjà
  publié sur kogiagroup.com, explication en 3 étapes, CTA final, pied de
  page minimal. Aucune donnée tendance ou recommandation inventée.

### Routes générées

| Route | État |
|---|---|
| `/` | Réelle |
| `/join`, `/login` | Réelles (formulaire, non testées en vrai) |
| `/auth/callback` | Réelle (non testée en vrai) |
| `/onboarding` | Réelle (non testée en vrai) |
| `/explore` | Placeholder honnête |
| `/topics/[slug]` | Placeholder honnête |
| `/articles/[slug]` | Placeholder honnête |
| `/about` | Placeholder honnête |
| `/feed` | Placeholder honnête, protégée par session |
| `/write`, `/drafts` | Placeholder honnête, protégées par session |
| `/settings/profile`, `/account`, `/security`, `/notifications`, `/privacy` | Placeholder honnête, protégées par session |
| `/admin/moderation` | Placeholder honnête, protégée par session + rôle (`moderator`/`admin`) |

## Ce qui est codé mais jamais exécuté

Tout ce qui touche Supabase (auth, base de données, session) est écrit
d'après la documentation officielle et les conventions Kogia, mais rien n'a
tourné contre un vrai backend. Tant que le blocage ci-dessous n'est pas levé,
aucune de ces routes ne peut être vérifiée en conditions réelles, seulement
relue.

## Ce qui bloque, et qui doit le faire

Ces cinq points ne peuvent pas être faits par Claude : ce sont des comptes et
des décisions externes qui appartiennent à Othman.

1. **Créer un projet Supabase** (supabase.com, gratuit pour démarrer) et
   récupérer l'URL du projet, la clé `anon` et la clé `service_role`. Sans ça,
   aucune page ne peut lire ni écrire de données réelles.
2. **Enregistrer une app OAuth Google** dans Google Cloud Console et récupérer
   l'ID client et le secret, pour activer la connexion Google dans Supabase
   Auth. Sans ça, seule l'OTP e-mail fonctionnera.
3. **Choisir un fournisseur SMTP** pour l'envoi des e-mails d'OTP et de
   notification (Resend recommandé, gratuit jusqu'à 100 e-mails/jour) et
   récupérer sa clé API.
4. **Choisir la plateforme d'hébergement** pour déployer l'app : Vercel
   (zéro config pour Next.js, déploiements de preview automatiques) ou
   Render (déjà utilisé pour Faz3a, un seul fournisseur en moins à gérer).
   Connecter le dossier `community/` du dépôt `oounis/kogia-group`.
5. **Décider du sous-domaine** de déploiement, par exemple `app.kogiagroup.com`
   ou `community.kogiagroup.com`, et créer l'enregistrement DNS correspondant.

Une fois ces cinq points réglés, les variables du projet Supabase et Google
vont dans `.env.local` (jamais commité, voir `.env.example` pour le modèle),
les deux migrations SQL s'appliquent avec `supabase db push` ou via
l'éditeur SQL du tableau de bord Supabase, et l'app peut être testée pour de
vrai.

## Prochaine tâche

Une fois le blocage ci-dessus levé par Othman : appliquer les deux
migrations, tester le flux d'inscription/connexion de bout en bout avec
Playwright, puis brancher `/write` (rédaction réelle d'un article) en premier,
parce que c'est la fonctionnalité qui débloque tout le reste du contenu.
