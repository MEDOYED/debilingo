import { useParams } from "react-router-dom";

import { useProfileStore } from "@entities/profile";
import { createWord } from "@shared/api/wordApi";
import { FilledButton, TextButton } from "@shared/ui/buttons";

import { useAddWordStore } from "../../model/use-add-word-store";
import { LabelInputComponent } from "./label-Input-component/label-input-component";

import field from "@shared/styles/components/field.module.scss";
import s from "./add-word-card.module.scss";

export const AddWordCardModal = () => {
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

  const { updateStudyActivity } = useProfileStore();

  const handleSubmit = async () => {
    const cleanArray = (arr: string[]): string[] => {
      return arr.map((t) => t.trim()).filter((t) => t.length > 0);
    };

    const translationsClean = cleanArray(translations);

    const isEmpty = !mainLanguageWord.trim() || translationsClean?.length === 0;

    if (isEmpty) return;

    const newWordData = {
      dictionary_id: dictId || "",
      source_word: mainLanguageWord,
      note: note,
      translations: translationsClean,
      definitions: cleanArray(definitions),
      examples: cleanArray(examples),
    };

    // console.log("SENT:", newWordData);

    const newWord = await createWord(newWordData);

    setWords([newWord, ...words]);

    updateStudyActivity(10);

    resetFields();
    closeCardCreateWord();
    // console.log(translations);
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
          <label
            className={field.label}
            htmlFor=""
          >
            Слово
            <input
              className={field.input}
              type="text"
              value={mainLanguageWord}
              onChange={(e) => setMainLanguageWord(e.target.value)}
            />
          </label>

          <LabelInputComponent
            classNameLabel={field.label}
            classNameInput={field.input}
            labelText="Переклад"
            setText={setTranslation}
            text={translations}
            textInButton="Додати переклад"
          />
        </div>

        {/* definition */}
        <LabelInputComponent
          classNameLabel={field.label}
          classNameInput={field.input}
          labelText="Пояснення"
          setText={setDefinition}
          text={definitions}
          textInButton="Додати пояснення"
        />

        {/* example */}

        <LabelInputComponent
          classNameLabel={field.label}
          classNameInput={field.input}
          labelText="Приклад"
          setText={setExample}
          text={examples}
          textInButton="Додати приклад"
        />

        <div className={s.actionRow}>
          <TextButton
            as="button"
            onClick={closeCard}
            size="small"
          >
            Відмінити
          </TextButton>

          <FilledButton
            as="button"
            onClick={handleSubmit}
            variant="primary"
            size="small"
          >
            Створити
          </FilledButton>
        </div>
      </form>
    </div>
  );
};
