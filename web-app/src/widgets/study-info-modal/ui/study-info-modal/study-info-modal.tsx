import { useState } from "react";
import { Timer } from "../timer/timer";
import { XpCounter } from "../xp-counter/xp-counter";

import s from "./study-info-modal.module.scss";

export const StudyInfoModal = () => {
  const [isStopTimer, setIsStopTimer] = useState<boolean>(false);

  return (
    <div
      className={s.modal}
      onClick={() => setIsStopTimer(true)}
    >
      <Timer isStopTimer={isStopTimer} />
      <XpCounter />
    </div>
  );
};
