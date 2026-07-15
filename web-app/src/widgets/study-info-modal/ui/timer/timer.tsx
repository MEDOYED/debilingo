import s from "./timer.module.scss";

import { useEffect, useState } from "react";

import { useProfileStore } from "@entities/profile";
import { useStudyInfoModalStore } from "../../model/use-study-info-modal-store";

export const Timer = () => {
  const { timeCounter, increaseTimeCounter, xpCounter, resetCounters } =
    useStudyInfoModalStore();
  const { updateStudyActivity } = useProfileStore();

  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    if (xpCounter === 0) return;

    let seconds = 0;

    const interval = setInterval(async () => {
      seconds++;

      increaseTimeCounter(1);

      if (seconds === 20 || stopTimer) {
        clearInterval(interval);

        const currentXp = useStudyInfoModalStore.getState().xpCounter;
        const currentTime = useStudyInfoModalStore.getState().timeCounter;

        try {
          await updateStudyActivity(currentXp, currentTime);

          resetCounters();
        } catch (error) {
          console.error("Failed to save activity", error);
        }

        setStopTimer(false);

        // enableDataSending();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stopTimer, xpCounter]);

  return (
    <div
      onClick={() => setStopTimer(true)}
      className={s.timer}
    >
      time: {timeCounter}s
    </div>
  );
};
