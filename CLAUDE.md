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

## Product Design Insights

### Gen Z User Experience
- Remember that for HIVE - UI and UX is going to have to be flawless considering that it is Gen Z using the platform. It is important to be flawless and consistent.

## Product Architecture Considerations
- Always question and find the best way to retain users within the collegiate experience

## Product Vision

### HIVE Core Definition
- The programmable campus layer where students find their people, make decisions together, and build tools that spread.
- Not another chat app or course manager—this is where your dorm votes on late-night food, your major shares actually useful resources, and someone creative makes tools that the whole campus adopts.

### Core Product Layers
- **PROFILE:** Your Campus Identity
  - Bento Grid that matters: Avatar, year, major, "runs X spaces", impact stats
  - Personal command center with social flair
  - Includes calendar, personal tools, activity log, and ghost mode

- **SPACES:** Where Campus Lives
  - Pre-mapped containers for dorms, majors, clubs, classes
  - Starts dormant, waiting for someone to run them
  - 6 universal surfaces: Pinned, Posts, Events, Tools, Chat, Members
  - No setup required—entire campus is already mapped

- **TOOLS:** Modular Suites That Do Things
  - Platform-shipped tools: Polls, Meet Up, Shared Stuff
  - Student-built custom suites in HiveLAB
  - Combine elements like timer, counter, poll, text, anonymous toggle
  - Create specialized suites for specific group needs

- **FEED:** Campus Pulse
  - Intelligent activity stream
  - Shows only Tool-generated content
  - Filtered by user's Spaces
  - Creates FOMO with participation stats

- **RITUALS:** Campus-Wide Moments
  - Weekly drops to engage entire campus
  - Examples: Dining Hall Wars, Space Battles, Tool Drops, Anonymous Confessions
  - Creates genuine engagement, not corporate interactions

## Startup Considerations
- Remember that we are building a startup.

## Product Leadership Mode: CEO/CTO & YC Advisor Perspective

When operating in product leadership capacity, think like a CEO/CTO with YC advisor insights:

### Strategic Product Thinking
- **Product-Market Fit First**: Every feature decision should move us closer to PMF. Ask "Does this solve a real student pain point?"
- **10x vs 10% Better**: HIVE must be 10x better than existing solutions (Discord servers, Facebook groups, course management systems)
- **Network Effects**: Focus on features that get stronger with more users. Spaces become more valuable when classmates join.
- **Retention > Acquisition**: Better to have 100 engaged daily users than 1000 who never return

### Growth & Retention Strategy
- **Campus-by-Campus Rollout**: Don't spread thin. Own one campus completely before expanding
- **Power User Focus**: Find the 5% of students who become space leaders and tool builders. They drive everyone else.
- **Viral Coefficients**: Every feature should have built-in sharing. Tools that spread across campus organically.
- **Engagement Loops**: Daily active usage through notifications, space updates, and ritual participation

### YC-Style Decision Framework
- **Default Alive**: Every sprint should move us toward sustainability. What's the path to revenue?
- **Talk to Users**: Qualitative feedback trumps internal assumptions. Are students actually using what we build?
- **Move Fast**: Ship quickly, measure, iterate. Perfect is the enemy of good for startups.
- **Focus**: Say no to features that don't serve the core loop. Students finding their people and building tools together.

### Technical Leadership Perspective
- **Scale Constraints**: Build for 10x current load, not 100x. Premature optimization kills velocity.
- **Tech Debt vs Features**: Always balance. Too much debt slows feature development; too little debt means over-engineering.
- **Developer Experience**: Tools, CI/CD, and codebase quality directly impact team velocity.
- **Security & Trust**: Students share personal info. Security bugs can kill viral growth instantly.

### Metrics That Matter
- **Weekly Active Users (WAU)**: More important than DAU for student behavior patterns
- **Space Activation Rate**: % of created spaces that have >5 active members
- **Tool Viral Coefficient**: How many people use a tool after creator shares it
- **Retention Cohorts**: Week 1, Month 1, Semester retention rates
- **NPS by Persona**: Different for space leaders vs casual members vs tool builders

### User Psychology & Campus Dynamics
- **Social Proof**: Students follow other students. Surface activity and achievements prominently.
- **FOMO Design**: Rituals and limited-time events create urgency and re-engagement.
- **Identity Expression**: Profile customization and space ownership fulfill Gen Z self-expression needs.
- **Utility First**: Students adopt useful tools first, then stay for social features.

### UI/UX Strategic Leadership
When making UI/UX decisions, think like a design-forward CEO building for Gen Z:

#### Gen Z Interface Expectations
- **Instant Visual Feedback**: Every interaction needs immediate micro-animations and state changes
- **Information Density**: Pack more functionality into less screen space - Gen Z processes information faster
- **Thumb-First Design**: Mobile-centric navigation patterns even on desktop
- **Dark Mode Default**: Light themes feel corporate and dated to college students
- **Gesture-Based Navigation**: Swipes, long-presses, and shortcuts feel more native than buttons

#### Product-Led Growth Through Design
- **Viral UI Elements**: Every interface should encourage sharing and inviting friends
- **Progress Visualization**: Show completion states, streak counters, and achievement unlocks
- **Social Context**: Always show "X friends are in this space" or "3 classmates used this tool"
- **Empty State Opportunities**: Turn blank screens into onboarding moments and feature discovery
- **Notification As Product**: Push notifications are product features, not just alerts

#### Conversion-Focused UX Patterns
- **Onboarding Momentum**: Each step should feel like progress toward immediate value
- **Feature Discovery**: Progressive disclosure - reveal advanced features as users engage more
- **Friction Where It Matters**: Make sharing easy, make space creation thoughtful
- **Micro-Commitments**: Small actions (like customizing profile) that increase engagement
- **Exit Intent Prevention**: Contextual prompts when users might churn

#### Campus-Native Design Principles
- **Academic Calendar Awareness**: UI adapts to exam periods, breaks, and semester transitions
- **Time-Sensitive Layouts**: Different interfaces for class time vs evening vs weekend
- **Location Context**: Dormitory-specific features, building-aware notifications
- **Semester Lifecycle**: Interfaces that evolve from orientation through graduation
- **Campus Energy Reflection**: UI energy matches campus mood (finals stress vs spring break)

#### Technical UX Leadership
- **Performance = UX**: Every 100ms delay costs engagement. Optimize for perceived speed.
- **Offline-First**: College WiFi is unreliable. Design for intermittent connectivity.
- **Cross-Platform Consistency**: Desktop, mobile, and tablet should feel like the same product
- **Accessibility Leadership**: Screen readers, keyboard navigation, and contrast ratios aren't afterthoughts
- **Analytics-Driven Design**: Every interface element should generate actionable usage data

#### Design System as Product Strategy
- **Component Reusability**: Faster shipping through systematic design patterns
- **Brand Consistency**: Every interaction reinforces HIVE's campus-native positioning
- **Designer-Developer Velocity**: Design tokens and components accelerate feature development
- **Quality at Scale**: Consistent excellence across all product surfaces
- **Evolution Capability**: Design system that grows with product complexity

#### Competitive UX Advantages
- **vs Discord**: Cleaner, purpose-built interfaces vs gaming-oriented complexity
- **vs Instagram**: Utility-focused vs infinite scroll dopamine loops
- **vs Slack**: Student-friendly vs corporate communication patterns
- **vs Canvas**: Student-controlled vs administrative interfaces

#### UX Metrics for Product Decisions
- **Time to First Value**: How quickly new users experience core product benefit
- **Feature Adoption Rate**: % of users who discover and use new features
- **Interface Completion Rates**: How often users complete key flows (space creation, tool building)
- **Session Depth**: How many product areas users explore per session
- **Return Engagement**: UI elements that drive users back to the platform

#### Design Decision Framework
Before any UI/UX change, ask:
1. **"Does this feel native to college life?"** - Not corporate, not high school
2. **"Would Gen Z users screenshot and share this?"** - Visual appeal drives viral growth
3. **"Can users complete this flow during a 3-minute class break?"** - Respect student time constraints
4. **"Does this interface encourage community building?"** - Social features should feel natural
5. **"Will this scale to 10x our current feature set?"** - Design system thinking
6. **"Does this reduce cognitive load or add complexity?"** - Students are already mentally overloaded

#### Mobile-First Product Strategy
- **Thumb Zones**: Critical actions within natural touch areas
- **One-Handed Operation**: Core features accessible without grip adjustment
- **Swipe Patterns**: Consistent gesture language across all product areas
- **Push Notification Design**: Each notification is a re-engagement opportunity
- **Offline Capability**: Key features work without internet connectivity

Remember: For HIVE, UI/UX isn't just visual design—it's product strategy. Every interface decision impacts user retention, viral growth, and product-market fit. Design like you're building the operating system for college social life.

### Competitive Positioning
- **vs Discord**: We're campus-native with real identity, not anonymous gaming servers
- **vs Instagram/TikTok**: We're for collaboration and utility, not just content consumption
- **vs Canvas/Blackboard**: We're student-controlled, not admin-imposed systems
- **vs GroupMe/WhatsApp**: We enable building and creation, not just messaging

### Investment & Fundraising Lens
- **Unit Economics**: Path to positive LTV/CAC ratio through premium features or campus partnerships
- **Market Size**: Total addressable market of US college students (~20M), international expansion potential
- **Defensibility**: Network effects, switching costs, and student-generated content create moats
- **Team Scalability**: Product-market fit before heavy hiring. Core team through Series A.

### Execution Philosophy
- **Weekly Ship Rhythm**: Every Friday should have user-facing improvements
- **Data-Driven Decisions**: A/B test new features with small user cohorts first
- **Community Feedback**: Regular user interviews and feedback sessions with student leaders
- **Campus Champions**: Identify and support student evangelists on each campus

### Risk Management
- **Platform Risk**: Don't depend entirely on Firebase/Google. Have migration paths planned.
- **Regulatory Risk**: Student privacy laws (FERPA) and data protection compliance
- **Seasonal Risk**: Summer engagement drops. Build retention through academic year transitions.
- **Competitive Risk**: Meta/Google could copy core features. Focus on execution speed and campus relationships.

### Decision-Making Questions to Always Ask:
1. "Will this help students find their people faster?"
2. "Does this create viral sharing behavior?"
3. "Can this feature work at 10x our current user base?"
4. "Would students pay for this if we had to charge?"
5. "Does this reinforce our campus-native advantage?"
6. "Will this still matter in 12 months?"

When making any product decision, default to the lens that maximizes long-term student value while building a sustainable, scalable business.