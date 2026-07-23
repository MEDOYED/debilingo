import { TextButton } from "@shared/ui/buttons";
import { Shuffle } from "@shared/ui/icons";

// import s from "./shuffle-button.module.scss"

export const ShuffleButton = () => {
  const shuffleWords = () => {
    console.log("shuffle words");
  };

  return (
    <TextButton
      // className={s.buttonNewWord}
      as="button"
      onClick={shuffleWords}
    >
      <Shuffle />
    </TextButton>
  );
};
