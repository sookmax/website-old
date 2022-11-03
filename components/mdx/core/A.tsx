import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/class-names";

type Props = {
  [index: string]: any;
  href?: string;
  children?: React.ReactNode;
};

// ref: https://github.com/leerob/leerob.io/blob/main/components/MDXComponents.tsx
export default function A({ href, ...rest }: Props) {
  if (!href) throw "No 'href' attribute found.";

  if (href.startsWith("/")) {
    return <Link href={href} {...rest} />;
  }

  // `scroll-behavior: smooth;` doesn't work when wrapped in <Link /> :(
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={classNames(
          "h-full w-full no-underline",
          "hover:after:content-['#']",
          "hover:after:ml-2",
          "hover:after:text-yellow-500"
        )}
        {...rest}
      />
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words"
      {...rest}
    />
  );
}
