import { Outlet } from "react-router-dom";

import { Navigation } from "@/widgets/navigation";

export const MobileRootLayout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  );
};
