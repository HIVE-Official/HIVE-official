# HIVE UX/UI Master Todo — Design System & Frontend Excellence

**Created**: November 6, 2025
**Review Cycle**: Weekly until December 13 launch
**Purpose**: Strategic audit of branding, design system, and frontend polish across all vertical slices
**Philosophy**: Ship remarkable, not just functional — A-/B+ grade minimum

---

## 🎯 Overview: Current State Assessment

### Design System Maturity
- **Tokens**: ✅ **Excellent** - PRD-aligned color system (Vercel monochrome + gold), motion tokens defined
- **Components**: 🟡 **Good** - 119 components with 140 Storybook stories, but consistency gaps exist
- **Documentation**: ✅ **Strong** - HIVE UX Law is authoritative and comprehensive
- **Implementation**: 🟡 **Mixed** - Some slices (Feed) have been polished, others (Profile, Rituals) lag behind

### Critical Gaps (Blocking Launch Excellence)
1. **Inconsistent interaction states** across components (hover/focus/active not uniform)
2. **Accessibility gaps** throughout (ARIA labels, keyboard nav, screen reader support)
3. **Loading/error state inconsistency** (some slices have EmptyState/ErrorState, others don't)
4. **Animation timing drift** from motion tokens (some components use hardcoded durations)
5. **Mobile polish lag** behind desktop (80% of usage but feels like afterthought)

---

## 🌐 SLICE 1: GLOBAL CONSISTENCY (Foundation Layer)

**Priority**: P0 - Must fix before slice-specific work
**Timeline**: Week 1-2 (3-4 days total)
**Rationale**: Fixing foundation prevents rework in individual slices

---

### 1.1 Design Token Adherence (Critical)

**Status**: 🟡 Token system exists but enforcement is inconsistent

#### Color Usage Audit
- [ ] **Scan for color violations** (~2h)
  - Run: `rg -n 'className.*"#[0-9A-Fa-f]{6}' apps/ packages/ui/`
  - Expected: 0 hardcoded hex colors (already verified ✅)
  - Action: Keep clean, add ESLint rule to prevent regression

- [ ] **Verify semantic color mapping** (~3h)
  - Components should use: `var(--hive-text-primary)`, not `text-white`
  - Audit 20 most-used components for direct color references
  - Create conversion script: `text-white` → `text-[var(--hive-text-primary)]`
  - Files to check: `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `badge.tsx`

- [ ] **Gold usage discipline** (~2h)
  - Verify gold is ONLY used for: Primary CTAs, achievements, online presence, featured badges
  - Common violation: Gold used in hover states (should be grayscale)
  - Check: Focus rings should be white, not gold (`--hive-interactive-focus` not `--hive-brand-primary`)
  - Files: Search for `from-[var(--hive-brand-primary)]` in non-CTA contexts

**Backend Impact**: None (frontend-only)

---

#### Motion Token Adherence
- [ ] **Animation timing audit** (~3h)
  - Search for: `duration-\d+`, `transition-all duration-\d+`
  - Expected tokens: `duration-[var(--motion-instant)]` (100ms), `duration-[var(--motion-quick)]` (200ms), etc.
  - Common violations:
    - Button press: Should be 200ms (`--motion-quick`), not 150ms or 300ms
    - Sheet open/close: Should be 240ms (`--motion-standard`), not 200ms
    - Card hover: Should be 120ms (`--motion-instant`), not 150ms
  - Files: All components with transitions

- [ ] **Easing curve consistency** (~2h)
  - Verify all animations use: `ease-[var(--easing-default)]` (Vercel smooth curve)
  - NOT: `ease-in-out`, `ease-out`, or custom cubic-bezier
  - Exceptions: Dramatic moments (achievements) can use `--easing-dramatic`
  - Create ESLint rule: Flag `ease-in-out` usage

- [ ] **Framer Motion spring physics** (~2h)
  - Unified spring config across all animated components
  - Config: `{ type: "spring", stiffness: 400, damping: 25 }` (from `@hive/tokens/motion`)
  - Files: Search for `motion.div`, `motion.button` and verify spring values
  - Common drift: Button animations using different stiffness/damping values

**Backend Impact**: None (frontend-only)

---

### 1.2 Interaction State Consistency (Critical)

**Status**: 🔴 Major inconsistencies - buttons, cards, links have different interaction patterns

#### Button Variants
- [ ] **Standardize button states** (~4h)
  - Review [button.tsx](packages/ui/src/atomic/atoms/button.tsx) variants
  - **Problem**: 9 variants (default, primary, secondary, outline, ghost, destructive, link, brand, success, warning)
  - **HIVE UX Law says**: Max 4 variants (Primary, Secondary, Ghost, Danger)
  - **Decision needed**: Consolidate or justify additional variants
  - Action items:
    - Map `brand` → `primary` (they're the same - gold gradient)
    - Map `success`/`warning` → use semantic icons instead
    - Keep: `default`/`primary`, `secondary`, `ghost`, `destructive`

- [ ] **Hover state uniformity** (~3h)
  - All buttons should lift (`translate-y-[-2px]`) + shadow on hover
  - Verify: `hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]` is applied
  - Current drift: Some buttons only change background, no lift
  - Files: `button.tsx` (primary audit), then search for custom `<button>` elements

- [ ] **Active state feedback** (~2h)
  - All interactive elements need `active:translate-y-[1px]` (press down)
  - Verify: < 16ms perceived latency (uses CSS `transition-[background,transform]`)
  - Test: Mobile tap should feel instant (no 300ms delay)
  - Files: `button.tsx`, `card.tsx`, `badge.tsx` (any clickable atoms)

- [ ] **Focus ring consistency** (~3h)
  - **HIVE UX Law**: White glow for focus, NOT gold
  - Verify: `focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]`
  - Common violation: Some components use `ring-[var(--hive-brand-primary)]` (gold)
  - Keyboard nav: Tab → focus ring should be obvious (2px, white, 0.2 opacity)
  - Files: All interactive atoms (button, input, select, checkbox, radio)

**Backend Impact**: None (frontend-only)

---

#### Card Interactions
- [ ] **Hover elevation consistency** (~3h)
  - All clickable cards should lift on hover
  - Standard pattern:
    ```tsx
    hover:border-[color-mix(in_srgb,var(--hive-border-default) 40%,transparent)]
    hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]
    transition-all duration-200
    ```
  - Files: `feed-card-post.tsx`, `feed-card-event.tsx`, `space-card.tsx`, `ritual-card.tsx`
  - Test: Should feel like ChatGPT message hover (subtle, smooth, instant)

- [ ] **Cursor consistency** (~1h)
  - Clickable cards: `cursor-pointer`
  - Non-clickable cards: `cursor-default` (no pointer)
  - Common violation: Cards with `onClick` but missing `cursor-pointer`
  - Search: `onClick.*className.*(?!cursor-pointer)` (regex to find violations)

**Backend Impact**: None (frontend-only)

---

### 1.3 Typography Scale Enforcement (Medium Priority)

**Status**: 🟡 Type scale defined but not consistently applied

- [ ] **Heading hierarchy audit** (~3h)
  - **HIVE UX Law scale**:
    - Display: 28px/32px (page titles)
    - Title: 22px/26px (section headers)
    - Heading: 18px/22px (card titles)
    - Body: 14px/20px (main content)
    - Caption: 12px/16px (metadata)
  - Audit top 20 pages: Are headings using correct scale?
  - Common violation: Using `text-2xl` instead of `text-[var(--text-title)]`
  - Files: All page components (`apps/web/src/app/**/page.tsx`)

- [ ] **Line-height consistency** (~2h)
  - Body text: 1.5 (20px/14px = 1.43, round up to 1.5)
  - Headings: 1.2-1.3 (tighter than body)
  - Verify: No `leading-tight`, `leading-normal` - use token values
  - Search for: `className.*leading-` and verify against tokens

- [ ] **Font weight discipline** (~1h)
  - **Hierarchy**: Display/Title = 600 (semibold), Body = 400 (normal), Caption = 400
  - Gold accent text: 500 (medium) for subtle emphasis
  - Verify: No `font-bold` (700) except for user-generated content emphasis
  - Common violation: Button text using `font-semibold` when design says `font-medium`

**Backend Impact**: None (frontend-only)

---

### 1.4 Spacing Grid Consistency (Low Priority)

**Status**: 🟡 8px grid defined but not strictly enforced

- [ ] **Component spacing audit** (~2h)
  - **HIVE design tokens**: 4, 8, 12, 16, 24, 32, 48, 64 (8px base grid)
  - Search for: `gap-\d+`, `space-y-\d+`, `p-\d+`, `m-\d+`
  - Common violations: `gap-5` (20px - not on grid), `space-y-3` (12px - OK), `p-7` (28px - not on grid)
  - Create ESLint rule: Warn on non-grid spacing values

- [ ] **Container padding standardization** (~2h)
  - Mobile: `px-4` (16px) — minimum for 375px viewport
  - Tablet: `px-6` (24px)
  - Desktop: `px-8` (32px) or centered max-width container
  - Verify: All page layouts use responsive padding
  - Files: Layout components, page wrappers

**Backend Impact**: None (frontend-only)

---

### 1.5 Accessibility Baseline (Critical)

**Status**: 🔴 Major gaps - keyboard nav works but ARIA labels missing, screen reader support incomplete

#### Keyboard Navigation
- [ ] **Tab order verification** (~3h)
  - Test: Tab through each page, verify logical order
  - Common issue: Hidden elements in tab order (fix: `tabIndex={-1}`)
  - Modals: Tab should trap inside modal (use `focus-trap-react` or Radix Dialog)
  - Composer: Tab order: textarea → attach button → visibility toggle → post button
  - Files: All organism-level components

- [ ] **Keyboard shortcuts consistency** (~4h)
  - **HIVE UX Law**: j/k (navigate), l (like), c (comment), b (bookmark), / (search), ? (help)
  - Verify: Shortcuts don't conflict with browser defaults
  - Add: Visual indicator when shortcut available (subtle `?` icon or tooltip)
  - Test: Firefox (different shortcut handling than Chrome)
  - Files: `use-keyboard-shortcuts.ts`, navigation components

- [ ] **Focus visible state** (~2h)
  - All interactive elements: `focus-visible:outline-none focus-visible:ring-2`
  - NO `:focus` without `:focus-visible` (avoids blue outline on mouse click)
  - Test: Tab through page, verify all interactive elements show focus ring
  - Common violation: Custom styled buttons missing focus-visible

**Backend Impact**: None (frontend-only)

---

#### ARIA Labels & Semantic HTML
- [ ] **ARIA label audit** (~6h)
  - **Target**: Every interactive element needs `aria-label` or visible text
  - Button with icon only: MUST have `aria-label="Upvote post"` (not just icon)
  - Images: `alt` text required (decorative: `alt=""`, informative: descriptive text)
  - Form fields: Associate `<label>` with `<input>` via `htmlFor`/`id` OR `aria-label`
  - Common violations:
    - Icon buttons missing aria-label
    - Form inputs without labels
    - Empty links (`<a href="#">` with no text)
  - Files: All atomic components (buttons, inputs, cards)

- [ ] **Landmark regions** (~2h)
  - Main content: `<main>` tag (not `<div>`)
  - Navigation: `<nav>` tag with `aria-label="Main navigation"`
  - Footer: `<footer>` tag
  - Sections: `<section aria-labelledby="section-heading-id">`
  - Verify: Each page has proper semantic structure
  - Files: Layout components, page wrappers

- [ ] **Live regions for updates** (~3h)
  - Feed updates: `aria-live="polite"` for "New posts available" banner
  - Form submissions: `aria-live="assertive"` for errors (interrupts user)
  - Toast notifications: Already handled by Radix Toast (verify)
  - Loading states: `aria-busy="true"` while fetching
  - Files: `use-feed.ts`, form components, toast provider

**Backend Impact**: None (frontend-only)

---

#### Screen Reader Testing
- [ ] **VoiceOver (macOS) audit** (~4h)
  - Test: Navigate Feed, Spaces, Profile with VoiceOver (Cmd+F5)
  - Verify: All content is announced correctly
  - Common issues:
    - Images without alt text
    - Buttons announced as "button" without context
    - Form fields without labels
    - Dynamic content updates not announced
  - Record issues, prioritize by severity (P0: can't complete task, P1: confusing, P2: suboptimal)

- [ ] **NVDA (Windows) validation** (~2h)
  - Secondary validation on Windows (30% of users)
  - Verify: Keyboard shortcuts don't conflict
  - Test: Sign up flow, post creation, space join

**Backend Impact**: None (frontend-only)

---

### 1.6 Mobile Polish (High Priority)

**Status**: 🟡 Functional but feels like desktop-first (80% usage is mobile!)

#### Touch Target Sizing
- [ ] **Minimum touch target audit** (~3h)
  - **WCAG 2.1 AAA**: 44x44px minimum (48x48px preferred)
  - Verify: All buttons, links, interactive elements
  - Current: Button `min-h-[44px]` is correct ✅
  - Common violations:
    - Icon-only buttons < 44px
    - Inline links in paragraph text (can't fix - inherent to text)
    - Chip/badge dismiss X buttons (should be 44px, often 32px)
  - Files: All interactive atoms

- [ ] **Touch feedback (haptics)** (~2h)
  - Mobile Safari: Add `touch-action: manipulation` to prevent double-tap zoom
  - Buttons: Visual press state (`active:translate-y-[1px]`) must be < 16ms
  - Consider: Vibration API for primary actions (subtle, 10ms)
  - Files: Button component, card components

- [ ] **Swipe gesture audit** (~4h)
  - **Spaces**: Swipe right on post → Like (like Instagram Stories)
  - **Feed**: Pull-to-refresh (verify implementation)
  - **Modals**: Swipe down to dismiss (Sheet component)
  - Verify: No accidental swipes triggering browser back
  - Test: iOS Safari (most restrictive), Chrome Android
  - Files: Feed components, Space Board, Sheet component

**Backend Impact**: None (frontend-only)

---

#### Responsive Layout Gaps
- [ ] **375px viewport test** (~3h)
  - **Rationale**: iPhone SE (2nd gen) is 375x667 - smallest modern device
  - Test: All pages should work at 375px width
  - Common failures:
    - Horizontal scroll (overflow-x)
    - Text truncation without ellipsis
    - Buttons wrapping awkwardly
    - Grid layouts breaking (min-width issues)
  - Files: All page layouts, feed cards, space cards

- [ ] **Tablet (768px) breakpoint** (~2h)
  - **Gap**: Tablet layout often looks like squeezed desktop
  - Solution: Introduce `md:` breakpoint styling (768px)
  - Cards: 2-column grid on tablet, 3-column on desktop
  - Sidebar: Collapsible on tablet, fixed on desktop
  - Files: Feed layout, Space Discovery, Profile bento grid

- [ ] **Bottom sheet consistency** (~3h)
  - Mobile: Modals should be bottom sheets (slide up from bottom)
  - Desktop: Modals should be centered dialogs
  - Verify: `Sheet` component handles both (Radix UI)
  - Common violation: Using `Dialog` on mobile (feels wrong)
  - Files: All modal/sheet usages

**Backend Impact**: None (frontend-only)

---

### 1.7 Loading & Error States (Critical)

**Status**: 🔴 Inconsistent - Feed has EmptyState/ErrorState, other slices missing

#### EmptyState Consistency
- [ ] **Extract EmptyState component** (~2h)
  - **Currently**: Feed has inline EmptyState (icon + title + description + CTA)
  - **Action**: Move to `@hive/ui/molecules/empty-state.tsx`
  - Props: `{ icon, title, description, actionLabel, onAction }`
  - Pattern: Gold icon, centered text, primary CTA button
  - Files: Create component, update Feed to use it

- [ ] **Apply EmptyState across slices** (~4h)
  - **Feed**: ✅ Already has EmptyState
  - **Spaces**: Add "No spaces joined - Browse Spaces" (1h)
  - **Profile**: Add "Complete your profile - Add your major" (1h)
  - **HiveLab**: Add "Create your first tool - Start Building" (1h)
  - **Rituals**: Add "No active rituals - Check back soon" (1h)
  - Files: Each slice's page component

**Backend Impact**: None (frontend-only)

---

#### ErrorState Consistency
- [ ] **Extract ErrorState helper** (~3h)
  - **Currently**: Feed has 7-error-type differentiation (Network, Auth, Rate Limit, Not Found, Permission, Server, Generic)
  - **Action**: Move to `@hive/ui/molecules/error-state.tsx`
  - Props: `{ error: Error | string, onRetry?: () => void }`
  - Auto-detect error type from status code or message
  - Pattern: Red icon, error message, "Retry" button (if recoverable)
  - Files: Create component, update Feed to use it

- [ ] **Apply ErrorState across slices** (~4h)
  - **Feed**: ✅ Already has ErrorState
  - **Spaces**: Add error handling for space load failures (1h)
  - **Profile**: Add error handling for profile fetch failures (1h)
  - **HiveLab**: Add error handling for tool load failures (1h)
  - **Rituals**: Add error handling for ritual fetch failures (1h)
  - Files: Each slice's page component

**Backend Impact**: None (frontend-only)

---

#### Loading Skeletons
- [ ] **Skeleton consistency audit** (~3h)
  - Pattern: Match content structure (text = rectangle, image = square, avatar = circle)
  - Animation: `animate-pulse` (1.5s duration, infinite loop)
  - Color: `bg-[var(--hive-background-tertiary)]` (subtle, not distracting)
  - Count: Show 3-5 skeleton items (not 1, not 20)
  - Verify: Feed, Spaces, Profile, HiveLab all have proper skeletons
  - Files: `*-loading-skeleton.tsx` components

- [ ] **Suspense boundary placement** (~2h)
  - Next.js: Wrap async components in `<Suspense fallback={<Skeleton />}>`
  - Granular: Each card can load independently (not entire page at once)
  - Test: Slow 3G throttling - verify progressive loading
  - Files: Page-level components (server components)

**Backend Impact**: None (frontend-only)

---

### 1.8 Performance Optimization (Medium Priority)

**Status**: 🟡 Performance budgets defined but not enforced in CI

- [ ] **Bundle size audit** (~3h)
  - **Target**: < 800KB initial bundle (currently ~850KB per TODO.md)
  - Run: `NODE_OPTIONS="--max-old-space-size=4096" npm run build:analyze`
  - Identify: Largest chunks (Framer Motion, Radix UI, Firebase client)
  - Action:
    - Code-split HiveLab Studio (lazy load)
    - Code-split Admin dashboard (lazy load)
    - Tree-shake unused Radix components
  - Files: `next.config.mjs` (add webpack bundle analyzer)

- [ ] **Image optimization** (~2h)
  - All images: Use Next.js `<Image>` component (auto-optimization)
  - Avatars: Serve at 96x96 (small), 128x128 (medium), 256x256 (large) - not full size
  - Cover images: Lazy load below-the-fold images
  - Format: WebP with JPEG fallback (Next.js handles automatically)
  - Files: Search for `<img>` tags, replace with `<Image>`

- [ ] **Core Web Vitals monitoring** (~4h)
  - Setup: Vercel Analytics (already enabled?)
  - Track: LCP (< 2.5s), FID (< 100ms), CLS (< 0.1)
  - Verify: Feed page meets all 3 metrics
  - Common CLS issues: Images without `width`/`height`, dynamic content shifts
  - Files: Add `width` and `height` to all `<Image>` components

**Backend Impact**: None (frontend-only)

---

## 📊 Global Consistency Summary

**Total Estimated Time**: ~80 hours (2 weeks for 1 person, 1 week for 2 people)

### Priority Breakdown
- **P0 (Blocking)**: 35 hours
  - Design token adherence: 10h
  - Interaction state consistency: 12h
  - Accessibility baseline: 13h
- **P1 (Should Fix)**: 30 hours
  - Mobile polish: 12h
  - Loading/error states: 13h
  - Typography/spacing: 5h
- **P2 (Nice to Have)**: 15 hours
  - Performance optimization: 9h
  - Documentation: 6h

### Recommended Approach
1. **Week 1**: P0 items (design tokens, interaction states, keyboard nav)
2. **Week 2**: P1 items (mobile polish, loading states)
3. **Week 3**: P2 items + slice-specific work in parallel

**Next**: Once global consistency is at 90%, proceed to slice-specific polish (Feed, Spaces, Profile, HiveLab, Rituals)

---

## 🎨 SLICE 2: AUTH/ONBOARDING (Status: A+ / 95% - Maintain Excellence)

**Current Grade**: A+ (95/100) — Best-in-class
**Priority**: P2 - Maintenance only, no major rework needed
**Time to maintain**: ~2 hours

---

### What's Already Excellent ✅
- 10-step wizard with smooth transitions
- Progressive disclosure (hide steps based on user type)
- Optimistic UI (photo preview before upload)
- Error boundaries (step-level error handling)
- Mobile-first (fully responsive, touch-optimized)
- Accessibility (ARIA labels, keyboard navigation works)

### Minor Polish Opportunities

- [ ] **Add step transition animation** (~1h)
  - Currently: Steps appear instantly (no motion)
  - Add: Slide-in from right (forward), slide-out to left (back)
  - Motion: 240ms with `--easing-default`
  - Feel: Like Apple onboarding (smooth, directional)
  - File: `hive-onboarding-wizard.tsx`

- [ ] **Photo upload preview polish** (~1h)
  - Currently: Preview appears instantly
  - Add: Subtle scale-in animation (0.95 → 1.0) over 200ms
  - Add: Crop overlay guide (rule of thirds grid)
  - Test: Upload large image (5MB+) - verify thumbnail generation
  - File: `hive-photo-step.tsx`

**Backend Impact**: None (frontend-only)

---

## 🌊 SLICE 3: FEED (Status: B / 83% - Target A- / 90%)

**Current Grade**: B (83/100)
**Target**: A- (90/100)
**Gap**: +7 points
**Time to A-**: ~5 hours (per TODO.md)

---

### What's Already Good ✅
- EmptyState implemented (gold icon + CTA)
- ErrorState implemented (7 error types with recovery)
- TypeScript strict (no `any` types)
- Button animations (tap feedback, icon scale, count pop)
- Optimistic updates (< 16ms perceived latency)

### Remaining Work (Already in TODO.md)

- [ ] **Accessibility - ARIA labels** (~3h)
  - Add `role` and `aria-label` to all 42 interactive elements
  - Visual keyboard shortcut hints overlay (press `?` to show)
  - Screen reader announcements for state changes (`aria-live="polite"`)
  - Focus trap on comment modal
  - **Impact**: +3 pts → 86/100

- [ ] **Card entrance animations** (~1h)
  - Framer Motion stagger children (50ms delay between cards)
  - Fade-in on scroll for lazy-loaded content
  - Exit animations for dismissed items
  - **Impact**: +2 pts → 88/100

- [ ] **Keyboard selection indicator** (~1h)
  - Gold border (2px) on selected card (j/k navigation)
  - Smooth scroll to selected item (`behavior: 'smooth'`)
  - Persist selection state in URL hash
  - **Impact**: +2 pts → **90/100 A-** ✅

**Backend Impact**: None (frontend-only)

**Note**: Feed polish is already well-documented in TODO.md - no need to duplicate. Focus on executing the plan.

---

## 🏘️ SLICE 4: SPACES (Status: C / 70% - Target A- / 90%)

**Current Grade**: C (70/100)
**Target**: A- (90/100)
**Gap**: +20 points
**Time to A-**: ~10 hours (per TODO.md)

---

### What's Good ✅
- Feed-first minimalism implemented (clutter reduced by 53%)
- Pinned posts use vertical stack (gold left border)
- Composer consolidated ([+ Add] dropdown)
- Mobile: Single scroll (no tab bar)
- Campus isolation enforced

### Critical Gaps 🔴

#### UX Issues
- [ ] **EmptyState missing** (~1h)
  - "No spaces joined - Browse Spaces" with CTA
  - Reuse Feed EmptyState pattern (gold icon + centered text)
  - **Impact**: +6 pts → 76/100

- [ ] **ErrorState missing** (~1h)
  - Space load failures need clear error messages
  - Network error → "Retry" button
  - 403 Forbidden → "You don't have access to this space"
  - 404 Not Found → "Space not found" + "Browse Spaces"
  - **Impact**: +2 pts → 78/100

#### Interaction Polish
- [ ] **Optimistic join/leave** (~2h)
  - Currently: Join button shows loading spinner (feels slow)
  - Add: Instant button state change (Join → Joined)
  - Add: Member count increments immediately (+1)
  - Add: "My Spaces" list updates instantly (add/remove space)
  - Rollback: If API fails, revert state + show toast
  - **Impact**: +6 pts → 84/100

- [ ] **Button animations** (~1h)
  - Apply Feed pattern: Tap feedback (scale 0.95), icon scale (1.1)
  - Join/Leave button, Post submit button, Tool deploy button
  - **Impact**: +2 pts → 86/100

#### Accessibility
- [ ] **ARIA labels** (~3h)
  - Currently: 4 ARIA attributes, need 50+
  - Space cards: `role="article"`, `aria-label="Space: {name}"`
  - Member list: `role="list"`, `aria-label="Space members"`
  - Post actions: `aria-label="Upvote post"`, `aria-pressed`
  - **Impact**: +3 pts → 89/100

#### TypeScript
- [ ] **Fix `any` types** (~1h)
  - 11 `any` types need proper interfaces
  - Space interface (members, posts, tools arrays)
  - SpaceMember interface (role, joinedAt)
  - SpacePost interface (attachments, metadata)
  - **Impact**: +1 pt → **90/100 A-** ✅

**Backend Impact**:
- Optimistic updates require API response consistency (ensure 200 OK includes updated space data)
- No schema changes needed

---

### Design System Alignment

- [ ] **Space Header consistency** (~2h)
  - Currently: Varies between pages (browse vs. board)
  - Standardize: Icon + Name + Member count + Join/Leave button
  - Remove: @handle, category badge (per SPACES_TOPOLOGY feed-first minimalism)
  - File: `space-header.tsx`

- [ ] **Pinned posts visual treatment** (~1h)
  - Currently: Gold left border (correct ✅)
  - Verify: No carousel remnants in code
  - Verify: Max 2 pins enforced
  - File: `pinned-posts-stack.tsx`

**Backend Impact**: None (frontend-only)

---

## 👤 SLICE 5: PROFILE (Status: C / 70% - Target A- / 90%)

**Current Grade**: C (70/100)
**Target**: A- (90/100)
**Gap**: +20 points
**Time to A-**: ~8 hours (per TODO.md)

---

### What's Good ✅
- Bento grid layout (1-3 columns based on viewport)
- 6 customizable widgets (Identity, Spaces, Activity, Connections, HiveLab, Calendar)
- Campus identity (UB colors, @buffalo.edu badge)
- Privacy controls (ghost mode)
- Completion psychology (progress bar)

### Critical Gaps 🔴

#### UX Issues
- [ ] **EmptyState for incomplete profile** (~1h)
  - Show missing widgets with "Add" CTAs
  - Progress indicator: "Your profile is 60% complete"
  - Next step suggestions: "Add your major", "Upload a photo"
  - **Impact**: +6 pts → 76/100

- [ ] **Optimistic profile edit** (~2h)
  - Currently: Edit form submits → loading → success (feels slow)
  - Add: Instant UI updates before API response
  - Photo upload: Preview immediately before upload completes
  - Name/bio/major: Update display before API response
  - Interests: Add/remove chips instantly
  - Rollback: If API fails, revert + show toast
  - **Impact**: +6 pts → 82/100

#### Interaction Polish
- [ ] **Button animations** (~1h)
  - Edit button tap feedback
  - Save button animation (loading → success)
  - Photo upload button animation
  - **Impact**: +2 pts → 84/100

#### Accessibility
- [ ] **ARIA labels** (~3h)
  - Currently: 3 ARIA attributes, need 50+
  - Widget cards: `role="region"`, `aria-label="Identity widget"`
  - Edit forms: Proper labels, error announcements
  - Photo upload: `aria-label="Upload profile photo"`, progress updates
  - **Impact**: +3 pts → 87/100

#### TypeScript
- [ ] **Fix `any` types** (~1h)
  - 7 `any` types need proper interfaces
  - Profile aggregate interfaces (widgets, connections)
  - WidgetConfig interface (position, size, visible)
  - ConnectionRequest interface (status, timestamp)
  - **Impact**: +1 pt → 88/100

**Backend Impact**:
- Profile edit API should return updated profile object (for optimistic rollback validation)
- Photo upload should return CDN URL immediately (< 500ms)

---

### Design System Gaps

- [ ] **Bento grid responsive breakpoints** (~2h)
  - Currently: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
  - Issue: Tablet layout feels cramped
  - Fix: Adjust breakpoints (1 col < 640px, 2 col 640-1024px, 3 col > 1024px)
  - Test: iPad (768px), iPad Pro (1024px)
  - File: `profile-bento-grid.tsx`

- [ ] **Widget drag-and-drop polish** (~2h)
  - Currently: Drag works but feels janky
  - Add: Smooth drag animation (Framer Motion drag constraints)
  - Add: Drop zone highlight (border glow when hovering)
  - Test: Touch drag on mobile (should work, not just mouse)
  - File: `profile-bento-grid.tsx`

**Backend Impact**: None (frontend-only)

---

## 🧪 SLICE 6: HIVELAB (Status: C / 70% - Target B+ / 85%)

**Current Grade**: C (70/100)
**Target**: B+ (85/100) — Good enough for launch
**Gap**: +15 points
**Time to B+**: ~4 hours (per TODO.md)

---

### What's Good ✅
- No-code tool builder with drag-and-drop canvas
- 30+ element types (Input, Button, Display, Form, Share)
- Deploy to spaces with 1-click
- Template browser (12+ pre-built templates)
- Analytics dashboard (response count, usage metrics)

### Critical Gaps 🔴

#### UX Issues
- [ ] **EmptyState** (~1h)
  - "No tools yet - Create your first tool"
  - Icon: Sparkles, Title: "Create your first tool"
  - Action: "Start Building" button → /hivelab
  - Show template preview carousel (3 popular templates)
  - **Impact**: +6 pts → 76/100

- [ ] **ErrorState** (~0.5h)
  - Tool load/save failures need clear messages
  - Network error → "Retry" button
  - Permission error → "You can't edit this tool"
  - Validation error → Highlight invalid elements
  - **Impact**: +2 pts → 78/100

#### Interaction Polish
- [ ] **Button animations** (~0.5h)
  - "Create Tool" button tap feedback
  - Deploy button animation
  - Element add button animation
  - **Impact**: +2 pts → 80/100

#### Accessibility
- [ ] **ARIA labels** (~3h)
  - Currently: 1 ARIA attribute, need 30+
  - Canvas interactions: `role="region"`, `aria-label="Tool canvas"`
  - Element library: `role="toolbar"`, element buttons labeled
  - Deploy form: Proper labels, error announcements
  - **Impact**: +3 pts → 83/100

#### TypeScript
- [ ] **Fix `any` types** (~0.5h)
  - 2 `any` types need proper interfaces
  - ElementInstance interface (recursive type for nested elements)
  - ToolDeployment interface (state, responses)
  - **Impact**: +1 pt → 84/100

**Backend Impact**: None (frontend-only)

---

### Design System Gaps

- [ ] **Canvas grid background** (~1h)
  - Currently: Plain dark background
  - Add: Subtle dot grid (like Figma) for spatial awareness
  - Pattern: 24px grid, dots at 50% opacity
  - Color: `rgba(255, 255, 255, 0.03)` (barely visible)
  - File: `hivelab-studio.tsx`

- [ ] **Element drag preview** (~2h)
  - Currently: Element drags but no preview
  - Add: Semi-transparent preview while dragging
  - Add: Drop zone highlight (border pulse)
  - Snap: 8px grid snapping for alignment
  - File: `hivelab-studio.tsx`

**Backend Impact**: None (frontend-only)

---

## 🎭 SLICE 7: RITUALS (Status: C+ / 72% - Target B+ / 85%)

**Current Grade**: C+ (72/100)
**Target**: B+ (85/100)
**Gap**: +13 points
**Time to B+**: ~6 hours (4h polish + 2h testing per TODO.md)

---

### What's Good ✅
- 9 archetype event system (Tournament, Feature Drop, Rule Inversion, etc.)
- Ritual engine with phase transitions (Draft → Announced → Active → Completed)
- Feed integration (gold ritual banner at top of feed)
- Detail pages with participation tracking
- Admin composer (5-step wizard, < 30s to create)
- Template library (12+ pre-built ritual templates)
- Real-time polling (30s intervals)
- Leaderboards (participant rankings)

### Critical Gaps 🔴

#### UX Issues
- [ ] **EmptyState** (~1h)
  - "No active rituals - Stay tuned for campus events!"
  - Show countdown to next ritual (e.g., "Next ritual starts in 2d 5h")
  - Browse ritual history link
  - **Impact**: +6 pts → 78/100

- [ ] **ErrorState** (~0.5h)
  - Ritual load failures need clear messages
  - Network error → "Retry" button
  - 404 Not Found → "This ritual has ended" + history link
  - Permission error → "You can't access this ritual"
  - **Impact**: +2 pts → 80/100

#### Accessibility
- [ ] **ARIA labels** (~3h)
  - Currently: 0 ARIA attributes, need 30+
  - Ritual banners: `role="banner"`, `aria-label="Active ritual: {name}"`
  - Detail pages: Proper headings hierarchy, participation buttons labeled
  - Vote buttons: `aria-label="Vote for {competitor}"`, `aria-pressed`
  - **Impact**: +3 pts → 83/100

#### TypeScript
- [ ] **Fix `any` type** (~0.5h)
  - 1 `any` type needs proper interface
  - RitualArchetypeConfig interface (tournament/lottery/unlock configs)
  - **Impact**: +1 pt → 84/100

#### Integration Testing
- [ ] **Manual testing** (~2h)
  - Admin flow: Create → Launch → Monitor
  - Student flow: See → Join → Participate (all 9 archetypes)
  - Cross-archetype validation
  - Script: `scripts/integration/rituals-smoke.sh`
  - **Impact**: Ensures functional completeness (not scored, but required)

**Backend Impact**: None for polish work. Testing may reveal backend bugs.

---

### Design System Gaps

- [ ] **Gold gradient consistency** (~1h)
  - Verify: `from-[#FFD700] via-[#FFA500] to-transparent` is used everywhere
  - Verify: Glow effect `shadow-[0_0_24px_rgba(255,215,0,0.15)]` is consistent
  - Files: `ritual-feed-banner.tsx`, `ritual-strip.tsx`, `ritual-card.tsx`

- [ ] **Phase transition animations** (~2h)
  - Currently: Phase changes instantly (no motion)
  - Add: Fade transition (240ms) between phases
  - Add: Celebration animation when ritual completes (confetti + scale pulse)
  - Motion: Use `--easing-dramatic` for milestone moments
  - File: `ritual-detail-layout.tsx`

**Backend Impact**: None (frontend-only)

---

## 🎯 Execution Roadmap (4-Week Sprint)

### Week 1: Foundation (Global Consistency P0)
**Focus**: Design tokens, interaction states, accessibility baseline
**Time**: 35 hours (2 developers working in parallel)

- Day 1-2: Design token adherence (colors, motion, spacing)
- Day 3-4: Interaction state consistency (buttons, cards, focus rings)
- Day 5: Accessibility baseline (keyboard nav, ARIA labels, screen reader basics)

**Deliverable**: Global design system at 90% compliance

---

### Week 2: Mobile + Loading States (Global Consistency P1)
**Focus**: Mobile polish, EmptyState/ErrorState rollout
**Time**: 30 hours

- Day 1-2: Mobile polish (touch targets, gestures, responsive layouts)
- Day 3-4: EmptyState/ErrorState extraction + deployment across slices
- Day 5: Buffer for rework + QA

**Deliverable**: Mobile feels polished, no blank screens across app

---

### Week 3: Slice Polish (Feed, Spaces, Profile)
**Focus**: Bring top 3 slices to A- grade
**Time**: 23 hours

- Day 1: Feed to A- (accessibility + animations) — 5h
- Day 2-3: Spaces to A- (EmptyState, optimistic join, accessibility) — 10h
- Day 4-5: Profile to A- (EmptyState, optimistic edit, accessibility) — 8h

**Deliverable**: Core user flows at A- grade

---

### Week 4: Final Polish (HiveLab, Rituals, QA)
**Focus**: Remaining slices to B+, integration testing
**Time**: 12 hours + QA buffer

- Day 1: HiveLab to B+ (EmptyState, accessibility) — 4h
- Day 2: Rituals to B+ (EmptyState, accessibility, testing) — 6h
- Day 3-5: Cross-browser testing, bug fixes, final QA

**Deliverable**: All 6 slices at A-/B+ grade, launch-ready

---

## 📊 Success Metrics

### Design System Health
- [ ] **0 hardcoded colors** in components (verified via grep)
- [ ] **95%+ motion token usage** (< 5% hardcoded durations)
- [ ] **All interactive elements** have consistent hover/focus/active states
- [ ] **100% WCAG 2.1 AA compliance** for keyboard nav + ARIA labels

### User Experience Quality
- [ ] **All slices have EmptyState** (no blank screens)
- [ ] **All slices have ErrorState** (clear error messages + recovery)
- [ ] **Mobile feels native** (touch targets, gestures, responsive)
- [ ] **Loading states < 1s** perceived latency (optimistic updates + skeletons)

### Launch Readiness
- [ ] **Feed**: A- (90/100) — Core loop polished
- [ ] **Spaces**: A- (90/100) — Second most-used feature
- [ ] **Profile**: A- (90/100) — Identity system solid
- [ ] **HiveLab**: B+ (85/100) — Good enough for leaders
- [ ] **Rituals**: B+ (85/100) — Moat feature functional
- [ ] **Auth/Onboarding**: A+ (95/100) — Maintained ✅

**Overall Platform Grade**: A- (90/100 average across slices) — Ship remarkable! 🚀

---

## 🔄 Maintenance Cadence (Post-Launch)

### Weekly Design System Review (30 min)
- Scan new PRs for design token violations
- Review Storybook for component drift
- Update design system docs if patterns change

### Monthly UX Audit (2 hours)
- User testing session (5 students)
- Identify top 3 friction points
- Prioritize fixes for next sprint

### Quarterly Refinement Sprint (1 week)
- Polish lowest-graded slice (+5-10 points)
- Extract new reusable patterns to @hive/ui
- Update topology docs with learnings

---

**Last Updated**: November 6, 2025
**Next Review**: November 13, 2025 (end of Week 1 foundation work)
**Launch Target**: December 9-13, 2025

**Remember**: "Ship remarkable, not just functional." Every interaction should make students choose HIVE over Instagram. Design is our competitive advantage. 🎨
