# 08 — Web architecture

## The principle

**kogiagroup.com is the door to the Kogia world** — not a landing page with four
logos on it.

Not twenty disconnected sites. One entrance, with products behind it.

## Structure

```
kogiagroup.com
│
├── /education        the division, its products, who it serves
├── /skills           the division — until a product exists, this is the story + waitlist
├── /play             the division
├── /business         the division + the industries being researched
├── /research         articles, indices, findings          ◄── the traffic engine
│
├── /about            what Kogia is and why
├── /company          structure, governance, careers
├── /journal          what is actually being built
└── /contact
```

Already live and staying: `/realisations`, `/journal`, `/savoir-faire`, `/news`,
`/explore`, `/articles`.

## When a product gets its own domain

| Condition | Own domain? |
|---|---|
| A consumer product with its own brand and audience | Yes — e.g. kogiakids.com |
| A B2B product sold to institutions | Usually a subdomain — edu.kogiagroup.com |
| A Labs experiment | Subdomain, never its own domain |
| A division with no product yet | **No domain.** A section of kogiagroup.com |

A product only leaves for its own domain when the brand is doing work that
kogiagroup.com cannot do for it.

## The traffic model

```
Kogia Research publishes an index or article
        ▼
Google · Reddit · social · press
        ▼
kogiagroup.com/research
        ▼
the relevant division
        ▼
a product
        ▼
a user, then a customer
```

**/research is the most commercially important section of the site**, even though it
sells nothing. It is the only part that brings strangers.

## Rules

1. **No orphan sites.** Every Kogia property links back to kogiagroup.com.
2. **A division without a product still gets a page** — the story, and a way to
   register interest. That page *is* the landing-page gate in the
   [lifecycle](05-LIFECYCLE.md).
3. **One design language** — [Kogia Harmony](platform/design-system.md).
4. **The site says what is true.** A division with no product says so. Claiming
   products that do not exist is how a company loses credibility in one visit.

## Current state

kogiagroup.com is live and already carries the showcase, journal and realisations.
**What is missing is the ecosystem structure** — the division sections that make it
a door rather than a brochure.

That is the next real piece of work on this repository.
