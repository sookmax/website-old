import { lerp } from "canvas-sketch-util/math";

const colors = {
  light: {
    fill: {
      default: "#d1d5db",
      palette: ["#2dd4bf", "#34d399", "#facc15"],
    },

    background: "white",
  },
  dark: {
    fill: {
      default: "#4b5563",
      palette: ["#2dd4bf", "#34d399", "#facc15"],
    },
    background: "#1e293b",
  },
};

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
    margin,
    theme,
    random = false,
    drawFilter = () => true,
  }: {
    count: number;
    radius: number;
    margin: number;
    theme: "light" | "dark";
    random?: boolean;
    drawFilter?: (x: number, y: number) => boolean;
  }) {
    const points = random
      ? this._createGrid(count).filter(() => Math.random() > 0.5)
      : this._createGrid(count);
    margin = this._width * margin;

    const context = this._getContext();
    context.fillStyle = colors[theme].background;
    context.fillRect(0, 0, this._width, this._height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, this._width - margin, u);
      const y = lerp(margin, this._height - margin, v);

      if (drawFilter(x, y)) {
        context.beginPath();
        context.arc(x, y, this._width * radius, 0, Math.PI * 2, false);

        if (random) {
          context.fillStyle =
            Math.random() > 0.9
              ? colors[theme].fill.palette[0]
              : Math.random() > 0.9
              ? colors[theme].fill.palette[1]
              : Math.random() > 0.9
              ? colors[theme].fill.palette[2]
              : colors[theme].fill.default;
        } else {
          context.fillStyle = colors[theme].fill.default;
        }

        context.fill();
      }
    });
  }

  public drawCircleGridStroke() {}

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
