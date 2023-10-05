export interface _SiteInfo {
  url: string;
  title: string;
  time: number;
  favicon?: string;
  tabId: number;
}
export interface SiteInfo extends _SiteInfo {
  randomId: string;
}

const isValidHttpUrl = (url: string) => {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (_) {
    return false;
  }

  return urlObj.protocol === "http:" || urlObj.protocol === "https:";
};

const validSiteInfo = (siteInfo: _SiteInfo) => {
  return (
    isValidHttpUrl(siteInfo.url) &&
    !!siteInfo.title &&
    siteInfo.time > 0 &&
    siteInfo.tabId > 0
  );
};

export const getRelativeTime = (timestamp: number) => {
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

export const processEntries = (
  history: [string, _SiteInfo][]
): SiteInfo[][] => {
  const historyRows = new Map<string, SiteInfo[]>();
  const seenIds = new Set();
  history.reverse();
  for (const [randomId, siteInfo] of history) {
    if (!validSiteInfo(siteInfo)) {
      // console.warn(`Invalid siteInfo obj: ${JSON.stringify(siteInfo)}`);
      continue;
    };
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