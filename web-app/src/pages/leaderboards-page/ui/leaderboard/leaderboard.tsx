import type { Leaderboard } from "../../model/types";
import { useLeaderboardsNavigationStore } from "../../model/use-leaderboards-navigation-store";

import s from "./leaderboard.module.scss";

type LeaderboardProps = {
  leaderboardData: Leaderboard[] | null;
};

export const LeaderboardTable = ({ leaderboardData }: LeaderboardProps) => {
  const { activeNavItem } = useLeaderboardsNavigationStore();

  if (!leaderboardData) {
    return (
      <div>
        <span>Loading leaderboard...</span>
      </div>
    );
  }

  return (
    <ul className={s.list}>
      {leaderboardData.map((item, index) => {
        return (
          <li
            className={s.listItem}
            key={index}
          >
            <div className={s.positonNumber}>{index + 1}</div>
            <div className={s.username}>{item.username}</div>
            {activeNavItem === "totalXp" && (
              <div className={s.leaderboardValue}>{item.total_xp}</div>
            )}

            {activeNavItem === "totalStudyTime" && (
              <div className={s.leaderboardValue}>
                {item.total_study_time_seconds}
              </div>
            )}

            {activeNavItem === "dailyStreak" && (
              <div className={s.leaderboardValue}>{item.daily_streak}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
