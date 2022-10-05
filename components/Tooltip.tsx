import React, { useLayoutEffect, useRef, useState } from "react";

type Props = {
  direction?: "top" | "bottom" | "left" | "right";
  children: [React.ReactNode, React.ReactNode];
};

let timeoutId: NodeJS.Timeout | undefined;

export default function Tooltip({ children, direction = "bottom" }: Props) {
  const [content, target] = children;
  const rootElRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  const onClick = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setShow((value) => !value);

    if (!show) {
      timeoutId = setTimeout(() => setShow(false), 2000);
    }
  };

  return (
    <span ref={rootElRef} className="relative cursor-pointer" onClick={onClick}>
      {show ? (
        <TooltipContent parentElRef={rootElRef} direction={direction}>
          {content}
        </TooltipContent>
      ) : null}
      <span>{target}</span>
    </span>
  );
}

type Props2 = {
  parentElRef: React.RefObject<HTMLElement>;
  direction: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
};
function TooltipContent({ parentElRef, direction, children }: Props2) {
  const rootElRef = useRef<HTMLElement>(null);
  const [inlineStyle, setInlineStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (
      ["left", "right"].includes(direction) &&
      parentElRef.current?.clientHeight &&
      rootElRef.current?.clientHeight &&
      parentElRef.current.clientHeight < rootElRef.current.clientHeight
    ) {
      const offset =
        rootElRef.current.clientHeight / 2 -
        parentElRef.current.clientHeight / 2;
      setInlineStyle({
        top: 0,
        transform: `translateY(-${offset}px)`,
      });
    }
  }, [parentElRef, direction]);

  switch (direction) {
    case "top":
      return (
        <span
          ref={rootElRef}
          className="absolute left-1/2 bottom-full -translate-y-2  -translate-x-1/2 rounded-lg bg-gray-400 px-3 py-1 text-xs text-white"
          style={inlineStyle}
        >
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-400" />
          {children}
        </span>
      );
    case "bottom":
      return (
        <span
          ref={rootElRef}
          style={inlineStyle}
          className="absolute left-1/2 top-full inline-block translate-y-2  -translate-x-1/2 rounded-lg bg-gray-400 px-3 py-1 text-xs text-white"
        >
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-400" />
          {children}
        </span>
      );
    case "left":
      return (
        <span
          ref={rootElRef}
          style={inlineStyle}
          className="absolute right-[110%] rounded-lg bg-gray-400 px-3 py-1 text-xs text-white"
        >
          <span className="absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-gray-400" />
          {children}
        </span>
      );
    case "right":
      return (
        <span
          ref={rootElRef}
          style={inlineStyle}
          className="absolute left-[110%] rounded-lg bg-gray-400 px-3 py-1 text-xs text-white"
        >
          <span className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-400" />
          {children}
        </span>
      );
  }
}
