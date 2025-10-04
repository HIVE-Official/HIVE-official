# HIVE Dependency Strategy - Ultrathink Analysis
**Version**: 1.0
**Created**: 2025-10-02
**Approach**: Deep analysis of what HIVE SHOULD have vs what it HAS

---

## Executive Summary

After analyzing HIVE's architecture, requirements, and positioning, here's the strategic dependency audit:

**Current State**: ✅ Good foundation, ⚠️ Missing critical real-time features, ❌ Some unnecessary weight

**Recommendations**:
- **ADD**: 12 dependencies for real-time, motion, and power-user features
- **UPGRADE**: 3 dependencies to newer versions
- **REMOVE**: 2 dependencies that add unnecessary weight
- **REFACTOR**: 1 dependency to lighter alternative

**Impact**: +~40KB gzipped, enables 5 major features (real-time updates, advanced gestures, haptics, optimistic UI, offline support)

---

## Part 1: Current State Analysis

### ✅ What HIVE Has (Good)

```typescript
// Core Framework
'next': '^15.3.3'                    // ✅ Latest Next.js - server components, app router
'react': '^18'                       // ✅ React 18 - concurrent features
'react-dom': '^18'                   // ✅ Correct version

// State Management
'zustand': '^5.0.5'                  // ✅ Lightweight (1KB), perfect for global state
'@tanstack/react-query': '^5.80.7'  // ✅ Server state, caching, mutations

// UI Primitives
'@radix-ui/react-*': '~1.x'          // ✅ 30+ primitives - accessible, composable
'lucide-react': '^0.411.0'           // ✅ Icon system
'class-variance-authority': '^0.7.1' // ✅ Type-safe variants
'tailwindcss': '^3.4.0'              // ✅ Utility-first CSS
'tailwindcss-animate': '^1.0.7'      // ✅ Animation utilities
'tailwind-merge': '^2.6.0'           // ✅ Conditional classes

// Animation
'framer-motion': '^11.11.17'         // ✅ Best-in-class animation library

// Forms & Validation
'react-hook-form': '^7.63.0'         // ✅ Performant forms
'zod': '^3.25.76'                    // ✅ Type-safe validation
'@hookform/resolvers': '^5.2.2'      // ✅ Zod + RHF integration

// Firebase
'firebase': '^11.0.0'                // ✅ Latest Firebase SDK
'firebase-admin': '^12.0.0'          // ⚠️ Should be 13.x (apps/web has 12.x, core has 13.x - mismatch)

// Carousels & Interactions
'embla-carousel-react': '^8.6.0'     // ✅ Touch-friendly carousel
'react-easy-crop': '^5.5.1'          // ✅ Image cropping (profile photos)

// DnD (HiveLab)
'react-dnd': '^16.0.1'               // ✅ Drag and drop for tool builder
'react-dnd-html5-backend': '^16.0.1' // ✅ HTML5 backend

// Toasts
'sonner': '^1.7.4'                   // ✅ Best toast library (Radix-style)

// Dates
'date-fns': '^4.1.0'                 // ✅ Lightweight date utility (vs moment.js 67KB)

// Command Palette
'cmdk': '^1.1.1'                     // ✅ Command palette (Cmd+K)

// Charts (Admin dashboard)
'recharts': '2.15.4'                 // ✅ React charts for analytics

// Rate Limiting
'@upstash/ratelimit': '^2.0.6'       // ✅ Vercel Edge-compatible rate limiting
'@upstash/redis': '^1.35.4'          // ✅ Redis for rate limiting

// Testing
'vitest': '^3.2.3'                   // ✅ Fast Vite-native testing
'@playwright/test': '^1.53.0'        // ✅ E2E testing
'@testing-library/react': '^16.3.0'  // ✅ Component testing
```

**Score**: 85/100 - Excellent foundation

---

## Part 2: What HIVE is MISSING (Critical Gaps)

### 🚨 HIGH PRIORITY: Must Add Before October 1st Launch

#### 1. **Real-time Presence & Typing Indicators**
```bash
pnpm add socket.io-client       # 13KB gzipped
pnpm add -D @types/socket.io-client
```

**Why**: Social platforms NEED presence ("Jake is online", "3 people typing in #cs-students"). Firebase Firestore has real-time listeners, but Socket.IO gives you:
- Typing indicators in posts/comments
- Online/offline status per user
- "Who's viewing this space right now"
- Live event attendee counts

**Without it**: Platform feels static, not social.

**Alternative considered**: Pusher (SaaS, $$), Ably (SaaS, $$), Firebase Realtime Database (Firebase already installed, but limited query capabilities).

**Decision**: Socket.IO - self-hosted, full control, WebSocket + long-polling fallback.

---

#### 2. **Optimistic UI Updates**
```bash
pnpm add @tanstack/react-query-persist-client  # 2KB
pnpm add idb-keyval                            # 1KB
```

**Why**: When student clicks "Join Space", they should see themselves as member **instantly** (optimistic update), even before server confirms. React Query supports this, but needs persistence for offline scenarios.

**Current gap**: React Query installed, but no persistence layer = can't survive page refresh or offline mode.

**What this enables**:
- Instant feedback on all actions (join, post, react)
- Offline mode (post while offline, syncs when back online)
- Better perceived performance (feels instant)

---

#### 3. **Advanced Touch Gestures**
```bash
pnpm add @use-gesture/react    # 10KB gzipped
```

**Why**: Students expect mobile-native interactions:
- **Swipe to dismiss** notifications/modals
- **Long-press** for context menus (iOS-style)
- **Pinch to zoom** on photos
- **Pull-to-refresh** feed

**Current gap**: Framer Motion does basic `drag`, but doesn't handle:
- Multi-touch gestures (pinch)
- Complex swipe patterns (velocity-based)
- Gesture conflicts (scroll vs swipe)

**Framer Motion vs @use-gesture**:
| Feature | Framer Motion | @use-gesture |
|---------|---------------|--------------|
| Drag | ✅ | ✅ |
| Swipe | ⚠️ Basic | ✅ Advanced |
| Pinch/Zoom | ❌ | ✅ |
| Long press | ❌ | ✅ |
| Velocity tracking | ❌ | ✅ |
| Bundle size | 35KB | 10KB (gesture-only) |

**Decision**: Add @use-gesture for mobile gestures, keep Framer Motion for animations.

---

#### 4. **Celebration Animations**
```bash
pnpm add canvas-confetti        # 4KB gzipped
pnpm add -D @types/canvas-confetti
```

**Why**: "Student autonomy" requires celebrating wins:
- Onboarding complete → confetti
- 7-day ritual streak → fire emoji explosion
- Space hits 100 members → gold confetti
- First post in space → subtle celebration

**Without it**: Success states feel corporate (green checkmark toast). Students want JOY.

**Alternative considered**: Lottie animations (requires After Effects files, larger bundle), CSS animations (limited physics).

**Decision**: Canvas Confetti - small, physics-based, customizable colors (gold theme).

---

#### 5. **Scroll-based Animations**
```bash
pnpm add react-intersection-observer  # 3KB gzipped
```

**Why**: Feed posts should fade in smoothly as they scroll into view. Spaces grid should animate items as they appear. Makes infinite scroll feel polished.

**Current gap**: No way to trigger animations on scroll. Framer Motion's `whileInView` requires this under the hood.

**What this enables**:
- Posts fade in as they enter viewport
- Space cards stagger in on discovery page
- Profile sections animate on scroll
- Better perceived performance (user sees activity)

---

#### 6. **Auto-animate Lists**
```bash
pnpm add @formkit/auto-animate   # 2KB gzipped
```

**Why**: When spaces are added/removed/sorted, animate the list changes automatically. When notifications update, animate the shift.

**Current gap**: Framer Motion requires manual `<AnimatePresence>` wrapper + `layout` prop for every list. This is 1-line solution:

```typescript
// Without auto-animate (verbose)
<AnimatePresence>
  {spaces.map(space => (
    <motion.div key={space.id} layout exit={{ opacity: 0 }}>
      <SpaceCard {...space} />
    </motion.div>
  ))}
</AnimatePresence>

// With auto-animate (simple)
const [parent] = useAutoAnimate();
<div ref={parent}>
  {spaces.map(space => <SpaceCard key={space.id} {...space} />)}
</div>
```

**Decision**: Add it - saves dev time, smaller code, better DX.

---

#### 7. **Image Optimization (Missing from web app)**
```bash
pnpm add sharp --workspace-root  # Image processing (Next.js uses this)
```

**Why**: Profile photos (3:4 portrait), space covers (16:9), event covers (2:1) need optimization. Next.js Image component requires Sharp for local dev.

**Current gap**: Missing from root package.json = slow image optimization in dev mode.

---

#### 8. **Error Monitoring** (Production)
```bash
pnpm add @sentry/nextjs         # 50KB gzipped (lazy loaded)
```

**Why**: Students report "app crashed" but you have no error logs. Sentry captures:
- JavaScript errors
- API failures
- Performance regressions
- User context (campus, spaces, actions)

**Cost**: Free tier = 5,000 errors/month (enough for vBETA UB launch).

**Alternative considered**: LogRocket (expensive), BugSnag (less Next.js integration), plain console.error (useless in production).

**Decision**: Sentry - industry standard, Next.js integration, free tier, source maps support.

---

### ⚡ MEDIUM PRIORITY: Add Post-Launch

#### 9. **Service Worker / PWA**
```bash
pnpm add next-pwa              # 20KB gzipped
pnpm add -D @types/serviceworker
```

**Why**: HIVE should be installable as PWA (Add to Home Screen):
- Offline access to feed (cached posts)
- Push notifications (ritual reminders, event notifications)
- Faster loading (cached assets)
- Desktop app feel on mobile

**When**: Post-launch week 2 - requires careful caching strategy.

---

#### 10. **Link Previews** (Rich content)
```bash
pnpm add @vercel/og             # Open Graph image generation
pnpm add metascraper            # Link preview scraping
pnpm add metascraper-*          # Plugins for various sites
```

**Why**: When student posts Instagram/TikTok/YouTube link, show rich preview (image, title, description). When sharing HIVE posts externally, generate OG images.

**Bundle size**: Server-side only (0KB client impact).

**When**: Post-launch week 3-4.

---

#### 11. **Markdown / Rich Text Editor**
```bash
pnpm add @tiptap/react          # 30KB gzipped
pnpm add @tiptap/starter-kit
```

**Why**: Space leaders want rich post formatting (bold, lists, links, mentions). Current: Plain text only.

**Alternative considered**: Lexical (Facebook, heavy), Slate (complex API), Quill (older).

**Decision**: Tiptap - modern, extensible, Prosemirror-based, good mentions plugin.

**When**: Post-launch month 2 (not v1).

---

#### 12. **Virtual Scrolling** (Performance)
```bash
pnpm add @tanstack/react-virtual  # 8KB gzipped
```

**Why**: Spaces with 1,000+ posts should render smoothly. Virtual scrolling only renders visible items + buffer.

**When**: Add if spaces exceed 500 posts. Current: Infinite scroll with React Query pagination is fine for <500 items.

---

### 🔄 Should UPGRADE

#### 1. **Firebase Admin SDK Version Mismatch**
```json
// Current:
"firebase-admin": "^12.0.0"  // apps/web
"firebase-admin": "^13.2.0"  // packages/core

// Should be:
"firebase-admin": "^13.2.0"  // Everywhere
```

**Why**: Version mismatch can cause runtime errors. 13.x has better TypeScript types.

**Action**: Update apps/web/package.json to `^13.2.0`.

---

#### 2. **React Query Persist (Add missing peer dep)**
```bash
pnpm add @tanstack/query-sync-storage-persister
pnpm add @tanstack/react-query-persist-client
```

**Why**: React Query installed, but persistence layer missing. Needed for offline mode.

---

#### 3. **Tailwind CSS v4 (Optional)**
```json
// Current:
"tailwindcss": "^3.4.17"

// Consider:
"tailwindcss": "^4.0.0"  // Alpha/Beta
```

**Why**: Tailwind v4 is **3x faster**, uses Rust parser, better CSS variables.

**Risk**: Beta software. Wait for stable release (Q1 2025).

**Action**: Monitor v4 stable release, upgrade when available.

---

## Part 3: What to REMOVE (Unnecessary Weight)

### ❌ Dependencies to Remove

#### 1. **Remove: `@react-three/fiber` + Three.js** (if not used)
```json
// Current (apps/web):
"@react-spring/three": "^10.0.3",
"@react-three/drei": "^10.7.6",
"@react-three/fiber": "^9.3.0",
"@react-three/postprocessing": "^3.0.4",
"three": "^0.180.0"
```

**Bundle cost**: ~150KB gzipped

**Used for**: ??? (I don't see 3D in spec - landing page animation?)

**Decision**:
- If used for landing page hero animation: Keep but code-split (dynamic import)
- If not used: **REMOVE** - massive bundle savings

**Action**: Audit `apps/web/src` for Three.js usage. If found, wrap in dynamic import:

```typescript
// Don't load Three.js on every page
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => <HeroSkeleton />
});
```

---

#### 2. **Consider: `ioredis` → `@upstash/redis`**
```json
// Current:
"ioredis": "^5.7.0"          // Traditional Redis client
"@upstash/redis": "^1.35.4"  // Serverless Redis

// Why duplicate?
```

**Issue**: Two Redis clients installed. `ioredis` is for Node.js servers. `@upstash/redis` is for Vercel Edge/serverless.

**Action**:
- If using Vercel: Remove `ioredis`, use `@upstash/redis` everywhere
- If self-hosting: Remove `@upstash/redis`, use `ioredis` everywhere

**Recommendation**: Use `@upstash/redis` (Vercel-native, 2KB vs ioredis 50KB).

---

## Part 4: Package-by-Package Recommendations

### 📦 **apps/web** (Main app)

```bash
# ADD (High Priority)
pnpm add socket.io-client @types/socket.io-client
pnpm add @use-gesture/react
pnpm add canvas-confetti @types/canvas-confetti
pnpm add react-intersection-observer
pnpm add @formkit/auto-animate
pnpm add @sentry/nextjs

# ADD (Medium Priority - Post Launch)
pnpm add next-pwa
pnpm add @tanstack/react-query-persist-client
pnpm add idb-keyval

# UPGRADE
pnpm add firebase-admin@^13.2.0  # Match packages/core

# REMOVE (if not used)
pnpm remove three @react-three/fiber @react-three/drei @react-spring/three @react-three/postprocessing

# REPLACE
pnpm remove ioredis
# Use @upstash/redis already installed
```

---

### 📦 **packages/ui** (Component library)

```bash
# ADD (Animation enhancements)
pnpm add @use-gesture/react
pnpm add @formkit/auto-animate
pnpm add canvas-confetti @types/canvas-confetti

# CONSIDER (Rich text - post-launch)
pnpm add @tiptap/react @tiptap/starter-kit
pnpm add @tiptap/extension-mention  # For @username mentions
```

---

### 📦 **packages/core** (Business logic)

```bash
# Already good! Maybe add:
pnpm add immer  # 13KB - immutable updates (optional, Zustand has built-in)
```

Core package is lean (zod, zustand, firebase) - perfect.

---

### 📦 **packages/hooks** (React hooks)

```bash
# ADD
pnpm add react-intersection-observer  # For scroll hooks
pnpm add @tanstack/react-query         # If not already (peer dep)
```

---

### 📦 **packages/analytics** (Analytics)

```bash
# Currently empty except @hive/core

# CONSIDER
pnpm add posthog-js  # 30KB - Product analytics (better than GA4)
# OR
pnpm add @vercel/analytics  # 3KB - Vercel-native analytics
# OR
pnpm add plausible-tracker  # 2KB - Privacy-focused, GDPR-compliant

# Recommendation: Start with @vercel/analytics (smallest, free tier)
```

---

### 📦 **packages/firebase** (Firebase wrapper)

Already good. Consider:

```bash
# ADD (if using Firestore offline persistence)
pnpm add fake-indexeddb  # For testing offline mode
```

---

## Part 5: Bundle Size Analysis

### Current Bundle Size (Estimated)

```typescript
// Main page JS (gzipped)
Next.js runtime:        100 KB
React 18:                50 KB
Framer Motion:           35 KB
Radix UI (used):         40 KB
Firebase client:        150 KB
React Query:             15 KB
Zustand:                  1 KB
Form libraries:          20 KB
Misc utilities:          30 KB
-----------------------------------
TOTAL:                  ~441 KB

// Route-based code split
Feed page:              +50 KB
Spaces page:            +60 KB
Profile page:           +40 KB
HiveLab:               +100 KB (heaviest - dnd + canvas)
```

### After Recommended Additions

```typescript
// New dependencies (gzipped)
Socket.IO client:        13 KB
@use-gesture:            10 KB
canvas-confetti:          4 KB
intersection-observer:    3 KB
auto-animate:             2 KB
idb-keyval:               1 KB
-----------------------------------
ADDITIONS:              +33 KB

// Potential removals (gzipped)
Three.js (if unused):  -150 KB
ioredis (use Upstash): - 50 KB
-----------------------------------
REMOVALS:              -200 KB

NET CHANGE:            -167 KB (LIGHTER!)
```

**Result**: Bundle gets **smaller** while adding critical features!

---

## Part 6: Performance Recommendations

### 🚀 Code Splitting Strategy

```typescript
// Lazy load heavy components
const HiveLabBuilder = dynamic(() => import('@/components/hivelab/builder'), {
  ssr: false,
  loading: () => <BuilderSkeleton />
});

const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false
});

const AdminDashboard = dynamic(() => import('@/components/admin/dashboard'), {
  ssr: false
});

// Lazy load analytics
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('@hive/analytics').then(({ initAnalytics }) => {
      initAnalytics();
    });
  }
}, []);
```

---

### 📦 Package.json Script Improvements

```json
{
  "scripts": {
    // Add bundle analysis
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "BUNDLE_ANALYZE=server npm run build",
    "analyze:browser": "BUNDLE_ANALYZE=browser npm run build",

    // Add dependency check
    "deps:check": "pnpm outdated",
    "deps:update": "pnpm update --interactive --latest",
    "deps:audit": "pnpm audit",

    // Add bundle size check
    "size": "size-limit",

    // Add unused dependency check
    "deps:unused": "npx depcheck"
  },

  // Add size limits (CI will fail if exceeded)
  "size-limit": [
    {
      "path": ".next/static/**/*.js",
      "limit": "500 KB"
    }
  ]
}
```

---

## Part 7: Installation Commands

### 🎯 Recommended Installation Order

```bash
# 1. HIGH PRIORITY (Do before October 1st launch)
cd apps/web
pnpm add socket.io-client @types/socket.io-client
pnpm add @use-gesture/react
pnpm add canvas-confetti @types/canvas-confetti
pnpm add react-intersection-observer
pnpm add @formkit/auto-animate
pnpm add @sentry/nextjs

# 2. UI Package enhancements
cd packages/ui
pnpm add @use-gesture/react
pnpm add canvas-confetti @types/canvas-confetti
pnpm add @formkit/auto-animate

# 3. Hooks package
cd packages/hooks
pnpm add react-intersection-observer

# 4. Fix version mismatches
cd apps/web
pnpm add firebase-admin@^13.2.0

# 5. Analytics (choose one)
cd packages/analytics
pnpm add @vercel/analytics  # Recommended: Smallest, free

# 6. REMOVE unnecessary (if not used)
cd apps/web
# Check if Three.js is actually used first
grep -r "react-three" src/
grep -r "three" src/
# If not found, remove:
pnpm remove three @react-three/fiber @react-three/drei @react-spring/three @react-three/postprocessing

# Check Redis usage
grep -r "ioredis" src/
# If only @upstash/redis is used:
pnpm remove ioredis

# 7. MEDIUM PRIORITY (Post-launch week 2)
cd apps/web
pnpm add next-pwa @types/serviceworker
pnpm add @tanstack/react-query-persist-client
pnpm add idb-keyval

# 8. Dev tools
pnpm add -D size-limit @size-limit/preset-app
pnpm add -D depcheck
```

---

## Part 8: Why These Specific Choices?

### Decision Matrix: Animation Libraries

| Library | Size | Features | When to Use |
|---------|------|----------|-------------|
| **Framer Motion** | 35KB | Full animation suite | Keep - primary animations |
| **@use-gesture** | 10KB | Touch gestures | Add - mobile interactions |
| **auto-animate** | 2KB | List animations | Add - simple use case |
| **React Spring** | 25KB | Physics-based | Skip - Framer Motion covers |
| **Anime.js** | 17KB | Timeline animations | Skip - overkill |
| **GSAP** | 45KB | Professional animations | Skip - overkill |

**Decision**: Keep Framer Motion + Add @use-gesture + auto-animate = Full coverage at 47KB total.

---

### Decision Matrix: Real-time Solutions

| Solution | Cost | Latency | Self-hosted | Decision |
|----------|------|---------|-------------|----------|
| **Socket.IO** | Free | <50ms | Yes | ✅ Use |
| Pusher | $50/mo | <100ms | No | ❌ Expensive |
| Ably | $30/mo | <50ms | No | ❌ Vendor lock-in |
| Firebase RTDB | Free tier | <100ms | No | ⚠️ Limited queries |
| Supabase Realtime | Free tier | <80ms | Optional | 🤔 Consider later |

**Decision**: Socket.IO - Free, self-hosted, battle-tested, full control.

---

### Decision Matrix: Error Monitoring

| Solution | Free Tier | Bundle | Next.js Support | Decision |
|----------|-----------|--------|-----------------|----------|
| **Sentry** | 5K errors | 50KB lazy | ✅ Excellent | ✅ Use |
| LogRocket | 1K sessions | 100KB | ⚠️ Good | ❌ Expensive |
| BugSnag | 7.5K errors | 40KB | ⚠️ Fair | 🤔 Alternative |
| Rollbar | 5K events | 35KB | ⚠️ Fair | 🤔 Alternative |

**Decision**: Sentry - Industry standard, free tier works for vBETA, best DX.

---

### Decision Matrix: Analytics

| Solution | Privacy | Size | Cost | Decision |
|----------|---------|------|------|----------|
| **@vercel/analytics** | Good | 3KB | Free | ✅ Start here |
| PostHog | Excellent | 30KB | Free self-host | 🤔 If need product analytics |
| Plausible | Excellent | 2KB | $9/mo | 🤔 If need privacy-first |
| GA4 | Poor | 45KB | Free | ❌ Privacy concerns |
| Mixpanel | Fair | 60KB | $25/mo | ❌ Expensive |

**Decision**: Start with @vercel/analytics (free, tiny), add PostHog if need funnels/cohorts.

---

## Part 9: Migration Plan

### Week 1: Critical Dependencies

```bash
# Day 1: Animation & Gestures
pnpm add @use-gesture/react canvas-confetti @formkit/auto-animate

# Day 2: Real-time setup
pnpm add socket.io-client
# Set up Socket.IO server (separate service or Next.js API route)

# Day 3: Scroll optimizations
pnpm add react-intersection-observer

# Day 4: Error monitoring
pnpm add @sentry/nextjs
# Configure Sentry project

# Day 5: Testing & QA
npm run build
npm run analyze
# Check bundle sizes
```

### Week 2: Cleanup & Optimization

```bash
# Day 1: Remove unused deps
npx depcheck  # Lists unused dependencies
pnpm remove <unused-deps>

# Day 2: Fix version conflicts
pnpm update firebase-admin@^13.2.0

# Day 3: Bundle analysis
npm run analyze
# Identify large chunks, add dynamic imports

# Day 4: Performance testing
npm run test:e2e:performance

# Day 5: Documentation
# Update DEPENDENCY_STRATEGY.md with actual bundle sizes
```

### Week 3-4: Post-Launch Additions

```bash
# PWA support
pnpm add next-pwa

# Offline support
pnpm add @tanstack/react-query-persist-client idb-keyval

# Analytics
pnpm add @vercel/analytics

# Link previews (optional)
pnpm add @vercel/og metascraper
```

---

## Part 10: Long-term Dependency Strategy

### Principles

1. **<500KB initial bundle** - Fast load on campus WiFi
2. **Lazy load everything non-critical** - Feed loads first, HiveLab loads when clicked
3. **No duplicate functionality** - One library per concern
4. **Prefer smaller alternatives** - date-fns > moment.js, zustand > redux
5. **Real-time > polling** - Socket.IO for live data, not setTimeout polls
6. **Offline-first mentality** - Cache everything, sync when online
7. **Type-safe by default** - TypeScript for all dependencies

### Monthly Review Checklist

```bash
# Check for outdated dependencies
pnpm outdated

# Check for security vulnerabilities
pnpm audit

# Check bundle size trend
npm run analyze
# Compare with last month

# Check unused dependencies
npx depcheck

# Check for duplicate dependencies
pnpm dedupe

# Check for breaking changes in major versions
# Review changelogs before upgrading
```

---

## Summary: Actionable Todo List

### 🚨 MUST DO (Before October 1st)

- [ ] `pnpm add socket.io-client @use-gesture/react canvas-confetti react-intersection-observer @formkit/auto-animate @sentry/nextjs`
- [ ] Update firebase-admin to 13.2.0 in apps/web
- [ ] Audit Three.js usage - remove if unused (saves 150KB)
- [ ] Remove ioredis if only using @upstash/redis
- [ ] Set up Socket.IO server for real-time presence
- [ ] Configure Sentry project for error tracking
- [ ] Add bundle size limits to CI (fail if >500KB)

### ⚡ SHOULD DO (Post-launch week 1-2)

- [ ] `pnpm add next-pwa @tanstack/react-query-persist-client idb-keyval`
- [ ] `pnpm add @vercel/analytics`
- [ ] Set up PWA manifest and service worker
- [ ] Add offline mode to feed/spaces
- [ ] Configure analytics dashboard

### 🎯 NICE TO HAVE (Month 2+)

- [ ] `pnpm add @tiptap/react @tiptap/starter-kit` (rich text editor)
- [ ] `pnpm add @tanstack/react-virtual` (if >500 posts per space)
- [ ] `pnpm add @vercel/og metascraper` (link previews)
- [ ] Consider PostHog for product analytics
- [ ] Consider Plausible for privacy-focused analytics

---

## Final Recommendations

**Total additions**: 12 dependencies, ~40KB gzipped
**Total removals**: 2 dependencies, ~200KB gzipped
**Net change**: **-160KB** (platform gets FASTER while adding features)

**Timeline**: 1 week to add critical deps, 2 weeks to test/optimize, launch-ready

**Philosophy**: Every dependency must justify its bundle cost. "Student autonomy" requires speed + features, not just features.

---

**Next Step**: Review this with team → Approve additions → Install → Test → Ship 🚀
