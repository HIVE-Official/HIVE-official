# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm install` - Install all dependencies (required first)
- `pnpm dev` - Start development server for all apps
- `pnpm build` - Build all packages and applications in correct order
- `pnpm lint` - Run linting across all packages
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run all tests using Vitest and Playwright
- `pnpm check-quality` - Run full quality check (lint + typecheck + analyze + test)
- `pnpm clean` - Clean all build artifacts

### App-Specific Commands
- `cd apps/web && pnpm dev` - Start main web app development server
- `cd apps/web && pnpm dev:staging` - Start with staging hostname
- `cd apps/web && pnpm test:e2e` - Run end-to-end tests with Playwright
- `cd packages/ui && pnpm storybook` - Start Storybook component development

### Testing Commands
- `cd apps/web && pnpm test:watch` - Run tests in watch mode
- `pnpm test:e2e` - Run E2E tests (requires built app)

## Architecture Overview

### Monorepo Structure
This is a Next.js monorepo using Turborepo with pnpm workspaces:

```
apps/
├── web/              # Main Next.js 15 application (App Router)
└── admin/            # Admin dashboard

packages/
├── ui/               # Shared UI components with Storybook
├── core/             # Business logic, types, and utilities
├── auth-logic/       # Firebase authentication logic
├── api-client/       # API client implementations
├── hooks/            # Shared React hooks
├── validation/       # Zod schemas and validation
├── analytics/        # Analytics tracking and reporting
├── tokens/           # Design tokens and theming
├── utilities/        # Common utility functions
├── i18n/             # Internationalization support
├── firebase/         # Firebase configuration and utilities
└── config/           # Shared configuration (ESLint, TypeScript, Tailwind)
```

### Technology Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **State Management**: Zustand for client state, native fetch/Firebase for server state
- **Authentication**: Firebase Auth with custom email links
- **Database**: Firestore with Firebase Admin SDK
- **Build System**: Turborepo with pnpm workspaces
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Components**: Storybook for UI development

### Key Patterns
- **Server Components**: Used by default in Next.js app
- **Client Components**: Only when needed (marked with "use client")
- **Workspace Dependencies**: Internal packages use `workspace:*` version
- **Type Safety**: All code uses strict TypeScript with proper interfaces
- **Error Boundaries**: Implemented for graceful error handling

## Development Workflow

### Getting Started
1. Run `pnpm install` to install dependencies
2. Set up environment variables (see ENV_TEMPLATE.md)
3. Run `pnpm dev` to start development
4. Visit http://localhost:3000 for the main app

### Code Quality
- All code must pass `pnpm lint` and `pnpm typecheck`
- Use the established patterns from .cursorrules
- Follow the HIVE design system (dark theme with gold accents)
- Write tests for new functionality

### Design System Integration
- **PRIMARY REFERENCE:** All design decisions must align with `docs/brand-design.md`
  - Color palette: Primary Black (#0A0A0A), Gold Accent (#FFD700), Surface (#111111)
  - Typography: Space Grotesk (display), Geist Sans (body), Geist Mono (code)
  - Motion: 180ms transitions with cubic-bezier(0.33, 0.65, 0, 1)
  - Gold usage ONLY for focus rings, achievements, and ritual buttons
- **MEMORY BANK:** Reference `memory-bank/` for product specifications and completion checklists
- **NO EXCEPTIONS:** Color violations (green/red/blue status colors) are forbidden

### Component Development
- Create reusable components in `packages/ui/`
- Add Storybook stories for UI components
- Use shadcn/ui as base components
- Follow TypeScript strict typing
- **CRITICAL:** All components must strictly follow `docs/brand-design.md` guidelines
- **CRITICAL:** Reference `memory-bank/` documentation for product context and specifications

### Build Order
The build system has dependencies:
1. Core packages (core, validation, auth-logic, analytics, utilities, i18n, firebase) build first
2. UI package builds after core dependencies
3. Web app builds last, consuming all packages

## Firebase Configuration

### Authentication
- Uses Firebase Auth with custom email link flow
- Magic link authentication for passwordless login
- Role-based access control for admin functions
- Session management handled by auth-logic package

### Database
- Firestore for primary data storage
- Firebase Admin SDK for server-side operations
- Security rules defined in firestore.rules
- Data models defined in packages/core/domain/

### Environment Variables
Required environment variables (see ENV_TEMPLATE.md):
- Firebase project configuration
- Admin SDK credentials
- Vercel deployment settings

## Common Issues

### Build Failures
- Ensure `pnpm install` is run first
- Check that all workspace dependencies are built
- Clear build cache with `pnpm clean` if needed

### TypeScript Errors
- Run `pnpm typecheck` to see all errors
- Many types are generated from core package builds
- Ensure proper imports from workspace packages

### Storybook Development
- Start with `cd packages/ui && pnpm storybook`
- Stories are located in `packages/ui/src/stories/`
- Uses Tailwind CSS and design tokens from tokens package

## Testing Strategy

### Unit Tests
- Located alongside source files or in `__tests__/` directories
- Uses Vitest with React Testing Library
- Test utilities and custom hooks thoroughly

### E2E Tests
- Playwright tests in `apps/web/test/e2e/`
- Tests critical user journeys (auth, onboarding, spaces)
- Requires built application to run

### Component Tests
- Storybook serves as visual testing environment
- Interactive testing with Storybook test runner
- Component documentation through stories

## Brand Design System Compliance

### Required Documentation References
1. **`docs/brand-design.md`** - Complete HIVE design system specification
2. **`memory-bank/`** - Product foundation and completion checklists
   - `HIVE_PRODUCT_FOUNDATION.md` - Core product philosophy
   - `ONBOARDING_AUTH_COMPLETION_CHECKLIST.md` - Auth flow requirements
   - `PROFILE_SLICE_COMPLETION_CHECKLIST.md` - Profile features
   - `SPACES_SLICE_COMPLETION_CHECKLIST.md` - Spaces functionality
   - `FEED_RITUALS_COMPLETION_CHECKLIST.md` - Feed and ritual features

### Design System Enforcement
- **Color System:** Only monochrome + gold (#FFD700) allowed
- **Typography:** Space Grotesk for headlines, Geist Sans for body text
- **Motion:** Use brand timing curves and duration system
- **Components:** Must pass brand design quality checklist
- **Campus Energy:** Interface should adapt to student life cycles