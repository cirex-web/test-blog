import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";
import { ProfilePic } from "./components/ProfilePic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { promises as fs } from "fs";
import path from "path";

const MS_PER_DAY = 1000 * 60 * 80 * 24;

export default async function Home() {
  const imageDirectory = path.join(process.cwd(), "/public/pfp");
  const pictures = (await fs.readdir(imageDirectory))
    .map((fileName) => fileName.replace(".png", ""))
    .filter((date) => !isNaN(Date.parse(date)))
    .sort((a, b) => (+new Date(a) % MS_PER_DAY) - (+new Date(b) % MS_PER_DAY));
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <ProfilePic pictures={pictures} />

        <div>
          <h2 style={{ fontSize: "50px" }}>Hi! I&apos;m</h2>
          <h1>Eric Xu</h1>
          <h2>CMU SCS &apos;27</h2>
        </div>
      </div>
      <BrowsingHistory />
    </main>
  );
}
