# Kogia Group

**Technology for Human Progress.**

A Tunisian technology company organised around lasting human domains — learning,
capability, play and work — rather than around whichever products exist this year.

## 📐 Start with the architecture

**[`architecture/`](architecture/) is the constitution of the company.** Read it
before proposing anything: a product, a name, a repository, or a change to the site.

| | |
|---|---|
| [Principles](architecture/00-PRINCIPLES.md) | The rules, and the mistakes behind them |
| [Master structure](architecture/01-MASTER-STRUCTURE.md) | Group, divisions, platform |
| [Brand architecture](architecture/02-BRAND-ARCHITECTURE.md) | Naming — what may become a brand |
| [Lifecycle](architecture/05-LIFECYCLE.md) | How an idea becomes a product, and how it dies |
| [Repository map](architecture/07-REPOSITORY-MAP.md) | What exists, where it belongs |
| [Idea bank](architecture/09-IDEA-BANK.md) | Every idea, parked, with the test it must pass |

```
                              KOGIA
                         KOGIA GROUP
                               │
      ┌────────────┬───────────┼───────────┬────────────┐
      ▼            ▼           ▼           ▼            ▼
  EDUCATION     SKILLS       PLAY      BUSINESS     RESEARCH
      │            │           │           │            │
      └────────────┴───────────┼───────────┴────────────┘
                               ▼
                        KOGIA PLATFORM
              Kogia ID · Intelligence · Data · Design
```

## Live today

| Product | Division | What it is | URL |
|---|---|---|---|
| **Corporate site** | Group | The door to the Kogia world | https://kogiagroup.com |
| **Kogia Kids** | Education | Free printable worksheets for primary school | https://kogiakids.com |
| **Coreon EDU** | Education | Education ERP — evaluation, parent tracking, nursery → grade 6 | https://edu.kogiagroup.com |
| **EduPlus Connect** | Education | School management — attendance, roles, reports | in school use |

**All four live products sit in Education.** Skills, Play and Business hold nothing
yet — see the [repository map](architecture/07-REPOSITORY-MAP.md). That is an honest
picture, not an omission.

## Repository layout

| Path | What it is |
|---|---|
| `architecture/` | **The company's structure.** Start here. |
| `community/` | **This IS kogiagroup.com** (Next.js 16 + React 19 + Supabase) |
| `brand/` | Kogia Harmony — the brand kit. **Single source of truth** for logos |
| `visual-assets*/` | Illustration and asset sets ⚠️ overlapping, needs consolidation |
| `app/` | Owner Console — internal React prototype |
| `api/` | Internal API prototype |
| `site/` | The previous static site. Retired 2026-08-16, kept as rollback reference |
| `tools/` | Utilities |

## Deployment

kogiagroup.com runs on **kogia-prod-01**, deployed **by hand** with
`community/deploy/deploy.sh`. It has been on neither Render nor GitHub Pages since
2026-08-30.

⚠️ **There is no automatic deploy on push.** `.github/workflows/community.yml` gates
what is in `main`; it cannot tell you what is in production. What is live is whatever
was deployed last.

`edu.kogiagroup.com` (Coreon EDU) deploys from its own repository.

## History

On **2026-09-12** the company was cut from 32 repositories to 7, and this
architecture was adopted. Fourteen of the deleted repositories contained a name and
nothing else. The rules in [`architecture/00-PRINCIPLES.md`](architecture/00-PRINCIPLES.md)
exist so that does not happen twice.

Retired: Kharbga · ClampWars · Faz3a · Fixéo · Kogia Coffee · and the Soldéo/Relio/
Cadréo/Caissa/Cargon/Areneo/Planéo/Servéo/Lumeon/Motora/Immeon/Fabreon/Duopic suite.
