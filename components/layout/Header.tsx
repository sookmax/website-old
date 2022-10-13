import React from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="flex h-[var(--header-height)] flex-shrink-0 items-end justify-between space-x-6 pt-4">
      <Link href={"/"}>
        <a className="text-xl font-extralight">SOOK.DEV</a>
      </Link>
      <div className="flex-grow text-sm">{children}</div>
      <ThemeToggler />
    </header>
  );
}
