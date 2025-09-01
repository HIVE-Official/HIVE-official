# HIVE Design System - AI Foundation Guide

## Overview
The HIVE design system is a comprehensive, atomic design-based system built for the HIVE social utility platform for college campuses. It follows vibe-coded excellence with systematic rigor, emphasizing mobile-first design, social utility, and campus culture integration.

## System Architecture

### Package Structure
```
packages/
├── ui/                    # Main UI component library (@hive/ui)
│   ├── src/atomic/       # Atomic design components
│   │   ├── atoms/        # Basic building blocks
│   │   ├── molecules/    # Atom combinations
│   │   ├── organisms/    # Complex components
│   │   └── foundations/  # Design principles & standards
│   └── src/components/   # Legacy components (being migrated)
├── tokens/               # Design tokens (@hive/tokens)
├── core/                # Business logic & types (@hive/core)
└── config/              # Shared configurations
```

### Design Philosophy
**"Empowering Individual Agency Within Community"**

#### Core Pillars:
- **Student-First Minimalism**: Clean, uncluttered interfaces that work while walking to class
- **Customization Without Chaos**: User control within consistent patterns
- **Privacy Through Clarity**: Transparent privacy controls
- **Mobile-Native Thinking**: Touch-first, thumb-friendly design
- **Progressive Disclosure**: Information revealed as needed

## Atomic Design Implementation

### 1. Design Tokens (@hive/tokens)
**Location**: `packages/tokens/src/`

#### Color System
- **Primary Brand**: Gold (`--hive-brand-secondary`) - used strategically for CTAs, focus states
- **Semantic Colors**: `--hive-text-primary`, `--hive-background-secondary`, etc.
- **Campus Colors**: Emerald, Ruby, Sapphire for different content types
- **Interactive States**: Hover, active, focus variants with color-mix() functions

#### Typography
- **Primary Font**: Space Grotesk (display) 
- **Body Font**: System font stack for performance
- **Hierarchy**: 6 levels from headline to caption
- **Mobile-optimized sizes**: Larger touch targets, readable at arm's length

#### Spacing & Layout
- **8px base grid**: All spacing uses 8px multiples
- **Container widths**: Mobile-first responsive containers
- **Layout utilities**: Consistent margins, padding, gaps

### 2. Atoms (@hive/ui/atomic/atoms)
**Enhanced components** are the primary atoms - always use these over legacy versions.

#### Key Atoms:
- `button-enhanced.tsx` - Gold outline primary buttons, semantic variants
- `input-enhanced.tsx` - Form inputs with HIVE styling
- `select-enhanced.tsx` - Dropdown selects with Radix UI base
- `textarea-enhanced.tsx` - Multi-line text inputs
- `checkbox-enhanced.tsx` - Campus-styled checkboxes
- `profile-avatar.tsx` - User avatars with status indicators
- `profile-badge.tsx` - Role/status badges
- `platform-icons.tsx` - Social platform icons

#### Design Consistency Features:
- **Color System Integration**: All use `hiveColors` from `color-system.ts`
- **Variant System**: Consistent `variant` and `size` props across components
- **Focus States**: Gold ring focus indicators
- **Mobile Touch**: 44px minimum touch targets
- **Loading States**: Built-in skeleton/loading patterns

### 3. Molecules (@hive/ui/atomic/molecules)
Combinations of atoms for specific use cases.

#### Key Molecules:
- `form-field.tsx` - Label + Input + Error handling
- `search-bar.tsx` - Search input with suggestions
- `user-card.tsx` - User display with avatar + info
- `campus-identity-header.tsx` - Campus branding component
- `ritual-action-button.tsx` - Social action buttons
- `navigation-variants.tsx` - Different nav patterns

### 4. Organisms (@hive/ui/atomic/organisms)
Complex components combining molecules and atoms.

#### Profile System:
- `profile-dashboard.tsx` - Main profile layout
- `profile-avatar-widget.tsx` - Avatar management
- `profile-calendar-widget.tsx` - Calendar integration
- `profile-stats-widget.tsx` - User statistics

#### Spaces System:
- `space-dashboard.tsx` - Space management interface
- `space-explore-hub.tsx` - Space discovery
- `space-member-directory.tsx` - Member listing

#### Tools System:
- `tool-library-modal.tsx` - Tool browsing
- `tool-configuration-panel.tsx` - Tool settings

## Component Usage Patterns

### Import Strategy
```typescript
// Primary imports - use these
import { 
  ButtonEnhanced, 
  InputEnhanced, 
  ProfileAvatarWidget 
} from '@hive/ui';

// Legacy imports - being phased out
import { Button, Input } from '@hive/ui/components';
```

### Styling Approach
- **CSS Variables**: All styling uses semantic CSS variables
- **Tailwind Classes**: Utility-first approach with design tokens
- **No Hardcoded Values**: All colors, spacing use token system
- **Mobile-First**: All components start mobile, enhance for desktop

### Example Component Structure
```typescript
// Enhanced Button Pattern
const buttonVariants = cva(
  // Base styles using semantic tokens only
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        primary: [
          "border-2 border-[var(--hive-brand-secondary)]",
          "bg-transparent",
          "text-[var(--hive-brand-secondary)]",
          "hover:bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]"
        ]
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base"
      }
    }
  }
);
```

## Campus-Specific Considerations

### University of Buffalo (vBETA)
- **Email Validation**: Only @buffalo.edu emails
- **Campus Context**: UB-specific locations, buildings, culture
- **Local Integration**: Buffalo area awareness
- **Academic Calendar**: Semester system considerations

### Social Utility Focus
- **Discovery Over Entertainment**: Features that help students find relevant people/content
- **Coordination Tools**: Group scheduling, resource sharing
- **Privacy Controls**: Granular visibility settings
- **Social Proof**: Activity indicators, member counts

## Development Standards

### Quality Gates
1. **TypeScript Compliance**: Strict mode, no any types
2. **Mobile Testing**: All components work on phones
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Performance**: Lighthouse scores > 90
5. **Design System Compliance**: Uses tokens, follows patterns

### AI Development Guidelines
When working with HIVE components:

1. **Always Use Enhanced Components**: Prefer `*-enhanced.tsx` versions
2. **Follow Token System**: Never hardcode colors, spacing, typography
3. **Mobile-First**: Design for phones, enhance for desktop
4. **Campus Context**: Consider college student use cases
5. **Social Utility**: Every feature should serve both social and practical needs
6. **Vibe-Coded Excellence**: Trust intuition while maintaining systematic approach

### Component Creation Checklist
- [ ] Uses design tokens for all styling
- [ ] Follows atomic design hierarchy
- [ ] Includes mobile-responsive design
- [ ] Has proper TypeScript types
- [ ] Includes Storybook story
- [ ] Passes accessibility audit
- [ ] Works with campus context

## Storybook Documentation
Comprehensive component documentation available at:
- **Foundation Stories**: Color, typography, spacing systems
- **Atom Stories**: Individual component examples
- **Molecule Stories**: Combined component patterns
- **Organism Stories**: Complex system examples
- **Campus Stories**: UB-specific use cases

## Future Considerations
- **Multi-Campus Expansion**: Design system prepared for other universities
- **Progressive Enhancement**: Features that work without JavaScript
- **Offline Capabilities**: Components that gracefully handle connectivity issues
- **Accessibility Improvements**: Enhanced screen reader support
- **Performance Optimization**: Continued bundle size optimization

This foundation provides AI systems with the context needed to understand, extend, and maintain the HIVE design system while preserving its principles and ensuring consistent user experiences across the platform.