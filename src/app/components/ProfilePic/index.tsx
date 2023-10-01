"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
export interface picture {
  date: string;
  file: string;
}
function getMostRecentImage(imageDates: picture[]) {
  const curTime = new Date().getHours() * 60 + new Date().getMinutes();
  let lo = 0,
    hi = imageDates.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const imageDate = new Date(imageDates[mid].date); //so relative to current timezone (not nextjs server time)
    const imageTime = imageDate.getHours() * 60 + imageDate.getMinutes();
    if (imageTime <= curTime) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  console.assert(lo === hi);
  return imageDates[lo === 0 ? imageDates.length - 1 : lo - 1];
}

export const ProfilePic = ({ pictures }: { pictures: picture[] }) => {
  const [currentImage, setCurrentImage] = useState<picture>();
  useLayoutEffect(
    () => setCurrentImage(getMostRecentImage(pictures)),
    [pictures]
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(getMostRecentImage(pictures));
    }, 10000);
    return () => clearInterval(intervalId);
  }, [pictures]);
  return (
    <div>
      <Image
        src={"/pfp/" + (currentImage ? currentImage.file : "blank.png")}
        alt=""
        className={styles.titlePic}
        width={500}
        height={500}
      />

      <h3 className={styles.titlePicSubtitle}>
        {currentImage
          ? `Taken at
          ${new Date(currentImage.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
          : "Loading most recent..."}
      </h3>
    </div>
  );
};
