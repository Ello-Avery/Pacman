const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var currentDirection = "";

var playerX = 1;
var playerY = 1;

//var playerMoveUp =

// var oldX = 1;
// var oldY = 1;

var dirArray = ["up", "down", "left", "right"];

function randomDirection() {
  return Math.floor(Math.random() * dirArray.length);
}

var ghost_1X = 10;
var ghost_1Y = 10;

var ghostMove = {
  7: 0,
};

var score = 0;
var scoreLabel = document.getElementsByClassName("score")[0];

var buttonActive = false;

async function movePlayer(newX, newY, direction) {
  if (
    newX < 0 ||
    newX >= game[0].length ||
    newY < 0 ||
    newY >= game.length ||
    game[newY][newX] === 1
  )
    return;

  updateScore(newY, newY);

  if (game[newY][newX] === 7) {
    scoreLabel.innerText = "GAME OVER!";
    game[playerY][playerX] = 0;
    playerX = newX;
    playerY = newY;
    game[playerY][playerX] = 7;
    drawGame(game);
    return;
  }

  game[playerY][playerX] = 0;
  playerX = newX;
  playerY = newY;
  game[playerY][playerX] = 3;

  drawGame(game);

  nextMovePlayer();

  return;
}

async function nextMovePlayer() {
  if (currentDirection === "up") {
    await wait(30);
    movePlayer(playerX, playerY - 1, "up");
    return;
  }
  if (currentDirection === "down") {
    await wait(30);
    movePlayer(playerX, playerY + 1, "down");
    return;
  }
  if (currentDirection === "left") {
    await wait(30);
    movePlayer(playerX - 1, playerY, "left");
    return;
  }
  if (currentDirection === "right") {
    await wait(30);
    movePlayer(playerX + 1, playerY, "right");
    return;
  }
}

function updateScore(newX, newY) {
  if (game[newY][newX] === 5) {
    score = score + 4;
    scoreLabel.innerText = score;
    checkWinCondition();
  }
  if (game[newY][newX] === 6) {
    score = score + 1;
    scoreLabel.innerText = score;
    checkWinCondition();
  }
}

/* */

async function moveGhost(newX, newY, direction) {
  if (newX < 0 || newX >= game[0].length) return;
  if (newY < 0 || newY >= game.length) return;

  if (game[newY][newX] === 1) {
    direction = dirArray[randomDirection()];
    if (direction === "up") {
      moveGhost(ghost_1X, ghost_1Y + 1, "down");
      return;
    }
    if (direction === "down") {
      moveGhost(ghost_1X, ghost_1Y + 1, "left");
      return;
    }
    if (direction === "left") {
      moveGhost(ghost_1X + 1, ghost_1Y, "right");
      return;
    }
    if (direction === "right") {
      moveGhost(ghost_1X - 1, ghost_1Y, "up");
      return;
    }
    // check direction and then go another direction
    //return
  }

  if (game[newY][newX] === 3) {
    scoreLabel.innerText = "GAME OVER!";
  }

  game[ghost_1Y][ghost_1X] = ghostMove[7];
  ghostMove[7] = game[newY][newX];
  ghost_1X = newX;
  ghost_1Y = newY;
  game[ghost_1Y][ghost_1X] = 7;

  drawGame(game);

  if (direction === "up") {
    await wait(30);
    moveGhost(ghost_1X, ghost_1Y - 1, "up");
  }
  if (direction === "down") {
    await wait(30);
    moveGhost(ghost_1X, ghost_1Y + 1, "down");
  }
  if (direction === "left") {
    await wait(30);
    moveGhost(ghost_1X - 1, ghost_1Y, "left");
  }
  if (direction === "right") {
    await wait(30);
    moveGhost(ghost_1X + 1, ghost_1Y, "right");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    currentDirection = "up";
    movePlayer(playerX, playerY - 1, "up");
  }
  if (e.key === "ArrowDown") {
    currentDirection = "down";
    movePlayer(playerX, playerY + 1, "down");
  }
  if (e.key === "ArrowLeft") {
    currentDirection = "left";
    movePlayer(playerX - 1, playerY, "left");
  }
  if (e.key === "ArrowRight") {
    currentDirection = "right";
    movePlayer(playerX + 1, playerY, "right");
  }
});

function checkWinCondition() {
  if (score >= 20) {
    scoreLabel.innerText = "YOU WIN!!";
  }
}

function init() {
  drawGame(game);
  moveGhost(ghost_1X, ghost_1Y - 1, "up");
}

init();
