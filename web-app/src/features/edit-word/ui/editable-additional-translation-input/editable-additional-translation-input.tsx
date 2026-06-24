import { useEditWordStore } from "../../model/use-edit-word-store";

import s from "../../styles/input.module.scss";

import { useAddWordStore, useWordStore } from "@entities/word";

type EditableAdditionalTranslationInputProps = {
  inputIndex: number;
};

export const EditableAdditionalTranslationInput = ({
  inputIndex,
}: EditableAdditionalTranslationInputProps) => {
  const { draftTranslations, setDraftTranslations } = useEditWordStore();

  const { editableWordId } = useWordStore();
  const { words } = useAddWordStore();

  const word = words.find((item) => item.id === editableWordId);

  if (!word) return null;

  return (
    <input
      className={s.input}
      type="text"
      value={draftTranslations[inputIndex + 1]}
      onChange={(e) => {
        const newTranslations = [...draftTranslations];
        newTranslations[inputIndex + 1] = e.target.value;
        setDraftTranslations(newTranslations);
      }}
    />
  );
};
