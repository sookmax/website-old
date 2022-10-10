import React, { useEffect, useReducer } from "react";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import "@/styles/globals.css";

type GlobalState = {
  screenWidth: number | null;
  userAgent: string | null;
};

const initialGlobalState: GlobalState = { screenWidth: null, userAgent: null };

export const GlobalContext = React.createContext(initialGlobalState);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);

  useEffect(() => {
    dispatch({ type: "SET_SCREEN_WIDTH", payload: window.innerWidth });
    dispatch({ type: "SET_USER_AGENT", payload: window.navigator.userAgent });
    return () => dispatch({ type: "RESET_STATE" });
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  );
}

function globalReducer(state: GlobalState, action: Actions): GlobalState {
  switch (action.type) {
    case "SET_SCREEN_WIDTH":
      return { ...state, screenWidth: action.payload };
    case "SET_USER_AGENT":
      return { ...state, userAgent: action.payload };
    case "RESET_STATE":
      return { ...initialGlobalState };
    default:
      return state;
  }
}

type Actions = SetScreenWidthAction | SetUserAgent | ResetState;
interface SetScreenWidthAction {
  type: "SET_SCREEN_WIDTH";
  payload: number;
}

interface SetUserAgent {
  type: "SET_USER_AGENT";
  payload: string;
}

interface ResetState {
  type: "RESET_STATE";
}
