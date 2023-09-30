import { useRef, useEffect } from "react";

export const usePrev = <T,>(state: T) => {
  const prevRef = useRef(state);
  useEffect(() => {
    prevRef.current = state;
  }, [state]);
  return prevRef.current;
}