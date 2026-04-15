# Pacman

A simple Pacman clone built for boot camp. This README documents the game-state
fixes and improvements made in this pass.

## Bugs fixed

### 1. `updateScore` received the wrong arguments

`movePlayer` was calling `updateScore(newY, newY)` — passing the Y coordinate
twice. Pellets were only scored when the player happened to be on a tile where
`x === y`. Fixed to `updateScore(newX, newY)`.

### 2. Pellets were never consumed

Scoring a pellet added points but left the pellet tile in place until
`movePlayer` happened to overwrite it. `updateScore` now sets the tile to
`TILE.BOARD` the moment a pellet is eaten, so scoring and consumption stay in
sync.

### 3. Win condition was a magic number

`checkWinCondition` used `score >= 20`, which didn't match the actual number of
pellets on the board and never stopped the game. We now count pellets at load
time (`countPellets`) and decrement `pelletsRemaining` as they are eaten. The
player wins when `pelletsRemaining <= 0`.

### 4. Game Over didn't stop the game

"GAME OVER!" was written to the label, but the player loop, ghost loop, and
keyboard handler all kept running. A shared `gameOver` flag is now checked at
the top of `movePlayer`, `nextMovePlayer`, `moveGhost`, the keydown listener,
and on win. When it flips to `true`, everything halts.

### 5. Collision check order in `movePlayer`

`updateScore` ran before the ghost-collision check, so the player could score a
pellet on the same tile as the ghost on the frame they died. The ghost check
now runs first, and the function returns immediately on death.

### 6. New Game button was not wired up

The button in `index.html` did nothing. `resetGame` now restores the map,
positions, score, direction, and `gameOver` flag, then redraws and restarts
the ghost loop. The button's click handler calls it.

## Improvements

- **Named tile constants** (`TILE.WALL`, `TILE.PLAYER`, `TILE.BIG_PELLET`, …)
  replace magic numbers in the state module, making intent clearer.
- **Deep-copied `initialGame`** snapshot is taken at load time so resets don't
  have to rebuild the map by hand.
- **Dynamic pellet count** means the win condition stays correct even if the
  map in `structure/map.js` is edited later.
- **Score shown on end screens** — both "YOU WIN!!" and "GAME OVER!" now
  include the final score.

## Files touched

- [structure/gameState.js](structure/gameState.js) — constants, reset, pellet
  counting, fixed `updateScore`, win condition, button wiring.
- [characters/movePlayer.js](characters/movePlayer.js) — fixed arg bug,
  reordered collision check, added `gameOver` guards.
- [characters/moveGhost.js](characters/moveGhost.js) — added `gameOver` guard
  and proper game-over on player collision.

## Possible next steps

- Move all mutable state into a single `state` object so resets are one
  assignment.
- Make big pellets temporarily scare the ghost (classic Pacman power pellet).
- Track lives instead of instant game over.
- Add more ghosts with different movement strategies.
