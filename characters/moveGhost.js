function canMoveGhost(newX, newY) {
  if (newX < 0 || newX >= game[0].length) return false;
  if (newY < 0 || newY >= game.length) return false;
  if (game[newY][newX] === 1) return false;
  return true;
}

function getValidDirections(newX, newY) {
  const directions = [];
  if (canMoveGhost(newX, newY - 1)) directions.push("up");
  if (canMoveGhost(newX, newY + 1)) directions.push("down");
  if (canMoveGhost(newX - 1, newY)) directions.push("left");
  if (canMoveGhost(newX + 1, newY)) directions.push("right");
  return directions;
}

const moves = {
    up: {x: 0, y: -1},
    down: {x: 0, y: 1},
    left: {x: -1, y: 0},
    right: {x: 1, y: 0}
  };

async function moveGhost(newX, newY, direction) {
  if (newX < 0 || newX >= game[0].length) return;
  if (newY < 0 || newY >= game.length) return;

  if (game[newY][newX] === 1) {
    const validDirections = getValidDirections(ghost_1X, ghost_1Y);
    if (validDirections.length === 0) return
    
    const getRandomValidIndex = Math.floor(Math.random() * validDirections.length);

    direction = validDirections[getRandomValidIndex]

    newX = ghost_1X + moves[direction].x;
    newY = ghost_1Y + moves[direction].y;
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

  await wait(30)
  
  moveGhost(
    ghost_1X + moves[direction].x,
    ghost_1Y + moves[direction].y,
    direction
  )
}

