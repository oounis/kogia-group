/* ============================================================================
   Kogia Harmony — design tokens (JS / React Native)
   Mirror of kogia.css. Source of truth: brand/KOGIA_HARMONY.md.
   If you are about to type a hex into a product file: don't. Add it here.
   ========================================================================= */

/** The water. Identical in every product. */
export const N = {
  abyss:   '#071726',
  ink:     '#0E2135', // 16.3:1 on white
  slate:   '#5B6B7D', // 5.46:1 on white — real text, not just "large"
  line:    '#DCE3EB',
  canvas:  '#F4F7FA', // cool marine, never neutral grey
  surface: '#FFFFFF',
  pearl:   '#FDF6F0', // the crescent's light — the one warm surface
}

/** The body seen through water. */
export const BRAND = {
  indigo: '#4F57DE', // THE primary: 5.60:1 as text AND white-on-it
  violet: '#8B5CF6', // 4.23:1
  cyan:   '#22D3EE', // 1.81:1 — DECORATIVE ONLY. Never text.
}

/** The ink cloud — Kogia Job's lane. */
export const TERRA = {
  base: '#E85D2F', // 3.48:1 — fills, marks, display type
  deep: '#C2410C', // 5.18:1 — terracotta AS TEXT
  ink:  '#7C2D12', // 8.47:1 on tint
  tint: '#FFF1E7',
  line: '#FED7AA',
}

/** Reserved. Never a brand colour, never a chart series. Always with an icon or a word. */
export const STATUS = {
  ok:      '#12946F', okSoft:      '#E7F5F0',
  warn:    '#C97C1E', warnSoft:    '#FBF1E3',
  danger:  '#DC4B54', dangerSoft:  '#FBEBEC',
  info:    '#0E7FB8', infoSoft:    '#E6F1F8',
  neutral: '#7C879B', neutralSoft: '#F1F4F8',
}

/**
 * Data viz. Assign in this order, NEVER cycle. A 7th series folds into "Autre".
 * All four checks PASS (lightness band, chroma floor, CVD separation, contrast).
 * Re-run scripts/validate_palette.js before changing any value.
 */
export const SERIES       = ['#4361D0', '#0FA396', '#D2603A', '#9061F0', '#B07414', '#2F8050']
export const SERIES_DARK  = ['#6B83E6', '#14A595', '#E36D46', '#A176F0', '#B58415', '#3C9060']

/** Type. Display is Sora everywhere — it is the thread. Text carries personality. */
export const FONT = {
  display: 'Sora',            // every product, no exceptions
  text:    'Inter',           // Kogia Group + Kogia Job
  warm:    'Nunito',          // Coreon Edu only — a school is not a bank
  round:   'Baloo 2',         // Kogia Job WORDMARK ONLY. Never sets a paragraph.
  bodyWeight: '500',          // one notch above default, in every product
}

/** Four radii. There is no fifth. */
export const R = { control: 12, card: 16, tile: 24, pill: 999 }

/** 4px grid. */
export const SP = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 }

/** One light, above the water. RN shadow props. */
export const SH = {
  1: { shadowColor: '#0E2135', shadowOpacity: 0.05, shadowRadius: 2,  shadowOffset: { width: 0, height: 1 },  elevation: 1 },
  2: { shadowColor: '#0E2135', shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 },  elevation: 4 },
  3: { shadowColor: '#0E2135', shadowOpacity: 0.20, shadowRadius: 30, shadowOffset: { width: 0, height: 16 }, elevation: 10 },
}

/** Stillness is the resting state. Motion explains a change — it never decorates. */
export const T = { micro: 160, standard: 220, deliberate: 320, welcome: 600 }

/** The Kogia Crescent — the false gill. Our one geometric signature. */
export const CRESCENT = { d: 'M44 42 q7 9 -1 17', width: 3.2, opacity: 0.75 }

/**
 * Product accents. A product owns ONE lane. It does not invent one.
 * Coreon Edu: cool, calm, parental.  Kogia Job: warm, fast, human.
 */
export const PRODUCT = {
  edu: { accent: BRAND.indigo, accent2: BRAND.violet, tint: '#EEF0FE' },
  job: { accent: TERRA.base,   accent2: '#FBBF24',    tint: TERRA.tint },
}

/** Convenience: the palette a product screen actually imports. */
export const C = { ...N, ...BRAND, ...STATUS }
