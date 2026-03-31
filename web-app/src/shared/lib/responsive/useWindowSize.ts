import { useCallback, useEffect, useRef, useState } from "react";

interface UseWindowSizeOptions {
  debounceMs?: number;
}

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
}

export const useWindowSize = ({
  debounceMs = 100,
}: UseWindowSizeOptions = {}): WindowSize => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  const timeoutRef = useRef<number | null>(null);

  const updateSize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  const debouncedUpdate = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(updateSize, debounceMs);
  }, [debounceMs, updateSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    updateSize(); // початкове значення

    const handler = debounceMs > 0 ? debouncedUpdate : updateSize;
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [debounceMs, debouncedUpdate, updateSize]);

  return { windowWidth, windowHeight };
};
