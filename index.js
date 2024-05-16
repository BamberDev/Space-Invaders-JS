import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const tryAgainButton = document.querySelector("#try-again-button");
const startButton = document.querySelector("#start-button");

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
    let text = didWin ? "YOU WIN!" : "GAME OVER";
    let buttonText = didWin ? "PLAY AGAIN" : "TRY AGAIN";

    ctx.fillStyle = "white";
    ctx.font = "100px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    tryAgainButton.innerText = buttonText;
    tryAgainButton.style.display = "block";
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

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display = "none";
  tryAgainButton.style.display = "none";
  isGameOver = false;
  didWin = false;
  enemyController.reset();
  player.reset();
  playerBulletController.reset();
  enemyBulletController.reset();

  clearInterval(gameInterval);

  gameInterval = setInterval(gameLoop, 1000 / 60);
}

tryAgainButton.addEventListener("click", startGame);
