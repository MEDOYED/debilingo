import { NextFunction, Response } from "express";
import { supabase } from "../../config/supabase.js";
import { AuthRequest } from "../../middleware/authMiddleware.js";

const getLocalDate = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

type RecordLanguageDailyStudyTimeParams = {
  userId: string;
  timeDelta: number;
};

export const recordLanguageDailyStudyTime = async ({
  userId,
  timeDelta,
}: RecordLanguageDailyStudyTimeParams): Promise<{
  date: string;
  todayDailyStudyTimeSeconds: number;
}> => {
  const todayDate = getLocalDate();

  // get existed data
  const { data: existedDailyActivityRowData, error: existedDailyActivityError } = await supabase
    .from("language_study_daily_activity")
    .select("*")
    .eq("user_id", userId)
    .eq("date", todayDate)
    .maybeSingle();

  if (existedDailyActivityError) {
    throw new Error(
      "[500] recordLanguageDailyStudyTime: error on fetching existed language activity data"
    );
  }

  let results;

  if (existedDailyActivityRowData) {
    const { data, error } = await supabase
      .from("language_study_daily_activity")
      .update({
        study_time_seconds: existedDailyActivityRowData.study_time_seconds + timeDelta,
      })
      .eq("id", existedDailyActivityRowData.id)
      .select()
      .single();

    if (error) {
      throw new Error(`[500 recordLanguageDailyStudyTime]: ${error.message}`);
    }

    results = data;
  } else {
    const { data, error } = await supabase
      .from("language_study_daily_activity")
      .insert({
        user_id: userId,
        date: todayDate,
        study_time_seconds: timeDelta,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`[500 recordLanguageDailyStudyTime]: ${error.message}`);
    }

    results = data;
  }

  return {
    date: todayDate,
    todayDailyStudyTimeSeconds: (results?.study_time_seconds as number) ?? timeDelta,
  };
};

export const getLanguageDailyActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req;

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const oneYearAgoStr = getLocalDate(oneYearAgo);

  try {
    const { data, error } = await supabase
      .from("language_study_daily_activity")
      .select("*")
      .eq("user_id", userId)
      .gte("date", oneYearAgoStr)
      .order("date", { ascending: true });

    if (error) {
      res.status(500).json({
        success: false,
        dev_message: `[500 getLanguageDailyActivity]: error on fetching data from language_study_daily_activity table: ${error.message}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    next(error);
  }
};
