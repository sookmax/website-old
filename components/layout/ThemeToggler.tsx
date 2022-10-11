import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { getTheme, addThemeChangeListener, toggleTheme } from "@/utils/theme";
import { useContext } from "react";
import { GlobalContext } from "@/utils/globalState";

export default function ThemeToggler() {
  const {
    state: { theme },
    dispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: "SET_THEME", payload: getTheme() });
    const observer = addThemeChangeListener(() =>
      dispatch({ type: "SET_THEME", payload: getTheme() })
    );

    return () => observer.disconnect();
  }, [dispatch]);

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
