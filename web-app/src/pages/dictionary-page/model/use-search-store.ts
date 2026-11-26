import { create } from "zustand";

type SearchStore = {
  searchInputValue: string;

  setSearchInputValue: (newSearchInputValue: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchInputValue: "",

  setSearchInputValue: (newSearchInputValue) => {
    set({
      searchInputValue: newSearchInputValue,
    });
  },
}));
