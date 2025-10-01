import { UserProfileCard } from "@/widgets/user-profile-card";

import s from "./home-page.module.scss"

const HomePage = () => {
  return (
    <div className={s.pageHome}>
      <div className={s.leftCol}>
        <UserProfileCard />
      </div>
      <div>
        other content
      </div>
    </div>
  )
};

export default HomePage;
