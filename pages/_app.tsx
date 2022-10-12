import React, { useEffect, useReducer, useMemo } from "react";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import {
  GlobalContext,
  globalReducer,
  initialGlobalState,
} from "@/utils/globalState";
import Layout from "@/components/layout";
import { A, Pre } from "@/components/mdx";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_SCREEN_WIDTH", payload: window.innerWidth });
    dispatch({ type: "SET_USER_AGENT", payload: window.navigator.userAgent });
    return () => dispatch({ type: "RESET_STATE" });
  }, []);

  const components = {
    a: A,
    pre: Pre(state.theme),
  };

  return (
    <MDXProvider components={components}>
      <GlobalContext.Provider value={contextValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </MDXProvider>
  );
}
