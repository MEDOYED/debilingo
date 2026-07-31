export interface TrackerTag {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface TimeTracker {
  id: string;
  user_id: string;
  tag_id: string | null;
  name: string;
  color: string;
  created_at: string;
}

export interface TimeTrackerWithTag extends TimeTracker {
  tag: TrackerTag | null;
}

export interface TimeSession {
  id: string;
  user_id: string;
  tracker_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  created_at: string;
}

export interface CreateTagRequest {
  name: string;
  color: string;
}

export interface UpdateTagRequest {
  name?: string;
  color?: string;
}

export interface CreateTrackerRequest {
  name: string;
  color: string;
  tag_id: string;
}

export interface UpdateTrackerRequest {
  name?: string;
  color?: string;
  tag_id?: string | null;
}

export interface UpdateSessionRequest {
  started_at?: string;
  ended_at?: string;
}
export interface TagStats {
  tag: TrackerTag;
  total_seconds: number;
  trackers: TrackerStatItem[];
}

export interface TrackerStatItem {
  id: string;
  name: string;
  color: string;
  total_seconds: number;
  session_count: number;
}

export interface TimeStatsResponse {
  period: string;
  total_seconds: number;
  tags: TagStats[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UpdateHabitTimeGoalRequest {
  habit_time_goal: number;
}

export interface HabitTracker extends TimeTrackerWithTag {
  habit_time_goal: number;
}

export interface HabitDayStats {
  total_seconds: number;
  session_count: number;
}

export interface HabitTrackerStat {
  id: string;
  name: string;
  color: string;
  tag: TrackerTag | null;
  habit_time_goal: number;
  days: Record<string, HabitDayStats>;
}

export interface HabitSessionsResponse {
  start_date: string;
  end_date: string;
  trackers: HabitTrackerStat[];
}
