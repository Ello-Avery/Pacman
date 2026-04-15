async function movePlayer(newX, newY, direction) {
  if (gameOver) return; // FIX: halt movement once the game ends
  if (
    newX < 0 ||
    newX >= game[0].length ||
    newY < 0 ||
    newY >= game.length ||
    game[newY][newX] === 1
  )
    return;

  // FIX: check ghost collision BEFORE scoring so the dying move doesn't also score
  if (game[newY][newX] === 7) {
    gameOver = true;
    scoreLabel.innerText = "GAME OVER! Score: " + score;
    drawGame(game);
    return;
  }

  updateScore(newX, newY); // FIX: was updateScore(newY, newY) — wrong args

  game[playerY][playerX] = 0;
  playerX = newX;
  playerY = newY;
  game[playerY][playerX] = 3;

  drawGame(game);

  nextMovePlayer();

  return;
}

async function nextMovePlayer() {
  if (gameOver) return; // FIX: stop the auto-move loop on game end
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

document.addEventListener("keydown", (e) => {
  if (gameOver) return; // FIX: ignore arrow keys after game ends
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
