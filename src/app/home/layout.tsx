import styles from "./page-layout.module.css";
import { promises as fs } from "fs";
import path from "path";
import { BlogPanel } from "../components/BlogPanel";
import { picture, ProfilePic } from "../components/ProfilePic";

import { ClockifyPanel } from "../components/ClockifyPanel";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageDirectory = path.resolve("./public/static/pfp");
  // const pictures: picture[] = (await fs.readdir(imageDirectory))
  //   .map((fileName) => {
  //     const date = fileName
  //       .slice(0, Math.max(0, fileName.length - 4))
  //       .replace(" at ", " ");
  //     if (isNaN(Date.parse(date))) {
  //       if (date !== "blank") console.warn(`Misformatted date! ${date}`);
  //       return undefined;
  //     }
  //     return {
  //       file: fileName,
  //       date: date,
  //     };
  //   })
  //   .filter((image): image is picture => !!image)
  //   .sort(
  //     (a, b) =>
  //       new Date(a.date).getHours() * 60 +
  //       new Date(a.date).getMinutes() -
  //       (new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes())
  //   );
  const pictures: picture[] = [
    { file: "Sep 19, 2023 at 9:28 AM.png", date: "Sep 19, 2023 9:28 AM" },
    {
      file: "Monday, September 18, 2023 at 10:09 AM.png",
      date: "Monday, September 18, 2023 10:09 AM",
    },
    {
      file: "Saturday, September 16, 2023 10:23 AM.png",
      date: "Saturday, September 16, 2023 10:23 AM",
    },
    {
      file: "Sep 16, 2023 at 11:39 AM.png",
      date: "Sep 16, 2023 11:39 AM",
    },
    {
      file: "Sep 20, 2023 at 11:53 AM.png",
      date: "Sep 20, 2023 11:53 AM",
    },
    {
      file: "Sunday, September 17, 2023 at 12:08 PM.png",
      date: "Sunday, September 17, 2023 12:08 PM",
    },
    {
      file: "Aug 22, 2023 at 12:39 PM.png",
      date: "Aug 22, 2023 12:39 PM",
    },
    {
      file: "Sunday, September 17, 2023 at 12:42 PM.png",
      date: "Sunday, September 17, 2023 12:42 PM",
    },
    {
      file: "Saturday, September 16, 2023 at 12:49 PM.png",
      date: "Saturday, September 16, 2023 12:49 PM",
    },
    {
      file: "Sunday, September 17, 2023 at 1:15 PM.png",
      date: "Sunday, September 17, 2023 1:15 PM",
    },
    { file: "9,25,2023 3:45 PM.png", date: "9,25,2023 3:45 PM" },
    {
      file: "Saturday, September 16, 2023 at 3:55 PM.png",
      date: "Saturday, September 16, 2023 3:55 PM",
    },
    {
      file: "Sunday, September 17, 2023 at 3:55 PM.png",
      date: "Sunday, September 17, 2023 3:55 PM",
    },
    {
      file: "Saturday, September 16, 2023 at 3:56 PM.png",
      date: "Saturday, September 16, 2023 3:56 PM",
    },
    {
      file: "Sunday, September 17, 2023 at 4:13 PM.png",
      date: "Sunday, September 17, 2023 4:13 PM",
    },
    { file: "Sep 24, 2023 4:21 PM.png", date: "Sep 24, 2023 4:21 PM" },
    { file: "Sep 19, 2023 at 4:24 PM.png", date: "Sep 19, 2023 4:24 PM" },
    {
      file: "Wednesday, September 13, 2023 at 5:04 PM.JPG",
      date: "Wednesday, September 13, 2023 5:04 PM",
    },
    {
      file: "Saturday, September 16, 2023 at 5:22 PM.png",
      date: "Saturday, September 16, 2023 5:22 PM",
    },
    {
      file: "Saturday, September 16, 2023 at 5:55 PM.png",
      date: "Saturday, September 16, 2023 5:55 PM",
    },
    {
      file: "Friday, September 15, 2023 at 6:15 PM.png",
      date: "Friday, September 15, 2023 6:15 PM",
    },
    {
      file: "Monday, September 18, 2023 at 6:30 PM.png",
      date: "Monday, September 18, 2023 6:30 PM",
    },
    { file: "Sep 24, 2023 8:03 PM.png", date: "Sep 24, 2023 8:03 PM" },
    {
      file: "Monday, September 18, 2023 at 8:18 PM.JPG",
      date: "Monday, September 18, 2023 8:18 PM",
    },
    {
      file: "August 20, 2023 at 8:35 PM.png",
      date: "August 20, 2023 8:35 PM",
    },
    {
      file: "Friday, September 15, 2023 at 8:48 PM.png",
      date: "Friday, September 15, 2023 8:48 PM",
    },
    {
      file: "Sunday, September 17, 2023 at 9:18 PM.png",
      date: "Sunday, September 17, 2023 9:18 PM",
    },
  ]; //yeah let's just hardcode this for now cuz I can't figure out how to read a directory
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
        <ClockifyPanel />
      </div>
      {children}
    </main>
    // </div>
  );
}
