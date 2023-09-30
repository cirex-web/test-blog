import React, { useLayoutEffect, useRef } from "react";
import { usePrev } from "@/app/utils/usePrev";

const animateHeight = async (
  open: boolean,
  closedHeight: number,
  containerRef: React.RefObject<HTMLElement>
) => {
  if (!containerRef.current) return;

  const animation = containerRef.current.animate(
    [
      {
        height: closedHeight + "px",
        visibility: closedHeight > 0 ? "visible" : "hidden",
      },
      {
        height: containerRef.current.scrollHeight + "px",
        visibility: "visible",
      },
    ],
    {
      duration: 200,
      easing: "ease-in-out",
      direction: open ? "normal" : "reverse",
      fill: "forwards",
    }
  );
  await animation.finished;
  animation.commitStyles();
  if (open) {
    containerRef.current.style.height = "auto"; //we set it to auto so the height can adjust to children height changes
  }
  animation.cancel();
};

export const Collapse = ({
  children,
  open,
  closedHeight = 0,
  className
}: {
  children: React.ReactNode;
  open: boolean;
  closedHeight?: number;
  className?:string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevOpen = usePrev(open);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (prevOpen !== open) {
      animateHeight(open, closedHeight, containerRef);
    } else {
      //set some defaults - this is the first render
      containerRef.current.style.height = open ? "auto" : closedHeight + "px";
      containerRef.current.style.visibility =
        open || closedHeight > 0 ? "initial" : "hidden";
    }
  }, [open, prevOpen, closedHeight]); //these two should change at the same time
  return (
    <div ref={containerRef} style={{ overflow: "hidden" }} className={className}>
      {children}
    </div>
  );
};
