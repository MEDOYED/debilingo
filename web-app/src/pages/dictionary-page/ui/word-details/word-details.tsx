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
  const { draftTranslations, setDraftTranslations } = useEditWordStore();
  const { draftDefinitions, setDraftDefinitions } = useEditWordStore();
  const { draftExamples, setDraftExamples } = useEditWordStore();

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
          {editableWordId === word.id ? (
            <>
              {draftTranslations.slice(1).map((_, index) => (
                <li
                  key={`new-translations-${index}`}
                  className={s.list}
                >
                  <EditableAdditionalTranslationInput inputIndex={index} />
                </li>
              ))}
              <TextButton
                className={s.addInputButton}
                as="button"
                onClick={() => {
                  setDraftTranslations([...draftTranslations, ""]);
                }}
              >
                + Add translation
              </TextButton>
            </>
          ) : (
            <>
              {word.translations.slice(1).map((def) => (
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
        <p>Definitions:</p>

        <ul className={s.ulClass}>
          {editableWordId === word.id ? (
            <>
              {draftDefinitions?.map((_, index) => (
                <li
                  key={`new-definition-${index}`}
                  className={s.list}
                >
                  <EditableDefinitionInput inputIndex={index} />
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
          {editableWordId === word.id ? (
            <>
              {draftExamples?.map((_, index) => (
                <li
                  key={`new-examples-${index}`}
                  className={s.list}
                >
                  <EditableExampleInput inputIndex={index} />
                </li>
              ))}
              <TextButton
                className={s.addInputButton}
                as="button"
                onClick={() => {
                  setDraftExamples([...draftExamples, ""]);
                }}
              >
                + Add example
              </TextButton>
            </>
          ) : (
            <>
              {word.examples.map((ex) => (
                <li
                  className={s.list}
                  key={ex.id}
                >
                  {ex.text}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
