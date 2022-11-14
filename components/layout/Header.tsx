import { classNames } from "@/utils/class-names";
import React from "react";
import ThemeToggler from "./ThemeToggler";

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header
      className={classNames(
        "h-[var(--header-height)]",
        "flex items-center justify-between",
        "space-x-6 border-b border-gray-200 p-4 dark:border-gray-600",
        "sticky top-0 z-10",
        "bg-white dark:bg-slate-800 dark:text-gray-100" // `Header` needs this because it's sticky
      )}
    >
      <div className="flex-grow text-sm">{children}</div>
      <ThemeToggler />
    </header>
  );
}
