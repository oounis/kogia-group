# Kogia Group

Corporate identity of **Kogia Group** — a Tunisian technology group with three divisions and three products online.

| Division | Product | Live |
|---|---|---|
| Kogia Education | Coreon Edu (school management SaaS) | https://oounis.github.io/Kogia_Education/ |
| Kogia Business | Kogia Coffee (e-commerce, Djerba) | https://oounis.github.io/Kogia_Coffee/ |
| Kogia Games | Kharbga: Origins (heritage board game) | https://oounis.github.io/Kogia_Game_KRBG/ |

## Repository layout

- `site/` — the public corporate site (static, French, single `index.html`). Deployed to GitHub Pages by `.github/workflows/deploy.yml`.
- `brand/` — the brand kit (SVG mark, wordmark, per-division gradients). **Single source of truth** for logos; `site/assets/` mirrors it.
- `app/` — Owner Console (React 19 + Vite): internal group ERP prototype (clients, catalogue, provisioning, billing). Front-end demo with localStorage persistence; run with `cd app && npm install && npm run dev`.

## Deployment

The site deploys automatically on every push to `main` (GitHub Actions → Pages).
One-time setup: **Settings → Pages → Source: GitHub Actions** must be enabled on this repository.
