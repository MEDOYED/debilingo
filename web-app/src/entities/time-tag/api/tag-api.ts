import apiClient from "@shared/api/apiClient";

// import type { UpdateTagRequest} from "../model/types"
import type { TrackerTag } from "../model/types";

export const getTags = async (): Promise<TrackerTag[]> => {
  const response = await apiClient.get<TrackerTag[]>("/tracker-tags");
  return response.data;
};

export const createTag = async (data: {
  name: string;
  color: string;
}): Promise<TrackerTag> => {
  const response = await apiClient.post<TrackerTag>("/tracker-tags", data);

  return response.data;
};
