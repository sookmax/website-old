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
  return fs.readdirSync(DIR_POSTS).map((fName) => fName.replace(/\.mdx?/, ""));
}

function getFrontMatters() {
  return getAbsolutePaths().map((path) => {
    const { title, date } = matter(fs.readFileSync(path)).data;
    return {
      title: title as string,
      date: date as Date,
    };
  });
}

function getAbsolutePaths() {
  return fs.readdirSync(DIR_POSTS).map((fName) => path.join(DIR_POSTS, fName));
}
