import { create } from "zustand";

import { getMyProfile, studyActivity } from "../api/profile-api";

import type { Profile } from "./types";

type ProfileStore = {
  profileData: Profile | null;
  status: "idle" | "loading" | "loaded" | "error" | "loadingStudyActivity";
  error: string | null;

  setProfileData: (newProfileData: Profile) => void;
  loadProfile: () => Promise<void>;
  updateStudyActivity: (xpDelta: number) => Promise<void>;
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

  updateStudyActivity: async (xpDelta) => {
    set({ status: "loadingStudyActivity", error: null });

    try {
      const data = await studyActivity(xpDelta);
      const { profileData } = get();

      if (!profileData) {
        set({
          status: "error",
          error:
            "Failed to update studyActivity because profileData is not loaded yet",
        });

        return;
      }

      const newProfileData = {
        ...profileData,
        totalXp: data.totalXp,
        lastStudyDate: data.lastStudyDate,
        dailyStreak: data.dailyStreak,
      };

      set({ profileData: newProfileData, status: "loaded", error: null });
    } catch (errorCatched) {
      set({ status: "error", error: "Failed to load profile" });
    }
  },
}));
