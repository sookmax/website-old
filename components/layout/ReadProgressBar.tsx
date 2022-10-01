import { useState, useEffect } from "react";

export default function ReadProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      setProgress(
        ((document.body.scrollTop || document.documentElement.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)) *
          100
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 h-1 w-screen bg-gray-200 dark:bg-gray-700">
      <div className="h-1 bg-sky-600" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
