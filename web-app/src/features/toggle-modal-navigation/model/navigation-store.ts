import { create } from "zustand";

interface NavigationStore {
  isNavigationOpen: boolean;

  toggleIsNavigationOpen: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isNavigationOpen: false,

  toggleIsNavigationOpen: () => {
    set((prev) => ({
      isNavigationOpen: !prev.isNavigationOpen,
    }));
  },
}));
