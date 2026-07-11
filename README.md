# Kogia Group

Corporate identity of **Kogia Group** — a Tunisian product studio. Two products today, more to come.

| Division | Product | Status |
|---|---|---|
| Kogia Education | Coreon Edu — the joyful daily life of the school (web live, Android app in progress) | Live: https://oounis.github.io/Kogia_Education/ |
| Yeddi | Yeddi — mobile-only Tunisian task marketplace (post a task in photos, offers, cash at the end, human-verified identity) | In development — Android first |

> Kharbga and Kogia Coffee are independent personal projects by the same author; they are **not** part of Kogia Group.

## Repository layout

- `site/` — the public corporate site (static, French, single `index.html`). Deployed to GitHub Pages by `.github/workflows/deploy.yml`.
- `brand/` — the brand kit (SVG mark, wordmark, per-division gradients). **Single source of truth** for logos; `site/assets/` mirrors it.
- `app/` — Owner Console (React 19 + Vite): internal group ERP prototype (clients, catalogue, provisioning, billing). Front-end demo with localStorage persistence; run with `cd app && npm install && npm run dev`.

## Deployment

The site deploys automatically on every push to `main` (GitHub Actions → Pages).
One-time setup: **Settings → Pages → Source: GitHub Actions** must be enabled on this repository.
