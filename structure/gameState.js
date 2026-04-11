/* Player Starting Position */

var currentDirection = "";

var playerX = 1;
var playerY = 1;

/* Ghost 1 Starting Position */
var ghost_1X = 10;
var ghost_1Y = 10;

/* Scoring */

var score = 0;
var scoreLabel = document.getElementsByClassName("score")[0];

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

function checkWinCondition() {
  if (score >= 20) {
    scoreLabel.innerText = "YOU WIN!!";
  }
}
