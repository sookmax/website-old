import React from "react";
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

export default function Layout({ children }: Props) {
  const router = useRouter();
  const currentTabId = getTabIdByPath(router.pathname);
  const layoutTitle = getLayoutTitle(router.pathname);

  return (
    <div className="m-auto flex h-full max-w-2xl flex-col px-12">
      <Head>{layoutTitle ? <title>{layoutTitle}</title> : null}</Head>
      {isArticlePath(router.pathname) ? <ReadProgressBar /> : null}
      <Header />
      <Tabs currentTabId={currentTabId} />
      <main className="my-10 flex-grow">{children}</main>
      <Footer />
    </div>
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
      title = null;
  }

  return title;
}
