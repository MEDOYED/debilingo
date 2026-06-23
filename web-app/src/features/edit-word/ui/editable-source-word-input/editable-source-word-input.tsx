import { useEditWordStore } from "../../model/use-edit-word-store";

import s from "./editable-source-word-input.module.scss";

export const EditableSourceWordInput = () => {
  const { draftSourceWord, setDraftSourceWord } = useEditWordStore();

  return (
    <>
      <input
        className={s.input}
        type="text"
        value={draftSourceWord}
        onChange={(e) => setDraftSourceWord(e.target.value)}
      />
    </>
  );
};
