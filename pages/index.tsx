import React, { useEffect, useRef } from "react";
import CarnivalNightConfetti from "@/creative/canvasConfetti/CarnivalNightConfetti";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<CarnivalNightConfetti>();

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      confettiRef.current = new CarnivalNightConfetti(canvasRef.current, {
        animFadeOutStart: 1.2,
        particleSize: 0.04,
        particleCount: 30,
        velocityFactor: 8,
        gravity: 20,
        autoInterval: 500,
      });
      confettiRef.current.start();
    }

    return () => {
      confettiRef.current?.dispose();
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    confettiRef.current?.onManualClick(e.clientX, e.clientY);
  };

  return (
    <div
      className="relative flex flex-grow cursor-crosshair flex-col"
      onPointerDown={onPointerDown}
    >
      <canvas ref={canvasRef} className="flex-grow"></canvas>
      <section
        id="main-text"
        className="absolute top-1/2 left-0 -translate-y-1/2 select-none p-3"
      >
        <div className="font-['Oswald'] text-7xl font-extrabold text-gray-700 dark:text-teal-50 sm:text-8xl">
          Hi,
          <br />
          I Am <br />
          Sook.
        </div>
        <div className="mt-2 px-2 text-end font-['Raleway'] text-sm text-gray-400 sm:text-base">
          - A web developer
        </div>
      </section>
    </div>
  );
}
