# Profile Page Responsive Behavior Audit

## Breakpoint Strategy
- **Mobile**: < 768px (default classes)
- **Tablet**: 768px+ (`md:` prefix)
- **Desktop**: 1024px+ (`lg:` prefix)

---

## 📱 MOBILE (375px) - Default Styles

### Layout Structure
- **Grid**: `grid-cols-1` → Single column, fully stacked
- **Container padding**: `p-4` (16px)
- **Gap between sections**: `gap-3` (12px)

### Photo Section
- **Height**: `h-[280px]` (compact for mobile scrolling)
- **Photo indicators**: Bottom position `bottom-24` (96px from bottom)
- **Edit button**: Top-right `top-4 right-4`

### Identity Overlay
- **Name**: `text-3xl` (30px)
- **Handle**: `text-base` (16px)
- **Metadata**: `text-sm` (14px)
- **Padding**: `p-5` (20px)

### Calendar Widget
- **Height**: `h-[180px]` (very compact)
- **Title**: "📅 Schedule" (hides "Today's" via `hidden md:inline`)
- **Badge**: `text-[9px] h-4` (tiny)
- **Events shown**: **2 events only** (3rd hidden via `i === 2 && "hidden md:block"`)
- **Event padding**: `p-2` (8px)
- **Event text**: `text-xs` (12px title), `text-[10px]` (time)
- **Event spacing**: `space-y-3` (12px gaps)
- **Arrow icon**: `h-3 w-3` (12px)

### Stats Grid
- **Layout**: `grid-cols-4` (4 columns in single row)
- **Numbers**: `text-lg` (18px)
- **Labels**: `text-[10px]` (10px)
- **Padding**: `p-2` (8px)
- **Gap**: Divided by `divide-x divide-border/50`

### Bio
- **Title**: `text-xs` (12px)
- **Padding**: `p-3` (12px)

### Widget Grid Below
- **Layout**: Single column stacked (default)
- **Widgets**: "My Spaces", "Activity", "HiveLab" stack vertically

---

## 📱 TABLET (768px) - `md:` Classes

### Layout Structure
- **Grid**: `md:grid-cols-[300px_1fr]` → 2-column (300px photo + remaining)
- **Container padding**: `sm:p-6` (24px)
- **Gap between sections**: `gap-3` (still 12px, `lg:` changes this)

### Photo Section
- **Height**: `md:h-[520px]` (much taller, 240px increase from mobile)
- **Grid column**: Takes fixed 300px width

### Identity Overlay
- **Name**: Still `text-3xl` (no change)
- **Handle**: Still `text-base` (no change)
- **Metadata**: Still `text-sm` (no change)
- **Padding**: Still `p-5` (no change, waits for `lg:`)

### Calendar Widget
- **Height**: `md:h-[240px]` (+60px from mobile)
- **Title**: "📅 **Today's** Schedule" (shows "Today's" via `md:inline`)
- **Badge**: `md:text-[10px] md:h-5` (slightly larger)
- **Events shown**: **3 events** (3rd now visible via `md:block`)
- **Event padding**: `md:p-3` (12px, +4px from mobile)
- **Event text**: `md:text-sm` (14px title), `md:text-xs` (12px time)
- **Arrow icon**: `md:h-4 md:w-4` (16px, +4px)
- **Header padding**: `md:pb-3` (12px)

### Stats Grid
- **Numbers**: `md:text-2xl` (24px, +6px from mobile)
- **Labels**: `md:text-xs` (12px, +2px)
- **Padding**: `md:p-3` (12px, +4px)
- **Gap**: `md:gap-3` (12px between stat columns)

### Bio
- **Title**: `md:text-sm` (14px, +2px)
- **Padding**: `md:p-4` (16px, +4px)

### Widget Grid Below
- **Layout**: May become 2-column if responsive classes present

---

## 🖥️ DESKTOP (1440px) - `lg:` Classes

### Layout Structure
- **Grid**: `lg:grid-cols-[360px_1fr]` → 2-column (360px photo + remaining)
- **Container padding**: `lg:p-8` (32px)
- **Gap between sections**: `lg:gap-4` (16px, +4px from tablet)

### Photo Section
- **Height**: `lg:h-[560px]` (tallest, 40px increase from tablet)
- **Grid column**: Takes fixed 360px width (+60px from tablet)

### Identity Overlay
- **Name**: `lg:text-4xl` (36px, +6px)
- **Handle**: `lg:text-lg` (18px, +2px)
- **Metadata**: `lg:text-base` (16px, +2px)
- **Padding**: `lg:p-6` (24px, +4px)

### Calendar Widget
- **Height**: Still `md:h-[240px]` (no further increase)
- **Title**: `lg:text-lg` (18px, +4px)
- **All other sizes remain from tablet**

### Stats Grid
- **Layout**: Still 4 columns
- **Hover**: `hover:bg-muted/50` (subtle background on hover)
- **Dividers**: Vertical lines between stats via `divide-x`

### Right Column Gap
- **Gap**: `lg:gap-4` (16px between Calendar, Stats, Bio)

### Widget Grid Below
- **Layout**: 3-column Bento grid
- **My Spaces**: 1 column
- **Activity**: 1 column
- **HiveLab**: 1 column (or 2-column span if asymmetric)

---

## ✅ Responsive Audit Checklist

### Mobile (375px)
- [ ] Photo height is compact (280px) - fits above fold
- [ ] Only 2 calendar events shown
- [ ] Calendar title shows just "Schedule" (no "Today's")
- [ ] Stats remain in 4-column row (not stacked)
- [ ] All text sizes are readable at small viewport
- [ ] Photo indicators visible at bottom
- [ ] Edit button accessible in top-right

### Tablet (768px)
- [ ] Layout switches to 2-column (photo left, content right)
- [ ] Photo takes 300px fixed width
- [ ] Photo height increases to 520px
- [ ] 3rd calendar event now visible
- [ ] Calendar shows "Today's Schedule"
- [ ] Stat numbers larger (24px)
- [ ] Everything fits without horizontal scroll

### Desktop (1440px)
- [ ] Photo width increases to 360px
- [ ] Photo height increases to 560px
- [ ] Name is 36px (bold, prominent)
- [ ] Calendar title is 18px
- [ ] Right column has generous 16px gaps
- [ ] Stats have clear hover states
- [ ] No scrolling needed to see header section (photo + calendar + stats + bio)

---

## 🚨 Potential Issues to Verify

### Mobile
1. **Calendar at 180px**: Is this too cramped for 2 events?
2. **Stats in 4 columns**: Do labels truncate at 375px width?
3. **Photo indicators**: Are they visible against photo content?

### Tablet
1. **300px photo width**: Is this too narrow?
2. **3 events at 240px**: Does the 3rd event cause overflow?

### Desktop
1. **360px photo width**: Does this leave enough space for right column?
2. **Stat dividers**: Are they visible enough at low opacity?

---

## 📸 Testing Instructions

### Manual Testing Steps:
1. Open Storybook in browser
2. Navigate to: `02-Profile / ProfileCompletePage - Own Profile`
3. Use browser DevTools responsive mode
4. Test at exact breakpoints:
   - **375px width** (iPhone SE)
   - **768px width** (iPad Mini)
   - **1440px width** (MacBook Pro 16")
5. Verify checklist items above
6. Take screenshots at each breakpoint
7. Test hover states on desktop
8. Test photo carousel swipe on mobile

### Key Interactions to Test:
- [ ] Photo carousel swipe left/right (mobile touch)
- [ ] Photo indicators update on swipe
- [ ] Edit button clickable at all sizes
- [ ] Calendar hover shows arrow
- [ ] Stats hover shows background change
- [ ] Bio expand/collapse if implemented

---

## 🎯 Expected Responsive Behavior Summary

| Element | Mobile (375px) | Tablet (768px) | Desktop (1440px) |
|---------|---------------|----------------|------------------|
| **Layout** | Stacked 1-col | 2-col (300px + 1fr) | 2-col (360px + 1fr) |
| **Photo Height** | 280px | 520px | 560px |
| **Calendar Height** | 180px | 240px | 240px |
| **Events Shown** | 2 | 3 | 3 |
| **Calendar Title** | "Schedule" | "Today's Schedule" | "Today's Schedule" |
| **Name Size** | 30px | 30px | 36px |
| **Stat Numbers** | 18px | 24px | 24px |
| **Container Padding** | 16px | 24px | 32px |
| **Section Gaps** | 12px | 12px | 16px |

---

## ✨ Responsive Design Strengths

1. **Progressive disclosure**: Shows 2 events on mobile, 3 on tablet+
2. **Proportional scaling**: Photo grows with viewport
3. **Smart text hiding**: "Today's" only shows when space allows
4. **Unified layout**: Same component for all sizes (no separate mobile/desktop)
5. **Touch-friendly**: 12px gaps minimum for mobile tap targets

## ⚠️ Areas Requiring Verification

1. **Stat label truncation** at mobile widths
2. **Calendar overflow** with 3 events at tablet
3. **Photo indicator visibility** against various photo backgrounds
4. **Bio text overflow** for long bios on mobile

---

**Status**: Ready for manual responsive testing
**Date**: 2025-10-03
**Component**: profile-complete-page.stories.tsx (Own Profile)
