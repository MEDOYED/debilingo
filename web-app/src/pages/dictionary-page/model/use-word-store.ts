import { create } from "zustand";

import type { Word } from "@shared/api/wordApi";

type Status = "opening" | "expanded" | "closing" | "unexpanded";

type WordStore = {
  openWordId: Word["id"] | null;
  setOpenWordId: (newId: Word["id"] | null) => void;

  status: Status;
  setStatus: (newStatus: Status) => void;
};

export const useWordStore = create<WordStore>((set) => ({
  openWordId: null,
  status: "unexpanded",

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
}));
