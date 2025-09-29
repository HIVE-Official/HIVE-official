# HIVE - Campus Operating System

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Launch Status](https://img.shields.io/badge/Launch-October%201st-gold.svg)](https://hive.social)

**The social utility platform where connections form around solving real problems together.**

## Overview

HIVE is a complete Campus Operating System launching October 1st at the University at Buffalo. It transforms how 32,000 students connect, collaborate, and solve problems together through community-driven spaces and behavioral campaigns.

## 5 Core Platform Features

1. **Spaces**: Pre-seeded communities with RSS-fed content
2. **Feed**: Real-time discovery stream (read-only from spaces)
3. **Profile**: Campus identity with connections system
4. **HiveLab**: No-code tool builder for space leaders
5. **Rituals**: Campus-wide behavioral campaigns

## Key Features

- **Social Utility**: Every interaction serves dual purpose (connection + problem-solving)
- **RSS Integration**: 3000+ pre-populated events from campus feeds
- **Real-time Updates**: SSE + Firebase listeners for instant updates
- **Mobile-First**: Designed for students on phones
- **Campus Trust**: .edu verification and campus isolation
- **Production Ready**: 95% complete, clean build achieved

## Architecture

The application follows modern React and Next.js patterns with a monorepo structure:

### Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + React Query
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **UI Components**: Radix UI primitives with shadcn/ui
- **Monorepo**: Turborepo + pnpm workspaces

### Layers

- **Apps**: Consumer-facing applications (web, admin)
- **Packages**: Shared libraries and components
- **UI Components**: Storybook-driven component library
- **Business Logic**: Shared utilities and API clients

## Project Structure

```
├── apps/
│   ├── web/                 # Main Next.js application
│   └── admin/               # Admin dashboard
├── packages/
│   ├── ui/                  # Shared UI components (Storybook)
│   ├── hooks/               # Shared React hooks
│   ├── core/                # Business logic and types
│   ├── api-client/          # API client logic
│   ├── auth-logic/          # Authentication logic
│   ├── firebase/            # Firebase configuration
│   └── tokens/              # Design tokens
└── storybook/               # Storybook configuration
```

## UI Components

### Design System

The application uses a consistent design system built with:

- **shadcn/ui**: Base component library
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first styling
- **Design Tokens**: Consistent spacing, colors, and typography

### Key Features

- **Dark Theme**: Sleek dark backgrounds with high contrast elements
- **Gold Accents**: Highlights important actions and selected items
- **Glassmorphism**: Frosted glass effects for cards and modals
- **Responsive Design**: Mobile-first approach with desktop enhancements

### State Handling

The application handles various states gracefully:

- **Loading States**: Skeleton screens and loading indicators
- **Error Boundaries**: Graceful error handling with recovery options
- **Empty States**: Informative placeholders when no content is available
- **Optimistic Updates**: Immediate UI feedback for better UX

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm 9.x
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hive_ui.git
   cd hive_ui
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Fill in your Firebase and other configuration
   ```

   The application expects the following variables:

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project id |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app id |
   | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Optional analytics id |
   | `FIREBASE_PROJECT_ID` | Firebase admin project id |
   | `FIREBASE_CLIENT_EMAIL` | Firebase admin client email |
   | `FIREBASE_PRIVATE_KEY` | Firebase admin private key |
   | `NEXTAUTH_SECRET` | NextAuth secret |
   | `NEXTAUTH_URL` | NextAuth base URL |

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Start Storybook
pnpm storybook

# Clean all node_modules and build artifacts
pnpm clean
```

## Development Workflow

### Adding New Features

1. Create components in `packages/ui/src/components/`
2. Add business logic to `packages/core/`
3. Create API clients in `packages/api-client/`
4. Build pages in `apps/web/src/app/`
5. Write Storybook stories for UI components

### Code Style

The project follows TypeScript and React best practices:

- **TypeScript**: Strict mode enabled with proper type definitions
- **ESLint**: Enforced code quality and consistency
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Structured commit messages

### Component Development

- All UI components should have corresponding Storybook stories
- Use TypeScript interfaces for all props
- Follow the HIVE design system and patterns
- Ensure accessibility (WCAG 2.1 AA compliance)

## Authentication & Authorization

The application uses Firebase Auth with:

- **Email/Password**: Standard authentication
- **Social Login**: Google, Apple, and other providers
- **Multi-Factor Authentication**: Enhanced security options
- **Role-Based Access**: Different user roles and permissions

## Deployment

### Production Deployment (Vercel)

The application is production-ready and configured for Vercel deployment:

```bash
# Deploy to Vercel
vercel --prod

# Or using the Vercel CLI
pnpm build
vercel deploy --prod
```

### Platform Services

- **Vercel**: Next.js hosting with automatic CI/CD
- **Firebase**: Auth, Firestore, and Storage services
- **Environment**: Production configuration via `.env.production`

### Build Status
- ✅ TypeScript compilation: Clean
- ✅ ESLint: 0 errors
- ✅ Production build: Success
- ✅ Bundle optimization: Complete
- **GitHub Actions**: CI/CD pipeline for automated deployments

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Firebase](https://firebase.google.com/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Run tests and linting (`pnpm lint && pnpm typecheck && pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please ensure all tests pass and follow the established patterns before submitting a PR.
