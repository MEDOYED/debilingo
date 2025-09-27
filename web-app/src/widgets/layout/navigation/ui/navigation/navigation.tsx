import DesktopNavigation from "../desktop-navigation/desktop-navigation";
import MobileNavigation from "../mobile-navigation/mobile-navigation";

import { useDeviceType } from "@/shared/lib/hooks";

const navigation = () => {
  const { isMobile } = useDeviceType();

  return <>{isMobile ? <MobileNavigation /> : <DesktopNavigation />}</>;
};

export default navigation;
