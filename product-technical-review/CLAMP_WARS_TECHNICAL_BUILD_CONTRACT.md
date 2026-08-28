# CLAMP WARS Technical Build Contract v0.1

## Purpose

Build CLAMP WARS as a new independent game repository named `clamp-wars`.

The first release must be a real playable local two-player game with a clean rules engine, not a static mock-up and not a renamed legacy project.

## Product Identity

- Name: `CLAMP WARS`
- Subtitle: `A Strategic Board Game of Encirclement`
- Repository: `clamp-wars`
- Primary experience: playable board-first web app
- v0.1 scope: local two-player play, complete rules, clocks, replay data, responsive UI

## Non-negotiable Boundaries

1. Keep previous game repositories untouched.
2. Do not import old runtime, rules, assets, or route labels.
3. Do not use copied board-game art, piece names, notation, or visual identity from another product.
4. Do not build fake multiplayer, fake AI, fake ranking, or fake online counters.
5. Every feature/service must have an interface contract: routes, states, permissions, data, errors, and tests.
6. The rules engine is authoritative. UI can request actions but cannot invent legal moves, captures, results, or replay entries.

## Required v0.1 Game

- 9x9 board using coordinates `a1` through `i9`.
- `a1` and `e5` are yellow sand squares; color alternates with white stone.
- Each player deploys 20 Guards and 4 selected special pieces.
- Special pool per player: 2 Ramparts, 2 Compasses, 2 Striders.
- Each player privately selects 4 specials before founding.
- Random Founding Player places first.
- Players alternate selected special placement, then Guard placement.
- No capture, chain, siege check, or win is evaluated during founding.
- First battle turn goes to the player who did not place the final Guard.
- Movement, capture, chain, clocks, sealed siege, result, and replay events must be implemented headlessly and consumed by the UI.

## Named Pieces

- Guard: normal piece, one orthogonal step.
- Rampart: Type I, clear orthogonal lanes.
- Compass: Type II, clear orthogonal and diagonal lanes.
- Strider: Type III, one to three clear squares in any of eight directions.

These names are public-facing v0.1 names. The engine should also keep stable technical codes: `normal`, `typeI`, `typeII`, `typeIII`.

## Delivery Order

1. Repository foundation, package scripts, test harness.
2. Coordinates, board parity, piece inventory, serializable state.
3. Private special selection and simultaneous reveal.
4. Special founding and Guard founding.
5. Legal movement and clear-path validation.
6. Interception capture and mandatory capture chains.
7. Turn system and founding/battle clocks.
8. Sealed-siege evaluator and terminal result ordering.
9. Move history, replay import/export, final board recording.
10. Responsive board-first UI, profile/sign-in/settings route shells, accessibility, and smoke tests.

## Definition of Done

A feature is complete only when the engine behavior, UI state, persistence/replay data, accessibility behavior, responsive layout, error states, and tests are complete. Visual rendering alone is not delivery.
