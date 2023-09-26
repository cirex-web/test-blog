"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { BrowsingHistory } from "./components/BrowsingHistory";
import { getImageName, images } from "./images";
import { useEffect, useLayoutEffect, useState } from "react";

function getMostRecentImage() {
  const curTime = [new Date().getHours(), new Date().getMinutes()];
  let lo = 0,
    hi = images.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const imageDate = new Date(images[mid].date);
    const imageTime = [imageDate.getHours(), imageDate.getMinutes()];
    if (
      imageTime[0] < curTime[0] ||
      (imageTime[0] == curTime[0] && imageTime[1] <= curTime[1])
    ) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  console.assert(lo === hi);
  return images[lo === 0 ? images.length - 1 : lo - 1];
}

export default function Home() {
  const [currentImageDate, setCurrentImageDate] = useState<string>();
  useLayoutEffect(() => setCurrentImageDate(getMostRecentImage().date), []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageDate(getMostRecentImage().date);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <div>
          <Image
            src={
              currentImageDate ? getImageName(currentImageDate) : "/blank.png"
            }
            alt=""
            className={styles.titlePic}
            width={500}
            height={500}
          />
          {currentImageDate && (
            <h3 className={styles.titlePicSubtitle}>
              Taken at{" "}
              {new Date(currentImageDate).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h3>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: "50px" }}>Hi! I&apos;m</h2>
          <h1>Eric Xu</h1>
          <h2>CMU SCS &apos;27</h2>
        </div>
        {/* <div className={styles.titlePicContainer}> */}
        {/* </div> */}
      </div>
      <BrowsingHistory />
    </main>
  );
}
