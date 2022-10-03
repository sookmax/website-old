import React, { useState, useEffect } from "react";
import { classNames } from "@/utils/class-names";

type Props = {
  stickyTop: boolean;
};

export default function ReadProgressBar({ stickyTop }: Props) {
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
      className={classNames(
        "sticky left-0 z-10 h-1 w-full bg-gray-200 dark:bg-gray-700",
        stickyTop ? "top-0" : "bottom-0"
      )}
      style={{ position: "-webkit-sticky" }}
    >
      <div className="h-1 bg-sky-600" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
