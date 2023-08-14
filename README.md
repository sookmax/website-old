This project is a `Next.js` app hosted here: https://website-sook-old.vercel.app/
## Getting Started

```bash
git submodule update --init
npm install
npm run dev
```

## Additional Information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```bash
npx create-next-app@latest --typescript
```

### Configurations

- install prettier locally
  - `npm install prettier -D --save-exact`
- add `baseUrl` and `paths` to `compilerOptions` of `tsconfig.json`
  - https://nextjs.org/docs/advanced-features/module-path-aliases
- configure `MDX` support (need all these to import `.mdx` files and to use `<MDXProvider/>`)
  - `npm install @next/mdx @mdx-js/loader @mdx-js/react`
  - edit `next.config.js` accordingly
    - https://nextjs.org/docs/advanced-features/using-mdx
  - ~~add `frontmatter plugins` for `MDX`~~ (no longer used in favor of `next-mdx-remote`)
    - `npm install remark-frontmatter remark-mdx-frontmatter`
    - `next.config.js` -> `next.config.mjs`
      - https://github.com/vercel/next.js/discussions/36310#discussioncomment-2602491
- configure `eslint` for `.mdx`
  - install vscode `Extension: MDX`
  - `npm install -D eslint-plugin-mdx`
  - install vscode `Extension: Auto Close Tag`
  - add configurations to `.eslintrc.json` as recommended
- install a frontmatter parser `gray-matter`
  - `npm install gray-matter`
- install `tailwindcss`
  - `npm install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
  - edit `tailwind.config.js` as suggested
  - edit `styles/globals.css` as suggested
- add `@tailwindcss/typography` plugin
  - `npm install -D @tailwindcss/typography`
  - edit `tailwind.config.js` as suggested
- add the `Inter` font family
  - add `pages/_document.tsx`
  - add `<link rel="stylesheet" href="https://rsms.me/inter/inter.css">` to the `<Head>`
  - add configurations to `tailwind.config.js`
  - https://tailwindui.com/documentation
  - https://nextjs.org/docs/advanced-features/custom-document
