import { Outlet } from "react-router-dom";

import { Navigation } from "@/widgets/layout/navigation";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  );
};

export default RootLayout;
