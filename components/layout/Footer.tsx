import { classNames } from "@/utils/class-names";
import GithubIcon from "../icons/GithubIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import Tooltip from "@/components/tooltip";
import MailIcon from "../icons/MailIcon";
import useClipboardCopy from "@/utils/useClipboardCopy";

const EMAIL_ADDR = "sukkyu.chung@gmail.com";

export default function Footer() {
  const [copyState, copyIcon, onCopyClick] = useClipboardCopy();

  return (
    <footer
      className={classNames(
        "h-[var(--footer-height-m)]",
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
                copyState === "sucessful" &&
                  "text-emerald-600 dark:text-emerald-400",
                copyState === "failed" && "text-red-600 dark:text-red-400"
              )}
              onClick={() => onCopyClick(EMAIL_ADDR)}
            >
              <span>{EMAIL_ADDR}</span>
              <button>
                <span className="flex h-4 w-4">{copyIcon}</span>
              </button>
            </span>
            <span className="flex h-7 w-7">
              <MailIcon />
            </span>
          </Tooltip>
        </span>
        <span className="font-['Raleway'] text-gray-400 dark:text-gray-300">
          Sukkyu Chung © 2022
        </span>
      </span>
    </footer>
  );
}
