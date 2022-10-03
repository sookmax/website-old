import React from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftCircleSVG from "./icons/ArrowLeftCircleSVG";
import { getDateString } from "@/utils/date";
import InformationCircleSVG from "./icons/InformationCircleSVG";

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

  return (
    <div className="space-y-12">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex flex-col items-start justify-between space-y-2">
        <h1 className="w-full text-2xl sm:text-4xl">{title}</h1>
        <p className="flex w-full flex-col justify-between text-xs text-gray-400 sm:flex-row sm:text-sm">
          <span className="flex items-center space-x-1">
            <span>{readTimeText}</span>
            <span title={`${wordsCount} / ${wordsPerMinute}`}>
              <InformationCircleSVG />
            </span>
            <span>·</span>
            <span>{getDateString(dateEpoch)}</span>
          </span>
          <span>Last modified: {getDateString(lastModifiedEpoch)}</span>
        </p>
      </header>
      <article className="prose">{children}</article>
      <Link href={"/posts"}>
        <a className="block">
          <span className="flex items-center space-x-1 text-sm font-light text-gray-400">
            <span>
              <ArrowLeftCircleSVG />
            </span>
            <span>Back to list</span>
          </span>
        </a>
      </Link>
    </div>
  );
}
