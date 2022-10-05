import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPostMetadata } from "@/server-scripts/post";
import { classNames } from "@/utils/class-names";
import { getDateString } from "@/utils/date";

interface PostData {
  slug: string;
  title: string;
  date: number;
}
interface Props {
  postMetaList: PostData[];
}

export default function Posts({ postMetaList }: Props) {
  const [hoveredPost, setHoveredPost] = useState<string | undefined>();

  return (
    <ul className="space-y-4" onMouseLeave={() => setHoveredPost(undefined)}>
      {postMetaList.map((mData) => (
        <li key={mData.slug} onMouseOver={() => setHoveredPost(mData.slug)}>
          <Link href={`/post/${mData.slug}`}>
            <a className="flex w-full flex-col items-start space-y-1 sm:flex-row sm:justify-between sm:space-y-0">
              <span
                className={classNames(
                  mData.slug === hoveredPost
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    : null
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
      postMetaList: getAllPostMetadata(),
    },
  };
};
