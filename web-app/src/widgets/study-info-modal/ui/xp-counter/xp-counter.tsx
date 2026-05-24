import s from "./xp-counter.module.scss";

import { useStudyInfoModalStore } from "../../model/use-study-info-modal-store";

export const XpCounter = () => {
  const { xpCounter } = useStudyInfoModalStore();

  return <div className={s.xpCounter}>{xpCounter}xp</div>;
};
