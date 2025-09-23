# HIVE Development Guide

## 🏗️ Monorepo Architecture

### Structure
HIVE is a **Turborepo monorepo** using pnpm workspaces:

```
hive-ui/
├── apps/
│   ├── web/          # Main HIVE platform (Next.js 15.3.3)
│   └── admin/        # Admin dashboard (port 3001)
├── packages/
│   ├── ui/           # @hive/ui - Complete design system (70+ components)
│   ├── core/         # @hive/core - Firebase, models, utilities
│   ├── auth-logic/   # @hive/auth-logic - Authentication
│   ├── hooks/        # @hive/hooks - Shared React hooks
│   ├── firebase/     # @hive/firebase - Firebase integration
│   ├── validation/   # @hive/validation - Zod schemas
│   ├── analytics/    # @hive/analytics - Analytics tracking
│   ├── api-client/   # @hive/api-client - API utilities
│   ├── i18n/         # @hive/i18n - Internationalization
│   ├── tokens/       # @hive/tokens - Design tokens
│   ├── utilities/    # @hive/utilities - Helper functions
│   └── config/       # ESLint & TypeScript configs
└── turbo.json        # Build orchestration
```

### Key Commands
```bash
# Development
pnpm dev                    # Run all apps (fully operational)
pnpm dev --filter=web       # Run web app only

# Building
pnpm build                  # Full build (working)
pnpm build --filter=@hive/ui # Build UI package only

# Testing
pnpm test                   # Run test suites
pnpm typecheck             # TypeScript validation (passing)

# Linting
pnpm lint                  # Run linting across monorepo
pnpm lint:web              # Web app specific linting

# Package Management
pnpm install               # Install dependencies
pnpm clean                 # Clean build artifacts
```

### Import Patterns
```typescript
// Standard package imports
import { Button, Card, FormField } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db, auth } from '@hive/firebase';
import type { User, Space } from '@hive/core';
import { useProfile } from '@hive/hooks';
import { validateEmail } from '@hive/validation';
```

## 📦 Package Architecture

### @hive/ui - Design System
**Atomic Design Structure:**
- **Atoms**: Foundational UI elements (Avatar, Badge, Button, Input, etc.)
- **Molecules**: Composed components (FormField, ProfileHeader, etc.)
- **Organisms**: Complex UI sections (ProfileDashboard, SpaceCard, etc.)
- **Templates**: Page-level layouts (PageLayout, DashboardPage)

**Import Examples:**
```typescript
import {
  Button,           // Atoms
  FormField,        // Molecules
  ProfileDashboard, // Organisms
  PageLayout        // Templates
} from '@hive/ui';
```

### @hive/core - Business Logic
**Exports:**
- Firebase configuration
- Domain models (User, Space, Post, Tool)
- Utility functions
- Server-side helpers

### @hive/firebase - Firebase Integration
**Configured Services:**
- Firestore Database
- Authentication
- Storage
- Analytics

## 🗺️ Application Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - Login (UB emails only)
- `/auth/verify` - Email verification
- `/profile/[handle]` - Public profiles
- `/schools` - School directory
- `/waitlist/[schoolId]` - Waitlist signup

### Protected Dashboard Routes
- `/(dashboard)/feed` - Social feed
- `/(dashboard)/spaces` - Space discovery
- `/(dashboard)/spaces/[spaceId]` - Individual space
- `/(dashboard)/profile/*` - Profile management
- `/(dashboard)/tools/*` - Tool builder
- `/(dashboard)/events` - Event system
- `/(dashboard)/rituals` - Active rituals and progress
- `/(dashboard)/rituals/[ritualId]` - Individual ritual details
- `/(dashboard)/admin` - Admin panel

## 🔥 Firebase Architecture

### Collections Structure
```typescript
// Primary Collections
users/              // User profiles
spaces/             // Community spaces
  └── posts/        // Space posts
      └── comments/ // Post comments
  └── members/      // Space membership
tools/              // User-created tools
rituals/            // Platform-wide rituals and campaigns
  └── participation/ // User participation tracking
  └── milestones/  // Campus achievement tracking
schools/            // University data
presence/           // Real-time status
```

### Security Pattern
```typescript
// ALL documents must have campus isolation for vBETA
interface BaseDocument {
  campusId: 'ub-buffalo'; // Hard-coded for UB launch
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;      // User UID
}
```

### Query Patterns
```typescript
// GOOD: Campus-isolated query
const spacesQuery = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo'),
  where('isActive', '==', true),
  orderBy('memberCount', 'desc'),
  limit(20)
);

// BAD: Missing campus isolation
// Never write queries without campus filtering!
```

## 🎨 Design System Usage

### Component Hierarchy
1. **@hive/ui Components** - Follow atomic design patterns
2. **Atomic Design Pattern** - Use atoms → molecules → organisms → templates
3. **Mobile-first approach** - All components designed for mobile compatibility
4. **TypeScript Support** - Full type safety across all components

### Common Patterns
```typescript
// Page Structure
import { PageLayout } from '@hive/ui';

export default function SomePage() {
  return (
    <PageLayout>
      {/* Your content */}
    </PageLayout>
  );
}

// Form Pattern
import { FormField, Button } from '@hive/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
```


## ⚡ Performance Requirements

### Targets
- **Page Load**: < 3s on campus WiFi
- **Transitions**: < 1s between pages
- **Bundle Size**: Optimize for mobile
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

### Optimization Strategies
- Use React Server Components by default
- Minimize 'use client' directives
- Implement lazy loading
- Use Suspense boundaries
- Optimize images (WebP, proper sizing)

## 🔐 Security & Privacy

### Authentication Rules
- **UB-only for vBETA**: Only @buffalo.edu emails
- **Session management**: Firebase Auth sessions
- **Protected routes**: Use middleware for auth checks

### Data Protection
- Campus isolation (all data tagged with campusId)
- User permission validation
- Input sanitization
- Rate limiting on API routes

## 🛠️ Development Workflow

### Before Writing Code
1. Verify TypeScript compilation passes
2. Check that required packages build successfully
3. Ensure Firebase configuration is set up for your environment
4. Run linting to check for code quality issues

### Code Standards
- **TypeScript**: Strict mode, minimal `any` types
- **ESLint**: Clean compilation achieved (0 errors)
- **Build**: Production build compiles successfully
- **Testing**: Unit tests for utilities, E2E for features
- **Commits**: Clear messages with scope


## 📋 Technical Stack

### Frontend
- **Framework**: Next.js 15.3.3 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Component Library**: @hive/ui (Radix UI based)
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Backend
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **Functions**: Vercel Serverless
- **Real-time**: Firestore listeners

### Testing
- **Unit/Integration**: Vitest
- **E2E**: Playwright
- **Component**: Testing Library

### Build Tools
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Bundler**: Next.js (Webpack/Turbopack)
- **Linting**: ESLint
- **Type Checking**: TypeScript


## 🎓 UB-Specific Configuration

### Campus Data
```typescript
interface UBCampusConfig {
  campusId: 'ub-buffalo';
  emailDomain: '@buffalo.edu';
  dorms: ['Ellicott', 'Governors', 'South Campus'];
  departments: ['Engineering', 'Management', 'Arts & Sciences'];
}
```

### Validation Rules
- Email must end with @buffalo.edu
- All content tagged with campusId
- Campus-specific terminology in UI

## 🚦 Development Priorities

### October 1st Launch - PRODUCTION READY
**Status**: 95% Production Ready - Clean build achieved

#### Day 1 Features (All Complete)
1. ✅ Full authentication with magic links
2. ✅ Spaces with RSS feed integration (3000+ events)
3. ✅ Real-time Feed with SSE updates
4. ✅ Complete Profile system
5. ✅ HiveLab tools (gated to leaders)
6. ✅ Events calendar integration
7. ✅ Direct messaging and following
8. ✅ Rituals system for engagement

#### Pre-Launch Requirements (Before Oct 1)
1. Firebase production configuration
2. Email service setup (SendGrid)
3. Domain and SSL configuration
4. Load testing to 10k concurrent users
5. Security audit completion

### Post-Launch Optimization
1. Performance tuning based on real usage
2. Additional ritual campaigns
3. Enhanced analytics dashboard
4. Push notifications
5. Cross-campus expansion prep

## 💡 Key Development Rules

### Always Remember
- **No hardcoding** - Use system components
- **Mobile-first** - Test on phones first
- **Production only** - No mocks or stubs
- **Campus context** - UB-specific features
- **Vertical slices** - Complete features end-to-end

### Never Do
- Create components outside @hive/ui
- Skip campus isolation in queries
- Use `any` TypeScript types
- Ignore mobile experience
- Add features without business logic discussion

## 🤝 Collaboration Guidelines

### Working with AI Assistants
- Ask business logic questions before implementation
- Use existing @hive/ui components
- Follow established patterns in codebase
- Ensure mobile compatibility
- Test with UB context in mind

### Code Review Checklist
- [ ] Uses @hive/ui components
- [ ] Includes campus isolation
- [ ] Works on mobile devices
- [ ] TypeScript strict mode passes
- [ ] ESLint warnings under limit
- [ ] Firebase queries optimized
- [ ] Loading states implemented
- [ ] Error boundaries in place

---

# HIVE Vision Statement

## We're building the first social platform where connections form around solving real problems together.

**HIVE is social utility** — where every connection has purpose, every community solves problems, and every interaction moves your life forward.

### Core Principles
- **Social Utility**: Every feature serves both social connection and practical utility
- **Campus-First**: Built specifically for university life
- **Mobile-Native**: Designed for students on the go
- **Community-Driven**: Tools and spaces created by students, for students

### Product Philosophy
- **Production Mindset**: Ship real features, not prototypes
- **Vertical Integration**: Complete features end-to-end
- **User-Centric**: UB student needs drive every decision
- **Rapid Iteration**: Launch fast, improve constantly

---

**Remember**: We're not just building software - we're creating the future of campus community. Every decision should serve UB students and help HIVE become essential to their college experience.