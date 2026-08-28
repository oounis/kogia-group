# CLAMP WARS Rules and Product Foundation v0.1

## Core Rule Summary

CLAMP WARS is a deterministic two-player strategy game of encirclement played on a 9x9 board.

The board has 81 squares. Each player deploys 24 pieces, so the battle starts with 48 pieces and 33 empty squares.

There are no player sides, home zones, forward directions, or protected areas. Both players use the whole board.

## Board

- Files: `a` through `i`
- Ranks: `1` through `9`
- Center: `e5`
- Alternating colors: yellow sand and white stone
- `a1` is yellow, so `e5` is yellow
- Colors are visual only in v0.1

## Pieces

Each player owns:

- 20 Guards
- 2 Ramparts
- 2 Compasses
- 2 Striders

Before a match, each player privately selects four special pieces from the six-piece special pool. The two unselected specials do not enter the match.

## Movement

All pieces move only to empty squares and cannot jump over another piece.

- Guard: exactly one square horizontally or vertically.
- Rampart: any number of clear squares horizontally or vertically.
- Compass: any number of clear squares horizontally, vertically, or diagonally.
- Strider: one, two, or three clear squares in any of the eight directions.

Special pieces have no powers beyond movement.

## Founding

1. Both players privately select four special pieces.
2. Both selections are revealed simultaneously.
3. Randomly choose the Founding Player.
4. Players alternate placing selected special pieces on any empty square.
5. Players alternate placing Guards on any empty square until each has placed 20.
6. No capture, siege, or win is checked during founding.
7. The player who did not place the final Guard receives the first battle turn.

## Capture

After a legal battle move, an enemy piece is captured when it is orthogonally trapped between the moved player's pieces.

- Horizontal and vertical lines count.
- Diagonal trapping does not capture.
- All enemy pieces captured by the move are removed together.
- If a capturing move creates a mandatory continuation for the same moved piece, the chain continues until no capturing continuation remains.
- A full forced chain counts as one turn.

## Win Conditions

A player wins immediately by:

- Elimination: the opponent has no pieces.
- No legal move: the opponent begins a battle turn with no legal move.
- Timeout: the opponent's active clock reaches zero.
- Sealed Siege: the mover closes a valid sealed pocket containing at least `siegeWinThreshold` enemy pieces.

Default `siegeWinThreshold` is `5`.

A sealed pocket must contain at least one empty square, enemy pieces, and at least one empty square outside the pocket. The attacker's pieces must fully seal the pocket. If the trapped player can immediately capture a wall piece and create an exit, the pocket is not sealed.

If one move creates valid sealed-siege wins for both players, the result is a draw and the full state is logged for review.

## Clocks

- Founding: 5 minutes per player, no increment.
- Battle: 10 minutes plus 5 seconds increment per completed turn.
- Increment is added only after the full turn ends.
- A forced capture chain receives one increment after the entire chain is complete.

## Replay Data

Record selections, reveal, every founding placement, every movement, every capture, chain substeps, clock values, siege events, result, and final board state.

Replay data must rebuild the match from an empty state and must use coordinate notation from `a1` to `i9`.
