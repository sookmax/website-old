import { classNames } from "@/utils/class-names";
import { useState, useEffect } from "react";

type Props = {
  userAgent: string;
};

export default function ReadProgressBar({ userAgent }: Props) {
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
      className={classNames(
        "fixed left-0 z-10 h-1 w-screen bg-gray-200 dark:bg-gray-700",
        isLinkedInApp(userAgent) ? "bottom-0" : "top-0"
      )}
    >
      <div className="h-1 bg-sky-600" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function isLinkedInApp(userAgent: string) {
  return /LinkedInApp/.test(userAgent);
}
