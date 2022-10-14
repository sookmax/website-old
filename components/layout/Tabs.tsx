import Link from "next/link";
import React from "react";
import { classNames } from "@/utils/class-names";
import { tabs } from "./constants";

type Props = {
  currentTabId: number | undefined;
};

export default function Tabs({ currentTabId }: Props) {
  return (
    <nav className="flex space-x-4">
      {Object.entries(tabs).map(([href, tab]) => {
        if (tab) {
          return (
            <Link key={tab.id} href={href}>
              <a
                className={classNames(
                  "border-b-4 p-1 text-gray-700 dark:text-gray-100",
                  tab.id === currentTabId
                    ? "border-yellow-400"
                    : "border-transparent  hover:border-gray-200 hover:dark:border-gray-500"
                )}
              >
                {tab.label}
              </a>
            </Link>
          );
        }
      })}
    </nav>
  );
}
