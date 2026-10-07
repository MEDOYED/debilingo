import { Response } from "express";

import { supabase } from "../config/supabase.js";
import { AuthRequest } from "../middleware/authMiddleware";

type ProfileResponse = {
  username: string;
  dailyStreak: number;
  lastStudyDate: string | null;
  totalXp: number;
  totalStudyTimeSeconds: number;
  avatarKey: string | null;
  createdAt: string | null;
  userIdNumeric: string | null;
};

type ProfileWithUser = {
  username: string;
  daily_streak: number;
  last_study_date: string | null;
  total_xp: number;
  total_study_time_seconds: number;
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
      "username, daily_streak, last_study_date, total_xp, total_study_time_seconds, avatar_key, users(created_at, user_id_numeric)"
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
    totalStudyTimeSeconds: profileData.total_study_time_seconds,
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

export const saveStudyActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      dev_message: "Not authorized",
    });
    return;
  }

  const { xpDelta, timeDelta } = req.body;

  if (typeof xpDelta !== "number") {
    res
      .status(400)
      .json({ success: false, dev_message: "This value (xpDelta) should be a number!" });
    return;
  }

  if (xpDelta <= 0) {
    res.status(400).json({ success: false, dev_message: "xpDelta must be 1 or more" });
    return;
  }

  if (typeof timeDelta !== "number") {
    res
      .status(400)
      .json({ success: false, dev_message: "This value (timeDelta) should be a number!" });
    return;
  }

  if (!Number.isInteger(timeDelta)) {
    res.status(400).json({
      success: false,
      dev_message: `This value (timeDelta) should be a integer number! (1, 2, 3 but not 1.2 or 10.5). But timeDelta now ${timeDelta}`,
    });
    return;
  }

  if (!Number.isInteger(xpDelta)) {
    res.status(400).json({
      success: false,
      dev_message: `This value (xpDelta) should be a integer number! (1, 2, 3 but not 1.2 or 10.5). But xpDelta now ${xpDelta}`,
    });
    return;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("daily_streak, last_study_date, total_xp, total_study_time_seconds")
    .eq("user_id", userId)
    .single();

  if (profileError) {
    res.status(500).json({ success: false, dev_message: "Failed to load studyActivity data" });
    return;
  }

  if (!profileData) {
    res.status(404).json({
      success: false,
      dev_message: "studyActivity data (daily_streak, last_study_date, total_xp) not found",
    });
    return;
  }

  const { daily_streak, last_study_date, total_xp, total_study_time_seconds } = profileData;

  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let updatedStreak: number;
  let xpDeltaWithDailyStreak: number = xpDelta;

  if (last_study_date === todayStr) {
    updatedStreak = daily_streak;
  } else if (last_study_date === yesterdayStr) {
    updatedStreak = daily_streak + 1;
    xpDeltaWithDailyStreak = xpDelta + updatedStreak;
  } else {
    updatedStreak = 1;
  }

  const updatedXp = total_xp + xpDeltaWithDailyStreak;
  const updatedTime = total_study_time_seconds + timeDelta;

  const { error: updateStudyActivityError } = await supabase
    .from("profiles")
    .update({
      daily_streak: updatedStreak,
      last_study_date: todayStr,
      total_xp: updatedXp,
      total_study_time_seconds: updatedTime,
    })
    .eq("user_id", userId);

  if (updateStudyActivityError) {
    res.status(500).json({ success: false, dev_message: "Failed to update study activity" });
    return;
  }

  const data = {
    dailyStreak: updatedStreak,
    lastStudyDate: todayStr,
    totalXp: updatedXp,
    totalStudyTimeSeconds: updatedTime,
  };

  res.json({
    success: true,
    dev_message: "study activity updated successfully",
    data: data,
  });
};
