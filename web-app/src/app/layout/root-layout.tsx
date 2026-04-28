import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { DesktopNavigation } from "../ui/desktop-navigation/desktop-navigation";
// import { DesktopNavigation } from "@app/ui/desktop-navigation/desktop-navigation";
import { MobileBottomBar } from "@app/ui/mobile-bottom-bar/ui/mobile-bottom-bar";

import { useProfileStore } from "@entities/profile";
import { useDeviceType } from "@shared/lib/hooks";

import s from "./root-layout.module.scss";

const RootLayout = () => {
  const { isMobile } = useDeviceType();

  const { loadProfile } = useProfileStore();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div>
      {!isMobile && <DesktopNavigation />}
      <div className={s.outlet}>
        <Outlet />
      </div>
      {isMobile && <MobileBottomBar />}
    </div>
  );
};

export default RootLayout;
