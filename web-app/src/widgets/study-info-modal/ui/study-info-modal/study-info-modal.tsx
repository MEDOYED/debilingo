// import { useEffect } from "react";

// import { useProfileStore } from "@entities/profile";

// import { useStudyInfoModalStore } from "../../model/use-study-info-modal-store";
import { Timer } from "../timer/timer";
import { XpCounter } from "../xp-counter/xp-counter";

import s from "./study-info-modal.module.scss";

export const StudyInfoModal = () => {
  // const { updateStudyActivity } = useProfileStore();
  // const { xpCounter, timeCounter, isReadyToSendData } =
  //   useStudyInfoModalStore();

  // useEffect(() => {
  //   if (isReadyToSendData === true) {
  //     updateStudyActivity(xpCounter, timeCounter);
  //   }
  // }, [isReadyToSendData, xpCounter, timeCounter, updateStudyActivity]);

  return (
    <div className={s.modal}>
      <Timer />
      <XpCounter />
    </div>
  );
};
