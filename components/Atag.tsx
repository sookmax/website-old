import React from "react";

type Props = {
  href?: string;
  children?: React.ReactNode;
};

export default function Atag({ href, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
