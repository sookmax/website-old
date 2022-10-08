import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { getTheme, addThemeChangeListener, toggleTheme } from "@/utils/theme";

export default function ThemeToggler() {
  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    setTheme(getTheme());
    const observer = addThemeChangeListener(() => setTheme(getTheme()));

    return () => observer.disconnect();
  }, []);

  let icon: React.ReactElement | null = null;

  switch (theme) {
    case "light":
      icon = <MoonIcon />;
      break;
    case "dark":
      icon = <SunIcon />;
      break;
  }

  const onThemeChange = () => {
    toggleTheme();
  };

  return (
    <button
      className="h-6 w-6 text-gray-500 dark:text-gray-400"
      onClick={onThemeChange}
    >
      {icon}
    </button>
  );
}
