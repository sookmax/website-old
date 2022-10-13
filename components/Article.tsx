import React, { useContext } from "react";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getDateString } from "@/utils/date";
import Tooltip from "@/components/tooltip";
import { GlobalContext } from "@/utils/globalState";
import { classNames } from "@/utils/class-names";

type Props = {
  title: string;
  date: number;
  lastModified: number | null;
  readTime: number;
  wordsCount: number;
  wordsPerMinute: number;
  children: React.ReactNode;
};

const Article = React.forwardRef<HTMLDivElement, Props>(function Article(
  { title, date, lastModified, readTime, wordsCount, wordsPerMinute, children },
  ref
) {
  const readTimeText =
    readTime > 0 ? `${readTime} min read` : `less than 1 min read`;

  const {
    state: { screenWidth },
  } = useContext(GlobalContext);

  return (
    <div ref={ref} className="space-y-12">
      <header className="flex flex-col items-start justify-between space-y-2">
        <h1 className="w-full text-2xl sm:text-4xl">{title}</h1>
        <p className="flex w-full flex-col justify-between text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:text-sm">
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
              <span>Last modified:</span>
              <span>{getDateString(lastModified)}</span>
            </span>
          )}
        </p>
      </header>
      <article className="prose dark:prose-invert">{children}</article>
      <Link href={"/posts"}>
        <a className="inline-flex items-center space-x-1 text-gray-500 dark:text-gray-300">
          <span className={classNames("h-5 w-5")}>
            <ArrowLeftCircleIcon />
          </span>
          <span>Back to list</span>
        </a>
      </Link>
    </div>
  );
});

export default Article;
