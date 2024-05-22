export function Enemy(x, y, imageNumber) {
  const width = 44;
  const height = 32;

  const image = new Image();
  image.src = `assets/enemy${imageNumber}.png`;

  function draw(ctx) {
    ctx.drawImage(image, x, y + 15, width, height);
  }

  function move(xVelocity, yVelocity) {
    x += xVelocity;
    y += yVelocity;
  }

  function collideWith(sprite) {
    if (
      x + width > sprite.x &&
      x < sprite.x + sprite.width &&
      y + height > sprite.y &&
      y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  return {
    draw,
    move,
    collideWith,
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
