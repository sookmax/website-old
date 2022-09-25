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

export default function Home({ postMetaList }: Props) {
  return (
    <>
      <div>Home</div>
      <ul>
        {postMetaList.map((mData) => (
          <li key={mData.slug}>
            <Link href={`/post/${mData.slug}`}>
              <a>{mData.title}</a>
            </Link>
            <div>{mData.date}</div>
          </li>
        ))}
      </ul>
    </>
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
