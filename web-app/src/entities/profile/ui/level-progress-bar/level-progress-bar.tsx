import s from "./level-progress-bar.module.scss";

import { levelXp } from "../../lib/level";
import { useProfileStore } from "../../model/profile-store";

export const LevelProgressBar = () => {
  const { profileData } = useProfileStore();

  const { percentageSuccess } = levelXp(profileData?.totalXp);

  return (
    <div className={s.levelProgressBar}>
      <div
        className={s.filledProgress}
        style={{ width: `${percentageSuccess}%` }}
      ></div>
    </div>
  );
};
