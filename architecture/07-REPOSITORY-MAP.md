# 07 — Repository map

## What exists today — 2026-09-12

Seven repositories. Down from 32 the same day.

| Repository | Visibility | Division | Layer | State |
|---|---|---|---|---|
| `kogia-group` | public | Group | Corporate + architecture | Live — kogiagroup.com |
| `kogia-kids` | private | Education | Product | Live — kogiakids.com |
| `coreon-edu` | public | Education | Product | Live |
| `eduplus-connect` | public | Education | Product | Live, real school use |
| `coreon-mail-worker` | private | Education | Product infrastructure | Live — serves edu.kogiagroup.com |
| `kogia-infra` | private | Group | Platform — infrastructure & vault | Live |
| `iesco-esb-reference` | private | **not Kogia** | Day job — Indra/IESCO | Live |

**All three product repositories sit in Education.** Skills, Play and Business hold
nothing. That is an accurate picture of the company, and the reason the structure
exists is so that it does not stay that way by accident.

## Naming convention

```
kogia-<thing>              group-level and platform
<product-name>             products with their own brand
<product>-<component>      components of a product
```

Examples: `kogia-group`, `kogia-infra`, `kogia-kids`, `coreon-edu`,
`coreon-mail-worker`.

**No division prefix.** `education-kogia-kids` adds nothing — the division is
recorded here, not in the name. A product that moves between divisions should not
need renaming.

## Target shape — when there is something to put in it

```
kogia-group                 corporate site, brand, architecture   ✅ exists
kogia-infra                 infrastructure, deployment, vault      ✅ exists
kogia-design-system         Harmony as a package                   ⏳ when 2nd product in a division
kogia-platform              ID, shared services                    ⏳ when Kogia ID is real
kogia-intelligence          shared AI capability                   ⏳ when a product needs it

education/  kogia-kids ✅ · coreon-edu ✅ · eduplus-connect ✅
skills/     nothing yet
business/   nothing yet
play/       nothing yet
research/   ⏳ when publishing starts
```

⏳ means **the repository does not exist and must not be created yet.**

## The creation rule

> A repository is created at the **Labs/MVP** stage — when code is about to be
> written. Not at the idea stage, not at the naming stage.

See [05 — Lifecycle](05-LIFECYCLE.md).

**Why this rule is written in capital letters:** on 2026-09-12, fourteen
repositories were deleted that contained a README and nothing else — `soldeo`,
`serveo`, `relio`, `planeo`, `lumeon`, `cargon`, `caissa`, `cadreo`, `areneo`,
`motora`, `immeon`, `fabreon`, `kogia-platform`, `duopic`. Each existed because a
name felt real. None had a line of product code.

Creating empty repositories for the new architecture would rebuild exactly that
mess with better vocabulary.

## Migration rules

1. **Do not rewrite, rename, move or merge a working repository** without inventory,
   classification, mapping, a written migration proposal, and approval.
2. **Live products are touched only with a verified reason and a rollback** —
   kogiagroup.com, kogiakids.com, edu.kogiagroup.com.
3. **Order:** inventory → classify → map → identify duplication → propose → approve →
   migrate.
4. **No "beautiful refactor"** that destroys something that works.

## Known duplication to resolve

| Where | What |
|---|---|
| `kogia-group/visual-assets*` | Four overlapping asset folders |
| `kogia-group/site` vs `community` | `site/` is the retired static site |
| `kogia-group/app` + `api` | 225 MB — audit whether still used |

None is urgent. All should be resolved before the design system is extracted.
