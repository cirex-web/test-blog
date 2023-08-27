"use client";

import Image from "next/image";
import css from "./index.module.css";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  limitToLast,
  off,
  onValue,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { memo, useEffect, useState } from "react";
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
interface InternalSiteInfo extends SiteInfo {
  randomId: string;
}
const processEntries = (
  history: [string, SiteInfo][]
): InternalSiteInfo[][] => {
  const historyRows = new Map<string, InternalSiteInfo[]>();
  const seenIds = new Set();
  history.reverse();
  for (const [randomId, siteInfo] of history) {
    const id = siteInfo.tabId + siteInfo.url + siteInfo.title;
    if (!seenIds.has(id)) {
      seenIds.add(id);
      historyRows.set(siteInfo.url, [
        ...(historyRows.get(siteInfo.url) ?? []),
        { ...siteInfo, randomId },
      ]);
    }
  }
  return Array.from(historyRows.values());
};
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

const Site = ({
  siteInfo,
  index,
  showFavicon,
}: {
  siteInfo: SiteInfo;
  index: number;
  showFavicon: boolean;
}) => {
  const replacementFavicon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${
    new URL(siteInfo.url).hostname
  }&size=256`;
  const [readableTime, setReadableTime] = useState("");
  const [imageSrc, setImageSrc] = useState(
    siteInfo.favicon || replacementFavicon
  );
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
    <div className={css.siteRow} style={{ animationDelay: index * 50 + "ms" }}>
      <div
        className={css.logo}
        style={{ visibility: showFavicon ? "inherit" : "hidden" }}
      >
        <Image
          src={imageSrc}
          alt=""
          width={25}
          height={25}
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
const SiteGroup = ({
  sites,
  index,
}: {
  sites: InternalSiteInfo[];
  index: number;
}) => {
  console.log("rerender of", sites[0].url);
  const moreThanOne = sites.length > 1;
  const [open, setOpen] = useState(false);
  return (
    <div className={css.siteGroup}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          transform: `rotate(${open ? "90deg" : 0})`,
          visibility: moreThanOne ? "visible" : "hidden",
          pointerEvents: moreThanOne ? "all" : "none",
          cursor: "pointer",
        }}
      >
        <Image src="/right-arrow.svg" alt="" height={30} width={30} />
      </div>
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        <Site
          siteInfo={sites[0]}
          index={index}
          showFavicon={true}
          key={sites[0].randomId}
        />
        <div style={{ display: open ? "block" : "none" }}>
          {sites.slice(1).map((site, _index) => (
            <Site
              siteInfo={site}
              index={index}
              showFavicon={false}
              key={site.randomId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BrowsingHistory = () => {
  const [browsingHistory, setBrowsingHistory] = useState<InternalSiteInfo[][]>(
    []
  );
  const [active, setActive] = useState(false);
  useEffect(() => {
    const database = getDatabase(initializeApp(firebaseConfig));
    const recentSitesRef = query(ref(database, "history"), limitToLast(200));

    const cancelCallback = onValue(
      recentSitesRef,
      (snapshot) => {
        if (!snapshot.exists) return;
        setActive(true);
        setBrowsingHistory(processEntries(Object.entries(snapshot.val())));
      },
      (error) => setActive(false)
    );

    return () => {
      cancelCallback();
      setActive(false);
    };
  }, []);

  return (
    <div className={css.browsingHistory}>
      <div className={css.browsingHistoryHeader}>
        <h3
          className={css.liveBox + " " + (active ? css.active : css.notActive)}
        >
          {active ? "Live" : "Not Connected"}
        </h3>
        <h2>Check out what I&apos;ve been browsing</h2>

        <h3>Because privacy doesn&apos;t exist anyways</h3>
      </div>
      <div className={css.siteData}>
        {browsingHistory.map((sites, index) => (
          <SiteGroup sites={sites} index={index} key={sites[0].url} />
        ))}
      </div>
    </div>
  );
};
