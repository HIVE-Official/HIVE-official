# HIVE Spaces - Component System

Canonical version: V5 (discussion-first). Any references to V1/V2 in adjacent docs are historical context only. Consume all Spaces components via `@hive/ui` exports; deep imports are not supported in apps and are linted.

**Tech Sleek Monochrome Design System** for the Spaces feature in HIVE.

## 🎨 Design Philosophy

**Tech Sleek Monochrome** - Apple/Vercel/Resend Aesthetic

- **Solid Foundations**: Clean backgrounds, crisp borders, high contrast
- **No Glass Effects**: No backdrop-blur or transparency - solid and intentional
- **Fluid Interactions**: Every element is alive - hover, scale, translate, shadow
- **Micro-animations**: Subtle icon rotations, scale transforms, smooth transitions
- **Feed Experience**: Social content stream, not a bulletin board
- **Active Feedback**: Click = scale down, hover = elevate and glow

## 📦 Component Architecture

### Layout & Structure

#### `SpaceLayout`

60/40 responsive layout with sticky header

- **Props**: `header`, `feed`, `contextRail` (term: Dock; code name remains `ContextRail` for now)
- **Responsive**: Collapses to single column on mobile

#### `SpaceHeader`

Identity bar with space avatar, name, type, join state

- **Join States**: not_member, pending, member, invite_required, unclaimed
- **Actions**: Join, Share, Report, Overflow menu

#### Dock (right-side)

Right-side Dock with Calendar, Members, and About widgets (legacy code name: `ContextRail`)

- **Sections**: CalendarPreview, MembersPreview, AboutPreview
- **Interactive**: Clickable events, member cards with hover states

### Feed Components

#### `FeedCard` (Base Component)

Shared layout for all post types with interactive states

- **Hover**: Shadow + border highlight
- **Actions**: Comment (blue hover), React (red hover), Pin
- **States**: Pinned (left border), Hidden (reduced opacity)

#### Feed Card Variants

All extend `FeedCard` with type-specific content:

1. **BoardCardStandard** - Text, media, and link posts
2. **BoardCardEvent** - RSVP, check-in, event details
3. **BoardCardPoll** - Voting with real-time results
4. **BoardCardForm** - Form submissions
5. **BoardCardAnnouncement** - Leader announcements with priority
6. **BoardCardTracker** - Counter/tracker tools
7. **BoardCardDigest** - Bundled auto-posts

#### `PinnedCluster`

Container for up to 2 pinned posts at feed top

- **Displays**: Pinned badge, count, optional expiration

#### `ComposerActions`

Post creation toolbar with policy-aware actions

- **Interactive Input**: Hover effect on composer trigger
- **Actions**: Text, Event, Poll, Form, Announcement (leaders)
- **Policies**: leaders_only, members, request

### Calendar Module

#### `CalendarMonth`

Monthly grid view with event indicators

- **Navigation**: Previous/Next month, Today button
- **Interactive**: Day cells highlight on hover, event dots

#### `CalendarList`

Chronological event list with grouping

- **Groups**: Today, Tomorrow, This Week, This Month
- **Quick Actions**: RSVP buttons inline
- **Interactive**: Event cards with hover states

#### `EventDetail`

Full event page with RSVP and check-in

- **RSVP**: Going, Maybe, Can't Go
- **Check-in**: Window-based with QR code
- **Host View**: Attendee stats, management actions

### Members Module

#### `MembersRoster`

Full member list with search and filters

- **Search**: By name or handle
- **Filters**: Role-based (all, leader, moderator, member)
- **Sort**: Name, Role, Joined date
- **Interactive**: Member cards with hover → profile view
- **Bulk Actions**: Promote, Remove (leaders only)

### About Module

#### `AboutSection`

Space information with edit mode

- **View Mode**: Description, tags, links, metadata, leadership
- **Edit Mode**: Inline editing for leaders
- **Interactive**: Add/remove tags and links on the fly

## 🎯 shadcn/ui Integration

All components use shadcn primitives:

- **`Button`** - All interactive actions
- **`Card`**, **`CardHeader`**, **`CardContent`** - Content containers
- **`Input`** - Search, forms, inline editing
- **`Badge`** - Status indicators, tags, counts
- **`Avatar`** - User and space avatars

## 🎨 Interactive States

### Hover Effects

- **Feed Cards**: Shadow + border glow
- **Buttons**: Background color + icon color shift
- **Event Cards**: Border highlight + title color change
- **Member Cards**: Background + name color shift
- **Composer**: Border glow + text color change

### Transitions

- All interactive elements: `transition-all duration-200 ease-in-out`
- Consistent timing across the system

### Click Feedback

- **Comment**: Hover → blue accent
- **React**: Hover → red accent
- **Primary Actions**: Hover → gold accent

## 📖 Storybook Coverage

Stories for every component and state:

- `Spaces/Composition/Full Board` - Complete feed layout
- `Spaces/Header` - All join states
- `Spaces/BoardCard/[Variant]` - Each post type
- `Spaces/Pinned Cluster` - Pinned posts
- `Spaces/Composer Actions` - Post creation
- `Spaces/Calendar` - Month, List, Event Detail
- `Spaces/Members` - Member roster
- `Spaces/About` - View and edit modes
- `Spaces/Dock` - Sidebar widgets (formerly `Spaces/Context Rail`)

## 🚀 Usage Example

```tsx
import {
  SpaceLayout,
  SpaceHeader,
  FeedCard,
  BoardCardStandard,
  PinnedCluster,
  ComposerActions,
  ContextRail,
} from "@hive/ui";

function SpacePage({ space, posts, events, members }) {
  return (
    <SpaceLayout
      header={
        <SpaceHeader
          space={space}
          joinState="member"
          onJoin={() => {
            /* ... */
          }}
        />
      }
      feed={
        <>
          <PinnedCluster>{/* Pinned posts */}</PinnedCluster>

          <ComposerActions
            userName="Current User"
            userRole="member"
            postingPolicy="members"
            onCreatePost={() => {
              /* ... */
            }}
          />

          <div className="space-y-6">
            {posts.map((post) => (
              <BoardCardStandard key={post.id} post={post} />
            ))}
          </div>
        </>
      }
      contextRail={
        <ContextRail
          calendar={{ events, canCreateEvents: false }}
          members={{ members, totalCount: space.memberCount }}
          about={{
            description: space.description,
            tags: space.tags,
            featuredLinks: space.featuredLinks,
            isVerified: space.isVerified,
            spaceType: "Student Organization",
          }}
        />
      }
    />
  );
}
```

## 🎨 Design Tokens

All components respect HIVE design tokens:

- **Colors**: `bg-card`, `border-border`, `text-primary`, `text-muted-foreground`
- **Typography**: `text-h3`, `font-h3`, `text-body`, `font-body`, `text-caption`
- **Spacing**: Consistent `gap-2`, `gap-4`, `gap-6`, `p-4`, `py-6`
- **Interactive**: `hover:shadow-md`, `hover:border-primary/30`, `transition-all`

## 🔐 Security & Permissions

Role-based UI rendering:

- **Member**: View, comment, react
- **Moderator**: + Promote members, hide posts
- **Leader**: + Edit space, create announcements, manage everything

Policy-aware composer:

- **leaders_only**: Only leaders see composer
- **members**: All members can post
- **request**: Approved members can post

## ♿ Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation on all interactive elements
- Screen reader friendly
- High contrast mode compatible
- Focus indicators on all interactive elements

## 📱 Responsive Design

- **Desktop** (lg): 60/40 split with sticky Dock
- **Tablet** (md): Adjusted spacing, single column option
- **Mobile** (sm): Single column, collapsible sections

---

**Built with**: React 19, TypeScript 5.8, Tailwind CSS 3.5, shadcn/ui, Radix UI

**Design System**: HIVE Tech Sleek Monochrome
