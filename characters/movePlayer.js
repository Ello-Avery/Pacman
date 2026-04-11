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
