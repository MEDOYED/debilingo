import { create } from "zustand";

import { getDictionaries, type Dictionary } from "@entities/dictionary";

type Store = {
  dictionaries: Dictionary[];

  setDictionaries: (newDictionariesValue: Dictionary[]) => void;
  fetchDictionaries: () => Promise<void>;
};

export const useDictionariesStore = create<Store>((set, get) => ({
  dictionaries: [],

  setDictionaries: (newDictionariesValue) => {
    set({
      dictionaries: newDictionariesValue,
    });
  },

  fetchDictionaries: async () => {
    if (get().dictionaries.length !== 0) return;

    const response = await getDictionaries();

    get().setDictionaries(response);
  },
}));
