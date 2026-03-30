# 📚 Debilingo - Vocabulary Learning Tracker

> An open-source application for creating personalized dictionaries and learning foreign languages. Build custom word lists with translations, definitions, and examples to accelerate your language learning journey.

[![Live Demo - Dev](https://img.shields.io/badge/demo-dev-blue)](https://debilingo-dev.vercel.app/)
[![Live Demo - Main](https://img.shields.io/badge/demo-main-green)](https://debilingo-main.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start for Contributors

### Prerequisites

Before you begin, make sure you have installed:

- **Node.js** v18 or higher (recommended: v20 or v24)
  - Check version: `node --version`
  - Download: https://nodejs.org/
- **npm** v9 or higher
  - Check version: `npm --version`
- **Git**
  - Check version: `git --version`
  - Download: https://git-scm.com/

---

### 🎨 Frontend-Only Development (Recommended for Beginners)

**Perfect for:** UI/UX work, React components, styling, frontend features

This setup connects to the deployed backend, so you don't need to run anything locally except the frontend.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/MEDOYED/debilingo.git
```

create your own branch

```bash
git branch action/your-branch

git checkout action/your-branch
```

#### Step 2: Install Frontend Dependencies

```bash
cd web-app
npm install
```

This will install all required packages (React, Vite, TypeScript, etc.). It may take 1-2 minutes.

#### Step 3: Configure Environment Variables (for web-app (frontend))

```bash
# Copy the example file (or crete by hand)
cp .env.example .env
```

The `.env` file is already configured to use the deployed dev backend, so you don't need to change anything! It should contain:

```env
VITE_API_URL=https://debilingo-backend-dev-423439214783.us-central1.run.app/api
```

#### Step 4: Start the Development Server

```bash
npm run dev
```

You should see:

```
VITE v7.1.7  ready in 500 ms

➜  Local:   http://localhost:1414/
➜  Network: use --host to expose
```

#### Step 5: Open in Browser

Open your browser and go to: **http://localhost:1414/**

🎉 **You're ready to develop!** The app is now running and connected to the dev backend.

---

### 🛠️ Available Commands

While in the `web-app/` directory:

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start development server (port 1414) |
| `npm run build`        | Build for production                 |
| `npm run preview`      | Preview production build             |
| `npm run lint`         | Check code for errors                |
| `npm run format`       | Auto-format code with Prettier       |
| `npm run format:check` | Check if code is formatted           |
| `npm test`             | Run tests                            |

---

### ✅ Verify Your Setup

1. **Check if backend is connected:**

   - Open http://localhost:1414/
   - Try to register a new account
   - If registration works, backend connection is successful ✅

2. **Check if dev server is running:**

   - You should see hot-reload when you edit files
   - Changes should appear instantly in the browser

3. **Common issues:**
   - **Port 1414 already in use:** Another app is using this port. Stop it or change the port in `vite.config.ts`
   - **"Network error":** Check if `.env` has the correct `VITE_API_URL`
   - **"Cannot find module":** Run `npm install` again

---

## 📁 Project Structure

```
debilingo/
├── web-app/              # Frontend React application
│   ├── src/
│   │   ├── app/          # App setup, routing, providers
│   │   ├── pages/        # Page components (Home, Login, etc.)
│   │   ├── features/     # Feature modules (add-word, auth, etc.)
│   │   ├── widgets/      # Complex UI components
│   │   ├── entities/     # Business entities (user, dictionary, word)
│   │   ├── shared/       # Shared utilities, UI components, API client
│   │   └── main.tsx      # Entry point
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies and scripts
│   └── vite.config.ts    # Vite configuration
├── backend/              # Backend Express API
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Business logic
│   │   ├── middleware/   # Authentication, validation
│   │   ├── routes/       # API endpoints
│   │   └── server.ts     # Entry point
│   └── package.json
├── docs/                 # Documentation
│   └── database-schema.sql  # Database setup SQL
├── DEVELOPMENT_PLAN.md   # Full dev plan (Ukrainian)
└── README.md             # This file
```

**Architecture:** The frontend follows [Feature-Sliced Design](https://feature-sliced.design/) for better organization and scalability.

---

## 🧪 Code Quality & Testing

This project uses automated code quality tools:

### Linting (ESLint)

```bash
npm run lint        # Check for code issues
```

### Formatting (Prettier)

```bash
npm run format      # Auto-format all files
npm run format:check # Check if files are formatted
```

### Pre-commit Hooks (Husky)

Code is automatically linted and formatted before every commit. If there are issues, the commit will be blocked until you fix them.

### Testing

```bash
npm test            # Run all tests
```

---

## 🌐 Deployed Versions

- **Dev Branch:** https://debilingo-dev.vercel.app/ (latest development features)
- **Main Branch:** https://debilingo-main.vercel.app/ (stable production)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/lexicon.git`
3. **Create a branch:** `git checkout -b feature/your-feature-name`
4. **Make your changes** and commit: `git commit -m "Add: your feature description"`
5. **Push** to your fork: `git push origin feature/your-feature-name`
6. **Open a Pull Request** to the `dev` branch

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-changed` - Code refactoring

### Commit Message Convention

- `feat(main-file-or-folder): description` - New feature
- `fix(main-file-or-folder): description` - Bug fix
- `update(main-file-or-folder): description` - Update existing feature
- `refactor(main-file-or-folder): description` - Code refactoring
- `docs(main-file-or-folder): description` - Documentation changes

---

## 📚 Additional Documentation

- **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)** - Detailed development plan (in Ukrainian)
- **[Database Schema](./docs/database-schema.sql)** - Complete database setup SQL
- **[Excalidraw Design](https://excalidraw.com/#room=0354748abcbee25eeae9,ukL6-i4n9BjUGjUowy0Qhw)** - UI/UX wireframes and mockups

---

## 🛡️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **SASS** - CSS preprocessor

### Backend

- **Node.js** + **Express** - Server framework
- **TypeScript** - Type safety
- **Supabase (PostgreSQL)** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

### DevOps & Tools

- **Vercel** - Frontend hosting
- **Google Cloud Run** - Backend hosting
- **Docker** - Containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Vitest** - Testing framework

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Need Help?

- **Issues:** Open an issue on [GitHub Issues](https://github.com/MEDOYED/debilingo/issues)
- **Questions:** Feel free to ask in the issues or discussions
