import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useEffect, useRef } from "react";

export default function ChartExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: Chart | undefined;
    if (canvasRef.current) {
      Chart.register(
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        CategoryScale
      );
      chart = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    return () => chart?.destroy();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
