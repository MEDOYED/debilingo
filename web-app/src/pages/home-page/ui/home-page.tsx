import { cn } from "@shared/lib/styles";

import { DictionariesListSection } from "@widgets/dictionaries-list-section";
import { UserProfileCard } from "@widgets/user-profile-card";

import { ActivityHeatmap } from "./activity-heatmap/activity-heatmap";
import type { LanguageDailyActivityData } from "./activity-heatmap/types";

import { useEffect, useState } from "react";
import { getLanguageDailyActivity } from "./get-language-daily-activity.api";
import s from "./home-page.module.scss";

export const HomePage = () => {
  const [dailyStats, setDailyStats] = useState<
    LanguageDailyActivityData[] | null
  >(null);

  useEffect(() => {
    const loadDailyActivity = async () => {
      const response = await getLanguageDailyActivity();

      setDailyStats(response.data);
    };

    loadDailyActivity();
  }, []);

  return (
    <div className={cn(s.pageHome, "container")}>
      <UserProfileCard className={s.UserProfileCard} />

      {dailyStats && <ActivityHeatmap dailyStats={dailyStats} />}

      <DictionariesListSection className={s.dictionaries} />
    </div>
  );
};
