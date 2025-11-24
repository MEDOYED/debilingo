import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

import type { ReactNode } from "react";

interface NavigationItem {
  to: string;
  icon: ReactNode;
  label: string;
}

export const navigationListData: NavigationItem[] = [
  {
    to: "/dictionary",
    icon: <DictionaryAdd color="var(--color-300)" />,
    label: "Dictionary page",
  },
  {
    to: "/training",
    icon: <Gamepad color="var(--color-300)" />,
    label: "Training page",
  },
  {
    to: "/",
    icon: <Home color="var(--color-300)" />,
    label: "Home page",
  },
  {
    to: "/rating",
    icon: <Trophy color="var(--color-300)" />,
    label: "Rating page",
  },
];
