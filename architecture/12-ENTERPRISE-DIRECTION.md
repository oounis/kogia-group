# 12 · Enterprise direction and commercial model (adopted 2026-11-11)

Source: the founder's instructions of 2026-11-11 and the planning conversation he held with
ChatGPT and shared the same day. This document adds to 11-THREE-LEVELS (structure) and replaces
06-REVENUE wherever they disagree. Prices quoted in that conversation were illustrative, not
verified market prices, and are deliberately not repeated here as commitments.

## 1. Who we are and who we sell to

KogiaGroup is an **enterprise software and systems integration company**. It owns products and
delivers them to institutions. It is not a web agency and not a seller of cheap app subscriptions.

Buyers, in the founder's words: government bodies, municipalities, courts, large private schools,
clinics and hospitals, law firms, accounting firms, and later banks. First market Libya (legal
entity and sales by the local partner), technical direction from Bahrain, then Tunisia and the Gulf.

**Tone rule for everything public.** The company is serious without saying "we are serious". The
site and documents show it through facts: what each product does, how data is protected, how a
project is delivered, what the client keeps when a contract ends. No slogans, no inflated claims.
The existing rule stays: nothing invented, every status exact (see community/CLAUDE.md).

## 2. Why not subscriptions only

The founder's reading of the market: subscriptions alone are a weak offer, because anyone can now
produce an app, and the buyer who pays well wants a system shaped for his institution with his
data protected. So the main offer is **licence + implementation + maintenance**, with managed
hosting as an option, not a requirement.

| Contract | What the client pays for |
|---|---|
| Software licence | the right to use the product (the code and design stay Kogia's) |
| Implementation and configuration | analysis, set-up, data migration, training, go-live |
| Custom development | modules or extensions the product does not have |
| Annual maintenance and support | security follow-up, updates, monitoring, support, tested backups |
| Hosting (optional) | private or managed infrastructure run by Kogia |

Three delivery models, all from the same code:

| Model | Where it runs | For whom |
|---|---|---|
| On-premises | servers inside the institution | public bodies, hospitals, anyone with hosting rules |
| Private deployment | a dedicated environment for one client | institutions that want isolation without running servers |
| Managed service | infrastructure run by Kogia, periodic fee | smaller clients who do not want servers |

Three things are always kept apart in contracts and in speech:
- **Data ownership**: the client's data belongs to the client.
- **Intellectual property**: source code, architecture and shared components belong to Kogia.
- **Hosting**: a choice of the client. Hosting outside the country is never a condition of use.
  Before hosting patient or financial data outside Libya, the rules of that sector are checked
  with a Libyan lawyer (the conversation found a 2025 data-protection circular tied to the central
  bank framework; whether it reaches other sectors is not verified).

For large clients a **source-code escrow** can be offered: the code is held by a third party and
released only in cases written in the contract. It gives continuity without giving up ownership.

## 3. One product, many institutions: the three levels of change

A product is built once and sold many times. Each institution must feel it was made for it,
without a separate copy of the code.

| Level | Meaning | Code change? |
|---|---|---|
| Configuration | structure, roles, numbering, approval chains, fees, forms, reports | No |
| Module | a reusable unit added to the product (first client may fund it) | Yes, once, for everyone |
| Custom extension | something truly specific to one client, kept separate from the core | Yes, isolated |

Rule: custom work never forks the product. Five clients must not become five versions. Every
development passes an architecture review and tests before it joins the product.

Structure (unchanged from 11): **Kogia Platform** (identity and access, organisation structure,
workflow engine, documents, notifications, reporting, audit, licences, integration gateway) under
**industry products** (their own business logic: a patient is not a student, a case file is not a
staff file) made of **modules**, set up per client by **configuration**.

Start as a modular monolith. Split a service out only when there is a real need.

## 4. Protection is part of the product, not an option

These are design requirements for every product sold to an institution, and they are also what the
public site must be able to state truthfully product by product.

- **Isolation**: separate database per client and dedicated deployment must be possible from the
  design. Logical separation in a shared database is acceptable only for small clients and only
  with strict tests. A separate database alone is not a security guarantee.
- **Encryption**: data at rest (databases, files, backups), data in transit (TLS everywhere), keys
  held apart from the data they protect, with rotation.
- **Access**: roles plus attributes (role, unit, relationship to the record). Multi-factor sign-in.
  Emergency "break-glass" access where the sector needs it, with reason, time, identity and review.
- **Audit**: who entered, who saw, who changed, old and new value, who approved. Hard to tamper with.
- **Backups**: 3-2-1-1-0 (three copies, two media, one off-site, one immutable or offline, zero
  errors after a restore test). A backup that was never restored is not a backup.
- **Disaster recovery**: a written plan per client with RPO (how much data may be lost) and RTO
  (how long to be back) agreed per module. Never promise in a contract what the infrastructure
  cannot deliver.
- **Security practice**: secure development lifecycle, code review, dependency and vulnerability
  scanning, penetration tests, patching, secrets outside the code, incident response plan,
  data-retention and secure-deletion policy, periodic access review.
- **Continuity and exit**: business continuity plan for Kogia itself, no dependence on a single
  vendor that cannot be replaced, and data portability: the client can export all its data in
  clear formats when the contract ends.

State of truth on 2026-11-11: the independent review of Kogia Health (kogia-health repo,
docs/audit-2026-11-10) found tenant isolation sound but foreign keys, immutable legal records,
multi-factor sign-in and password reset still missing. The site must not claim what is not built.

## 5. How a project is delivered

Discovery, business analysis, process mapping, requirements, gap analysis against the product,
solution design, configuration, development of gaps, data migration, integration, testing, user
acceptance, training, go-live, stabilisation, maintenance.

For every procedure of every department, before any build: who starts it, who receives, who
reviews, who approves, who may change it, which documents, which exceptions, what happens on
refusal, what happens when the person in charge does not answer.

Integration: an integration layer is a selling point (HL7 FHIR and DICOM in health, existing
accounting, payroll, registry and payment systems elsewhere). Some needs require hardware
(barcode readers, label printers, biometric devices): never promise that software alone does it.

## 6. Contract library to prepare (with a Libyan lawyer)

Master service agreement, software licence, implementation agreement, statement of work, custom
development, annual maintenance, service levels, data processing, confidentiality, hosting,
integration, disaster recovery. Each must settle: data ownership, code ownership, usage rights,
confidentiality, duties of both sides, payment, acceptance, warranties, liability limits,
termination, data export at the end, deletion after the retention period, incident handling,
maintenance duties.

Company formation in Libya (local company, joint company, branch of a foreign company or
representative office) is decided with a Libyan lawyer and accountant. Kogia's ownership of the
products and the code must be written down, never left as a verbal understanding with a partner.

## 7. Roles

| Founder, from Bahrain | Local team in Libya |
|---|---|
| product engineering, development, integration, infrastructure, security, technical project direction, key client conversations | sales, institutional relations, site visits, requirements gathering, user training, field support |

The local side never sells a technical promise the engineering side has not approved: offers,
prices and scope pass one approval path.

Departments to define now and staff later: executive, product, engineering, infrastructure,
security, business analysis, sales and marketing, project management, implementation, support,
finance, legal and contracts. The company itself needs an internal system (clients, contracts,
licences, projects, invoices, support), not spreadsheets and chat.

## 8. Order of work and the usage budget

1. Do not rebuild what exists. Existing products are prototypes to keep and improve.
2. Kogia Health is **frozen since 2026-11-11** (status in kogia-health/docs/STATUS-2026-11-11.md).
   It resumes when the founder says so.
3. Now: company structure, vision and public presentation (this document, the corporate site,
   the government and municipal offer).
4. Then: the three reference documents the conversation asked for, kept in this folder:
   business blueprint (this file plus 06 and 10), technical master architecture (platform/),
   product roadmap per product.
5. AI budget rule: plan first, then small defined tasks. No open-ended "finish the system" runs.
   One or two agents at a time. Decisions are written in the repo so no session re-explains them.

Entry order for sales (from the conversation, kept as advice): private hospitals and clinics,
private schools, law and accounting firms, companies, then municipalities and public bodies, whose
procurement takes longer. The founder's priority for presentation is the reverse: the public site
must speak to government first. Both hold: sell where entry is fastest, present at the level of
the hardest buyer.

## 9. Municipalities and the wider public sector

A product line the founder has announced and not yet started. Two sides:
- **Inside the municipality**: correspondence, decisions, staff, budget and revenue, licences and
  inspections, works and cleanliness operations, complaints.
- **Municipality and citizen**: requests for documents and services online, tracking, payment,
  documents delivered with a verifiable electronic seal, fewer queues and visits.

Research: architecture/research/2026-11-11-municipalities-and-public-bodies.md (read it before any
public claim). What it established on 2026-11-11:

- **Who issues what in Libya.** Birth, death, family status, family booklet and national number
  come from the **Civil Registry Authority** through its local offices, not from the municipality.
  Marriage is concluded by a ma'dhun under court supervision and then recorded at the civil
  registry. The **mukhtar al-mahalla** issues the residence attestation and five other
  attestations (Decision 43/2020). The **municipality itself** issues activity licences
  (Decision 224/2018) and building permits (Decision 225/2018) through its licences office.
  So the municipal portal never claims to issue civil status documents: it offers a service guide
  that routes those requests to the authority that issues them. A civil registry product would be
  a separate line sold to that authority.
- **Most valuable citizen services**: activity licence (new and renewal), building permit through
  engineering offices, mukhtar attestations, reports with photo and location, complaints with
  tracking, online payment of fees and fines, dues clearance certificate, advertising and
  public-space permits, appointments and queue tickets, public document verification page.
- **Most valuable internal modules**: correspondence and archive, licences office workflow and
  register, local revenue and receipts, complaints desk, council sessions and decisions follow-up,
  building permit and inspection, contractors with procurement and project follow-up, HR with
  attendance and assets.
- **Other public bodies, best ratio of need to entry difficulty**: chambers of commerce,
  professional orders (engineers, accountants), the Ministry of Local Government through donor
  programmes, state-owned enterprises, universities, water, sewage and cleaning companies, the
  Municipal Guard, education directorates, NGOs and international organisations' offices, then
  social security and banks for internal administration only (never core banking).
- **Procurement**: Regulation 563/2007 was repealed by Cabinet Decision 600/2024 (direct agreement
  capped at 1M LYD, 5M with Prime Minister authorisation, per the research; verify before a bid).
- **Not verified** (see the report's list): fee amounts, the state of electronic signature and
  seal certification under Law 6/2022, any national-number API, which payment services a
  municipality can contract, the official count of municipalities. The catalogues of services and
  modules in the report are design proposals built on the verified structure, not statements of law.

On the public site (2026-11-11): the Government page shows three planned lines (municipal
administration, services for residents and businesses, administrative core for public bodies) and
the Enterprise page two (law firms, accounting and audit firms), all labelled "Planned". The
"How we work" page states the three delivery models, data and code ownership, licence plus
implementation plus maintenance, configuration over rewriting, and data hand-over at contract end.
