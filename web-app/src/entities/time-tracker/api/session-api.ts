import apiClient from "@shared/api/apiClient";

import type { TimeSession } from "../model/types";

export const getActiveSession = async (): Promise<TimeSession | null> => {
  const response = await apiClient.get("/sessions/active");

  return response.data;
};

export const startSession = async (trackerId: string): Promise<TimeSession> => {
  const response = await apiClient.post(
    `/time-trackers/${trackerId}/sessions/start`
  );

  return response.data;
};

export const stopSession = async (sessionId: string): Promise<TimeSession> => {
  const response = await apiClient.patch(`/sessions/${sessionId}/stop`);

  return response.data;
};
// export const updateSession;
// export const deleteSession;
// export const getTrackerSessions;
