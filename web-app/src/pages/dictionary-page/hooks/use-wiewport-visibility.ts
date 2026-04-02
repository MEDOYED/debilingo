import { useEffect, useState } from "react";

import type { RefObject } from "react";

/**
 * Hook to detect if an element is visible in the viewport
 * Uses IntersectionObserver with configurable options
 *
 * @param ref - React ref to the element to observe
 * @param options - IntersectionObserver options (optional)
 * @returns boolean indicating if element is visible
 */
export const useViewportVisibility = (
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Default options: trigger when element enters viewport with 100px buffer
    const observerOptions: IntersectionObserverInit = {
      threshold: 0,
      rootMargin: "100px",
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);
  return isVisible;
};
