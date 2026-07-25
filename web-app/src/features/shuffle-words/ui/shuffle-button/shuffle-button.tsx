import { TextButton } from "@shared/ui/buttons";
import { Shuffle } from "@shared/ui/icons";

import { shuffleWords } from "@entities/word/api";

import { useShuffleStore } from "../../model/use-shuffle-store";

import { useParams } from "react-router-dom";

// import s from "./shuffle-button.module.scss"

export const ShuffleButton = () => {
  const { dictId } = useParams();

  const { triggerShuffleVersion, setIsShuffled } = useShuffleStore();

  const handleShuffleWords = async () => {
    if (!dictId) {
      console.log("Dictionary id from url is not found");
      return;
    }

    await shuffleWords(dictId);
    triggerShuffleVersion();
    setIsShuffled(true);
  };

  return (
    <TextButton
      // className={s.buttonNewWord}
      as="button"
      onClick={handleShuffleWords}
    >
      <Shuffle />
    </TextButton>
  );
};
