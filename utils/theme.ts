export function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function toggleTheme() {
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

export function addThemeChangeListener(listener: (htmlEl: Node) => void) {
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
