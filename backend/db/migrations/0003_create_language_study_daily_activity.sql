CREATE TABLE IF NOT EXISTS "public"."language_study_daily_activity" (
  "id" "uuid" PRIMARY KEY DEFAULT "gen_random_uuid"() NOT NULL,
  "user_id" "uuid" NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "date" "date" NOT NULL,
  "study_time_seconds" integer NOT NULL DEFAULT 0 CHECK ("study_time_seconds" >= 0),
  "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
  "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
  CONSTRAINT "language_study_daily_activity_user_date_unique" UNIQUE ("user_id", "date")
);

CREATE OR REPLACE TRIGGER "language_study_daily_activity_updated_at"
  BEFORE UPDATE ON "public"."language_study_daily_activity"
  FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();

GRANT ALL ON TABLE "public"."language_study_daily_activity" TO "anon";
GRANT ALL ON TABLE "public"."language_study_daily_activity" TO "authenticated";
GRANT ALL ON TABLE "public"."language_study_daily_activity" TO "service_role";