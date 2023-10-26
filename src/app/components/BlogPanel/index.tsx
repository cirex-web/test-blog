import { getAllPosts } from "@/app/blog/util";
import css from "./index.module.css";
import Link from "next/link";

export const BlogPanel = () => {
  const allPosts = getAllPosts();
  return (
    <div className={css.panel}>
      <h2>Blog posts</h2>
      <h3>New post every Sunday!</h3>
      <ul className={css.blogList}>
        {allPosts.map((postData) => (
          <li key={postData.id} className={css.blogEntry}>
            <h3>
              <Link href={`/blog/${postData.id}`}>{postData.title}</Link>
            </h3>
            <small className={css.date}>
              {postData.date
                ? new Date(postData.date)
                    .toLocaleTimeString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .split(",")[0]
                : "No date"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};
