import React, { useEffect, useReducer } from "react";
import { getTheme, setTheme, Theme } from "./theme";

export type GlobalState = {
  screenWidth: number | null;
  userAgent: string | null;
  theme: Theme | null;
};

type Actions = SetScreenWidthAction | SetUserAgent | SetTheme | ResetState;

interface SetScreenWidthAction {
  type: "SET_SCREEN_WIDTH";
  payload: number | null;
}

interface SetUserAgent {
  type: "SET_USER_AGENT";
  payload: string | null;
}

interface SetTheme {
  type: "SET_THEME";
  payload: Theme | null;
}

interface ResetState {
  type: "RESET_STATE";
}

export const initialGlobalState: GlobalState = {
  screenWidth: null,
  userAgent: null,
  theme: null,
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

export function useGlobalState() {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  useEffect(() => {
    dispatch({ type: "SET_SCREEN_WIDTH", payload: window.innerWidth });
    return () => dispatch({ type: "SET_SCREEN_WIDTH", payload: null });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_USER_AGENT", payload: window.navigator.userAgent });
    return () => dispatch({ type: "SET_USER_AGENT", payload: null });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_THEME", payload: getTheme() });
    return () => {
      dispatch({ type: "SET_THEME", payload: null });
    };
  }, []);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        dispatch({ type: "SET_THEME", payload: "dark" });
      } else {
        dispatch({ type: "SET_THEME", payload: "light" });
      }
    };

    darkQuery.addEventListener("change", listener);

    return () => darkQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (state.theme) {
      // takes care of css class and localStorage.
      setTheme(state.theme);
    }
  }, [state.theme]);

  return [state, dispatch] as [typeof state, typeof dispatch];
}
