import { classNames } from "@/utils/class-names";
import GithubIcon from "../icons/GithubIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Tooltip from "@/components/tooltip";
import CopyIcon from "../icons/CopyIcon";
import { useState } from "react";
import CheckIcon from "../icons/CheckIcon";
import ErrorIcon from "../icons/ErrorIcon";

const EMAIL_ADDR = "sukkyu.chung@gmail.com";

type CopyState = "idle" | "sucessful" | "failed";

export default function Footer() {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const onCopyClick = async () => {
    if (copyState === "failed") return;

    try {
      await window.navigator.clipboard.writeText(EMAIL_ADDR);
      setCopyState("sucessful");
    } catch (e) {
      console.error(e);
      setCopyState("failed");
    } finally {
      setTimeout(() => {
        setCopyState("idle");
      }, 1000);
    }
  };

  return (
    <footer
      className={classNames(
        "h-[var(--footer-height-m)]",
        "mb-4",
        "flex flex-shrink-0 flex-col justify-end text-xs",
        "sm:h-[var(--footer-height)] sm:space-y-0 sm:text-sm"
      )}
    >
      <span className="flex items-center justify-between">
        <span
          id="social-icons"
          className={classNames(
            "flex items-center space-x-2",
            "text-gray-500 dark:text-gray-300"
          )}
        >
          <a
            className="h-6 w-6"
            href="https://github.com/sookmax"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            className="h-6 w-6"
            href="https://www.linkedin.com/in/sukkyu-sook-chung/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <Tooltip className="flex items-center justify-center" direction="top">
            <span
              className={classNames(
                "flex items-center space-x-1 py-2 px-2",
                copyState === "sucessful" && "text-emerald-200",
                copyState === "failed" && "text-red-700"
              )}
              onClick={onCopyClick}
            >
              <span>{EMAIL_ADDR}</span>
              <button>
                <span className="flex h-4 w-4">{getCopyIcon(copyState)}</span>
              </button>
            </span>
            <span className="flex h-7 w-7">
              <EnvelopeIcon />
            </span>
          </Tooltip>
        </span>
        <span className="text-gray-400 dark:text-gray-300">
          Sukkyu Chung © 2022
        </span>
      </span>
    </footer>
  );
}

function getCopyIcon(state: CopyState) {
  switch (state) {
    case "idle":
      return <CopyIcon />;
    case "sucessful":
      return <CheckIcon />;
    case "failed":
      return <ErrorIcon />;
  }
}
