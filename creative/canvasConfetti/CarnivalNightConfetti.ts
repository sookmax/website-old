/**
 * CarnivalNightConfetti is based on Varun Vachhar's blog post: "Let's Build a Confetti Cannon"
 * link: https://varun.ca/confetti/
 *
 * In the blog post, Varun mentioned his demo is inspired by this artist's work: Laura Belém, Carnival Nights, 2016
 * link: https://www.artbasel.com/catalog/artwork/36465/Laura-Bel%C3%A9m-Carnival-Nights
 *
 * Please check out their works, thank you!
 */

import { debounce } from "lodash-es";
import Random from "canvas-sketch-util/random";
import Color from "canvas-sketch-util/color";
import { pickTwoFromPalette } from "./palette";
import { getDistanceFunction, getGravityFunction, Vector2 } from "./utils";

export interface Options {
  canvasInlineStyle?: Partial<CSSStyleDeclaration>;
  particleSize?: number;
  particleCount?: number;
  velocityFactor?: number;
  gravity?: number;
  animFadeOutStart?: number;
  autoInterval?: number;
}

interface Particle {
  initialPosition: Vector2;
  tilt: number;
  position: Vector2;
  distanceVector: Vector2;
  computeDistance: (t: number) => number;
  computeGravity: (t: number) => number;
  colors: [number, number, number][];
  opacity: number;
  randomness: number;
}

const DEFAULT_OPTIONS: Required<Options> = {
  canvasInlineStyle: {},
  particleSize: 0.01,
  particleCount: 100,
  velocityFactor: 4,
  gravity: 50,
  animFadeOutStart: 1,
  autoInterval: 0,
};

export default class CarnivalNightConfetti {
  public options;

  private _canvas;
  private _ctx;

  private _diagonal;

  private _startTimestamp: number | undefined;

  private _particles: Particle[] = [];

  private _timeoutId: NodeJS.Timeout | undefined;
  private _requestId: number | undefined;

  private _canvasRect: DOMRect;
  private _pointerPosition: Vector2 | undefined;

  private _disposed = false;

  constructor(canvas: HTMLCanvasElement, options: Options = {}) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw "canvas context 2d not found.";
    }

    this._ctx = ctx;
    this._canvas = canvas;
    this._canvasRect = canvas.getBoundingClientRect();

    this._canvas.style.width = "100%";
    this._canvas.style.height = "100%";

    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (this.options.canvasInlineStyle) {
      for (const [key, value] of Object.entries(
        this.options.canvasInlineStyle
      )) {
        (this._canvas.style as any)[key] = value;
      }
    }

    this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
    this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;

    // the velocity and the size of each particle depend on the canvas dimensions.
    this._diagonal = Math.sqrt(
      this._canvas.width ** 2 + this._canvas.height ** 2
    );

    this._particles = this._createParticles();

    this.onManualClick = this.onManualClick.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._resizeHandler = debounce(this._resizeHandler, 200);
    this._render = this._render.bind(this);

    // this._canvas.addEventListener("pointerdown", this._pointerDownHandler);
    window.addEventListener("resize", this._resizeHandler);
  }

  public start() {
    this._requestId = requestAnimationFrame(this._render);
  }

  public dispose() {
    this._disposed = true;
    this._requestId && cancelAnimationFrame(this._requestId);
    this._timeoutId && clearTimeout(this._timeoutId);
    // this._canvas.removeEventListener("pointerdown", this._pointerDownHandler);
    window.removeEventListener("resize", this._resizeHandler);
  }

  public onManualClick(clientX: number, clientY: number) {
    this._timeoutId && clearTimeout(this._timeoutId);

    if (!this._pointerPosition) {
      this._pointerPosition = new Vector2(
        ...this._getCanvasCoords(clientX, clientY)
      );
    } else {
      this._pointerPosition.set(...this._getCanvasCoords(clientX, clientY));
    }

    this._reset(this._pointerPosition);
  }

  private _render(timestamp: number) {
    if (!this._startTimestamp) {
      this._startTimestamp = timestamp;
    }

    const elapsed = (timestamp - this._startTimestamp) / 1000; // in seconds
    this._drawParticles(elapsed);

    const done = this._particles.filter((p) => p.opacity > 0.1).length === 0;

    if (done) {
      if (!this._timeoutId) {
        this._timeoutId = setTimeout(() => {
          this._reset();
        }, this.options.autoInterval);
      }
    }

    if (!this._disposed) {
      this._requestId = requestAnimationFrame(this._render);
    }
  }

  private _reset(initialPosition?: Vector2) {
    this._particles = this._createParticles(initialPosition);
    this._startTimestamp = undefined;
    this._timeoutId = undefined;
  }

  private _drawParticles(elapsed: number) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._particles.forEach((p) => {
      // draw a shadow (full circle)
      this._ctx.save();
      this._ctx.beginPath();
      this._ctx.arc(
        p.position.x,
        p.position.y,
        this.options.particleSize * this._diagonal,
        0,
        Math.PI * 2
      );
      this._ctx.shadowColor = "#000000";
      this._ctx.shadowOffsetX = 4;
      this._ctx.shadowOffsetY = 4;
      this._ctx.shadowBlur = 5;
      this._ctx.fillStyle = Color.style([0, 0, 0, p.opacity * 0.5]); // shadow starts with a lower opacity.
      this._ctx.fill();
      this._ctx.restore();

      // https://digitalfreepen.com/2017/06/20/range-perlin-noise.html
      // The range is [-Math.sqrt(N/4), Math.sqrt(N/4)]

      // draw each half circle with a different color.
      p.colors.forEach((c, idx) => {
        this._ctx.save();
        this._ctx.beginPath();
        this._ctx.translate(p.position.x, p.position.y);
        // since the canvas is now translated to the particle's position,
        // the rotation will occur with respect to the particle position as opposed to the origin.
        this._ctx.rotate(p.tilt);
        // since the whole coordinates are translated to the particle position,
        // we can just draw the arcs at the origin, which is the particle position.
        this._ctx.arc(
          0,
          0,
          this.options.particleSize * this._diagonal,
          0,
          Math.PI,
          idx === 0 // draw the half circles in opposite directions so they are not superposed.
        );

        this._ctx.fillStyle = Color.style([...c, p.opacity]);
        this._ctx.fill();
        this._ctx.restore();
      });

      // the amount that will be added to the initial position.
      // same direction as `p.distanceVector` but
      // this vector is always be smaller than `p.distanceVector`.
      const vector = p.distanceVector
        .clone()
        .unit()
        .multiplyScalar(p.computeDistance(elapsed));

      p.position = p.initialPosition
        .clone()
        .addVector(vector)
        // add gravitational movement only to y-direction.
        .addY(p.computeGravity(elapsed))
        // add random noise
        .addX(
          Random.noise2D(
            p.position.x / p.randomness,
            p.position.y / p.randomness,
            7,
            this._diagonal * 0.01
          )
        );

      p.tilt += Random.noise2D(
        p.position.x / p.randomness,
        p.position.y / p.randomness,
        40,
        0.05
      );

      if (elapsed > this.options.animFadeOutStart) {
        if (Math.random() > 0.7) {
          p.opacity *= 0.95;
        }
      }
    });
  }

  private _createParticles(initialPosition?: Vector2) {
    if (!initialPosition) {
      initialPosition = new Vector2(
        Math.random() * this._canvas.width,
        Math.random() * this._canvas.height
      );
    }

    let particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      particles.push(this._createParticle(initialPosition.clone()));
    }

    return particles;
  }

  private _createParticle(initialPosition: Vector2) {
    const xRange = [-this._canvas.width * 0.01, this._canvas.width * 1.01];
    const yRange = [-this._canvas.height * 0.01, this._canvas.height * 1.01];

    const endPosition = new Vector2(
      Math.random() * (xRange[1] - xRange[0]) + xRange[0],
      Math.random() * (yRange[1] - yRange[0]) + yRange[0]
    );

    const distanceVector = endPosition.clone().subVector(initialPosition);

    const computeDistance = getDistanceFunction(
      distanceVector.length(),
      this.options.velocityFactor
    );

    const computeGravity = getGravityFunction(this.options.gravity, 0, 0);

    return {
      initialPosition,
      tilt: Math.random() * Math.PI * 2,
      position: initialPosition.clone(),
      distanceVector,
      computeDistance,
      computeGravity,
      colors: pickTwoFromPalette().map((hex) => Color.parse(hex).rgb),
      opacity: 1,
      randomness: Random.gaussian(this._diagonal, this._diagonal * 0.05),
    };
  }

  private _getCanvasCoords(clientX: number, clientY: number) {
    const { left, top } = this._canvasRect;
    const canvasX = (clientX - left) * window.devicePixelRatio;
    const canvasY = (clientY - top) * window.devicePixelRatio;
    return [canvasX, canvasY] as [number, number];
  }

  private _resizeHandler() {
    this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
    this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;
    this._canvasRect = this._canvas.getBoundingClientRect();
  }
}
