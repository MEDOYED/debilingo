import type { Dispatch, SetStateAction } from "react";

import { useStudyInfoModalStore } from "@widgets/study-info-modal";
import { FilledButton } from "@shared/ui/buttons";
import { calculateXpByTimeDuration } from "@entities/xp";

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

  const { xpForTime } = calculateXpByTimeDuration({
    durationTimeSeconds: timeCounter,
  });

  return (
    <div className={s.resultsScreen}>
      <div>Correct answers: +{xpCounter}xp</div>
      <div>
        Game time: {timeCounter}s +{xpForTime}xp
      </div>

      <FilledButton
        as="button"
        onClick={handlePlayAgain}
      >
        Play again
      </FilledButton>
    </div>
  );
};
