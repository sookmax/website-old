import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR_POSTS = path.join(process.cwd(), "pages", "post");
const WORDS_EXCLUDE = /import[\s\S]*$/;
const WORDS_PER_MINUTE = 200;

export function getAllPostMetadata() {
  // return _getAllPostMetadata().filter((mData) => !mData.slug.startsWith("_"));
  return _getAllPostMetadata().filter((mData) => !/^(_|\[).*/.test(mData.slug));
}

function _getAllPostMetadata() {
  const slugs = getSlugs();
  const frontMatters = getFrontMatters();

  const metadata = [];
  for (let i = 0; i < slugs.length; i++) {
    metadata.push({
      slug: slugs[i],
      title: frontMatters[i].title,
      date: Number(frontMatters[i].date),
    });
  }

  metadata.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return metadata.map((mData) => ({
    slug: mData.slug,
    title: mData.title,
    date: Number(mData.date),
  }));
}

function getSlugs() {
  return getAbsolutePaths().map((p) => path.basename(p, ".mdx"));
}

function getSlugFromTitle(title: string) {
  const post = _getAllPostMetadata().find((mData) => mData.title === title);
  return post?.slug;
}

function getFrontMatters() {
  return getAbsolutePaths().map((path) => getMatterResult(path));
}

function getMatterResult(path: string) {
  const matterResult = matter(fs.readFileSync(path));

  const { title, date } = matterResult.data;

  return {
    title: title as string,
    date: date as Date,
  };
}

function getAbsolutePath(slug: string) {
  return path.join(DIR_POSTS, `${slug}.mdx`);
}

function getAbsolutePaths() {
  return fs.readdirSync(DIR_POSTS).map((fName) => path.join(DIR_POSTS, fName));
}

function getLastModifiedDate(slug: string) {
  const path = getAbsolutePath(slug);
  return Number(fs.statSync(path).mtime);
}

function getDate(slug: string) {
  const path = getAbsolutePath(slug);
  return Number(getMatterResult(path).date);
}

function getWordCounts(slug: string) {
  const path = getAbsolutePath(slug);
  const matterResult = matter(fs.readFileSync(path));

  const wordsCount = matterResult.content
    .replace(WORDS_EXCLUDE, "")
    .split(/\s|&mdash;/)
    .filter(Boolean)
    .filter((word) => !/[#]+/.test(word)).length;

  const readTime = Math.round(wordsCount / WORDS_PER_MINUTE);

  return {
    readTime,
    wordsCount,
    wordsPerMinute: WORDS_PER_MINUTE,
  };
}

export function getArticleProps(title: string) {
  const slug = getSlugFromTitle(title);

  if (!slug) throw `[FILE NOT FOUND] with the title "${title}"`;

  return {
    dateEpoch: getDate(slug),
    lastModifiedEpoch: getLastModifiedDate(slug),
    ...getWordCounts(slug),
  };
}
