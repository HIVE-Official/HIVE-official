# HIVE Development Workflow

## 🚀 Quick Start

Our development workflow is designed for **shipping fast with quality**. As technical co-founders, we focus on vertical slices and production-ready code.

## 📋 Available Commands

### Core Workflow Commands
```bash
# Quality Checks
pnpm workflow:check      # Run all quality checks
pnpm workflow:fix        # Auto-fix common issues
./scripts/workflow/quick-fix.sh all  # Fix everything possible

# Feature Development
pnpm feature <name>      # Start a new feature branch
pnpm workflow:ship       # Pre-deployment checklist

# Quick Commands
pnpm dev                 # Start development server
pnpm build              # Production build
pnpm typecheck          # TypeScript validation
pnpm lint               # ESLint check
```

## 🔄 Development Workflow

### 1. Starting a New Feature

```bash
# Start a new feature with proper setup
pnpm feature add-notification-system

# This will:
# - Create feature branch from main
# - Set up documentation template
# - Install dependencies
# - Run initial checks
# - Create feature doc in docs/features/
```

### 2. During Development

```bash
# Regular quality checks
pnpm workflow:check

# Fix common issues automatically
pnpm workflow:fix

# Quick fixes for specific issues
./scripts/workflow/quick-fix.sh console   # Remove console.log
./scripts/workflow/quick-fix.sh imports   # Fix import paths
./scripts/workflow/quick-fix.sh lint      # Auto-fix lint issues
./scripts/workflow/quick-fix.sh unused    # Remove unused imports
./scripts/workflow/quick-fix.sh all       # Fix everything
```

### 3. Before Committing

The pre-commit hook automatically runs checks on staged files:
- No console.log statements
- TypeScript validation
- ESLint checks
- No hardcoded values
- File size warnings

If checks fail, run:
```bash
pnpm workflow:fix
```

### 4. Shipping to Production

```bash
# Run comprehensive production checks
pnpm workflow:ship

# This validates:
# ✓ Clean git status
# ✓ TypeScript passes
# ✓ No lint errors
# ✓ Production build succeeds
# ✓ No exposed secrets
# ✓ Tests pass
# ✓ Performance metrics
# ✓ Firebase configuration
```

## 🏗️ Project Structure

```
hive_ui/
├── apps/
│   ├── web/          # Main Next.js app
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Component library
│   ├── core/         # Business logic
│   ├── hooks/        # Shared React hooks
│   └── validation/   # Schema validation
├── scripts/
│   └── workflow/     # Automation scripts
└── docs/
    └── features/     # Feature documentation
```

## 🎯 Development Principles

### Ship Vertical Slices
Complete features end-to-end, not half-built layers:
```bash
✅ User can create, view, edit, delete spaces
❌ API endpoints without UI
❌ UI without real data
```

### Fix Infrastructure First
Never work around build failures:
```bash
# If build fails, fix it immediately
pnpm workflow:fix
pnpm build

# Don't proceed until green
```

### Production Mindset
Everything connects to real Firebase:
```typescript
// ✅ GOOD: Real Firebase
const spaces = await db.collection('spaces').get();

// ❌ BAD: Mock data
const spaces = mockSpaces;
```

## 🔧 Common Issues & Solutions

### Issue: Too Many ESLint Warnings
```bash
# Progressive fix approach
./scripts/workflow/quick-fix.sh unused
./scripts/workflow/quick-fix.sh lint
pnpm lint
```

### Issue: TypeScript Errors
```bash
# Check specific file
npx tsc --noEmit path/to/file.ts

# Fix all TypeScript issues
pnpm typecheck
```

### Issue: Build Failures
```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### Issue: Console Statements
```bash
# Remove all console.log/debug/info
./scripts/workflow/quick-fix.sh console
```

## 📊 Quality Standards

### Required for Commit
- ✅ No TypeScript errors
- ✅ No console.log statements
- ✅ No hardcoded URLs/secrets
- ✅ Imports properly organized

### Required for PR
- ✅ All commit requirements
- ✅ Feature documentation updated
- ✅ Tests for critical paths
- ✅ No ESLint errors
- ✅ Production build succeeds

### Required for Deploy
- ✅ All PR requirements
- ✅ Performance metrics met
- ✅ Security checks passed
- ✅ Firebase rules updated
- ✅ Error boundaries in place

## 🚦 Git Workflow

### Branch Strategy
```bash
main         # Production-ready code
├── staging  # Pre-production testing
└── feature/ # Feature branches
    ├── feature/add-notifications
    ├── feature/fix-auth-flow
    └── feature/optimize-performance
```

### Commit Messages
```bash
# Format: type: description

feat: add notification system
fix: resolve auth token expiration
perf: optimize image loading
docs: update API documentation
refactor: simplify space management
test: add e2e tests for onboarding
```

## 🎨 Code Style

### TypeScript
```typescript
// ✅ GOOD: Explicit types, early returns
export async function createSpace(data: SpaceInput): Promise<Space> {
  if (!data.name) throw new Error('Name required');

  const space = await db.collection('spaces').add({
    ...data,
    createdAt: FieldValue.serverTimestamp()
  });

  return space;
}

// ❌ BAD: any types, no validation
export async function createSpace(data: any) {
  return await db.collection('spaces').add(data);
}
```

### React Components
```tsx
// ✅ GOOD: Typed props, semantic HTML, error handling
interface SpaceCardProps {
  space: Space;
  onJoin?: (spaceId: string) => Promise<void>;
}

export function SpaceCard({ space, onJoin }: SpaceCardProps) {
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!onJoin) return;

    try {
      setLoading(true);
      await onJoin(space.id);
    } catch (error) {
      console.error('Join failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="space-card">
      <h2>{space.name}</h2>
      <button onClick={handleJoin} disabled={loading}>
        {loading ? 'Joining...' : 'Join Space'}
      </button>
    </article>
  );
}
```

## 🔍 Debugging Workflow

### 1. Check Logs
```bash
# Development logs
pnpm dev

# Build errors
pnpm build

# TypeScript errors
pnpm typecheck
```

### 2. Validate Firebase
```bash
# Check Firebase connection
firebase projects:list

# Test Firestore rules
firebase emulators:start
```

### 3. Performance Check
```bash
# Bundle analysis
npx next build --analyze

# Lighthouse audit
npx lighthouse http://localhost:3000
```

## 📈 Performance Targets

- **Initial Load**: < 3 seconds
- **Route Change**: < 1 second
- **API Response**: < 500ms
- **Bundle Size**: < 500KB per route
- **Lighthouse Score**: > 90

## 🚨 Emergency Procedures

### Production Down
```bash
# 1. Rollback deployment
git checkout main
git reset --hard HEAD~1
git push --force

# 2. Deploy stable version
pnpm workflow:ship
firebase deploy
```

### Build Broken
```bash
# 1. Fix immediately
pnpm workflow:fix

# 2. If still broken, check recent changes
git diff HEAD~1

# 3. Revert problematic commits
git revert <commit-hash>
```

### Data Issue
```bash
# 1. Check Firebase console
firebase console

# 2. Backup current data
firebase firestore:export gs://backup-bucket

# 3. Fix via admin panel or scripts
```

## 📚 Additional Resources

- [CLAUDE.md](./CLAUDE.md) - AI assistant instructions
- [ORGANIZATION_PLAN.md](./ORGANIZATION_PLAN.md) - Codebase structure
- [Firebase Console](https://console.firebase.google.com)
- [Vercel Dashboard](https://vercel.com/dashboard)

## 🤝 Team Workflow

As technical co-founders:

1. **Communicate intent** before major changes
2. **Ship complete features** not partial work
3. **Fix breaks immediately** don't leave for later
4. **Document decisions** in code and docs
5. **Review each other's work** before production

---

Remember: **Ship fast, maintain quality, zero budget mentality.**

Every line of code should move us closer to launch.