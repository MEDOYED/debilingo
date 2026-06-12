import { create } from "zustand";

import type { LeaderboardsNavItems } from "./types";

type Store = {
  activeNavItem: LeaderboardsNavItems;

  setActiveNavItem: (newNavItemValue: LeaderboardsNavItems) => void;
};

export const useLeaderboardsNavigationStore = create<Store>((set) => ({
  activeNavItem: "totalXp",

  setActiveNavItem: (newNavItemValue) => {
    set({
      activeNavItem: newNavItemValue,
    });
  },
}));
