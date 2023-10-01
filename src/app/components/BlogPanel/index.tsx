import { getAllPosts } from "@/app/blog/util";
import css from "./index.module.css";
import Link from "next/link";

export const BlogPanel = () => {
  const allPosts = getAllPosts();
  return (
    <div className={css.panel}>
      <h2>Blog posts</h2>
      <ul className={css.blogList}>
        {allPosts.map((postData) => (
          <li key={postData.id} className={css.blogEntry}>
            <h3>
              <Link href={`/blog/${postData.id}`}>{postData.title}</Link>
            </h3>
            <small className={css.date}>{postData.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
