import React, { useState, useEffect, useContext } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { GlobalContext } from "@/pages/_app";
import { isLinkedInApp } from "@/utils/edge-cases";

type Props = {
  mainEl: React.RefObject<HTMLElement>;
};

export default function ReadProgressBar({ mainEl }: Props) {
  const { userAgent } = useContext(GlobalContext);

  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!mainEl.current) return;

    let frameRequested = false;
    let prevScrollTop = getScrollTop();
    let timeoutId: NodeJS.Timeout | undefined;

    const maxScrollTop = getMaxScrollTop(mainEl.current);

    const scrollListener = () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(() => {
          const currScrollTop = getScrollTop();

          const progress = (currScrollTop / maxScrollTop) * 100;

          setProgress(progress);

          if (progress < 100) {
            if (currScrollTop < prevScrollTop) {
              if (currScrollTop < 50) {
                setShowButton(false);
              } else {
                setShowButton(true);
                clearTimeout(timeoutId);
                timeoutId = undefined;
              }
            } else {
              if (!timeoutId) {
                timeoutId = setTimeout(() => {
                  setShowButton(false);
                  timeoutId = undefined;
                }, 1000);
              }
            }
            prevScrollTop = currScrollTop;
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
          className="sticky left-0 top-0 z-10 flex h-1 w-full justify-end bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <div
            className="h-1 bg-gray-300 dark:bg-gray-600"
            style={{ width: `${remainingProgress}%` }}
          ></div>
        </div>
      )}
      {showButton && (
        <button
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-black p-2 text-white"
          onClick={handleBackToTop}
        >
          <ChevronUpIcon />
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
