import Image from "next/image";
import { getAllPosts, getPostData } from "../util";
import css from "./index.module.css";
import backArrowIcon from "@/../public/arrow-back.svg";
import Link from "next/link";
export default async function Page({ params }: { params: { id: string } }) {
  const { title, html, date } = await getPostData(params.id);
  // console.log(html);
  return (
    <div className={css.container}>
      <Link href={"/"}>
        <div className={css.navigation}>
          <Image src={backArrowIcon} alt="back arrow" height={20} />
          <p>Back</p>
        </div>
      </Link>
      <h2 className={css.title}>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
export async function generateStaticParams() {
  return getAllPosts().map((postData) => postData.id);
}
