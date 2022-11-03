import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // https://github.com/chartjs/Chart.js/issues/9390#issuecomment-1263680623
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  trailingSlash: true,
  eslint: {
    dirs: ["pages", "components", "server-scripts", "utils", "mdx"],
  },
  // https://github.com/vercel/next.js/pull/41529
  // experimental: {
  //   browsersListForSwc: true,
  // },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMdxCodeMeta],
    rehypePlugins: [
      rehypeSlug,
      // https://github.com/rehypejs/rehype-autolink-headings#optionsbehavior
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react", // default is this anyway
  },
});

export default withMDX(nextConfig);
