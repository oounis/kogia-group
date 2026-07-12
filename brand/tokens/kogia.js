/* ============================================================================
   Kogia Harmony — design tokens. THE source of truth is brand/KOGIA_HARMONY.md.
   Mirrored byte-for-byte in kogia.css. If you are about to type a hex into a
   product file: don't. Add it here, document it there.

   THE ONE IDEA: each product owns ONE colour family. Everything else — type,
   spacing, radius, motion, icons, components — is IDENTICAL across products.
   A Kogia product is recognised by its hue, not by a different design.
   ========================================================================= */

/* ── Neutrals: "the water". IDENTICAL in every product, forever. ─────────── */
export const N = {
  abyss:   '#071726', // dark-mode ground
  ink:     '#0E2135', // primary text — 16.3:1 on white
  slate:   '#5B6B7D', // secondary text — 5.46:1 on white (AA as real text)
  line:    '#DCE3EB',
  canvas:  '#F4F7FA', // cool, marine — never a neutral grey
  surface: '#FFFFFF',
}

/* ── The three families. Every step measured, none chosen by eye. ──────────
   THE STEP CONTRACT — the same in all three families, no exceptions:
     50/100  tint surfaces        ink text on them ≥ 13:1
     200/300 borders, dividers, disabled
     400     decorative fills, chart marks
     500     THE BRAND STEP — the mark, big display type. DECORATIVE (≥3:1).
             It is NOT an action colour: white on purple-500 is only 4.2:1.
     600     THE ACTION STEP — buttons, links, focus. Text on white ≥4.5:1 AND
             white on it ≥4.5:1. This is the one step that does both jobs.
     700     text on tints, hover/pressed
     800/900 headings on tint, deep ink of the family
   Gradients are DECORATION ONLY. A product is identified by its hue, never by
   a gradient. (Cheap-looking gradients were the old identity — see §3.6.)      */

export const OCEAN = { // Kogia Group — the open sea. Calm, deep, corporate.
  50:'#EFF4FF',100:'#DBE6FE',200:'#BFD2FE',300:'#93B4FD',400:'#608DFA',
  500:'#3B66F5',600:'#2547E8',700:'#1D35D0',800:'#1E2FA8',900:'#1E2F85',
}
export const PURPLE = { // Coreon Edu — trust, care, the family feeling.
  50:'#F6F3FF',100:'#EDE7FE',200:'#DDD2FD',300:'#C4B0FB',400:'#A886F7',
  500:'#8B5CF6',600:'#7539E4',700:'#6329C4',800:'#5324A0',900:'#452083',
}
export const TERRA = { // Kogia Job — the ink cloud. Energy, speed, the street.
  50:'#FFF5ED',100:'#FFE7D4',200:'#FECDAA',300:'#FCA974',400:'#F97C43',
  500:'#E85D2F',600:'#C2410C',700:'#9A3412',800:'#7C2D12',900:'#652411',
}

/** A product picks ONE family and never mixes in another product's hue. */
export const PRODUCT = {
  group: { family: OCEAN,  name: 'ocean'      },
  edu:   { family: PURPLE, name: 'purple'     },
  job:   { family: TERRA,  name: 'terracotta' },
}

/* ── Status: RESERVED. Shared by every product; never a brand or chart hue.
      Always shipped with an icon or a word — never colour alone (CVD users). */
export const STATUS = {
  ok:      '#12946F', okSoft:      '#E7F5F0',
  warn:    '#C97C1E', warnSoft:    '#FBF1E3',
  danger:  '#DC4B54', dangerSoft:  '#FBEBEC',
  info:    '#0E7FB8', infoSoft:    '#E6F1F8',
  neutral: '#7C879B', neutralSoft: '#F1F4F8',
}

/* ── Charts: validated by the six checks, FIXED ORDER, never cycled.
      A 7th series folds into "Autre" — never a generated hue.
      Colour follows the ENTITY, never its rank. Never a dual-axis chart. */
export const SERIES      = ['#4361D0','#0FA396','#D2603A','#9061F0','#B07414','#2F8050']
export const SERIES_DARK = ['#6B83E6','#14A595','#E36D46','#A176F0','#B58415','#3C9060']

/* ── Type. ONE display face across the whole ecosystem — it is the thread. ─ */
export const FONT = {
  display: 'Sora',   // every product, no exceptions
  text:    'Inter',  // Kogia Group + Kogia Job
  warm:    'Nunito', // Coreon Edu only — a school is not a bank
  bodyWeight: '500', // one notch above default, everywhere
}
/** Type scale. Stay on it. */
export const FS = { xs:12, sm:13, base:15, md:17, lg:20, xl:24, xxl:32, hero:44 }

/* ── Form. Four radii. There is no fifth. 4px spacing grid. ─────────────── */
export const R  = { control:12, card:16, tile:24, pill:999 }
export const SP = { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40 }

/** Elevation: ONE light source, above the water. Never a hard border + heavy shadow. */
export const SH = {
  1: { shadowColor:'#0E2135', shadowOpacity:0.05, shadowRadius:2,  shadowOffset:{width:0,height:1},  elevation:1 },
  2: { shadowColor:'#0E2135', shadowOpacity:0.12, shadowRadius:18, shadowOffset:{width:0,height:8},  elevation:4 },
  3: { shadowColor:'#0E2135', shadowOpacity:0.20, shadowRadius:30, shadowOffset:{width:0,height:16}, elevation:10 },
}

/* ── Motion: stillness is the resting state. One curve, four durations. ─── */
export const EASE = 'cubic-bezier(.2,.8,.2,1)'
export const T = { micro:160, standard:220, deliberate:320, welcome:600 }

/** The mark. ONE path — the K and the whale are the same silhouette. */
export const MARK = {
  viewBox: '0 0 64 64',
  d: 'M18 10 a10 10 0 0 1 10 10 v8.5 L51 9 L55.5 13.5 Q43.5 25 40.5 32 Q43.5 39 55.5 50.5 L51 55 L28 35.5 V44 a10 10 0 0 1 -20 0 V20 A10 10 0 0 1 18 10 Z M18 17.5 a3.6 3.6 0 1 0 0 7.2 a3.6 3.6 0 0 0 0 -7.2 Z',
  rule: 'evenodd', // the eye is a HOLE, never a white dot
}
