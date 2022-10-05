import React, { useEffect, useReducer } from "react";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import Atag from "@/components/Atag";

type GlobalState = {
  screenWidth: number | null;
};

const initialGlobalState: GlobalState = { screenWidth: null };

export const GlobalContext = React.createContext(initialGlobalState);

const components = {
  a: Atag,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);

  useEffect(() => {
    dispatch({ type: "SET_SCREEN_WIDTH", payload: window.innerWidth });
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      <MDXProvider components={components}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </GlobalContext.Provider>
  );
}

function globalReducer(state: GlobalState, action: Actions): GlobalState {
  switch (action.type) {
    case "SET_SCREEN_WIDTH":
      return { ...state, screenWidth: action.payload };
    default:
      return state;
  }
}

type Actions = SetScreenWidthAction | TestAction;
interface SetScreenWidthAction {
  type: "SET_SCREEN_WIDTH";
  payload: number;
}

interface TestAction {
  type: "TEST_ACTION";
  value: string;
}
