import { cn } from "@shared/lib/styles";

import { DictionariesListSection } from "@widgets/dictionaries-list-section";

import { UserProfileCard } from "@widgets/user-profile-card";

import s from "./home-page.module.scss";

export const HomePage = () => {
  return (
    <div className={cn(s.pageHome, "container")}>
      <UserProfileCard className={s.UserProfileCard} />

      <DictionariesListSection className={s.dictionaries} />
    </div>
  );
};
