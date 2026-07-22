import { useEffect } from "react";

import { useProfileStore } from "@entities/profile";

import { useStudyInfoModalStore } from "../../model/use-study-info-modal-store";
import s from "./timer.module.scss";

type TimerProps = {
  isStopTimer: boolean;
};

export const Timer = ({ isStopTimer }: TimerProps) => {
  const { timeCounter, increaseTimeCounter, xpCounter, resetCounters } =
    useStudyInfoModalStore();
  const { updateStudyActivity } = useProfileStore();

  useEffect(() => {
    if (xpCounter === 0) return;

    let seconds = 0;

    const interval = setInterval(async () => {
      seconds++;

      increaseTimeCounter(1);

      if (seconds === 20 || isStopTimer) {
        clearInterval(interval);

        const currentXp = useStudyInfoModalStore.getState().xpCounter;
        const currentTime = useStudyInfoModalStore.getState().timeCounter;

        try {
          await updateStudyActivity(currentXp, currentTime);

          resetCounters();
        } catch (error) {
          console.error("Failed to save activity", error);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isStopTimer, xpCounter]);

  return <div className={s.timer}>time: {timeCounter}s</div>;
};
