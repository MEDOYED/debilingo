import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "@/pages/home-page";
import { ProfilePage } from "@/pages/profile-page";
import RootLayout from "../layout/root-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
