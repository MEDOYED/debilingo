# Word Learning Activity Tracker - Complete Setup Guide

A full-stack application featuring a GitHub-style activity heatmap for tracking daily word learning progress.

## Features

- GitHub-style activity heatmap visualization
- Track daily word learning progress
- Real-time updates
- Responsive design
- Full year calendar view
- Activity intensity levels with color coding
- Hover tooltips with date and count
- Form validation and error handling
- Production-ready backend with Supabase

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- SCSS Modules
- Axios for API calls

### Backend
- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- CORS enabled
- Input validation

## Complete Setup Instructions

### Part 1: Supabase Setup

1. **Create a Supabase Account:**
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign up with GitHub, Google, or email

2. **Create a New Project:**
   - Click "New Project" in your dashboard
   - Fill in the details:
     - **Name:** debilingo-tracker (or your preferred name)
     - **Database Password:** Create a strong password (save this!)
     - **Region:** Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Create the Database Table:**
   - In your project dashboard, find the left sidebar
   - Click on "SQL Editor"
   - Click "New query"
   - Copy and paste this SQL code:

   ```sql
   -- Create the daily_activity table
   CREATE TABLE IF NOT EXISTS daily_activity (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     date DATE NOT NULL,
     word_count INTEGER NOT NULL CHECK (word_count >= 0 AND word_count <= 1000),
     user_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'::uuid,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Create unique index to prevent duplicate entries per user per date
   CREATE UNIQUE INDEX IF NOT EXISTS daily_activity_user_date_idx
   ON daily_activity(user_id, date);

   -- Create indexes for faster queries
   CREATE INDEX IF NOT EXISTS daily_activity_date_idx ON daily_activity(date);
   CREATE INDEX IF NOT EXISTS daily_activity_user_idx ON daily_activity(user_id);

   -- Enable Row Level Security (RLS)
   ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow all operations (for development)
   CREATE POLICY "Allow all operations" ON daily_activity
   FOR ALL USING (true) WITH CHECK (true);

   -- Create updated_at trigger
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = TIMEZONE('utc'::text, NOW());
     RETURN NEW;
   END;
   $$ language 'plpgsql';

   CREATE TRIGGER update_daily_activity_updated_at
   BEFORE UPDATE ON daily_activity
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();
   ```

   - Click "Run" button
   - You should see "Success. No rows returned"

4. **Get Your API Credentials:**
   - Click on "Settings" (gear icon) in the left sidebar
   - Click "API" in the settings menu
   - You'll see two important values:
     - **Project URL** - starts with `https://xxxxx.supabase.co`
     - **anon/public key** - long string starting with `eyJ...`
   - Keep this page open, you'll need these values next

### Part 2: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd /home/maksym/FrontEnd/debilingo/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit the `.env` file:**
   ```bash
   nano .env
   # or use your preferred editor
   ```

   Replace with your actual values:
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   - Get `SUPABASE_URL` from Settings > API > Project URL
   - Get `SUPABASE_ANON_KEY` from Settings > API > anon/public key

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✓ Supabase connection successful
   🚀 Server running on port 3001
   📍 API endpoint: http://localhost:3001/api
   ```

   If you see "⚠ Warning: Supabase connection test failed", check your credentials.

### Part 3: Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd /home/maksym/FrontEnd/debilingo/web-app
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **The `.env` should contain:**
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Go to `http://localhost:5173`
   - Navigate to the Activity Calendar page
   - You should see the GitHub-style heatmap!

### Part 4: Testing the Application

1. **Test the activity submission:**
   - In the "Log Today's Progress" section
   - Enter a number (e.g., 10) in the input field
   - Click "Save Progress"
   - You should see a success message
   - The heatmap should update with today's date highlighted

2. **Verify in Supabase:**
   - Go back to your Supabase dashboard
   - Click "Table Editor" in the sidebar
   - Select "daily_activity" table
   - You should see your entry with today's date and word count

3. **Test the heatmap:**
   - Hover over today's square
   - You should see a tooltip showing "X words on [date]"
   - The total count at the top should update

## How to Use the Application

1. **View Your Progress:**
   - The heatmap shows the last 52 weeks
   - Each square represents one day
   - Colors indicate activity level:
     - Gray: No activity
     - Light green: 1-5 words
     - Medium green: 6-15 words
     - Dark green: 16-30 words
     - Darkest green: 31+ words

2. **Log Daily Activity:**
   - Enter the number of words you learned today (0-1000)
   - Click "Save Progress"
   - The heatmap updates immediately
   - Multiple submissions on the same day are added together

3. **Track Your Streak:**
   - Today's date is highlighted with a blue border
   - Hover over any day to see the exact count
   - The total shows all words learned in the past year

## Project Structure

```
debilingo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.ts
│   │   ├── controllers/
│   │   │   └── activityController.ts
│   │   ├── routes/
│   │   │   └── activity.ts
│   │   ├── types/
│   │   │   └── activity.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── web-app/
    ├── src/
    │   ├── api/
    │   │   └── activityService.ts
    │   └── widgets/
    │       └── money-activity-calendar/
    │           └── ui/
    │               └── money-activity-calendar/
    │                   ├── money-activity-calendar.tsx
    │                   └── money-activity-calendar.module.scss
    ├── .env
    ├── .env.example
    └── package.json
```

## API Endpoints

The backend provides three main endpoints:

1. **GET /api/activity** - Get all activity for the last year
2. **POST /api/activity** - Add/update today's word count
   ```json
   {
     "word_count": 10
   }
   ```
3. **GET /api/stats** - Get total words learned

## Troubleshooting

### Backend won't start:
- Check that port 3001 is not in use: `lsof -i :3001`
- Verify your `.env` file has all required variables
- Check Supabase credentials are correct

### Frontend can't connect to backend:
- Make sure backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env`
- Look for CORS errors in browser console

### "Supabase connection test failed":
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in backend `.env`
- Make sure the `daily_activity` table exists in Supabase
- Check your internet connection

### Heatmap not showing data:
- Open browser DevTools (F12) and check Console for errors
- Verify backend is returning data: `curl http://localhost:3001/api/activity`
- Check Network tab to see if API calls are succeeding

## Adding Test Data

To populate your heatmap with test data, you can use the SQL Editor in Supabase:

```sql
-- Add sample data for the past few weeks
INSERT INTO daily_activity (user_id, date, word_count) VALUES
  ('00000000-0000-0000-0000-000000000000', CURRENT_DATE - INTERVAL '1 day', 12),
  ('00000000-0000-0000-0000-000000000000', CURRENT_DATE - INTERVAL '2 days', 8),
  ('00000000-0000-0000-0000-000000000000', CURRENT_DATE - INTERVAL '3 days', 15),
  ('00000000-0000-0000-0000-000000000000', CURRENT_DATE - INTERVAL '7 days', 20),
  ('00000000-0000-0000-0000-000000000000', CURRENT_DATE - INTERVAL '14 days', 25)
ON CONFLICT (user_id, date) DO NOTHING;
```

## Next Steps

1. **Add Authentication:**
   - Implement Supabase Auth
   - Update user_id to use actual authenticated users
   - Update RLS policies for security

2. **Add More Features:**
   - Export data to CSV
   - Monthly/yearly statistics
   - Streak tracking
   - Goal setting

3. **Deploy to Production:**
   - Deploy backend to Railway, Render, or Vercel
   - Deploy frontend to Vercel, Netlify, or Cloudflare Pages
   - Update environment variables for production URLs

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the backend terminal for error logs
3. Verify all environment variables are set correctly
4. Make sure both frontend and backend are running
5. Check Supabase dashboard for database issues

## License

MIT
