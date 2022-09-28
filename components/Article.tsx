import React from "react";
import Link from "next/link";
import ArrowLeftCircleSVG from "./icons/ArrowLeftCircleSVG";

type Props = {
  title: string;
  date: string;
  children: React.ReactNode;
};

export default function Article({ title, date, children }: Props) {
  return (
    <div className="space-y-12">
      <header className="flex flex-col justify-between items-start space-y-2">
        <h1 className="text-4xl">{title}</h1>
        <p className="text-sm text-gray-400">{date}</p>
      </header>
      <article className="prose">{children}</article>
      <Link href={"/posts"}>
        <a className="block">
          <span className="flex items-center space-x-1 text-gray-400 font-light text-sm">
            <span>
              <ArrowLeftCircleSVG />
            </span>
            <span>Back to List</span>
          </span>
        </a>
      </Link>
    </div>
  );
}
