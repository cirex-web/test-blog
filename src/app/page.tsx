import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";
import { ProfilePic, picture } from "./components/ProfilePic";
import { promises as fs } from "fs";
import path from "path";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default async function Home() {
  const imageDirectory = path.join(process.cwd(), "/public/pfp");
  const pictures: picture[] = (await fs.readdir(imageDirectory))
    .map((fileName) => {
      const date = fileName
        .slice(0, Math.max(0, fileName.length - 4))
        .replace(" at ", " ");
      if (isNaN(Date.parse(date))) {
        console.log(date);
        return undefined;
      }
      return {
        file: fileName,
        date: new Date(date),
      };
    })
    .filter((image): image is picture => !!image)
    .sort(
      (a, b) =>
        a.date.getHours() * 60 +
        a.date.getMinutes() -
        (b.date.getHours() * 60 + b.date.getMinutes())
    );
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
