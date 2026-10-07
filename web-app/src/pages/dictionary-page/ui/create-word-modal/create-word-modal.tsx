import { useState } from "react";
import { useParams } from "react-router-dom";

import { useUpdateStudyActivity } from "@entities/profile";
import { createWord, useAddWordStore } from "@entities/word";
import { FilledButton, TextButton } from "@shared/ui/buttons";

import { LabelInputComponent } from "../label-Input-component/label-input-component";

import field from "@shared/styles/components/field.module.scss";
import s from "./create-word-modal.module.scss";

export const CreateWordModal = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { dictId } = useParams();

  const {
    isOpenCardCreateWord,
    closeCardCreateWord,
    mainLanguageWord,
    translations,
    definitions,
    examples,
    note,
    resetFields,
    setMainLanguageWord,
    setTranslation,
    setDefinition,
    setExample,
    words,
    setWords,
  } = useAddWordStore();

  const { updateStudyActivity } = useUpdateStudyActivity();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const cleanArray = (arr: string[]): string[] => {
        return arr.map((t) => t.trim()).filter((t) => t.length > 0);
      };

      const translationsClean = cleanArray(translations);

      const isEmpty =
        !mainLanguageWord.trim() || translationsClean?.length === 0;

      if (isEmpty) return;

      const newWordData = {
        dictionary_id: dictId || "",
        source_word: mainLanguageWord,
        note: note,
        translations: translationsClean,
        definitions: cleanArray(definitions),
        examples: cleanArray(examples),
      };

      const newWord = await createWord(newWordData);

      setWords([newWord, ...words]);

      updateStudyActivity({ xpDelta: 10, timeDelta: 0 });

      resetFields();
      closeCardCreateWord();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCard = () => {
    closeCardCreateWord();
    resetFields();
  };

  if (!isOpenCardCreateWord) return null;

  return (
    <div className={s.card}>
      <form
        className={s.form}
        action=""
      >
        <div className={s.wordAndTranslationWrapper}>
          <label className={field.label}>
            Word
            <input
              className={field.input}
              type="text"
              value={mainLanguageWord}
              onChange={(e) => setMainLanguageWord(e.target.value)}
            />
          </label>

          {/* translations */}
          <LabelInputComponent
            labelText="Translation"
            setText={setTranslation}
            text={translations}
            textInButton="+ Add translation"
          />
        </div>

        {/* definitions */}
        <LabelInputComponent
          labelText="Explanation"
          setText={setDefinition}
          text={definitions}
          textInButton="+ Add explanation"
        />

        {/* examples  */}
        <LabelInputComponent
          labelText="Example"
          setText={setExample}
          text={examples}
          textInButton="+ Add example"
        />

        <div className={s.actionRow}>
          <TextButton
            as="button"
            onClick={closeCard}
            size="small"
          >
            Cancel
          </TextButton>

          <FilledButton
            as="button"
            onClick={handleSubmit}
            variant="primary"
            size="small"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </FilledButton>
        </div>
      </form>
    </div>
  );
};
