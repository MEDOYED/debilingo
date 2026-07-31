import { create } from "zustand";
import type { TimeTrackerWithTag } from "./types";

import { getTimeTrackers } from "../api/tracker-api";

type TimeTrackerStore = {
  statusTimeTracker: "idle" | "loading" | "loaded" | "error";
  errorMessage: string | null;
  timeTrackers: TimeTrackerWithTag[] | null;

  setTimeTrackers: (newTimeTrackers: TimeTrackerWithTag[]) => void;
  loadTimeTrackers: () => Promise<void>;
};

export const useTimeTrackerStore = create<TimeTrackerStore>((set) => ({
  statusTimeTracker: "idle",
  errorMessage: null,
  timeTrackers: null,

  setTimeTrackers: (newTimeTrackers) => {
    set({
      timeTrackers: newTimeTrackers,
    });
  },

  loadTimeTrackers: async () => {
    set({
      statusTimeTracker: "loading",
      errorMessage: null,
    });

    try {
      const data = await getTimeTrackers();

      set({
        timeTrackers: data,
        statusTimeTracker: "loaded",
        errorMessage: null,
      });
    } catch (errorCatched) {
      set({
        statusTimeTracker: "error",
        errorMessage: "Failed to load profile",
      });
    }
  },
}));
