import { create } from "zustand";

type Store = {
  isMainLanguageColVisible: boolean;
  isTranslationColVisible: boolean;

  toggleIsMainLanguageColVisible: () => void;
  hideMainLanguageCol: () => void;
  openMainLanguageCol: () => void;

  toggleIsTranslationColVisible: () => void;
  hideTranslationCol: () => void;
  openTranslationCol: () => void;
};

export const useLanguageRowStore = create<Store>((set) => ({
  isMainLanguageColVisible: true,
  isTranslationColVisible: true,

  toggleIsMainLanguageColVisible: () => {
    set((prev) => ({
      isMainLanguageColVisible: !prev.isMainLanguageColVisible,
    }));
  },

  hideMainLanguageCol: () => {
    set(() => ({
      isMainLanguageColVisible: false,
    }));
  },

  openMainLanguageCol: () => {
    set(() => ({
      isMainLanguageColVisible: true,
    }));
  },

  toggleIsTranslationColVisible: () => {
    set((prev) => ({
      isMainLanguageColVisible: !prev.isMainLanguageColVisible,
    }));
  },

  hideTranslationCol: () => {
    set(() => ({
      isMainLanguageColVisible: false,
    }));
  },

  openTranslationCol: () => {
    set(() => ({
      isMainLanguageColVisible: true,
    }));
  },
}));
