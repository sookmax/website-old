import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "@/utils/globalState";
import { isLinkedInApp } from "@/utils/edge-cases";
import { classNames } from "@/utils/class-names";
import ExpandLessIcon from "../icons/ExpandLessIcon";

type Props = {
  className?: string;
  overflowElRef: React.RefObject<HTMLElement>;
};

export default function ReadProgressBar({ className, overflowElRef }: Props) {
  const {
    state: { userAgent },
  } = useContext(GlobalContext);

  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!overflowElRef.current) return;

    const overflowElement = overflowElRef.current;

    let frameRequested = false;

    const scrollListener = () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(() => {
          const currentScrollTop = document.documentElement.scrollTop;
          // <NextImage> components seem to keep changing the height of the overflowing element..
          const maxScrollTop =
            overflowElement.clientHeight -
            document.documentElement.clientHeight;

          const progress = Math.min(
            100,
            (currentScrollTop / maxScrollTop) * 100
          );

          setProgress(progress);

          if (currentScrollTop > 50) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }

          // if (currScrollTop < 50 || progress >= 100) {
          //   setShowButton(false);
          // } else {
          //   setShowButton(true);
          // }

          frameRequested = false;
        });
      }
    };

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  }, [overflowElRef]);

  const handleBackToTop = useCallback(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const remainingProgress = Math.max(0, 100 - progress);

  return (
    <>
      {!isLinkedInApp(userAgent) && (
        <div
          id="read-progress-bar"
          className={classNames(
            "flex h-1 w-full justify-end bg-gradient-to-r",
            "from-yellow-400 via-emerald-400 to-teal-400",
            "dark:from-yellow-500 dark:via-emerald-400 dark:to-teal-500",
            className
          )}
        >
          <div
            className="h-1 bg-gray-100 dark:bg-gray-600"
            style={{ width: `${remainingProgress}%` }}
          ></div>
        </div>
      )}
      {showButton && (
        <button
          className={classNames(
            "fixed bottom-8 right-8 h-12 w-12 rounded-full",
            "flex items-center justify-center",
            "opacity-40",
            "z-10",
            "bg-gray-400 text-white",
            "text-black dark:bg-gray-300"
          )}
          onClick={handleBackToTop}
        >
          <span className="flex h-7 w-7 opacity-100">
            <ExpandLessIcon />
          </span>
        </button>
      )}
    </>
  );
}
