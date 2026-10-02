import type { Dispatch, SetStateAction } from "react";

import { useStudyInfoModalStore } from "@widgets/study-info-modal";
import { FilledButton } from "@shared/ui/buttons";

import type { GameScreen } from "../../model/types";
import s from "./results-screen.module.scss";

type ResultsScreenProps = {
  setScreen: Dispatch<SetStateAction<GameScreen>>;
};

export const ResultsScreen = ({ setScreen }: ResultsScreenProps) => {
  const { xpCounter, timeCounter, resetCounters } = useStudyInfoModalStore();

  const handlePlayAgain = () => {
    resetCounters();
    setScreen("game");
  };

  return (
    <div className={s.resultsScreen}>
      <div>xpCounter: {xpCounter}</div>
      <div>timeCounter: {timeCounter}</div>

      <FilledButton
        as="button"
        onClick={handlePlayAgain}
      >
        Play again
      </FilledButton>
    </div>
  );
};
