# Execution checklist (living)

Last updated: 2026-11-09, end of session 2.

> **Change 2026-11-09 (founder):** Kogia Health is a separate product in its own private repo
> `oounis/kogia-health`, served at `healthcare.kogiagroup.com`, and must not be mixed with Kogia
> Systems. It supersedes decision 3 for healthcare. Its own specification and roadmap live in
> `kogia-health/docs/` (39 modules, 198 workflows, 126 roles). Release 1 inside Kogia Systems
> moves there in wave W2, then is removed from Systems.

Approved roadmap of 2026-11-09 ([11-THREE-LEVELS.md](11-THREE-LEVELS.md)).
Updated at the end of every work session. Legend: ✅ done and verified ·
🔨 in progress · ⏳ next · ⛔ blocked (needs the founder) · 💤 later.

## Phase 0 · Decide and correct
- ✅ 5 decisions approved by the founder (2026-11-09)
- ✅ Architecture rewritten to three levels: `11-THREE-LEVELS.md`, README banner
- ✅ kogiagroup.com rebuilt: three levels, AR (RTL) / FR / EN, one catalogue,
  wrong facts removed. Commit `4b560af`, deployed, production smoke 9/9 green
- 💤 Older docs 01, 03, 06, 07, 08 still describe the five domains (banner
  points to 11). Rewrite when touched.

## Phase 1 · Platform core (in `kogia-systems`)
- ✅ Already there: Better Auth login, organisations, 6 roles, audit log,
  App Engine, AR/FR/EN with RTL, encrypted vault, Postgres per app
- ✅ Kogia Health runs on the same login, organisations, roles and audit (no new repo)
- ⏳ Postgres row-level security on org-scoped tables
- ⏳ Extract `packages/ui` and `packages/i18n` once a second app consumes them
- ⛔ SMS / WhatsApp gateway: needs the founder to choose and pay a provider
- 💤 Single sign-on (SAML/OIDC) for client directories
- 💤 Kogia Tenders onto the shared login (separate repo today)

## Phase 2 · Kogia Health release 1
- ✅ Front office: patients (two-script names), appointments with clash check, check-in
  tickets, reception queue, waiting-room screen (numbers only)
- ✅ Billing: price list, invoices (8 lines, discount, tax), payments, overpay guard,
  void (admin, unpaid only), daily cash closing. 3-decimal money (LYD/BHD)
- ✅ Medical equipment: App Engine app `health-equipment` (devices, work orders,
  contracts, breakdown/recall alarms)
- ✅ Medical stores: items, batches with expiry, FEFO issue, adjustments, suppliers,
  purchase orders with partial receipt
- ✅ Management dashboard
- ✅ E2E 321 checks green locally (`kogia-systems/tests/e2e-health.mjs`), commit `1a66fe5`
- ✅ Deployed to systems.kogiagroup.com (`1a66fe5`): migrations applied, web1/web2 healthy,
  Health routes redirect anonymous visitors to login. Not yet exercised in production with a
  real account (no client organisation exists there yet).
- ✅ Demo clinic live: https://systems.kogiagroup.com/suite/demo-clinic/health (owner login,
  fictional sample data, no new account created). Not linked to an /ops client record.

## Kogia Health platform (repo kogia-health)
- ✅ Research, architecture (modular monolith), module/workflow/role specs, data model, roadmap
- ✅ W0 core: tenancy with row-level security (runtime role owns nothing), org units and
  positions, roles with unit scopes, workflow engine (chains, SoD, delegation, return,
  escalation), tasks inbox, notifications, outbox, audit
- ✅ W1 people: self-service, leave, monthly timesheet (employee → head of dept → HR →
  payroll), HR, team, payroll queue, admin views. 7 engine tests + 309 browser checks green,
  locally and on production (commit cc5ecd2+)
- ✅ Deployed on kogia-prod-01 (web1/web2 healthy, db kogiahealth_db, demo tenant Clinic X;
  demo logins in the founder's private file)
- ⛔ DNS: `healthcare` A 13.140.153.6 (DNS only) in Cloudflare. The stored token is dead.
- ⏳ Worker process (SLA timers, outbox dispatch) in deploy; editors for org/roles/chains
- ⏳ W2: patient access + billing + stores + procurement + biomedical (migrate release 1)

## Phase 3 · Corporate website
- ✅ Rebuilt and live (see Phase 0)
- ⏳ Partner pack: one-page company profile + Kogia Health brochure, AR/FR/EN

## Phase 4 · Health release 2 and Tenders
- 💤 Outpatient notes, lab orders, integration gateway (FHIR R4, HL7 v2, DHIS2)
- 💤 Tenders: organisations and teams, audit, shared login

## Phase 5 · Scale
- 💤 Insurance claims, rosters · second server · per-country hosting · ISO 27001

## Blocked on the founder
- ⛔ SMS/WhatsApp provider choice (cost)
- ⛔ Libyan partner name, once the agreement is signed
- ⛔ Libyan legal advice on the agent / local entity question

## Rules that hold
- 🔴 Never bid on, connect to, or compete for Bahrain's national HIS (I-SEHA or
  its replacement): conflict of interest with the founder's employer.
- No invented clients, certifications or figures anywhere.
