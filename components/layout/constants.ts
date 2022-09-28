export const tabs = {
  "/": { id: 0, label: "About" },
  "/posts": { id: 1, label: "Posts" },
};

export type Tabs = typeof tabs;

const postsRegex = /^\/post(s|\/.+)/;

export function getTabIdByPath(path: string) {
  let tabId: number | undefined;

  if (postsRegex.test(path)) {
    tabId = tabs["/posts"].id;
  } else {
    tabId = tabs["/"].id;
  }

  return tabId;
}
