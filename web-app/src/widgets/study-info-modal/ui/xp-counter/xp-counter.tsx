import { useStudySessionStore } from "@entities/study-session";

import s from "./xp-counter.module.scss";

export const XpCounter = () => {
  const { xpCounter } = useStudySessionStore();

  return <div className={s.xpCounter}>{xpCounter}xp</div>;
};
