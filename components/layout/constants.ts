type TabItem = {
  id: number;
  label: string;
};

interface Tabs {
  [index: string]: TabItem | undefined;
}

export const tabs: Tabs = {
  "/": { id: 0, label: "About" },
  "/posts": { id: 1, label: "Posts" },
};

export function getTabIdByPath(path: string) {
  if (isArticlePath(path)) {
    return tabs["/posts"]?.id;
  }
  return tabs[path]?.id;
}

export function isArticlePath(path: string) {
  return /\/post\//.test(path);
}
