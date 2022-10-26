import matter from "gray-matter";
import fs from "fs";
import path from "path";

const POST_DIR = path.join(process.cwd(), "mdx", "posts");
const SLUG_EXCLUDES = /^_.*$/;
const WORDS_PER_MINUTE = 200;

export function getPostData(slug: string) {
  const matterResult = getMatterData(slug);

  const wordsCount = matterResult.content
    .replaceAll(/!?\[.*\]\(.*\)/g, "") // remove markdown images and links
    .replaceAll(/(#|-|\/)+/g, "") // remove meta characters
    .split(/\s|&mdash;/)
    .filter(Boolean).length;

  const readTime = Math.round(wordsCount / WORDS_PER_MINUTE);

  return {
    matter: matterResult,
    wordsCount,
    wordsPerMinute: WORDS_PER_MINUTE,
    readTime,
  };
}

export function getAllSlugs() {
  return fs
    .readdirSync(POST_DIR)
    .map((fileName) => fileName.replace(/\.mdx?/, ""));
}

export function getAllPostMeta(excludes = SLUG_EXCLUDES) {
  const metadata = getAllSlugs()
    .filter((slug) => !excludes.test(slug))
    .map((slug) => {
      const { data } = getMatterData(slug);
      return {
        slug,
        title: data.title as string,
        description: data.description as string | undefined,
        date: Number(data.date),
      };
    });

  metadata.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return metadata;
}

function getMatterData(slug: string) {
  const filePath = path.join(POST_DIR, `${slug}.mdx`);
  return matter(fs.readFileSync(filePath));
}
