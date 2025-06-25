# HIVE UI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

A beautiful, modern React/Next.js application for social discovery and networking.

## Overview

HIVE UI is a Next.js-based web application that helps users discover, create, and engage with spaces and events. The application follows modern React patterns with TypeScript and embraces a sleek dark theme with gold accents for a premium feel.

## Features

- **Space Discovery**: Browse and join spaces categorized by interests and communities
- **Event Management**: Create, discover, and RSVP to events within spaces
- **User Profiles**: Comprehensive profile management with authentication
- **Real-time Features**: Live updates and notifications
- **Modern UI**: Beautiful glassmorphic design with fluid animations built on Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile experiences
- **TypeScript**: Full type safety throughout the application

## Architecture

The application follows modern React and Next.js patterns with a monorepo structure:

### Tech Stack

- **Framework**: Next.js 14 with App Router
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

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

```bash
# Install dependencies (required first)
pnpm install

# Start development server
pnpm dev

# Build all packages and applications
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Start Storybook
pnpm storybook

# Clean all build artifacts
pnpm clean
```

### Important Build Notes

Before running `pnpm build`, ensure:

1. All dependencies are installed with `pnpm install`
2. Your Node.js version is 18.0 or higher
3. You have proper access to all required environment variables

If you encounter any build issues:

1. Clean the build artifacts: `pnpm clean`
2. Remove node_modules: `rm -rf node_modules`
3. Clear pnpm store: `pnpm store prune`
4. Reinstall dependencies: `pnpm install`
5. Rebuild: `pnpm build`

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

The application is deployed using:

- **Vercel**: Main hosting platform for the web app
- **Firebase**: Backend services and database
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
