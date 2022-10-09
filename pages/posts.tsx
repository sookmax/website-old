import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { classNames } from "@/utils/class-names";
import { getDateString } from "@/utils/date";
import { getAllPostMeta } from "@/server-scripts/post";

type PostMeta = {
  slug: string;
  title: string;
  date: number;
};

type Props = {
  postMetaArray: PostMeta[];
};

export default function Posts({ postMetaArray }: Props) {
  const [hoveredPost, setHoveredPost] = useState<string | undefined>();

  return (
    <ul className="space-y-4" onMouseLeave={() => setHoveredPost(undefined)}>
      {postMetaArray.map((mData) => (
        <li key={mData.slug} onMouseOver={() => setHoveredPost(mData.slug)}>
          <Link href={`/post/${mData.slug}`}>
            <a className="flex w-full flex-col items-start space-y-1 sm:flex-row sm:justify-between sm:space-y-0">
              <span
                className={classNames(
                  mData.slug === hoveredPost &&
                    classNames(
                      "bg-gradient-to-r bg-clip-text text-transparent",
                      "from-indigo-600 via-purple-600 to-pink-600",
                      "dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"
                    )
                )}
              >
                {mData.title}
              </span>
              <span className="text-xs font-extralight">
                {getDateString(mData.date)}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      postMetaArray: getAllPostMeta(),
    },
  };
};
