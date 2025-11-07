# Design System Update — ChatGPT/Vercel/SF Startup Feel

**Updated**: November 2, 2025
**Status**: ✅ Complete — Ready for Day 1 Build
**Philosophy**: Black/white minimal with strategic gold accents

---

## 🎯 Strategic Changes

### 1. **Gold Usage = Brand Discipline**

**Before**: Gold everywhere (focus rings, hovers, borders)
**After**: Gold reserved for 4 key moments only

```typescript
// ✅ ALLOWED (Gold Usage)
--hive-gold-cta          // Primary CTA buttons only
--hive-gold-achievement  // Ritual complete, level up
--hive-gold-online       // Online presence (147 students)
--hive-gold-featured     // Featured badges

// ❌ FORBIDDEN (Use Grayscale Instead)
Focus rings   → rgba(255, 255, 255, 0.20)  // White glow
Hover states  → rgba(255, 255, 255, 0.04)  // Subtle white
Border focus  → rgba(255, 255, 255, 0.40)  // White highlight
```

**Why**: Gold = dopamine hit. Overuse = visual noise. Reserve for rewards.

---

### 2. **Motion System Simplified**

**Before**: 15+ easing curves (liquid, magnetic, silk, steel, molten, snap, orchestrated...)
**After**: 3 core curves (90% consistency)

```typescript
// Use for 90% of animations
default: 'cubic-bezier(0.23, 1, 0.32, 1)'  // Vercel-inspired smooth

// Use for toggles, checkboxes
snap: 'cubic-bezier(0.25, 0.1, 0.25, 1)'   // Quick, decisive

// Use for rituals, achievements ONLY
dramatic: 'cubic-bezier(0.165, 0.84, 0.44, 1)'  // Cinematic moments
```

**Why**: Consistency > variety. ChatGPT/Linear/Arc use 1-2 curves max.

---

### 3. **Grayscale Interactive States**

**Before**: Gold focus rings, gold hovers
**After**: White/gray for all default interactions

```typescript
// Interactive States (ChatGPT/Vercel Feel)
--hive-interactive-hover: rgba(255, 255, 255, 0.04)  // Subtle
--hive-interactive-focus: rgba(255, 255, 255, 0.20)  // White glow
--hive-interactive-active: rgba(255, 255, 255, 0.08) // Press

// Border States (Minimal)
--hive-border-default: rgba(255, 255, 255, 0.08)  // Subtle dividers
--hive-border-hover: rgba(255, 255, 255, 0.16)    // Hover borders
--hive-border-focus: rgba(255, 255, 255, 0.40)    // White focus (NOT gold)
```

**Why**: SF/YC startups use grayscale for 95% of UI. Clean, professional, timeless.

---

## 📐 Core Design Tokens (Unchanged)

### Colors (Black/White Foundation)
```typescript
Background: #000000 → #171717 → #262626 (layered depth)
Text: #FFFFFF → #D4D4D4 → #A3A3A3 (contrast hierarchy)
Gold: #FFD700 (strategic accents only)
```

### Typography (Mobile-Optimized)
```typescript
Font: 'Geist Sans' (Vercel-inspired)
Sizes: 28px/18px/14px/12px (display/heading/body/small)
Weights: 400/500/600/700 (normal/medium/semibold/bold)
```

### Spacing (4px Grid)
```typescript
4px/8px/16px/24px/32px/48px (consistent rhythm)
```

### Radius (Apple-Inspired)
```typescript
Buttons: 16px (generous touch targets)
Cards: 20px (softer containers)
Modals: 32px (premium dialogs)
```

---

## 🎨 Component Usage Patterns

### ✅ Correct Button Usage

```tsx
// Primary CTA (Gold)
<Button variant="brand">Join This Space →</Button>
// → Uses --hive-gold-cta

// Default Button (White on Black)
<Button>Cancel</Button>
// → Uses --hive-text-primary (white)

// Secondary Button (Outline)
<Button variant="outline">Learn More</Button>
// → Uses --hive-border-default (subtle white)
```

### ✅ Correct Focus Rings

```tsx
// Focus state (White glow, NOT gold)
focus-visible:ring-2
focus-visible:ring-[var(--hive-interactive-focus)]
// → Uses rgba(255,255,255,0.20) white glow

// ❌ WRONG: Don't use gold for focus
focus-visible:ring-[var(--hive-brand-primary)]
```

### ✅ Correct Hover States

```tsx
// Hover state (Subtle white, NOT gold)
hover:bg-[var(--hive-interactive-hover)]
// → Uses rgba(255,255,255,0.04)

// ❌ WRONG: Don't use gold for hovers
hover:bg-[var(--hive-brand-primary)]
```

---

## 🚫 Gold Anti-Patterns (Don't Do This)

```tsx
// ❌ WRONG: Gold focus ring
className="focus:ring-[var(--hive-brand-primary)]"

// ✅ CORRECT: White focus ring
className="focus:ring-[var(--hive-interactive-focus)]"

// ❌ WRONG: Gold hover state
className="hover:bg-[var(--hive-brand-primary)]"

// ✅ CORRECT: Grayscale hover
className="hover:bg-[var(--hive-interactive-hover)]"

// ❌ WRONG: Gold borders everywhere
className="border-[var(--hive-brand-primary)]"

// ✅ CORRECT: Subtle white borders
className="border-[var(--hive-border-default)]"
```

---

## 🎯 When to Use Gold

### ✅ Primary CTAs Only
```tsx
<Button variant="brand">
  Join This Space →
</Button>
<Button variant="brand">
  Create Your First Tool
</Button>
<Button variant="brand">
  Start This Ritual
</Button>
```

### ✅ Achievement Moments
```tsx
<AchievementBadge color="gold">
  🏆 Ritual Complete!
</AchievementBadge>
<LevelUpNotification>
  ⬆️ You're now a Builder
</LevelUpNotification>
```

### ✅ Online Presence
```tsx
<OnlineIndicator count={147} />
// → Shows gold dot + "147 online"
```

### ✅ Featured Badges
```tsx
<Badge variant="gold">
  ⭐ Featured Tool
</Badge>
<Badge variant="gold">
  🔥 Hot Space
</Badge>
```

---

## 📊 Visual Hierarchy

```
Black (#000000)                   ← App background
  ↓ Layer up with grayscale
Gray-900 (#171717)                ← Card backgrounds
  ↓ Layer up again
Gray-800 (#262626)                ← Elevated surfaces
  ↓ Text hierarchy
White (#FFFFFF)                   ← Primary text
  ↓ Reduce opacity
Gray-300 (#D4D4D4)                ← Secondary text
  ↓ Reduce more
Gray-400 (#A3A3A3)                ← Tertiary text
  ↓ Strategic accent
Gold (#FFD700)                    ← CTAs, achievements only
```

---

## 🚀 Migration Checklist

Before Day 1 build sprint:

- [x] Update colors-prd-aligned.ts (grayscale interactive states)
- [x] Simplify motion.ts (3 core curves)
- [x] Document gold usage rules
- [x] Create component usage patterns
- [ ] Regenerate hive-tokens.css (run build script)
- [ ] Update existing Button component (verify grayscale hovers)
- [ ] Audit existing molecules (remove gold overuse)
- [ ] Update Storybook examples (show correct patterns)

---

## 📖 Design Philosophy

**HIVE = ChatGPT meets Vercel meets SF startup**

- **95% grayscale** — Clean, professional, timeless
- **5% gold** — Strategic moments only (CTAs, rewards)
- **No visual noise** — Subtle hovers, white focus rings
- **Motion consistency** — Same easing for same interactions
- **Mobile-first** — 80% usage on phones, design accordingly

**Brand Rule**: If you're unsure whether to use gold, **use grayscale**.

---

## ✅ Ready for Build

**Status**: Design system updated and documented
**Next Step**: Build Day 1 components following these guidelines
**Success Metric**: 95% grayscale, 5% gold (measured by component audit)

---

**Updated tokens:**
- [colors-prd-aligned.ts](packages/tokens/src/colors-prd-aligned.ts) ← Gold usage rules
- [motion.ts](packages/tokens/src/motion.ts) ← Simplified to 3 curves

**Ship it.** 🚀
