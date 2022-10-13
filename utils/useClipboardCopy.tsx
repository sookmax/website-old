import CheckIcon from "@/components/icons/CheckIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { useState } from "react";

type CopyState = "idle" | "sucessful" | "failed";

export type ClipboardCopy = ReturnType<typeof useClipboardCopy>;

export default function useClipboardCopy() {
  const [state, setState] = useState<CopyState>("idle");

  const onClick = async (text: string, callback?: () => void) => {
    if (state !== "idle") return;

    try {
      await window.navigator.clipboard.writeText(text);
      setState("sucessful");
    } catch (e) {
      console.error(e);
      setState("failed");
    } finally {
      setTimeout(() => {
        setState("idle");
        callback?.();
      }, 1000);
    }
  };

  return [state, getCopyIcon(state), onClick] as [
    CopyState,
    ReturnType<typeof getCopyIcon>,
    typeof onClick
  ];
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
