import { createBrowserRouter, Navigate } from "react-router-dom";

import { DictionaryPage } from "@pages/dictionary-page";
import { HomePage } from "@pages/home-page";
import { LoginPage } from "@pages/login-page";
import { RatingPage } from "@pages/rating-page";
import { RegisterPage } from "@pages/register-page";
import { TrainingPage } from "@pages/training-page";

import RootLayout from "../layout/root-layout";
// import { ProtectedRoute } from "./protected-route";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "/dictionary/:dictId", element: <DictionaryPage /> },
      // { path: "/dictionary", element: <DictionaryPage /> },
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
