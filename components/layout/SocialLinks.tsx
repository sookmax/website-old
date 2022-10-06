import { useEffect, useState } from "react";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import githubImg from "@/public/GitHub-Mark-120px-plus.png";
import linkedInImg from "@/public/LinkedIn-black.png";

function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function toggleTheme() {
  const currentTheme = getTheme();

  switch (currentTheme) {
    case "light":
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      break;
    case "dark":
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      break;
  }
}

function getThemeIcon(theme?: "dark" | "light") {
  switch (theme) {
    case "dark":
      return <SunIcon />;
    case "light":
      return <MoonIcon />;
    default:
      return null;
  }
}

function addThemeChangeListener(listener: (htmlEl: Node) => void) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === "attributes" && m.attributeName === "class") {
        listener(m.target);
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });
  return observer;
}

export default function SocialLinks() {
  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    setTheme(getTheme());
    const observer = addThemeChangeListener(() => setTheme(getTheme()));

    return () => observer.disconnect();
  }, []);

  const onThemeChange = () => {
    toggleTheme();
  };

  return (
    <span className="flex h-full items-center space-x-2">
      <button className="h-6 w-6" onClick={onThemeChange}>
        {getThemeIcon(theme)}
      </button>
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
