import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html className="w-full">
      <Head>
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
      </Head>
      <body className="flex flex-col">
        <Main />
        <NextScript />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
          // [Refs]
          // - https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/
          // - https://github.com/vercel/next.js/discussions/12533
          // - https://github.com/gaearon/overreacted.io/blob/master/src/html.js
            (function() {
              function setTheme(theme) {
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  throw '[THEME NOT FOUND]: ' + theme;
                }
              }

              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
            
              darkQuery.addEventListener('change', function(e) {
                if (e.matches) {
                  setTheme('dark');
                } else {
                  setTheme('light');
                }
                localStorage.removeItem('theme');
              })
              
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            })();
          `}
        </Script>
      </body>
    </Html>
  );
}
