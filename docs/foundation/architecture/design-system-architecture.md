# HIVE Design System Architecture

## Overview
HIVE employs a sophisticated three-layer design architecture built on atomic design principles with an intentional "Dorm Room Startup" aesthetic that resonates with student culture.

## Architecture Layers

### 1. Foundation Layer (@hive/tokens)
**Purpose**: Define the visual language through design tokens

#### Color System
```css
/* Brand Palette */
--hive-gold: #FFD700        /* Primary brand */
--hive-gold-warm: #FFE55C   /* Friendlier variant */
--hive-gold-neon: #FFFF00   /* Electric accent */

/* Neutral Scale (11 shades) */
--hive-void: #000000
--hive-obsidian: #0A0A0B
--hive-charcoal: #111113
... through to ...
--hive-platinum: #E5E5E7

/* Semantic Colors */
--hive-success: #10B981 (Emerald)
--hive-error: #EF4444 (Ruby)
--hive-warning: #F59E0B (Citrine)
--hive-info: #3B82F6 (Sapphire)

/* Community Colors (Discord-inspired) */
--hive-discord: #5865F2
--hive-success-vibrant: #57F287
--hive-alert-vibrant: #FEE75C
```

#### Typography System
```css
/* Font Families */
--font-display: 'Clash Display', 'Space Grotesk'
--font-body: 'Inter', system-ui
--font-mono: 'JetBrains Mono'

/* Type Scale */
--hive-font-size-2xl: 4.5rem    /* Hero text */
--hive-font-size-xl: 3.75rem    /* Page titles */
--hive-font-size-lg: 3rem       /* Section headers */
... down to ...
--hive-font-size-2xs: 0.625rem  /* Micro text */

/* Dynamic Sizing */
--text-hero: clamp(2.5rem, 8vw, 5rem)
--text-title: clamp(1.5rem, 4vw, 2.5rem)
```

#### Spacing System
- 8px grid-based rhythm
- Consistent spacing tokens from 2px to 128px
- Responsive spacing with viewport units

### 2. Component Layer (@hive/ui)
**Purpose**: Build reusable UI components following atomic design

#### Atomic Structure

##### Atoms (29 components)
Fundamental UI building blocks:
```typescript
// Core UI Elements
- button, input, label, badge, avatar
- card, dialog, checkbox, radio
- select, textarea, toggle, separator

// HIVE-Branded Elements
- hive-button (gold accent states)
- hive-card (glassmorphic effects)
- hive-modal (branded dialogs)
- hive-logo (animated logo)
- hive-progress (gold progress bars)

// Enhanced Elements
- input-enhanced (with validation)
- textarea-enhanced (auto-resize)
- checkbox-enhanced (animated states)
```

##### Molecules (3 components)
Composed atomic elements:
```typescript
- form-field (label + input + error)
- page-container (responsive wrapper)
- [MISSING: More compositions needed]
```

##### Organisms (9 components)
Complex, self-contained sections:
```typescript
// Navigation System
- responsive-navigation (adapts to device)
- desktop-nav, tablet-nav, mobile-nav

// Profile System
- profile-bento-grid (dashboard layout)
- complete-hive-profile-system

// Tools System
- complete-hive-tools-system

// Onboarding
- welcome-mat (first-time experience)

// [MISSING: Feed, Space, Ritual organisms]
```

##### Templates (Empty - Opportunity)
Page-level layouts to be developed

##### Pages (Empty - Opportunity)
Complete page examples to be created

### 3. Visual Language Layer
**Purpose**: Define the "Dorm Room Startup" aesthetic

#### Design Philosophy
**Not polished Silicon Valley, but authentic student-built**

##### Inspiration Sources
- **Discord**: Dark theme, vibrant accents, community feel
- **BeReal**: Authentic, time-sensitive, unfiltered
- **Notion**: Powerful but approachable
- **TikTok**: Instant, swipeable, addictive
- **Spotify**: Smooth animations, personalized

#### Interaction Patterns

##### Card Interactions (Discord-style)
```
Normal → Hover → Active
- Lift: translateY(-2px)
- Glow: box-shadow with gold
- Tilt: slight rotation
- Scale: 1.02 on hover
```

##### Button States (Satisfying feedback)
```
[Join Space] → [Joining...] → [✓ Joined!]
- Static: Gold border
- Loading: Pulse animation
- Success: Bounce + color change
```

##### Layout Philosophy
**Asymmetric and Alive** - Not centered grids
```
Desktop Layout:
┌────────┬─────────────────────┐
│ Quick  │ FEED (Offset left)   │
│ Jump   │ Large + Small Cards  │
│ Nav    │ Floating Widgets     │
└────────┴─────────────────────┘
```

## Presentation System

### Current State
- **Storybook**: Configured but empty
- **Documentation**: No component docs
- **Examples**: No usage examples
- **Testing**: No visual regression

### Storybook Structure (Planned)
```
/src/stories/
├── 00-System-Overview/      # Platform intro
├── 01-Foundation/           # Tokens, colors, type
├── 02-Atoms/               # Basic components
├── 03-Molecules/           # Compositions
├── 04-Organisms/           # Complex sections
├── 07-Complete-Systems/    # Full features
├── 10-Feature-Slices/      # Vertical slices
├── 20-Platform-Experiences/ # User journeys
└── 30-Development/         # Guidelines
```

## Design System Maturity

### Strengths ✅
1. **Comprehensive token system** - Full design foundation
2. **Atomic architecture** - Clear component hierarchy
3. **Brand identity** - Unique "Dorm Room Startup" aesthetic
4. **Responsive system** - Mobile-first approach
5. **HIVE-branded components** - Custom gold-accented elements

### Gaps to Address ❌

#### Component Coverage
- Missing molecules for common patterns
- Need more organisms (SpaceCard, FeedItem, RitualCard)
- No template/page examples

#### Documentation
- No Storybook stories
- Missing prop documentation
- No usage guidelines
- No accessibility docs

#### Design Patterns
- Loading states inconsistent
- Error boundaries not standardized
- Empty states not designed
- Animation library missing

#### Presentation Layer
- Storybook not populated
- No component playground
- No visual regression testing
- No design handoff tools

## Recommended Next Steps

### Phase 1: Documentation Sprint
1. Create Storybook stories for all atoms
2. Document component props and usage
3. Add interaction examples
4. Create accessibility guidelines

### Phase 2: Component Expansion
1. Build missing molecules:
   - search-bar
   - notification-card
   - stat-card
   - user-avatar-group
2. Create key organisms:
   - space-card
   - feed-item
   - ritual-progress
   - tool-card

### Phase 3: Presentation System
1. Populate Storybook with all components
2. Create design system documentation site
3. Implement visual regression testing
4. Build component playground

### Phase 4: Animation & Polish
1. Create animation library
2. Standardize transitions
3. Build loading state system
4. Polish interaction feedback

## Design Principles

### 1. Student-First
Every design decision filtered through "would a student at 2AM understand this?"

### 2. Purposeful Imperfection
Not trying to be Apple - embracing the "built in a dorm" aesthetic

### 3. Community Over Corporate
Discord/Reddit vibes over LinkedIn/Facebook polish

### 4. Speed Over Perfection
Fast interactions, instant feedback, no waiting

### 5. Dark by Default
Students code at night - respect their retinas

## Component Development Guidelines

### Creating New Components
```typescript
// 1. Define in appropriate atomic level
// 2. Use design tokens exclusively
// 3. Include HIVE-specific variants
// 4. Build mobile-first
// 5. Add loading/error states

// Example structure:
interface ComponentProps {
  variant?: 'default' | 'hive' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  error?: boolean
}
```

### Naming Conventions
- **Atoms**: Simple nouns (button, card, input)
- **Molecules**: Descriptive compounds (form-field, search-bar)
- **Organisms**: Feature-specific (space-card, profile-header)
- **HIVE variants**: Prefix with 'hive-' (hive-button, hive-modal)

### State Management
- Use React hooks for local state
- Zustand for global UI state
- Firebase for data state
- CSS for visual states (hover, focus)

## Accessibility Standards
- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactions
- Screen reader friendly components
- Color contrast ratios maintained
- Focus indicators always visible

## Performance Guidelines
- Components lazy-loaded by default
- Images use Next.js optimization
- Animations use CSS transforms only
- Bundle size monitored per component
- Mobile performance prioritized

---

*The HIVE Design System: Where student authenticity meets functional beauty.*