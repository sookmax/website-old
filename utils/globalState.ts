import React from "react";

export type GlobalState = {
  screenWidth: number | null;
  userAgent: string | null;
  theme?: "light" | "dark";
};

export const initialGlobalState: GlobalState = {
  screenWidth: null,
  userAgent: null,
};

export const GlobalContext = React.createContext({
  state: initialGlobalState,
  dispatch: (_action: Actions) => {},
});

export function globalReducer(
  state: GlobalState,
  action: Actions
): GlobalState {
  switch (action.type) {
    case "SET_SCREEN_WIDTH":
      return { ...state, screenWidth: action.payload };
    case "SET_USER_AGENT":
      return { ...state, userAgent: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "RESET_STATE":
      return { ...initialGlobalState };
    default:
      return state;
  }
}

type Actions = SetScreenWidthAction | SetUserAgent | SetTheme | ResetState;

interface SetScreenWidthAction {
  type: "SET_SCREEN_WIDTH";
  payload: number;
}

interface SetUserAgent {
  type: "SET_USER_AGENT";
  payload: string;
}

interface SetTheme {
  type: "SET_THEME";
  payload: "light" | "dark";
}

interface ResetState {
  type: "RESET_STATE";
}
