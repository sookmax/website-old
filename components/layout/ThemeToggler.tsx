import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { GlobalContext } from "@/utils/globalState";

export default function ThemeToggler() {
  const {
    state: { theme },
    dispatch,
  } = useContext(GlobalContext);

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
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatch({ type: "SET_THEME", payload: nextTheme });
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
