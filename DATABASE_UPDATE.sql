-- Update the constraint to allow higher values (for dollar amounts up to $100,000)
-- Run this in your Supabase SQL Editor if you already created the table with the old constraint

ALTER TABLE daily_activity
DROP CONSTRAINT IF EXISTS daily_activity_money_count_check;

ALTER TABLE daily_activity
ADD CONSTRAINT daily_activity_money_count_check
CHECK (money_count >= 0 AND money_count <= 100000);

-- If you haven't created the table yet, use this instead:
-- CREATE TABLE IF NOT EXISTS daily_activity (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   date DATE NOT NULL,
--   money_count INTEGER NOT NULL CHECK (money_count >= 0 AND money_count <= 100000),
--   user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
-- );
