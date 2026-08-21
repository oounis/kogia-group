# Kogia Visual Asset Review V2 — creative candidate package

This is an isolated V2 art package. It does not replace, rename, or modify anything under `visual-assets/`, `brand/`, or the current gallery.

V2 is built from the real Kogia animal and the company story: deep exploration, echolocation, hidden opportunities, small trusted communities, idea-cloud creativity under pressure, and bringing useful discoveries to the surface.

## Contents

- `direction-boards/avatars-v2.png` — eight refined candidate personalities on a 4×2 landscape board.
- `direction-boards/reactions-v2.png` — twelve universal reactions redesigned for 32 px.
- `direction-boards/world-elements-v2.png` — twelve reusable objects and motifs.
- `direction-boards/story-scenes-v2.png` — six wordless narrative scenes for articles and community storytelling.
- `avatars/png/` — eight 512×512 RGBA candidate avatars.
- `reactions/png/` — twelve 512×512 RGBA universal reactions.
- `world-elements/png/` — twelve 512×512 RGBA reusable world elements.
- `icons/svg/` — fifteen Kogia-specific semantic icons. Ordinary utility icons stay in V1.
- `loaders/svg/` — four consolidated loader drawings with motion class hooks.
- `CLAUDE_INTEGRATION_BRIEF.md` — integration boundary and V2 gallery requirements.

## Ouvrir la revue

```bash
node visual-assets-v2/tools/build-manifest-v2.mjs  # manifest.json : 55 candidats
node visual-assets-v2/tools/validate-v2.mjs        # même barre que V1 + règles V2
node visual-assets-v2/tools/smoke-v2.mjs           # rendu réel, bascule, mouvement réduit (Playwright)
```

Puis `visual-assets-v2/gallery/index.html`. La bascule **Actuel / Revue V2** est
en haut à droite : « Actuel » charge `visual-assets/gallery/` dans une iframe,
servie telle quelle. Les verdicts candidat / approuvé / rejeté sont gardés dans
le navigateur et s'exportent en JSON par le bouton « Exporter les verdicts ».

## Reuse from V1 unchanged

- The Kogia logo and every file under `brand/`.
- The six approved avatars: Kogi, Nara, Rasm, Mira, Bunyan, and Sada.
- Generic navigation and utility icons such as back, close, menu, search, camera, profile, upload, warning, and bookmark.
- Existing account-level artwork until a separate small-size optical pass is approved.
- Product color tokens.

## V2 character meanings

- **Salim:** skeptical echo-tester; serious, evidence first.
- **Jojo:** idea-cloud trickster; becomes funny and inventive under pressure.
- **Zeno:** strange prototype hunter; curious about ideas others dismiss.
- **Amin:** deep-water sage; listens before speaking.
- **Nour:** dream listener; hears patterns inside noise.
- **Rami:** idea chef; turns raw concepts into practical plans.
- **Malik:** surface captain; brings finished discoveries back to people.
- **Tala:** echo scientist; maps invisible opportunities.

All raster cutouts were generated with the built-in image-generation workflow, extracted from chroma-magenta boards, normalized to 512×512 RGBA, and reviewed on light, dark, 40 px, and 32 px presentations.
