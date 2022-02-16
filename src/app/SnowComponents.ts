/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/**
 * A simple snow maker using canvas by Regis Gaughan, III.
 * The `SnowMaker` will instatiate with a `canvas` field to attach to the dom
 * and public methods to start, stop, and pause the animation.
 */

export interface SnowFlake {
  /** The current x position. */
  x: number;
  /** The current y position. */
  y: number;
  /** The radius. */
  radius: number;
  /** A value to add to y movement to speed/slow itself. */
  drop: number;
  /** A pixel value to add to x movement to speed/slow itself. */
  sway: number;
}

/** The snow maker. */
class SnowMaker {
  readonly canvas = document.createElement('canvas') as HTMLCanvasElement;

  private readonly ctx = this.canvas.getContext('2d')!;

  private readonly flakes: SnowFlake[] = [];

  private angle = Math.random();

  private animFrameId: number|null = 0;

  constructor (numOfFlakes = randomInt(300, 600)) {
    this.initCanvas();
    this.generateFlakes(numOfFlakes);
    this.attachEvents();
  }

  /** Start the animation. */
  start () {
    if (!this.animFrameId) {
      this.setCanvasSize();
      this.requestDraw();
    }
  }

  /** Pause the animation. */
  pause () {
    if (this.animFrameId) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  /** Stop the animation (pause + clear). */
  stop () {
    this.pause();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Initialize the canvas & its styles. */
  private initCanvas () {
    this.canvas.className = 'snow';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.setCanvasSize();
  }

  /** Set the canvase size. */
  private setCanvasSize () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /** Attach any events we're interested in. */
  private attachEvents () {
    window.addEventListener('resize', () => { this.setCanvasSize(); });
  }

  /** Generate our flakes. */
  private generateFlakes (numOfFlakes: number) {
    this.flakes.length = 0;
    for (let i = 0; i < numOfFlakes; i++) {
      this.flakes.push({
        x: randomInt(0, this.canvas.width),
        y: randomInt(0, this.canvas.height),
        radius: random(0.25, 2),
        sway: random(-0.3, 0.3),
        drop: random(-0.5, 0.5),
      });
    }
  }

  /** Request a draw on the next animation frame. */
  private requestDraw () {
    this.animFrameId = window.requestAnimationFrame(() => { this.draw(); });
  }

  /** The meat, drawing our snowflakes on each frame. */
  private draw () {
    // Increment our angle. We use trigonometry to gently sway
    // our snowflakes back and forth
    this.angle += 0.002;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(255, 255, 255, .66)';
    this.ctx.beginPath();
    this.flakes.forEach((flake) => {
      // Draw our flake at its current x/y
      this.ctx.moveTo(flake.x, flake.y);
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

      // Update our flake's next x/y.
      flake.y += 1 + flake.drop;
      flake.x += (Math.sin(this.angle) * 2) + flake.sway;
      if (flake.x > this.canvas.width + (flake.radius * 2)) {
        flake.x = randomInt(-25, (flake.radius * -2));
      } else if (flake.x < flake.radius * -2) {
        flake.x = this.canvas.width + randomInt(flake.radius * 2, 25);
      } else if (flake.y > this.canvas.height) {
        flake.x = randomInt(0, this.canvas.width);
        flake.y = flake.radius * -2;
      }
    });
    this.ctx.fill();
    this.requestDraw();
  }
}

/** Helper function returning a random decimal between min and max. */
function random (min: number, max: number) {
  return Math.random() * (max - min) + min;
}
/** Helper functions to generate a random int inclusive of min and max. */
function randomInt (min: number, max: number) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

export default SnowMaker;
