# HIVE Presentation Layer Specification

## Overview
This document defines the complete presentation layer architecture for HIVE - establishing flawless UI/UX scaffolding with consistent brand elements across the entire platform.

## Table of Contents
1. [Foundation Scaffolding](#foundation-scaffolding)
2. [Layout Systems](#layout-systems)
3. [Interaction Patterns](#interaction-patterns)
4. [State Management](#state-management)
5. [Brand Consistency](#brand-consistency)
6. [Component Architecture](#component-architecture)
7. [Implementation Checklist](#implementation-checklist)

---

## Foundation Scaffolding

### Core Scaffold Components Required

#### 1. LoadingScaffold
**Purpose**: Unified loading states across all pages

**Requirements**:
- **Skeleton Screens**: Content-aware loading placeholders that mirror actual layout
- **Progressive Loading**: Staged content reveal (header → nav → content)
- **Animation Timing**: 300ms fade-in, 150ms skeleton pulse
- **Responsive Behavior**: Adaptive skeleton layouts for mobile/desktop
- **Loading Messages**: HIVE-toned loading text ("Powering up your dashboard...")
- **Timeout Handling**: Graceful fallback after 10s timeout
- **Accessibility**: Screen reader announcements, loading indicators

**Variants Required**:
- `PageLoadingScaffold`: Full page loading with header/nav skeletons
- `SectionLoadingScaffold`: Component-level loading states
- `DataLoadingScaffold`: Table/list loading with row skeletons
- `FormLoadingScaffold`: Form submission loading states

**Current Gap**: Dashboard uses basic spinner (line 17), inconsistent across pages
**Priority**: Critical

#### 2. EmptyState
**Purpose**: Consistent no-data presentations

**Requirements**:
- **Visual Hierarchy**: Icon/illustration + heading + description + CTA
- **Contextual Messaging**: Different messages per content type
- **Actionable CTAs**: Primary action to resolve empty state
- **Responsive Layout**: Mobile-optimized empty state presentation
- **Accessibility**: Proper heading structure, alt text
- **Animation**: Subtle entrance animations (fade-up)

**Empty State Types**:
- `NoDataEmpty`: First-time user, no content created yet
- `NoResultsEmpty`: Search/filter returned no results
- `ErrorEmpty`: Error state with retry options
- `PermissionEmpty`: Access restricted content
- `MaintenanceEmpty`: Feature temporarily unavailable

**Visual Elements**:
- HIVE gold accent illustrations
- Consistent icon set (Lucide icons)
- Typography hierarchy (h2 + body text)
- CTA button styling matching HIVE patterns

**Current Gap**: No standardized empty states across platform
**Priority**: High

#### 3. ErrorBoundary
**Purpose**: Graceful error handling throughout app

**Requirements**:
- **Error Classification**: Network, validation, permission, critical system errors
- **Recovery Actions**: Retry, refresh, navigate back, contact support
- **Error Logging**: Structured error data with user context
- **Fallback UI**: Maintains HIVE branding during error states
- **User Communication**: Clear, non-technical error messages
- **Progressive Degradation**: Fallback to minimal functionality when possible

**Error Boundary Levels**:
- `AppErrorBoundary`: Root-level application errors
- `PageErrorBoundary`: Page-specific error handling
- `ComponentErrorBoundary`: Individual component failures
- `FormErrorBoundary`: Form submission and validation errors

**Error UI Components**:
- Error illustration (broken HIVE hexagon concept)
- Error code display (for technical support)
- Action buttons (retry, go home, report)
- Contact information integration

**Current Gap**: Using browser alerts for errors (settings page lines 27, 58, 69)
**Priority**: Critical

#### 4. PageTransition
**Purpose**: Smooth navigation between pages

**Requirements**:
- **Transition Types**: Fade, slide, scale transitions based on navigation context
- **Timing Standards**: 200ms page exit, 300ms page enter
- **Loading Integration**: Transition + loading state coordination
- **Navigation Context**: Different transitions for forward/back/lateral navigation
- **Performance**: GPU-accelerated transitions, 60fps target
- **Accessibility**: Respects prefers-reduced-motion

**Transition Patterns**:
- `FadeTransition`: Default page transitions
- `SlideTransition`: Forward/back navigation in flows
- `ScaleTransition`: Modal/overlay presentations
- `NoTransition`: Instant transitions for accessibility

**Motion Specifications**:
- Easing: Custom HIVE easing curves (ease-out dominant)
- Transform origins: Based on user interaction point
- Z-index management: Proper layer stacking during transitions
- Fallback: Instant transitions for slow devices

**Current Gap**: Jarring page transitions, no unified navigation experience
**Priority**: Medium

#### 5. FeedbackSystem
**Purpose**: Unified user feedback across all interactions

**Requirements**:
- **Toast Notifications**: Success, error, warning, info variants
- **Inline Feedback**: Form validation, loading states
- **Modal Confirmations**: Destructive actions, important changes
- **Progress Indicators**: Multi-step processes, file uploads
- **Haptic Feedback**: Mobile device vibration patterns (if supported)

**Toast Specifications**:
- Position: Top-right for desktop, top-center for mobile
- Duration: 4s success/info, 6s warning, persistent error
- Actions: Dismiss, undo (where applicable)
- Stacking: Max 3 toasts, auto-dismiss oldest
- Animation: Slide-in from right, fade-out

**Inline Feedback Patterns**:
- Field validation: Real-time + on-blur validation
- Loading buttons: Spinner + disabled state
- Form-level messages: Success/error summaries
- Progress bars: Linear progress with percentage

**Current Gap**: Inconsistent feedback patterns, browser alerts for errors
**Priority**: Critical

---

## Layout Systems

### Responsive Grid Foundation

#### 1. StandardPageLayout
**Purpose**: Consistent page container and spacing across all pages

**Requirements**:
- **Container Widths**: Mobile (100%), Tablet (768px), Desktop (1024px), Wide (1280px)
- **Margin System**: Auto-centered with responsive side margins
- **Vertical Spacing**: Consistent section gaps (32px mobile, 48px desktop)
- **Header Integration**: Proper spacing below navigation header
- **Footer Placement**: Consistent footer positioning and spacing
- **Scroll Behavior**: Smooth scrolling, proper scroll restoration

**Layout Specifications**:
- **Page Container**: max-width responsive with auto margins
- **Content Sections**: Consistent vertical rhythm (48px gaps)
- **Side Margins**: 16px mobile, 24px tablet, auto desktop
- **Reading Width**: Content max-width 65ch for text-heavy pages
- **Grid Alignment**: All content aligns to consistent grid system

**Responsive Breakpoints**:
```
Mobile: 320px - 767px
Tablet: 768px - 1023px  
Desktop: 1024px - 1279px
Wide: 1280px+
```

**Current Issues**: Dashboard (line 38), Settings (line 84), Resources (line 14) each handle margins/padding differently
**Priority**: High

#### 2. CardGrid
**Purpose**: Responsive card layouts with consistent behavior

**Requirements**:
- **Grid Patterns**: 1-col mobile, 2-col tablet, 3-col desktop, 4-col wide
- **Gap Spacing**: 16px mobile, 20px tablet, 24px desktop
- **Card Sizing**: Consistent aspect ratios per card type
- **Loading States**: Skeleton cards matching grid layout
- **Empty States**: Proper empty grid presentations
- **Progressive Enhancement**: Graceful degradation for slow connections

**Card Grid Variants**:
- `ActionCardGrid`: Large feature cards (dashboard quick actions)
- `StatCardGrid`: Data/metric cards with consistent sizing
- `ContentCardGrid`: Article/resource cards with thumbnails
- `CompactCardGrid`: Dense information cards (settings options)

**Responsive Behavior**:
- **Mobile**: Single column, full-width cards
- **Tablet**: 2-column grid with proper gutters
- **Desktop**: 3-column default, 4-column for wide layouts
- **Adaptive**: Cards resize smoothly between breakpoints

**Current Issues**: Dashboard 3-col grid (line 41) breaks poorly on mobile, inconsistent gaps
**Priority**: Critical

#### 3. FormLayout
**Purpose**: Consistent form presentation and user experience

**Requirements**:
- **Field Spacing**: 16px between fields, 24px between sections
- **Label Positioning**: Top-aligned labels, consistent spacing
- **Input Sizing**: 40px minimum height for touch targets
- **Validation Feedback**: Inline errors, success states, loading states
- **Submit Actions**: Consistent button placement and behavior
- **Responsive Forms**: Single-column mobile, multi-column desktop

**Form Components Required**:
- `FieldGroup`: Related fields with consistent spacing
- `FormSection`: Sections with dividers and spacing
- `SubmitGroup`: Action buttons with proper alignment
- `ValidationSummary`: Form-level error/success messaging

**Validation Patterns**:
- **Real-time**: Non-intrusive validation during typing
- **On-blur**: Full validation when leaving field
- **On-submit**: Complete form validation with summary
- **Recovery**: Clear error states when user corrects issues

**Accessibility Requirements**:
- Proper label association (htmlFor/id)
- ARIA error announcements
- Focus management for validation errors
- Keyboard navigation support

**Current Issues**: Settings page (lines 118-172) uses basic form patterns, no validation system
**Priority**: High

#### 4. StatsList
**Purpose**: Consistent data presentation across metrics and KPIs

**Requirements**:
- **Stat Card Layout**: Icon + number + label with consistent spacing
- **Number Formatting**: Abbreviated large numbers (1.2k, 5.5M)
- **Icon Treatment**: 32px icon size, consistent color coding
- **Loading States**: Skeleton placeholders for stat values
- **Empty States**: Proper handling of zero/null values
- **Animation**: Count-up animations for engaging presentations

**Stat Display Patterns**:
- `PrimaryStats`: Large featured metrics
- `SecondaryStats`: Supporting statistics
- `ComparisonStats`: Period-over-period comparisons
- `ProgressStats`: Goal progress with progress bars

**Responsive Layout**:
- **Mobile**: 2x2 grid with larger touch targets
- **Tablet**: 4-column horizontal layout
- **Desktop**: Flexible grid based on content count
- **Emphasis**: Primary stats get larger visual weight

**Data Formatting Standards**:
- Numbers: Comma separators, appropriate precision
- Percentages: Single decimal place (95.2%)
- Currency: Proper currency formatting
- Time: Relative time formatting (2 hours ago)

**Current Issues**: Dashboard stats (lines 98-122) cramped on mobile, inconsistent number formatting
**Priority**: Medium

#### 5. NavigationLayout
**Purpose**: Consistent navigation structure and behavior

**Requirements**:
- **Header Layout**: Logo, navigation, user menu with proper spacing
- **Sidebar Layout**: Collapsible navigation with consistent item spacing
- **Breadcrumbs**: Consistent breadcrumb presentation
- **Mobile Menu**: Hamburger menu with proper overlay behavior
- **Active States**: Clear indication of current page/section

**Navigation Components**:
- `AppHeader`: Main application header with responsive behavior
- `SidebarNav`: Collapsible sidebar navigation
- `BreadcrumbNav`: Contextual navigation breadcrumbs
- `MobileMenu`: Mobile-specific navigation overlay

**Responsive Navigation**:
- **Mobile**: Hamburger menu, full-screen overlay
- **Tablet**: Collapsed sidebar with icons
- **Desktop**: Full sidebar navigation
- **Persistent**: Navigation state persists between sessions

**Current Implementation**: Using PageContainer breadcrumbs, but inconsistent patterns
**Priority**: Medium

---

## Interaction Patterns

### Universal Interaction Standards

#### 1. Hover States
**Purpose**: Consistent interactive feedback across all hoverable elements

**Requirements**:
- **Timing**: 150ms transition duration with ease-out easing
- **Elevation**: Subtle shadow increase (0px → 4px blur)
- **Color Changes**: HIVE gold accent integration (#FFD700)
- **Scale**: Minimal scale transforms (1.02x for small elements, 1.05x for cards)
- **Cursor**: Proper cursor states (pointer for clickable, grab for draggable)

**Hover Patterns by Element Type**:
- **Buttons**: Background color change + slight elevation
- **Cards**: Shadow increase + scale transform + border accent
- **Links**: Color change to HIVE gold + underline animation
- **Icons**: Scale + color change to HIVE gold
- **Form Fields**: Border color change + shadow increase

**Animation Specifications**:
- **Ease-out timing**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Transform origin**: center for scales, appropriate for specific transforms
- **Hardware acceleration**: Use transform3d for smooth animations
- **Fallback**: Instant state change for reduced-motion preferences

**Current Issues**: Dashboard cards have inconsistent hover (lines 42-58), Resources mixed hover behaviors
**Priority**: High

#### 2. Focus States
**Purpose**: Accessible keyboard navigation with clear visual indicators

**Requirements**:
- **Focus Ring**: 2px solid HIVE gold outline with 2px offset
- **Visibility**: High contrast focus indicators meeting WCAG standards
- **Tab Order**: Logical tab sequence following visual layout
- **Skip Links**: Skip to main content functionality
- **Focus Trapping**: Modal/overlay focus management

**Focus Patterns**:
- **Interactive Elements**: Visible focus ring with HIVE gold color
- **Form Fields**: Focus ring + field highlight + label color change
- **Navigation**: Clear active state + focus ring
- **Modals**: Focus trap with proper entry/exit focus management
- **Cards**: Focus ring encompassing entire card area

**Accessibility Requirements**:
- **Color Contrast**: 3:1 minimum contrast ratio for focus indicators
- **Screen Readers**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: All interactive elements reachable via keyboard
- **Focus Management**: Restore focus appropriately after modal/overlay close

**Current Issues**: Inconsistent focus states, no visible focus rings on custom components
**Priority**: Critical (Accessibility)

#### 3. Loading States
**Purpose**: Clear communication during asynchronous operations

**Requirements**:
- **Button Loading**: Spinner + disabled state + width preservation
- **Page Loading**: Full-page skeleton screens
- **Section Loading**: Component-level loading placeholders
- **Progressive Loading**: Staged content appearance
- **Timeout Handling**: Fallback after reasonable wait time

**Loading Indicators**:
- **Spinner**: HIVE-branded spinner with gold accent
- **Skeleton**: Content-aware placeholders matching layout
- **Progress Bar**: Linear progress for known durations
- **Pulse Animation**: Subtle pulse for indeterminate progress

**Loading State Patterns**:
- **Form Submission**: Button spinner + disabled state + optimistic updates
- **Data Fetching**: Skeleton screens matching expected content layout
- **Image Loading**: Placeholder → progressive JPEG → full image
- **Navigation**: Page transition with loading overlay

**Performance Standards**:
- **Perceived Performance**: Show loading state within 100ms
- **Skeleton Duration**: Max 2 seconds before showing simplified loading
- **Progressive Enhancement**: Content appears as it loads
- **Error Handling**: Graceful degradation for failed loads

**Current Issues**: Each page handles loading differently (dashboard line 12-23, settings inconsistent)
**Priority**: High

#### 4. Success/Error Feedback
**Purpose**: Clear communication of action outcomes

**Requirements**:
- **Toast System**: Non-intrusive notifications with proper timing
- **Inline Feedback**: Contextual success/error messages
- **Form Validation**: Real-time and submission feedback
- **Action Confirmation**: Destructive action confirmations
- **Recovery Actions**: Clear paths to resolve errors

**Feedback Types**:
- **Success Toast**: Green accent, checkmark icon, auto-dismiss in 4s
- **Error Toast**: Red accent, warning icon, persistent until dismissed
- **Warning Toast**: Orange accent, caution icon, auto-dismiss in 6s
- **Info Toast**: Blue accent, info icon, auto-dismiss in 4s

**Toast Specifications**:
- **Position**: Top-right desktop, top-center mobile
- **Animation**: Slide-in from right, fade-out on dismiss
- **Stacking**: Max 3 toasts, auto-dismiss oldest
- **Actions**: Dismiss button, optional action button (Undo, Retry)
- **Accessibility**: Screen reader announcements, focus management

**Form Feedback Patterns**:
- **Field Validation**: Real-time feedback with color coding
- **Form Summary**: Success/error summary at form level
- **Inline Errors**: Error messages below fields with proper association
- **Recovery**: Clear error states when user corrects issues

**Current Issues**: Using browser alerts for errors (settings lines 27, 58, 69)
**Priority**: Critical

#### 5. Animation Standards
**Purpose**: Consistent motion language throughout the application

**Requirements**:
- **Easing Functions**: Custom HIVE easing curves favoring ease-out
- **Duration Standards**: 150ms micro, 300ms standard, 500ms emphasis
- **Choreography**: Staged animations for multiple elements
- **Performance**: 60fps animations, hardware acceleration
- **Accessibility**: Respect prefers-reduced-motion settings

**Animation Patterns**:
- **Page Transitions**: 300ms fade with slight vertical movement
- **Modal Entry**: Scale + fade animation from interaction point
- **List Animations**: Staggered entrance animations for list items
- **Hover Feedback**: 150ms transforms for interactive elements
- **Loading States**: Consistent pulse/spinner animations

**Motion Design Principles**:
- **Natural Movement**: Animations follow natural motion curves
- **Purposeful**: Every animation serves a functional purpose
- **Responsive**: Animations scale appropriately across device capabilities
- **Interruptible**: Users can interrupt animations without jarring stops
- **Fallbacks**: Graceful degradation for motion-sensitive users

**Easing Curves**:
- **Standard**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Emphasis**: cubic-bezier(0.19, 1, 0.22, 1)  
- **Sharp**: cubic-bezier(0.4, 0, 0.6, 1)
- **Deceleration**: cubic-bezier(0, 0, 0.2, 1)

**Current Issues**: No unified animation standards, inconsistent timing across components
**Priority**: Medium

---

## State Management

### Component State Patterns

#### 1. Loading States
**Purpose**: Standardized loading state management across all components

**State Definitions**:
- **Idle**: Component ready, no ongoing operations
- **Loading**: Data fetching in progress, show loading UI
- **Success**: Operation completed successfully, show content
- **Error**: Operation failed, show error state with recovery
- **Empty**: No data to display, show empty state with actions

**Implementation Requirements**:
- **State Transitions**: Clear state machine with allowed transitions
- **Loading Timeouts**: Maximum loading duration before fallback
- **Retry Logic**: Exponential backoff for failed requests
- **Cache Integration**: Proper cache invalidation and updates
- **Error Recovery**: Clear paths from error states back to success

**UI Patterns by State**:
- **Idle → Loading**: Immediate loading indicator (within 100ms)
- **Loading → Success**: Smooth content fade-in
- **Loading → Error**: Error message with retry actions
- **Loading → Empty**: Empty state with contextual actions
- **Success → Loading**: Show stale content with loading indicator

#### 2. Form States
**Purpose**: Consistent form behavior and user feedback

**State Definitions**:
- **Pristine**: Form untouched, no validation errors
- **Dirty**: Form modified, may have validation errors
- **Submitting**: Form submission in progress
- **Success**: Successful submission with confirmation
- **Error**: Submission failed with actionable error message

**Validation Patterns**:
- **Field-level**: Real-time validation with debouncing (300ms)
- **Form-level**: Complete validation on submit attempt
- **Server-side**: Integration of server validation errors
- **Recovery**: Automatic error clearing when user corrects issues

**Form State Management**:
- **Auto-save**: Draft saving for long forms (every 30s or on blur)
- **Navigation Warning**: Confirm navigation away from dirty forms
- **Progress Tracking**: Multi-step form progress indication
- **Field Focus**: Maintain focus during validation updates

#### 3. Data States
**Purpose**: Consistent data freshness and synchronization

**State Definitions**:
- **Fresh**: Recently loaded, no refresh needed
- **Stale**: Data may be outdated, consider refresh
- **Updating**: Background refresh in progress
- **Offline**: No network connection, show cached data
- **Syncing**: Reconnected, syncing with server

**Data Management Patterns**:
- **Cache Strategy**: Stale-while-revalidate for better UX
- **Optimistic Updates**: Show expected state before server confirmation
- **Conflict Resolution**: Handle concurrent edit conflicts
- **Offline Support**: Queue actions when offline, sync when online
- **Real-time Updates**: WebSocket integration for live data

**Freshness Indicators**:
- **Visual Indicators**: Subtle indicators for stale data
- **Refresh Actions**: Manual refresh options for users
- **Auto-refresh**: Automatic refresh for critical data
- **Sync Status**: Clear indication of sync state

#### 4. Interactive States
**Purpose**: Consistent interactive element states

**State Definitions**:
- **Default**: Element ready for interaction
- **Hover**: Mouse over element, show hover feedback
- **Focus**: Keyboard focus, show focus indicators
- **Active**: Element being clicked/touched
- **Disabled**: Element not available for interaction
- **Loading**: Element processing action

**State Combinations**:
- **Hover + Focus**: Combined states for complex interactions
- **Disabled + Loading**: Loading states for disabled elements
- **Error + Focus**: Error states with focus management
- **Success + Hover**: Success feedback with hover enhancement

#### 5. Modal/Overlay States
**Purpose**: Consistent overlay and modal behavior

**State Definitions**:
- **Closed**: Modal not visible
- **Opening**: Modal entrance animation in progress
- **Open**: Modal fully visible and interactive
- **Closing**: Modal exit animation in progress
- **Loading**: Modal content loading

**Modal Management**:
- **Focus Trap**: Trap focus within modal
- **Backdrop**: Proper backdrop behavior and styling
- **Escape Handling**: ESC key and backdrop click handling
- **Stacking**: Z-index management for nested modals
- **Body Scroll**: Prevent body scroll when modal open

---

## Brand Consistency

### Design Token Implementation

#### 1. Color System
**Purpose**: Consistent color usage across all components and states

**Primary Colors**:
- **HIVE Gold**: #FFD700 (primary brand color)
- **HIVE Gold Light**: #FFE255 (hover states)
- **HIVE Gold Dark**: #E6C200 (active states)
- **HIVE Gold Muted**: rgba(255, 215, 0, 0.1) (backgrounds)

**Background System**:
- **Background Primary**: #0A0A0A (main background)
- **Background Secondary**: #1A1A1A (card backgrounds)
- **Background Tertiary**: #2A2A2A (elevated surfaces)
- **Background Glass**: rgba(255, 255, 255, 0.02) (glass morphism)

**Text Colors**:
- **Text Primary**: #FFFFFF (main text)
- **Text Secondary**: #A1A1AA (supporting text)
- **Text Tertiary**: #71717A (subtle text)
- **Text Disabled**: #52525B (disabled states)

**State Colors**:
- **Success**: #22C55E (success states)
- **Error**: #EF4444 (error states)
- **Warning**: #F59E0B (warning states)
- **Info**: #3B82F6 (informational states)

**Implementation Requirements**:
- Use CSS custom properties for all colors
- No hard-coded hex values in components
- Consistent opacity patterns for glass effects
- Proper contrast ratios meeting WCAG standards

**Current Issues**: Hard-coded #FFD700, rgba values throughout dashboard/settings/resources
**Priority**: Critical

#### 2. Typography Scale
**Purpose**: Consistent text hierarchy and readability

**Font Stack**:
- **UI Font**: Geist Sans (primary interface font)
- **Display Font**: Space Grotesk (headers and emphasis)
- **Mono Font**: JetBrains Mono (code and technical content)

**Type Scale**:
- **Display Large**: 48px/1.1 (hero headings)
- **Display Medium**: 36px/1.2 (page headings)
- **Display Small**: 24px/1.3 (section headings)
- **Headline**: 20px/1.4 (card headings)
- **Body Large**: 16px/1.5 (primary body text)
- **Body Medium**: 14px/1.5 (secondary body text)
- **Body Small**: 12px/1.4 (captions, labels)
- **Caption**: 10px/1.4 (fine print, metadata)

**Font Weight System**:
- **Regular**: 400 (body text)
- **Medium**: 500 (emphasized text)
- **Semibold**: 600 (headings, buttons)
- **Bold**: 700 (strong emphasis)

**Implementation Requirements**:
- Consistent line height ratios
- Proper font loading with fallbacks
- Responsive typography scaling
- Letter spacing optimization for readability

**Current Issues**: Inconsistent text sizing, mixed font weights across components
**Priority**: High

#### 3. Spacing System
**Purpose**: Consistent spacing patterns for layout and components

**Base Unit**: 4px (0.25rem)

**Spacing Scale**:
- **xs**: 4px (0.25rem) - minimal spacing
- **sm**: 8px (0.5rem) - compact spacing  
- **md**: 12px (0.75rem) - default spacing
- **lg**: 16px (1rem) - comfortable spacing
- **xl**: 24px (1.5rem) - section spacing
- **2xl**: 32px (2rem) - large section gaps
- **3xl**: 48px (3rem) - major section gaps
- **4xl**: 64px (4rem) - page-level gaps
- **5xl**: 96px (6rem) - hero spacing

**Usage Patterns**:
- **Component Padding**: 12px-24px depending on component size
- **Grid Gaps**: 16px mobile, 20px tablet, 24px desktop
- **Section Gaps**: 32px mobile, 48px desktop
- **Form Fields**: 16px between fields, 24px between sections

**Implementation Requirements**:
- Use rem units for accessibility
- Consistent application across all components
- Responsive spacing adjustments
- No arbitrary pixel values

**Current Issues**: Mixed spacing values, arbitrary margins/padding throughout
**Priority**: High

#### 4. Elevation System
**Purpose**: Consistent depth and layering through shadows

**Elevation Levels**:
- **Level 0**: box-shadow: none (flush elements)
- **Level 1**: box-shadow: 0 1px 3px rgba(0,0,0,0.12) (cards)
- **Level 2**: box-shadow: 0 4px 6px rgba(0,0,0,0.16) (dropdowns)
- **Level 3**: box-shadow: 0 8px 25px rgba(0,0,0,0.24) (modals)
- **Level 4**: box-shadow: 0 16px 40px rgba(0,0,0,0.32) (overlays)

**HIVE-Specific Shadows**:
- **Gold Glow**: 0 0 20px rgba(255, 215, 0, 0.3) (focus/hover accents)
- **Glass Edge**: inset 0 1px 0 rgba(255,255,255,0.1) (glass morphism)
- **Depth**: 0 4px 12px rgba(0,0,0,0.4) (dark theme shadows)

**Usage Guidelines**:
- Cards use Level 1 elevation
- Hover states increase elevation by one level
- Modals and overlays use Level 3-4
- Focus states add gold glow accent
- Glass elements combine depth + edge shadows

**Implementation Requirements**:
- CSS custom properties for shadows
- Consistent application across components
- Hover state shadow transitions
- Performance optimization for complex shadows

**Current Issues**: Inconsistent shadow usage, mixed shadow values
**Priority**: Medium

#### 5. Border Radius System
**Purpose**: Consistent corner rounding across components

**Radius Scale**:
- **None**: 0px (sharp corners)
- **Small**: 4px (buttons, inputs)
- **Medium**: 8px (cards, modals)
- **Large**: 12px (prominent cards)
- **XL**: 16px (hero elements)
- **Full**: 50% (circular elements)

**Usage Patterns**:
- **Form Elements**: 8px border radius
- **Cards**: 8px-12px based on size
- **Buttons**: 8px for consistency
- **Avatars**: 50% for circular avatars
- **Images**: 8px for contained images

#### 6. Opacity System
**Purpose**: Consistent transparency for glass effects and states

**Opacity Values**:
- **Subtle**: 0.02 (barely visible overlays)
- **Light**: 0.05 (glass backgrounds)  
- **Medium**: 0.1 (hover states)
- **Strong**: 0.2 (focus states)
- **Heavy**: 0.4 (disabled states)

**Usage Patterns**:
- **Glass Morphism**: rgba(255,255,255,0.02) backgrounds
- **Hover Effects**: rgba(255,255,255,0.1) overlays
- **Disabled States**: 0.4 opacity on text/icons
- **Loading States**: 0.6 opacity for loading content

---

## Component Architecture

### Scaffold Component Structure

**Purpose**: Foundational components that provide consistent scaffolding patterns

```
packages/ui/src/components/scaffolds/
├── LoadingScaffold/
│   ├── index.ts                    # Main exports
│   ├── LoadingScaffold.tsx         # Main component
│   ├── loading-patterns.ts         # Skeleton pattern definitions
│   ├── loading-variants.ts         # Loading state variants
│   └── loading-animations.ts       # Animation configurations
├── EmptyState/
│   ├── index.ts                    # Main exports
│   ├── EmptyState.tsx              # Main component
│   ├── empty-illustrations.ts      # Icon/illustration mappings
│   ├── empty-messages.ts           # Default message content
│   └── empty-actions.ts            # Default action configurations
├── ErrorBoundary/
│   ├── index.ts                    # Main exports
│   ├── ErrorBoundary.tsx           # Main error boundary
│   ├── ErrorDisplay.tsx            # Error UI component
│   ├── error-recovery.ts           # Recovery action handlers
│   ├── error-logging.ts            # Error logging integration
│   └── error-types.ts              # Error classification system
├── FeedbackSystem/
│   ├── index.ts                    # Main exports
│   ├── ToastProvider.tsx           # Toast context provider
│   ├── Toast.tsx                   # Toast component
│   ├── toast-types.ts              # Toast variant definitions
│   └── toast-animations.ts         # Toast entrance/exit animations
└── PageTransition/
    ├── index.ts                    # Main exports
    ├── PageTransition.tsx          # Main transition wrapper
    ├── transition-variants.ts      # Transition type definitions
    └── transition-animations.ts    # Animation configurations
```

### Layout Component Structure

**Purpose**: Consistent layout patterns and responsive behavior

```
packages/ui/src/components/layouts/
├── StandardPageLayout/
│   ├── index.ts                    # Main exports
│   ├── StandardPageLayout.tsx      # Main layout component
│   ├── layout-variants.ts          # Layout type variants
│   └── responsive-config.ts        # Breakpoint configurations
├── CardGrid/
│   ├── index.ts                    # Main exports
│   ├── CardGrid.tsx                # Responsive grid component
│   ├── card-grid-variants.ts       # Grid pattern variants
│   └── grid-animations.ts          # Grid entrance animations
├── FormLayout/
│   ├── index.ts                    # Main exports
│   ├── FormLayout.tsx              # Form container component
│   ├── FieldGroup.tsx              # Field grouping component
│   ├── FormSection.tsx             # Form section divider
│   ├── ValidationSummary.tsx       # Form-level validation display
│   └── form-patterns.ts            # Form layout patterns
├── StatsList/
│   ├── index.ts                    # Main exports
│   ├── StatsList.tsx               # Stats container component
│   ├── StatCard.tsx                # Individual stat component
│   ├── stat-formatters.ts          # Number formatting utilities
│   └── stat-animations.ts          # Count-up animations
└── NavigationLayout/
    ├── index.ts                    # Main exports
    ├── AppHeader.tsx               # Application header
    ├── SidebarNav.tsx              # Sidebar navigation
    ├── BreadcrumbNav.tsx           # Breadcrumb navigation
    ├── MobileMenu.tsx              # Mobile menu overlay
    └── navigation-config.ts        # Navigation configurations
```

### Pattern Component Structure

**Purpose**: Reusable interaction and behavior patterns

```
packages/ui/src/components/patterns/
├── InteractionPattern/
│   ├── index.ts                    # Main exports
│   ├── HoverProvider.tsx           # Hover state management
│   ├── FocusProvider.tsx           # Focus state management
│   ├── interaction-config.ts       # Interaction configurations
│   └── interaction-hooks.ts        # Custom interaction hooks
├── DataPattern/
│   ├── index.ts                    # Main exports
│   ├── DataProvider.tsx            # Data state management
│   ├── CacheProvider.tsx           # Cache state management
│   ├── data-states.ts              # Data state definitions
│   └── data-hooks.ts               # Data management hooks
├── AnimationPattern/
│   ├── index.ts                    # Main exports
│   ├── AnimationProvider.tsx       # Animation context provider
│   ├── MotionWrapper.tsx           # Motion wrapper component
│   ├── animation-config.ts         # Animation configurations
│   ├── easing-curves.ts            # Custom easing functions
│   └── animation-hooks.ts          # Animation utility hooks
└── ValidationPattern/
    ├── index.ts                    # Main exports
    ├── ValidationProvider.tsx      # Validation context
    ├── FieldValidator.tsx          # Field validation component
    ├── validation-rules.ts         # Validation rule definitions
    ├── validation-messages.ts      # Error message templates
    └── validation-hooks.ts         # Validation utility hooks
```

### Design Token Structure

**Purpose**: Centralized design system tokens

```
packages/ui/src/tokens/
├── index.ts                        # All token exports
├── colors.ts                       # Color system tokens
├── typography.ts                   # Typography scale tokens
├── spacing.ts                      # Spacing system tokens
├── shadows.ts                      # Elevation system tokens
├── animations.ts                   # Animation tokens
├── breakpoints.ts                  # Responsive breakpoints
└── css-generator.ts                # CSS custom property generation
```

### Hook Architecture

**Purpose**: Reusable state and interaction logic

```
packages/ui/src/hooks/
├── index.ts                        # All hook exports
├── useLoadingState.ts              # Loading state management
├── useFormState.ts                 # Form state management
├── useDataState.ts                 # Data fetching state
├── useInteractionState.ts          # Interaction state management
├── useResponsive.ts                # Responsive breakpoint hooks
├── useAnimation.ts                 # Animation utility hooks
├── useToast.ts                     # Toast notification hooks
└── useKeyboardNavigation.ts        # Keyboard navigation helpers
```

### Provider Architecture

**Purpose**: Application-level context providers

```
packages/ui/src/providers/
├── index.ts                        # All provider exports
├── ThemeProvider.tsx               # Theme and design token provider
├── ResponsiveProvider.tsx          # Responsive breakpoint provider
├── AnimationProvider.tsx           # Animation configuration provider
├── ToastProvider.tsx               # Toast notification provider
├── ErrorProvider.tsx               # Error boundary provider
└── HiveProvider.tsx                # Combined HIVE providers
```

### Utility Structure

**Purpose**: Helper functions and utilities

```
packages/ui/src/utils/
├── index.ts                        # All utility exports
├── classname-utils.ts              # Conditional className helpers
├── animation-utils.ts              # Animation helper functions
├── responsive-utils.ts             # Responsive helper functions
├── validation-utils.ts             # Form validation helpers
├── formatting-utils.ts             # Data formatting utilities
├── accessibility-utils.ts          # A11y helper functions
└── performance-utils.ts            # Performance optimization helpers
```

### Component Export Strategy

**Purpose**: Clean and consistent component exports

```typescript
// packages/ui/src/components/index.ts

// === FOUNDATION SCAFFOLDS ===
export * from './scaffolds/LoadingScaffold';
export * from './scaffolds/EmptyState';
export * from './scaffolds/ErrorBoundary';
export * from './scaffolds/FeedbackSystem';
export * from './scaffolds/PageTransition';

// === LAYOUT SYSTEMS ===
export * from './layouts/StandardPageLayout';
export * from './layouts/CardGrid';
export * from './layouts/FormLayout';
export * from './layouts/StatsList';
export * from './layouts/NavigationLayout';

// === INTERACTION PATTERNS ===
export * from './patterns/InteractionPattern';
export * from './patterns/DataPattern';
export * from './patterns/AnimationPattern';
export * from './patterns/ValidationPattern';

// === DESIGN TOKENS ===
export * from '../tokens';

// === HOOKS ===
export * from '../hooks';

// === PROVIDERS ===
export * from '../providers';

// === UTILITIES ===
export * from '../utils';

// === EXISTING HIVE COMPONENTS ===
// (Keep all existing component exports)
export * from './hive-button';
export * from './hive-card';
// ... etc
```

---

## Implementation Checklist

### Phase 1: Foundation Architecture (Week 1)
**Goal**: Establish core scaffolding and design token foundation

#### Design Tokens & Architecture
- [ ] Create design token system (`packages/ui/src/tokens/`)
  - [ ] Color system tokens with CSS custom properties
  - [ ] Typography scale with proper line heights
  - [ ] Spacing system with rem units
  - [ ] Elevation system with consistent shadows
  - [ ] Animation tokens with easing curves
- [ ] Set up CSS custom property generation
- [ ] Create design token TypeScript types
- [ ] Update existing components to use tokens (remove hard-coded values)

#### Core Scaffold Components
- [ ] Create LoadingScaffold system
  - [ ] Page loading scaffolds with skeleton screens
  - [ ] Section loading scaffolds for components
  - [ ] Form loading scaffolds for submissions
  - [ ] Loading animations and timing
- [ ] Create EmptyState system
  - [ ] Empty state variants (no data, no results, error, permission)
  - [ ] Contextual messaging and actions
  - [ ] HIVE-branded illustrations/icons
- [ ] Create ErrorBoundary system
  - [ ] App-level error boundaries
  - [ ] Component-level error boundaries
  - [ ] Error recovery actions and logging
  - [ ] Error UI with HIVE branding
- [ ] Create FeedbackSystem (Toast)
  - [ ] Toast provider and context
  - [ ] Toast variants (success, error, warning, info)
  - [ ] Toast animations and timing
  - [ ] Accessibility features

**Priority**: Critical - Foundation for all other work

### Phase 2: Layout Systems (Week 2)
**Goal**: Establish consistent layout patterns across all pages

#### Layout Components
- [ ] Create StandardPageLayout
  - [ ] Responsive page containers
  - [ ] Consistent margin/padding systems
  - [ ] Header/footer integration
  - [ ] Breadcrumb integration
- [ ] Create CardGrid system
  - [ ] Responsive grid patterns
  - [ ] Card grid variants (action, stat, content, compact)
  - [ ] Loading states for grids
  - [ ] Empty state integration
- [ ] Create FormLayout system
  - [ ] Form containers with consistent spacing
  - [ ] Field grouping components
  - [ ] Form sections with dividers
  - [ ] Validation summary components
- [ ] Create StatsList system
  - [ ] Stat card components
  - [ ] Number formatting utilities
  - [ ] Count-up animations
  - [ ] Responsive stat layouts

#### Page Layout Updates
- [ ] Update Dashboard page to use StandardPageLayout and CardGrid
- [ ] Update Settings page to use FormLayout system
- [ ] Update Resources page to use CardGrid system
- [ ] Update Profile page layout consistency
- [ ] Update Build page layout consistency

**Priority**: High - Immediate visual improvement

### Phase 3: Interaction Patterns (Week 3)
**Goal**: Standardize all interactive behaviors

#### Interaction Standardization
- [ ] Create interaction pattern system
  - [ ] Hover state configurations
  - [ ] Focus state configurations  
  - [ ] Active state configurations
  - [ ] Disabled state configurations
- [ ] Create animation pattern system
  - [ ] Page transition animations
  - [ ] Component entrance animations
  - [ ] Hover/focus animations
  - [ ] Loading animations
- [ ] Update all components with consistent interactions
  - [ ] Button interaction states
  - [ ] Card interaction states
  - [ ] Form field interaction states
  - [ ] Navigation interaction states

#### Accessibility Implementation
- [ ] Focus management system
  - [ ] Visible focus indicators
  - [ ] Focus trap for modals
  - [ ] Skip links implementation
  - [ ] Tab order optimization
- [ ] Screen reader support
  - [ ] ARIA labels and descriptions
  - [ ] Screen reader announcements
  - [ ] Semantic HTML structure
  - [ ] Color contrast validation

**Priority**: High - Critical for accessibility compliance

### Phase 4: State Management (Week 4)
**Goal**: Consistent state handling across all components

#### State Pattern Implementation
- [ ] Create loading state patterns
  - [ ] Loading state hooks
  - [ ] Loading state providers
  - [ ] Loading timeout handling
  - [ ] Loading error recovery
- [ ] Create form state patterns
  - [ ] Form validation hooks
  - [ ] Form submission handling
  - [ ] Form error management
  - [ ] Form auto-save functionality
- [ ] Create data state patterns
  - [ ] Data fetching hooks
  - [ ] Cache management
  - [ ] Optimistic updates
  - [ ] Offline support

#### Integration with Existing Pages
- [ ] Update Dashboard with new state patterns
- [ ] Update Settings with form state management
- [ ] Update Profile with data state patterns
- [ ] Update all forms with validation patterns

**Priority**: Medium - Improves reliability and UX

### Phase 5: Brand Consistency Audit (Week 5)
**Goal**: Ensure 100% brand consistency across platform

#### Component Audit
- [ ] Audit all existing components for design token usage
- [ ] Replace hard-coded values with design tokens
- [ ] Ensure consistent spacing patterns
- [ ] Ensure consistent typography usage
- [ ] Ensure consistent color usage

#### Visual Consistency
- [ ] Standardize all hover states
- [ ] Standardize all focus states
- [ ] Standardize all loading states
- [ ] Standardize all error states
- [ ] Standardize all empty states

#### Responsive Consistency
- [ ] Audit responsive behavior across components
- [ ] Standardize breakpoint usage
- [ ] Ensure consistent mobile behavior
- [ ] Ensure consistent tablet behavior
- [ ] Test all components across device sizes

**Priority**: Medium - Final polish for production

### Phase 6: Testing & Documentation (Week 6)
**Goal**: Ensure quality and maintainability

#### Testing Implementation
- [ ] Unit tests for all scaffold components
- [ ] Integration tests for layout systems
- [ ] Accessibility tests (automated)
- [ ] Visual regression tests
- [ ] Performance tests

#### Documentation
- [ ] Storybook stories for all new components
- [ ] Usage documentation for scaffold components
- [ ] Design system documentation
- [ ] Migration guides for existing components
- [ ] Best practices documentation

**Priority**: Medium - Quality assurance

### Success Criteria

#### User Experience Metrics
- [ ] Zero jarring transitions between pages
- [ ] Consistent loading experience across all pages
- [ ] Predictable interaction patterns
- [ ] Accessible keyboard navigation
- [ ] Error recovery flows work properly

#### Developer Experience Metrics
- [ ] No hard-coded design values in components
- [ ] Consistent component APIs
- [ ] Reusable scaffold components
- [ ] Clear component documentation
- [ ] Easy-to-use design tokens

#### Brand Consistency Metrics
- [ ] Unified visual presentation
- [ ] Consistent HIVE gold usage
- [ ] Proper typography hierarchy
- [ ] Consistent spacing patterns
- [ ] Unified component behaviors

#### Technical Quality Metrics
- [ ] WCAG 2.1 AA compliance
- [ ] 90+ Lighthouse accessibility score
- [ ] Consistent responsive behavior
- [ ] Error boundary coverage
- [ ] Performance within targets (LCP < 2.5s, FID < 100ms)

### Rollout Strategy

#### Week 1-2: Foundation & Layout
Focus on core scaffolding and immediate visual improvements

#### Week 3-4: Interactions & States  
Polish interactions and standardize behaviors

#### Week 5-6: Consistency & Quality
Final audit and testing for production readiness

#### Post-Implementation
- Monitor user feedback and metrics
- Iterate on components based on usage
- Maintain design system documentation
- Regular accessibility audits

---

## Summary

This HIVE Presentation Layer Specification provides a comprehensive roadmap for creating **flawless UI/UX scaffolding** with consistent HIVE brand elements across the entire platform.

### Key Outcomes

After full implementation, the HIVE platform will have:

1. **Flawless User Experience**
   - Seamless loading states and transitions
   - Consistent interactive behaviors  
   - Accessible keyboard navigation
   - Clear error recovery paths
   - Professional-grade polish

2. **Unified Brand Presentation**
   - Consistent HIVE gold usage throughout
   - Proper typography hierarchy
   - Standardized spacing patterns
   - Unified component behaviors
   - Cohesive visual language

3. **Bulletproof Technical Foundation**
   - Design token-driven architecture
   - Reusable scaffold components
   - Consistent responsive behavior
   - Comprehensive error boundaries
   - Performance-optimized interactions

### Critical Success Factors

1. **Foundation First**: Design tokens and scaffold components are the foundation - implement these before visual polish
2. **Consistency Over Innovation**: Focus on making every interaction feel polished rather than unique features
3. **Accessibility Built-in**: WCAG compliance from the start, not retrofitted
4. **Performance Conscious**: Every animation and interaction optimized for 60fps
5. **Developer Experience**: Clear patterns that make building new features consistent

### Next Steps

1. **Review and Approve**: Validate this specification with stakeholders
2. **Begin Phase 1**: Start with design tokens and foundation scaffolds
3. **Iterative Implementation**: Build and test each phase thoroughly
4. **Continuous Testing**: User testing and accessibility auditing throughout
5. **Documentation**: Maintain comprehensive documentation for long-term success

This specification transforms HIVE from a functional platform to a **professional, accessible, and delightful user experience** that maintains consistent HIVE branding throughout every interaction.

---

*Last Updated: January 2025*  
*Version: 1.0*  
*Status: Ready for Implementation*