# SPACES → HIVELAB TOOLS: COMPLETE VERIFICATION AUDIT

**Date**: 2025-10-03
**Scope**: Spaces page → Tool selection (Inline + Widget) → Tool modals → Post creation
**Status**: ❌ **INCOMPLETE - Requires Dark Monochrome Refactoring**

---

## **EXECUTIVE SUMMARY**

The Spaces + HiveLab Tools vertical slice is **functionally complete** but **visually inconsistent**. Most components use default shadcn styling (light theme semantic tokens like `border-border`, `bg-card`, `text-muted-foreground`) instead of explicit dark monochrome values (`bg-[#0c0c0c]`, `border-white/8`, `text-white/70`).

### **Critical Findings**

1. **✅ All components exist** - No missing files
2. **❌ Dark monochrome NOT applied consistently** - Most use shadcn semantic tokens
3. **❌ TypeScript errors** - Badge variant issues (188 errors total, ~15 in this slice)
4. **❌ Tool modals use light theme** - Need dark refactoring
5. **✅ Complete user flows work** - Both inline and widget paths functional

---

## **1. COMPONENT HIERARCHY & STATUS**

### **The Complete Stack**

```
NavigationShell (App-wide)
└── SpaceLayout (60/40 Split) ⚠️ UNKNOWN
    ├── 60% Main Content Column
    │   ├── SpaceHeader ⚠️ MIXED - Uses semantic tokens
    │   ├── SpacePostFeed ⚠️ MIXED - Uses semantic tokens
    │   └── SpaceComposerWithTools ❌ LIGHT THEME
    │       ├── Textarea (rounded border, Claude-style)
    │       ├── InlineToolMenu (+ button dropdown) ❌ LIGHT THEME
    │       │   ├── Poll 📊 → opens PollModal
    │       │   ├── Event 📅 → opens EventModal
    │       │   ├── Task 📋 → opens TaskModal
    │       │   └── Resource 📚 → opens ResourceModal
    │       ├── useSlashCommands hook (/poll /event /task /resource) ✅
    │       └── Attach buttons (file, image)
    │
    └── 40% Sidebar Column
        ├── SpaceAboutSection ⚠️ MIXED - Uses Card semantic tokens
        ├── SpaceEventsPanel ⚠️ MIXED - Uses Card semantic tokens
        ├── SpaceToolsPanel ❌ LIGHT THEME
        │   ├── Default Tools Grid (Poll, Event, Task, Resource)
        │   ├── Custom HiveLab Tools (if any)
        │   ├── "Manage Tools" button (leaders only)
        │   └── "Create Custom Tool" button (leaders → HiveLab)
        ├── SpaceResourcesPanel ⚠️ MIXED - Uses Card semantic tokens
        └── SpaceMembersPanel ⚠️ MIXED - Uses Card semantic tokens

Shared Modals (opened by BOTH inline and widget):
├── PollModal ⚠️ USES DIALOG (dialog is dark, but inputs may not be)
├── EventModal ⚠️ USES DIALOG
├── TaskModal ⚠️ USES DIALOG
└── ResourceModal ⚠️ USES DIALOG
```

---

## **2. COMPONENT-BY-COMPONENT AUDIT**

### **2.1 Inline Tool Components** (P0 - Critical Path)

#### **InlineToolMenu** (`molecules/inline-tool-menu.tsx`)
- **Status**: ❌ **LIGHT THEME**
- **Issues**:
  - Tool colors: `text-blue-500`, `text-green-500`, `text-orange-500`, `text-purple-500`
  - Background: `bg-card` (semantic token, not explicit dark)
  - Border: `border-border` (semantic token)
  - Text: `text-foreground`, `text-muted-foreground` (semantic tokens)
- **Needs**:
  - Remove all color classes (use emoji only)
  - Replace `bg-card` → `bg-[#0c0c0c]`
  - Replace `border-border` → `border-white/8`
  - Replace `text-foreground` → `text-white`
  - Replace `text-muted-foreground` → `text-white/70`
  - Hover borders: `border-white/20`

#### **SpaceComposerWithTools** (`molecules/space-composer-with-tools.tsx`)
- **Status**: ❌ **LIGHT THEME (Claude-style rounded UI)**
- **Issues**:
  - Uses semantic tokens: `bg-background`, `border-border`, `text-foreground`
  - Focus ring: `focus-within:border-primary` (should be white)
  - Send button: `bg-primary` (should be `bg-white text-black` when active)
- **Needs**:
  - Replace `bg-background` → `bg-[#0c0c0c]`
  - Replace `border-border` → `border-white/8`
  - Focus: `focus-within:border-white/20` (NOT primary)
  - Send button active: `bg-white text-black`
  - Send button disabled: `bg-white/10 text-white/30`
  - Placeholder: `placeholder:text-white/50`

---

### **2.2 Widget Tool Component** (P1 - Discovery Path)

#### **SpaceToolsPanel** (`organisms/space-tools-panel.tsx`)
- **Status**: ❌ **LIGHT THEME (Default shadcn Card)**
- **Issues**:
  - Uses Card component (semantic `bg-card`, `border-border`)
  - Icon: `text-primary` (should be `text-white/70`)
  - Tool buttons: use semantic tokens
  - Leaders badge: uses `variant="secondary"` (TypeScript error - doesn't exist)
- **Needs**:
  - Card dark: `bg-[#0c0c0c] border-white/8`
  - Icons: `text-white/70`
  - Tool grid buttons: same as InlineToolMenu
  - Leaders badge: `bg-[#FFD700]/20 text-[#FFD700]` (use variant="gold" once Badge is fixed)
  - Custom tool colored left borders: keep but use explicit colors with opacity

---

### **2.3 Tool Modals** (P0 - Shared by Both Paths)

All 4 modals in `organisms/tool-action-modals.tsx`:

#### **PollModal**
- **Status**: ⚠️ **MIXED - Uses Dialog (dark) but needs input verification**
- **Components Used**:
  - Dialog ✅ (already dark monochrome from earlier refactor)
  - Input ❓ (need to verify dark)
  - Label ❓ (need to verify dark)
  - Switch ❓ (need to verify dark)
  - Button ❓ (need to verify dark)
- **Needs**: Verify all atom components are dark monochrome

#### **EventModal**
- **Status**: ⚠️ **MIXED - Same as PollModal**
- **Components Used**: Dialog, Input, Label, Textarea, Button
- **Needs**: Verify all atoms

#### **TaskModal**
- **Status**: ⚠️ **MIXED - Same as PollModal**
- **Components Used**: Dialog, Input, Label, Textarea, Button
- **Needs**: Verify all atoms

#### **ResourceModal**
- **Status**: ⚠️ **MIXED - Same as PollModal**
- **Components Used**: Dialog, Input, Label, Textarea, Switch, Button
- **Needs**: Verify all atoms

---

### **2.4 Space Organisms** (Supporting Components)

#### **SpacePostFeed** (`organisms/space-post-feed.tsx`)
- **Status**: ⚠️ **MIXED - Uses semantic tokens but may work**
- **Style**: Discord-style grouped messages
- **Issues**:
  - Uses semantic tokens throughout: `bg-background`, `border-border`, `text-foreground`, `text-muted-foreground`
  - Composer uses same tokens as SpaceComposerWithTools
  - Hover: `hover:bg-accent/30`
- **Needs**: Verify in Storybook if semantic tokens resolve to dark values

#### **SpaceHeader** (`organisms/space-header.tsx`)
- **Status**: ⚠️ **MIXED - Uses semantic tokens + motion components**
- **Issues**:
  - Uses MotionDiv, MotionButton (framer-motion)
  - Semantic tokens: `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`
  - Badge variants: uses "secondary" (TypeScript error)
  - Privacy badge: uses "outline" (TypeScript error)
- **Needs**:
  - Fix Badge variant issues
  - Verify motion components work with dark theme
  - Test on dark background

#### **SpaceAboutSection** (`organisms/space-about-section.tsx`)
- **Status**: ⚠️ **MIXED - Uses Card semantic tokens**
- **Issues**: Same as SpaceHeader (Card, Badge variants)
- **Needs**: Verify in Storybook

#### **SpaceEventsPanel** (`organisms/space-events-panel.tsx`)
- **Status**: ⚠️ **MIXED - Uses Card semantic tokens**
- **Issues**: Badge variant="secondary" (TypeScript error)
- **Needs**: Fix Badge variants, verify dark theme

#### **SpaceMembersPanel** (`organisms/space-members-panel.tsx`)
- **Status**: ⚠️ **MIXED - Uses Card semantic tokens**
- **Issues**: Badge variants (secondary, outline - TypeScript errors)
- **Needs**: Fix Badge variants

#### **SpaceResourcesPanel** (`organisms/space-resources-panel.tsx`)
- **Status**: ⚠️ **MIXED - Uses Card semantic tokens**
- **Issues**: Same as above
- **Needs**: Verify in Storybook

---

## **3. TYPESCRIPT ERRORS ANALYSIS**

### **Total Errors**: 188 errors
### **Relevant to This Vertical Slice**: ~15 errors

#### **Badge Variant Errors** (Primary Issue)

**Problem**: Badge component only accepts `"default" | "destructive" | "gold"` but many components use `"secondary"` and `"outline"`.

**Affected Components**:
- `space-header.tsx`: lines 142, 243
- `space-events-panel.tsx`: (likely many)
- `space-members-panel.tsx`: line 94 (and others)
- `space-about-section.tsx`: (likely)

**Files to Fix**:
```
src/atomic/organisms/space-header.tsx(142,58): error TS2322: Type '"secondary"' is not assignable to type '"default" | "destructive" | "gold"'.
src/atomic/organisms/space-header.tsx(243,30): error TS2322: Type '"secondary"' is not assignable to type '"default" | "destructive" | "gold"'.
```

**Solutions**:
1. **Option A**: Extend Badge component to support "secondary" and "outline" variants
2. **Option B**: Replace all `variant="secondary"` with `variant="default"` and adjust styling
3. **Option C**: Replace with explicit className styling

**Recommendation**: **Option A** - Extend Badge to match full shadcn/ui spec.

---

## **4. SEMANTIC TOKENS vs. EXPLICIT DARK**

### **Current Pattern** (Most Components)
```tsx
<Card className="bg-card border-border">
  <div className="text-foreground">
    <p className="text-muted-foreground">
```

### **Dark Monochrome Pattern** (What We Need)
```tsx
<div className="bg-[#0c0c0c] border border-white/8">
  <div className="text-white">
    <p className="text-white/70">
```

### **Why This Matters**

Semantic tokens (`bg-card`, `text-foreground`) rely on Tailwind theme configuration. If theme is not explicitly set to dark monochrome, these will render as light theme.

**Question**: Is the Tailwind theme configured for dark monochrome globally?

**Action**: Verify `tailwind.config.ts` and check if:
- `darkMode` is enabled
- `background`, `card`, `foreground` colors match dark monochrome spec

---

## **5. CRITICAL GAPS & BLOCKERS**

### **P0 - Must Fix Before Launch**
1. **InlineToolMenu dark refactor** - Remove all color classes, use dark monochrome
2. **SpaceComposerWithTools dark refactor** - Dark background, white text, white send button
3. **Badge variant TypeScript errors** - Extend Badge or replace all "secondary"/"outline" usages
4. **Tool modal atom verification** - Ensure Input, Label, Textarea, Switch are dark

### **P1 - High Priority**
5. **SpaceToolsPanel dark refactor** - Sidebar widget needs explicit dark styling
6. **Verify semantic tokens resolve to dark** - Test all "MIXED" components in Storybook
7. **Fix hover states** - Ensure all hover effects use white/opacity, not primary colors

### **P2 - Nice to Have**
8. **Framer Motion verification** - Ensure motion components work with dark theme
9. **Accessibility check** - Verify contrast ratios on dark backgrounds
10. **Mobile responsive check** - Test tool selection on mobile viewports

---

## **6. IMPLEMENTATION PLAN**

### **Phase 1: Critical Path Dark Refactor** (Estimated: 2-3 hours)

**1.1 InlineToolMenu** (30 min)
- Remove tool color classes (blue-500, green-500, etc.)
- Replace all semantic tokens with explicit dark values
- Update hover states

**1.2 SpaceComposerWithTools** (45 min)
- Replace semantic tokens with dark monochrome
- Fix focus ring (white instead of primary)
- Update send button states
- Ensure slash command helper uses dark theme

**1.3 Badge Variant Fix** (30 min)
- Extend Badge component to support "secondary" and "outline"
- Or replace all usages with "default" + className overrides

**1.4 Tool Modal Atom Verification** (30 min)
- Read Input, Label, Textarea, Switch, Button components
- Verify all use dark monochrome
- Refactor if needed

---

### **Phase 2: Widget & Sidebar Dark Refactor** (Estimated: 1-2 hours)

**2.1 SpaceToolsPanel** (30 min)
- Replace Card semantic tokens with explicit dark
- Update tool grid button styling to match InlineToolMenu
- Fix leader badge styling

**2.2 Verify Sidebar Panels in Storybook** (30 min)
- SpaceAboutSection
- SpaceEventsPanel
- SpaceMembersPanel
- SpaceResourcesPanel
- Check if semantic tokens resolve to dark
- Refactor if light theme appears

---

### **Phase 3: Complete Integration Story** (Estimated: 1 hour)

**3.1 Create Comprehensive Storybook Story** (1 hour)
- File: `src/Features/03-Spaces/spaces-tools-complete-integration.stories.tsx`
- Show full SpaceLayout (60/40 split)
- Both inline and widget tool access paths
- All modals functional
- Dark monochrome throughout
- Interactive demo

---

### **Phase 4: QA & Polish** (Estimated: 1 hour)

**4.1 TypeScript Clean** (20 min)
- Run typecheck
- Verify 0 errors in vertical slice files

**4.2 Visual QA in Storybook** (20 min)
- Check all components on #000000 background
- Verify text hierarchy (white → white/70 → white/50)
- Test all interactive states

**4.3 Mobile Responsive Check** (20 min)
- Test composer on mobile (iOS Safari, Android Chrome)
- Verify tool menu appears above keyboard
- Check sidebar panels collapse correctly

---

## **7. VERIFICATION CHECKLIST**

Use this checklist during implementation:

### **Dark Monochrome Standards**
- [ ] All backgrounds: `bg-[#0c0c0c]` or `bg-[#000000]` (cards vs. page)
- [ ] All borders: `border-white/8` → `border-white/20` on hover
- [ ] Text hierarchy:
  - [ ] Primary: `text-white`
  - [ ] Secondary: `text-white/70`
  - [ ] Tertiary: `text-white/50`
- [ ] Gold accents only: `#FFD700` for save/leader/promoted states
- [ ] NO color classes: No `text-blue-500`, `bg-green-500`, etc.
- [ ] Focus rings: `ring-white/20` or `ring-[#FFD700]/50` (NOT primary)

### **Component-Specific Checks**
- [ ] InlineToolMenu: Dark background, emoji icons only, no color text
- [ ] SpaceComposerWithTools: Dark bg, white borders, white send button when active
- [ ] SpaceToolsPanel: Dark card, dark tool buttons matching inline menu
- [ ] Tool Modals: Dark Dialog, dark Input/Label/Textarea, white text
- [ ] Badge variants: No TypeScript errors, use gold variant for leaders

### **Interactive States**
- [ ] Hover: Slight white overlay (`hover:bg-white/10`)
- [ ] Active/Selected: White background or border (`bg-white`, `border-white`)
- [ ] Disabled: Reduced opacity (`bg-white/10`, `text-white/30`)
- [ ] Focus: White or gold ring (`ring-white/20`)

### **TypeScript**
- [ ] 0 errors in vertical slice files
- [ ] Badge variants work (secondary, outline, gold)
- [ ] All imports resolve

### **Storybook Verification**
- [ ] All components visible on #000000 background
- [ ] All stories have dark backgrounds
- [ ] Interactive demos work (click tool → modal → submit)
- [ ] Mobile responsive

---

## **8. NEXT STEPS**

1. **Read atom components** (Input, Label, Textarea, Switch, Button) to verify dark monochrome
2. **Fix Badge component** to support secondary/outline variants OR replace all usages
3. **Refactor InlineToolMenu** to dark monochrome (P0)
4. **Refactor SpaceComposerWithTools** to dark monochrome (P0)
5. **Verify tool modals** use dark atoms
6. **Refactor SpaceToolsPanel** to dark monochrome (P1)
7. **Test all "MIXED" components** in Storybook with dark backgrounds
8. **Create complete integration story** showing full vertical slice
9. **Run typecheck** and verify 0 errors
10. **Visual QA** on localhost:6006

---

## **9. QUESTIONS TO ANSWER**

1. **Is Tailwind configured for dark mode globally?**
   - Check `tailwind.config.ts` for `darkMode` setting
   - Verify `background`, `card`, `foreground` color values

2. **Do semantic tokens resolve to dark values automatically?**
   - Test in Storybook: Does `bg-card` render as `#0c0c0c`?
   - Or do we need explicit `bg-[#0c0c0c]` everywhere?

3. **Should we fix Badge component or replace usages?**
   - Option A: Add "secondary" and "outline" variants to Badge
   - Option B: Replace all with "default" + custom className

4. **Are the tool modals (Poll, Event, Task, Resource) meant to be customizable in HiveLab?**
   - YES - Per user: "modals are these tools that can be added onto/refined in hivelab"
   - Implication: These are base templates that can be extended

---

## **STATUS: READY FOR PHASE 1 IMPLEMENTATION**

All components exist and are functionally complete. The primary work is:
1. **Visual refactoring** (semantic tokens → explicit dark monochrome)
2. **TypeScript cleanup** (Badge variant issues)
3. **QA verification** (Storybook testing)

**Estimated Total Time**: 5-7 hours for complete vertical slice polish

---

**Next Action**: Start Phase 1.1 - Refactor InlineToolMenu to dark monochrome
