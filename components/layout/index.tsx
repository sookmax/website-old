import React, { useState, useEffect } from "react";
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

  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, []);

  return (
    <div className="m-auto max-w-2xl">
      {/* {userAgent ? <div>{userAgent}</div> : null} */}
      <Head>{layoutTitle ? <title>{layoutTitle}</title> : null}</Head>
      {isArticlePath(router.pathname) ? (
        <ReadProgressBar userAgent={userAgent} />
      ) : null}
      <div className="mx-12 flex flex-col">
        <Header />
        <Tabs currentTabId={currentTabId} />
        <main className="my-10 flex-grow">{children}</main>
        <Footer />
      </div>
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
