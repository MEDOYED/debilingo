import { create } from "zustand";

type ShuffleStore = {
  shuffleVersion: number;

  isShuffled: boolean;

  triggerShuffleVersion: () => void;
  setIsShuffled: (newValue: boolean) => void;
};

export const useShuffleStore = create<ShuffleStore>((set) => ({
  shuffleVersion: 0,
  isShuffled: false,

  triggerShuffleVersion: () =>
    set((state) => ({ shuffleVersion: state.shuffleVersion + 1 })),

  setIsShuffled: (newValue) => {
    set({ isShuffled: newValue });
  },
}));
