import { useState, useCallback } from "react";

import { useToastStore } from "@shared/modules/toast";

import { saveStudyActivity } from "../api/profile-api";
import { useProfileStore } from "./profile-store";
import type { SaveStudyActivityRequest } from "./types";

export const useUpdateStudyActivity = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setProfileData } = useProfileStore();
  const { addErrorMessage, addDevErrorMessage } = useToastStore();

  const updateStudyActivity = useCallback(
    async ({ xpDelta, timeDelta }: SaveStudyActivityRequest) => {
      try {
        setIsLoading(true);

        const data = await saveStudyActivity({ timeDelta, xpDelta });

        const currentProfile = useProfileStore.getState().profileData;

        if (!currentProfile) {
          addDevErrorMessage(
            "Failed to update studyActivity because profileData is not loaded yet"
          );

          throw new Error(
            "Failed to update studyActivity because profileData is not loaded yet"
          );
        }

        const newProfileData = {
          ...currentProfile,
          totalXp: data.totalXp,
          lastStudyDate: data.lastStudyDate,
          dailyStreak: data.dailyStreak,
          totalStudyTimeSeconds: data.totalStudyTimeSeconds,
        };

        setProfileData(newProfileData);

        return data;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to update study activity profile";

        addErrorMessage(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setProfileData, addErrorMessage, addDevErrorMessage]
  );

  return { isLoading, updateStudyActivity };
};
