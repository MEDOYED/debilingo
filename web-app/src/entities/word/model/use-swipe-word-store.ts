import { create } from "zustand";

type SwipeWordStore = {
  shiftX: number;
  setShiftX: (newShiftX: number) => void;
};

export const useSwipeWordStore = create<SwipeWordStore>((set) => ({
  shiftX: 0,

  setShiftX: (newShiftX) => {
    set({
      shiftX: newShiftX,
    });
  },
}));
