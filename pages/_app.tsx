import React, { useEffect, useReducer, useMemo } from "react";
import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import {
  GlobalContext,
  globalReducer,
  initialGlobalState,
} from "@/utils/globalState";
import Layout from "@/components/layout";
import MDXComponents from "@/components/mdx";
import "@/styles/globals.css";
import "@/styles/hljs-edge-dark.css";
import "@/styles/hljs-edge-light.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_SCREEN_WIDTH", payload: window.innerWidth });
    dispatch({ type: "SET_USER_AGENT", payload: window.navigator.userAgent });
    return () => dispatch({ type: "RESET_STATE" });
  }, []);

  return (
    <MDXProvider components={MDXComponents}>
      <GlobalContext.Provider value={contextValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </MDXProvider>
  );
}
