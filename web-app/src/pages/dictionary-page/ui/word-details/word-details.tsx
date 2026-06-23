import type { Word } from "@entities/word";

import s from "./word-details.module.scss";

import { useWordStore } from "@entities/word";
import {
  EditableAdditionalTranslationInput,
  EditableDefinitionInput,
} from "@features/edit-word";

interface WordDetailProps {
  className: string;
  word: Word;
}

export const WordDetails = ({ className, word }: WordDetailProps) => {
  const { editableWordId } = useWordStore();

  return (
    <div className={className}>
      <div className={s.ulContainer}>
        <p>
          Додатков{word.translations.length < 3 ? "ий" : "і"} переклад
          {word.translations.length < 3 ? "" : "и"}:
        </p>

        <ul className={s.ulClass}>
          {word.translations.slice(1).map((t, index) => (
            <li
              className={s.list}
              key={t.id}
            >
              {editableWordId === word.id ? (
                <EditableAdditionalTranslationInput inputIndex={index} />
              ) : (
                <>{t.text}</>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.ulContainer}>
        <p>Пояснення:</p>

        <ul className={s.ulClass}>
          {word.definitions.map((def, index) => (
            <li
              className={s.list}
              key={def.id}
            >
              {editableWordId === word.id ? (
                <EditableDefinitionInput inputIndex={index} />
              ) : (
                <>{def.text}</>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.ulContainer}>
        <p>Приклад{word.examples.length < 2 ? "" : "и"}:</p>

        <ul className={s.ulClass}>
          {word.examples.map((ex) => (
            <li
              className={s.list}
              key={ex.id}
            >
              {ex.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
