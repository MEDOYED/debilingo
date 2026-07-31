import apiClient from "@shared/api/apiClient";

import type { HabitSessionsResponse, TimeTrackerWithTag } from "../model/types";

export const updateHabitTimeGoal = async (
  timeTrackerId: string,
  habitTimeGoal: number
): Promise<TimeTrackerWithTag> => {
  const response = await apiClient.patch(`/habit-trackers/${timeTrackerId}`, {
    habit_time_goal: habitTimeGoal,
  });

  return response.data;
};

export const getHabitSessions = async (
  start_date: string,
  end_date: string
): Promise<HabitSessionsResponse> => {
  const timezoneOffsetMinutes = -new Date().getTimezoneOffset();

  const response = await apiClient.get<HabitSessionsResponse>(
    "/habit-trackers/days-stats",
    {
      params: {
        period: "custom",
        start_date,
        end_date,
        timezone_offset: timezoneOffsetMinutes,
      },
    }
  );
  return response.data;
};
