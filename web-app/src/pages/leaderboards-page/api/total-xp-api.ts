import apiClient from "@shared/api/apiClient";

import type { Leaderboard } from "../model/types";

export const getLeaderboardTotalXp = async (): Promise<Leaderboard[]> => {
  const response = await apiClient.get<Leaderboard[]>("/leaderboards/totalXp");

  return response.data;
};
