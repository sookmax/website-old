import { useContext, useEffect, useRef } from "react";
import Canvas2D from "@/utils/canvas2d";
import { GlobalContext } from "@/utils/globalState";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    state: { theme },
  } = useContext(GlobalContext);

  useEffect(() => {
    let canvas2d: Canvas2D | undefined;
    if (rootRef.current) {
      const width = rootRef.current.clientWidth;
      const height = rootRef.current.clientHeight;
      const canvas =
        rootRef.current.querySelector<HTMLCanvasElement>("#canvas");
      const mainText =
        rootRef.current.querySelector<HTMLDivElement>("#main-text");
      if (canvas && mainText && theme) {
        const {
          top: textTop,
          bottom: textBottom,
          right: textRight,
          left: textLeft,
        } = mainText.getBoundingClientRect();

        const { top: canvasTop, left: canvasLeft } =
          canvas.getBoundingClientRect();

        const yMin = (textTop - canvasTop) * window.devicePixelRatio;
        const yMax = (textBottom - canvasTop) * window.devicePixelRatio;

        const xMin = (textLeft - canvasLeft) * window.devicePixelRatio;
        const xMax = (textRight - canvasLeft) * window.devicePixelRatio;

        const drawFilter = (x: number, y: number) => {
          if (xMin <= x && x <= xMax && y >= yMin && y <= yMax) {
            return false;
          }
          return true;
        };

        canvas2d = new Canvas2D(canvas, width, height);
        canvas2d.drawCircleGrid({
          count: 15,
          radius: 0.006,
          margin: 0.05,
          theme,
          random: true,
          drawFilter,
        });
      }
    }

    return () => canvas2d?.clear();
  }, [theme]);

  return (
    <div ref={rootRef} className="relative flex-grow">
      <canvas id="canvas"></canvas>
      <section
        id="main-text"
        className="absolute top-1/2 left-0 -translate-y-1/2 p-3"
      >
        <div className="text-7xl font-extrabold text-gray-700 dark:text-teal-50 sm:text-8xl">
          Hi,
          <br />
          I Am <br />
          Sook.
        </div>
        <div className="px-2 text-end text-sm text-gray-400 sm:text-base">
          - A web dev
        </div>
      </section>
    </div>
  );
}
