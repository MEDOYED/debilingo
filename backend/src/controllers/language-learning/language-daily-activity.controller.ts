import { supabase } from "../../config/supabase.js";

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
  const getLocalDate = (date: Date = new Date()): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

// getLanguageDailyActivity
