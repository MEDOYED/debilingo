import apiClient from "@shared/api/apiClient";

import type {
  CreateTimeTracker,
  TimeTrackerWithTag,
  UpdateTimeTracker,
} from "../model/types";

export const getTimeTrackers = async (): Promise<TimeTrackerWithTag[]> => {
  const response = await apiClient.get("/time-trackers");
  return response.data;
};

export const createTimeTracker = async (
  data: CreateTimeTracker
): Promise<TimeTrackerWithTag> => {
  const response = await apiClient.post("/time-trackers", data);
  return response.data;
};

export const updateTimeTracker = async (
  timeTrackerId: string,
  data: UpdateTimeTracker
): Promise<TimeTrackerWithTag> => {
  const response = await apiClient.put(`/time-trackers/${timeTrackerId}`, data);

  return response.data;
};

export const deleteTimeTracker = async (
  timeTrackerId: string
): Promise<void> => {
  await apiClient.delete(`/time-trackers/${timeTrackerId}`);
};
