import apiClient from "@shared/api/apiClient";

// import type { UpdateTagRequest} from "../model/types"
// import type {CreateTagRequest} from "../model/types"
import type { TrackerTag } from "../model/types";

export const getTags = async (): Promise<TrackerTag[]> => {
  const response = await apiClient.get<TrackerTag[]>("/tracker-tags");
  return response.data;
};
