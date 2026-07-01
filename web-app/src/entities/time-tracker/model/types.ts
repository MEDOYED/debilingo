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
