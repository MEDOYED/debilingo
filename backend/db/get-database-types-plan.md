# План та інструкція: Автоматична генерація типів бази даних для TypeScript

Цей документ описує, як налаштувати надійну автоматичну генерацію типів з PostgreSQL (Supabase) у проєкті `backend`, щоб TypeScript мав повний автокомпліт таблиць, колонок та RPC-функцій.

---

## 1. Чому потрібна генерація типів?

Зараз клієнт Supabase у `backend/src/config/supabase.ts` ініціалізується без параметрів типу:
```typescript
export const supabase = createClient(supabaseUrl, supabaseKey);
```
Через це:
* TypeScript не знає, які таблиці та RPC-функції є в базі даних.
* `supabase.rpc("get_time_tracker_stats", { ... })` не має підказок для параметрів (`p_user_id`, `p_start_date` тощо).
* Немає перевірки на одруківки в назвах колонок чи функцій.

Після генерації типів клієнт створюється як `createClient<Database>(...)`, що дає 100% типізацію та автокомпліт у VS Code.

---

## 2. Крок 1: Встановлення Supabase CLI у проєкт

Щоб утиліта генерації типів працювала швидко і не запитувала щоразу підтвердження, встановіть `supabase` у `devDependencies`:

```bash
cd backend
npm install -D supabase
```

---

## 3. Крок 2: Створення скрипта `backend/db/types.ts`

Чому окремий скрипт через `tsx`:
* Прямий запуск через консоль чи npm-скрипти часто стикається з проблемами шелла (в `zsh`/`bash` спецсимволи або паролі в `.env` ламають парсинг через термінал).
* Скрипт на `tsx` використовує пакет `dotenv` (як і `migrate.ts`), який гарантовано і коректно витягує `DATABASE_URL_CONNECTION_STRING` з `.env` на будь-якій системі.

Створіть файл **`backend/db/types.ts`** з наступним кодом:

```typescript
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL_CONNECTION_STRING;

if (!dbUrl) {
  console.error("Error: DATABASE_URL_CONNECTION_STRING is missing in .env");
  process.exit(1);
}

try {
  console.log("Generating database types from Supabase...");

  const output = execSync(
    `npx supabase gen types typescript --db-url "${dbUrl}"`,
    {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  const typesPath = path.resolve("src/types/database.types.ts");
  fs.writeFileSync(typesPath, output, "utf-8");

  console.log("✓ Success: types generated at src/types/database.types.ts");
} catch (error: any) {
  console.error("Failed to generate types:", error.message);
  process.exit(1);
}
```

---

## 4. Крок 3: Налаштування команд у `backend/package.json`

У секцію `"scripts"` файлу `backend/package.json` додайте:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "db:migrate": "tsx db/migrate.ts && npm run db:types",
  "db:types": "tsx db/types.ts",
  "start": "node dist/server.js",
  "type-check": "tsc --noEmit"
}
```

### Як це працюватиме:
* `npm run db:types` — генерує/оновлює файл `src/types/database.types.ts` у будь-який момент.
* `npm run db:migrate` — застосовує нові міграції SQL, і одразу після цього автоматично оновлює типи.

---

## 5. Крок 4: Підключення типів до Supabase Client

Після того, як файл `src/types/database.types.ts` згенеровано, відкрийте **`backend/src/config/supabase.ts`** та підключіть тип `Database`:

```typescript
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import type { Database } from "../types/database.types.js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

---

## 6. Робота з Git та іншими розробниками

* **Файл `backend/src/types/database.types.ts` обов'язково комітиться в Git.**
* Коли інший розробник зробить `git pull` або `git clone`, йому **не потрібно** генерувати типи чи мати доступи до бази даних — типи вже будуть у проєкті, а VS Code одразу матиме підказки.
* Оновлювати типи через `npm run db:types` потрібно лише тоді, коли ви змінюєте схему бази даних (додаєте таблицю, колонку чи SQL-функцію).
