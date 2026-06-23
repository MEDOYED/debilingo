import { create } from "zustand";

import type { Word } from "../types/word-types";

type Status = "opening" | "expanded" | "closing" | "unexpanded";

type WordStore = {
  openWordId: Word["id"] | null;
  setOpenWordId: (newId: Word["id"] | null) => void;

  status: Status;
  setStatus: (newStatus: Status) => void;

  swipedWordId: Word["id"] | null;
  setSwipedWordId: (newId: Word["id"] | null) => void;

  editableWordId: Word["id"] | null;
  setEditableWordId: (newId: Word["id"] | null) => void;
};

export const useWordStore = create<WordStore>((set) => ({
  openWordId: null,
  status: "unexpanded",
  swipedWordId: null,
  editableWordId: null,

  setOpenWordId: (newId) => {
    set({
      openWordId: newId,
    });
  },

  setStatus: (newStatus) => {
    set({
      status: newStatus,
    });
  },

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
