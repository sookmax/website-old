import React, { useContext } from "react";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getDateString } from "@/utils/date";
import Tooltip from "@/components/tooltip";
import { GlobalContext } from "@/utils/globalState";
import { classNames } from "@/utils/class-names";
import { PostData } from "@/server-scripts/post";

interface Props extends Omit<PostData, "content"> {
  children: React.ReactNode;
}

const Article = React.forwardRef<HTMLDivElement, Props>(function Article(
  {
    title,
    description,
    date,
    lastModified,
    readTime,
    wordsCount,
    wordsPerMinute,
    children,
  },
  ref
) {
  const readTimeText =
    readTime > 0 ? `${readTime} min read` : `less than 1 min read`;

  const {
    state: { screenWidth },
  } = useContext(GlobalContext);

  return (
    <div ref={ref} className="px-4 py-10">
      <header className="flex flex-col items-start justify-between space-y-2">
        <h1 className="w-full font-mono text-3xl font-semibold sm:text-4xl">
          {title}
        </h1>
        <div className="w-full italic text-gray-400">{description}</div>
        <div className="flex w-full flex-row justify-between text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <span className="flex items-center space-x-2">
            <Tooltip
              direction={screenWidth && screenWidth < 640 ? "right" : "bottom"}
            >
              <span className="flex flex-col whitespace-nowrap px-2 py-1">
                <span>{`Total word count: ${wordsCount}`}</span>
                <span>{`Words per min: ${wordsPerMinute}`}</span>
              </span>
              <span className="flex items-center space-x-1 underline decoration-dotted">
                <span>{readTimeText}</span>
              </span>
            </Tooltip>
            <span>·</span>
            <span>{getDateString(date)}</span>
          </span>
          {lastModified && (
            <span className="space-x-1">
              <span>Modified:</span>
              <span>{getDateString(lastModified)}</span>
            </span>
          )}
        </div>
      </header>
      <article className="prose relative mt-10 dark:prose-invert">
        {children}
      </article>
      <Link
        href={"/posts"}
        className="mt-8 inline-flex items-center space-x-1 pt-4 text-gray-500 dark:text-gray-300"
      >
        <span className={classNames("h-5 w-5")}>
          <ArrowLeftCircleIcon />
        </span>
        <span>Back to list</span>
      </Link>
    </div>
  );
});

export default Article;
