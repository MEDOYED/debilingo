import { create } from "zustand";

type ShuffleStore = {
  shuffleVersion: number;
  triggerShuffleVersion: () => void;
};

export const useShuffleStore = create<ShuffleStore>((set) => ({
  shuffleVersion: 0,
  triggerShuffleVersion: () =>
    set((state) => ({ shuffleVersion: state.shuffleVersion + 1 })),
}));
