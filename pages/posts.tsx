import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPostMetadata } from "@/server-scripts/post";

interface PostData {
  slug: string;
  title: string;
  date: string;
}
interface Props {
  postMetaList: PostData[];
}

export default function Posts({ postMetaList }: Props) {
  return (
    <ul className="space-y-4">
      {postMetaList.map((mData) => (
        <li key={mData.slug}>
          <Link href={`/post/${mData.slug}`}>
            <a className="space-x-6">
              <span className="font-extralight text-sm">{mData.date}</span>
              <span className="font-bold">{mData.title}</span>
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
      postMetaList: getAllPostMetadata().map((mData) => ({
        slug: mData.slug,
        title: mData.title,
        date: mData.date.toLocaleDateString(),
      })),
    },
  };
};
