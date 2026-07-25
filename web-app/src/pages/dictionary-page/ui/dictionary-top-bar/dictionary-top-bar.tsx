import { useAddWordStore } from "@entities/word";
import { ShuffleButton } from "@features/shuffle-words";
import { UnshuffleButton } from "@features/unshuffle-words";
import { TextButton } from "@shared/ui/buttons";

import s from "./dictionary-top-bar.module.scss";

export const DictionaryTopBar = () => {
  const { openCardCreateWord } = useAddWordStore();

  return (
    <div className={s.topBarOverlay}>
      <header className={s.topBar}>
        <UnshuffleButton />

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
