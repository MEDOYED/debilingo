import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <header>header</header>
    </div>
  );
};

export default RootLayout;
