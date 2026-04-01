import { useParams } from "react-router-dom";

import { createWord } from "@shared/api/wordApi";
import { FilledButton, TextButton } from "@shared/ui/buttons";

import { useAddWordStore } from "../../model/use-add-word-store";

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

  const newWordData = {
    dictionary_id: dictId || "",
    source_word: mainLanguageWord,
    note: note,
    translations,
    definitions,
    examples,
  };

  const handleSubmit = async () => {
    const newWords = await createWord(newWordData);

    setWords([newWords, ...words]);

    resetFields();
    closeCardCreateWord();
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

          <label
            className={field.label}
            htmlFor=""
          >
            Переклад
            <input
              className={field.input}
              type="text"
              value={translations[0] || ""}
              onChange={(e) => setTranslation([e.target.value])}
            />
          </label>
        </div>

        {/* definition */}
        <label
          className={field.label}
          htmlFor=""
        >
          Пояснення
          <input
            className={field.input}
            type="text"
            value={definitions[0] || ""}
            onChange={(e) => setDefinition([e.target.value])}
            name=""
            id=""
          />
        </label>

        {/* example */}
        <label
          className={field.label}
          htmlFor=""
        >
          Приклад
          <input
            className={field.input}
            type="text"
            value={examples[0] || ""}
            onChange={(e) => setExample([e.target.value])}
            name=""
            id=""
          />
        </label>

        <div className={s.actionRow}>
          <TextButton
            as="button"
            onClick={closeCardCreateWord}
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
