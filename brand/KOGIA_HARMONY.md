# Kogia Harmony

**The design philosophy of Kogia Group.**
One creative vision. Two products. Every surface recognisably ours.

Version 3.0 — 2026-07-12. This file replaces `DESIGN_SYSTEM.md` and is the **single
source of truth**. Where any code disagrees with this document, the code is wrong.

---

## 1. Where the name comes from

*Kogia* is the genus of the **dwarf and pygmy sperm whale** — the smallest whales on
Earth. We did not choose it because whales are cute. We chose it because of how this
particular animal behaves, and every rule in this document descends from that.

What the animal actually is:

| Trait of *Kogia* | What we take from it |
|---|---|
| The **smallest** whale, yet unmistakably a sperm whale — a full-size brain in a compact body | Small team, big-company standards. Compact products that are complete, not "lite". |
| **Steely grey with a pink tinge — reads violet-blue underwater** | Our signature is not "tech blue". It is a **deep marine violet-indigo**: the colour of a body seen through water. |
| A pale crescent behind the eye — the **"false gill"**, a mark that mimics a shark | **The Kogia Crescent** — our interface motif (loaders, empty states). Deliberately *not* the logo: on a Tunisian company a crescent reads as the national flag. See §4.2. |
| A **deep, quiet diver**; hunts far below, in the dark, alone | Depth over noise. Calm surfaces. Nothing shouts. |
| Its **fluke** — the one shape that says "whale" without drawing one | **The mark**: a K whose arm is a fluke. The initial and the animal in one form. See §4.1. |
| Rests **completely motionless** at the surface | Stillness is the default state. Motion is an *event*, never decoration. |
| Defends itself by releasing a **reddish-brown cloud**, then vanishing | The warm **terracotta** in our palette is not arbitrary — it is the ink cloud. It is the one hot colour the family owns. |
| **Elusive, rarely seen, hard to study** | We do not fake presence. No invented metrics, no fake logos, no stock-photo customers. |

The objective is never to draw the fish. The objective is to build a technology brand
that *feels* the way this animal moves: quiet, deep, intelligent, warm underneath.

**Sources:** [WDC — pygmy sperm whale](https://us.whales.org/whales-dolphins/species-guide/pygmy-sperm-whale/) ·
[WDC — dwarf sperm whale](https://us.whales.org/whales-dolphins/species-guide/dwarf-sperm-whale/) ·
[Animal Diversity Web — *Kogia breviceps*](https://animaldiversity.org/accounts/Kogia_breviceps/)

---

## 2. The philosophy: Kogia Harmony

Five laws. They apply to the corporate site, to Coreon Edu, to Kogia Job, and to every
product we have not built yet.

**1 — One ocean, many creatures.**
Every product shares the same water: the same neutrals, the same type scale, the same
radii, the same motion curve, the same house mark. A product expresses its personality
through **colour, illustration and rhythm** — never by inventing a new type system, a
new shadow, or a new corner radius. If two products differ in a way a user would not
notice, that difference is a bug.

**2 — Stillness is the resting state.**
The whale floats motionless. Interfaces open calm and stay calm. Animation exists to
explain a change (something arrived, something moved, something is loading) — never to
prove we know how to animate. Everything obeys `prefers-reduced-motion`.

**3 — Depth, not decoration.**
Elevation, colour and contrast are used to say *what matters most*, in that order. A
screen has one primary action. A card has one focal point. If everything is emphasised,
nothing is.

**4 — Warmth underneath.**
A cold marine palette alone would read as another enterprise SaaS. The terracotta ink
cloud and the pearl crescent keep the ecosystem human. Every product must carry at least
one warm surface. Cold is the structure; warm is the welcome.

**5 — Earn the pixel.**
Every element justifies itself or it is deleted. No decorative gradients on data. No
emoji as icons. No raster or AI imagery in product UI — flat vector only. No fake
numbers, ever.

---

## 3. Colour

Colour is the strongest carrier of the Kogia identity, so it is the most tightly ruled.
**Every value below has been checked, not eyeballed.** Chart palettes are validated with
the six-check validator (lightness band, chroma floor, CVD separation, contrast); UI
colours are checked for WCAG contrast. Numbers quoted are measured.

### 3.1 The neutrals — the water (identical in every product)

| Token | Hex | Use |
|---|---|---|
| `abyss` | `#071726` | Dark-mode ground. The deep. |
| `ink` | `#0E2135` | Primary text. **16.3:1** on white. |
| `slate` | `#5B6B7D` | Secondary text. **5.46:1** on white, **5.08:1** on canvas — passes AA as real text, not just "large". |
| `line` | `#DCE3EB` | Borders, dividers, grid. |
| `canvas` | `#F4F7FA` | Page background. Cool, marine — never pure grey. |
| `surface` | `#FFFFFF` | Cards, sheets. |
| `pearl` | `#FDF6F0` | The crescent's light. The one **warm** surface. Use it to make a section feel human (law 4). |

This replaces the three competing inks (`#0F172A`, `#1A1B2E`, `#10162B`) and two canvases
that were in the codebase. There is now one.

### 3.2 The brand — the body seen through water

| Token | Hex | Contrast | Rule |
|---|---|---|---|
| `indigo` | **`#4F57DE`** | **5.60:1 as text on white — and 5.60:1 as white text on it** | **The Kogia primary.** |
| `violet` | `#8B5CF6` | 4.23:1 | Gradient partner, large text, fills. |
| `cyan` | `#22D3EE` | **1.81:1** | **DECORATIVE ONLY. Never text. Never an icon that carries meaning alone.** It is the spout catching light. |
| `terracotta` | `#E85D2F` | 3.48:1 | The ink cloud. Fills, marks, large display type. |
| `terra-deep` | `#C2410C` | 5.18:1 | Terracotta **as text**. |
| `terra-ink` | `#7C2D12` | 8.47:1 on `terra-tint` | Terracotta text on a warm tint. |

> **Why `#4F57DE` and not the old `#6366F1`.** `#6366F1` measures ≈3.7:1 on white: it
> cannot legally be body text, so the old code had to keep a *second* darker indigo
> around for text and a lighter one for fills — which is exactly how a palette rots into
> six near-identical purples. `#4F57DE` is **reversible**: it is legible as text on white
> *and* white is legible on it. One colour does both jobs. That is the whole reason the
> system can stay small.

**The group gradient** — `linear-gradient(120deg, #4F57DE, #22D3EE)`.
Indigo is the animal; cyan is the light above it. Never invert it, never re-angle it,
never put text directly on the cyan end.

### 3.3 Status — reserved, shared, never a brand colour

Same five in every product. **A status colour is never reused as a "series 4" or an
accent**, and always ships with an icon or a word — never colour alone.

| | Hex | Soft |
|---|---|---|
| ok | `#12946F` | `#E7F5F0` |
| warn | `#C97C1E` | `#FBF1E3` |
| danger | `#DC4B54` | `#FBEBEC` |
| info | `#0E7FB8` | `#E6F1F8` |
| neutral | `#7C879B` | `#F1F4F8` |

### 3.4 Data visualisation — validated, fixed order, never cycled

Assign in this order. A 7th series folds into "Autre" — it is **never** a generated hue.

**Light** (surface `#FFFFFF`) — *all four checks PASS*:
`#4361D0` `#0FA396` `#D2603A` `#9061F0` `#B07414` `#2F8050`

**Dark** (surface `#071726`) — *selected steps, not a flip; all four checks PASS*:
`#6B83E6` `#14A595` `#E36D46` `#A176F0` `#B58415` `#3C9060`

Sequential = one hue, light→dark. Diverging = two poles + a **neutral grey** midpoint.
Never a rainbow. **Never a dual-axis chart.** Re-run the validator before changing any
value here.

### 3.5 Product accents

Each product owns **one** accent lane out of the shared palette. It does not invent one.

- **Coreon Edu — trust, care, family.** Indigo → violet (`#4F57DE → #8B5CF6`).
  Cool, calm, parental. Per-role accents stay, but they are drawn *from the shared
  palette* and are used only to tint a portal's chrome — never to recolour data.
- **Kogia Job — energy, opportunity, speed.** Terracotta (`#E85D2F`), text in
  `#C2410C` / `#7C2D12`, tint `#FFF1E7`. The ink cloud: the warm, fast, human end of the
  family.

Both sit on the *same* neutrals. That is what makes them siblings.

---

## 4. The mark, and the mascots

### 4.1 The mark — a K whose arm is a fluke

**The logo is not a whale.** It is a **K**, the company's initial, whose arm is a
**fluke** — a whale's tail. The initial and the animal, in one geometric form.

```
stem   M17 11 v42                                        stroke 7.5, round cap
fluke  M26 32 L48 9 L53 12 Q41 25 36 32 Q41 39 53 52 L48 55 Z
```
> Grid 64. **Flat — never a gradient.** A logo must survive a rubber stamp, an
> invoice, a monochrome app icon. The gradient belongs to decoration, not identity.
> It takes its colour from context (`currentColor`): indigo for the group and
> Coreon Edu, terracotta for Kogia Job. **One house mark, recoloured per product.**

**Why the whale was retired as the logo.** It was tested and it failed:
- **It died at 16px.** The eye, smile, spout and crescent collapsed into a blue
  blob at favicon and app-icon size — the sizes that matter most.
- **It could not survive one colour.** In monochrome it was a black lump.
- **It was an illustration, not an identity** — no geometric system underneath.

The fluke tips are **squared**, not pointed: that is a real fluke's trailing edge,
and it is what stops the mark reading as a generic arrow or chevron. Tapered
versions were drawn and rejected — they vanish at small size. **Mass is what makes
a mark survive.**

### 4.2 Why the crescent is NOT in the logo

The false gill is still our motif — but it stays in the **interface** (loaders,
empty states, decoration), never in the mark. On a **Tunisian** company, a crescent
does not read as a whale's gill. It reads as **the national flag**. That collision
is not worth the concept.

### 4.3 The mascots — they welcome, they do not identify

The whale (Coreon Edu, the group) and the hand (Kogia Job) are **mascots**. They
belong on welcome screens, empty states and success moments. They carry warmth.

**They are never a logo.** The mark identifies; the mascot welcomes. Two systems,
two jobs — and never swapped. The hand in particular means something real
("le coup de main du quartier") and keeps that meaning as an illustration.

## 5. Typography

**Display — `Sora` (600/700/800), everywhere, no exceptions.**
Headings, brand wordmarks, big numbers. `letter-spacing: -0.02em`, `line-height: 1.15`.
Sora is the single thread that ties a Coreon dashboard to the corporate hero. The Owner
Console's `Fraunces` (a serif that exists nowhere else in the brand) is **retired**.

**Text — one face per product, chosen from a sanctioned pair.** This is where personality
is allowed, because body text is where a product's *tone of voice* actually lives:

| Product | Text face | Why |
|---|---|---|
| Kogia Group (site + Owner Console) | **Inter** 500–800 | Precise, neutral, corporate. |
| Coreon Edu | **Nunito** 500–800 | Rounded, warm, human — a school is not a bank. |
| Kogia Job | **Inter** 500–800 | Fast, plain, legible on a cheap phone in sunlight. |

Body text is set at **weight 500**, not 400 — one notch heavier, the same in every
product. It is a small thing that makes everything feel deliberately made.

**`Baloo 2` is demoted to wordmark-only** for Kogia Job. It is a personality face, not a
reading face; it never sets a paragraph.

**Scale** — 12 / 13 / 15 (body) / 17 / 20 / 24 / 32 / 44.

---

## 6. Form

- **Radius** — `12` controls · `16` cards · `24` tiles & hero surfaces · `999` pills.
  Four values. There is no fifth.
- **Spacing** — 4px grid. Card padding 20. Section gap 16–20.
- **Elevation** — three steps, soft and single-source (a light from above the water):
  - `sh-1` `0 1px 2px rgb(14 33 53 / .05)`
  - `sh-2` `0 10px 30px -12px rgb(14 33 53 / .12)`
  - `sh-3` `0 24px 50px -20px rgb(14 33 53 / .20)`
  Never a hard border *and* a heavy shadow on the same element.
- **Icons** — lucide, stroke 2, `currentColor`. **Never emoji. Never raster. Never AI
  imagery in product UI.**
- **Avatars** — initials on a deterministic soft tint. No faces, real or generated.

---

## 7. Motion — "stillness is the resting state"

One easing curve for the whole ecosystem: `cubic-bezier(.2,.8,.2,1)`.

| | Duration |
|---|---|
| micro (hover, press, tint) | `160ms` |
| standard (enter, expand, tab) | `220ms` |
| deliberate (screen, modal, route) | `320ms` |
| welcome / narrative | `600ms+` |

- **Float** — the mascot drifts ±4px over 6s, `ease-in-out`. It is the only perpetual
  animation permitted anywhere.
- **Reveal on scroll** — `translateY(22px)` → 0, 700ms, staggered ≤3 items.
- **Hover lift** — `-2px` + one elevation step. Never scale up.
- **Press** — `scale(.98)`. Never a colour flash.
- **Loading** — the **crescent** rotates. Not a generic spinner ring.
- Every one of the above is disabled under `prefers-reduced-motion: reduce`. This is not
  optional and it is not a nice-to-have.

---

## 8. The states everyone forgets

A screen is not designed until all five exist. This is a release gate, not advice.

1. **Empty** — the whale, floating, one sentence in plain French, one action. Never a
   dead-end. Never the word "Aucune donnée".
2. **Loading** — skeletons that match the real layout's shape (never a centred spinner
   on a full page). The crescent for inline waits.
3. **Error** — say what happened and what to do next. Never a code, never "Oops".
4. **Success** — brief, warm, and it gets out of the way on its own.
5. **First run** — the welcome screen. The user meets the animal before they meet a form.

---

## 9. Voice

Sober French. Facts over adjectives. Self-deprecating before it is boastful.
We say what is not finished. We never invent a metric, a customer, or a testimonial.

Every product footer carries **« par Kogia Group »**.

---

## 10. The quality gate

Before anything ships, on every product:

1. Zero mixed styles — one design language per surface.
2. It looks like a commercial product team built it. Not a template. Not an AI demo.
3. Colour, type, radius, spacing and motion come **from this file** — no local hexes.
4. The five states of §8 all exist.
5. French is complete. No language mixing.
6. AA contrast holds. Chart palettes re-validated if touched.
7. `prefers-reduced-motion` honoured.
8. Verified on a real screenshot, not in the imagination.

---

## Appendix — what this file retired

| Retired | Replaced by |
|---|---|
| The leaf/spark mark (`#6C5CE7 → #36C5F0`) | The Kogia whale + crescent |
| Indigo `#6366F1` **and** `#6C5CE7` | `#4F57DE` |
| Cyan `#36C5F0` | `#22D3EE` (decorative only) |
| Inks `#0F172A`, `#1A1B2E`, `#10162B` | `#0E2135` |
| `Fraunces` (Owner Console display) | `Sora` |
| The "four products" premise; Kogia Coffee & Kharbga identities | **Two** products: Coreon Edu, Kogia Job. Coffee and Kharbga are independent personal projects and are **not** part of Kogia Group. |
| Kogia Job having no documented identity at all | §3.5 + its own lockup |

**Kogia Food and Kogia Games are not part of this system and must not appear on any
public Kogia Group surface.** They are future projects and stay private until they are
real.
