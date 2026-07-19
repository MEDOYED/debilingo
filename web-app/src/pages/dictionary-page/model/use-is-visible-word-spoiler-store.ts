import { create } from "zustand";

type Store = {
  isVisibleWord: boolean;

  toggleVisible: () => void;
};

export const useIsVisibleWordStore = create<Store>((set) => ({
  isVisibleWord: false,

  toggleVisible: () => {
    set((prev) => ({
      isVisibleWord: !prev.isVisibleWord,
    }));
  },
}));
