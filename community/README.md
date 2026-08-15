# Kogia Community

Plateforme communautaire de Kogia : comptes, articles, sujets, réactions,
commentaires, modération. Vit dans ce dépôt, dossier `community/`, à côté de
`site/` (le site statique [kogiagroup.com](https://kogiagroup.com) actuel),
`app/` (Owner Console) et `api/`.

Lecture publique, participation avec compte. Voir `docs/PRODUCT.md` pour le
modèle produit complet.

## Stack

- Next.js 15 (App Router, TypeScript, Turbopack)
- Supabase (Auth, Postgres, Storage, Row Level Security)
- CSS Modules, tokens Kogia (blanc, noir, un seul bleu d'accent)

## Démarrer

```bash
npm install
cp .env.example .env.local   # renseigner les vraies valeurs, jamais commiter .env.local
npm run dev
```

Voir `docs/STATUS.md` avant tout : l'app ne peut pas être testée en
conditions réelles tant que le projet Supabase et les identifiants Google
OAuth n'existent pas.

## Documentation

- `docs/PRODUCT.md` — modèle produit, ce qui est public, ce qui est gated.
- `docs/ARCHITECTURE.md` — architecture technique, schéma, sécurité.
- `docs/STATUS.md` — état réel du projet, ce qui bloque, prochaine tâche.
  À lire en premier à chaque session.
- `docs/ROADMAP.md` — ordre de construction.
- `docs/decisions/` — décisions d'architecture (ADR).
- `CLAUDE.md` — règles de travail pour Claude Code sur ce dossier.

## Commandes

Toutes les commandes s'exécutent depuis `community/`, pas depuis la racine
du dépôt.

```bash
cd community
npm run build   # doit passer avant toute annonce de tâche terminée
npm run lint    # doit passer avant toute annonce de tâche terminée
npm run dev
```
