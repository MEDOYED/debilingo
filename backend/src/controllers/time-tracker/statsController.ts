import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export const getTimeStats = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) { res.status(401).json({ error: "Not authorized" }); return; }

  const { period, start_date, end_date } = req.query as {
    period?: string;
    start_date?: string;
    end_date?: string;
  };

  let startDate: string;
  const now = new Date();

  switch (period) {
    case "1d":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      break;
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      break;
    case "custom":
      startDate = start_date || "1970-01-01";
      break;
    case "all":
    default:
      startDate = "1970-01-01";
      break;
  }

  const endDate = period === "custom" && end_date ? end_date : new Date().toISOString().split("T")[0];

  const { data: tags } = await supabase
    .from("tracker_tags")
    .select("*")
    .eq("user_id", userId);

  const { data: trackers } = await supabase
    .from("time_trackers")
    .select(`*, tag:tracker_tags(*)`)
    .eq("user_id", userId);

  const { data: sessions } = await supabase
    .from("time_sessions")
    .select("*")
    .eq("user_id", userId)
    .not("ended_at", "is", null)
    .gte("started_at", startDate)
    .lte("started_at", endDate + "T23:59:59.999Z");

  if (!trackers || !sessions) {
    res.status(500).json({ error: "Failed to fetch stats" }); return;
  }

  const tagMap = new Map<string, any>();
  const untaggedTrackers: any[] = [];

  (tags || []).forEach((tag: any) => {
    tagMap.set(tag.id, {
      tag,
      total_seconds: 0,
      trackers: [],
    });
  });

  trackers.forEach((tracker: any) => {
    const trackerSessions = sessions.filter((s: any) => s.tracker_id === tracker.id);
    const totalSeconds = trackerSessions.reduce(
      (sum: number, s: any) => sum + (s.duration_seconds || 0),
      0
    );
    const sessionCount = trackerSessions.length;

    const trackerStat = {
      id: tracker.id,
      name: tracker.name,
      color: tracker.color,
      total_seconds: totalSeconds,
      session_count: sessionCount,
    };

    if (tracker.tag_id && tagMap.has(tracker.tag_id)) {
      const tagGroup = tagMap.get(tracker.tag_id);
      tagGroup.total_seconds += totalSeconds;
      tagGroup.trackers.push(trackerStat);
    } else {
      untaggedTrackers.push(trackerStat);
    }
  });

  const tagsResult = Array.from(tagMap.values()).filter((t) => t.trackers.length > 0);

  if (untaggedTrackers.length > 0) {
    const untaggedTotal = untaggedTrackers.reduce((s, t) => s + t.total_seconds, 0);
    tagsResult.push({
      tag: { id: null, name: "Untagged", color: "#78716c" },
      total_seconds: untaggedTotal,
      trackers: untaggedTrackers,
    });
  }

  tagsResult.forEach((t) => t.trackers.sort((a: any, b: any) => b.total_seconds - a.total_seconds));

  const grandTotal = tagsResult.reduce((s, t) => s + t.total_seconds, 0);

  res.json({
    period: period || "all",
    total_seconds: grandTotal,
    tags: tagsResult,
  });
};
