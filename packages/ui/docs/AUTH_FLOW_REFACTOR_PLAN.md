# Auth Flow Refactor Plan

**Status:** Ready to Execute
**Date:** October 3, 2025
**Dependencies Installed:** ✅ Motion One + Lottie
**Animation Library:** ✅ Complete (`@hive/ui/lib/animations`)

---

## 🎯 Objectives

1. **Visual Consistency**: Match Spaces/Profile dark monochrome aesthetic
2. **Animation Upgrade**: Replace custom easing with spring physics + Lottie
3. **Component Migration**: Old Hive components → shadcn atoms
4. **Storybook Documentation**: Comprehensive stories for all auth states

---

## 📊 Current State Audit

### Login Page (`/auth/login/page.tsx`) - 560 lines
**Strengths:**
- ✅ Dark monochrome (#0A0A0B) - matches design system
- ✅ Premium glass effects, gradients
- ✅ Two-step flow (school → email)
- ✅ Framer Motion animations

**Needs Refactor:**
- ⚠️ Uses old components: `HiveButton`, `HiveInput`, `HiveCard`
- ⚠️ Custom easing `[0.23, 1, 0.32, 1]` → should use `springs.smooth`
- ⚠️ No Lottie for success state (just Mail icon)

### Verify Page (`/auth/verify/page.tsx`) - 220 lines
**Strengths:**
- ✅ Loading/Success/Error states
- ✅ Uses `AuthLayout` and `AuthStatus`

**Needs Refactor:**
- ⚠️ Very basic - just status icons, no animations
- ⚠️ Could use Lottie for `verifying` state (animated spinner)
- ⚠️ Could use Lottie for `success` (bouncy checkmark)

### Expired Page (`/auth/expired/page.tsx`) - 466 lines
**Critical Issues:**
- 🚨 **Uses temp component stubs** (lines 11-16) - NOT production ready
- 🚨 Framer Motion commented out due to SSR issues

**Needs Complete Rebuild:**
- Must use real `@hive/ui` components
- Add spring-based animations
- Add Lottie for countdown timer

---

## 🎨 Design System Alignment

### Color Palette (Match Spaces/Profile)
```css
Background: #0A0A0B (darkest black)
Surface: #0c0c0c (cards, modals)
Border: rgba(255, 255, 255, 0.08) (subtle separation)
Text Primary: #FFFFFF
Text Secondary: rgba(255, 255, 255, 0.70)
Text Tertiary: rgba(255, 255, 255, 0.40)
Accent Gold: #FFD700 (HIVE brand)
Success: #10B981 (green-500)
Error: #EF4444 (red-500)
```

### Typography
```css
Font: Geist (from @hive/tokens)
Heading: text-4xl lg:text-5xl font-bold
Body: text-lg text-white/70
Label: text-sm font-medium
```

### Spacing & Rhythm
```css
Container: max-w-md (448px)
Card padding: p-8
Gap: space-y-6 (forms), space-y-3 (buttons)
Border radius: rounded-2xl (cards), rounded-xl (inputs)
```

---

## 🔧 Component Migration Map

### Before → After

```tsx
// OLD (Hive custom components)
import { HiveButton, HiveInput, HiveCard, HiveLogo } from '@hive/ui';

<HiveButton variant="primary" size="lg">Send magic link</HiveButton>
<HiveInput type="email" variant="default" />
<HiveCard className="p-8">...</HiveCard>

// NEW (shadcn atoms)
import { Button, Input, Card, Logo } from '@hive/ui';

<Button variant="default" size="lg">Send magic link</Button>
<Input type="email" />
<Card className="p-8">...</Card>
```

### Animation Migration

```tsx
// OLD (custom easing)
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
/>

// NEW (spring physics from @hive/tokens)
import { springs, slideRight } from '@hive/ui/lib/animations';

<motion.div
  variants={slideRight}
  initial="initial"
  animate="animate"
  transition={springs.smooth}
/>
```

---

## 🎬 Lottie Integration Strategy

### 1. Source Animations

**Free Resources:**
- [LottieFiles.com](https://lottiefiles.com) - search for:
  - "email sent checkmark"
  - "loading spinner hexagon"
  - "success celebration"
  - "error shake"
  - "countdown timer clock"

**Custom Option:**
- Hire motion designer on Fiverr ($50-150)
- Provide HIVE brand colors (#FFD700 gold, #0A0A0B dark)
- Request hexagon-themed animations

### 2. Implementation

```tsx
import {
  EmailSentAnimation,
  VerifyingAnimation,
  SuccessAnimation,
  ErrorAnimation,
  ClockAnimation
} from '@hive/ui';

// In Login success modal
<EmailSentAnimation size={120} />

// In Verify loading state
<VerifyingAnimation size={80} />

// In Verify success
<SuccessAnimation size={100} />

// In error states
<ErrorAnimation size={80} />

// In Expired countdown
<ClockAnimation size={60} />
```

### 3. Fallback Strategy

If Lottie file fails to load:
```tsx
{!lottieLoaded && <Loader2 className="animate-spin" />}
```

---

## 📱 Responsive Behavior

### Mobile (375px - 768px)
```css
- Container: max-w-full px-6
- Heading: text-3xl (smaller)
- Card padding: p-6 (reduced)
- Button: full width w-full
- Modal: bottom sheet (vaul drawer)
```

### Tablet (768px - 1024px)
```css
- Container: max-w-md
- Standard desktop layout
```

### Desktop (1024px+)
```css
- Container: max-w-md centered
- Background effects: floating orbs, gradients
```

---

## 🎭 Animation Patterns

### Page Transitions
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    variants={slideRight}  // school → email
    initial="initial"
    animate="animate"
    exit="exit"
    transition={springs.smooth}
  >
    {currentStep === 'school' && <SchoolSelection />}
    {currentStep === 'email' && <EmailInput />}
  </motion.div>
</AnimatePresence>
```

### Modal Entrances
```tsx
import { scale } from '@hive/ui/lib/animations';

<Dialog>
  <motion.div
    variants={scale}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={springs.smooth}
  >
    <DialogContent>
      <EmailSentAnimation />
      {/* Modal content */}
    </DialogContent>
  </motion.div>
</Dialog>
```

### Button Micro-Interactions
```tsx
import { micro } from '@hive/ui/lib/animations';

<motion.button
  {...micro.buttonPress}
  whileTap={{ scale: 0.95 }}
  transition={springs.snappy}
>
  Send magic link
</motion.button>
```

### Error State (Shake)
```tsx
const [error, setError] = useState(null);

<motion.div
  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
  transition={{ duration: 0.4 }}
>
  <Input error={error} />
</motion.div>
```

---

## 📦 File Structure

```
packages/ui/src/
├── atomic/
│   ├── atoms/
│   │   ├── button.tsx              ← shadcn Button
│   │   ├── input.tsx               ← shadcn Input
│   │   ├── card.tsx                ← shadcn Card
│   │   └── ... (other shadcn atoms)
│   │
│   └── molecules/
│       ├── lottie-auth-states.tsx  ← NEW: Lottie wrappers
│       └── ...
│
├── Features/
│   ├── 00-Landing/                 ← NEW: Landing stories
│   │   ├── Overview.mdx
│   │   ├── hero-section.stories.tsx
│   │   ├── problem-section.stories.tsx
│   │   └── cta-section.stories.tsx
│   │
│   ├── 01-Auth/                    ← NEW: Auth stories
│   │   ├── Overview.mdx
│   │   ├── login-school-select.stories.tsx
│   │   ├── login-email-input.stories.tsx
│   │   ├── login-success-modal.stories.tsx
│   │   ├── verify-loading.stories.tsx
│   │   ├── verify-success.stories.tsx
│   │   ├── verify-error.stories.tsx
│   │   ├── expired-countdown.stories.tsx
│   │   └── complete-auth-flow.stories.tsx  ← Full journey
│   │
│   └── 02-Onboarding/              ← Refactor existing
│       └── ...
│
└── lib/
    └── animations/
        ├── index.ts                ← Already exists ✓
        ├── presets.ts              ← Already exists ✓
        ├── gestures.ts             ← Already exists ✓
        ├── layout.ts               ← Already exists ✓
        └── scroll.ts               ← Already exists ✓
```

---

## 🚀 Implementation Phases

### Phase 1: Login Page Refactor (2-3 hours)
**Tasks:**
1. Replace `HiveButton` → `Button`
2. Replace `HiveInput` → `Input`
3. Replace `HiveCard` → `Card`
4. Update animations: custom easing → `springs.smooth`
5. Add `<EmailSentAnimation />` to success modal
6. Add button micro-interactions with `springs.snappy`
7. Test on mobile (375px), tablet (768px), desktop (1440px)

**Files to Modify:**
- `apps/web/src/app/auth/login/page.tsx`

**Expected Outcome:**
- Visual parity with Spaces/Profile
- Smoother, more premium animations
- Lottie animation delights users on success

---

### Phase 2: Verify Page Refactor (1-2 hours)
**Tasks:**
1. Add `<VerifyingAnimation />` to loading state
2. Add `<SuccessAnimation />` to success state
3. Add `<ErrorAnimation />` to error state
4. Update transitions to use `springs.smooth`
5. Add shake animation for errors

**Files to Modify:**
- `apps/web/src/app/auth/verify/page.tsx`
- `apps/web/src/components/auth/auth-status.tsx` (if exists)

**Expected Outcome:**
- Animated verification states
- Clear visual feedback during async operations

---

### Phase 3: Expired Page Rebuild (2-3 hours)
**Critical Fix:**
1. **Remove temp stubs** (lines 11-16)
2. Import real components from `@hive/ui`
3. Add `<ClockAnimation />` for countdown
4. Re-enable Framer Motion (fix SSR issues)
5. Match aesthetic to Login page

**Files to Modify:**
- `apps/web/src/app/auth/expired/page.tsx`

**Expected Outcome:**
- Production-ready page (no stubs!)
- Animated countdown timer
- Consistent with other auth pages

---

### Phase 4: Storybook Stories (3-4 hours)
**Create Stories For:**

#### Landing Page Stories (`00-Landing/`)
1. Hero section with CTA
2. Problem section (why campus life sucks)
3. Solution section (HIVE solves it)
4. Testimonials/social proof
5. Demo preview
6. Final CTA

#### Auth Flow Stories (`01-Auth/`)
1. **School Selection**
   - Empty state (loading schools)
   - Default state (2 schools)
   - Many schools (10+ for scroll)
   - Selected state (highlighted)

2. **Email Input**
   - Empty (placeholder)
   - Typing (validation)
   - Error state (invalid email)
   - Success modal open

3. **Verification**
   - Loading (animated spinner)
   - Success (bouncy checkmark)
   - Error (shake + message)

4. **Expired Link**
   - Initial state (countdown ready)
   - Counting down (animated clock)
   - Resend success
   - Too many attempts (rate limit)

5. **Complete Flow**
   - Full user journey from school selection → onboarding redirect

**Files to Create:**
- `packages/ui/src/Features/00-Landing/*.stories.tsx`
- `packages/ui/src/Features/01-Auth/*.stories.tsx`

**Expected Outcome:**
- Interactive Storybook demos
- QA can test all states without backend
- Design review ready

---

## 🎓 Success Criteria

### Visual
- [ ] Dark monochrome (#0A0A0B) background on all pages
- [ ] Geist font used consistently
- [ ] Gold accents (#FFD700) for primary actions
- [ ] Glass effects match Spaces/Profile
- [ ] No visual regression from current state

### Animation
- [ ] All transitions use spring physics (no custom easing)
- [ ] Lottie animations on Email Sent, Verifying, Success, Error states
- [ ] Button press micro-interactions (scale 0.95)
- [ ] Modal entrances use scale + fade
- [ ] Page transitions use slide animations
- [ ] Respects `prefers-reduced-motion`

### Components
- [ ] Zero usage of old Hive components (HiveButton, HiveInput, etc.)
- [ ] 100% shadcn atoms
- [ ] Expired page uses real components (NO stubs!)
- [ ] All components typed with TypeScript

### Performance
- [ ] Lottie bundle < 100KB total
- [ ] Page load < 2s on 3G
- [ ] Animations run at 60fps
- [ ] No jank during transitions

### Storybook
- [ ] 15+ stories created across Landing + Auth
- [ ] All states documented (empty, loading, success, error)
- [ ] Complete user flow story (school → email → verify → onboarding)
- [ ] Interactive controls for testing
- [ ] Dark background in all stories

---

## 🔗 Lottie Animation Sources

### Option A: Free from Lottie Files
Visit: [https://lottiefiles.com](https://lottiefiles.com)

**Search Terms:**
- "email sent checkmark" → Use for Login success modal
- "loading spinner minimal" → Use for Verify loading
- "success celebration" → Use for Verify success
- "error shake" → Use for error states
- "countdown timer clock" → Use for Expired page

**Download as:**
- `.json` format (Lottie JSON)
- Host on CDN or include in repo (`/public/animations/`)

### Option B: Custom HIVE-Branded Animations
**Designer Brief:**
- Platform: Fiverr, Upwork, Dribbble
- Budget: $100-200 for 5 animations
- Brand colors: #FFD700 (gold), #0A0A0B (dark)
- Style: Minimal, modern, hexagon-themed
- Deliverables:
  1. Email sent (envelope → checkmark)
  2. Verifying (hexagon spinner)
  3. Success (bouncy gold checkmark)
  4. Error (red X with shake)
  5. Countdown (clock ticking down)

**Specs:**
- Size: 400x400px artboard
- Duration: 1-2 seconds (no loop except loading)
- Format: Lottie JSON
- Optimized: < 20KB per file

---

## 🚧 Known Blockers & Solutions

### Blocker 1: Expired Page SSR Issues
**Problem:** Framer Motion commented out due to SSR errors
**Solution:** Wrap in `<Suspense>` + use `'use client'` directive

```tsx
'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpiredPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ExpiredPageContent />
    </Suspense>
  );
}
```

### Blocker 2: Lottie File URLs
**Problem:** Currently using placeholder URLs
**Solution:** Download from LottieFiles, host in `/public/animations/`, use local paths

```tsx
// Before
src="https://lottie.host/placeholder.json"

// After
src="/animations/email-sent.json"
```

### Blocker 3: Component Import Confusion
**Problem:** Mix of old/new component names
**Solution:** Global find/replace with VS Code

```bash
# Find: HiveButton
# Replace: Button

# Find: HiveInput
# Replace: Input

# Find: HiveCard
# Replace: Card
```

---

## 📋 Next Steps (Ready to Execute)

1. **Get Lottie Animations** (30 min)
   - Search LottieFiles.com for 5 animations
   - Download as `.json`
   - Place in `/public/animations/`
   - Update `lottie-auth-states.tsx` with real paths

2. **Refactor Login Page** (2-3 hours)
   - Component migration (Hive → shadcn)
   - Animation upgrade (easing → springs)
   - Add Lottie to success modal
   - Test responsive

3. **Refactor Verify Page** (1-2 hours)
   - Add Lottie animations
   - Update transitions
   - Test all 3 states

4. **Rebuild Expired Page** (2-3 hours)
   - Remove temp stubs
   - Import real components
   - Add animations
   - Fix SSR

5. **Create Storybook Stories** (3-4 hours)
   - Landing page stories (6 sections)
   - Auth flow stories (9 scenarios)
   - Complete flow story

**Total Time:** 9-14 hours

---

**Status:** Ready to begin
**Approved By:** Awaiting Jacob's confirmation
**Storybook URL:** http://localhost:6006 → Features/01-Auth (after stories created)
