import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";
import { UpdateHabitTimeGoalRequest } from "../../types/timeTracker.js";

import type {
  HabitDayStats,
  HabitSessionsResponse,
  HabitTracker,
  HabitTrackerStat,
  TimeSession,
} from "../../types/timeTracker.js";

export const updateHabitTimeGoal = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { time_tracker_id } = req.params;
  if (
    !time_tracker_id ||
    typeof time_tracker_id !== "string" ||
    time_tracker_id.trim().length === 0
  ) {
    res.status(400).json({ error: "time_tracker_id is required" });
    return;
  }

  const { habit_time_goal } = req.body as UpdateHabitTimeGoalRequest;
  if (!habit_time_goal || typeof habit_time_goal !== "number") {
    res.status(400).json({ error: "habit_time_goal is required" });
    return;
  }

  const { data, error } = await supabase
    .from("time_trackers")
    .update({ habit_time_goal })
    .eq("id", time_tracker_id)
    .eq("user_id", userId)
    .select(`*, tag:tracker_tags(*)`)
    .single();

  if (error) {
    res.status(500).json({ error: "Failed to update habit time goal for tracker" });
    return;
  }

  res.json(data);
};

// export const deleteHabitTracker = async (req: AuthRequest, res: Response): Promise<void> => {};

export const getHabitSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { period, start_date, end_date, timezone_offset } = req.query as {
    period?: "custom";
    start_date?: string;
    end_date?: string;
    timezone_offset?: string;
  };

  const offsetMinutes = Number(timezone_offset) || 0;
  const offsetMs = offsetMinutes * 60 * 1000;

  const startDate = period === "custom" && start_date ? start_date : "2026-07-27";

  const endDate =
    period === "custom" && end_date ? end_date : new Date().toISOString().split("T")[0];

  const rangeStart = new Date(
    new Date(`${startDate}T00:00:00.000Z`).getTime() - offsetMs
  ).toISOString();

  const rangeEnd = new Date(
    new Date(`${endDate}T23:59:59.999Z`).getTime() - offsetMs
  ).toISOString();

  const { data: habitTrackersData, error: habitTrackersError } = await supabase
    .from("time_trackers")
    .select(`*, tag:tracker_tags(*)`)
    .eq("user_id", userId)
    .not("habit_time_goal", "is", null);

  const { data: sessionsData, error: sessionsError } = await supabase
    .from("time_sessions")
    .select("*")
    .eq("user_id", userId)
    .not("ended_at", "is", null)
    .gte("started_at", rangeStart)
    .lte("started_at", rangeEnd);

  if (habitTrackersError || sessionsError) {
    res.status(500).json({ error: "Failed to fetch habit sessions" });
    return;
  }

  const habitTrackers = (habitTrackersData || []) as HabitTracker[];
  const sessions = (sessionsData || []) as TimeSession[];

  const trackersResult: HabitTrackerStat[] = habitTrackers.map((tracker) => {
    const trackerSessions = sessions.filter((session) => session.tracker_id === tracker.id);

    const days: Record<string, HabitDayStats> = {};

    trackerSessions.forEach((session) => {
      const day = new Date(new Date(session.started_at).getTime() + offsetMs)
        .toISOString()
        .slice(0, 10);

      if (!days[day]) {
        days[day] = { total_seconds: 0, session_count: 0 };
      }

      days[day].total_seconds += session.duration_seconds || 0;
      days[day].session_count += 1;
    });

    return {
      id: tracker.id,
      name: tracker.name,
      color: tracker.color,
      tag: tracker.tag,
      habit_time_goal: tracker.habit_time_goal,
      days,
    };
  });

  const responseData: HabitSessionsResponse = {
    start_date: startDate,
    end_date: endDate,
    trackers: trackersResult,
  };

  res.json(responseData);
};
