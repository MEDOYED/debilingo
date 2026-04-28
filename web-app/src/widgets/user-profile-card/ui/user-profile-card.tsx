import profileLogo from "/img/profile-logos/logo.webp";

import { useProfileStore } from "@entities/profile";

import s from "./user-profile-card.module.scss";

type UserProfileCardProps = {
  className?: string;
};

export const UserProfileCard = ({ className }: UserProfileCardProps) => {
  const { profileData } = useProfileStore();

  return (
    <div className={className}>
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

      {/* joined_at and streak */}
      <div>
        <div>Daily streak: {profileData?.dailyStreak}</div>
        <div>Joined at: {profileData?.createdAt?.slice(0, 10)}</div>
      </div>

      {/* xp (level, need t next level) */}
      <div>Total xp: {profileData?.totalXp}</div>
    </div>
  );
};
