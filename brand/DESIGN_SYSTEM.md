# Kogia Design Language — v1

One company, four products. Each product has its **own identity**, but every surface shares the same **foundations** so the ecosystem reads as one professional group.

## Shared foundations (all products)

- **Type**: Inter (UI); weights 400 / 500 / 600 / 700 / 800. Display-only accent faces allowed per product (see identities). Scale: 12 / 13 / 15 (body) / 17 / 20 / 24 / 32 / 44.
- **Radius**: 12px (inputs, buttons `rounded-xl`), 16px (cards `rounded-2xl`), full (pills, avatars).
- **Spacing**: 4px base grid. Card padding 20px. Section gaps 16–20px.
- **Elevation**: soft single shadow (`0 8px 24px rgb(ink / 8%)`); hover = translate-y −2px + deeper shadow. No hard borborders+shadow doubling.
- **Iconography**: lucide (stroke 2) on app surfaces. **Never emoji as icons. Never raster/AI images in product UI** — vector only, one style per product.
- **Avatars**: initials on deterministic soft tint (see Kogia Edu `Avatar`). No AI faces anywhere.
- **Status colors** (shared semantics): ok `#10B981` · warn `#E59A12` · danger `#EF4444` · info `#0BA5D8` · neutral `#8A93A6` · live `#FF3B5C`.
- **Mark**: the Kogia leaf/spark (`brand/*.svg`) is the group signature; every product footer carries "par Kogia Group".

## Product identities

### 🏢 Kogia Group (corporate + Owner Console) — *enterprise, precise*
- Primary `#6C5CE7` → `#36C5F0` gradient (group signature). Ink `#10162B`, canvas `#F6F7FB`.
- Voice: sober French, facts over adjectives. No invented metrics or testimonials — ever.

### 🎓 Kogia Education / Coreon Edu — *trust, clarity, care*
- White surfaces + ONE accent per portal: Direction `#6C5CE7` · Administration `#36C5F0` · Enseignant `#2BD9A8` · Surveillant `#FFA62B` · Parent `#FF6B81` · Plateforme `#0D9488` (teal = the vendor, visually apart).
- Tints: soft pastel bg + saturated fg pairs (see `app/src/components/ui.jsx` TINTS/STATUS — the reference implementation of this whole system).

### ☕ Kogia Coffee — *warm, authentic, kraft*
- Caramel `#B5895C` primary, deep brown ink `#3E2C1C`, cream `#FAF3EA` canvas, terracotta `#B5673A` accent.
- "Minimal kraft label" product art: flat 2D SVG packshots, muted palette, no photography in UI (photos only for og/social).
- Display face: Lilita One for the brand voice; Inter for UI.

### 🎮 Kogia Games / Kharbga — *heritage, warm ember, focused*
- Primary violet `#7C3AED` → ember `#EC4899` (division gradient), sand board `#F3E9DC` / `#E8D9C3`, ink `#2A2139`, canvas `#FBF8F3`.
- Feel: a crafted board on a table — warm neutrals for the play field, the gradient reserved for actions & highlights. Sound optional (mute persisted), French-first with Tunisian soul.

## Quality gate (every release, every product)
1. One design language per product — zero mixed styles.
2. Looks like a commercial product team built it (not a student project / template / AI demo).
3. Consistent spacing/typography/radius per the foundations.
4. French UI complete (no language mixing).
5. Empty/loading/error states designed.
6. Verified with real screenshots before push.
