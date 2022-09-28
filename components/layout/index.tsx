import React, { useState } from "react";
import { useRouter } from "next/router";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Header from "./Header";
import { getTabIdByPath, tabs } from "./constants";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const currentTabId = getTabIdByPath(router.pathname);

  return (
    <div className="max-w-2xl m-auto h-full flex flex-col">
      <Header />
      <Tabs currentTabId={currentTabId} />
      <main className="mt-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
