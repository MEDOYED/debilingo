import { create } from "zustand";

import type { Word } from "@shared/api/wordApi";

type Store = {
  swipedWordId: Word["id"];

  setSwipedWordId: (newId: Word["id"]) => void;
};

export const useSwipeWordCardStore = create<Store>((set) => ({
  swipedWordId: "",

  setSwipedWordId: (newId) => {
    set({
      swipedWordId: newId,
    });
  },
}));
