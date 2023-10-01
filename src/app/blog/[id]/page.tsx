import { getAllPosts, getPostData } from "../util";
import css from "./index.module.css";
export default async function Page({ params }: { params: { id: string } }) {
  const { title, html, date } = await getPostData(params.id);
  // console.log(html);
  return (
    <div className={css.container}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
export async function generateStaticParams() {
  return getAllPosts().map((postData) => postData.id);
}
