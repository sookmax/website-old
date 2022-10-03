import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Header from "./Header";
import ReadProgressBar from "./ReadProgressBar";
import { getTabIdByPath, isArticlePath } from "./constants";
import { isLinkedInApp } from "@/utils/edge-cases";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const currentTabId = getTabIdByPath(router.pathname);
  const layoutTitle = getLayoutTitle(router.pathname);
  const articlePath = isArticlePath(router.pathname);

  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
    return () => setUserAgent("");
  }, []);

  return (
    <>
      <Head>{layoutTitle ? <title>{layoutTitle}</title> : null}</Head>
      <div className="flex w-full flex-col items-center">
        {/* {userAgent ? <div>{userAgent}</div> : null} */}
        {articlePath && !isLinkedInApp(userAgent) && <ReadProgressBar />}
        <div className="flex w-full max-w-2xl flex-col px-6">
          <Header />
          <Tabs currentTabId={currentTabId} />
          <main className="my-10 flex-grow">{children}</main>
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
      title = null;
  }

  return title;
}
