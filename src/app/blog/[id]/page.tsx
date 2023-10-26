import Image from "next/image";
import { getAllPosts, getPostData } from "../util";
import css from "./index.module.css";
import backArrowIcon from "@/../public/arrow-back.svg";
import Link from "next/link";
import Head from "next/head";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  if (postData === undefined) return notFound();
  const { title, html, date } = postData;
  // console.log(html);
  return (
    <div className={css.container}>
      <Head>
        <title>Eric | {title}</title>
      </Head>
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
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: "cirex | " + (await getPostData(params.id))?.title,
  };
}
