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
      if (canvas) {
        canvas2d = new Canvas2D(canvas, width, height);
        canvas2d.drawCircleGrid({
          count: 40,
          radius: 0.003,
          margin: 0.06,
          fillStyle: theme === "light" ? "white" : "#1e293b",
          strokeStyle: theme === "light" ? "#d1d5db" : "#4b5563",
          lineWidth: 2,
          random: true,
        });
      }
    }

    return () => canvas2d?.clear();
  }, [theme]);

  return (
    <div ref={rootRef} className="relative flex-grow">
      <section className="absolute top-1/3 -translate-y-1/2">
        <div className="mt-12 text-7xl font-bold text-gray-700 dark:text-gray-200">
          Hi,
          <br />
          I Am <br />
          Sook.
        </div>
        <div className="mt-4 text-gray-500 dark:text-gray-400">
          A web developer.
        </div>
      </section>
      <canvas id="canvas"></canvas>
    </div>
  );
}
