import { useEditWordStore } from "../../model/use-edit-word-store";

import s from "./editable-main-translation-input.module.scss";

export const EditableMainTranslationInput = () => {
  const { draftTranslations, setDraftTranslations } = useEditWordStore();

  return (
    <>
      <input
        className={s.input}
        type="text"
        value={draftTranslations[0]}
        onChange={(e) =>
          setDraftTranslations([e.target.value, ...draftTranslations.slice(1)])
        }
      />
    </>
  );
};
