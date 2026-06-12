// import s from "./leaderboards-page.module.scss";

import { useEffect, useState } from "react";

import { LeaderboardsNavigationCard } from "./ui/leaderboards-navigation-card";

import { getLeaderboardTotalXp } from "./api/total-xp-api";

import type { Leaderboard } from "./model/types";
import { LeaderboardTable } from "./ui/leaderboard/leaderboard";

export const LeaderboardsPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[] | null>(
    null
  );

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = await getLeaderboardTotalXp();

    console.log(data);
    setLeaderboardData(data);
  };

  return (
    <main className="container">
      <LeaderboardsNavigationCard />

      <LeaderboardTable leaderboardData={leaderboardData} />
    </main>
  );
};
