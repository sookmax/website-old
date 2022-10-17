import { lerp } from "canvas-sketch-util/math";

export default class Canvas2D {
  private _canvas: HTMLCanvasElement;
  private _width: number;
  private _height: number;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this._canvas = canvas;
    this._width = width * window.devicePixelRatio;
    this._height = height * window.devicePixelRatio;
  }

  public clear() {
    this._getContext().clearRect(0, 0, this._width, this._height);
  }

  public drawCircleGrid({
    count,
    radius,
    lineWidth,
    margin,
    fillStyle,
    strokeStyle,
  }: {
    count: number;
    radius: number;
    lineWidth: number;
    margin: number;
    fillStyle: string;
    strokeStyle: string;
  }) {
    const points = this._createGrid(count);
    margin = this._width * margin;

    const context = this._getContext();
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, this._width, this._height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, this._width - margin, u);
      const y = lerp(margin, this._height - margin, v);

      context.beginPath();
      context.arc(x, y, this._width * radius, 0, Math.PI * 2, false);
      context.strokeStyle = strokeStyle;
      context.lineWidth = lineWidth;
      context.stroke();
    });
  }

  private _getContext() {
    const context = this._canvas.getContext("2d");
    if (!context) throw "no canvas 2d context was found.";
    return context;
  }

  private _createGrid(count: number) {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  }
}
