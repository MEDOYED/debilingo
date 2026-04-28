import { create } from "zustand";

import { getMyProfile } from "../api/profile-api";
import type { Profile } from "./types";

type ProfileStore = {
  profileData: Profile | null;
  status: "idle" | "loading" | "loaded" | "error";
  error: string | null;

  setProfileData: (newProfileData: Profile) => void;
  loadProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set) => ({
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
}));
