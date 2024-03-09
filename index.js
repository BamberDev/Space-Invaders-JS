import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

const background = new Image();
background.src = "assets/space.png";

const playerBulletController = new BulletController(canvas, 20, "red", true);
const enemyBulletController = new BulletController(canvas, 5, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 4, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
  checkGamveOver();
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
    let text = didWin ? "YOU WIN" : "GAME OVER";
    let textOffset = didWin ? 3.5 : 15;

    ctx.fillStyle = "white";
    ctx.font = "100px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGamveOver() {
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
