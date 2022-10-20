export type Theme = "light" | "dark";

export function getTheme() {
  return (
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  ) as Theme;
}

export function setTheme(theme: Theme) {
  switch (theme) {
    case "light":
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      break;
    case "dark":
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      break;
  }
}

// export function addThemeChangeListener(listener: (theme: Theme) => void) {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((m) => {
//       if (m.type === "attributes" && m.attributeName === "class") {
//         const nextTheme = (m.target as HTMLElement).classList.contains("dark")
//           ? "dark"
//           : "light";
//         listener(nextTheme);
//       }
//     });
//   });
//   observer.observe(document.documentElement, { attributes: true });
//   return observer;
// }
