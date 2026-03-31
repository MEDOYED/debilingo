import { Outlet } from "react-router-dom";

import { Navigation } from "@app/ui/mobile-bottom-bar";

export const MobileRootLayout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  );
};
