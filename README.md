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

- `site/` — the PREVIOUS static corporate site (French). No longer serves the domain since 16 August 2026, and its Pages workflow is manual-only. Kept as reference and as the rollback path.
- `brand/` — the Kogia Harmony brand kit (SVG mark, wordmark, per-division gradients). **Single source of truth** for logos; `site/assets/` mirrors it.
- `app/` — Owner Console (React 19 + Vite): internal group ERP prototype. Front-end demo with localStorage persistence; run with `cd app && npm install && npm run dev`.
- `community/` — **this IS kogiagroup.com** since 16 August 2026 (Next.js 16 + React 19 + Supabase): real accounts, database-backed articles, company/product pages. Not a separate product or brand. Served by Render; the apex and www CNAME to it through Cloudflare. `site/` below is the previous static implementation, kept only as reference and as a rollback path. Run with `cd community && npm install && npm run dev`.

## Deployment

kogiagroup.com is served by **Render** from `community/`, which auto-deploys on every push to
`main`. Quality runs in `.github/workflows/community.yml` (lint, typecheck, build on Node 26,
then a production smoke suite). ⚠️ Because Render deploys independently, that workflow reports
on a deploy rather than gating it.

`edu.kogiagroup.com` (Coreon EDU) is unaffected and still on GitHub Pages from its own repo.

**Rollback:** point the Cloudflare apex + www records back to the GitHub Pages A records
(185.199.108–111.153, DNS-only) and run the "Deploy Kogia Group site to Pages" workflow by hand.
