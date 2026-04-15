async function moveGhost(newX, newY, direction) {
  if (gameOver) return; // FIX: stop the ghost loop when the game ends
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

  // FIX: ghost catching the player now sets gameOver and returns (was just text)
  if (game[newY][newX] === 3) {
    gameOver = true;
    scoreLabel.innerText = "GAME OVER! Score: " + score;
    return;
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
