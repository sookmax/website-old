import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR_POSTS = path.join(process.cwd(), "pages", "post");

export function getAllPostMetadata() {
  const slugs = getSlugs();
  const frontMatters = getFrontMatters();

  const metadata = [];
  for (let i = 0; i < slugs.length; i++) {
    metadata.push({
      slug: slugs[i],
      title: frontMatters[i].title,
      date: frontMatters[i].date,
    });
  }

  metadata.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return metadata;
}

function getSlugs() {
  return getAbsolutePaths().map((p) => path.basename(p, ".mdx"));
}

export function getSlugFromTitle(title: string) {
  const post = getAllPostMetadata().find((mData) => mData.title === title);
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

const excludeRegex = /import[\s\S]*$/;
const wordsPerMinute = 200;

export function getReadTime(slug: string) {
  const path = getAbsolutePath(slug);
  const matterResult = matter(fs.readFileSync(path));

  const readTime = Math.round(
    matterResult.content
      .replace(excludeRegex, "")
      .split(/\s/)
      .filter(Boolean)
      .filter((word) => !/[#]+/.test(word)).length / wordsPerMinute
  );

  return readTime;
}

function getAbsolutePath(slug: string) {
  return path.join(DIR_POSTS, `${slug}.mdx`);
}

function getAbsolutePaths() {
  return fs
    .readdirSync(DIR_POSTS)
    .filter((fName) => !fName.startsWith("_"))
    .map((fName) => path.join(DIR_POSTS, fName));
}
