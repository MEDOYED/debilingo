import { createBrowserRouter } from "react-router-dom";

import { CatCatchPage } from "@pages/cat-catch-page";
import { CatCollectionPage } from "@pages/cat-collection-page";
import { CatMapPage } from "@pages/cat-map-page";
import { DictionariesPage } from "@pages/dictionaries-page";
import { DictionaryPage } from "@pages/dictionary-page";
import { HabitTrackerPage } from "@pages/habit-tracker-page";
import { HomePage } from "@pages/home-page";
import { LeaderboardsPage } from "@pages/leaderboards-page";
import { LoginPage } from "@pages/login-page";
import { MoneyEarning } from "@pages/money-earning";
import { RegisterPage } from "@pages/register-page";
import { TimeTrackerPage } from "@pages/time-tracker-page";
import { GamesPage } from "@pages/games-page";
import { GameQuizPage } from "@pages/game-quiz-page";
import { GameWordTypingPage } from "@pages/game-word-typing-page";
import { TrainingPage } from "@pages/training-page";

import { ProtectedRoute } from "./protected-router";
import RootLayout from "../layout/root-layout";

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
      {
        index: true,
        element: <HomePage />,
      },

      { path: "/dictionaries", element: <DictionariesPage /> },

      {
        path: "/games",
        element: <GamesPage />,
        children: [
          { path: "/quiz", element: <GameQuizPage /> },
          { path: "/word-typing", element: <GameWordTypingPage /> },
        ],
      },

      {
        path: "/dictionary/:dictId",
        element: <DictionaryPage />,
      },
      {
        path: "/training",
        element: <TrainingPage />,
      },
      {
        path: "/time-tracker",
        element: <TimeTrackerPage />,
      },
      {
        path: "/habit-tracker",
        element: <HabitTrackerPage />,
      },
      {
        path: "/leaderboards",
        element: <LeaderboardsPage />,
      },
      {
        path: "/money-earning",
        element: <MoneyEarning />,
      },
      {
        path: "/cats",
        element: <CatMapPage />,
      },
      {
        path: "/cats/map",
        element: <CatMapPage />,
      },
      {
        path: "/cats/catch",
        element: <CatCatchPage />,
      },
      {
        path: "/cats/collection",
        element: <CatCollectionPage />,
      },
    ],
  },
]);
