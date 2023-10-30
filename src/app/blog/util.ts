import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';

interface Blog { id: string; date?: string; title: string }
const blogDir = path.join(process.cwd(), "/blog");
export const getAllPosts = () => {

  const blogTitles = fs.readdirSync(blogDir);
  const allPostsData: Blog[] =
    blogTitles.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fileContents = fs.readFileSync(
        path.join(blogDir, fileName),
        "utf8"
      );

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
        title: matterResult.data.title ?? "Untitled"
      };
    }).filter(post => !!(post as Blog).title);
  // Sort posts by date

  return allPostsData.sort((a, b) => {
    return +new Date(b.date ?? "") - +new Date(a.date ?? "");
  });
};

export async function getPostData(id: string):
  Promise<{ id: string, html: string, title: string, date: string } | undefined> {
  const fullPath = path.join(blogDir, `${id}.md`);
  if (!fs.existsSync(fullPath)) return undefined;
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const metadata = matterResult.data;
  // Use remark to convert markdown into HTML string
  const processedContent = (await remark().use(html).process(matterResult.content)).toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    html: processedContent,
    title: metadata.title ?? "Untitled",
    date: metadata.date ?? "Undated"
  };
}