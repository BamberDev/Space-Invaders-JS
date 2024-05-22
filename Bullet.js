export function Bullet(canvas, x, y, velocity, bulletColor) {
  const width = 5;
  const height = 20;

  function draw(ctx) {
    y -= velocity;
    ctx.fillStyle = bulletColor;
    ctx.fillRect(x - width / 2, y, width, height);
  }

  function collideWith(sprite) {
    return (
      x + width > sprite.x &&
      x < sprite.x + sprite.width &&
      y + height > sprite.y &&
      y < sprite.y + sprite.height
    );
  }

  return {
    draw,
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
