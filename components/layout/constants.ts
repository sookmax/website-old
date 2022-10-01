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
  return tabs[path]?.id;
}
