import apiClient from "@shared/api/apiClient";

import type {
  Profile,
  StudyResponse,
  UpdateUsernameResponse,
} from "../model/types";

export const getMyProfile = async (): Promise<Profile> => {
  const response = await apiClient.get<Profile>("/profile/me");
  return response.data;
};

export const updateMyUsername = async (
  newUsernameValue: string
): Promise<UpdateUsernameResponse> => {
  const response = await apiClient.patch("/profile/me", { newUsernameValue });

  return response.data;
};

export const studyActivity = async (
  xpDelta: number
): Promise<StudyResponse> => {
  const response = await apiClient.post("/profile/study", { xpDelta });

  return response.data;
};
