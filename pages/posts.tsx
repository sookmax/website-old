import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { classNames } from "@/utils/class-names";
import { getDateString } from "@/utils/date";
import { getAllPostMeta } from "@/server-scripts/post";

type Props = {
  postMetaArray: ReturnType<typeof getAllPostMeta>;
};

export default function Posts({ postMetaArray }: Props) {
  const [hoveredPost, setHoveredPost] = useState<string | undefined>();

  return (
    <ul className="space-y-5" onMouseLeave={() => setHoveredPost(undefined)}>
      {postMetaArray.map((mData) => (
        <li key={mData.slug} onMouseOver={() => setHoveredPost(mData.slug)}>
          <Link
            href={`/post/${mData.slug}`}
            className="flex w-full flex-col items-start space-y-1 text-gray-700 dark:text-gray-200 sm:justify-between sm:space-y-0"
          >
            <span
              className={classNames(
                "font-mono text-lg font-semibold",
                mData.slug === hoveredPost &&
                  classNames(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    "from-yellow-500 via-emerald-500 to-teal-500",
                    "dark:from-yellow-400 dark:via-emerald-400 dark:to-teal-400"
                  )
              )}
            >
              {mData.title}
            </span>
            {mData.description && (
              <span className="font-light text-gray-500 dark:text-gray-400">
                {mData.description}
              </span>
            )}
            <span className="text-xs font-extralight">
              {getDateString(mData.date)}
            </span>
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
