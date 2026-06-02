import { Timer } from "../timer/timer";
import { XpCounter } from "../xp-counter/xp-counter";

import s from "./study-info-modal.module.scss";

export const StudyInfoModal = () => {
  return (
    <div className={s.modal}>
      <Timer />
      <XpCounter />
    </div>
  );
};
