const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var dirArray = ["up", "down", "left", "right"];

function randomDirection() {
  return Math.floor(Math.random() * dirArray.length);
}

var ghostMove = {
  7: 0,
};

var buttonActive = false;
