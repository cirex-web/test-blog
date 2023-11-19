"use client";

import { useEffect } from "react";

const getDetailedEntryData = async (entryId: string) => {
  const entryData = await fetch(
    process.env.NEXT_PUBLIC_CLOCKIFY_TIME_ENTRY_ENDPOINT! +
      entryId +
      "?hydrated=true",
    {
      headers: { "x-api-key": process.env.NEXT_PUBLIC_CLOCKIFY_API_KEY! },
      signal: AbortSignal.timeout(1000),
    }
  );
  const data = await entryData.json();
  return {
    name: data.description,
    project: data?.project?.name,
    // tags:data.tags.map(tagData=>tagData),//TODO:
    task: data?.task?.name,
    ongoing: data?.timeInterval?.end == null,
  };
};

export const ClockifyPanel = ({}) => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const data = await fetch(process.env.NEXT_PUBLIC_CLOCKIFY_ENDPOINT!, {
          headers: { "x-api-key": process.env.NEXT_PUBLIC_CLOCKIFY_API_KEY! },
          signal: AbortSignal.timeout(1000),
        });
        const entryId = (await data.json())[0].id;
        if (!!entryId) {
          const timeEntryInfo = await getDetailedEntryData(entryId);
          console.log(timeEntryInfo);
        }
      } catch (e) {
        console.log(e);
        //ignored (likely timeout)
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <h3>Currently working on: </h3>
    </div>
  );
};
