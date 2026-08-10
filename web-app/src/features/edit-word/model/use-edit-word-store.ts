import { create } from "zustand";

import { type Word } from "@entities/word";

type EditWordStore = {
  draftSourceWord: string;
  draftTranslations: string[];
  draftDefinitions: string[];
  draftExamples: string[];

  initDrafts: (word: Word) => void;

  setDraftSourceWord: (newValue: string) => void;
  setDraftTranslations: (newValue: string[]) => void;
  setDraftDefinitions: (newValue: string[]) => void;
  setDraftExamples: (newValue: string[]) => void;

  resetDrafts: () => void;
};

export const useEditWordStore = create<EditWordStore>((set) => ({
  draftSourceWord: "",
  draftTranslations: [],
  draftDefinitions: [],
  draftExamples: [],

  initDrafts: (word) => {
    set({
      draftSourceWord: word.source_word,
      draftTranslations: word.translations.map((item) => item.text),
      draftDefinitions: word.definitions.map((item) => item.text),
      draftExamples: word.examples.map((item) => item.text),
    });
  },

  setDraftSourceWord: (newValue) => {
    set({
      draftSourceWord: newValue,
    });
  },

  setDraftTranslations: (newValue) => {
    set({
      draftTranslations: newValue,
    });
  },

  setDraftDefinitions: (newValue) => {
    set({
      draftDefinitions: newValue,
    });
  },

  setDraftExamples: (newValue) => {
    set({
      draftExamples: newValue,
    });
  },

  resetDrafts: () => {
    set({
      draftSourceWord: "",
      draftTranslations: [],
      draftDefinitions: [],
      draftExamples: [],
    });
  },
}));
