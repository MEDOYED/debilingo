import { MobileRootLayout } from "./mobile-root-layout/mobile-root-layout";
import { DesktopRootLayout } from "./desktop-root-layout/desktop-root-layout";

import { useDeviceType } from "@/shared/lib/hooks";

const RootLayout = () => {
  const {isMobile} = useDeviceType()
  return (
    <div>
      
      {isMobile ? <MobileRootLayout /> : <DesktopRootLayout /> }
    </div>
  );
};

export default RootLayout;
