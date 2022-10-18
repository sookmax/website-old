import React, { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Header from "./Header";
import ReadProgressBar from "./ReadProgressBar";
import { getTabIdByPath, isArticlePath } from "./constants";

type Props = {
  children: React.ReactNode;
};

const defaultOGImageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/og/`;

export default function Layout({ children }: Props) {
  // `router.pathname`: no trailing slash & verbatim dynamic route (e.g. /post/[slug])
  // `router.asPath`: contains trailing slash & dynamic route is resolved (e.g. /post/actual-post-slug/)
  const router = useRouter();
  const currentTabId = getTabIdByPath(router.pathname);
  const layoutTitle = getLayoutTitle(router.pathname);
  const articlePath = isArticlePath(router.pathname);

  const mainEl = useRef<HTMLElement>(null);

  const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${router.asPath}`;

  return (
    <>
      <Head>
        {layoutTitle ? <title>{layoutTitle}</title> : null}
        <meta name="description" content="Hello 👋"></meta>

        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sook's website" />
        <meta property="og:description" content="Hello 👋" />
        <meta property="og:image" content={defaultOGImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="sook.dev" />
        <meta property="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content="Sook's website" />
        <meta name="twitter:description" content="Hello 👋" />
        <meta name="twitter:image" content={defaultOGImageUrl} />
      </Head>
      <div className=" flex min-h-full w-full flex-col items-center dark:bg-slate-800 dark:text-gray-100">
        {/* {userAgent ? <div>{userAgent}</div> : null} */}
        {articlePath && <ReadProgressBar mainEl={mainEl} />}
        <div className="mb-6 flex w-full max-w-2xl flex-grow flex-col px-6 sm:px-8">
          <Header>
            <Tabs currentTabId={currentTabId} />
          </Header>
          <main ref={mainEl} className="mt-10 flex flex-grow flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

const titleRoot = "sook.dev";

function getLayoutTitle(routerPath: string) {
  const [, firstPath] = routerPath.split("/");

  let title: string | null = titleRoot;

  switch (firstPath) {
    case "":
      break;
    case "posts":
      title = `Posts | ${titleRoot}`;
      break;
    default:
      title = null; // handled in other places
  }

  return title;
}
