# Claude handoff — Visual Asset Review V2

Owner: Othman. Art author: Codex. Integration owner: Claude.

## Non-negotiable boundary

Keep the existing `visual-assets/` package and `visual-assets/gallery/` intact. V2 is a candidate review layer, not an automatic production replacement.

Do not edit the Kogia logo, wordmark, brand mark, brand manifests, or current production manifest while preparing the V2 review.

## Requested gallery structure

Add a clearly visible review switch:

- **Current** — the existing gallery exactly as it is.
- **Visual Asset Review V2** — the candidate package under `visual-assets-v2/`.

Prefer a separate V2 manifest such as `visual-assets-v2/manifest.json`; do not append candidate files to `visual-assets/manifests/assets.json` before Othman approves them.

The V2 review should include:

1. Original six approved avatars beside the eight V2 candidates.
2. V1 versus V2 reaction comparison at 92 px and actual 32 px.
3. V1 versus V2 semantic icon comparison at 32 px and actual 20 px.
4. Four V2 loader roles with motion enabled and reduced-motion fallback.
5. Twelve Kogia-world objects at 128, 64, and 40 px.
6. The four V2 direction boards, including the narrative scene board.
7. Light, abyss-dark, checkerboard, and active-product backgrounds.
8. Explicit candidate/approved/rejected status controls or labels.

## Avatar integration

Candidate paths: `visual-assets-v2/avatars/png/*.png`.

Keep the stable names `salim`, `jojo`, `zeno`, `amin`, `nour`, `rami`, `malik`, and `tala`. Do not create additional aliases. These V2 files have broad visible widths of approximately 331–352 px after normalization, matching the approved family at 40 px better than the first wave.

## Reaction integration

Candidate paths: `visual-assets-v2/reactions/png/*.png`.

Semantics remain universal and stable: `agree`, `celebrate`, `concern`, `disagree`, `evidence-check`, `inspired`, `laugh`, `offer-help`, `question`, `surprised`, `thanks`, and `thoughtful`.

Use the approved Option A: one universal reaction set. Product color belongs to the UI frame/background, not duplicated raster artwork.

## Semantic icons

Candidate paths: `visual-assets-v2/icons/svg/*.svg`.

These replace only the weak Kogia-specific concepts: hidden opportunity, launch, pearl, deep dive, surface, idea cloud, echolocation, service, solution, revenue, topic, platform, civic action, partnership, and loading.

Continue using V1 utility icons for ordinary actions. V2 SVGs use `currentColor` plus `--kg-icon-accent` and must be tested at 20 px.

## Loader roles

- `echo-ring.svg` — inline search, synchronization, listening, or scan.
- `pearl-orbit.svg` — button/compact indeterminate operation.
- `idea-pulse.svg` — messages, agents, generation, or thinking.
- `surface-progress.svg` — long task moving toward completion.

The SVG class hooks are intentional. Apply motion in gallery/integration CSS, and provide a still frame under `prefers-reduced-motion: reduce`.

Do not add the old six general loaders and six mark loaders again inside V2. The purpose of V2 is consolidation and clear semantic ownership.

## Kogia-world elements and scenes

World-element cutouts live in `visual-assets-v2/world-elements/png/`. They are article decorations, achievement objects, empty-state art, onboarding motifs, and community vocabulary—not logos or navigation icons.

The story board at `visual-assets-v2/direction-boards/story-scenes-v2.png` establishes six recurring narratives: deep discovery, echo opportunity, ideas under pressure, trusted small community, raw idea to practical plan, and bringing a solution to the surface.

## Acceptance checks

- Existing Current gallery remains visually and functionally unchanged.
- V2 assets are loaded only through the V2 review mode/manifest.
- Raster assets render with alpha and without chroma residue.
- Avatars are checked at 40 px.
- Reactions are checked at 32 px.
- Semantic icons are checked at 20 px.
- All assets are tested on light, dark, and every product color lane.
- No V2 candidate becomes production by default before Othman's approval.
