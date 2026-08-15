# Kogia Group

**KogiaGroup** — a Tunisian software company building an ecosystem of business applications on one shared platform. One engine, many products.

## Live today

| Product | What it is | URL |
|---|---|---|
| **Coreon EDU** | Education ERP — daily student evaluation, parent tracking, classroom monitoring (nursery → grade 6) | https://edu.kogiagroup.com |
| **Corporate site** | The company's public face | https://kogiagroup.com |
| **Soldéo + Relio demo** | Finance + CRM running live on the shared Kogia Platform | https://kogiagroup.com/suite/ |

## In active build

| Product | What it is | Status |
|---|---|---|
| **Faz3a** | Civic action platform — report local problems, converge volunteers, verify impact (Tunisia-first) | Backend + storage live; mobile app in Android build-up |
| **Fixéo** | Mobile services marketplace (Tunisia-first) | In development |

## The Kogia Suite (in preparation)

Soldéo (finance) · Relio (CRM) · Cadréo (HR) · Caissa (POS) · Cargon (WMS) · Areneo (reservations) · Planéo (PSA) · Servéo (helpdesk) · Lumeon (intelligence layer) — each planned as an app on the shared platform. Statuses are tracked honestly: two are running as live demos, the rest are in preparation.

> Kharbga and Kogia Coffee are side ventures by the same author, adjacent to but not part of the core product suite.

## Repository layout

- `site/` — the public corporate site (static, French). Deployed to GitHub Pages by `.github/workflows/deploy.yml`.
- `brand/` — the Kogia Harmony brand kit (SVG mark, wordmark, per-division gradients). **Single source of truth** for logos; `site/assets/` mirrors it.
- `app/` — Owner Console (React 19 + Vite): internal group ERP prototype. Front-end demo with localStorage persistence; run with `cd app && npm install && npm run dev`.
- `community/` — Kogia Community (Next.js 15 + Supabase): accounts, articles, follows, comments, moderation. Not deployed yet, see `community/docs/STATUS.md` for what's blocking. Run with `cd community && npm install && npm run dev`.

## Deployment

The site deploys automatically on every push to `main` (GitHub Actions → Pages).
