"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

function getMostRecentImage(imageDates: string[]) {
  const curTime = [new Date().getHours(), new Date().getMinutes()];
  console.log(imageDates);
  let lo = 0,
    hi = imageDates.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const imageDate = new Date(imageDates[mid]);
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

export const ProfilePic = ({ pictures }: { pictures: string[] }) => {
  const [currentImageDate, setCurrentImageDate] = useState<string>();
  useLayoutEffect(
    () => setCurrentImageDate(getMostRecentImage(pictures)),
    [pictures]
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageDate(getMostRecentImage(pictures));
    }, 10000);
    return () => clearInterval(intervalId);
  }, [pictures]);
  return (
    <div>
      <Image
        src={
          "/pfp/" + (currentImageDate ? currentImageDate + ".png" : "blank.png")
        }
        alt=""
        className={styles.titlePic}
        width={500}
        height={500}
      />

      <h3 className={styles.titlePicSubtitle}>
        {currentImageDate
          ? `Taken at
          ${new Date(currentImageDate).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
          : "Loading most recent..."}
      </h3>
    </div>
  );
};
