import profileLogo from "/img/profile-logos/logo.webp";
// import profileLogo from "../../../../public/img/profile-logos/1.jpeg";

import s from "./user-profile-card.module.scss";

type UserProfileCardProps = {
  className?: string;
};

export const UserProfileCard = ({ className }: UserProfileCardProps) => {
  return (
    <div className={className}>
      <div className={s.profileLogoAndName}>
        <img
          className={s.logo}
          src={profileLogo}
          alt=""
        />
        <div className={s.userInfo}>
          <span className={s.firstName}>Kuzeluk Andrij</span>
          <span>@medoyed</span>
        </div>
      </div>
    </div>
  );
};
