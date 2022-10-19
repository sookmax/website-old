import createMDX from "@next/mdx";

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
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react", // default is this anyway
  },
});

export default withMDX(nextConfig);
