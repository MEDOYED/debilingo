import type { Word } from "@entities/word";

import s from "./word-details.module.scss";

import { useWordStore } from "@entities/word";
import {
  EditableAdditionalTranslationInput,
  EditableDefinitionInput,
  EditableExampleInput,
} from "@features/edit-word";
import { TextButton } from "@shared/ui/buttons";
import { ArrowTopRightOnSquare } from "@shared/ui/icons";
import { YouGlishModal } from "@widgets/youglish-modal/youglish-modal";
import { YouGlishPlayer } from "@shared/ui/youGlishPlayer/youglish-player";
import { useState } from "react";

interface WordDetailProps {
  className: string;
  word: Word;
}

export const WordDetails = ({ className, word }: WordDetailProps) => {
  const { editableWordId } = useWordStore();

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={className}>
      <div className={s.ulContainer}>
        <TextButton
          as="button"
          onClick={() => setOpenModal(true)}
          className={s.youglishBtn}
        >
          Прослухати на YouGlish <ArrowTopRightOnSquare />
        </TextButton>
        {openModal && (
          <YouGlishModal onClose={() => setOpenModal(false)}>
            <YouGlishPlayer word={word.source_word} />
          </YouGlishModal>
        )}

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
          {word.examples.map((ex, index) => (
            <li
              className={s.list}
              key={ex.id}
            >
              {editableWordId === word.id ? (
                <EditableExampleInput inputIndex={index} />
              ) : (
                <>{ex.text}</>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
