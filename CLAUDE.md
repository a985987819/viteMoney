# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**星露谷记账本 (Stardew Valley Ledger)** — A pixel-styled expense tracking PWA built with React + TypeScript + Vite. Features a Stardew Valley-inspired UI with offline support, JWT authentication, and dual-mode data storage (server when logged in, localStorage when not).

## Commands

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run typecheck    # TypeScript type-check only
npm run test         # Run Vitest tests
npm run test:ui      # Vitest with UI
npm run test:coverage # Vitest with coverage
```

## Architecture

### Data Layer — Dual Mode (Online/Offline)

The app works in two modes depending on auth state:

- **Logged in**: API calls via `src/utils/request.ts` (Axios wrapper with JWT interceptor, automatic token refresh, request retry queue)
- **Logged out**: localStorage via `src/utils/storage.ts` (records, categories, budgets, tokens)

Key data modules in `src/api/`:
- `record.ts` — expense/income records, date-grouped queries, monthly stats
- `budget.ts` — monthly budget CRUD
- `category.ts` — expense/income categories
- `account.ts` — multi-account support
- `savings.ts` — savings goals
- `debt.ts` — debt management
- `recurring.ts` — recurring/periodic transactions
- `template.ts` — transaction templates
- `auth.ts` — login/register/logout/token refresh

### Routing

React Router 7 with lazy-loaded pages (except Home for fast initial load). Routes defined in `src/router/index.tsx`. All pages use `<Suspense>` with a loading fallback.

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Monthly summary, recent records, budget progress |
| `/add` | AddRecord | New expense/income entry |
| `/statistics` | Statistics | Charts, bill content, report content |
| `/savings` | Savings | Savings goal tracking |
| `/profile` | Profile | Account, settings, export/import |
| `/category-manage` | CategoryManage | Custom category management |
| `/budget` | Budget | Monthly budget configuration |
| `/recurring` | Recurring | Periodic transaction management |
| `/changelog`, `/features`, `/about` | Info pages | Static content pages |

### Auth

`src/hooks/useAuth.tsx` — Context-based auth. Wraps the app, persists user + tokens to localStorage. Check `isLoggedIn` boolean to determine online/offline mode.

### UI Architecture

- **Ant Design 6** as base component library, globally themed in `src/App.tsx` with Stardew Valley–inspired theme tokens (warm browns, greens, parchment background)
- **Custom components** in `src/components/`: `StardewPanel`, `StardewButton`, `StardewDialog`, `SpriteIcon`, `SwipeableRecordItem`, `BottomNav`, `PageContainer`, `AnimatedWrapper`, `ScrollContainer`, `PWAInstallPrompt`, `ErrorBoundary`, `LoadingScreen`
- **SCSS Modules** for component-specific styles (`*.module.scss`)
- Bottom-tab navigation pattern on mobile (BottomNav component)

### Internationalization

`src/i18n/` — i18next with react-i18next. Uses `useTranslation()` hook in components.

### Build & PWA

`vite-plugin-pwa` with auto-update registration. Manifest configured in `vite.config.ts`. Workbox injectManifest via a custom `dev-dist/sw.js`.

### Key Conventions

- File naming: kebab-case for component directories, camelCase for utility files
- Pages use `index.tsx` + `index.module.scss` pattern in their own directory
- Hooks exported from `src/hooks/index.ts` barrel file
- Custom hooks pattern: `src/hooks/useXxx.ts`
- API files in `src/api/` export typed functions using the `http` helper from `src/utils/request.ts`
- `createApiService<T>(basePath)` generic helper available for standard REST endpoints
