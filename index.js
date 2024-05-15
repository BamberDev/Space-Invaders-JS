import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

const background = new Image();
background.src = "assets/space.png";

const playerBulletController = new BulletController(canvas, 20, "yellow", true);
const enemyBulletController = new BulletController(canvas, 5, "red", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 4, playerBulletController);

let isGameOver = false;
let didWin = false;
let gameInterval;

function gameLoop() {
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
    let text = didWin ? "YOU WIN" : "GAME OVER";
    let textOffset = didWin ? 5 : 15;

    ctx.fillStyle = "white";
    ctx.font = "100px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
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

document.querySelector("#start-button").addEventListener("click", startGame);

function startGame() {
  document.querySelector("#start-button").style.display = "none";
  gameInterval = setInterval(gameLoop, 1000 / 60);
}
