import styles from "./page-layout.module.css";
import { promises as fs } from "fs";
import path from "path";
import { BlogPanel } from "../components/BlogPanel";
import { picture, ProfilePic } from "../components/ProfilePic";
import contact from "@/../public/contact.svg";
import Image from "next/image";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageDirectory = path.resolve("./public/static/pfp");
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
    // <div className={styles.mainContainer}>
    <main className={styles.main}>
      <div className={styles.leftPanel}>
        <div className={styles.heading}>
          <ProfilePic pictures={pictures} />

          <div className={styles.title}>
            <h2 style={{ fontSize: "50px" }}>Hi! I&apos;m</h2>
            <h1>Eric Xu</h1>
            <h3>
              Coder, dreamer, and productivity-obsessed digital minimalist
            </h3>
          </div>
        </div>
        <Image
          src={contact}
          style={{ width: "100%", height: "auto", marginTop: "32px" }}
          alt="contact info"
        />
      </div>
      {children}
    </main>
    // </div>
  );
}
