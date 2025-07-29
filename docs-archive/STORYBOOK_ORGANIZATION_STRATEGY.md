# HIVE Storybook Organization Strategy

## Current Problem
- 156+ story files scattered across 32+ directories
- Massive redundancy and duplication
- Broken/incomplete components mixed with working ones
- No clear navigation or hierarchy

## Target Structure (Atomic Design + HIVE Platform)

```
stories/
├── 00-foundation/
│   ├── design-system-overview.stories.tsx    # Welcome & philosophy
│   ├── colors.stories.tsx                    # Color system showcase
│   ├── typography.stories.tsx                # Typography hierarchy  
│   ├── spacing.stories.tsx                   # Spacing tokens
│   └── icons.stories.tsx                     # Icon system
├── 01-atoms/
│   ├── buttons.stories.tsx                   # All button variants
│   ├── inputs.stories.tsx                    # All input types
│   ├── text.stories.tsx                      # Typography components
│   └── feedback.stories.tsx                  # Spinners, progress, etc.
├── 02-molecules/
│   ├── forms.stories.tsx                     # Form patterns
│   ├── cards.stories.tsx                     # Card variations
│   ├── navigation.stories.tsx                # Nav molecules
│   └── data-display.stories.tsx              # Tables, lists, etc.
├── 03-organisms/
│   ├── headers.stories.tsx                   # Page headers
│   ├── navigation-bars.stories.tsx           # Main navigation
│   ├── content-sections.stories.tsx          # Complex layouts
│   └── modals.stories.tsx                    # Modal patterns
├── 04-templates/
│   ├── page-layouts.stories.tsx              # Page templates
│   ├── dashboard-layouts.stories.tsx         # Dashboard patterns
│   └── auth-layouts.stories.tsx              # Authentication flows
└── 05-platform/
    ├── spaces.stories.tsx                    # Space-specific components
    ├── tools.stories.tsx                     # Tool builder components
    ├── profiles.stories.tsx                  # Profile components
    └── university.stories.tsx                # University context
```

## Organization Principles

1. **Atomic Design Hierarchy**: Clear progression from atoms → molecules → organisms → templates
2. **Platform Context**: University-specific components grouped logically
3. **Working Components Only**: Remove broken/incomplete stories
4. **Zero Redundancy**: One story per component pattern
5. **Easy Navigation**: Clear naming and logical grouping

## Implementation Plan

1. **Audit Phase**: Identify working vs broken components
2. **Consolidation Phase**: Merge duplicate stories
3. **Reorganization Phase**: Move to new structure
4. **Cleanup Phase**: Remove redundant files
5. **Enhancement Phase**: Improve remaining stories

## Success Metrics

- Reduce from 156+ → ~25 focused stories
- Clear atomic design progression
- Fast Storybook startup and navigation
- Zero broken components
- Enhanced color system documentation