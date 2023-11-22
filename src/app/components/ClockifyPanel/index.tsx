"use client";

import { useEffect, useState } from "react";
import css from "./index.module.css";
import Image from "next/image";
interface Task {
  name: string;
  project?: {
    name: string;
    color: string;
  };
  tags: string[];
  task?: string;
  start?: string;
  end?: string;
}

const getDetailedEntryData = async (entryId: string): Promise<Task> => {
  const entryData = await fetch(
    process.env.NEXT_PUBLIC_CLOCKIFY_TIME_ENTRY_ENDPOINT! +
      entryId +
      "?hydrated=true",
    {
      headers: { "x-api-key": process.env.NEXT_PUBLIC_CLOCKIFY_API_KEY! },
      signal: AbortSignal.timeout(1000),
    }
  );
  const data: {
    description: string;
    project: null | { name: string; color: string };
    task: null | { name: string };
    timeInterval: {
      duration: null | string;
      end: null | string;
      start: null | string;
    };
    tags: {
      name: string;
    }[];
  } = await entryData.json();
  // console.log(data);
  return {
    name: !!data.description ? data.description : "No title",
    project: data.project
      ? {
          name: data.project?.name,
          color: data.project?.color,
        }
      : undefined,
    tags: data.tags
      .map((tagData) => tagData.name)
      .sort()
      .reverse(),
    task: data.task?.name,
    start: data?.timeInterval.start ?? undefined,
    end: data.timeInterval.end ?? undefined,
  };
};
const getTimeString = (ms: number) => {
  if (ms < 0) return "Negative time!";
  ms = Math.floor(ms / 1000);
  const s = (ms % 60).toString();
  ms = Math.floor(ms / 60);
  const m = (ms % 60).toString();
  ms = Math.floor(ms / 60);
  const h = ms.toString();
  let timeString = m.padStart(2, "0") + ":" + s.padStart(2, "0");
  if (h !== "0") {
    timeString = h.padStart(2, "0") + ":" + timeString;
  }
  return timeString;
};
export const ClockifyPanel = ({}) => {
  const [currentTaskData, setCurrentTaskData] = useState<Task>();
  const [stopwatchTime, setStopwatchTime] = useState<string>();
  // console.log(currentTaskData, stopwatchTime); //TODO: why is this being updated every time
  useEffect(() => {
    if (currentTaskData !== undefined) {
      if (currentTaskData.start === undefined)
        setStopwatchTime("Unknown start time");
      else if (currentTaskData.end !== undefined) {
        setStopwatchTime(
          getTimeString(
            +new Date(currentTaskData.end) - +new Date(currentTaskData.start)
          )
        );
      } else {
        const intervalId = setInterval(() => {
          setStopwatchTime(
            getTimeString(Date.now() - +new Date(currentTaskData.start!))
          );
        }, 100);
        return () => clearInterval(intervalId);
      }
    }
  }, [currentTaskData]);
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
          setCurrentTaskData(timeEntryInfo);
        }
      } catch (e) {
        console.log(e);
        //ignored (likely timeout)
      }
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={css.container}>
      <div className={css.dataContainer}>
        {currentTaskData === undefined ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h2 className={css.currentTask}>
              {currentTaskData.end === undefined
                ? "Currently doing"
                : "Last worked on"}
            </h2>
            <h2 className={css.taskTitle}>{currentTaskData.name}</h2>
            {currentTaskData.project && (
              <h2 className={css.taskData}>
                <span
                  className={css.projectColor}
                  style={{ backgroundColor: currentTaskData.project.color }}
                ></span>
                <span>
                  {currentTaskData.project.name +
                    (currentTaskData.task ? " - " + currentTaskData.task : "")}
                </span>
              </h2>
            )}
            <h2 className={css.taskData}>
              <Image src={"/timer.svg"} alt="time" width={25} height={25} />
              <span>{stopwatchTime}</span>
            </h2>
            {currentTaskData.tags.length > 0 && (
              <h2 className={css.taskData}>
                <Image
                  src={"/location.svg"}
                  alt="location"
                  width={25}
                  height={25}
                />
                <span>{currentTaskData.tags.join(", ")}</span>
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};
