# Debilingo - План розробки

## Опис проекту
Додаток-словник для вивчення іноземних слів. Користувач реєструється, створює словники для різних мов, додає слова з перекладами, дефініціями та прикладами.

---

## Технології

**Backend:**
- Node.js + Express + TypeScript
- Supabase (PostgreSQL)
- bcrypt (хешування паролів)

**Frontend:**
- React + Vite + TypeScript
- React Router (роутинг)
- Axios (HTTP клієнт)

**Деплой:**
- Docker
- Google Cloud Run

---

## База даних (Supabase)

### Таблиці

```sql
-- 1. Користувачі
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Словники
CREATE TABLE dictionaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  main_language TEXT NOT NULL,
  secondary_language TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Слова
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dictionary_id UUID REFERENCES dictionaries(id) ON DELETE CASCADE,
  source_word TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Переклади
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);

-- 5. Дефініції
CREATE TABLE definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);

-- 6. Приклади
CREATE TABLE examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0
);
```

### Налаштування RLS (Row Level Security)
- Користувачі бачать тільки свої дані
- SQL функції для автентифікації

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Реєстрація |
| POST | /api/auth/login | Логін |

### Dictionaries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dictionaries | Список словників користувача |
| POST | /api/dictionaries | Створити словник |
| DELETE | /api/dictionaries/:id | Видалити словник |

### Words
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dictionaries/:dictId/words | Список слів у словнику |
| POST | /api/words | Створити слово |
| DELETE | /api/words/:id | Видалити слово |

---

## Frontend Сторінки

### /login
- Поле email
- Поле пароль
- Кнопка "Увійти"
- Посилання на /register

### /register
- Поле email
- Поле пароль
- Кнопка "Зареєструватися"
- Посилання на /login

### / (Головна)
- Якщо не залогінений -> redirect на /login
- Список карточок словників
- Кнопка "Створити словник" -> відкриває просту форму (модалка або блок)
- У карточці словника: назва мов, кнопка "Додати слово", кнопка "Вивчати"

### /dictionary/:dictId
- Якщо не залогінований -> redirect на /login
- Таблиця слів (source_word, переклади, дефініції)
- Кнопка "+" -> модалка додати слово
- Кожне слово - кнопка "Видалити"

---

## Послідовність роботи

### Крок 1: Supabase - Створення таблиць
1. Увійти в Supabase
2. Відкрити SQL Editor
3. Виконати SQL для створення таблиць
4. Включити RLS (безпека)

### Крок 2: Backend - Auth
1. Налаштувати підключення до Supabase
2. Створити роути /api/auth/register
3. Створити роути /api/auth/login
4. JWT токени для сесії

### Крок 3: Backend - Dictionaries
1. GET /api/dictionaries
2. POST /api/dictionaries
3. DELETE /api/dictionaries/:id

### Крок 4: Backend - Words
1. GET /api/dictionaries/:dictId/words (з join таблиць translations, definitions, examples)
2. POST /api/words (з транзакцією для всіх пов'язаних даних)
3. DELETE /api/words/:id (каскадне видалення)

### Крок 5: Frontend - Base
1. Налаштувати API клієнт з Authorization header
2. Створити сторінки Login, Register
3. Додати ProtectedRoute компонент
4. Налаштувати роутинг

### Крок 6: Frontend - Dictionaries
1. Головна сторінка - отримання списку словників
2. Форма створення словника
3. Видалення словника

### Крок 7: Frontend - Words
1. Сторінка /dictionary/:dictId
2. Форма додати слово (source_word, массиви для translations, definitions, examples, note)
3. Видалення слова

### Крок 8: Деплой
1. Створити Dockerfile
2. Запустити локально в Docker
3. Деплой на Google Cloud Run
4. Налаштувати змінні середовища

---

## Змінні середовища

### Backend (.env)
```
PORT=3001
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_anon_key
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

---

## Команди для запуску

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd web-app
npm install
npm run dev
```

### Docker (локально)
```bash
cd backend
docker build -t debilingo-backend .
docker run -p 3001:3001 debilingo-backend
```

---

## Корисні посилання

- Supabase: https://supabase.com
- Google Cloud Run: https://cloud.google.com/run
- Документація Express: https://expressjs.com/
- bcrypt: https://www.npmjs.com/package/bcrypt

---

## Нотатки

- Фронтенд робиться мінімально - тільки логіка, без стилів
- Стилі і верстку користувач перепише сам
- Пароль зберігається хешованим (bcrypt)
- JWT токен зберігається в localStorage на фронтенді
- Всі дані фільтруються по user_id (тільки свої словники/слова)
