import Link from "next/link";
import React from "react";
import { classNames } from "@/utils/class-names";
import { tabs } from "./constants";

type Props = {
  currentTabId: number | undefined;
};

export default function Tabs({ currentTabId }: Props) {
  return (
    <nav className="h-[var(--nav-height)] flex flex-shrink-0 space-x-4 items-end">
      {Object.entries(tabs).map(([href, tab]) => {
        return (
          <Link key={tab.id} href={href}>
            <a
              className={classNames(
                "border-b-2 font-bold",
                tab.id === currentTabId
                  ? "border-sky-600"
                  : "border-transparent  hover:border-gray-300"
              )}
            >
              {tab.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
