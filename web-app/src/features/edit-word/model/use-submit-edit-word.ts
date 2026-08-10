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
    translations: draftTranslations.filter((text) => text !== ""),
    definitions: draftDefinitions.filter((text) => text !== ""),
    examples: draftExamples.filter((text) => text !== ""),
  };

  const handleSubmit = async () => {
    if (!wordId) return;

    setSendingStatus("in-process");

    try {
      const oldWordData = words.find(
        (word) => word.source_word === data.source_word
      );

      const oldData = {
        source_word: oldWordData?.source_word,
        translations: oldWordData?.translations?.map((item) => item.text) ?? [],
        definitions: oldWordData?.definitions?.map((item) => item.text) ?? [],
        examples: oldWordData?.examples?.map((item) => item.text) ?? [],
      };

      const isEqual =
        oldData.source_word === data.source_word &&
        JSON.stringify(oldData.translations) ===
          JSON.stringify(data.translations) &&
        JSON.stringify(oldData.definitions) ===
          JSON.stringify(data.definitions) &&
        JSON.stringify(oldData.examples) === JSON.stringify(data.examples);

      if (isEqual) {
        setSendingStatus("success");
        setEditableWordId(null);
        return;
      }

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
