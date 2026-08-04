import { useWordStore } from "@entities/word";
import {
  EditableAdditionalTranslationInput,
  EditableDefinitionInput,
  EditableExampleInput,
  useEditWordStore,
} from "@features/edit-word";
import { TextButton } from "@shared/ui/buttons";
import { ArrowTopRightOnSquare } from "@shared/ui/icons";

import type { Word } from "@entities/word";

import s from "./word-details.module.scss";

interface WordDetailProps {
  className: string;
  word: Word;
}

export const WordDetails = ({ className, word }: WordDetailProps) => {
  const { draftDefinitions, setDraftDefinitions } = useEditWordStore();

  const { editableWordId } = useWordStore();

  return (
    <div className={className}>
      <div className={s.ulContainer}>
        <TextButton
          as="external-link"
          href={`https://youglish.com/pronounce/${word.source_word}/english`}
          className={s.youglishBtn}
        >
          Listen on YouGlish <ArrowTopRightOnSquare />
        </TextButton>

        <p>Additional translation:</p>

        <ul className={s.ulClass}>
          {word.translations.slice(1).map((t, index) => (
            <li
              key={t.id}
              className={s.list}
            >
              {editableWordId === word.id ? (
                <>
                  <EditableAdditionalTranslationInput inputIndex={index} />
                </>
              ) : (
                t.text
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.ulContainer}>
        <p>Explanation:</p>

        <ul className={s.ulClass}>
          {editableWordId === word.id ? (
            <>
              {draftDefinitions?.map((_, index) => (
                <li
                  key={`new-definition-${index}`}
                  className={s.list}
                >
                  <EditableDefinitionInput
                    inputIndex={word.translations.length - 1 + index}
                  />
                </li>
              ))}
              <TextButton
                className={s.addInputButton}
                as="button"
                onClick={() => {
                  setDraftDefinitions([...draftDefinitions, ""]);
                }}
              >
                + Add definition
              </TextButton>
            </>
          ) : (
            <>
              {word.definitions.map((def) => (
                <li
                  className={s.list}
                  key={def.id}
                >
                  {def.text}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      <div className={s.ulContainer}>
        <p>Example{word.examples.length < 2 ? "" : "s"}:</p>

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
