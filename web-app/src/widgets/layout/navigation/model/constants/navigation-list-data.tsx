import { DictionaryAdd, Gamepad, Home, Trophy } from "@/shared/ui/icons";

import type { IconProps } from "@/shared/types";
import type { ComponentType } from "react";

interface NavigationItem {
  to: string;
  icon: ComponentType<IconProps>;
  label: string;
}

export const navigationListData: NavigationItem[] = [
  {
    to: "/dictionary",
    icon: DictionaryAdd,
    label: "Dictionary page",
  },
  {
    to: "/training",
    icon: Gamepad,
    label: "Training page",
  },
  {
    to: "/",
    icon: Home,
    label: "Home page",
  },
  {
    to: "/rating",
    icon: Trophy,
    label: "Rating page",
  },
];
