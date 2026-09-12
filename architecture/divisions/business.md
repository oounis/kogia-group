# Kogia Business

> **Modernize how real businesses work.**

Kogia Business is not a software house that builds websites to order. It is a
method:

> **Find industries that still run on paper, phone, WhatsApp and Excel — and build
> vertical software for one of them.**

This is the division with the shortest distance to revenue, because the customer
already runs a business, already feels the cost of the problem, and already pays
for solutions.

## Structure

```
KOGIA BUSINESS
├── Professional Services
│   ├── Legal
│   ├── Accounting
│   ├── Consulting
│   └── Administrative Services
├── Field Services
│   ├── Maintenance
│   ├── Construction
│   ├── Automotive
│   └── Technical Services
├── Commerce
│   ├── Retail · Restaurants · Small business · Local commerce
├── Property
│   ├── Property Management · Rentals · Facility Management
└── Operations
    └── Scheduling · Documents · Customers · Billing · Workflow
```

**These are categories, not products.** We do not build twenty SaaS products. We
research, choose one, and build it properly.

## Kogia Business Core — build once, configure many

```
                  KOGIA BUSINESS CORE
                           │
 ┌──────────┬──────────┬───┼───────┬──────────┬─────────┐
 ▼          ▼          ▼           ▼          ▼         ▼
Identity   CRM     Documents   Calendar    Billing   Workflow
 │          │          │           │          │         │
 └──────────┴──────────┼───────────┴──────────┴─────────┘
                       ▼
                 Intelligence
                       ▼
                INDUSTRY MODULES
```

An industry module changes **terminology, workflow, forms, permissions, document
types, templates, rules and reports** — not the engine. That is what makes the
second vertical cheap.

## The three product concepts

### Kogia Office — the digital workspace for professional offices

One engine, configured per profession, instead of `Kogia Notary` + `Kogia Lawyer` +
`Kogia Accountant` as separate products.

```
FILE #KG-2026-00231
├── Client        ├── Documents    ├── Deadlines
├── Type          ├── Parties      ├── Payments
├── Status        ├── Tasks        └── Activity history
```

Core surfaces: dashboard · client management · digital file · document
intelligence (OCR, extraction, search) · appointment booking · **client portal**.

The client portal alone removes a large share of phone calls: the client sees
*"Documents required: ✓ ID ✓ Birth certificate ❌ missing"* and uploads it.

### Kogia Flow — turn paperwork into workflows

```
REQUEST → INFORMATION → DOCUMENTS → REVIEW → APPROVAL
        → SIGN/ACTION → PAYMENT → ARCHIVE
```

More general than Office, and a stronger long-term platform: the same engine serves
legal offices, accountants, maintenance firms, property agencies, schools and HR.

### Kogia Desk — the small-business operating system

For the owner currently running on WhatsApp + Excel + a paper notebook. Mobile-first
PWA: customers · appointments · jobs · tasks · documents · quotes · invoices ·
expenses · messages.

## ⚠️ The legal boundary — not optional

For legal and notarial work, Kogia manages the **workflow around the profession**:
clients, files, appointments, documents, reminders, search, archiving, billing.

Kogia does **not** replace an official register, an official instrument, or a legal
signature without qualified legal review. Tunisia's Ministry of Justice is itself
moving toward digital justice; that is context, not permission.

This boundary is a design constraint, not a disclaimer.

## Where Business meets the other divisions

```
CUSTOMER → KOGIA SKILLS → the professional
                              │
                       KOGIA BUSINESS
                              │
            Schedule → Quote → Work → Invoice → Warranty
                              │
                              ▼
                      Proof of work
                              │
                              ▼
                      KOGIA PASSPORT
```

Skills finds the professional. Business runs the professional's business. The
completed job becomes proof in their Passport. **No competitor holds both ends.**

## Revenue

| Model | Who pays |
|---|---|
| SaaS subscription per office/seat | The business |
| Setup and migration | The business |
| Transaction/commission | Marketplace-style flows |
| Premium modules | Document intelligence, portal, analytics |

## State today

**Nothing is built.** Next step is research, not code — 10–20 interviews with real
professionals to see the actual workflow. See
[10 — Business opportunities](../10-BUSINESS-OPPORTUNITIES.md).
