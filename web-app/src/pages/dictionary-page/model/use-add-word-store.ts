import { create } from "zustand";

type Store = {
  isOpenCardCreateWord: boolean;

  mainLanguageWord: string;
  Translation: string;

  toggleIsOpenCardCreateWord: () => void;
  closeCardCreateWord: () => void;
  openCardCreateWord: () => void;

  setMainLanguageWord: (mainLanguageWordValue: string) => void;
  setTranslation: (TranslationValue: string) => void;

  resetFields: () => void;
};

export const useAddWordStore = create<Store>((set) => ({
  isOpenCardCreateWord: false,
  mainLanguageWord: "",
  Translation: "",

  toggleIsOpenCardCreateWord: () => {
    set((prev) => ({
      isOpenCardCreateWord: !prev.isOpenCardCreateWord,
    }));
  },

  closeCardCreateWord: () => {
    set(() => ({
      isOpenCardCreateWord: false,
    }));
  },

  openCardCreateWord: () => {
    set(() => ({
      isOpenCardCreateWord: true,
    }));
  },

  setMainLanguageWord: (mainLanguageWordValue) => {
    set({
      mainLanguageWord: mainLanguageWordValue,
    });
  },

  setTranslation: (TranslationValue) => {
    set({
      Translation: TranslationValue,
    });
  },

  resetFields: () => {
    set({
      mainLanguageWord: "",
      Translation: "",
    });
  },
}));
