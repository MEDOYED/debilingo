import { TextButton } from "@shared/ui/buttons";

import { useAddWordStore } from "../../model/use-add-word-store";

import s from "./dictionary-top-bar.module.scss";

export const DictionaryTopBar = () => {
  const { openCardCreateWord } = useAddWordStore();

  return (
    <div className={s.topBarOverlay}>
      <header className={s.topBar}>
        <TextButton
          className={s.buttonNewWord}
          as="button"
          onClick={openCardCreateWord}
        >
          +
        </TextButton>
      </header>
    </div>
  );
};
