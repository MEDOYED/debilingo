import { useEditWordStore } from "../../model/use-edit-word-store";

import s from "../../styles/input.module.scss";

import { useAddWordStore, useWordStore } from "@entities/word";

type EditableDefinitionInputProps = {
  inputIndex: number;
};

export const EditableDefinitionInput = ({
  inputIndex,
}: EditableDefinitionInputProps) => {
  const { draftDefinitions, setDraftDefinitions } = useEditWordStore();

  const { editableWordId } = useWordStore();
  const { words } = useAddWordStore();

  const word = words.find((item) => item.id === editableWordId);

  if (!word) return null;

  return (
    <input
      className={s.input}
      type="text"
      value={draftDefinitions[inputIndex]}
      onChange={(e) => {
        const newDefinitions = [...draftDefinitions];
        newDefinitions[inputIndex] = e.target.value;
        setDraftDefinitions(newDefinitions);
      }}
    />
  );
};
