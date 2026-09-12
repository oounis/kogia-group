# Kogia Design System

> One design language across the entire ecosystem: **Kogia Harmony**.

This is the one platform component that **already partly exists**.

## Where it lives

| | |
|---|---|
| Definition | [`brand/KOGIA_HARMONY.md`](../../brand/KOGIA_HARMONY.md) |
| Tokens in code | `community/src/app/jetons-harmony.css` |
| Brand marks | `brand/marque/` |
| Visual assets | `visual-assets/` |

**Read `KOGIA_HARMONY.md` before touching any colour, logo or font.** It is the
authority; everything else is generated from it.

## The rule

A division does not invent its own design language. Kogia Kids feeling playful and
Coreon EDU feeling professional are **expressions within Harmony** — different
weights, spacing and imagery, the same system.

This is what lets someone recognise a Kogia product without reading the logo.

## What is still missing

- A **shared component library** — today each product implements its own buttons,
  forms and tables.
- **Tokens as a package** rather than a copied CSS file.
- **Documented usage per division.**

None of this is urgent with four products. It becomes urgent at the sixth — and the
right moment to extract it is when the second product in a division starts.

## ⚠️ Housekeeping

`visual-assets/`, `visual-assets-v2/`, `visual-assets-group-v1/` and
`visual-assets-products/` overlap and partly duplicate each other. Assets for
retired products (Faz3a, Kharbga) were removed on 2026-09-12. The remaining
duplication should be consolidated into one source before the design system is
extracted as a package.
