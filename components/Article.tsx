import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { getDateString } from "@/utils/date";
import Tooltip from "./Tooltip";
import { GlobalContext } from "@/pages/_app";
import { classNames } from "@/utils/class-names";

type Props = {
  title: string;
  dateEpoch: number;
  lastModifiedEpoch: number;
  readTime: number;
  wordsCount: number;
  wordsPerMinute: number;
  children: React.ReactNode;
};

export default function Article({
  title,
  dateEpoch,
  lastModifiedEpoch,
  readTime,
  wordsCount,
  wordsPerMinute,
  children,
}: Props) {
  const readTimeText =
    readTime > 0 ? `${readTime} min read` : `less than 1 min read`;

  const { screenWidth } = useContext(GlobalContext);

  return (
    <div className="space-y-12">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex flex-col items-start justify-between space-y-2">
        <h1 className="w-full text-2xl sm:text-4xl">{title}</h1>
        <p className="flex w-full flex-col justify-between text-xs text-gray-500 sm:flex-row sm:text-sm">
          <span className="flex items-center space-x-2">
            <Tooltip
              direction={screenWidth && screenWidth < 640 ? "right" : "bottom"}
            >
              <span className="flex flex-col whitespace-nowrap">
                <span>{`Total word count: ${wordsCount}`}</span>
                <span>{`Words per min: ${wordsPerMinute}`}</span>
              </span>
              <span className="flex items-center space-x-1 underline decoration-dotted">
                <span>{readTimeText}</span>
              </span>
            </Tooltip>
            <span>·</span>
            <span>{getDateString(dateEpoch)}</span>
          </span>
          <span className="space-x-1">
            <span>Last modified:</span>
            <span>{getDateString(lastModifiedEpoch)}</span>
          </span>
        </p>
      </header>
      <article className="prose dark:prose-invert">{children}</article>
      <Link href={"/posts"}>
        <a className="block ">
          <span className="flex items-center space-x-1">
            <span
              className={classNames(
                "h-5 w-5 text-purple-500 dark:text-purple-400"
              )}
            >
              <ArrowLeftCircleIcon />
            </span>
            <span
              className={classNames(
                "bg-gradient-to-r bg-clip-text text-transparent",
                "from-indigo-500 via-purple-500 to-pink-500",
                "dark:from-indigo-400 dark:via-purple-400 dark:to-pink-500"
              )}
            >
              Back to list
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
}
