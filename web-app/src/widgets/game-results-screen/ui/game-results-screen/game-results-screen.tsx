import { useStudySessionStore } from "@entities/study-session";
import { calculateXpByTimeDuration } from "@shared/lib/xp";
import { FilledButton } from "@shared/ui/buttons";
import { useProfileStore } from "@entities/profile";

import s from "./game-results-screen.module.scss";

type ResultsScreenProps = {
  onPlayAgain: () => void;
};

export const GameResultsScreen = ({ onPlayAgain }: ResultsScreenProps) => {
  const { xpCounter, timeCounter, resetCounters } = useStudySessionStore();

  const handlePlayAgain = () => {
    resetCounters();
    onPlayAgain();
  };

  const { xpForTime } = calculateXpByTimeDuration({
    durationTimeSeconds: timeCounter,
  });

  const lastGameTotalXp = xpCounter + xpForTime;

  const { profileData } = useProfileStore();

  if (!profileData)
    return (
      <>
        <div>Profile loading...</div>
      </>
    );

  return (
    <div className={s.resultsScreen}>
      <div>Correct answers: +{xpCounter}xp</div>
      <div>
        {timeCounter}s game time: +{xpForTime}xp
      </div>
      <div>total xp: {lastGameTotalXp}xp</div>
      <div>
        {profileData.totalXp}xp -- {profileData.totalXp + lastGameTotalXp}xp
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
