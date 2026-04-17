const directionKeyMap = {
  ArrowUp: () => movePlayer(playerX, playerY - 1),
  ArrowDown: () => movePlayer(playerX, playerY + 1),
  ArrowLeft: () => movePlayer(playerX - 1, playerY),
  ArrowRight: () => movePlayer(playerX + 1, playerY),
};

async function movePlayer(newX, newY) {
  if (
    newX < 0 ||
    newX >= game[0].length ||
    newY < 0 ||
    newY >= game.length ||
    game[newY][newX] === 1
  )
    return;

  updateScore(newX, newY);

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

  await wait(50);

  drawGame(game);

  const action = directionKeyMap[currentDirection];
  if (action) action();
}

document.addEventListener("keydown", (e) => {
  currentDirection = e.key;
  const action = directionKeyMap[currentDirection];
  if (action) action();
});
