export type LeaderboardsNavItems =
  | "dailyStreak"
  | "totalStudyTime"
  | "totalXp"
  | "weeklyStudyTime"
  | "weeklyXp";

export type LeaderboardTotalXp = {
  username: string;
  totalXp: number;
};

export type Leaderboard = {
  avatar_key: string;
  daily_streak: number;
  total_study_time_seconds: number;
  total_xp: number;
  user_id: string;
  username: string;
};
