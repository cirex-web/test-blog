"use client";

import Image from "next/image";
import css from "./index.module.css";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  limitToLast,
  onValue,
  query,
  ref,
} from "firebase/database";
import { memo, useEffect, useRef, useState } from "react";
import { time } from "console";
import { Transition } from "react-transition-group";
import { Collapse } from "../Collapse";
import { SiteInfo, getRelativeTime, processEntries } from "./util";

const firebaseConfig = {
  apiKey: "AIzaSyAuCdQRwLUxIeYFIM7MDXvEBKMR1vWScSc",
  authDomain: "cirex-dev.firebaseapp.com",
  databaseURL: "https://cirex-dev-default-rtdb.firebaseio.com",
  projectId: "cirex-dev",
  storageBucket: "cirex-dev.appspot.com",
  messagingSenderId: "44256460155",
  appId: "1:44256460155:web:b4af3f81d0277622be51de",
};
const protectedSites = ["github.com", "slack.com", "app.slack.com"];
const shouldShowTitle = (siteInfo: SiteInfo) => {
  const url = new URL(siteInfo.url);
  return !protectedSites.includes(url.hostname);
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

  const itemRef = useRef<HTMLDivElement>(null);

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
    <Transition
      nodeRef={itemRef}
      in={true}
      timeout={(index + 1) * 50}
      appear={true}
    >
      {(state) => (
        <div
          className={css.siteRow + " " + (state === "entered" && css.shown)}
          ref={itemRef}
        >
          <div
            className={css.logo}
            style={{ visibility: showFavicon ? "inherit" : "hidden" }}
          >
            <img
              src={imageSrc}
              alt=""
              width={30}
              height={30}
              onError={(img) =>
                setImageSrc(
                  imageSrc === replacementFavicon
                    ? "/default-favicon.png"
                    : replacementFavicon
                )
              }
            />
          </div>
          <h3 className={css.siteTitle}>
            <a href={siteInfo.url}>
              {shouldShowTitle(siteInfo) ? siteInfo.title : siteInfo.url}
            </a>
          </h3>
          <small className={css.siteMetadata}>{readableTime}</small>
        </div>
      )}
    </Transition>
  );
};
const SiteGroup = ({ sites, index }: { sites: SiteInfo[]; index: number }) => {
  const moreThanOne = sites.length > 1;
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  if (!sites.length) return;

  return (
    <div className={css.siteGroup}>
      <Transition
        in={true}
        appear={true}
        nodeRef={iconRef}
        timeout={(index + 1) * 50}
      >
        {(state) => (
          <div
            onClick={() => setOpen(!open)}
            className={
              css.siteGroupArrow + " " + (state === "entered" && css.shown)
            }
            style={{
              transform: `rotate(${open ? "90deg" : 0})`,
              visibility: moreThanOne ? "visible" : "hidden",
              pointerEvents: moreThanOne ? "all" : "none",
            }}
            ref={iconRef}
          >
            <Image src="/right-arrow.svg" alt="" height={25} width={25} />
          </div>
        )}
      </Transition>
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        <Site
          siteInfo={sites[0]}
          index={index}
          showFavicon={true}
          key={sites[0].randomId}
        />
        <Collapse open={open} className={css.siteGroupData}>
          {sites.slice(1).map((site, _index) => (
            <Site
              siteInfo={site}
              index={index}
              showFavicon={false}
              key={site.randomId}
            />
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export const BrowsingHistory = () => {
  const [browsingHistory, setBrowsingHistory] = useState<SiteInfo[][]>([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const database = getDatabase(initializeApp(firebaseConfig));
    const recentSitesRef = query(ref(database, "history"), limitToLast(400));

    const cancelCallback = onValue(
      recentSitesRef,
      (snapshot) => {
        if (!snapshot.exists) return;
        setBrowsingHistory(processEntries(Object.entries(snapshot.val())));
        setActive(true);
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

        <h3>
          Get a glimpse (or maybe a bit more than that) into my online life
        </h3>
      </div>
      <div className={css.siteData}>
        {browsingHistory.map((sites, index) => (
          <SiteGroup sites={sites} index={index} key={sites[0].url} />
        ))}
      </div>
    </div>
  );
};
