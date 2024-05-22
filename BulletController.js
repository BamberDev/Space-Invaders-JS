import { Bullet } from "./Bullet.js";

export function BulletController(
  canvas,
  maxBulletsAtATime,
  bulletColor,
  soundEnabled
) {
  let bullets = [];
  let timeTillNextBulletAllowed = 0;

  const shootSound = new Audio("sounds/shoot.wav");
  shootSound.volume = 0.01;

  function draw(ctx) {
    bullets = bullets.filter(
      (bullet) => bullet.y + bullet.height > 0 && bullet.y <= canvas.height
    );

    bullets.forEach((bullet) => bullet.draw(ctx));
    if (timeTillNextBulletAllowed > 0) {
      timeTillNextBulletAllowed--;
    }
  }

  function collideWith(sprite) {
    const bulletThatHitSpriteIndex = bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
      bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }
    return false;
  }

  function shoot(x, y, velocity, timeTillNextBulletAllowedParam = 0) {
    if (timeTillNextBulletAllowed <= 0 && bullets.length < maxBulletsAtATime) {
      const bullet = Bullet(canvas, x, y, velocity, bulletColor);
      bullets.push(bullet);
      if (soundEnabled) {
        shootSound.currentTime = 0;
        shootSound.play();
      }
      timeTillNextBulletAllowed = timeTillNextBulletAllowedParam;
    }
  }

  function reset() {
    bullets = [];
  }

  return {
    draw,
    collideWith,
    shoot,
    reset,
    get bullets() {
      return bullets;
    },
  };
}
