import { classNames } from "@/utils/class-names";
import { CodeWordWrap } from "./useCodeWordWrap";
import { ClipboardCopy } from "@/utils/useClipboardCopy";

type Props = {
  showWordWrap: CodeWordWrap[1];
  wordWrapIcon: CodeWordWrap[2];
  toggleWordWrap: CodeWordWrap[3];
  copyState: ClipboardCopy[0];
  copyIcon: ClipboardCopy[1];
  handleCopy: () => void;
  centerVertical?: boolean;
};

export default function CodeButtonGroup({
  showWordWrap,
  toggleWordWrap,
  wordWrapIcon,
  copyState,
  copyIcon,
  handleCopy,
  centerVertical = false,
}: Props) {
  return (
    <div
      className={classNames(
        "absolute right-0 flex items-center space-x-1",
        centerVertical ? "top-1/2 -translate-y-1/2" : "top-0",
        "p-2 text-gray-400",
        "[&_button]:opacity-0 [&_button:hover]:!opacity-100",
        "[&_button]:transition-opacity [&_button]:duration-300 [&_button]:ease-in-out",
        "[&_button]:h-6 [&_button]:w-6"
      )}
    >
      {showWordWrap && (
        <button className="rotate-90" onClick={toggleWordWrap}>
          {wordWrapIcon}
        </button>
      )}
      <button
        className={classNames(
          "copy-button",
          copyState === "idle" && "mb-1",
          copyState === "sucessful" && "text-emerald-600 dark:text-emerald-400",
          copyState === "failed" && "text-rose-600 dark:text-rose-400"
        )}
        onClick={handleCopy}
      >
        {copyIcon}
      </button>
    </div>
  );
}
