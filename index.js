import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const controlButtons = document.getElementById("controlButtons");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    // score
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";

    ctx.fillText(
      "Score: " + enemyController.countScore(),
      canvas.width / 2 - 50,
      canvas.height / 2 + 50
    );

    // restart button
    controlButtons.style.display = "flex";
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

setInterval(game, 1000 / 60);

//Restart game
function gameRestart() {
  if (isGameOver) {
    isGameOver = false;
    didWin = false;
    controlButtons.style.display = "none";
    
    playerBulletController.restart();
    enemyBulletController.restart();
    enemyController.restart();
    player.restart();
  }
}

document.getElementById("restart").addEventListener("click", () => {
  gameRestart();
});
document.getElementById("easy").addEventListener("click", () => {
  enemyController.fireBulletTimerDefault = 100;
  gameRestart();
});
document.getElementById("medium").addEventListener("click", () => {
  enemyController.fireBulletTimerDefault = 50;
  gameRestart();
});
document.getElementById("hard").addEventListener("click", () => {
  enemyController.fireBulletTimerDefault = 25;
  gameRestart();
});
