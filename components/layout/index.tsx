import { debounce } from "lodash-es";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Header from "./Header";
import ReadProgressBar from "./ReadProgressBar";
import { TABS } from "./constants";
import { useMemo } from "react";

type ScrollPositionStore = {
  [index: string]: number;
};

const scrollPositionStore: ScrollPositionStore = {};

export type LayoutProps = {
  saveScrollPosition: (componentName: string) => (() => void) | undefined;
};

type Props = {
  pageComponentName: string;
  children: (layoutProps: LayoutProps) => React.ReactNode;
};

const defaultOGImageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/og/`;

export default function Layout({ pageComponentName, children }: Props) {
  // `router.pathname`: no trailing slash & verbatim dynamic route (e.g. /post/[slug])
  // `router.asPath`: contains trailing slash & dynamic route is resolved (e.g. /post/actual-post-slug/)
  const router = useRouter();
  const currentTabId = getTabIdByPath(router.pathname);
  const layoutTitle = getLayoutTitle(router.pathname);
  const articlePath = isArticlePath(router.pathname);

  const overflowContainerElRef = useRef<HTMLDivElement>(null);
  const overflowElRef = useRef<HTMLElement>(null);

  const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${router.asPath}`;

  const layoutProps: LayoutProps = useMemo(
    () => ({
      saveScrollPosition: (componentName) => {
        if (!overflowContainerElRef.current) return;
        const overflowContainer = overflowContainerElRef.current;

        const listener = debounce((event: Event) => {
          if (event.target instanceof HTMLElement) {
            scrollPositionStore[componentName] = event.target.scrollTop;
          }
        }, 100);

        overflowContainer.addEventListener("scroll", listener);

        return () => overflowContainer.removeEventListener("scroll", listener);
      },
    }),
    []
  );

  useEffect(() => {
    if (!overflowContainerElRef.current) return;

    const overflowContainer = overflowContainerElRef.current;

    if (scrollPositionStore[pageComponentName] !== undefined) {
      overflowContainer.scrollTop = scrollPositionStore[pageComponentName];
    } else {
      overflowContainer.scrollTop = 0;
    }
  }, [pageComponentName]);

  return (
    <>
      <Head>
        {layoutTitle ? <title>{layoutTitle}</title> : null}
        <meta
          name="description"
          content="Hi, I'm Sook. A web developer."
        ></meta>

        <meta property="og:title" content="Sook's website" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={defaultOGImageUrl} />
        <meta property="og:url" content={fullUrl} />
        <meta
          property="og:description"
          content="Hi, I'm Sook. A web developer."
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Sukkyu_Chung" />
        <meta name="twitter:domain" content="sook.dev" />
        <meta name="twitter:title" content="Sook's website" />
        <meta
          name="twitter:description"
          content="Hi, I'm Sook. A web developer."
        />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:image" content={defaultOGImageUrl} />
      </Head>
      <div className="flex h-full w-full flex-col items-center dark:bg-slate-800 dark:text-gray-100">
        {/* {userAgent ? <div>{userAgent}</div> : null} */}
        {articlePath && (
          <ReadProgressBar
            overflowContainerEl={overflowContainerElRef}
            overflowEl={overflowElRef}
          />
        )}
        <div className="flex w-full max-w-2xl flex-grow flex-col overflow-hidden">
          <Header>
            <Tabs currentTabId={currentTabId} />
          </Header>
          <div
            className="flex h-full flex-grow flex-col overflow-auto"
            ref={overflowContainerElRef}
          >
            <main ref={overflowElRef} className="flex flex-grow flex-col">
              {children(layoutProps)}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

function getTabIdByPath(path: string) {
  if (isArticlePath(path)) {
    return TABS["/posts"]?.id;
  }
  return TABS[path]?.id;
}

function isArticlePath(path: string) {
  return /\/post\//.test(path);
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
