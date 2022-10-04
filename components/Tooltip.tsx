import React from "react";

type Props = {
  children: React.ReactNode;
  content: string;
};

export default function Tooltip({ children, content }: Props) {
  return (
    <span className="relative">
      <span className="absolute left-1/2 top-full inline-block translate-y-1  -translate-x-1/2 rounded-lg bg-gray-600 px-3 py-1 text-white">
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-600"></span>
        {content}
      </span>
      {children}
    </span>
  );
}
