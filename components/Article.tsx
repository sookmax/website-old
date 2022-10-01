import React from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftCircleSVG from "./icons/ArrowLeftCircleSVG";

type Props = {
  title: string;
  date: string;
  readTime: number;
  children: React.ReactNode;
};

export default function Article({ title, date, readTime, children }: Props) {
  const readTimeText =
    readTime > 0 ? `${readTime} min read` : `less than 1 min read`;

  return (
    <div className="space-y-12">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex flex-col items-start justify-between space-y-2">
        <h1 className="w-full text-2xl sm:text-4xl">{title}</h1>
        <p className="flex w-full justify-between">
          <span className="text-sm text-gray-400">{readTimeText}</span>
          <span className="text-sm text-gray-400">{date}</span>
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
