# Debilingo Backend API

Backend API server for the Debilingo word learning tracker application.

## Tech Stack

- **Node.js** + **Express** - Server framework
- **TypeScript** - Type safety
- **Supabase** - Database and backend services
- **CORS** - Cross-origin resource sharing
- **express-validator** - Request validation

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file with your Supabase credentials:**
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Database Setup (Supabase)

1. **Create a Supabase project:**
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Fill in project details and wait for setup to complete

2. **Create the database table:**
   - Go to your project dashboard
   - Click on "SQL Editor" in the sidebar
   - Run this SQL query:

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

   -- Create index for faster queries
   CREATE INDEX IF NOT EXISTS daily_activity_date_idx ON daily_activity(date);
   CREATE INDEX IF NOT EXISTS daily_activity_user_idx ON daily_activity(user_id);

   -- Enable Row Level Security (RLS)
   ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow all operations (for development)
   -- In production, you should implement proper user authentication
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

3. **Get your API credentials:**
   - In your Supabase project, go to Settings > API
   - Copy the "Project URL" → use as `SUPABASE_URL`
   - Copy the "anon/public" key → use as `SUPABASE_ANON_KEY`
   - Update your `.env` file with these values

## Running the Server

### Development mode (with hot reload):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

### Type checking:
```bash
npm run type-check
```

## API Endpoints

### 1. Get Activity Data
```http
GET /api/activity
```
Returns all activity data for the last year.

**Response:**
```json
[
  {
    "id": "uuid",
    "date": "2024-11-22",
    "word_count": 15,
    "user_id": "uuid",
    "created_at": "timestamp"
  }
]
```

### 2. Add Activity
```http
POST /api/activity
Content-Type: application/json

{
  "word_count": 10,
  "date": "2024-11-22" // optional, defaults to today
}
```

**Response:**
```json
{
  "id": "uuid",
  "date": "2024-11-22",
  "word_count": 10,
  "user_id": "uuid",
  "created_at": "timestamp"
}
```

### 3. Get Statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "total": 230
}
```

### 4. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-22T10:30:00.000Z"
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed message (development only)"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.ts       # Supabase client configuration
│   ├── controllers/
│   │   └── activityController.ts  # Business logic
│   ├── routes/
│   │   └── activity.ts       # API routes
│   ├── types/
│   │   └── activity.ts       # TypeScript interfaces
│   └── server.ts             # Main server file
├── dist/                     # Compiled JavaScript
├── .env                      # Environment variables (gitignored)
├── .env.example              # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure you created `.env` file from `.env.example`
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly

### "Supabase connection test failed"
- Verify your Supabase credentials are correct
- Make sure the `daily_activity` table exists
- Check that RLS policies are configured

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:5173` for Vite

### Port already in use
- Change `PORT` in `.env` to a different port (e.g., 3002)
- Make sure to update the frontend API URL accordingly

## Security Notes

- The current implementation uses a default user ID for simplicity
- For production, implement proper authentication (Supabase Auth, JWT, etc.)
- Update RLS policies to restrict access based on authenticated users
- Use environment-specific `.env` files for different deployments

## License

MIT
