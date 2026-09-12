# Kogia ID

> One person, one identity, across everything Kogia makes.

```
                     KOGIA ID
                        │
           ┌────────────┼────────────┐
           ▼            ▼            ▼
       Education      Skills        Play
```

Instead of a separate account in every product, one identity carrying:

- Identity · Preferences · Notifications
- Subscriptions · Payments
- Security · Privacy and consent

## Why it matters

Without it, a parent using Kogia Kids, a teacher using Coreon EDU and a worker using
Kogia Skills are three strangers. With it, they can be the same person — and
[Kogia Passport](kogia-passport.md) becomes possible.

## State and approach

**Not built.** Existing products have their own authentication and **will not be
rewritten to adopt it prematurely.**

The rule: new products are designed so that identity *can* be extracted later —
user records keyed on a stable id, authentication behind an interface, no
assumption that the local user table is the only one. That costs nothing now and
makes migration possible later.
