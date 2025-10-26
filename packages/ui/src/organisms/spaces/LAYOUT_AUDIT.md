# Spaces Layout Audit Report

**Date**: January 2025  
**Component**: `SpaceLayout.tsx`  
**Status**: ❌ **NOT PRODUCTION READY** - 12 Critical Issues Identified

---

## 🚨 Critical Issues

### 1. Incorrect 60/40 Ratio

**Current**: Uses 7/5 columns (58.33% / 41.67%)  
**Should Be**: True 60% / 40% split  
**Impact**: Layout doesn't match design spec  
**Fix**: Use `flex` with `flex-basis` or custom grid

### 2. Broken Sticky Positioning

**Current**: Header `py-4` but Dock assumes `top-24`  
**Impact**: Dock overlaps or has incorrect spacing  
**Fix**: Calculate header height dynamically or use CSS variables

### 3. No Mobile Optimization

**Current**: Dock stacks below feed  
**Impact**: Users scroll endlessly, poor UX  
**Fix**: Implement drawer/sheet pattern or bottom tabs

### 4. Feed Too Wide on Ultrawide

**Current**: No max-width constraint on feed column  
**Impact**: Lines too long to read (>1000px on 4K)  
**Fix**: `max-w-3xl` on feed content

### 5. Context Rail Can Overflow

**Current**: No height management  
**Impact**: Sticky breaks if Dock content taller than viewport  
**Fix**: `max-h-screen overflow-y-auto` with proper spacing

### 6. Missing Breakpoints

**Current**: Only `lg:` (1024px)  
**Impact**: Poor experience on tablets and 1440p+ displays  
**Fix**: Add `md:`, `xl:`, `2xl:` responsive variants

### 7. Container Duplication

**Current**: Both header and content have `max-w-7xl mx-auto`  
**Impact**: Redundant code, inconsistent spacing  
**Fix**: Single container wrapper

### 8. No Safe Areas

**Current**: No mobile notch handling  
**Impact**: Content hidden on iPhone 14 Pro, Pixel 8  
**Fix**: Use `env(safe-area-inset-*)` values

### 9. Inconsistent Spacing

**Current**: Mix of arbitrary values (`py-4`, `py-6`, `gap-6`)  
**Impact**: Doesn't follow design system  
**Fix**: Use design tokens (`space-4`, `space-6`, etc.)

### 10. No Loading/Empty States

**Current**: Assumes content always present  
**Impact**: Breaks on slow connections, empty spaces  
**Fix**: Skeleton UI, empty state components

### 11. No Scroll Management

**Current**: Infinite scroll not considered  
**Impact**: Poor feed navigation experience  
**Fix**: Virtual scrolling, scroll restoration

### 12. Z-Index Not Managed

**Current**: Header `z-10`, no scale defined  
**Impact**: Modals/dropdowns may be behind header  
**Fix**: Z-index design tokens (header: 10, dropdown: 20, modal: 30, toast: 40)

---

## 📊 Layout Metrics (Current vs Target)

| Metric                     | Current    | Target             | Status          |
| -------------------------- | ---------- | ------------------ | --------------- |
| **Feed Width Ratio**       | 58.33%     | 60%                | ❌ Off by 1.67% |
| **Mobile Experience**      | Stack      | Drawer/Tabs        | ❌ Poor UX      |
| **Feed Max Width**         | None       | 800px              | ❌ Too wide     |
| **Sticky Offset Accuracy** | 6rem       | Dynamic            | ❌ Hardcoded    |
| **Responsive Breakpoints** | 1          | 4+                 | ❌ Incomplete   |
| **Safe Area Support**      | No         | Yes                | ❌ Missing      |
| **Loading States**         | No         | Yes                | ❌ Missing      |
| **Performance**            | Not tested | <50ms layout shift | ⚠️ Unknown      |

---

## ✅ Recommended Solution

### Architecture

```
┌─────────────────────────────────────────┐
│ Sticky Header (z-10)                    │ <- Dynamic height
├─────────────────────────────────────────┤
│ ┌──────────────┬──────────────────────┐ │
│ │ Feed (60%)   │ Context Rail (40%)   │ │
│ │ max-w-3xl    │ sticky, max-h-screen │ │
│ │              │ overflow-y-auto      │ │
│ └──────────────┴──────────────────────┘ │
└─────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────────┐
│ Sticky Header                            │
├─────────────────────────────────────────┤
│ Feed (100%)                              │
│                                          │
│ [Context in Sheet/Drawer]                │
└─────────────────────────────────────────┘
```

### Implementation Strategy

1. **Phase 1: Fix Ratio & Constraints**

   - Use `flex` with `flex-basis: 60%` and `flex-basis: 40%`
   - Add `max-w-3xl` to feed content
   - Add `max-h-screen overflow-y-auto` to context rail

2. **Phase 2: Sticky Header**

   - Use `ResizeObserver` to track header height
   - Set CSS variable `--header-height`
   - Use `calc(var(--header-height) + 1rem)` for sticky offset

3. **Phase 3: Mobile UX**

   - Add Sheet component for context rail
   - Floating action button to open context
   - Or bottom navigation tabs

4. **Phase 4: Polish**
   - Add skeleton loaders
   - Implement scroll restoration
   - Add empty states
   - Performance testing

---

## 🎯 Priority Fixes (MVP)

### P0 (Launch Blockers)

1. Fix 60/40 ratio (use flex)
2. Add feed max-width constraint
3. Fix sticky offset calculation
4. Add mobile drawer/sheet

### P1 (Post-Launch Week 1)

5. Add responsive breakpoints
6. Implement loading states
7. Safe area handling

### P2 (Polish)

8. Virtual scrolling for long feeds
9. Scroll restoration
10. Z-index design tokens

---

## 📝 Code Example (Recommended)

```typescript
export const SpaceLayout = ({ header, feed, contextRail }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-header bg-background border-b border-border"
        style={
          { "--header-height": `${headerHeight}px` } as React.CSSProperties
        }
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">{header}</div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-6">
          {/* Feed - 60% */}
          <div className="flex-1 basis-full lg:basis-[60%] max-w-3xl">
            <div className="space-y-6">{feed}</div>
          </div>

          {/* Context Rail - 40% */}
          <aside
            className="hidden lg:block flex-1 basis-[40%]"
            style={{ top: `calc(${headerHeight}px + 1.5rem)` }}
          >
            <div className="sticky max-h-[calc(100vh-var(--header-height)-3rem)] overflow-y-auto space-y-6">
              {contextRail}
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Context Drawer */}
      <MobileContextDrawer className="lg:hidden">
        {contextRail}
      </MobileContextDrawer>
    </div>
  );
};
```

---

## ⚡ Performance Considerations

1. **Layout Shift**: Minimize CLS by reserving space for dynamic content
2. **Scroll Performance**: Use `will-change: transform` sparingly
3. **Sticky Performance**: Avoid nested sticky elements
4. **Mobile Performance**: Lazy load context rail content

---

## 🔐 Accessibility Checklist

- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus trap in mobile drawer
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Skip to content link
- [ ] Reduced motion support
- [ ] Screen reader announcements for dynamic content

---

## 📚 References

- [CSS Tricks: Sticky Positioning](https://css-tricks.com/position-sticky-2/)
- [MDN: Safe Area Insets](https://developer.mozilla.org/en-US/docs/Web/CSS/env)
- [Web.dev: Layout Shift](https://web.dev/cls/)

---

**Conclusion**: The current layout works for basic demos but needs significant improvements for production use. Recommend addressing P0 issues before launch.




