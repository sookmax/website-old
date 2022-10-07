import { classNames } from "@/utils/class-names";
import { useRef, useState, useLayoutEffect, MouseEventHandler } from "react";

type Props = {
  parentElRef: React.RefObject<HTMLElement>;
  direction: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
};

export default function ContentBox({
  parentElRef,
  direction,
  children,
  className,
}: Props) {
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

  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  switch (direction) {
    case "top":
      return (
        <span
          ref={rootElRef}
          className={classNames(
            "absolute left-1/2 bottom-full flex -translate-y-2 -translate-x-1/2 rounded-lg bg-gray-400 text-xs text-white",
            className
          )}
          style={inlineStyle}
          onClick={onClick}
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
          className={classNames(
            "absolute left-1/2 top-full flex translate-y-2 -translate-x-1/2 rounded-lg bg-gray-400 text-xs text-white",
            className
          )}
          onClick={onClick}
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
          className={classNames(
            "absolute right-[120%] flex rounded-lg bg-gray-400 text-xs text-white",
            className
          )}
          onClick={onClick}
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
          className={classNames(
            "absolute left-[120%] flex rounded-lg bg-gray-400 text-xs text-white",
            className
          )}
          onClick={onClick}
        >
          <span className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-400" />
          {children}
        </span>
      );
  }
}
