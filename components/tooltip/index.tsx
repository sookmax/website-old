import React, { useEffect, useRef, useState } from "react";
import ContentBox from "./ContentBox";
import { classNames } from "@/utils/class-names";

type Props = {
  direction?: "top" | "bottom" | "left" | "right";
  children: [React.ReactNode, React.ReactNode];
  className?: string;
};

export default function Tooltip({
  children,
  className,
  direction = "bottom",
}: Props) {
  const [content, target] = children;

  const rootEl = useRef<HTMLElement>(null);
  const contentBoxEl = useRef<HTMLElement>(null);

  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow((value) => !value);
  };

  useEffect(() => {
    // inspired by https://github.com/mui/material-ui/tree/master/packages/mui-base/src/ClickAwayListener
    const handleClickAway = (e: MouseEvent | TouchEvent) => {
      if (rootEl.current && contentBoxEl.current) {
        if (
          e.composedPath().indexOf(rootEl.current) === -1 &&
          e.composedPath().indexOf(contentBoxEl.current) === -1
        ) {
          setShow(false);
        }
      }
    };

    document.addEventListener("click", handleClickAway);
    document.addEventListener("touchend", handleClickAway);

    return () => {
      document.removeEventListener("click", handleClickAway);
      document.removeEventListener("touchend", handleClickAway);
    };
  }, []);

  return (
    <span ref={rootEl} className={classNames("relative", className)}>
      {show ? (
        <ContentBox
          parentElRef={rootEl}
          ref={contentBoxEl}
          direction={direction}
        >
          {content}
        </ContentBox>
      ) : null}
      <span className="cursor-pointer" onClick={onClick}>
        {target}
      </span>
    </span>
  );
}
