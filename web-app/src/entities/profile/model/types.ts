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

export type StudyResponse = {
  dailyStreak: Profile["dailyStreak"];
  lastStudyDate: Profile["lastStudyDate"];
  totalXp: Profile["totalXp"];
  totalStudyTimeSeconds: Profile["totalStudyTimeSeconds"];
};
