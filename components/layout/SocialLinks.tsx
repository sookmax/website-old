import Image from "next/image";
import githubImg from "@/public/GitHub-Mark-120px-plus.png";
import linkedInImg from "@/public/LinkedIn-black.png";

export default function SocialLinks() {
  return (
    <span className="flex h-full items-center space-x-2">
      <a
        className="w-6"
        href="https://github.com/sookmax"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={githubImg} alt="github-link" layout="responsive" />
      </a>
      <a
        className="w-6"
        href="https://www.linkedin.com/in/sukkyu-sook-chung/"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={linkedInImg} alt="linkedin-link" layout="responsive" />
      </a>
    </span>
  );
}
