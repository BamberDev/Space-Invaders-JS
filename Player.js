export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 70;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "assets/player.png";

    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }

  draw(ctx) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 20);
    }
    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
    //Left
    if (this.x < 10) {
      this.x = 10;
    }

    //Right
    if (this.x > this.canvas.width - this.width - 10) {
      this.x = this.canvas.width - this.width - 10;
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity;
    } else if (this.leftPressed) {
      this.x += -this.velocity;
    }
  }

  keyDown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
    }
  };

  keyUp = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
  };

  reset() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 70;
    this.rightPressed = false;
    this.leftPressed = false;
    this.shootPressed = false;
  }
}
