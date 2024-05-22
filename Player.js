export function Player(canvas, velocity, bulletController) {
  let rightPressed = false;
  let leftPressed = false;
  let shootPressed = false;
  let x = canvas.width / 2 - 25;
  let y = canvas.height - 70;
  const width = 50;
  const height = 48;
  const image = new Image();
  image.src = "assets/player.png";

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  function draw(ctx) {
    if (shootPressed) {
      bulletController.shoot(x + width / 2, y, 4, 20);
    }
    move();
    collideWithWalls();
    ctx.drawImage(image, x, y, width, height);
  }

  function collideWithWalls() {
    if (x < 10) {
      x = 10;
    }
    if (x > canvas.width - width - 10) {
      x = canvas.width - width - 10;
    }
  }

  function move() {
    if (rightPressed) {
      x += velocity;
    } else if (leftPressed) {
      x -= velocity;
    }
  }

  function keyDown(event) {
    if (event.code === "ArrowRight") {
      rightPressed = true;
    }
    if (event.code === "ArrowLeft") {
      leftPressed = true;
    }
    if (event.code === "Space") {
      shootPressed = true;
    }
  }

  function keyUp(event) {
    if (event.code === "ArrowRight") {
      rightPressed = false;
    }
    if (event.code === "ArrowLeft") {
      leftPressed = false;
    }
    if (event.code === "Space") {
      shootPressed = false;
    }
  }

  function reset() {
    x = canvas.width / 2 - width / 2;
    y = canvas.height - 70;
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
  }

  return {
    draw,
    reset,
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
  };
}
