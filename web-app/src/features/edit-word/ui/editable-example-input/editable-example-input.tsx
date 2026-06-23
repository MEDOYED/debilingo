import { useEditWordStore } from "../../model/use-edit-word-store";

import s from "../../styles/input.module.scss";

import { useAddWordStore, useWordStore } from "@entities/word";

type EditableExampleInputProps = {
  inputIndex: number;
};

export const EditableExampleInput = ({
  inputIndex,
}: EditableExampleInputProps) => {
  const { draftExamples, setDraftExamples } = useEditWordStore();

  const { editableWordId } = useWordStore();
  const { words } = useAddWordStore();

  const word = words.find((item) => item.id === editableWordId);

  if (!word) return null;

  return (
    <input
      className={s.input}
      type="text"
      value={draftExamples[inputIndex]}
      onChange={(e) => {
        const newExamples = [...draftExamples];
        newExamples[inputIndex] = e.target.value;
        setDraftExamples(newExamples);
      }}
    />
  );
};
