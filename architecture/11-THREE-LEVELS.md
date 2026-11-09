# 11 · Three levels and five industries (adopted 2026-11-09)

**This document supersedes the five human domains of 01, 03 and 06** wherever
they disagree. The founder approved it on 2026-11-09 together with four other
decisions (see "Decisions" below). The principles in 00, the lifecycle in 05
and the repository discipline in 07 still apply.

## Why it changed

The five domains (Education, Skills, Play, Business, Research) described
human activities, not buyers. Two real products, Kogia Systems and Kogia
Tenders, fitted none of them, and three domains stayed empty on the public
site. KogiaGroup now sells to organisations: hospitals, schools, companies and
public institutions. The structure follows the buyer.

## The shape

```
LEVEL 1   KogiaGroup            company, corporate site, brand, business development
             │
LEVEL 2   Industries            Healthcare · Education · Security and Buildings · Government · Enterprise
             │
LEVEL 3   Products              Kogia Health · Kogia Systems · Kogia Tenders · Coreon EDU · EduPlus Connect · Kogia Kids
             │
          Modules / apps        switched on per client organisation

UNDER ALL Kogia Platform        one login · organisations and roles · audit · AR/FR/EN + RTL ·
                                Harmony design · App Engine · notifications · billing · files ·
                                integration gateway · hosting and backups
```

| Product | Main industry | Also listed under | Status |
|---|---|---|---|
| Kogia Health | Healthcare | | In development |
| Kogia Systems | Security and Buildings | Healthcare, Government | Live |
| Kogia Tenders | Enterprise | Government | Live |
| Coreon EDU | Education | | Pilot (public demo) |
| EduPlus Connect | Education | | Live, one school |
| Kogia Kids | Education | | Live |

The public catalogue lives in `community/src/lib/catalog.ts`. It is the
single source for the website. Change it there, never in a page.

## What happened to the old domains

- **Education** stays, as an industry.
- **Business** becomes **Enterprise** (and Government for public buyers).
- **Skills** and **Play** are not industries. Kogia Tenders, once filed under
  Skills, is Enterprise. Ideas for Skills and Play stay in 09-IDEA-BANK.
- **Research** is an internal activity, not a public section.

## Centralise, modularise, keep independent

| Decision | What |
|---|---|
| Centralise (platform) | login, organisations and roles, audit, languages, design system, notifications, billing, hosting, backups |
| Modular | product modules, switched on per organisation |
| Independent | each product's data, domain and release cycle. Kogia Kids stays apart (consumer, no accounts) |
| Per client | dedicated deployment of the same code, own database |

**Where the platform lives:** the `kogia-systems` repository (npm workspaces)
grows into the platform. Kogia Health is built inside it, on its login,
organisations, roles, audit and App Engine. No new repository was created.
Tenders, Coreon and EduPlus migrate onto the shared login later, one at a
time, without breaking them.

## Mandatory for every product

1. Arabic (real RTL), French and English, on every screen, document and
   e-mail. Arabic is `dir="rtl"` on the root with logical CSS properties.
2. Role-based access and an audit trail for important changes.
3. Organisation-level data isolation.
4. Harmony tokens, never hand-copied hex values.
5. The site and the product say only what is true.

## Healthcare boundaries

Kogia Health manages the work around care (patients, appointments, billing,
equipment, stores). It does not make clinical decisions (no decision support,
dose calculation, triage scores or diagnosis) and does not replace a
hospital's clinical core. Those would be medical-device software and need a
quality system first.

## 🔴 Conflict-of-interest rule

Bahrain's national health information system (I-SEHA) and its announced
replacement are linked to the founder's employer. KogiaGroup never bids on,
connects to, or competes for them. In Bahrain, Kogia Health sells to private
providers only. The website never names the founder's employer.

## Decisions (2026-11-09, all approved)

1. Three levels and five industries replace the five domains.
2. The healthcare product is named **Kogia Health**.
3. `kogia-systems` grows into the shared platform. No new repository.
4. The site names Bahrain and Libya. The Libyan partner is named only after
   the agreement is signed.
5. Kogia Health release 1: front office, billing, medical equipment, medical
   stores, management dashboard.

Execution status: [EXECUTION.md](EXECUTION.md).
