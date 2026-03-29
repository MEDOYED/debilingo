import { cn } from "@shared/lib/styles";

import { DictionariesListSection } from "@widgets/dictionaries-list-section";
import { MoneyActivityCalendar } from "@widgets/money-activity-calendar";

import { UserProfileCard } from "@widgets/user-profile-card";

import s from "./home-page.module.scss";

export const HomePage = () => {
  return (
    <div className={cn(s.pageHome, "container")}>
      <div className={s.leftCol}>
        <UserProfileCard />
      </div>

      <MoneyActivityCalendar className={s.MoneyActivityCalendar} />

      <DictionariesListSection />
    </div>
  );
};
