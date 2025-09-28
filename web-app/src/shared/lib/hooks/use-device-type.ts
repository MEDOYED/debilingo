import { useEffect, useState } from "react";

import { BREAKPOINTS } from "@/shared/lib/constants";

export const useDeviceType = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // small delay on change orientation (for example: rotation iPad from portrait to landscape)
    const handleOrientationChange = () => {
      setTimeout(handleResize, 100);
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  // 0px - 1023px
  const isMobile = width <= BREAKPOINTS.TABLET_PORTRAIT_MAX;

  // 768px - 1023px
  const isTabletPortrait =
    width >= BREAKPOINTS.TABLET_PORTRAIT_MIN &&
    width <= BREAKPOINTS.TABLET_PORTRAIT_MAX;

  // 1024px - 1279px
  const isTabletLandscape =
    width > BREAKPOINTS.TABLET_PORTRAIT_MAX &&
    width <= BREAKPOINTS.TABLET_LANDSCAPE_MAX;

  //1024px amd more
  const isDesktop = width >= BREAKPOINTS.TABLET_LANDSCAPE_MIN;

  return {
    isMobile,
    isTabletPortrait,
    isTabletLandscape,
    isDesktop,
    width,
    height,
  };
};
