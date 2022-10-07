import React, { useRef, useState } from "react";
import ContentBox from "./ContentBox";
import { classNames } from "@/utils/class-names";

type Props = {
  direction?: "top" | "bottom" | "left" | "right";
  children: [React.ReactNode, React.ReactNode];
  className?: string;
  timeout?: number;
};

let timeoutId: NodeJS.Timeout | undefined;

export default function Tooltip({
  children,
  className,
  direction = "bottom",
  timeout = 0,
}: Props) {
  const [content, target] = children;
  const rootElRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const onClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setShow((value) => !value);

    if (!show) {
      if (timeout) {
        timeoutId = setTimeout(() => setShow(false), timeout);
      }
    }
  };

  return (
    <span
      ref={rootElRef}
      className={classNames("relative", className)}
      onClick={onClick}
    >
      {show ? (
        <ContentBox parentElRef={rootElRef} direction={direction}>
          {content}
        </ContentBox>
      ) : null}
      {target}
    </span>
  );
}
