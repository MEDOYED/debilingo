import { cn } from "@shared/lib/styles";

import s from "./leaderboards-navigation-card.module.scss";

import { useLeaderboardsNavigationStore } from "../model/use-leaderboards-navigation-store";

export const LeaderboardsNavigationCard = () => {
  const { activeNavItem, setActiveNavItem } = useLeaderboardsNavigationStore();

  return (
    <div className={s.leaderboardsNavigationCard}>
      <div className={s.card}>
        <h2 className={s.cardTitle}>All time</h2>

        <ul className={s.list}>
          <li
            onClick={() => setActiveNavItem("totalXp")}
            className={cn(s.listItem, activeNavItem === "totalXp" && s.active)}
          >
            xp
          </li>

          <li
            onClick={() => setActiveNavItem("totalStudyTime")}
            className={cn(
              s.listItem,
              activeNavItem === "totalStudyTime" && s.active
            )}
          >
            study time
          </li>

          <li
            onClick={() => setActiveNavItem("dailyStreak")}
            className={cn(
              s.listItem,
              activeNavItem === "dailyStreak" && s.active
            )}
          >
            daily streak
          </li>
        </ul>
      </div>

      <div className={s.card}>
        <h2 className={s.cardTitle}>This week</h2>

        <ul className={s.list}>
          <li
            onClick={() => setActiveNavItem("weeklyXp")}
            className={cn(s.listItem, activeNavItem === "weeklyXp" && s.active)}
          >
            xp
          </li>
          <li
            onClick={() => setActiveNavItem("weeklyStudyTime")}
            className={cn(
              s.listItem,
              activeNavItem === "weeklyStudyTime" && s.active
            )}
          >
            study time
          </li>
        </ul>
      </div>
    </div>
  );
};
