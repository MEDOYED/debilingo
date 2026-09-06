import { create } from "zustand";

import { ApiError } from "@shared/api";

import { getMyProfile, saveStudyActivity } from "../api/profile-api";

import type { Profile } from "./types";

type ProfileStore = {
  profileData: Profile | null;
  status: "idle" | "loading" | "loaded" | "error" | "loadingStudyActivity";
  error: string | null;

  setProfileData: (newProfileData: Profile) => void;
  loadProfile: () => Promise<void>;

  /**
   * * ⚠️ **DEPRECATED**
   * Use `useUpdateStudyActivity` hook from `@entities/profile` instead.
   * This method will be removed in future versions.
   *
   * @deprecated
   */
  updateStudyActivity: (xpDelta: number, timeDelta: number) => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profileData: null,
  status: "idle",
  error: null,

  setProfileData: (newProfileData) => {
    set({
      profileData: newProfileData,
    });
  },

  loadProfile: async () => {
    set({ status: "loading", error: null });

    try {
      const data = await getMyProfile();
      set({ profileData: data, status: "loaded", error: null });
    } catch (errorCatched) {
      set({ status: "error", error: "Failed to load profile" });
    }
  },

  updateStudyActivity: async (xpDelta, timeDelta) => {
    set({ status: "loadingStudyActivity", error: null });

    try {
      const response = await saveStudyActivity({ xpDelta, timeDelta });
      const { profileData } = get();

      if (!profileData) {
        set({
          status: "error",
          error:
            "Failed to update studyActivity because profileData is not loaded yet",
        });

        return;
      }

      if (!response.data) {
        throw new ApiError({
          devMessage: "Failed to get profileData from response.data",
          clientMessage: "Failed to update study activity",
        });
      }

      const newProfileData = {
        ...profileData,
        totalXp: response.data.totalXp,
        lastStudyDate: response.data.lastStudyDate,
        dailyStreak: response.data.dailyStreak,
        totalStudyTimeSeconds: response.data.totalStudyTimeSeconds,
      };

      set({ profileData: newProfileData, status: "loaded", error: null });
    } catch (errorCatched) {
      set({ status: "error", error: "Failed to load profile" });
    }
  },
}));
