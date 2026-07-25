import { TextButton } from "@shared/ui/buttons";
import { Clock } from "@shared/ui/icons";

import { unshuffleWords } from "@entities/word/api";

import { useParams } from "react-router-dom";

import { useUnshuffleStore } from "../model/use-unshuffle-store";

// fix import
import { useShuffleStore } from "@features/shuffle-words";

export const UnshuffleButton = () => {
  const { dictId } = useParams();

  const { triggerUnshuffleVersion } = useUnshuffleStore();

  const { setIsShuffled } = useShuffleStore();

  const handleUnshuffleWords = async () => {
    if (!dictId) {
      console.log("dictionary id from url is not founded");
      return;
    }

    await unshuffleWords(dictId);

    triggerUnshuffleVersion();
    setIsShuffled(false);
  };

  return (
    <TextButton
      as="button"
      onClick={handleUnshuffleWords}
    >
      <Clock />
    </TextButton>
  );
};
