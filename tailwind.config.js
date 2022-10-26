const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./mdx/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-pre-bg": "#fafafa",
            "--tw-prose-invert-pre-bg": "#262729",
            // "--tw-prose-code": "#f43f5e",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
