/* eslint-disable @next/next/google-font-display */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=block&text=Hi%2CIAmSook."
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=block&text=AboutWritingSurvey-AwebdeveloperSukkyu%20Chung%20%C2%A9%202022"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
          // [Refs]
          // - https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/
          // - https://github.com/vercel/next.js/discussions/12533
          // - https://github.com/gaearon/overreacted.io/blob/master/src/html.js
            (function() {
              function setTheme(theme) {
                switch (theme) {
                  case "light":
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem("theme", "light");
                    break;
                  case "dark":
                    document.documentElement.classList.add('dark');
                    localStorage.setItem("theme", "dark");
                    break;
                }
              }

              const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
              
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            })();
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
