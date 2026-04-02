import { DictionaryAdd, Gamepad, Home, Trophy } from "@shared/ui/icons";

import type { IconProps } from "@shared/types";

interface NavigationItem {
  to: string;
  Icon: React.ComponentType<IconProps>;
  label: string;
}

export const navigationListData: NavigationItem[] = [
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
    to: "/training",
    Icon: Gamepad,
    label: "Training page",
  },

  {
    to: "/rating",
    Icon: Trophy,
    label: "Rating page",
  },
];
