"use client";

import Image from "next/image";
import css from "./index.module.css";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  limitToLast,
  onValue,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { time } from "console";

const firebaseConfig = {
  apiKey: "AIzaSyAuCdQRwLUxIeYFIM7MDXvEBKMR1vWScSc",
  authDomain: "cirex-dev.firebaseapp.com",
  databaseURL: "https://cirex-dev-default-rtdb.firebaseio.com",
  projectId: "cirex-dev",
  storageBucket: "cirex-dev.appspot.com",
  messagingSenderId: "44256460155",
  appId: "1:44256460155:web:b4af3f81d0277622be51de",
};

// Initialize Firebase
interface SiteInfo {
  url: string;
  title: string;
  time: number;
  favicon?: string;
  tabId: number;
}

const getRelativeTime = (timestamp: number) => {
  let timeSinceThen = Date.now() - timestamp;
  const seconds = Math.floor(timeSinceThen / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days !== 0) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (hours !== 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (minutes !== 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (seconds !== 0) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  return "Just Now";
};

const Site = ({ siteInfo, index }: { siteInfo: SiteInfo; index: number }) => {
  const replacementFavicon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${
    new URL(siteInfo.url).hostname
  }&size=256`;
  const [readableTime, setReadableTime] = useState("");
  const [imageSrc, setImageSrc] = useState(
    siteInfo.favicon || replacementFavicon
  );
  console.log(siteInfo, readableTime, imageSrc);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setReadableTime(
          getRelativeTime(Math.floor(siteInfo.time / 1000) * 1000)
        ),
      50
    );
    return () => clearInterval(intervalId);
  }, [siteInfo.time]);
  return (
    <div className={css.siteRow} style={{ animationDelay: index * 10 + "ms" }}>
      <div className={css.logo}>
        <Image
          src={imageSrc}
          alt=""
          width={20}
          height={20}
          onError={(img) =>
            setImageSrc(
              imageSrc === replacementFavicon
                ? "/default-favicon.png"
                : replacementFavicon
            )
          }
        />
      </div>
      <span className={css.siteTitle}>
        <a href={siteInfo.url}>{siteInfo.title}</a>
      </span>
      <span className={css.siteMetadata}>{readableTime}</span>
    </div>
  );
};

export const BrowsingHistory = () => {
  const [browsingHistory, setBrowsingHistory] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const database = getDatabase(initializeApp(firebaseConfig));
    const recentSitesRef = query(ref(database, "history"), limitToLast(200));

    onValue(recentSitesRef, (snapshot) => {
      const historyRows: React.ReactNode[] = [];
      if (!snapshot.exists) return;
      const seenIds = new Set();
      let index = 0;
      const entries = snapshot.val();
      for (const [randomId, siteInfo] of Object.entries(entries).reverse() as [
        string,
        SiteInfo
      ][]) {
        const id = siteInfo.tabId + siteInfo.url;
        if (!seenIds.has(id) && historyRows.length <= 12) {
          seenIds.add(id);
          historyRows.push(
            <Site siteInfo={siteInfo} key={randomId} index={index++} />
          );
        }
      }

      setBrowsingHistory(historyRows);
    });
  }, []);
  return (
    <div className={css.browsingHistory}>
      <div>
        <h2>Check out what I&apos;ve been browsing</h2>
        <h3>Because privacy doesn&apos;t exist anyways</h3>
      </div>
      <div className={css.siteData}>{browsingHistory}</div>
    </div>
  );
};
