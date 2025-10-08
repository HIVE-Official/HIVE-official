# HIVE Design System

**Version:** 2.0 (Post-shadcn Migration)
**Last Updated:** October 2025
**Status:** Active Development

## Overview

The HIVE design system is built as a **layered architecture** on top of shadcn/ui, combining generic accessible components with campus-specific behavioral patterns. This approach gives us design consistency, accessibility standards, and HIVE's unique campus identity.

## Architecture Layers

```
HIVE Design System Stack
│
├── Layer 1: shadcn/ui Atoms (Foundation)
│   └── 63 generic, accessible, themed components
│
├── Layer 2: HIVE Molecules (Campus Patterns)
│   └── shadcn compositions + campus context
│
├── Layer 3: HIVE Organisms (Feature Blocks)
│   └── Complete features with campus behaviors
│
├── Layer 4: Templates (Page Layouts)
│   └── Responsive page structures
│
└── Layer 5: Pages (Next.js App Router)
    └── Data binding + templates
```

---

## Layer 1: shadcn/ui Atoms (Foundation)

**Location:** `packages/ui/src/atomic/atoms/`
**Count:** 63 components
**Philosophy:** Keep pure, don't modify, upgrade independently

### What shadcn Provides

- **Accessibility:** ARIA compliance, keyboard navigation, screen reader support
- **Theming:** CSS variables, dark mode, consistent spacing
- **Variants:** CVA-based variant system for consistent styling
- **Primitives:** Built on Radix UI for robust behavior

### Core Atoms Reference

<details>
<summary><strong>Form & Input Components (12)</strong></summary>

- `button.tsx` - All button variants (default, outline, ghost, destructive, link)
- `input.tsx` - Text input with validation states
- `textarea.tsx` - Multi-line text input
- `select.tsx` - Dropdown selection
- `checkbox.tsx` - Binary selection
- `radio-group.tsx` - Mutually exclusive options
- `switch.tsx` - Toggle control
- `slider.tsx` - Range input
- `input-otp.tsx` - One-time password input
- `form.tsx` - Form wrapper with react-hook-form
- `label.tsx` - Accessible form labels
- `command.tsx` - Command palette / search

</details>

<details>
<summary><strong>Layout & Structure (8)</strong></summary>

- `card.tsx` - Content container
- `separator.tsx` - Visual divider
- `aspect-ratio.tsx` - Maintain aspect ratio
- `scroll-area.tsx` - Custom scrollbars
- `resizable.tsx` - Resizable panels
- `breadcrumb.tsx` - Navigation breadcrumbs
- `pagination.tsx` - Page navigation
- `table.tsx` - Data tables

</details>

<details>
<summary><strong>Overlay & Dialog (7)</strong></summary>

- `dialog.tsx` - Modal dialogs
- `sheet.tsx` - Slide-in panels
- `drawer.tsx` - Bottom drawer
- `popover.tsx` - Floating content
- `tooltip.tsx` - Contextual hints
- `hover-card.tsx` - Rich hover previews
- `context-menu.tsx` - Right-click menus

</details>

<details>
<summary><strong>Navigation (5)</strong></summary>

- `tabs.tsx` - Tabbed navigation
- `navigation-menu.tsx` - Complex nav structures
- `menubar.tsx` - Menu bar
- `dropdown-menu.tsx` - Action menus
- `sidebar.tsx` - Collapsible sidebar

</details>

<details>
<summary><strong>Feedback & Status (6)</strong></summary>

- `alert.tsx` - Alert messages
- `alert-dialog.tsx` - Confirmation dialogs
- `toast.tsx` / `sonner.tsx` - Notifications
- `progress.tsx` - Progress indicators
- `skeleton.tsx` - Loading placeholders
- `badge.tsx` - Status badges

</details>

<details>
<summary><strong>Data Display (5)</strong></summary>

- `avatar.tsx` - User avatars
- `calendar.tsx` - Date picker
- `chart.tsx` - Data visualization
- `carousel.tsx` - Image carousel
- `collapsible.tsx` - Expandable content

</details>

<details>
<summary><strong>Other (6)</strong></summary>

- `accordion.tsx` - Collapsible sections
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Toggle button group
- `hive-logo.tsx` - HIVE branding

</details>

### Import Convention

```typescript
// Always import shadcn atoms from @hive/ui
import { Button, Card, Avatar, Badge } from '@hive/ui';

// Type-only imports
import type { ButtonProps } from '@hive/ui';
```

### Modification Policy

**DO NOT modify shadcn atoms.** They are:
- Upgradeable via CLI: `npx shadcn-ui@latest add [component]`
- Consistent across the platform
- Accessible by default
- Well-tested

If you need custom behavior, create a HIVE molecule that wraps the atom.

---

## Layer 2: HIVE Molecules (Campus Patterns)

**Location:** `packages/ui/src/atomic/molecules/`
**Count:** 18 active components
**Philosophy:** Compose shadcn atoms + add campus context

### What Makes a HIVE Molecule?

A molecule is a **campus-aware composition** of shadcn atoms that adds HIVE-specific behavior:

✅ **Good Molecule:**
- Composes 2-5 shadcn atoms
- Adds campus context (mutual connections, proximity, major)
- Encapsulates a single campus behavior pattern
- Reusable across features

❌ **Not a Molecule:**
- Simple wrapper around single atom (just use atom directly)
- Feature-specific logic (belongs in organism)
- Page-level layout (belongs in template)

### Naming Convention

```
[domain]-[component]-[variant?].tsx

Examples:
campus-user-card.tsx          // Campus-specific user display
event-rsvp-card.tsx           // Event with RSVP functionality
space-post-composer.tsx       // Space-aware post composer
connection-badge.tsx          // Relationship indicator
proximity-tag.tsx             // Campus location tag
```

### Standard Molecule Interface

```typescript
import type { ReactNode } from 'react';

/**
 * Campus Context (include in all HIVE molecules)
 */
export interface CampusContext {
  // Social signals
  mutualConnections?: number;
  sameMajor?: string;
  sameYear?: number;
  sameSpace?: boolean;

  // Location context
  proximity?: 'north' | 'south' | 'ellicott' | 'greiner' | 'offcampus';
  building?: string;

  // Relationship
  relationship?: 'connection' | 'friend' | 'mutual' | 'stranger';
  connectionDistance?: number; // degrees of separation

  // Activity context
  lastActive?: Date;
  isOnline?: boolean;
}

/**
 * Standard HIVE Molecule Props
 */
export interface HIVEMoleculeProps<T> {
  // Core data (domain-specific)
  data: T;

  // Campus context (optional but encouraged)
  campusContext?: CampusContext;

  // Behavioral props
  onAction?: (action: string) => void;
  quickActions?: QuickAction[];

  // Visual customization
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;

  // Composition
  children?: ReactNode;
}
```

### Current Active Molecules

<details>
<summary><strong>Feed & Posts (4)</strong></summary>

- `feed-post-card.tsx` - Post card with engagement
- `feed-event-card.tsx` - Event card with RSVP
- `comment-card.tsx` - Comment display
- `comment-input.tsx` - Comment composer

</details>

<details>
<summary><strong>Spaces (2)</strong></summary>

- `space-card.tsx` - Space preview card
- `space-composer-with-tools.tsx` - Post composer with tool integration

</details>

<details>
<summary><strong>Profile & Social (5)</strong></summary>

- `user-card.tsx` - User display card
- `profile-card.tsx` - Profile preview
- `profile-completion.tsx` - Profile completion indicator
- `profile-stats.tsx` - Profile statistics
- `activity-timeline.tsx` - User activity feed

</details>

<details>
<summary><strong>HiveLab (1)</strong></summary>

- `inline-tool-menu.tsx` - Quick tool insertion menu

</details>

<details>
<summary><strong>Shared UI (6)</strong></summary>

- `stat-card.tsx` - Statistic display
- `search-bar.tsx` - Search input
- `notification-item.tsx` - Notification card
- `photo-carousel.tsx` - Image carousel
- `feed-filters.tsx` - Filter controls
- `rituals-card-strip.tsx` - Ritual preview strip

</details>

### Molecule Example

```typescript
// campus-user-card.tsx
import { Card, Avatar, Badge, Button } from '@hive/ui';
import type { ProfileAggregate } from '@hive/core';
import type { CampusContext } from './types';

export interface CampusUserCardProps {
  user: ProfileAggregate;
  campusContext?: CampusContext;
  onConnect?: () => void;
  variant?: 'default' | 'compact';
}

export function CampusUserCard({
  user,
  campusContext,
  onConnect,
  variant = 'default'
}: CampusUserCardProps) {
  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-3">
        {/* shadcn atom */}
        <Avatar src={user.avatar} alt={user.displayName} />

        <div className="flex-1 min-w-0">
          {/* User identity */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">{user.displayName}</span>

            {/* Campus context: Same major badge */}
            {campusContext?.sameMajor && (
              <Badge variant="outline" size="sm">
                {campusContext.sameMajor}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground">@{user.handle}</p>

          {/* Campus context: Mutual connections */}
          {campusContext?.mutualConnections && campusContext.mutualConnections > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {campusContext.mutualConnections} mutual connections
            </p>
          )}

          {/* Campus context: Proximity */}
          {campusContext?.proximity && (
            <Badge variant="secondary" size="sm" className="mt-1">
              {campusContext.proximity === 'north' && 'North Campus'}
              {campusContext.proximity === 'south' && 'South Campus'}
              {campusContext.proximity === 'ellicott' && 'Ellicott'}
            </Badge>
          )}
        </div>

        {/* Action: Connect button */}
        {onConnect && (
          <Button
            variant="outline"
            size="sm"
            onClick={onConnect}
          >
            Connect
          </Button>
        )}
      </div>
    </Card>
  );
}
```

---

## Layer 3: HIVE Organisms (Feature Blocks)

**Location:** `packages/ui/src/atomic/organisms/`
**Count:** 18 active components
**Philosophy:** Complete feature blocks with campus behaviors

### What Makes a HIVE Organism?

An organism is a **complete feature block** that:

✅ **Characteristics:**
- Combines multiple molecules and atoms
- Implements full feature logic
- Handles data fetching/mutations (via props)
- Manages complex state
- Provides complete user flow

❌ **Not an Organism:**
- Simple composition (molecule is enough)
- Entire page (belongs in template)
- No unique business logic (compose molecules instead)

### Naming Convention

```
[feature]-[component]-[variant?].tsx

Examples:
space-member-list.tsx         // Member management
event-feed-with-rsvp.tsx      // Event feed + RSVP flow
campus-discovery-feed.tsx     // Feed with campus signals
profile-with-connections.tsx  // Profile + connection list
hivelab-builder-canvas.tsx    // Tool builder canvas
```

### Standard Organism Interface

```typescript
/**
 * Standard HIVE Organism Props
 */
export interface HIVEOrganismProps<T> {
  // Data (could be from server)
  items: T[];
  currentUserId: string;

  // Campus context
  campusContext?: CampusContext;

  // Feature-specific config
  config?: FeatureConfig;

  // Actions
  onItemAction?: (item: T, action: string) => void;
  onBulkAction?: (items: T[], action: string) => void;

  // Loading & error states
  isLoading?: boolean;
  error?: Error;

  // Pagination
  hasMore?: boolean;
  onLoadMore?: () => void;

  // Visual
  layout?: 'grid' | 'list' | 'compact';
  className?: string;
}
```

### Current Active Organisms

<details>
<summary><strong>Navigation (1)</strong></summary>

- `navigation-shell.tsx` - App-wide navigation

</details>

<details>
<summary><strong>Profile (2)</strong></summary>

- `profile-header.tsx` - Profile page header
- `connection-list.tsx` - User connections list

</details>

<details>
<summary><strong>Spaces (8)</strong></summary>

- `space-header.tsx` - Space page header
- `space-post-feed.tsx` - Space posts feed
- `space-member-list.tsx` - Member management
- `space-members-panel.tsx` - Members sidebar
- `space-events-panel.tsx` - Events sidebar
- `space-resources-panel.tsx` - Resources panel
- `space-about-section.tsx` - About/description
- `space-leader-toolbar.tsx` - Leader actions
- `space-tools-panel.tsx` - Integrated tools panel

</details>

<details>
<summary><strong>HiveLab (5)</strong></summary>

- `hivelab-builder-canvas.tsx` - Visual tool builder
- `hivelab-element-library.tsx` - Component palette
- `hivelab-properties-panel.tsx` - Properties editor
- `hivelab-template-browser.tsx` - Template gallery
- `hivelab-analytics-dashboard.tsx` - Tool analytics
- `tool-action-modals.tsx` - Tool action dialogs

</details>

### Organism Example

```typescript
// space-member-list.tsx
import { useState } from 'react';
import { CampusUserCard } from '../molecules/campus-user-card';
import { Button, DropdownMenu } from '@hive/ui';
import type { SpaceMemberAggregate } from '@hive/core';

export interface SpaceMemberListProps {
  members: SpaceMemberAggregate[];
  currentUserId: string;
  currentUserIsLeader: boolean;
  onMakeLeader?: (memberId: string) => void;
  onRemoveMember?: (memberId: string) => void;
}

export function SpaceMemberList({
  members,
  currentUserId,
  currentUserIsLeader,
  onMakeLeader,
  onRemoveMember
}: SpaceMemberListProps) {
  // Sort: Leaders first, then by join date
  const sortedMembers = [
    ...members.filter(m => m.isLeader),
    ...members.filter(m => !m.isLeader).sort((a, b) =>
      a.joinedAt.getTime() - b.joinedAt.getTime()
    )
  ];

  return (
    <div className="space-y-2">
      {sortedMembers.map(member => (
        <div key={member.userId} className="relative">
          {/* Use HIVE molecule */}
          <CampusUserCard
            user={member.profile}
            campusContext={{
              mutualConnections: member.mutualConnectionCount,
              sameMajor: member.profile.major[0],
              relationship: member.userId === currentUserId ? 'self' : 'stranger'
            }}
          />

          {/* Leader badge */}
          {member.isLeader && (
            <Badge className="absolute top-4 right-4" variant="gold">
              Leader
            </Badge>
          )}

          {/* Leader controls */}
          {currentUserIsLeader && !member.isLeader && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onMakeLeader?.(member.userId)}>
                  Make Leader
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onRemoveMember?.(member.userId)}
                  className="text-destructive"
                >
                  Remove from Space
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Layer 4: Templates (Page Layouts)

**Location:** `packages/ui/src/atomic/templates/`
**Count:** 1 active template (space-layout.tsx)
**Philosophy:** Responsive page structures, no business logic

### What Makes a Template?

A template is a **responsive layout structure** that:

✅ **Characteristics:**
- Defines page grid/flex structure
- Handles responsive breakpoints
- Provides content slots
- No business logic (just layout)
- Composes organisms into page structure

❌ **Not a Template:**
- Business logic (belongs in page/organism)
- Data fetching (belongs in page)
- Single organism wrapper (not needed)

### Naming Convention

```
[page]-layout.tsx

Examples:
feed-layout.tsx               // Feed page structure
space-layout.tsx              // Space page structure
profile-layout.tsx            // Profile page structure
hivelab-layout.tsx            // HiveLab page structure
```

### Standard Template Interface

```typescript
/**
 * Standard Template Props
 */
export interface TemplateProps {
  // Content slots
  header?: ReactNode;
  sidebar?: ReactNode;
  content: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;

  // Layout config
  layout?: 'default' | 'full-width' | 'narrow';
  sidebarPosition?: 'left' | 'right' | 'both';

  // Responsive behavior
  collapseSidebarOnMobile?: boolean;
  hideRightSidebarOnTablet?: boolean;

  // Visual
  className?: string;
}
```

### Template Example

```typescript
// space-layout.tsx
import { cn } from '@hive/ui';
import type { ReactNode } from 'react';

export interface SpaceLayoutProps {
  header: ReactNode;          // Space header organism
  content: ReactNode;         // Main content (feed, about, etc.)
  membersSidebar?: ReactNode; // Members panel
  toolsSidebar?: ReactNode;   // Tools panel
  layout?: '60-40' | '70-30' | 'full';
}

export function SpaceLayout({
  header,
  content,
  membersSidebar,
  toolsSidebar,
  layout = '60-40'
}: SpaceLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header: Full width */}
      <div className="border-b border-border">
        {header}
      </div>

      {/* Main content area */}
      <div className={cn(
        "mx-auto max-w-7xl px-4 py-6",
        "grid gap-6",
        layout === '60-40' && "md:grid-cols-[1fr_400px]",
        layout === '70-30' && "md:grid-cols-[1fr_300px]",
        layout === 'full' && "md:grid-cols-1"
      )}>
        {/* Left: Main content */}
        <div className="min-w-0">
          {content}
        </div>

        {/* Right: Sidebars (desktop only) */}
        {(membersSidebar || toolsSidebar) && (
          <div className="hidden md:block space-y-6">
            {membersSidebar}
            {toolsSidebar}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Responsive Patterns

**Mobile-First Grid:**
```typescript
// 1 column mobile, 2-3 columns desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

**Collapsible Sidebars:**
```typescript
// Hide sidebars on mobile, show on desktop
<aside className="hidden lg:block w-80">
  {sidebar}
</aside>
```

**Adaptive Spacing:**
```typescript
// Smaller padding on mobile
className="px-4 md:px-6 lg:px-8"
```

---

## Layer 5: Pages (Next.js App Router)

**Location:** `apps/web/src/app/`
**Philosophy:** Data binding + templates

### Page Composition Pattern

```typescript
// apps/web/src/app/spaces/[spaceId]/page.tsx
import { SpaceLayout } from '@hive/ui';
import {
  SpaceHeader,
  SpacePostFeed,
  SpaceMembersPanel
} from '@hive/ui';
import { getSpace, getSpacePosts, getSpaceMembers } from '@hive/core';

export default async function SpacePage({
  params
}: {
  params: { spaceId: string }
}) {
  // Fetch data (server component)
  const space = await getSpace(params.spaceId);
  const posts = await getSpacePosts(params.spaceId);
  const members = await getSpaceMembers(params.spaceId);

  // Compose template with organisms
  return (
    <SpaceLayout
      header={
        <SpaceHeader
          space={space}
          currentUserId={userId}
        />
      }
      content={
        <SpacePostFeed
          posts={posts}
          spaceId={params.spaceId}
        />
      }
      membersSidebar={
        <SpaceMembersPanel
          members={members}
          spaceId={params.spaceId}
        />
      }
    />
  );
}
```

### Page Responsibilities

✅ **Pages should:**
- Fetch data (Server Components)
- Handle authentication/authorization
- Compose templates with organisms
- Pass data to components
- Handle routing
- Manage metadata (SEO)

❌ **Pages should NOT:**
- Contain business logic (use organisms)
- Have complex UI (use organisms/molecules)
- Duplicate layouts (use templates)

---

## Component Creation Guidelines

### When to Create Each Layer

**Create an Atom when:**
- ❌ **NEVER** - Use shadcn atoms as-is
- Exception: Truly generic, reusable primitive not in shadcn

**Create a Molecule when:**
- ✅ You're composing 2-5 shadcn atoms
- ✅ You're adding campus context to a pattern
- ✅ The pattern is reused 3+ times
- ✅ It encapsulates a single campus behavior

**Create an Organism when:**
- ✅ You need a complete feature block
- ✅ You're combining multiple molecules
- ✅ You have complex state management
- ✅ You're implementing a full user flow

**Create a Template when:**
- ✅ You have a reusable page structure
- ✅ You need responsive layout patterns
- ✅ Multiple pages share the same layout

**Create a Page when:**
- ✅ You have a new route
- ✅ You need data fetching
- ✅ You're composing templates/organisms

### Decision Tree

```
Need a component?
│
├─ Is it a single UI primitive?
│  └─ Use shadcn atom
│
├─ Is it 2-5 atoms with campus context?
│  └─ Create HIVE molecule
│
├─ Is it a complete feature block?
│  └─ Create HIVE organism
│
├─ Is it a page layout structure?
│  └─ Create template
│
└─ Is it a route with data?
   └─ Create Next.js page
```

---

## Storybook Documentation Standards

Every HIVE component (molecule/organism) needs comprehensive Storybook documentation.

### Required Stories

**1. Default Story** (basic usage)
```typescript
export const Default: Story = {
  args: {
    // Minimal props
  }
};
```

**2. With Campus Context** (full data)
```typescript
export const WithCampusContext: Story = {
  args: {
    data: sampleData,
    campusContext: {
      mutualConnections: 5,
      sameMajor: "CS",
      proximity: "north"
    }
  }
};
```

**3. Interactive Demo** (stateful)
```typescript
export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState();
    return <Component state={state} onChange={setState} />;
  }
};
```

**4. Mobile View** (responsive)
```typescript
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  }
};
```

**5. Different States** (loading, error, empty)
```typescript
export const Loading: Story = {
  args: { isLoading: true }
};

export const Error: Story = {
  args: { error: new Error('Failed to load') }
};

export const Empty: Story = {
  args: { items: [] }
};
```

### Story Documentation Template

```typescript
/**
 * # ComponentName
 *
 * Brief description of what this component does and when to use it.
 *
 * ## Features
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * ## Campus Context
 * - What campus-specific data it displays
 * - How it adapts to user relationships
 *
 * ## Usage
 * ```tsx
 * <ComponentName
 *   data={data}
 *   campusContext={{ mutualConnections: 5 }}
 *   onAction={(action) => console.log(action)}
 * />
 * ```
 */
const meta = {
  title: "Layer/ComponentName",
  component: ComponentName,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentName>;
```

---

## Import Patterns

### Correct Import Structure

```typescript
// ✅ GOOD: Layer-appropriate imports

// Layer 1: shadcn atoms
import { Button, Card, Avatar, Badge } from '@hive/ui';

// Layer 2: HIVE molecules
import { CampusUserCard, EventRsvpCard } from '@hive/ui';

// Layer 3: HIVE organisms
import { SpaceMemberList, ProfileHeader } from '@hive/ui';

// Layer 4: Templates
import { SpaceLayout, FeedLayout } from '@hive/ui';

// Domain types from core
import type { Profile, Space } from '@hive/core';

// Utilities
import { cn } from '@hive/ui';
import { formatDate } from '@hive/utilities';
```

### Import Anti-Patterns

```typescript
// ❌ BAD: Don't import from internal paths
import { Button } from '@hive/ui/src/atomic/atoms/button';

// ❌ BAD: Don't import from other apps
import { Component } from 'apps/web/src/components/thing';

// ❌ BAD: Don't import pages into UI package
import { SpacePage } from 'apps/web/src/app/spaces/page';

// ✅ GOOD: Use package imports
import { Button } from '@hive/ui';
```

---

## Migration from Backup Components

We have **46 organisms** and **29 molecules** in `.atomic-backup/` from the pre-shadcn architecture. Here's how to migrate them:

### Migration Process

**Step 1: Audit the Component**
```bash
# Check if component is still needed
grep -r "ComponentName" apps/web/src
```

**Step 2: Refactor to New Architecture**
```typescript
// Old pattern (backup)
export function OldComponent({ data }: Props) {
  return (
    <div className="custom-styles">
      {/* Old implementation */}
    </div>
  );
}

// New pattern (shadcn + campus context)
export function NewComponent({
  data,
  campusContext
}: NewProps) {
  return (
    <Card className="p-4">  {/* shadcn atom */}
      <Avatar src={data.avatar} />  {/* shadcn atom */}

      {/* Add campus context */}
      {campusContext?.mutualConnections && (
        <Badge>{campusContext.mutualConnections} mutual</Badge>
      )}
    </Card>
  );
}
```

**Step 3: Create Storybook Documentation**
```typescript
// Create new story file
// packages/ui/src/Features/[domain]/component-name.stories.tsx
```

**Step 4: Update Imports**
```bash
# Find all usages and update imports
grep -r "old-component-name" apps/web/src
```

**Step 5: Delete Backup**
```bash
# Only after all usages updated
rm packages/ui/src/.atomic-backup/[component]
```

### Priority Migration List

**High Priority (Core Features):**
1. `feed-composer.tsx` → Space composer integration
2. `profile-bento-grid.tsx` → Profile layout
3. `space-creation-modal.tsx` → Space creation flow
4. `onboarding-wizard.tsx` → Onboarding flow

**Medium Priority (Enhanced UX):**
5. `notification-system.tsx` → Notification center
6. `ritual-participation-ui.tsx` → Ritual features
7. `profile-edit-form.tsx` → Profile editing

**Low Priority (Nice to Have):**
8. Widget components (can use molecules instead)
9. Specialized modals (use Dialog compositions)

---

## Design Tokens

**Location:** `packages/tokens/`
**Import:** `@hive/tokens`

### Core Tokens

```typescript
// Colors (CSS variables in globals.css)
--background
--foreground
--card / --card-foreground
--popover / --popover-foreground
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--destructive / --destructive-foreground
--border
--input
--ring
--gold (HIVE accent: #FFD700)

// Spacing
--radius: 0.5rem (border radius)

// Typography
// Uses Geist Sans font family
```

### Using Tokens

```typescript
// In Tailwind classes
className="bg-background text-foreground border-border"

// In custom CSS
background-color: hsl(var(--background));
color: hsl(var(--foreground));

// HIVE gold accent
className="text-[#FFD700] border-[#FFD700]"
```

---

## Testing Standards

### Component Testing

```typescript
// component.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('renders with campus context', () => {
    render(
      <ComponentName
        data={mockData}
        campusContext={{
          mutualConnections: 5,
          sameMajor: "CS"
        }}
      />
    );

    expect(screen.getByText('5 mutual connections')).toBeInTheDocument();
    expect(screen.getByText('CS')).toBeInTheDocument();
  });
});
```

### Accessibility Testing

```typescript
// All components must pass:
- Keyboard navigation
- Screen reader compatibility
- ARIA attributes
- Color contrast (WCAG 2.1 AA)
- Focus management
```

---

## Performance Guidelines

### Code Splitting

```typescript
// Dynamic imports for heavy organisms
const HiveLabBuilder = dynamic(
  () => import('@hive/ui').then(mod => mod.HiveLabBuilderCanvas),
  { loading: () => <Skeleton /> }
);
```

### Memoization

```typescript
// Memoize expensive molecules/organisms
export const CampusUserCard = memo(function CampusUserCard(props) {
  // Component logic
});

// Use useMemo for expensive computations
const sortedMembers = useMemo(
  () => members.sort(bySomeExpensiveLogic),
  [members]
);
```

### Image Optimization

```typescript
// Always use Next.js Image for avatars/photos
import Image from 'next/image';

<Image
  src={user.avatar}
  alt={user.name}
  width={40}
  height={40}
  className="rounded-full"
/>
```

---

## File Organization

```
packages/ui/src/
│
├── atomic/
│   ├── atoms/                    # 63 shadcn components
│   ├── molecules/                # 18 HIVE campus patterns
│   ├── organisms/                # 18 HIVE feature blocks
│   └── templates/                # 1 page layout
│
├── Features/                     # Feature-based organization
│   ├── 01-Auth/
│   ├── 02-Onboarding/
│   ├── 02-Profile/
│   ├── 03-Spaces/
│   ├── 04-Feed/
│   ├── 05-HiveLab/
│   ├── 06-Notifications/
│   ├── 08-Navigation/
│   ├── 09-Spaces/
│   ├── 10-Forms/
│   └── 11-Shared/
│
├── hooks/                        # Shared React hooks
├── styles.css                    # Global styles
└── index.ts                      # Package exports
```

---

## Contribution Guidelines

### Before Creating a Component

1. **Check if it exists** - Search codebase and Storybook
2. **Check shadcn** - Can you use an existing atom?
3. **Check molecules** - Can you compose existing molecules?
4. **Determine layer** - Which layer does this belong to?

### Component Checklist

- [ ] Follows naming convention
- [ ] Uses TypeScript with proper types
- [ ] Composes shadcn atoms (don't modify them)
- [ ] Includes campus context props (if molecule/organism)
- [ ] Has comprehensive Storybook documentation
- [ ] Includes all 5 required stories
- [ ] Passes accessibility tests
- [ ] Mobile responsive
- [ ] Exported from package index

### Code Review Checklist

- [ ] Correct layer placement
- [ ] No shadcn atom modifications
- [ ] Campus context properly used
- [ ] Storybook documentation complete
- [ ] TypeScript types exported
- [ ] Performance considerations addressed
- [ ] Accessibility validated

---

## Version History

**v2.0 (October 2025)** - Current
- Migrated to shadcn/ui foundation
- Established 5-layer architecture
- Created HIVE molecule/organism patterns
- Added campus context standards

**v1.0 (September 2025)**
- Original atomic design system
- Custom component library
- 80+ components in strict atomic structure

---

## Resources

- **Storybook:** http://localhost:6006
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Radix UI Docs:** https://radix-ui.com
- **Tailwind CSS:** https://tailwindcss.com
- **HIVE Spec:** `UI_UX_IA_SPEC.md`
- **Campus Patterns:** `CAMPUS_PATTERNS.md` (next step)

---

## Questions?

Contact the design system team or check:
- **Storybook** for component examples
- **UI_UX_IA_SPEC.md** for product requirements
- **CAMPUS_PATTERNS.md** for behavioral patterns
- **GitHub Discussions** for architecture questions
