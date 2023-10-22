import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";
import { ProfilePic, picture } from "./components/ProfilePic";
import { promises as fs } from "fs";
import path from "path";
import { BlogPanel } from "./components/BlogPanel";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default async function Home() {
  const imageDirectory = path.join(process.cwd(), "/public/pfp");
  const pictures: picture[] = (await fs.readdir(imageDirectory))
    .map((fileName) => {
      const date = fileName
        .slice(0, Math.max(0, fileName.length - 4))
        .replace(" at ", " ");
      if (isNaN(Date.parse(date))) {
        if (date !== "blank") console.warn(`Misformatted date! ${date}`);
        return undefined;
      }
      return {
        file: fileName,
        date: date,
      };
    })
    .filter((image): image is picture => !!image)
    .sort(
      (a, b) =>
        new Date(a.date).getHours() * 60 +
        new Date(a.date).getMinutes() -
        (new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes())
    );
  return (
    <main className={styles.main}>
      <div className={styles.leftPanel}>
        <div className={styles.title}>
          <ProfilePic pictures={pictures} />

          <div>
            <h2 style={{ fontSize: "50px" }}>Hi! I&apos;m</h2>
            <h1>Eric Xu</h1>
            <h3>
              Coder, dreamer, and productivity-obsessed digital minimalist
            </h3>
          </div>
        </div>
        <BlogPanel />
      </div>
      <BrowsingHistory />
    </main>
  );
}
