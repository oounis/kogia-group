# Execution checklist (living)

Last updated: 2026-11-09, end of session 1.

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
- ⛔ Demo clinic organisation for the Libya partner: creates a live account and password,
  waiting for the founder's go (see "Blocked on the founder")

## Phase 3 · Corporate website
- ✅ Rebuilt and live (see Phase 0)
- ⏳ Partner pack: one-page company profile + Kogia Health brochure, AR/FR/EN

## Phase 4 · Health release 2 and Tenders
- 💤 Outpatient notes, lab orders, integration gateway (FHIR R4, HL7 v2, DHIS2)
- 💤 Tenders: organisations and teams, audit, shared login

## Phase 5 · Scale
- 💤 Insurance claims, rosters · second server · per-country hosting · ISO 27001

## Blocked on the founder
- ⛔ Go for a demo clinic organisation in production (sample data, one admin account whose
  password goes to the private credentials file, never chat)
- ⛔ SMS/WhatsApp provider choice (cost)
- ⛔ Libyan partner name, once the agreement is signed
- ⛔ Libyan legal advice on the agent / local entity question

## Rules that hold
- 🔴 Never bid on, connect to, or compete for Bahrain's national HIS (I-SEHA or
  its replacement): conflict of interest with the founder's employer.
- No invented clients, certifications or figures anywhere.
