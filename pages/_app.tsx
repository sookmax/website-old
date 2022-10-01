import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import Atag from "@/components/Atag";

const components = {
  a: Atag,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;
