"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
export interface picture {
  date: Date;
  file: string;
}
function getMostRecentImage(imageDates: picture[]) {
  const curTime = [new Date().getHours(), new Date().getMinutes()];
  let lo = 0,
    hi = imageDates.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const imageDate = imageDates[mid].date;
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
  return imageDates[lo === 0 ? imageDates.length - 1 : lo - 1];
}

export const ProfilePic = ({ pictures }: { pictures: picture[] }) => {
  console.log(pictures);
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
          ${currentImage.date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
          : "Loading most recent..."}
      </h3>
    </div>
  );
};
