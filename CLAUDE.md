# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**星露谷记账本 (Stardew Valley Ledger)** — A pixel-styled expense tracking PWA built with React 19 + TypeScript 5 + Vite 8. Features a Stardew Valley-inspired UI with offline support, JWT authentication, and dual-mode data storage (server when logged in, localStorage when not).

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
- `savings.ts` — savings goals + local storage logic for plans
- `debt.ts` — debt management
- `recurring.ts` — recurring/periodic transactions
- `template.ts` — transaction templates
- `auth.ts` — login/register/logout/token refresh

### Type System

All business types are defined in `src/api/*.ts` files alongside the API functions that use them. `src/types/types.ts` serves as a centralized re-export hub — import types from `types.ts` rather than individual API files.

Types unique to `types.ts`:
- `ImportRecord`, `TransformedRecord`, `TransformStats`, `TransformResult` — import/export pipeline types
- `ImportTransformResult`, `ImportStats` — import result types
- `DataVersion` — data migration versioning
- `STORAGE_KEYS` — localStorage key constants

### Routing

React Router 7 with lazy-loaded pages (except Home for fast initial load). Routes defined in `src/router/index.tsx`. All pages use `<Suspense>` with a loading fallback.

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Monthly summary, recent records, budget progress |
| `/add` | AddRecord | New expense/income entry |
| `/bill` | Bill | Full bill page with charts and filters |
| `/statistics` | Statistics | Charts, bill content, report content |
| `/savings` | Savings | Savings goal tracking |
| `/savings-operate` | SavingsOperate | Deposit/withdraw operations |
| `/profile` | Profile | Account, settings, export/import |
| `/category-manage` | CategoryManage | Custom category management |
| `/budget` | Budget | Monthly budget configuration |
| `/recurring` | Recurring | Periodic transaction management |
| `/my-fridge` | MyFridge | Fridge item tracking |
| `/quick-record` | QuickRecordManage | Quick record shortcuts |
| `/changelog`, `/features`, `/about` | Info pages | Static content pages |

### Auth

`src/hooks/useAuth.tsx` — Context-based auth. Wraps the app, persists user + tokens to localStorage. Check `isLoggedIn` boolean to determine online/offline mode. Token refresh is handled automatically by the Axios interceptor in `request.ts`.

### UI Architecture

- **Ant Design 6** as base component library, globally themed in `src/App.tsx` with Stardew Valley–inspired theme tokens (warm browns, greens, parchment background)
- **Custom components** in `src/components/`: `StardewPanel`, `StardewButton`, `StardewDialog`, `SpriteIcon`, `SwipeableRecordItem`, `BottomNav`, `PageContainer`, `AnimatedWrapper`, `ScrollContainer`, `PWAInstallPrompt`, `ErrorBoundary`, `LoadingScreen`
- **SCSS Modules** for component-specific styles (`*.module.scss`)
- Bottom-tab navigation pattern on mobile (BottomNav component)

### Internationalization

`src/i18n/` — i18next with react-i18next. Uses `useTranslation()` hook in components. Language files in `src/i18n/locales/zh-CN/` and `src/i18n/locales/en-US/`.

### Build & PWA

`vite-plugin-pwa` with auto-update registration. Manifest configured in `vite.config.ts`. Workbox injectManifest via a custom `dev-dist/sw.js`.

### Error Handling

- **ErrorBoundary**: Global React error boundary catches render exceptions
- **Route errorElement**: Each route has error fallback to prevent white screen
- **API interceptor**: 401 → auto refresh token → retry; other errors → mapped to Chinese messages
- **Safe JSON parse**: All `JSON.parse` calls wrapped in try-catch via `safeJsonParse`/`safeJsonArrayParse` in `storage.ts`
- **localStorage quota**: Write failures caught and logged, never crash

## Key Conventions

- File naming: kebab-case for component directories, camelCase for utility files
- Pages use `index.tsx` + `index.module.scss` pattern in their own directory
- Custom hooks pattern: `src/hooks/useXxx.ts`
- API files in `src/api/` export typed functions using the `http` helper from `src/utils/request.ts`
- `createApiService<T>(basePath)` generic helper available for standard REST endpoints
- Import types from `src/types/types.ts` (re-export hub), not directly from API files
- `STORAGE_KEYS` constant defined in `src/types/types.ts`, imported by `storage.ts`
- `safeJsonParse`/`safeJsonArrayParse` exported from `src/utils/storage.ts`, used by `dataMigration.ts`

## Development Workflow

1. Create feature branch from main
2. Implement changes with proper TypeScript types
3. Run `npm run typecheck` and `npm run lint` before committing
4. Add tests for new functionality
5. Run `npm run test` to verify all tests pass
6. Commit with conventional commit messages

## Backend API

Full API documentation available at `docs/BACKEND_API.md`. Backend is deployed at `https://money-recordback-end.edgeone.dev`. Dev proxy configured in `vite.config.ts`.
