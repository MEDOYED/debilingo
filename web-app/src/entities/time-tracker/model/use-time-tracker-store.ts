import { create } from "zustand";
import type { TimeTrackerWithTag } from "./types";

import { getTimeTrackers } from "../api/tracker-api";

type TimeTrackerStore = {
  status: "idle" | "loading" | "loaded" | "error";
  errorMessage: string | null;
  timeTrackers: TimeTrackerWithTag[] | null;

  setTimeTrackers: (newTimeTrackers: TimeTrackerWithTag[]) => void;
  loadTimeTrackers: () => Promise<void>;
};

export const useTimeTrackerStore = create<TimeTrackerStore>((set) => ({
  status: "idle",
  errorMessage: null,
  timeTrackers: null,

  setTimeTrackers: (newTimeTrackers) => {
    set({
      timeTrackers: newTimeTrackers,
    });
  },

  loadTimeTrackers: async () => {
    set({
      status: "loading",
      errorMessage: null,
    });

    try {
      const data = await getTimeTrackers();

      set({
        timeTrackers: data,
        status: "loaded",
        errorMessage: null,
      });
    } catch (errorCatched) {
      set({
        status: "error",
        errorMessage: "Failed to load profile",
      });
    }
  },
}));
