import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs, getPostData, type PostData } from "@/server-scripts/post";
import Article from "@/components/Article";

interface Props extends Omit<PostData, "content"> {
  mdxSource: MDXRemoteSerializeResult;
}

type Query = {
  slug: string;
};

// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote#conditional-custom-components
const components = {
  ChartExample: dynamic(
    () => import("@/components/mdx/infrequent/ChartExample")
  ),
};

export default function Post({ mdxSource, ...articleProps }: Props) {
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN_NAME
  }/api/og/?title=${encodeURIComponent(articleProps.title)}`;

  return (
    <>
      <Head>
        <title>{articleProps.title}</title>
        <meta name="description" content={articleProps.description} />
        <meta property="og:title" content="Post" />
        <meta property="og:description" content={articleProps.title} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:title" content="Post" />
        <meta name="twitter:description" content={articleProps.title} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <Article {...articleProps}>
        <MDXRemote {...mdxSource} components={components} />
      </Article>
    </>
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

  const { content, ...props } = getPostData(params.slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMdxCodeMeta],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });

  return {
    props: {
      ...props,
      mdxSource,
    },
  };
};
