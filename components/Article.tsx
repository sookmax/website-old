import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  children: React.ReactNode;
};

export default function Article({ title, date, children }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <p>{date}</p>
      <article className="prose">{children}</article>
      <Link href={"/posts"}>
        <a>Back to List</a>
      </Link>
    </>
  );
}
