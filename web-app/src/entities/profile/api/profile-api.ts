import apiClient from "@shared/api/apiClient";

import type {
  Profile,
  SaveStudyActivityResponse,
  UpdateUsernameResponse,
  SaveStudyActivityRequest,
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

export const saveStudyActivity = async ({
  xpDelta,
  timeDelta,
}: SaveStudyActivityRequest): Promise<SaveStudyActivityResponse> => {
  const response = await apiClient.post("/profile/study", {
    xpDelta,
    timeDelta,
  });

  return response.data;
};
