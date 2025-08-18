# Storybook Cleanup Plan

## Current State: CHAOS
- 100+ story files across 15+ directories
- Massive redundancy and duplication
- Many broken/outdated components
- No clear organization

## Goal: CLEAN & FOCUSED
Simple structure following atomic design with only working components

## New Structure

```
stories/
├── 00-overview/
│   └── design-system.stories.tsx          # System overview
├── 01-foundation/
│   └── hive-foundation.stories.tsx        # ✅ DONE - Colors, typography, logos, icons
├── 02-atoms/
│   ├── button.stories.tsx                 # Working button system
│   ├── input.stories.tsx                  # Working input system  
│   ├── typography.stories.tsx             # Working typography
│   └── [other-working-atoms]
├── 03-molecules/
│   └── [simple-combinations]
├── 04-organisms/
│   └── [complex-components]
└── 05-examples/
    └── platform-examples.stories.tsx      # Real platform usage
```

## Cleanup Actions

### 1. REMOVE (90% of current files)
- All duplicate stories
- All broken/incomplete components
- All experimental/test files
- All redundant organization attempts

### 2. KEEP (10% - working components only)
- 01-foundation/hive-foundation.stories.tsx ✅
- Working button stories
- Working input stories
- Working typography stories

### 3. REORGANIZE
- Atomic design structure
- Clear naming convention
- Semantic organization

## Implementation Strategy
1. Create clean new structure
2. Move only working stories
3. Delete everything else
4. Validate in Storybook
5. Document the clean system