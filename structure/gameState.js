/* FIX: named tile constants replace magic numbers */
var TILE = {
  BOARD: 0,
  WALL: 1,
  PLAYER: 3,
  BIG_PELLET: 5,
  SMALL_PELLET: 6,
  GHOST: 7,
};

/* Starting positions */
var START_PLAYER_X = 1;
var START_PLAYER_Y = 1;
var START_GHOST_X = 10;
var START_GHOST_Y = 10;

var currentDirection = "";
var playerX = START_PLAYER_X;
var playerY = START_PLAYER_Y;
var ghost_1X = START_GHOST_X;
var ghost_1Y = START_GHOST_Y;

var score = 0;
var pelletsRemaining = 0; // FIX: track pellets instead of using magic win number
var gameOver = false; // FIX: shared flag so loops can halt
var scoreLabel = document.getElementsByClassName("score")[0];

/* FIX: snapshot the starting map so New Game can reset it */
var initialGame = JSON.parse(JSON.stringify(game));

// FIX: count pellets dynamically so the win condition matches the map
function countPellets(matrix) {
  var total = 0;
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === TILE.BIG_PELLET || matrix[y][x] === TILE.SMALL_PELLET) {
        total++;
      }
    }
  }
  return total;
}

function updateScore(newX, newY) {
  var tile = game[newY][newX];
  if (tile === TILE.BIG_PELLET) {
    score += 4;
    pelletsRemaining--;
    game[newY][newX] = TILE.BOARD; // FIX: consume the pellet so it can't be scored twice
    scoreLabel.innerText = score;
    checkWinCondition();
  } else if (tile === TILE.SMALL_PELLET) {
    score += 1;
    pelletsRemaining--;
    game[newY][newX] = TILE.BOARD; // FIX: consume the pellet
    scoreLabel.innerText = score;
    checkWinCondition();
  }
}

// FIX: win when every pellet is eaten (was: score >= 20)
function checkWinCondition() {
  if (pelletsRemaining <= 0) {
    gameOver = true;
    scoreLabel.innerText = "YOU WIN!! Score: " + score;
  }
}

// NEW: full reset for the New Game button
function resetGame() {
  game = JSON.parse(JSON.stringify(initialGame));
  playerX = START_PLAYER_X;
  playerY = START_PLAYER_Y;
  ghost_1X = START_GHOST_X;
  ghost_1Y = START_GHOST_Y;
  currentDirection = "";
  score = 0;
  gameOver = false;
  pelletsRemaining = countPellets(game);
  ghostMove[7] = 0;
  scoreLabel.innerText = score;
  drawGame(game);
  moveGhost(ghost_1X, ghost_1Y - 1, "up");
}

pelletsRemaining = countPellets(game);

// NEW: wire up the New Game button (was unhooked)
document.getElementsByTagName("button")[0].addEventListener("click", resetGame);
