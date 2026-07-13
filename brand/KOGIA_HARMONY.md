# Kogia Harmony — the Brand Book

**The living design bible of Kogia Group.**
One creative vision. One design language. One hue per product.

> **This file is the single source of truth.** Where the code disagrees with this
> document, **the code is wrong**. Every design change ships *with* its update to this
> book — the implementation is never allowed to evolve ahead of the documentation.

**Version 4.2 — 2026-07-13.** Changelog: §16.

---

## 0. The one idea

**Kogia is recognised by consistency, not by complexity.**

Every product shares *exactly* the same typography, spacing, radii, motion, elevation,
icons and components. **Only the colour family changes.** A Coreon Edu screen and a
Kogia Job screen are the same design, in a different hue.

That is the whole strategy, and it is why a user can recognise a Kogia product **without
seeing the logo**. It is also why a fourth product costs almost nothing: pick a family,
ship. Nothing else in the system moves.

Simplicity over decoration. Consistency over novelty. Accessibility over aesthetics.
Maintainability over short-term visual effect.

---

## 1. Where the name comes from

*Kogia* is the genus of the **dwarf and pygmy sperm whale** — the smallest whales on
Earth. Not chosen because whales are cute. Chosen because of how this animal behaves.

| Trait of the animal | What the design takes from it |
|---|---|
| The **smallest** sperm whale — yet a whole one, not a reduced one | Small team, big-company standards. Products that are complete, never "lite". |
| A **deep, quiet diver**; hunts in the dark, rarely seen | Depth over noise. Calm surfaces. Nothing shouts. |
| Rests **completely motionless** at the surface | **Stillness is the resting state.** Motion is an event, never decoration. |
| Its **fluke** — the one shape that says "whale" without drawing one | The two arms of the **K** *are* the two lobes of that fluke. Nothing is drawn; the tail is left in the negative space (§4.1). |
| **Smooth curves; minimal movement; calm** | The lobes are curves, not chevrons. The mark is still. These qualities *are* the geometry — the animal is never portrayed. |
| Releases a **reddish-brown ink cloud**, then vanishes | Terracotta is not arbitrary. It is the ink cloud — Kogia Job's family. |
| **Elusive; hard to study** | We never fake presence. No invented metrics, no fake customers. |

**Sources:** [WDC — pygmy sperm whale](https://us.whales.org/whales-dolphins/species-guide/pygmy-sperm-whale/) ·
[WDC — dwarf sperm whale](https://us.whales.org/whales-dolphins/species-guide/dwarf-sperm-whale/) ·
[Animal Diversity Web](https://animaldiversity.org/accounts/Kogia_breviceps/)

---

## 2. Brand personality & tone of voice

**Personality:** quiet, precise, warm underneath. Confident without volume.
Not playful. Not corporate-cold. **Trustworthy because it is specific.**

**Voice — the rules:**
- **Sober French. Facts over adjectives.** "Évaluer une classe en 30 secondes", never
  "une expérience révolutionnaire".
- **Say what is not finished.** "En développement" means code that runs. "Disponible"
  means online today. We never blur the two.
- **Never invent** a number, a customer, or a testimonial. Ever.
- **Name things as the user knows them.** A parent manages *notifications*, not
  "webhook config".
- **A control says what happens.** Button `Publier` → toast `Publié`.
- **Errors explain the fix**, never apologise, never say "Oops". Never show a code.
- Every product footer carries **« par Kogia Group »**.

---

## 3. Colour

> **Principle:** colour is the strongest carrier of identity, so it is the most tightly
> ruled. **Every value here is measured, never eyeballed.** UI colours are checked for
> WCAG contrast; chart palettes are run through the six-check validator. The numbers
> below are measurements, not estimates.

### 3.1 Colour psychology — why these three families

Colour is doing real work here, not decoration:

- **Ocean blue (Kogia Group).** Blue is the most universally trusted hue in
  institutional contexts — competence, calm, permanence. A corporate parent must feel
  *safe*. It is also literally the sea the animal lives in.
- **Purple (Coreon Edu).** Purple sits between blue's trust and red's warmth — which is
  exactly what a school is: an institution you must trust, holding children you love.
  Care *and* authority. Schools are not banks; purple keeps it human.
- **Terracotta (Kogia Job).** Warm, earthen, physical — the colour of work, of clay, of
  the Tunisian street. It signals energy and immediacy, and carries no institutional
  coldness, which matters for a worker holding a cheap phone in sunlight. It is the
  animal's ink cloud.

### 3.2 The neutrals — "the water". Identical in every product, forever.

| Token | Hex | Measured | Use |
|---|---|---|---|
| `abyss` | `#071726` | — | Dark-mode ground |
| `ink` | `#0E2135` | **16.31:1** on white | Primary text |
| `slate` | `#5B6B7D` | **5.46:1** on white | Secondary text — AA as *real* text, not just "large" |
| `line` | `#DCE3EB` | — | Borders, dividers, grid |
| `canvas` | `#F4F7FA` | — | Page background. Cool and marine — **never** a neutral grey |
| `surface` | `#FFFFFF` | — | Cards, sheets |

> **Neutrals are chosen, not inherited.** A pure grey reads as unconsidered. Ours are
> biased toward the sea.

### 3.3 The three families (50 → 900)

**Kogia Group — Ocean**
`50 #EFF4FF` · `100 #DBE6FE` · `200 #BFD2FE` · `300 #93B4FD` · `400 #608DFA`
`500 #3B66F5` · `600 #2547E8` · `700 #1D35D0` · `800 #1E2FA8` · `900 #1E2F85`

**Coreon Edu — Purple**
`50 #F6F3FF` · `100 #EDE7FE` · `200 #DDD2FD` · `300 #C4B0FB` · `400 #A886F7`
`500 #8B5CF6` · `600 #7539E4` · `700 #6329C4` · `800 #5324A0` · `900 #452083`

**Kogia Job — Terracotta**
`50 #FFF5ED` · `100 #FFE7D4` · `200 #FECDAA` · `300 #FCA974` · `400 #F97C43`
`500 #E85D2F` · `600 #C2410C` · `700 #9A3412` · `800 #7C2D12` · `900 #652411`

### 3.4 The step contract — identical in all three families

This is the most important rule in the colour system.

| Step | Job | Guarantee |
|---|---|---|
| `50` `100` | Tint surfaces | ink on them ≥ **13:1** |
| `200` `300` | Borders, dividers, disabled | — |
| `400` | Decorative fills | — |
| **`500`** | **THE BRAND STEP** — the mark, big display type | **Decorative, ≥3:1. NOT an action colour.** |
| **`600`** | **THE ACTION STEP** — buttons, links, focus | text on white ≥ **4.5:1** *and* white on it ≥ **4.5:1** |
| `700` | Text on tints, hover / pressed | ≥ 4.5:1 on white |
| `800` `900` | Headings on tint, the family's deep ink | — |

> **Why 500 cannot be the action step — and this is not a detail.** White on
> purple-500 measures **4.23:1**; on terracotta-500, **3.48:1**. Both fail AA for button
> text. Only `600` is *reversible* — legible as text on white **and** legible under
> white. One step doing both jobs is what keeps the system small. The moment a second
> "nearly right" step is allowed, the palette rots into six near-identical purples —
> which is **exactly what had happened** to this codebase before v3.

### 3.5 The no-mixing law

**A product page uses its own family and the neutrals. Nothing else.**

Kogia Group is blue. Coreon Edu is purple. Kogia Job is terracotta. Never sprinkle
another product's hue into a page — that is precisely what destroys recognisability.
The *only* colours allowed outside the family:

1. **The neutrals** (always).
2. **Status colours** (§3.7) — reserved, never decorative.
3. **Chart series** (§3.8) — inside a chart, and nowhere else.

**How this is enforced, not merely requested:** the page sets `data-product="group|edu|job"`
once. Every component references only `--k-p-50 … --k-p-900`. **No component can name a
hue.** A fourth product is one new block in `tokens/kogia.css` — nothing else moves.

### 3.6 Gradients are decoration, never identity

**The old identity was a gradient.** That was the mistake. A gradient cannot be a brand,
because it fails everywhere a brand must survive: a rubber stamp, an invoice, a
monochrome app icon, an embroidered shirt.

Gradients may appear **only** as secondary decorative surfaces (a hero wash, an ambient
glow). **Never on the mark. Never on data. Never on text.** The **hue** makes a product
recognisable — not a gradient.

> A gradient painting *text* must never end below 3:1. This rule exists because it caught
> a real bug: the site's headline faded into cyan (**1.81:1**) and "plaisir" was
> unreadable.

### 3.7 Status — reserved, shared, never a brand hue

| | Hex | Soft |
|---|---|---|
| ok | `#12946F` | `#E7F5F0` |
| warn | `#C97C1E` | `#FBF1E3` |
| danger | `#DC4B54` | `#FBEBEC` |
| info | `#0E7FB8` | `#E6F1F8` |
| neutral | `#7C879B` | `#F1F4F8` |

The same five in every product. **A status colour is never reused as an accent or a chart
series**, and always ships **with an icon or a word** — never colour alone, because ~8% of
men cannot rely on hue.

### 3.8 Data visualisation

Assign in **fixed order, never cycled**. A 7th series folds into "Autre" — never a
generated hue. **Colour follows the entity, never its rank:** a filter that changes the
series count must not repaint the survivors.

**Light** — `#4361D0` `#0FA396` `#D2603A` `#9061F0` `#B07414` `#2F8050`
**Dark** — `#6B83E6` `#14A595` `#E36D46` `#A176F0` `#B58415` `#3C9060`

Dark steps are **selected and re-validated** against the abyss, never an automatic flip —
a naive inversion produces muddy, vibrating colour. Both sets pass all four checks.
Sequential = one hue, light→dark. Diverging = two poles + a **neutral grey** midpoint.
**Never a rainbow. Never a dual-axis chart** — two y-scales is the single most misleading
chart form in existence.

---

## 4. The logo

### 4.1 Philosophy — what this mark refuses to be

Kogia Group is a **technology solutions company**, not a children's brand and not a
fashion label. The mark must therefore be **minimal, timeless, professional and
scalable** — and it must still look modern in twenty years.

So the logo is **a letter K**. Nothing is drawn. There is no animal on the page.

**And yet the whale is there.** The two arms of the K are not arms: they are the two
**lobes of a sperm whale's fluke**, meeting at a peduncle on the stem, with the median
notch left as negative space. You read a clean K. Later — sometimes much later — you
notice the tail. And once you have seen it, you cannot un-see it.

This is the **FedEx principle**: the arrow between the E and the x is not drawn, it is
*left behind*. A hidden form is stronger than a stated one, because the viewer
*discovers* it, and people remember what they discover.

**What the mark deliberately does NOT have:**

| Removed | Why |
|---|---|
| **The eye** | **This was the fatal flaw of every previous version.** An eye makes a *creature*. A creature makes a *mascot*. A mascot cannot represent a technology group. |
| A body, a smile, a spout, a fin | Illustration, not identity. |
| A gradient | A gradient cannot survive a stamp, an invoice, a monochrome icon (§4.6). |
| Any "cuteness" | We are not selling to children. |

The animal is present through its **qualities**, never its portrait: *compact yet
powerful, intelligent, calm, deep-water, elegant, minimal movement, smooth curves.*
Those are the adjectives the geometry had to satisfy — and they are why the arms are
**smooth curves** rather than straight chevrons, and why the whole mark is still.

### 4.2 Construction & grid

Drawn on a **64 × 64 grid**. Three shapes. No more.

```
viewBox 0 0 64 64

stem       M10 14.25 a4.25 4.25 0 0 1 8.5 0 v35.5 a4.25 4.25 0 0 1 -8.5 0 Z
upper lobe M21 32 C34 29 45 21 54 9 L58.5 14.5 C50 27 39 34.5 26 35.5 Z
lower lobe M21 32 C34 35 45 43 54 55 L58.5 49.5 C50 37 39 29.5 26 28.5 Z
```

**Proportions** (all on the 64 grid):

| | Value | Why |
|---|---|---|
| Stem width | `8.5` | Matches the optical weight of the lobes at their root. |
| Stem cap radius | `4.25` (= half the width) | A true semicircle. Calm, never a hard corner. |
| Cap height | `10 → 54` (44 tall) | Leaves a 10-unit margin top and bottom: the mark breathes inside its own box. |
| Lobe root | `x = 21` | A 2.5-unit optical gap from the stem. **Not zero** — the gap is what keeps the K legible; joined, it becomes a blob. |
| Lobe tips | `x = 58.5` | The lobes reach further right than the stem reaches left: the mark is optically centred, not mathematically centred. |
| Notch vertex | `(21, 32)` | Dead centre. The fluke's median notch. |

The lobes' **inner edges are concave** — that concavity is the fluke. Convex edges would
make an arrow; straight edges would make a chevron. **This single curve is the whole
idea.**

### 4.3 Clear space & minimum size

- **Clear space:** the width of the stem (`8.5` units, ≈ 13% of the mark) on all four
  sides. Nothing may enter it — no text, no rule, no edge.
- **Minimum size: 16px** (or 4mm in print). Verified legible at 16px in one colour.
- Below 16px, use the **tile** (§4.5), never the bare mark.

### 4.4 Colour versions

The mark is **flat** and takes `currentColor`. It has exactly these versions:

| Version | Value | Use |
|---|---|---|
| Kogia Group | ocean `#2547E8` | Corporate, the Owner Console |
| Coreon Edu | purple `#7539E4` | The school product |
| Kogia Job | terracotta `#C2410C` | The marketplace |
| Ink | `#0E2135` | On light surfaces where the family hue would compete |
| Reversed | `#FFFFFF` | On the abyss, on a family fill, on any dark ground |
| **Monochrome / print** | pure `#000000` on white | Stamps, invoices, fax, one-colour print, engraving |

**Never** invent a new colour version. A future product picks a family (§3.5); the mark
does not change.

### 4.5 Icon, favicon & app icon

- **App tile:** the mark centred in a rounded square, `rx = 24/96` (the system's tile
  radius), knocked out in **white** on the product's `600` step. The mark occupies the
  centre with a 16/96 margin.
- **Favicon:** the same tile. **Never the bare mark** — at 16px a bare mark on a white
  browser tab has no edge to hold it.
- **Android adaptive icon:** foreground = the white mark at 76% scale (safe zone);
  background = a flat fill of the product's `600`. The declared `backgroundColor` must
  equal the shipped background image — otherwise a white foreground vanishes if the
  image fails to load.
- **Monochrome icon** (themed Android / macOS): the mark, solid, no tile.

### 4.6 SVG guidelines

- Ship the mark as **SVG, always** — it is three vector paths and weighs nothing.
- `fill="currentColor"` on the group, so the mark inherits its context. **Never**
  hard-code a hue inside the mark file.
- Keep the `viewBox="0 0 64 64"`. Scale with `width`/`height`, never by editing paths.
- No `<style>`, no CSS classes, no filters, no `<defs>` inside the mark — it must
  survive being inlined, sprited, or pasted into an email.
- Include `role="img"` and `aria-label="Kogia"`; when the mark sits beside the wordmark,
  mark it `aria-hidden` and let the text carry the name.

### 4.7 The ecosystem system

**One symbol. Only the product name changes.**

```
[K]  kogia   GROUP
[K]  coreon  EDU · PAR KOGIA GROUP
[K]  kogia   JOB · PAR KOGIA GROUP
[K]  kogia   GAMES · PAR KOGIA GROUP     ← when it is real
[K]  kogia   FOOD  · PAR KOGIA GROUP     ← when it is real
```

Adding a product = **a family (§3.5) and a wordmark. Nothing else moves.** That is the
entire scalability argument, and it is why the mark had to be a letter rather than an
illustration: an illustration cannot be re-used across an ecosystem without becoming a
mascot for one member of it.

> **Kogia Games and Kogia Food remain private** and must not appear on any public Kogia
> Group surface until they are real. The *system* supports them; the *website* does not
> mention them.

### 4.8 Incorrect usage

Never:

- **Add an eye, a fin, a body, or any facial feature.** This turns the mark into a
  mascot and destroys the entire concept.
- Apply a **gradient**, a shadow, a glow, an outline, or a bevel.
- **Stretch, skew, rotate, or mirror** it. The lobes are optically weighted for one
  orientation.
- Re-space the lobes or close the gap to the stem — the gap is what makes it a K.
- Place it on a **photograph** or a busy pattern. It needs a flat ground.
- Use it **below 16px** bare, or in a colour outside §4.4.
- Recolour it to match a page. The mark carries the *product's* family, not the page's.
- Use the wordmark without the mark, or the mark stretched to fill a non-square box.
- **Put the mark in the BODY of a page.** See §4.10 — this is now a hard rule.

### 4.10 Placement — the mark lives in the header, and nowhere else

**The logo appears once per surface: at the top.** In the header, in the login lockup — and
that is all.

It is **never** a decoration in the body of a page: never a giant hero graphic, never a
floating illustration, never the picture in an empty state.

**Why.** A mark repeated as ornament stops being a mark. Its job is to *identify* the
surface, once — a second, bigger copy lower down adds no information and cheapens the
first. Every serious technology brand does this: you see the logo in the chrome, and then
you see the *product*.

**What replaces it in the body:** a **contextual lucide icon** — one that says what the
thing actually is. An empty inbox gets an inbox; an empty timetable gets a calendar; a
frozen summer screen gets a sun. That is *information*; a logo there was only noise.

### 4.9 Why this is better than everything before it

| Version | Why it failed |
|---|---|
| **v1 — leaf / spark** | Meant nothing. No connection to the name, the animal, or the company. |
| **v2 — cartoon whale** | Died at 16px (eye, smile, spout collapsed into a blob); a black lump in monochrome; a **mascot**, not an identity. |
| **v3 — K beside a fluke** | Two objects sitting next to each other, not one symbol. |
| **v3.5 — K *as* a whale, with an eye** | Closer, but **the eye betrayed it.** An eye makes a creature; a creature is a mascot. It read as an animal first, a letter second — the exact inverse of what a technology group needs. |
| **v4 — this mark** | **A clean K first. The whale second, and only in the negative space.** It works at 16px, in one colour, in pure black, on dark, as a tile. It carries the company's initial — so it scales to every future product without ever becoming a mascot for one of them. |

## 5. Typography

**Display — `Sora` (600/700/800). Every product, no exceptions.** It is the single thread
tying a Coreon dashboard to the corporate hero.
`letter-spacing: -0.02em`, `line-height: 1.15`, `text-wrap: balance` on headings.

**Text — one face per product, from a sanctioned pair.** Body text is where a product's
*voice* lives, so this is the one place personality is allowed:

| Product | Text face | Why |
|---|---|---|
| Kogia Group | **Inter** | Precise, neutral, institutional |
| Coreon Edu | **Nunito** | Rounded, warm — a school is not a bank |
| Kogia Job | **Inter** | Plain, legible on a cheap phone in sunlight |

**Body weight is 500, not 400** — one notch up, in every product. A small thing that makes
everything read as deliberately made.

**Scale:** 12 / 13 / 15 (body) / 17 / 20 / 24 / 32 / 44. **Stay on it.**
Running text stays near **65 characters** wide. Numbers in columns use `tabular-nums`.

**Hierarchy** is built with *size + weight + colour*, in that order — never with
decoration. One H1 per screen. If everything is emphasised, nothing is.

---

## 6. Grid, spacing & layout

- **4px base grid.** Scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40. Nothing in between.
- **Card padding 20.** Section gap 16–20.
- **Layout does the spacing.** Sibling groups use flex/grid + `gap` — never per-element
  margins that silently collapse or double.
- **White space is structure, not leftover.** It is what makes a calm surface calm. When a
  screen feels cluttered, the fix is almost always *remove*, not *shrink*.
- Wide content (tables, code, charts) scrolls inside its **own** `overflow-x:auto`
  container. **The page body never scrolls sideways.**
- **Mobile-first.** Design the narrow column first; desktop is the *adaptation*, not the
  origin. Touch targets ≥ 44px.

---

## 7. Form: radius, elevation, icons, illustration

- **Radius — four values. There is no fifth.**
  `12` controls · `16` cards · `24` tiles & hero surfaces · `999` pills.
  *Why:* radius is a strong identity signal and the easiest thing to let drift. Four
  values express every surface and are few enough to hold in your head.
- **Elevation — three steps, one light source, from above the water.**
  `sh-1` hairline · `sh-2` raised (cards) · `sh-3` floating (modals, hover).
  **Never a hard border *and* a heavy shadow on one element** — two competing metaphors
  for the same depth.
- **Icons — lucide, stroke 2, `currentColor`. ONE library, every product, every platform.**
  `lucide-react` on web, `lucide-react-native` on native — identical names, through the
  `<Ic n="…"/>` contract. Shared `core/` data names icons by **lucide name**, never glyph.
- **NEVER an emoji.** An emoji is drawn by the *operating system*: the same character is a
  different picture on Android, iOS, Windows and the web. **That is literally why Kogia had
  a different iconography on every screen.** 152 were removed; the count is **zero** and
  stays zero.
- **Illustration:** flat vector, drawn from the mark's geometry. **No raster, no
  photography, no AI imagery in product UI.**
- **Avatars:** initials on a deterministic soft tint. No faces, real or generated.

---

## 8. Motion

**Stillness is the resting state.** The whale floats motionless; so do our interfaces.
Motion exists to *explain a change* — never to prove we can animate.

**One curve for the whole ecosystem:** `cubic-bezier(.2, .8, .2, 1)`.

| | Duration | Used for |
|---|---|---|
| micro | `160ms` | hover, press, tint |
| standard | `220ms` | enter, expand, tab |
| deliberate | `320ms` | screen, modal, route |
| welcome | `600ms+` | narrative moments only |

**Micro-interactions:** hover = lift `-2px` + one elevation step (never scale up).
Press = `scale(.98)` (never a colour flash). Focus = a visible ring, always.

**Every animation yields to `prefers-reduced-motion: reduce`.** Not optional — vestibular
disorders are real, and no decorative animation is worth a headache.

---

## 9. Components

One library. Same anatomy in every product; only the hue changes.

- **Button.** Primary = `--k-p-600` filled, white text. Secondary = surface + `line`
  border. Ghost = text only. **One primary action per screen.** The label says what
  happens.
- **Input.** `line` border → `--k-p-600` on focus, with a visible ring. **A label is
  always present** — a placeholder is not a label; it disappears exactly when the user
  needs it. Errors sit under the field and say how to fix it.
- **Card.** Surface, `line` border, radius 16, `sh-1`. Hover = `k-lift`. One focal point.
- **Table.** Text left, **numbers right with `tabular-nums`**. Sticky header. Row hover.
  Scrolls in its own container.
- **Modal.** `sh-3`, ink scrim 30% + blur. Focus trapped, `Esc` closes, focus returns to
  the trigger.
- **Toast.** Status colour + **icon + word**. Auto-dismiss on success; **never** on error.

---

## 10. The five states — a release gate, not advice

**A screen is not designed until all five exist.**

1. **Empty** — a **contextual icon** (never the logo — §4.10), one plain sentence, one
   action. Never a dead end, and never the words "Aucune donnée".
2. **Loading** — skeletons matching the real layout's *shape*. Never a centred spinner on
   a full page: it tells the user nothing about what is coming.
3. **Error** — what happened and what to do next. No codes. No "Oops".
4. **Success** — brief, warm, and it removes itself.
5. **First run** — the user meets the brand before they meet a form.

---

## 11. Accessibility (WCAG 2.1 AA — the floor, not the goal)

- **Contrast:** body text ≥ 4.5:1; large text and UI marks ≥ 3:1. Every value in §3 is
  measured. `slate` passes as *real* text, not merely "large" — a deliberate fix.
- **Never colour alone.** Status always carries an icon or a word.
- **Focus is always visible** — a 3px ring in `--k-p-600`, offset 3px. Never
  `outline:none` without a replacement.
- **Keyboard:** everything reachable and operable, logical tab order, modals trap focus
  and return it. Drag-and-drop has a keyboard path (Coreon Edu's evaluation grid does).
- **Motion:** `prefers-reduced-motion` honoured everywhere.
- **Semantics:** headings in order, real buttons, labelled inputs, `aria-label` on
  icon-only controls, alt text that says what the image *means*.
- **Charts:** never colour-only — legend plus direct labels, and a table view exists.

---

## 12. Dark mode, light mode, print

- **Dark mode is designed, not inverted.** Its steps are selected and re-validated against
  the abyss.
- **Light mode** is the primary surface.
- **Print:** the mark is flat, so it prints. Print styles drop shadows and decoration and
  set ink on white. This is one of the reasons the logo may never be a gradient.

---

## 13. Design tokens, CSS architecture & naming

- **The token layer** (`brand/tokens/kogia.css` + `.js`) is the **only** place a hex is
  written. Products mirror it; they never invent.
- **Naming:** `--k-<role>-<step>`. Roles are semantic (`--k-p-600`, `--k-ink`), never
  literal (`--k-blue`). **A component must not be able to name a hue** — that mechanism is
  what makes the no-mixing law (§3.5) enforceable rather than aspirational.
- **Cascade:** tokens → primitives → components → pages. Never the reverse.
- **If you are about to type a hex into a product file: don't.** Add it here, and document
  *why* in this book.

---

## 14. Information architecture & navigation

- Navigation is **flat, and named after the user's job** — not the system's structure.
- The current location is always obvious. Nothing navigates without feedback.
- A destructive action always confirms, and says what will be lost.

---

## 15. The quality gate

Before anything ships, on every product:

1. One design language per surface — zero mixed styles.
2. **One family per product** (§3.5). No stray hues.
3. Colour, type, radius, spacing and motion come **from the token layer** — no local hexes.
4. All five states exist (§10).
5. French is complete. No language mixing.
6. AA contrast holds. Chart palettes re-validated if touched.
7. `prefers-reduced-motion` honoured.
8. **Zero emoji.**
9. **This book is updated in the same commit.**
10. Verified on a real screenshot — at 16px for anything brand-bearing.

---

## 16. Changelog

### v4.2 — 2026-07-13 — *The mark leaves the page body; the site loses 20 hues*
- **§4.10 — the mark lives in the header, and nowhere else.** It was being used as a giant
  hero graphic and as the picture in empty states. A mark repeated as ornament stops being
  a mark. Body illustration is now a **contextual lucide icon** that says what the thing
  *is* — information, where a logo was only noise.
- **The corporate site was rebuilt on ONE colour family.** It carried **20+ hues** on a
  single page (purple, terracotta, amber, yellow, green…) — a direct violation of the
  no-mixing law it is supposed to demonstrate (§3.5). It now uses ocean + the neutrals +
  two status colours, and products are distinguished by their **name**, not by stealing a
  hue.
- **Copy cut from 2,281 words to ~450, and from 10 sections to 5.** The detailed Coreon Edu
  content (nine feature cards, pricing, a nine-question FAQ) belonged on the *product's*
  site, not the group's. A group site says who we are, what we make, and where it stands.

### v4.1 — 2026-07-13 — *The mark stops being an animal*
- **The eye is gone, and with it the mascot.** v4.0 drew a whale whose head was the K's
  stem, with an eye. **The eye was the fatal flaw:** an eye makes a creature, a creature
  makes a mascot, and a mascot cannot represent a technology group. It read as an animal
  first and a letter second — the exact inverse of what is needed.
- **The mark is now a clean K.** The whale survives *only in the negative space*: the two
  arms are the two lobes of a fluke, joined at a peduncle, median notch left empty. The
  FedEx principle — nothing drawn, everything suggested (§4.1).
- Full logo documentation added: construction grid, proportions and *why* each one
  (§4.2), clear space and minimum size (§4.3), colour versions (§4.4), icon/favicon/app
  icon (§4.5), SVG guidelines (§4.6), the ecosystem system (§4.7), **incorrect usage**
  (§4.8), and a version-by-version account of why each earlier mark failed (§4.9).
- The mark now scales to **every future product** — Games, Food, whatever comes — because
  it is the company's *initial*, not a portrait. An illustration cannot be shared across
  an ecosystem without becoming the mascot of one member of it.

### v4.0 — 2026-07-12 — *Consistency over complexity*
- **The logo became ONE path.** The K and the whale are now the same silhouette (§4.1).
  Before, they were a body *beside* a fluke — two objects, not one symbol.
- **Colour re-founded on three families (50–900), one per product** (§3.3). Before, a
  single indigo was shared by everything, so **products were not distinguishable without
  the logo**. Now a product is recognisable by hue alone.
- **The step contract** (§3.4): `500` = brand/mark (decorative), `600` = action. Found by
  measurement — white on purple-500 is only 4.23:1 and fails AA.
- **Gradients demoted from identity to decoration** (§3.6).
- **Every legacy whale / blue-fish asset deleted.** One logo, one mascot style.
- **All 152 emoji removed; one icon library (lucide) everywhere** (§7).
- This book restructured as the living bible: each section now records *why*, the UX
  principle, the accessibility rule, and what changed.

### v3.0 — 2026-07-12
- Retired the leaf/spark mark; introduced the whale; unified three inks and two canvases
  into one neutral scale; adopted a reversible indigo `#4F57DE`; validated the chart
  palettes; retired `Fraunces`.

### v2 — "Le Cachalot"
- A whale mascot introduced alongside a leaf logo that was never replaced. Four competing
  product identities documented — for products that did not exist.

---

**Kogia Food and Kogia Games are not part of this system** and must not appear on any
public Kogia Group surface until they are real.
