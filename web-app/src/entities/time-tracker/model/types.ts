import type { TrackerTag } from "@entities/time-tag";

export interface TimeTracker {
  id: string;
  user_id: string;
  tag_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface TimeTrackerWithTag extends TimeTracker {
  tag: TrackerTag | null;
}

export interface CreateTimeTracker {
  name: string;
  color: string;
  tag_id: string;
}

export interface UpdateTimeTracker {
  name?: string;
  color?: string;
  tag_id?: string;
}

export interface TimeSession {
  id: string;
  user_id: string;
  tracker_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  created_at: string;
  tracker?: TimeTrackerWithTag;
}

export type Period = "1d" | "7d" | "30d" | "custom" | "all";

export interface TrackerStatItem {
  id: string;
  name: string;
  color: string;
  total_seconds: number;
  session_count: number;
}

export interface TagStats {
  tag: TrackerTag;
  total_seconds: number;
  trackers: TrackerStatItem[];
}

export interface TimeStatsResponse {
  period: Period;
  total_seconds: number;
  tags: TagStats[];
}
