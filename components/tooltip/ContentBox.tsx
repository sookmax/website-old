import { classNames } from "@/utils/class-names";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  MouseEventHandler,
} from "react";

type Props = {
  parentElRef: React.RefObject<HTMLElement>;
  direction: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
};

const ContentBox = React.forwardRef<HTMLElement, Props>(function ContentBox(
  { parentElRef, direction, children, className },
  ref
) {
  const [inlineStyle, setInlineStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (typeof ref === "object" && ref?.current && parentElRef.current) {
      if (
        ["left", "right"].includes(direction) &&
        parentElRef.current.clientHeight &&
        ref.current.clientHeight &&
        parentElRef.current.clientHeight < ref.current.clientHeight
      ) {
        const offset =
          ref.current.clientHeight / 2 - parentElRef.current.clientHeight / 2;
        setInlineStyle({
          top: 0,
          transform: `translateY(-${offset}px)`,
        });
      }
    }
  }, [parentElRef, ref, direction]);

  // const onClick: MouseEventHandler = (e) => {
  //   e.stopPropagation();
  // };

  switch (direction) {
    case "top":
      return (
        <span
          ref={ref}
          className={classNames(
            "absolute left-1/2 bottom-full flex -translate-y-2 -translate-x-1/2 rounded-lg",
            "text-xs",
            "bg-gray-200",
            "dark:bg-gray-600 dark:text-white",
            className
          )}
          style={inlineStyle}
          // onClick={onClick}
        >
          <span
            className={classNames(
              "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent",
              "border-t-gray-200 dark:border-t-gray-600"
            )}
          />
          {children}
        </span>
      );
    case "bottom":
      return (
        <span
          ref={ref}
          style={inlineStyle}
          className={classNames(
            "absolute left-1/2 top-full flex translate-y-2 -translate-x-1/2 rounded-lg",
            "bg-gray-200",
            "dark:bg-gray-600 dark:text-white",
            className
          )}
          // onClick={onClick}
        >
          <span
            className={classNames(
              "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent",
              "border-b-gray-200 dark:border-b-gray-600"
            )}
          />
          {children}
        </span>
      );
    case "left":
      return (
        <span
          ref={ref}
          style={inlineStyle}
          className={classNames(
            "absolute right-[120%] flex rounded-lg",
            "text-xs",
            "bg-gray-200",
            "dark:bg-gray-600 dark:text-white",
            className
          )}
          // onClick={onClick}
        >
          <span
            className={classNames(
              "absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent",
              "border-l-gray-200 dark:border-l-gray-600"
            )}
          />
          {children}
        </span>
      );
    case "right":
      return (
        <span
          ref={ref}
          style={inlineStyle}
          className={classNames(
            "absolute left-[120%] flex rounded-lg",
            "text-xs",
            "bg-gray-200",
            "dark:bg-gray-600 dark:text-white",
            className
          )}
          // onClick={onClick}
        >
          <span
            className={classNames(
              "absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent",
              "border-r-gray-200 dark:border-r-gray-600"
            )}
          />
          {children}
        </span>
      );
  }
});

export default ContentBox;
