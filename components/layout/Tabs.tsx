import Link from "next/link";
import React from "react";
import { classNames } from "@/utils/class-names";
import { tabs } from "./constants";

type Props = {
  currentTabId: number;
  setCurrentTabId: React.Dispatch<React.SetStateAction<number>>;
};

export default function Tabs({ currentTabId, setCurrentTabId }: Props) {
  return (
    <nav className="h-[var(--nav-height)] flex space-x-4 items-end">
      {tabs.map((tab) => {
        return (
          <Link key={tab.id} href={tab.href}>
            <a
              className={classNames(
                "border-b-2 font-bold",
                tab.id === currentTabId
                  ? "border-sky-600"
                  : "border-transparent  hover:border-gray-300"
              )}
              onClick={() => setCurrentTabId(tab.id)}
            >
              {tab.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
