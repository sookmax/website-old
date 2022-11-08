import Link from "next/link";
import React from "react";
import { classNames } from "@/utils/class-names";
import { TABS } from "./constants";

type Props = {
  currentTabId: number | undefined;
};

export default function Tabs({ currentTabId }: Props) {
  return (
    <nav className="flex space-x-4">
      {Object.entries(TABS).map(([href, tab]) => {
        if (tab) {
          return (
            <Link
              key={tab.id}
              href={href}
              className={classNames(
                "relative",
                "font-['Raleway']",
                "p-1",
                tab.id === currentTabId
                  ? "text-gray-800 dark:text-gray-200"
                  : "text-gray-400 dark:text-gray-500"
              )}
            >
              <span>{tab.label}</span>
            </Link>
          );
        }
      })}
    </nav>
  );
}
