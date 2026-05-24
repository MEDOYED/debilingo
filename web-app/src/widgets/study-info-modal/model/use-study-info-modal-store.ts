import { create } from "zustand";

type Store = {
  xpCounter: number;
  timeCounter: number;

  increaseXpCounter: (xpDelta: number) => void;
  increaseTimeCounter: (timeDelta: number) => void;

  resetCounters: () => void;
};

export const useStudyInfoModalStore = create<Store>((set) => ({
  xpCounter: 0,
  timeCounter: 0,

  increaseXpCounter: (xpDelta) => {
    set((prev) => ({
      xpCounter: prev.xpCounter + xpDelta,
    }));
  },

  increaseTimeCounter: (timeDelta) => {
    set((prev) => ({
      timeCounter: prev.timeCounter + timeDelta,
    }));
  },

  resetCounters: () => {
    set(() => ({
      xpCounter: 0,
      timeCounter: 0,
      isReadyToSendData: false,
    }));
  },
}));
