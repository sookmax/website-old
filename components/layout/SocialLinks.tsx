import Image from "next/image";

export default function SocialLinks() {
  return (
    <span className="flex space-x-2">
      <a
        className="flex items-center"
        href="https://github.com/sookmax"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/GitHub-Mark-120px-plus.png"
          alt="github-link"
          width={24}
          height={24}
        />
      </a>
      <a
        className="flex items-center"
        href="https://www.linkedin.com/in/sukkyu-sook-chung/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/In-White-128.png"
          alt="linkedin-link"
          width={24}
          height={24}
          style={{ filter: "invert(100%)" }}
        />
      </a>
    </span>
  );
}
