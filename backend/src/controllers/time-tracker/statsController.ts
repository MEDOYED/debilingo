import { Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

export const getTimeStats = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  const { period, start_date, end_date } = req.query as {
    period?: string;
    start_date?: string;
    end_date?: string;
  };

  // let startDate: string;

  let pStartDate: string | null = null;
  let pEndDate: string | null = null;

  const now = new Date();

  switch (period) {
    case "1d":
      pStartDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      pEndDate = now.toISOString();
      break;
    case "7d":
      pStartDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      pEndDate = now.toISOString();
      break;
    case "30d":
      pStartDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      pEndDate = now.toISOString();
      break;
    case "custom":
      pStartDate = start_date || "1970-01-01";
      pEndDate = end_date ? new Date(end_date + "T23:59:59.999Z").toISOString() : now.toISOString();
      break;
    case "all":
    default:
      pStartDate = null;
      pEndDate = null;
      break;
  }

  const { data: statsData, error: statsError } = await supabase.rpc("get_time_tracker_stats", {
    p_user_id: userId,
    p_start_date: pStartDate,
    p_end_date: pEndDate,
  });

  if (statsError) {
    res.status(500).json({
      success: false,
      dev_message: "[500]: get_time_tracker_stats: failed to fetch stats",
    });
    return;
  }

  const { data: tags } = await supabase.from("tracker_tags").select("*").eq("user_id", userId);

  const statsMap = new Map<string, { total_seconds: number; session_count: number }>();
  (statsData || []).forEach((row: any) => {
    statsMap.set(row.tracker_id, {
      total_seconds: Number(row.total_seconds) || 0,
      session_count: Number(row.session_count) || 0,
    });
  });

  const { data: trackers } = await supabase
    .from("time_trackers")
    .select(`*, tag:tracker_tags(*)`)
    .eq("user_id", userId);

  if (!trackers) {
    res
      .status(404)
      .json({ success: false, dev_message: "statsController[404]: trackers not founded" });
    return;
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
    const stat = statsMap.get(tracker.id) || { total_seconds: 0, session_count: 0 };

    const trackerStat = {
      id: tracker.id,
      name: tracker.name,
      color: tracker.color,
      total_seconds: stat.total_seconds,
      session_count: stat.session_count,
    };

    if (tracker.tag_id && tagMap.has(tracker.tag_id)) {
      const tagGroup = tagMap.get(tracker.tag_id);
      tagGroup.total_seconds += stat.total_seconds;
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

  const allTrackersTotalSeconds = tagsResult.reduce((s, t) => s + t.total_seconds, 0);

  res.json({
    period: period || "all",
    total_seconds: allTrackersTotalSeconds,
    tags: tagsResult,
  });
};
