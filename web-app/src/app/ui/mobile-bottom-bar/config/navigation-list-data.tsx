import { Clock, DictionaryAdd, Home, Trophy } from "@shared/ui/icons";
// import { Gamepad } from "@shared/ui/icons";

import type { IconProps } from "@shared/types";

interface NavigationItem {
  to: string;
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const NAV_ITEMS: NavigationItem[] = [
  {
    to: "/",
    Icon: Home,
    label: "Home page",
  },
  {
    to: "/dictionary",
    Icon: DictionaryAdd,
    label: "Dictionary page",
  },
  {
    to: "/time-tracker",
    Icon: Clock,
    label: "Time tracker page",
  },
  {
    to: "/leaderboards",
    Icon: Trophy,
    label: "Rating page",
  },
];
