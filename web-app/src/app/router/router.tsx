import { createBrowserRouter } from "react-router-dom";

import { DictionaryPage } from "@/pages/dictionary-page";
import { HomePage } from "@/pages/home-page";
import { RatingPage } from "@/pages/rating-page";
import { TrainingPage } from "@/pages/training-page";
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
        path: "/dictionary",
        element: <DictionaryPage />,
      },
      {
        path: "/training",
        element: <TrainingPage />,
      },
      {
        path: "/rating",
        element: <RatingPage />,
      },
    ],
  },
]);
