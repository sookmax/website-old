import React from "react";
import ThemeToggler from "./ThemeToggler";

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="flex h-[var(--header-height)] flex-shrink-0 items-center justify-between space-x-6 border-b border-gray-200 p-4 dark:border-gray-600">
      <div className="flex-grow text-sm">{children}</div>
      <ThemeToggler />
    </header>
  );
}
