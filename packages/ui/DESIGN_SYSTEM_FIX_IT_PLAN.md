# 🔧 HIVE Design System Fix-It Plan

**Status**: Ready to Execute  
**Timeline**: 7-8 days  
**Priority**: Before Production Launch

---

## 📋 CRITICAL PATH (Must Fix Before Launch)

### Task 1: Consolidate Components (2-3 days)

**Problem**: Components duplicated in `atoms/`, `molecules/`, and `components/ui/`

**Action Items**:

- [ ] **Audit all duplicates**:

  ```bash
  # Generate list of duplicates
  find packages/ui/src -name "*.tsx" | sort | uniq -d > duplicates.txt
  ```

- [ ] **Choose the canonical version** for each component:

  - ✅ **Keep**: `components/ui/*` (shadcn-based, most complete)
  - ❌ **Delete**: Duplicate versions in `atoms/`
  - ✅ **Keep**: Custom molecules/organisms without shadcn equivalents

- [ ] **Create import aliases** (if needed for backward compat):

  ```typescript
  // atoms/button.tsx (deprecated, re-export only)
  export { Button } from "../components/ui/button";
  ```

- [ ] **Update all internal imports**:

  ```bash
  # Find all imports
  rg "from ['\"]@/atoms/(button|input|avatar)" -t ts -t tsx

  # Replace with canonical paths
  # (Manual or scripted based on scope)
  ```

- [ ] **Test thoroughly**:
  - [ ] Run type check: `pnpm typecheck`
  - [ ] Run tests: `pnpm test`
  - [ ] Visual regression in Storybook
  - [ ] Check apps/web for breaks

**Success Criteria**: Zero duplicate components, all imports point to canonical versions

---

### Task 2: Fix Tokens Package (1 day)

**Problem**: `packages/tokens/README.md` says "Placeholder module to be rebuilt"

**Action Items**:

- [ ] **Update README** with actual documentation:

  ```markdown
  # @hive/tokens - Design Token System

  Provides design tokens (colors, spacing, typography, motion)
  for the HIVE platform.

  ## Installation

  \`\`\`bash
  pnpm add @hive/tokens
  \`\`\`

  ## Usage

  \`\`\`typescript
  import { colors, spacing } from '@hive/tokens';
  \`\`\`
  ```

- [ ] **Export tokens from package root**:

  ```typescript
  // packages/tokens/src/index.ts
  export * from "./colors";
  export * from "./spacing";
  export * from "./typography";
  export * from "./motion";
  ```

- [ ] **Document token sources**:
  - CSS: `packages/ui/src/styles/tokens.css`
  - Tailwind: `packages/tokens/tailwind.config.ts`
  - TypeScript: `packages/tokens/src/index.ts`
- [ ] **Add package.json exports**:
  ```json
  {
    "exports": {
      ".": "./src/index.ts",
      "./tailwind": "./tailwind.config.ts",
      "./css": "./src/styles/tokens.css"
    }
  }
  ```

**Success Criteria**: `@hive/tokens` is importable, README is accurate

---

### Task 3: Delete Old Versions (4 hours)

**Problem**: V1, V2, V5 versions coexist with conflicting docs

**Action Items**:

- [ ] **Find all versioned files**:

  ```bash
  find packages/ui/src -name "*-v1.tsx" -o -name "*-v2.tsx"
  ```

- [ ] **Delete deprecated versions**:

  - [ ] `space-layout.tsx` (V1) → DELETE
  - [ ] Keep `space-layout-v2.tsx` but rename to `space-layout.tsx`
  - [ ] Archive old docs to `_archive/` folder

- [ ] **Consolidate architecture docs**:

  - [ ] Merge `SPACES_ARCHITECTURE_V5.md`, `V4_TO_V5_PIVOT.md`, etc.
  - [ ] Create ONE `SPACES_ARCHITECTURE.md`
  - [ ] Move old versions to `_archive/`

- [ ] **Update all imports**:

  ```bash
  # Find imports of old versions
  rg "space-layout-v2" -t ts -t tsx

  # Replace with canonical name
  ```

- [ ] **Add deprecation policy** to README:
  ```markdown
  ## Version Policy

  - Components are NOT individually versioned
  - Use package semver: `@hive/ui@1.2.3`
  - Deprecated code is DELETED, not kept in repo
  ```

**Success Criteria**: No files with version suffixes, ONE architecture doc per domain

---

### Task 4: Standardize Naming (1 day)

**Problem**: "Rail" vs "Dock" vs "Sidebar" confusion

**Action Items**:

- [ ] **Create vocabulary glossary**:

  ```markdown
  ## Vocabulary

  - **Sidebar**: Left navigation (main app nav)
  - **Dock**: Right context panel (Spaces feature only)
  - **Rail**: DEPRECATED - use Sidebar or Dock instead
  ```

- [ ] **Global rename** (right-side components only):

  ```bash
  # Find all "rail" references related to right side
  rg -i "rail" packages/ui/src/organisms/spaces/

  # Rename files
  mv context-rail-preview.tsx dock-preview.tsx
  mv condensed-rail.tsx dock-condensed.tsx

  # Update internal code
  # (Use IDE refactor or careful find/replace)
  ```

- [ ] **Keep "rail" for left sidebar** (already correct usage):

  - `app-sidebar-rail.tsx` → Keep as is (this is correct)

- [ ] **Update all docs**:
  - [ ] README.md
  - [ ] UI_GUIDELINES.md
  - [ ] Component JSDocs
  - [ ] Storybook stories

**Success Criteria**: Consistent terminology, glossary published

---

### Task 5: Fix Brand Alignment (2-3 days)

**Problem**: BRAND_AUDIT_CURRENT_STATE.md lists P0 issues, none fixed

**Action Items**:

- [ ] **Remove glass effects**:

  ```bash
  # Find all surface-glass usage
  rg "surface-glass" -t tsx

  # Replace with solid backgrounds
  # surface-glass → bg-background border-b border-border/20
  ```

- [ ] **Add gold to headings**:

  ```tsx
  // Before
  <h1 className="text-h3 font-h3">{space.name}</h1>

  // After
  <h1 className="text-h3 font-h3 text-primary">{space.name}</h1>
  ```

- [ ] **Add gold to section headers**:

  ```tsx
  // Before
  <span className="text-caption font-semibold">NEXT EVENT</span>

  // After
  <span className="text-caption font-semibold text-primary">NEXT EVENT</span>
  ```

- [ ] **Add gold borders to cards**:

  ```tsx
  // Before
  <Card className="bg-card border-border">

  // After
  <Card className="bg-card border border-primary/10 hover:border-primary/30">
  ```

- [ ] **Add gold glow on hover**:

  ```tsx
  className = "hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]";
  ```

- [ ] **Update CTAs with gold gradient**:

  ```tsx
  <Button className="bg-gradient-to-r from-primary to-primary/90 text-black">
    Join Space
  </Button>
  ```

- [ ] **Check all boxes** in BRAND_AUDIT_CURRENT_STATE.md

**Success Criteria**: All P0 brand issues resolved, checkboxes checked

---

## 📈 SECONDARY TASKS (Ship Later)

### Task 6: Organize Component Exports (2 hours)

**Action Items**:

- [ ] Rewrite `index.ts` with clear sections
- [ ] Add comments for each category
- [ ] Group by feature domain
- [ ] Alphabetize within groups

---

### Task 7: Add Motion Utilities (1 day)

**Action Items**:

- [ ] Create Tailwind classes for motion tokens:

  ```javascript
  // tailwind.config.ts
  theme: {
    extend: {
      transitionDuration: {
        'swift': 'var(--motion-swift)',
        'smooth': 'var(--motion-smooth)',
        'rapid': 'var(--motion-rapid)',
      }
    }
  }
  ```

- [ ] Add ESLint rule to prevent arbitrary durations:
  ```json
  {
    "rules": {
      "tailwindcss/no-custom-classname": [
        "error",
        {
          "whitelist": ["duration-swift", "duration-smooth", "duration-rapid"]
        }
      ]
    }
  }
  ```

---

### Task 8: Create Storybook Index (4 hours)

**Action Items**:

- [ ] Create `stories/00-Welcome.mdx`
- [ ] Create `stories/01-Getting-Started.mdx`
- [ ] Create `stories/02-Component-Catalog.mdx`
- [ ] Add tags to stories: `["foundational"]`, `["experimental"]`
- [ ] Configure sidebar sorting

---

### Task 9: Document shadcn Customization (1 day)

**Action Items**:

- [ ] Create `docs/SHADCN_CUSTOMIZATION_GUIDE.md`
- [ ] Document all changes made to shadcn components
- [ ] Create before/after examples
- [ ] Document update process
- [ ] Track shadcn version

---

### Task 10: Add Accessibility Tests (2-3 days)

**Action Items**:

- [ ] Set up `@axe-core/playwright`
- [ ] Add a11y tests to Storybook
- [ ] Test keyboard navigation
- [ ] Verify touch target sizes
- [ ] Run with screen reader

---

## 📅 SPRINT PLAN

### Week 1: Foundation Fixes

- **Mon-Tue**: Task 1 (Consolidate Components)
- **Wed**: Task 2 (Fix Tokens)
- **Thu**: Task 3 (Delete Versions) + Task 4 (Naming)
- **Fri**: Task 5 Start (Brand Alignment)

### Week 2: Brand & Polish

- **Mon-Wed**: Task 5 Complete (Brand Alignment)
- **Thu**: Task 6 (Exports) + Task 7 (Motion)
- **Fri**: Task 8 (Storybook) + Testing

---

## ✅ DEFINITION OF DONE

A task is complete when:

- [ ] Code changes committed
- [ ] Tests pass (`pnpm test`, `pnpm typecheck`)
- [ ] Storybook builds without errors
- [ ] No linter warnings introduced
- [ ] Documentation updated
- [ ] Peer review completed (if team size > 1)

---

## 🚨 ROLLBACK PLAN

If something breaks during consolidation:

1. **Git Safety**:

   ```bash
   git checkout -b design-system-consolidation
   git commit -m "Save point before component merge"
   ```

2. **Component Aliases** (temporary):

   ```typescript
   // Keep old imports working temporarily
   export { Button as OldButton } from "@/components/ui/button";
   ```

3. **Feature Flags**:
   ```typescript
   const USE_NEW_COMPONENTS = process.env.NEXT_PUBLIC_NEW_COMPONENTS === "true";
   ```

---

## 📊 SUCCESS METRICS

Before consolidation:

- **Duplicate Components**: 15+
- **Import Paths**: 3+ options per component
- **Unchecked Brand Issues**: 12
- **Deprecated Files**: 5+
- **Version Docs**: 5+

After consolidation:

- **Duplicate Components**: 0
- **Import Paths**: 1 per component
- **Unchecked Brand Issues**: 0
- **Deprecated Files**: 0
- **Version Docs**: 1 per domain

---

## 🎯 COMMUNICATION PLAN

### For Team Members:

> "We're consolidating the design system this week. Expect some import path changes. Check Slack for updates."

### For Stakeholders:

> "Taking a week to clean up technical debt in the design system before launch. Will improve developer velocity and reduce bugs."

### For Users (Internal Devs):

> "Design system imports are changing. Migration guide: [link]. Questions? Ask in #design-system."

---

**Ready to start? Pick Task 1 and let's go.** 🚀
