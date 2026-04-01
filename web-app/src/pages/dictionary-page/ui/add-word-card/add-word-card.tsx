import { useAddWordStore } from "../../model/use-add-word-store";

import field from "@shared/styles/components/field.module.scss";
import { FilledButton, TextButton } from "@shared/ui/buttons";
import s from "./add-word-card.module.scss";

export const AddWordCardModal = () => {
  const {
    isOpenCardCreateWord,
    closeCardCreateWord,
    mainLanguageWord,
    Translation,
    definition,
    example,
    resetFields,
    setMainLanguageWord,
    setTranslation,
    setDefinition,
    setExample,
  } = useAddWordStore();

  const handleSubit = () => {
    console.log("mainLanguageWord: ", mainLanguageWord);
    console.log("Translation: ", Translation);
    console.log("definition: ", definition);
    console.log("example: ", example);

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

          <label
            className={field.label}
            htmlFor=""
          >
            Переклад
            <input
              className={field.input}
              type="text"
              value={Translation}
              onChange={(e) => setTranslation(e.target.value)}
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
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
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
            value={example}
            onChange={(e) => setExample(e.target.value)}
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
            onClick={handleSubit}
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
