import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { classNames } from "@/utils/class-names";
import { getDateString } from "@/utils/date";
import { getAllPostMeta } from "@/server-scripts/post";
import { LayoutProps } from "@/components/layout";

type Props = {
  postMetaArray: ReturnType<typeof getAllPostMeta>;
};

export default function Posts({
  postMetaArray,
  saveScrollPosition,
}: Props & LayoutProps) {
  const [hoveredPost, setHoveredPost] = useState<string | undefined>();

  useEffect(() => {
    const unsubscribe = saveScrollPosition(Posts.name);
    return () => unsubscribe?.();
  }, [saveScrollPosition]);

  return (
    <ul
      className="space-y-10 px-4 py-10"
      onMouseLeave={() => setHoveredPost(undefined)}
    >
      {postMetaArray.map((mData) => (
        <li
          key={mData.slug}
          className={classNames(
            "border-l-[3px] pl-3",
            mData.slug === hoveredPost
              ? "border-yellow-400 dark:border-yellow-600"
              : "border-gray-200 dark:border-gray-600"
          )}
          onMouseOver={() => setHoveredPost(mData.slug)}
        >
          <Link
            href={`/post/${mData.slug}`}
            className="flex w-full flex-col items-start space-y-1 text-gray-700 dark:text-gray-200 sm:justify-between sm:space-y-0"
          >
            <span
              className={classNames(
                "font-mono text-lg font-semibold leading-4"
              )}
            >
              {mData.title}
            </span>
            {mData.description && (
              <span className="text-sm font-light text-gray-500 dark:text-gray-400">
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
