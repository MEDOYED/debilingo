import apiClient from "@shared/api/apiClient";

import type { Period, TimeStatsResponse } from "../model/types";

export const getTimeStats = async (
  period: Period,
  start_date?: string,
  end_date?: string
): Promise<TimeStatsResponse> => {
  const response = await apiClient.get<TimeStatsResponse>("/time-stats", {
    params: { period, start_date, end_date },
  });

  return response.data;
};
