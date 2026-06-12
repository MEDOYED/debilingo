import { Response } from "express";
import { supabase } from "../config/supabase.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export const getLeaderboardTotalXp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data: totalData, error } = await supabase
      .from("profiles")
      .select("username, total_xp, user_id, daily_streak, avatar_key, total_study_time_seconds")
      .order("total_xp", { ascending: false })
      .limit(10);

    if (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
      return;
    }

    res.json(totalData || []);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
