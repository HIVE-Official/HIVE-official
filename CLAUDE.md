# HIVE - Social Utility Platform for Student Autonomy

## 🎯 Vision & Product Philosophy

### Core Vision
**We're building the first social platform where connections form around solving real problems together.**

HIVE is **social utility** - where every connection has purpose, every community solves problems, and every interaction moves student life forward. This is social media that actually makes college life better.

### Product Architecture
- **Profile**: Your campus command center - not a highlight reel
- **Spaces**: Functional communities where things get done - not just chat rooms
- **Tools**: Solutions you build and share with your community - not just apps
- **Feed**: Surfaces coordination and collaboration - not performative content
- **Rituals**: Consistent community rhythms that build culture - not just events

### Development Philosophy
- **Social Utility First**: Every feature must blend social connection with practical utility
- **Student Autonomy**: Empower students to build their own solutions, not consume pre-made ones
- **Community-Driven**: Tools and spaces evolve based on actual community needs
- **Production Quality**: We ship real features, no mocks or stubs
- **Vertical Slices**: Complete feature areas end-to-end before moving to next

## 🛠 Technical Stack

### Core Architecture
```
📦 Monorepo (Turborepo + pnpm workspaces)
├── 📱 apps/
│   ├── web/          → Next.js 15 App Router (main platform)
│   └── admin/        → Admin dashboard
├── 📚 packages/
│   ├── @hive/ui      → Design system (431+ Storybook components)
│   ├── @hive/core    → Business logic & utilities
│   ├── @hive/hooks   → Shared React hooks
│   ├── @hive/tokens  → Design tokens
│   └── [8 more packages]
```

### Technology Choices
- **Frontend**: Next.js 15, React 18, TypeScript (strict mode)
- **Styling**: Tailwind CSS + Semantic Design Tokens
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Deployment**: Vercel (web) + Firebase Hosting (admin)
- **Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Testing**: Playwright (E2E), Jest (unit), Storybook (visual)

### Design System (@hive/ui)
- **Atomic Design**: Atoms → Molecules → Organisms → Templates
- **Semantic Tokens**: `text-foreground-primary` not `text-gray-900`
- **Brand Identity**: Warm orange (#FF6B35), deep purple (#6B46C1)
- **Component First**: Always use/extend @hive/ui, never create one-offs
- **Storybook Driven**: Every component has stories for documentation

## 💻 Development Workflow

### Quick Start
```bash
# Development
pnpm dev                    # Start all apps (web: 3000, admin: 3001)
pnpm dev --filter=web       # Start web only
pnpm storybook              # View design system (port 6006)

# Quality Checks
pnpm lint                   # ESLint check
pnpm typecheck              # TypeScript validation
pnpm build                  # Production build test

# Feature Development
pnpm --filter @hive/ui add-component   # Add new design system component
pnpm test:e2e                           # Run E2E tests
```

### Development Standards
1. **TypeScript Strict**: No `any` types, proper error handling
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Performance**: <3s initial load, <1s route transitions
4. **Accessibility**: WCAG 2.1 AA compliance minimum
5. **Error Boundaries**: Every feature wrapped in error recovery
6. **Real Data**: Connect to Firebase, no mock data in production paths

### Working with Claude (AI Pair Programming)
- **Technical Co-Founder Role**: I'll present options, we decide together
- **Vertical Slice Focus**: Complete one feature area before starting another
- **Design System Evolution**: Every new component should enhance the entire system
- **Production Mindset**: Ship real features that work, not prototypes
- **Ask Business Questions**: I'll probe for product decisions when technical choices matter

## 🚀 Current Development Focus

### Feature Priorities (Don't update this - use todo.md for current work)
1. **Phase 1**: Core functionality for each vertical slice
2. **Phase 2**: Enhanced features and polish
3. **Phase 3**: Scale and optimization

### Architecture Patterns
- **Server Components Default**: Use client components only when needed
- **Edge Functions**: API routes for serverless operations
- **Real-time Subscriptions**: Firebase listeners for live updates
- **Optimistic UI**: Update UI immediately, sync in background
- **Progressive Enhancement**: Core features work without JavaScript

## 📋 Reference Commands

### Common Tasks
```bash
# Clean up project
pnpm clean              # Remove build artifacts
pnpm fresh-install      # Clean node_modules and reinstall

# Database
firebase emulators:start         # Local Firebase
firebase deploy --only firestore # Deploy rules

# Deployment
pnpm build && pnpm deploy        # Production deployment
vercel --prod                    # Deploy web to Vercel
```

### Troubleshooting
```bash
# Common fixes
rm -rf node_modules .next && pnpm install  # Nuclear reset
pnpm dedupe                                 # Fix duplicate dependencies
npx next telemetry disable                  # Disable Next.js telemetry
```

## 🎓 Key Principles

### Product Principles
- **Utility drives connection**: Features must solve real problems
- **Student-built solutions**: Platform enables creation, not just consumption
- **Community ownership**: Spaces and tools belong to their communities
- **Transparent algorithms**: Users understand how content surfaces
- **Privacy first**: Students control their data and visibility

### Technical Principles
- **Type Safety**: TypeScript everywhere, no compromises
- **Component Reuse**: DRY through composition, not duplication
- **Performance Budget**: Every feature must meet performance targets
- **Progressive Disclosure**: Complex features revealed gradually
- **Resilient Systems**: Graceful degradation and error recovery

---

*Remember: We're not building another social network. We're building a platform where students create their own campus operating system through social utility.*