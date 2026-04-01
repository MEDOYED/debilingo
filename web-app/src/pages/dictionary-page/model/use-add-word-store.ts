import { create } from "zustand";

type Store = {
  isOpenCardCreateWord: boolean;

  mainLanguageWord: string;
  Translation: string;
  definition: string;
  example: string;

  toggleIsOpenCardCreateWord: () => void;
  closeCardCreateWord: () => void;
  openCardCreateWord: () => void;

  setMainLanguageWord: (mainLanguageWordValue: string) => void;
  setTranslation: (TranslationValue: string) => void;
  setDefinition: (newDefinitionValue: string) => void;
  setExample: (newExampleValue: string) => void;

  resetFields: () => void;
};

export const useAddWordStore = create<Store>((set) => ({
  isOpenCardCreateWord: false,
  mainLanguageWord: "",
  Translation: "",
  definition: "",
  example: "",

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

  setDefinition: (newDefinitionValue) => {
    set({
      definition: newDefinitionValue,
    });
  },

  setExample: (newExampleValue) => {
    set({
      example: newExampleValue,
    });
  },

  resetFields: () => {
    set({
      mainLanguageWord: "",
      Translation: "",
      definition: "",
      example: "",
    });
  },
}));
