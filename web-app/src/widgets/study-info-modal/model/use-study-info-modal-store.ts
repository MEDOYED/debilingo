import { create } from "zustand";

type Store = {
  xpCounter: number;
  timeCounter: number;

  increaseXpCounter: (xpDelta: number) => void;
  decreaseXpCounter: (xpDelta: number) => void;
  increaseTimeCounter: (timeDelta: number) => void;

  resetCounters: () => void;
};

export const useStudyInfoModalStore = create<Store>((set, get) => ({
  xpCounter: 0,
  timeCounter: 0,

  increaseXpCounter: (xpDelta) => {
    set((prev) => ({
      xpCounter: prev.xpCounter + xpDelta,
    }));
  },

  decreaseXpCounter: (xpDelta) => {
    const currentXpCounter = get().xpCounter;

    if (currentXpCounter === 0) return;

    set((prev) => ({
      xpCounter: prev.xpCounter - xpDelta,
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
