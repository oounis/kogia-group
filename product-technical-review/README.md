# CLAMP WARS Product Technical Review v0.1

This folder is the local web handoff for the new CLAMP WARS build contract.

It defines the game identity, 9x9 rules, special pieces, founding flow, capture/chain logic, sealed-siege win detection, clocks, replay data, and required web interfaces such as Play, Sign In, Profile, Replay, Learn, Settings, and Operations.

## Run locally

From `KogiaGroup/`:

```bash
python3 -m http.server 8995 --directory .
```

Open <http://localhost:8995/product-technical-review/>.

## Files

- `spec.js`: source of truth for categories, requirement IDs, board configuration, pieces, interface surfaces, and acceptance criteria.
- `app.js`: rendering, filters, board preview, piece cards, JSON export, and Claude brief copy.
- `styles.css`: CLAMP WARS visual direction for the review page.
- `CLAMP_WARS_TECHNICAL_BUILD_CONTRACT.md`: implementation guardrails and delivery order.
- `CLAMP_WARS_RULES_AND_PRODUCT_FOUNDATION.md`: v0.1 rule summary.
- `tools/smoke.mjs`: structural and content checks.
- `tools/browser-smoke.mjs`: desktop/mobile rendering, search, and category-filter checks.

The previous game project stays untouched. CLAMP WARS must be built as a new repository named `clamp-wars`.
