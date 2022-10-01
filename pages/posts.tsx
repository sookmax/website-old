import { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPostMetadata } from "@/server-scripts/post";
import { classNames } from "@/utils/class-names";

interface PostData {
  slug: string;
  title: string;
  date: string;
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
            <a className="flex w-full flex-col justify-between space-y-1 sm:flex-row sm:space-y-0">
              <span
                className={classNames(
                  "font-bold",
                  mData.slug === hoveredPost
                    ? "underline underline-offset-2"
                    : null
                )}
              >
                {mData.title}
              </span>
              <span className="text-xs font-extralight">{mData.date}</span>
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
