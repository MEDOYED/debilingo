import { Response } from "express";

import { supabase } from "../config/supabase";
import { AuthRequest } from "../middleware/authMiddleware";

type ProfileResponse = {
  username: string;
  dailyStreak: number;
  lastStudyDate: string | null;
  totalXp: number;
  avatarKey: string | null;
  createdAt: string | null;
  userIdNumeric: string | null;
};

type ProfileWithUser = {
  username: string;
  daily_streak: number;
  last_study_date: string | null;
  total_xp: number;
  avatar_key: string | null;
  users: {
    created_at: string;
    user_id_numeric: string;
  } | null;
};

export const getMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      error: "Not authorized",
    });
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "username, daily_streak, last_study_date, total_xp, avatar_key, users(created_at, user_id_numeric)"
    )
    .eq("user_id", userId)
    .single<ProfileWithUser>();

  if (error) {
    res.status(500).json({ error: "Failed to load profile" });
    return;
  }

  if (!data) {
    res.status(404).json({
      error: "Profile not found",
    });
    return;
  }

  const profileData = data as ProfileWithUser;

  const response: ProfileResponse = {
    username: profileData.username,
    dailyStreak: profileData.daily_streak,
    lastStudyDate: profileData.last_study_date,
    totalXp: profileData.total_xp,
    avatarKey: profileData.avatar_key,
    createdAt: profileData.users?.created_at ?? null,
    userIdNumeric: profileData.users?.user_id_numeric ?? null,
  };

  res.json(response);
};

export const updateMyUsername = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        error: "Not authorized",
      });
      return;
    }

    const { newUsernameValue } = req.body;

    if (typeof newUsernameValue !== "string") {
      res.status(400).json({ error: "This is not a string! This value should be a string" });
      return;
    }

    if (newUsernameValue.length > 16) {
      res.status(400).json({ error: "Invalid length: length should be 16 or less symbol" });
      return;
    }

    if (newUsernameValue.length < 1) {
      res.status(400).json({ error: "Invalid length: length should be 1 and more symbol" });
      return;
    }

    const { error: updateUsernameError } = await supabase
      .from("profiles")
      .update({
        username: newUsernameValue,
      })
      .eq("user_id", userId);

    if (updateUsernameError?.code === "23505") {
      res.status(409).json({ error: "Duplicated username" });
      return;
    }

    if (updateUsernameError) {
      res.status(500).json({ error: "Failed to update username" });
      return;
    }

    res.json({ newUsernameValue });
  } catch (error) {
    console.log("upgateMyUsername error: ", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const studyActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      error: "Not authorized",
    });
    return;
  }

  // ---

  const { xpDelta } = req.body;

  if (typeof xpDelta !== "number") {
    res.status(400).json({ error: "This value should be a number!" });
    return;
  }

  // ---

  if (xpDelta <= 0) {
    res.status(400).json({ error: "xpDelta must be 1 or more" });
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("daily_streak, last_study_date, total_xp")
    .eq("user_id", userId)
    .single();

  if (error) {
    res.status(500).json({ error: "Failed to load studyActivity data" });
    return;
  }

  if (!data) {
    res.status(404).json({
      error: "studyActivity data (daily_streak, last_study_date, total_xp) not found",
    });
    return;
  }

  const { daily_streak, last_study_date, total_xp } = data;

  // ---

  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let updatedStreak: number;

  if (last_study_date === todayStr) {
    updatedStreak = daily_streak;
  } else if (last_study_date === yesterdayStr) {
    updatedStreak = daily_streak + 1;
  } else {
    updatedStreak = 1;
  }

  // ---

  const updatedXp = total_xp + xpDelta;

  const { error: updateStudyActivityError } = await supabase
    .from("profiles")
    .update({
      daily_streak: updatedStreak,
      last_study_date: todayStr,
      total_xp: updatedXp,
    })
    .eq("user_id", userId);

  if (updateStudyActivityError) {
    res.status(500).json({ error: "Failed to update study activity" });
    return;
  }

  res.json({ dailyStreak: updatedStreak, lastStudyDate: todayStr, totalXp: updatedXp });
};
