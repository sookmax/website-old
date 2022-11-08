type TabItem = {
  id: number;
  label: string;
};

interface Tabs {
  [index: string]: TabItem | undefined;
}

export const TABS: Tabs = {
  "/": { id: 0, label: "About" },
  "/posts": { id: 1, label: "Writing" },
};
