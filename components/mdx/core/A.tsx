import React from "react";
import Link from "next/link";
import { classNames } from "@/utils/class-names";

type Props = {
  [index: string]: any;
  href?: string;
  children?: React.ReactNode;
};

// ref: https://github.com/leerob/leerob.io/blob/main/components/MDXComponents.tsx
export default function A({ href, children, ...rest }: Props) {
  if (!href) throw "No 'href' attribute found.";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  // `scroll-behavior: smooth;` doesn't work when wrapped in <Link /> :(
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={classNames(
          "absolute h-full w-full",
          "hover:after:ml-2 hover:after:content-['#']",
          "hover:after:absolute hover:after:left-full",
          "hover:after:text-pink-500"
        )}
        {...rest}
      ></a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
