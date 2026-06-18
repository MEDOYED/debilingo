import profileLogo from "/img/profile-logos/logo.webp";

import { cn } from "@shared/lib/styles";

import { useUpdateDescriptionModalStore } from "@features/show-update-description";

import {
  convertTime,
  LevelProgressBar,
  levelXp,
  StreakIcon,
  useProfileStore,
} from "@entities/profile";

import { TextButton } from "@shared/ui/buttons";
import s from "./user-profile-card.module.scss";

type UserProfileCardProps = {
  className?: string;
};

export const UserProfileCard = ({ className }: UserProfileCardProps) => {
  const { profileData } = useProfileStore();
  const { openUpdateDescriptionModal } = useUpdateDescriptionModalStore();

  const {
    currentUserLevelXp,
    needPercentageToNextLevel,
    neededXpForNextLevel,
    nextLevelXp,
    percentageSuccess,
    userXpOnCurrentLevel,
  } = levelXp(profileData?.totalXp);

  const { hoursString, minutesString, secondsString } = convertTime(
    profileData?.totalStudyTimeSeconds
  );

  return (
    <div className={cn(s.UserProfileCard, className)}>
      <div className={s.topRow}>
        <div className={s.profileLogoAndName}>
          <img
            className={s.logo}
            src={profileLogo}
            alt=""
          />
          <div className={s.userInfo}>
            <span className={s.firstName}>{profileData?.username}</span>
            <span># {profileData?.userIdNumeric}</span>
          </div>
        </div>

        <TextButton
          as="button"
          onClick={openUpdateDescriptionModal}
        >
          v0.2
        </TextButton>
      </div>

      {/* joined_at and streak */}
      <div>
        <StreakIcon />
        <div>Daily streak: {profileData?.dailyStreak}</div>
        <div>Joined at: {profileData?.createdAt?.slice(0, 10)}</div>
      </div>

      {/* xp (level, need t next level) */}
      <div>Total xp: {profileData?.totalXp}</div>

      {/* {profileData && ( */}
      <div className={s.progressBarCard}>
        <div>{currentUserLevelXp} lvl </div>

        <LevelProgressBar />

        <div>
          {userXpOnCurrentLevel} / {nextLevelXp}
        </div>
      </div>

      <div>Рівень пройдено на {percentageSuccess}%</div>

      <div>До нового рівня залишилося {needPercentageToNextLevel}%</div>

      <div>До нового рівня залишилося {neededXpForNextLevel}xp</div>

      <div className={s.block}>
        <div className={s.label}>час навчання</div>
        <div className={s.dataText}>
          {hoursString} : {minutesString} : {secondsString}
        </div>
      </div>
    </div>
  );
};
