import { apiClient } from "@shared/api";

import type { LanguageDailyActivityData } from "./activity-heatmap/types";

type GetLanguageDailyActivityResponse = {
  success: boolean;
  dev_message: string;
  data: LanguageDailyActivityData[];
};

export const getLanguageDailyActivity =
  async (): Promise<GetLanguageDailyActivityResponse> => {
    const response = await apiClient.get<GetLanguageDailyActivityResponse>(
      "/language-daily-activity"
    );

    return response.data;
  };
