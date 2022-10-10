import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getAllSlugs, getPostData } from "@/server-scripts/post";
import Article from "@/components/Article";
import Atag from "@/components/Atag";

type Props = {
  title: string;
  date: number;
  lastModified: number | null;
  readTime: number;
  wordsCount: number;
  wordsPerMinute: number;
  mdxSource: MDXRemoteSerializeResult;
};

type Query = {
  slug: string;
};

// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote#conditional-custom-components
const components = {
  a: Atag,
};

export default function Post({ mdxSource, ...articleProps }: Props) {
  return (
    <Article {...articleProps}>
      <MDXRemote {...mdxSource} components={components} />
    </Article>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
}) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const { readTime, wordsCount, wordsPerMinute, matter } = getPostData(
    params.slug
  );

  const mdxSource = await serialize(matter.content);

  return {
    props: {
      title: matter.data.title as string,
      date: Number(matter.data.date),
      lastModified: matter.data.lastModified
        ? Number(matter.data.lastModified)
        : null,
      readTime,
      wordsCount,
      wordsPerMinute,
      mdxSource,
    },
  };
};
