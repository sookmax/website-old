import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "@/utils/globalState";
import { isLinkedInApp } from "@/utils/edge-cases";
import { classNames } from "@/utils/class-names";
import ExpandLessIcon from "../icons/ExpandLessIcon";

type Props = {
  overflowContainerEl: React.RefObject<HTMLElement>;
  overflowEl: React.RefObject<HTMLElement>;
};

export default function ReadProgressBar({
  overflowContainerEl,
  overflowEl,
}: Props) {
  const {
    state: { userAgent },
  } = useContext(GlobalContext);

  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!overflowContainerEl.current || !overflowEl.current) return;

    const overflowContainer = overflowContainerEl.current;
    const overflowElement = overflowEl.current;

    let frameRequested = false;

    const scrollListener = () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(() => {
          const currentScrollTop = overflowContainer.scrollTop;
          // <NextImage> components seem to keep changing the height of the overflowing element..
          const maxScrollTop =
            overflowElement.clientHeight - overflowContainer.clientHeight;

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

    overflowContainer.addEventListener("scroll", scrollListener);

    return () =>
      overflowContainer.removeEventListener("scroll", scrollListener);
  }, [overflowContainerEl, overflowEl]);

  const handleBackToTop = useCallback(() => {
    if (overflowEl.current) {
      overflowEl.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [overflowEl]);

  const remainingProgress = Math.max(0, 100 - progress);

  return (
    <>
      {!isLinkedInApp(userAgent) && (
        <div
          id="read-progress-bar"
          className={classNames(
            "sticky left-0 top-0 z-10 flex h-1 w-full justify-end bg-gradient-to-r",
            "from-yellow-400 via-emerald-400 to-teal-400",
            "dark:from-yellow-500 dark:via-emerald-400 dark:to-teal-500"
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
