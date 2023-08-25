"use client";

import Image from "next/image";
import css from "./index.module.css";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
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

const Site = ({ siteInfo }: { siteInfo: SiteInfo }) => {
  const [readableTime, setReadableTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(
      () => setReadableTime(getRelativeTime(siteInfo.time)),
      100
    );
    return () => clearInterval(intervalId);
  }, [siteInfo.time]);
  return (
    <div className={css.siteRow}>
      <div className={css.logo}>
        <img
          src={
            siteInfo.favicon ??
            `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${
              new URL(siteInfo.url).hostname
            }&size=256`
          }
          alt=""
          width={20}
          height={20}
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
  const [browsingHistory, setBrowsingHistory] = useState<SiteInfo[]>([]);
  useEffect(() => {
    const database = getDatabase(initializeApp(firebaseConfig));

    onValue(ref(database, "history"), (snapshot) => {
      const history = Object.values(snapshot.val()).reverse() as SiteInfo[];
      const filteredHistory = [];
      const seenIds = new Set();
      for (const siteInfo of history) {
        const id = siteInfo.tabId + siteInfo.url;
        if (!seenIds.has(id)) {
          seenIds.add(id);
          filteredHistory.push(siteInfo);
          if (filteredHistory.length > 12) break;
        }
      }
      setBrowsingHistory(filteredHistory);
    });
  }, []);
  return (
    <div className={css.browsingHistory}>
      <div>
        <h2>Check out what I&apos;ve been browsing</h2>
        <h3>Because privacy doesn&apos;t exist anyways</h3>
      </div>
      <div className={css.siteData}>
        {browsingHistory.map((site, index) => (
          <Site siteInfo={site} key={index} />
        ))}
      </div>
    </div>
  );
};
