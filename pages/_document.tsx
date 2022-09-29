import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full">
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
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sook's website" />
        <meta
          property="og:description"
          content="Hello, I'm Sook. Thanks for visiting my website!"
        />
      </Head>
      <body className="h-full flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
