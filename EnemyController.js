import { Enemy } from "./Enemy.js";
import { MovingDirection } from "./MovingDirection.js";

export function EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
) {
  const enemyMap = [
    [0, 2, 3, 2, 3, 2, 3, 2, 0],
    [2, 3, 2, 3, 2, 3, 2, 3, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2],
    [1, 3, 1, 3, 1, 3, 1, 3, 1],
    [0, 1, 3, 1, 3, 1, 3, 1, 0],
  ];

  let enemyRows = [];
  let currentDirection = MovingDirection.right;
  let xVelocity = 1;
  let yVelocity = 0;
  const defaultXVelocity = 1;
  const defaultYVelocity = 1;
  let moveDownTimer = 35;
  const moveDownTimerDefault = 35;
  let fireBulletTimer = 100;
  const fireBulletTimerDefault = 100;

  const enemyDeathSound = new Audio("sounds/enemy-death.wav");
  enemyDeathSound.volume = 0.01;

  createEnemies();

  function draw(ctx) {
    decrementMoveDownTimer();
    updateVelocityAndDirection();
    collisionDetection();
    drawEnemies(ctx);
    resetMoveDownTimer();
    fireBullet();
  }

  function collisionDetection() {
    enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (playerBulletController.collideWith(enemy)) {
          enemyDeathSound.currentTime = 0;
          enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });
    enemyRows = enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  function fireBullet() {
    fireBulletTimer--;
    if (fireBulletTimer <= 0) {
      fireBulletTimer = fireBulletTimerDefault;
      const allEnemies = enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
    }
  }

  function resetMoveDownTimer() {
    if (moveDownTimer <= 0) {
      moveDownTimer = moveDownTimerDefault;
    }
  }

  function decrementMoveDownTimer() {
    if (
      currentDirection === MovingDirection.downLeft ||
      currentDirection === MovingDirection.downRight
    ) {
      moveDownTimer--;
    }
  }

  function updateVelocityAndDirection() {
    for (const enemyRow of enemyRows) {
      if (currentDirection === MovingDirection.right) {
        xVelocity = defaultXVelocity;
        yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width > canvas.width - 20) {
          currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (currentDirection === MovingDirection.downLeft) {
        if (moveDown(MovingDirection.left)) {
          break;
        }
      } else if (currentDirection === MovingDirection.left) {
        xVelocity = -defaultXVelocity;
        yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 20) {
          currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (currentDirection === MovingDirection.downRight) {
        if (moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  function collideWith(sprite) {
    return enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }

  function moveDown(newDirection) {
    xVelocity = 0;
    yVelocity = defaultYVelocity;
    if (moveDownTimer <= 0) {
      currentDirection = newDirection;
      return true;
    }
    return false;
  }

  function drawEnemies(ctx) {
    enemyRows.flat().forEach((enemy) => {
      enemy.move(xVelocity, yVelocity);
      enemy.draw(ctx);
    });
  }

  function createEnemies() {
    enemyMap.forEach((row, rowIndex) => {
      enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          enemyRows[rowIndex].push(
            Enemy(enemyIndex * 60, rowIndex * 40, enemyNumber)
          );
        }
      });
    });
  }

  function reset() {
    enemyRows = [];
    createEnemies();
    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    moveDownTimer = moveDownTimerDefault;
    fireBulletTimer = fireBulletTimerDefault;
  }

  return {
    draw,
    reset,
    collideWith,
    get enemyRows() {
      return enemyRows;
    },
  };
}
