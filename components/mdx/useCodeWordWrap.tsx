// [ref] https://github.com/facebook/docusaurus/packages/docusaurus-theme-common/src/hooks/useCodeWordWrap.ts

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import ExpandIcon from "../icons/ExpandIcon";
import CompressIcon from "../icons/CompressIcon";

export type CodeWordWrap = ReturnType<typeof useCodeWordWrap>;

export default function useCodeWordWrap() {
  const [enabled, setEnabled] = useState(false);
  const [show, setShow] = useState(false);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const updateVisibility = useCallback(() => {
    if (!codeContainerRef.current) return;

    const { scrollWidth, clientWidth } = codeContainerRef.current;
    setShow(
      scrollWidth > clientWidth ||
        codeContainerRef.current.hasAttribute("style")
    );
  }, []);

  const toggle = useCallback(() => {
    if (!codeContainerRef.current) return;

    if (enabled) {
      codeContainerRef.current.removeAttribute("style");
    } else {
      codeContainerRef.current.style.whiteSpace = "pre-wrap";
      // According to Docusaurus,
      // "When code wrap is enabled, we want to avoid a scrollbar in any case"
      // "Ensure that very very long words/strings/tokens still wrap"
      codeContainerRef.current.style.overflowWrap = "anywhere";
    }

    setEnabled((value) => !value);
    updateVisibility();
  }, [enabled, updateVisibility]);

  useEffect(() => {
    updateVisibility();
    const listener = debounce(updateVisibility, 500);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [updateVisibility]);

  const icon = useMemo(
    () => (enabled ? <ExpandIcon /> : <CompressIcon />),
    [enabled]
  );

  return [codeContainerRef, show, icon, toggle] as [
    typeof codeContainerRef,
    typeof show,
    typeof icon,
    typeof toggle
  ];
}
