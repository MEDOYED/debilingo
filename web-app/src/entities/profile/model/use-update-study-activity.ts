import { useState, useCallback } from "react";

import { useToastStore } from "@shared/modules/toast";
import { ApiError } from "@shared/api";

import { saveStudyActivity } from "../api/profile-api";
import { useProfileStore } from "./profile-store";
import type { SaveStudyActivityRequest } from "./types";

interface UpdateStudyActivityArgs extends SaveStudyActivityRequest {
  showClientToast?: boolean;
}

export const useUpdateStudyActivity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setProfileData } = useProfileStore();
  const { addErrorMessage, addDevErrorMessage, addDevSuccessMessage } =
    useToastStore();

  const updateStudyActivity = useCallback(
    async ({
      xpDelta,
      timeDelta,
      showClientToast = true,
    }: UpdateStudyActivityArgs) => {
      try {
        setIsLoading(true);

        const response = await saveStudyActivity({ timeDelta, xpDelta });

        const currentProfile = useProfileStore.getState().profileData;

        if (!currentProfile) {
          throw new ApiError({
            clientMessage:
              "Failed to update studyActivity because profileData is not loaded yet",
            devMessage:
              "Failed to update studyActivity because profileData is not loaded yet",
          });
        }

        if (!response.data) {
          throw new ApiError({
            devMessage: "Failed to get profileData from response.data",
            clientMessage: "Failed to update study activity",
          });
        }

        const newProfileData = {
          ...currentProfile,
          totalXp: response.data.totalXp,
          lastStudyDate: response.data.lastStudyDate,
          dailyStreak: response.data.dailyStreak,
          totalStudyTimeSeconds: response.data.totalStudyTimeSeconds,
        };

        setProfileData(newProfileData);

        addDevSuccessMessage(
          `Successfull update study activity. \n Add +${xpDelta}xp and +${timeDelta}seconds. \n New profile data: ${response.data.totalXp}XP and ${response.data.totalStudyTimeSeconds}seconds`
        );

        return response;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.devMessage) {
            addDevErrorMessage(error.devMessage);
          }

          if (showClientToast === true) {
            addErrorMessage(
              error.clientMessage || "Failed to update study activity profile"
            );
          }
        } else if (error instanceof Error && showClientToast === true) {
          addErrorMessage(error.message);
        } else if (showClientToast === true) {
          addErrorMessage("Failed to update study activity profile");
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setProfileData, addErrorMessage, addDevErrorMessage]
  );

  return { isLoading, updateStudyActivity };
};
