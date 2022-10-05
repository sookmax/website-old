import React, { useState, useEffect } from "react";

export default function ReadProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let requested = false;
    const scrollListener = () => {
      if (!requested) {
        requested = true;
        requestAnimationFrame(() => {
          setProgress(
            ((document.body.scrollTop || document.documentElement.scrollTop) /
              (document.documentElement.scrollHeight -
                document.documentElement.clientHeight)) *
              100
          );
          requested = false;
        });
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div
      id="read-progress-bar"
      className="sticky left-0 top-0 z-10 h-1 w-full bg-gray-200 dark:bg-gray-700"
      style={{ position: "-webkit-sticky" }}
    >
      <div
        className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
