CREATE OR REPLACE FUNCTION "public"."get_time_tracker_stats"(
  "p_user_id" "uuid",
  "p_start_date" timestamp with time zone DEFAULT NULL,
  "p_end_date" timestamp with time zone DEFAULT NULL
)
RETURNS TABLE (
  "tracker_id" "uuid",
  "total_seconds" bigint,
  "session_count" bigint
)
LANGUAGE "sql"
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    time_sessions.tracker_id,
    COALESCE(SUM(time_sessions.duration_seconds), 0)::bigint AS total_seconds,
    COUNT(time_sessions.id)::bigint AS session_count
  FROM time_sessions
  WHERE user_id = p_user_id
    AND tracker_id IS NOT NULL
    AND ended_at IS NOT NULL
    AND (p_start_date IS NULL OR started_at >= p_start_date)
    AND (p_end_date IS NULL OR started_at <= p_end_date)
  GROUP BY tracker_id;
$$;

ALTER FUNCTION "public"."get_time_tracker_stats"("uuid", timestamp with time zone, timestamp with time zone)
OWNER TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."get_time_tracker_stats"("uuid", timestamp with time zone, timestamp with time zone)
TO "anon", "authenticated", "service_role";

CREATE INDEX IF NOT EXISTS "idx_sessions_user_tracker_ended"
  ON "public"."time_sessions" ("user_id", "tracker_id")
  WHERE ("ended_at" IS NOT NULL);