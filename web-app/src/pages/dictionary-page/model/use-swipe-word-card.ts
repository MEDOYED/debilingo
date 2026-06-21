import { create } from "zustand";

import type { Word } from "@shared/api/wordApi";

type Store = {
  swipedWordId: Word["id"];
  setSwipedWordId: (newId: Word["id"]) => void;

  editableWordId: Word["id"];
  setEditableWordId: (newId: Word["id"]) => void;
};

export const useSwipeWordCardStore = create<Store>((set) => ({
  swipedWordId: "",
  editableWordId: "",

  setSwipedWordId: (newId) => {
    set({
      swipedWordId: newId,
    });
  },

  setEditableWordId: (newId) => {
    set({
      editableWordId: newId,
    });
  },
}));
