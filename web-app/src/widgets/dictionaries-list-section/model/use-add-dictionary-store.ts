import { create } from "zustand";

type Store = {
  isOpenCardCreateDictionary: boolean;
  mainLanguage: string;
  secondaryLanguage: string;

  toggleIsOpenCardCreateDictionary: () => void;
  closeCardCreateDictionary: () => void;
  openCardCreateDictionary: () => void;
  setMainLanguage: (mainLanguageValue: string) => void;
  setSecondaryLanguage: (secondaryLanguageValue: string) => void;

  resetFields: () => void;
};

export const useAddDictionaryStore = create<Store>((set) => ({
  isOpenCardCreateDictionary: false,
  mainLanguage: "",
  secondaryLanguage: "",

  toggleIsOpenCardCreateDictionary: () => {
    set((prev) => ({
      isOpenCardCreateDictionary: !prev.isOpenCardCreateDictionary,
    }));
  },

  closeCardCreateDictionary: () => {
    set(() => ({
      isOpenCardCreateDictionary: false,
    }));
  },

  openCardCreateDictionary: () => {
    set(() => ({
      isOpenCardCreateDictionary: true,
    }));
  },

  setMainLanguage: (mainLanguageValue) => {
    set({
      mainLanguage: mainLanguageValue,
    });
  },

  setSecondaryLanguage: (secondaryLanguageValue) => {
    set({
      secondaryLanguage: secondaryLanguageValue,
    });
  },

  resetFields: () => {
    set({
      mainLanguage: "",
      secondaryLanguage: "",
    });
  },
}));
