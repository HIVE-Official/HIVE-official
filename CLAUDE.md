# HIVE Development Guide

## ⚠️ PROJECT STATUS: CRITICAL BUILD FAILURES

**IMMEDIATE ATTENTION REQUIRED**:
- 740 component files corrupted in @hive/ui package
- TypeScript compilation failing
- Cannot build or deploy application
- See "Current Critical Issues" section for details

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
pnpm dev                    # Run all apps (MAY FAIL due to corrupted components)
pnpm dev --filter=web       # Run web app only

# Building
pnpm build                  # CURRENTLY FAILING - TypeScript errors
pnpm build:memory-efficient # With memory optimization

# Fix Attempts Available
node fix-syntax-errors.js   # Syntax error fixer
python3 comprehensive_ui_fix.py  # Comprehensive fix script
./ultimate-jsx-fix.sh       # Ultimate JSX fix script

# Testing
pnpm test                   # Tests will fail (components corrupted)
pnpm typecheck             # Shows current type errors

# Linting
pnpm lint:web              # Max 50 warnings allowed
```

### Import Patterns
```typescript
// ⚠️ WARNING: @hive/ui imports currently broken due to corruption
// import { Button, Card } from '@hive/ui'; // WILL FAIL

// These packages may still work:
import { useAuth } from '@hive/auth-logic';
import { db, auth } from '@hive/firebase';
import type { User, Space } from '@hive/core';
```

## 📦 Package Architecture

### @hive/ui - Design System ⚠️ **CRITICAL: 740 FILES CORRUPTED**
**Atomic Design Structure:** (Files exist but have syntax errors)
- **Atoms**: ~87 components (Avatar, Badge, Button, Input, etc.) - ALL CORRUPTED
- **Molecules**: ~30 components (FormField, ProfileHeader, etc.) - ALL CORRUPTED
- **Organisms**: ~53 components (ProfileDashboard, SpaceCard, etc.) - ALL CORRUPTED
- **Templates**: PageLayout, DashboardPage - CORRUPTED

**⚠️ CRITICAL ISSUE**: All 740 files in packages/ui have JSX syntax corruption

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
rituals/            // Ritual system
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
1. **⚠️ @hive/ui CURRENTLY BROKEN** - 740 files corrupted, cannot import
2. **Temporary workaround needed** - May need to create temporary components
3. **Fix priority** - Restore @hive/ui functionality before new development
4. **Mobile-first** - Once fixed, ensure mobile compatibility

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

## 🚀 Current Implementation Status

### ⚠️ CRITICAL BUILD ISSUES
- **TypeScript Errors**: 6+ type errors in packages/ui/dist
- **UI Package**: 740 corrupted files with JSX syntax issues
- **Build Status**: FAILING - cannot compile

### ✅ Structure Completed
- Monorepo structure established
- Firebase configuration present
- Routing structure defined
- Package architecture in place

### 🔴 Broken/Corrupted
- **@hive/ui**: ALL 740 component files have syntax corruption
- **TypeScript**: Build fails with type errors
- **Components**: Cannot import from @hive/ui due to corruption

### 🚧 Actual Features Status
- Authentication: Structure exists, functionality unknown
- Spaces: Routes exist, components corrupted
- Feed: Routes exist, components corrupted
- Profile: Routes exist, components corrupted
- Tools: Routes exist, no implementation

### ❌ Cannot Start Until Fixed
- Any feature development (UI package broken)
- Testing (components won't compile)
- Deployment (build fails)

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
1. **⚠️ FIX BUILD FIRST** - Cannot develop with broken components
2. Check `/corrupted-files.txt` for list of broken files
3. Run fix scripts or restore from backups
4. Verify TypeScript compilation passes

### Code Standards
- **TypeScript**: Strict mode, no `any` types
- **ESLint**: Max 50 warnings in web app
- **Testing**: Unit tests for utilities, E2E for features
- **Commits**: Clear messages with scope

### 🔴 CURRENT CRITICAL ISSUES

#### 1. UI Package Corruption (740 files)
**Problem**: All component files have malformed JSX syntax
**Files**: `/Users/laneyfraass/hive_ui/corrupted-files.txt` lists all 740
**Impact**: Cannot use ANY @hive/ui components
**Solution Needed**: Run syntax fix scripts or restore from backup

#### 2. TypeScript Build Failures
**Errors in packages/ui/dist**:
- `switch-enhanced.d.ts(14,64)`: Type expected
- `accessibility-foundation.d.ts(11,61)`: Variable declaration expected
- `responsive-foundation.d.ts(22,65)`: Variable declaration expected
- `mobile-testing.d.ts(43,33)`: Parameter declaration expected

#### 3. Common Issues & Solutions
- **Memory errors**: Use `pnpm build:memory-efficient`
- **Import errors**: Components corrupted, cannot import from @hive/ui
- **Type errors**: Run `pnpm typecheck` (will show errors)
- **Syntax fix attempts**: Multiple fix scripts exist in root

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

## 🆘 Recovery Scripts Available

### Syntax Fix Scripts in Root
```bash
# JavaScript fixers
node fix-syntax-errors.js
node comprehensive-syntax-fix.js
node batch-syntax-fixer.js

# Python fixers
python3 comprehensive_ui_fix.py
python3 fix_comprehensive_corruption.py
python3 restore_from_backups.py

# Shell scripts
./ultimate-jsx-fix.sh
./final-comprehensive-jsx-fix.sh
```

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

### Phase 1: vBETA Launch (Current)
1. Core authentication flow
2. Basic spaces functionality
3. Simple feed system
4. Profile creation/editing
5. Mobile optimization

### Phase 2: Post-Launch
1. Advanced tool builder
2. Rituals system
3. Analytics dashboard
4. Email notifications
5. Performance optimization

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