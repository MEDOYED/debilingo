import { create } from "zustand";

type Store = {
  isReversed: boolean;

  toggleReverse: () => void;
};

export const useSwitchColStore = create<Store>((set) => ({
  isReversed: false,

  toggleReverse: () => {
    set((col) => ({
      isReversed: !col.isReversed,
    }));
  },
}));
