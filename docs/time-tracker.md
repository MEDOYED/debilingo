# Time Tracker Feature

## Overview

Two new pages with full backend: track time per activity (e.g. "Programming", "Home cleaning") grouped by tags (e.g. "study", "stupid wasting time"). Users can start/stop timers, edit sessions, and view stats per period.

---

## 1. Database (Supabase SQL Editor)

```sql
-- Tags for grouping trackers
CREATE TABLE tracker_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#78716c',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Tracker categories (individual activities)
CREATE TABLE time_trackers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tracker_tags(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#78716c',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual tracking sessions
CREATE TABLE time_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tracker_id UUID REFERENCES time_trackers(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_sessions_user_started ON time_sessions(user_id, started_at DESC);
CREATE INDEX idx_sessions_active ON time_sessions(user_id) WHERE ended_at IS NULL;
```

---

## 2. Backend

### 2.1 New files

| File                                       | Purpose                               |
| ------------------------------------------ | ------------------------------------- |
| `src/types/timeTracker.ts`                 | All time tracker types                |
| `src/controllers/tagController.ts`         | Tag CRUD                              |
| `src/controllers/timeTrackerController.ts` | Trackers CRUD + Sessions CRUD + Stats |
| `src/routes/tagRoutes.ts`                  | Tag routes                            |
| `src/routes/timeTrackerRoutes.ts`          | Tracker + session + stats routes      |

### 2.2 API Endpoints

#### Tags

| Method   | Path                    | Body                | Description                               |
| -------- | ----------------------- | ------------------- | ----------------------------------------- |
| `GET`    | `/api/tracker-tags`     | —                   | List user's tags                          |
| `POST`   | `/api/tracker-tags`     | `{ name, color }`   | Create tag                                |
| `PUT`    | `/api/tracker-tags/:id` | `{ name?, color? }` | Update tag                                |
| `DELETE` | `/api/tracker-tags/:id` | —                   | Delete tag (trackers keep, tag_id → null) |

#### Trackers

| Method   | Path                     | Body                         | Description                                                    |
| -------- | ------------------------ | ---------------------------- | -------------------------------------------------------------- |
| `GET`    | `/api/time-trackers`     | —                            | List all trackers with tag info, sorted by most recent session |
| `POST`   | `/api/time-trackers`     | `{ name, color, tag_id? }`   | Create tracker                                                 |
| `PUT`    | `/api/time-trackers/:id` | `{ name?, color?, tag_id? }` | Update tracker                                                 |
| `DELETE` | `/api/time-trackers/:id` | —                            | Delete tracker (cascades sessions)                             |

#### Sessions

| Method   | Path                                           | Body                         | Description                                 |
| -------- | ---------------------------------------------- | ---------------------------- | ------------------------------------------- |
| `GET`    | `/api/sessions/active`                         | —                            | Get currently running session or null       |
| `POST`   | `/api/time-trackers/:trackerId/sessions/start` | —                            | Start session (auto-ends other active ones) |
| `PATCH`  | `/api/sessions/:id/stop`                       | —                            | Stop session, compute duration_seconds      |
| `GET`    | `/api/time-trackers/:trackerId/sessions`       | —                            | List sessions for one tracker (paginated)   |
| `PUT`    | `/api/sessions/:id`                            | `{ started_at?, ended_at? }` | Edit session (time correction)              |
| `DELETE` | `/api/sessions/:id`                            | —                            | Delete session                              |

#### Stats

| Method | Path              | Query params                                          | Description                               |
| ------ | ----------------- | ----------------------------------------------------- | ----------------------------------------- |
| `GET`  | `/api/time-stats` | `period=all\|1d\|7d\|30d`, `start_date=`, `end_date=` | Aggregated stats grouped by tag → tracker |

**Stats response shape:**

```json
{
  "period": "7d",
  "total_seconds": 50000,
  "tags": [
    {
      "tag": { "id": "uuid", "name": "study", "color": "#22c55e" },
      "total_seconds": 30000,
      "trackers": [
        {
          "id": "uuid",
          "name": "Programming",
          "color": "#3b82f6",
          "total_seconds": 20000,
          "session_count": 5
        }
      ]
    }
  ]
}
```

### 2.3 Modified files

`src/app.ts` — register route files:

```ts
import tagRoutes from "./routes/tagRoutes.js";
import timeTrackerRoutes from "./routes/timeTrackerRoutes.js";

app.use("/api", tagRoutes);
app.use("/api", timeTrackerRoutes);
```

---

## 3. Frontend

### 3.1 New icon

`shared/ui/icons/clock/clock.tsx` + export in `shared/ui/icons/index.ts`

### 3.2 New pages

#### `/time-tracker` (replaces `/training` in bottom nav)

```
pages/time-tracker-page/
├── index.ts
├── time-tracker-page.tsx
├── time-tracker-page.module.scss
├── api/
│   ├── time-tracker-api.ts
│   ├── tag-api.ts
│   └── time-stats-api.ts
├── model/
│   ├── types.ts
│   ├── use-timer-store.ts         # active session, elapsed, status
│   └── use-trackers-store.ts      # list of trackers + tags, CRUD
└── ui/
    ├── tag-section/               # collapsible tag header + its tracker circles
    │   ├── tag-section.tsx
    │   └── tag-section.module.scss
    ├── tracker-circle/            # colored circle button, click → start/stop
    │   ├── tracker-circle.tsx
    │   └── tracker-circle.module.scss
    ├── active-timer-bar/          # persistent bar at top when timer is running
    │   ├── active-timer-bar.tsx
    │   └── active-timer-bar.module.scss
    ├── add-tracker-modal/         # create/edit tracker form
    │   ├── add-tracker-modal.tsx
    │   └── add-tracker-modal.module.scss
    └── add-tag-modal/             # create tag modal (opened from tag dropdown)
        ├── add-tag-modal.tsx
        └── add-tag-modal.module.scss
```

**Page behavior:**

- Top: `active-timer-bar` (visible only when session is running) — tracker name + color dot + live counter + stop button
- Below: tag sections (collapsible). Each tag has a colored header + its tracker circles
- Tracker circle click → starts timer (if idle) or does nothing (if another is running — user must stop first)
- Long-press / right-click on tracker → edit/delete options
- Header: "Time Tracker" title + "Stats" link + "+" button

**Timer cross-device:**

- Start: `POST /api/time-trackers/:id/sessions/start` → gets session with `started_at`
- Stop: `PATCH /api/sessions/:id/stop` → backend computes `duration_seconds`
- Page load: `GET /api/sessions/active` → resume display if running
- Local elapsed: `Date.now() - startTime` updated every 1s via `setInterval`

**Add Tracker Modal:**

- Name input (required)
- Color palette: 16 predefined colors (click-to-select)
- Tag dropdown: existing tags + "➕ Add new tag" at bottom
  - "➕ Add new tag" → opens **Add Tag Modal** (centered overlay)
  - Add Tag Modal: name input + color palette + "Create" button
  - On creation → modal closes → tag dropdown updated with new tag selected

**Edit Tracker (same modal, pre-filled):**

- Change name, color, tag
- Session history section below (list of recent sessions with time, edit pencil)
- Edit session → inline edit of `started_at` / `ended_at`

#### `/time-stats`

```
pages/time-stats-page/
├── index.ts
├── time-stats-page.tsx
├── time-stats-page.module.scss
├── model/
│   ├── types.ts
│   └── use-time-stats-store.ts
└── ui/
    ├── period-tabs/
    │   ├── period-tabs.tsx
    │   └── period-tabs.module.scss
    ├── custom-date-range/
    │   ├── custom-date-range.tsx
    │   └── custom-date-range.module.scss
    └── tracker-stat-row/
        ├── tracker-stat-row.tsx
        └── tracker-stat-row.module.scss
```

**Page behavior:**

- Top: period tabs — `All time` (default) | `30 days` | `7 days` | `1 day` | `Custom`
- `Custom` → shows two date inputs below tabs
- Body: tag sections (collapsible). Each tag header: colored dot + tag name + total time
- Per-tracker stat rows inside each tag:
  - Colored dot + tracker name
  - Formatted time (`Xh Ym Zs`)
  - Session count
  - Proportional horizontal bar
- Bottom: grand total row

### 3.3 16 predefined colors

```
#ef4444  #f97316  #f59e0b  #eab308
#22c55e  #10b981  #14b8a6  #06b6d4
#3b82f6  #6366f1  #8b5cf6  #a855f7
#d946ef  #ec4899  #f43f5e  #78716c
```

### 3.4 Modified files

| File                                                       | Change                                                   |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| `app/router/router.tsx`                                    | Replace `/training` → `/time-tracker`. Add `/time-stats` |
| `app/ui/mobile-bottom-bar/config/navigation-list-data.tsx` | Swap `Gamepad` → `Clock` for `/time-tracker`             |
| `app/ui/desktop-navigation/desktop-navigation.tsx`         | Update link (replace training)                           |
| `features/modal-navigation/modal-navigation.tsx`           | Update link (replace training)                           |
| `shared/ui/icons/index.ts`                                 | Export Clock icon                                        |

### 3.5 Sorting (v1)

Trackers on `/time-tracker` sorted by most recent session (`started_at` DESC). Trackers with no sessions → bottom, sorted by `created_at`.

---

## 4. Implementation Order

| Step                          | Description                                               | Est.      |
| ----------------------------- | --------------------------------------------------------- | --------- |
| 1. SQL in Supabase Editor     | Create 3 tables + indexes                                 | 5m        |
| 2. Backend types              | `timeTracker.ts`                                          | 10m       |
| 3. Backend tag controller     | `tagController.ts`                                        | 20m       |
| 4. Backend tracker controller | `timeTrackerController.ts` (full CRUD + sessions + stats) | 60m       |
| 5. Backend routes + register  | 2 route files + modify `app.ts`                           | 15m       |
| 6. Clock icon                 | icon component + barrel export                            | 10m       |
| 7. Frontend API layer         | 3 API files (tracker, tag, stats)                         | 20m       |
| 8. Zustand stores             | `use-timer-store.ts`, `use-trackers-store.ts`             | 20m       |
| 9. `/time-tracker` page       | tag-section, tracker-circle, active-timer-bar, 2 modals   | 75m       |
| 10. `/time-stats` page        | period-tabs, date-range, stat-rows                        | 45m       |
| 11. Navigation updates        | router + nav components                                   | 15m       |
| 12. Verify                    | `npm run lint` + build check                              | 5m        |
| **Total**                     |                                                           | **~4.5h** |
