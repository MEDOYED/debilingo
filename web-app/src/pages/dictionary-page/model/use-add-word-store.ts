import { create } from "zustand";

import type { Word } from "@shared/api/wordApi";

type Store = {
  isOpenCardCreateWord: boolean;

  mainLanguageWord: string;
  translations: string[];
  definitions: string[];
  examples: string[];
  note: string;

  words: Word[];
  setWords: (newWords: Word[]) => void;

  toggleIsOpenCardCreateWord: () => void;
  closeCardCreateWord: () => void;
  openCardCreateWord: () => void;

  setMainLanguageWord: (mainLanguageWordValue: string) => void;
  setTranslation: (TranslationValue: string[]) => void;
  setDefinition: (newDefinitionValue: string[]) => void;
  setExample: (newExampleValue: string[]) => void;
  setNote: (newNoteValue: string) => void;

  resetFields: () => void;
};

export const useAddWordStore = create<Store>((set) => ({
  isOpenCardCreateWord: false,
  mainLanguageWord: "",
  translations: [""],
  definitions: [""],
  examples: [""],
  words: [],
  note: "",

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
      translations: TranslationValue,
    });
  },

  setDefinition: (newDefinitionValue) => {
    set({
      definitions: newDefinitionValue,
    });
  },

  setExample: (newExampleValue) => {
    set({
      examples: newExampleValue,
    });
  },

  setNote: (newNoteValue) => {
    set({
      note: newNoteValue,
    });
  },

  setWords: (newWords) => {
    set({
      words: newWords,
    });
  },

  resetFields: () => {
    set({
      mainLanguageWord: "",
      translations: [""],
      definitions: [""],
      examples: [""],
      note: "",
    });
  },
}));
