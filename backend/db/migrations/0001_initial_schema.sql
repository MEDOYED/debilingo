


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."assign_unique_user_id_numeric"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  candidate text;
  attempts int := 0;
BEGIN
  IF NEW.user_id_numeric IS NULL OR NEW.user_id_numeric = '' THEN
    LOOP
      attempts := attempts + 1;
      candidate := public.random_10_digit_text();
      PERFORM 1 FROM public.users WHERE user_id_numeric = candidate;
      IF NOT FOUND THEN
        NEW.user_id_numeric := candidate;
        EXIT;
      END IF;
      IF attempts >= 20 THEN
        RAISE EXCEPTION 'Failed to generate unique user_id_numeric after % attempts', attempts;
      END IF;
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."assign_unique_user_id_numeric"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."random_10_digit_text"() RETURNS "text"
    LANGUAGE "sql"
    AS $$
  SELECT lpad((floor(random() * 10000000000))::bigint::text, 10, '0');
$$;


ALTER FUNCTION "public"."random_10_digit_text"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."shuffle_dictionary_words"("p_dict_id" "uuid") RETURNS "void"
    LANGUAGE "sql"
    AS $$
  UPDATE words
  SET shuffle_order = random()
  WHERE dictionary_id = p_dict_id;
$$;


ALTER FUNCTION "public"."shuffle_dictionary_words"("p_dict_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_modified_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_modified_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
  BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
  END;
  $$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."cats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "latitude" double precision NOT NULL,
    "longitude" double precision NOT NULL,
    "location_name" "text",
    "breed" "text",
    "rarity" "text" DEFAULT 'Common'::"text",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."cats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."daily_activity" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "date" "date" NOT NULL,
    "money_count" integer NOT NULL,
    "user_id" "uuid" DEFAULT '00000000-0000-0000-0000-000000000000'::"uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "study_time_seconds" integer DEFAULT 0,
    CONSTRAINT "daily_activity_money_count_check" CHECK ((("money_count" >= 0) AND ("money_count" <= 100000)))
);


ALTER TABLE "public"."daily_activity" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."definitions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "word_id" "uuid",
    "text" "text" NOT NULL,
    "order_index" integer DEFAULT 0
);


ALTER TABLE "public"."definitions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."dictionaries" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "main_language" "text" NOT NULL,
    "secondary_language" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."dictionaries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."examples" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "word_id" "uuid",
    "text" "text" NOT NULL,
    "order_index" integer DEFAULT 0
);


ALTER TABLE "public"."examples" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "user_id" "uuid" NOT NULL,
    "username" "text" NOT NULL,
    "daily_streak" integer DEFAULT 0 NOT NULL,
    "last_study_date" "date",
    "total_xp" integer DEFAULT 0 NOT NULL,
    "avatar_key" "text" DEFAULT 'debilingo-logo'::"text",
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "total_study_time_seconds" integer DEFAULT 0
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."time_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "tracker_id" "uuid",
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "ended_at" timestamp with time zone,
    "duration_seconds" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."time_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."time_trackers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "tag_id" "uuid",
    "name" "text" NOT NULL,
    "color" "text" DEFAULT '#6366f1'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "habit_time_goal" integer
);


ALTER TABLE "public"."time_trackers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tracker_tags" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "color" "text" DEFAULT '#6366f1'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."tracker_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."translations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "word_id" "uuid",
    "text" "text" NOT NULL,
    "order_index" integer DEFAULT 0
);


ALTER TABLE "public"."translations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "password_hash" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id_numeric" "text" NOT NULL,
    CONSTRAINT "users_user_id_numeric_digits" CHECK (("user_id_numeric" ~ '^[0-9]+$'::"text")),
    CONSTRAINT "users_user_id_numeric_length" CHECK (("length"("user_id_numeric") = 10))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."users_user_id_numeric_seq"
    START WITH 1000000000
    INCREMENT BY 1
    MINVALUE 1000000000
    MAXVALUE 9999999999
    CACHE 1;


ALTER SEQUENCE "public"."users_user_id_numeric_seq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."words" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "dictionary_id" "uuid",
    "source_word" "text" NOT NULL,
    "note" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "pinned_at" timestamp with time zone,
    "shuffle_order" real,
    "is_pinned" boolean DEFAULT false
);


ALTER TABLE "public"."words" OWNER TO "postgres";


ALTER TABLE ONLY "public"."cats"
    ADD CONSTRAINT "cats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_activity"
    ADD CONSTRAINT "daily_activity_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."definitions"
    ADD CONSTRAINT "definitions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."dictionaries"
    ADD CONSTRAINT "dictionaries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."examples"
    ADD CONSTRAINT "examples_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."time_sessions"
    ADD CONSTRAINT "time_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."time_trackers"
    ADD CONSTRAINT "time_trackers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tracker_tags"
    ADD CONSTRAINT "tracker_tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tracker_tags"
    ADD CONSTRAINT "tracker_tags_user_id_name_key" UNIQUE ("user_id", "name");



ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_user_id_numeric_key" UNIQUE ("user_id_numeric");



ALTER TABLE ONLY "public"."words"
    ADD CONSTRAINT "words_pkey" PRIMARY KEY ("id");



CREATE INDEX "daily_activity_date_idx" ON "public"."daily_activity" USING "btree" ("date");



CREATE UNIQUE INDEX "daily_activity_user_date_idx" ON "public"."daily_activity" USING "btree" ("user_id", "date");



CREATE INDEX "daily_activity_user_idx" ON "public"."daily_activity" USING "btree" ("user_id");



CREATE INDEX "idx_cats_coordinates" ON "public"."cats" USING "btree" ("latitude", "longitude");



CREATE INDEX "idx_cats_created_at" ON "public"."cats" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_cats_user_id" ON "public"."cats" USING "btree" ("user_id");



CREATE INDEX "idx_sessions_active" ON "public"."time_sessions" USING "btree" ("user_id") WHERE ("ended_at" IS NULL);



CREATE INDEX "idx_sessions_user_started" ON "public"."time_sessions" USING "btree" ("user_id", "started_at" DESC);



CREATE UNIQUE INDEX "idx_trackers_name_tag_unique" ON "public"."time_trackers" USING "btree" ("user_id", "name", COALESCE("tag_id", '00000000-0000-0000-0000-000000000000'::"uuid"));



CREATE UNIQUE INDEX "profiles_username_unique" ON "public"."profiles" USING "btree" ("username");



CREATE UNIQUE INDEX "unique_active_session_per_user" ON "public"."time_sessions" USING "btree" ("user_id") WHERE ("ended_at" IS NULL);



CREATE UNIQUE INDEX "users_user_id_numeric_unique" ON "public"."users" USING "btree" ("user_id_numeric");



CREATE OR REPLACE TRIGGER "set_user_id_numeric_on_insert" BEFORE INSERT ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."assign_unique_user_id_numeric"();



CREATE OR REPLACE TRIGGER "update_daily_activity_updated_at" BEFORE UPDATE ON "public"."daily_activity" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."daily_activity"
    ADD CONSTRAINT "daily_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."definitions"
    ADD CONSTRAINT "definitions_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."dictionaries"
    ADD CONSTRAINT "dictionaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."examples"
    ADD CONSTRAINT "examples_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."time_sessions"
    ADD CONSTRAINT "time_sessions_tracker_id_fkey" FOREIGN KEY ("tracker_id") REFERENCES "public"."time_trackers"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."time_sessions"
    ADD CONSTRAINT "time_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."time_trackers"
    ADD CONSTRAINT "time_trackers_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tracker_tags"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."time_trackers"
    ADD CONSTRAINT "time_trackers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tracker_tags"
    ADD CONSTRAINT "tracker_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."translations"
    ADD CONSTRAINT "translations_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."words"
    ADD CONSTRAINT "words_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "public"."dictionaries"("id") ON DELETE CASCADE;



CREATE POLICY "Allow all operations" ON "public"."daily_activity" USING (true) WITH CHECK (true);



CREATE POLICY "Allow public insert" ON "public"."users" FOR INSERT WITH CHECK (true);



CREATE POLICY "Users can view own dictionaries" ON "public"."dictionaries" FOR SELECT USING ((("auth"."uid"())::"text" = ("user_id")::"text"));



CREATE POLICY "Users can view own words" ON "public"."words" FOR SELECT USING (("dictionary_id" IN ( SELECT "dictionaries"."id"
   FROM "public"."dictionaries"
  WHERE (("dictionaries"."user_id")::"text" = ("auth"."uid"())::"text"))));



ALTER TABLE "public"."daily_activity" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."assign_unique_user_id_numeric"() TO "anon";
GRANT ALL ON FUNCTION "public"."assign_unique_user_id_numeric"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."assign_unique_user_id_numeric"() TO "service_role";



GRANT ALL ON FUNCTION "public"."random_10_digit_text"() TO "anon";
GRANT ALL ON FUNCTION "public"."random_10_digit_text"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."random_10_digit_text"() TO "service_role";



GRANT ALL ON FUNCTION "public"."shuffle_dictionary_words"("p_dict_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."shuffle_dictionary_words"("p_dict_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."shuffle_dictionary_words"("p_dict_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON TABLE "public"."cats" TO "anon";
GRANT ALL ON TABLE "public"."cats" TO "authenticated";
GRANT ALL ON TABLE "public"."cats" TO "service_role";



GRANT ALL ON TABLE "public"."daily_activity" TO "anon";
GRANT ALL ON TABLE "public"."daily_activity" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_activity" TO "service_role";



GRANT ALL ON TABLE "public"."definitions" TO "anon";
GRANT ALL ON TABLE "public"."definitions" TO "authenticated";
GRANT ALL ON TABLE "public"."definitions" TO "service_role";



GRANT ALL ON TABLE "public"."dictionaries" TO "anon";
GRANT ALL ON TABLE "public"."dictionaries" TO "authenticated";
GRANT ALL ON TABLE "public"."dictionaries" TO "service_role";



GRANT ALL ON TABLE "public"."examples" TO "anon";
GRANT ALL ON TABLE "public"."examples" TO "authenticated";
GRANT ALL ON TABLE "public"."examples" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."time_sessions" TO "anon";
GRANT ALL ON TABLE "public"."time_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."time_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."time_trackers" TO "anon";
GRANT ALL ON TABLE "public"."time_trackers" TO "authenticated";
GRANT ALL ON TABLE "public"."time_trackers" TO "service_role";



GRANT ALL ON TABLE "public"."tracker_tags" TO "anon";
GRANT ALL ON TABLE "public"."tracker_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tracker_tags" TO "service_role";



GRANT ALL ON TABLE "public"."translations" TO "anon";
GRANT ALL ON TABLE "public"."translations" TO "authenticated";
GRANT ALL ON TABLE "public"."translations" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."users_user_id_numeric_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_user_id_numeric_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_user_id_numeric_seq" TO "service_role";



GRANT ALL ON TABLE "public"."words" TO "anon";
GRANT ALL ON TABLE "public"."words" TO "authenticated";
GRANT ALL ON TABLE "public"."words" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







