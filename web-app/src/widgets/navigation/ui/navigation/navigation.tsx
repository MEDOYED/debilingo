import { DesktopNavigation } from "../desktop-navigation/desktop-navigation";
import { MobileNavigation } from "../mobile-navigation/mobile-navigation";

import { useDeviceType } from "@shared/lib/hooks";
// import { useWindowSize } from "@shared/lib/responsive";

export const Navigation = () => {
  const { isMobile } = useDeviceType();
  // const {windowWidth} = useWindowSize()

  return <>{isMobile ? <MobileNavigation /> : <DesktopNavigation />}</>;
};
