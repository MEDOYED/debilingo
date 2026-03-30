import { create } from "zustand";

import type { Dictionary } from "@shared/api/dictionaryApi";

type Store = {
  dictionaries: Dictionary[];

  setDictionaries: (newDictionariesValue: Dictionary[]) => void;
};

export const useDictionariesStore = create<Store>((set) => ({
  dictionaries: [],

  setDictionaries: (newDictionariesValue) => {
    set({
      dictionaries: newDictionariesValue,
    });
  },
}));
