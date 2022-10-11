import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/utils/globalState";
import { isLinkedInApp } from "@/utils/edge-cases";
import { classNames } from "@/utils/class-names";
import ExpandLessIcon from "../icons/ExpandLessIcon";

type Props = {
  mainEl: React.RefObject<HTMLElement>;
};

export default function ReadProgressBar({ mainEl }: Props) {
  const {
    state: { userAgent },
  } = useContext(GlobalContext);

  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!mainEl.current) return;

    let frameRequested = false;

    const maxScrollTop = getMaxScrollTop(mainEl.current);

    const scrollListener = () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(() => {
          const currScrollTop = getScrollTop();

          const progress = (currScrollTop / maxScrollTop) * 100;

          setProgress(progress);

          if (currScrollTop < 50 || progress >= 100) {
            setShowButton(false);
          } else {
            setShowButton(true);
          }

          frameRequested = false;
        });
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, [mainEl]);

  const remainingProgress = Math.max(0, 100 - progress);

  return (
    <>
      {!isLinkedInApp(userAgent) && (
        <div
          id="read-progress-bar"
          className={classNames(
            "sticky left-0 top-0 z-10 flex h-1 w-full justify-end bg-gradient-to-r",
            "from-indigo-400 via-purple-400 to-pink-400",
            "dark:from-indigo-500 dark:via-purple-400 dark:to-pink-500"
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
            "opacity-50",
            "bg-gray-400 text-white",
            "text-gray-700 dark:bg-gray-300"
          )}
          onClick={handleBackToTop}
        >
          <span className="flex h-7 w-7">
            <ExpandLessIcon />
          </span>
        </button>
      )}
    </>
  );
}

function handleBackToTop() {
  document.documentElement.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}

function getMaxScrollTop(el: HTMLElement) {
  const htmlEl = document.documentElement;

  const { top, height } = el.getBoundingClientRect();
  const alreadyExposed = htmlEl.clientHeight - top;

  let maxScrollTop: number | undefined;

  if (alreadyExposed > 0) {
    maxScrollTop = height - (htmlEl.clientHeight - top);
  } else {
    maxScrollTop = top + height - htmlEl.clientHeight;
  }

  return maxScrollTop;
}
