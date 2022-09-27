import React, { useState } from "react";
import Tabs from "./Tabs";
import Footer from "./Footer";
import Header from "./Header";
import { tabs } from "./constants";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [currentTabId, setCurrentTabId] = useState(tabs[0].id);

  const setTabToHome = () => {
    setCurrentTabId(tabs[0].id);
  };

  return (
    <div className="max-w-2xl m-auto">
      <Header onClick={setTabToHome} />
      <Tabs currentTabId={currentTabId} setCurrentTabId={setCurrentTabId} />
      <main className="mt-10">{children}</main>
      <Footer />
    </div>
  );
}
