import { useAddWordStore } from "@entities/word";
import { TextButton } from "@shared/ui/buttons";

import { ShuffleButton } from "@features/shuffle-words";
import s from "./dictionary-top-bar.module.scss";

export const DictionaryTopBar = () => {
  const { openCardCreateWord } = useAddWordStore();

  return (
    <div className={s.topBarOverlay}>
      <header className={s.topBar}>
        <ShuffleButton />

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
