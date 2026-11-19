export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export type HeatmapDay = {
  date: string;
  studyTimeSeconds: number;
  activityLevel: ActivityLevel;
  isToday: boolean;
};

export type LanguageDailyActivityData = {
  id: string;
  user_id: string;
  date: string;
  study_time_seconds: number;
  created_at: string;
  updated_at: string;
};
