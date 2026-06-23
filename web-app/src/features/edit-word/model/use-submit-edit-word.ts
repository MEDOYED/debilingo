import { useState } from "react";

import { updateWord } from "@entities/word/api";

import { useAddWordStore, useWordStore } from "@entities/word";

import { useEditWordStore } from "./use-edit-word-store";

type SendingStatus = "error" | "success" | "in-process" | null;

export const useSubmitEditWord = () => {
  const { editableWordId, setEditableWordId } = useWordStore();

  const { setWords, words } = useAddWordStore();
  const {
    draftSourceWord,
    draftTranslations,
    draftDefinitions,
    draftExamples,
    resetDrafts,
  } = useEditWordStore();

  const [sendingStatus, setSendingStatus] = useState<SendingStatus>(null);

  const wordId = editableWordId;

  const data = {
    source_word: draftSourceWord,
    translations: draftTranslations,
    definitions: draftDefinitions,
    examples: draftExamples,
  };

  const handleSubmit = async () => {
    if (!wordId) return;

    setSendingStatus("in-process");

    try {
      const updatedWord = await updateWord(wordId, data);

      // replace the updated word in local  store
      const updatedWords = words.map((word) =>
        word.id === wordId ? updatedWord : word
      );
      setWords(updatedWords);

      setSendingStatus("success");
      setEditableWordId(null);
      resetDrafts();
    } catch (error) {
      setSendingStatus("error");
      console.error(error);
    }
  };

  return { handleSubmit, sendingStatus };
};
