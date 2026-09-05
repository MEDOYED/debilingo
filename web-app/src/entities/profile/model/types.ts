export type Profile = {
  username: string;
  dailyStreak: number;
  lastStudyDate: string | null;
  totalXp: number;
  totalStudyTimeSeconds: number;
  avatarKey: string | null;
  createdAt: string | null;
  userIdNumeric: string | null;
};

export type UpdateUsernameResponse = {
  newUsernameValue: string;
};

export type SaveStudyActivityResponse = {
  dailyStreak: Profile["dailyStreak"];
  lastStudyDate: Profile["lastStudyDate"];
  totalXp: Profile["totalXp"];
  totalStudyTimeSeconds: Profile["totalStudyTimeSeconds"];
};

export type SaveStudyActivityRequest = {
  xpDelta: number;
  timeDelta: number;
};
