# Pacman

A browser-based Pacman game built with vanilla HTML, CSS, and JavaScript.

## How to Play

Open `index.html` in a browser and use the **arrow keys** to move Pacman around the maze.

- Collect **small pellets** (white dots) — worth **1 point** each
- Collect **big pellets** (large white dots) — worth **4 points** each
- Avoid the **pink ghost** — touching it ends the game
- Reach **20 points** to win

## Project Structure

```
Pacman/
├── index.html              # Entry point
├── styles.css              # All styling (maze, player, ghost, pellets)
├── script.js               # Initialises and starts the game
├── structure/
│   ├── map.js              # 20×20 tile map and drawGame()
│   ├── gameState.js        # Player/ghost positions and score logic
│   └── helpers.js          # Shared utilities (wait, random direction)
└── characters/
    ├── movePlayer.js       # Arrow-key input and player movement
    └── moveGhost.js        # Ghost AI (random-direction movement)
```

## Tile Map Legend

| Value | Tile |
|-------|------|
| `0` | Empty board cell |
| `1` | Wall |
| `3` | Player (Pacman) |
| `5` | Big pellet |
| `6` | Small pellet |
| `7` | Ghost |

## Tech Stack

- **HTML/CSS/JavaScript** — no frameworks or dependencies
- The game board is a 20×20 grid rendered as inline `<div>` elements
- Ghost movement uses async recursion with a 30 ms delay per step
- Player movement uses async recursion with a 50 ms delay, enabling smooth continuous movement while an arrow key is held
