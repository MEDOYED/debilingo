import { create } from "zustand";

type UnshuffleStore = {
  unshuffleVersion: number;
  triggerUnshuffleVersion: () => void;
};

export const useUnshuffleStore = create<UnshuffleStore>((set) => ({
  unshuffleVersion: 0,

  triggerUnshuffleVersion: () =>
    set((state) => ({ unshuffleVersion: state.unshuffleVersion + 1 })),
}));
