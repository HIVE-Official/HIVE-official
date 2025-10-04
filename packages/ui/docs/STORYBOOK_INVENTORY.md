# HIVE Storybook Component Inventory

**Purpose:** Complete inventory of all components needed in Storybook for UX/UX design validation
**Status:** Audit Complete - Ready for Skeleton Creation
**Last Updated:** 2025-10-01

---

## ✅ Existing Components with Stories (62 total)

### Atoms (38 components)
- [x] alert.stories.tsx
- [x] avatar.stories.tsx
- [x] badge.stories.tsx
- [x] button.stories.tsx
- [x] card.stories.tsx
- [x] check-icon.stories.tsx
- [x] checkbox.stories.tsx
- [x] command.stories.tsx
- [x] dialog.stories.tsx
- [x] grid.stories.tsx
- [x] hive-button.stories.tsx
- [x] hive-card.stories.tsx
- [x] hive-confirm-modal.stories.tsx
- [x] hive-input.stories.tsx
- [x] hive-logo-dynamic.stories.tsx
- [x] hive-logo.stories.tsx
- [x] hive-modal.stories.tsx
- [x] hive-progress.stories.tsx
- [x] input-enhanced.stories.tsx
- [x] input.stories.tsx
- [x] label.stories.tsx
- [x] navigation-preferences.stories.tsx
- [x] notification-bell.stories.tsx
- [x] notification-item.stories.tsx
- [x] presence-indicator.stories.tsx
- [x] progress.stories.tsx
- [x] select.stories.tsx
- [x] simple-avatar.stories.tsx
- [x] skeleton.stories.tsx
- [x] skip-nav.stories.tsx
- [x] slider.stories.tsx
- [x] switch.stories.tsx
- [x] tabs.stories.tsx
- [x] tech-sleek-showcase.stories.tsx
- [x] textarea-enhanced.stories.tsx
- [x] textarea.stories.tsx
- [x] top-bar-nav.stories.tsx
- [x] universal-atoms.stories.tsx

### Molecules (12 components)
- [x] completion-psychology-enhancer.stories.tsx
- [x] crisis-relief-interface.stories.tsx
- [x] form-field.stories.tsx
- [x] friend-request-manager.stories.tsx
- [x] hive-avatar-upload-with-crop.stories.tsx
- [x] interest-selector.stories.tsx
- [x] notification-dropdown.stories.tsx
- [x] notification-toast-manager.stories.tsx
- [x] page-container.stories.tsx
- [x] photo-carousel.stories.tsx
- [x] privacy-control.stories.tsx
- [x] social-proof-accelerator.stories.tsx

### Organisms (11 components)
- [x] complete-hive-tools-system.stories.tsx
- [x] hivelab-widget.stories.tsx
- [x] navigation-shell.stories.tsx
- [x] notification-system.stories.tsx
- [x] profile-activity-widget.stories.tsx
- [x] profile-bento-grid.stories.tsx
- [x] profile-completion-card.stories.tsx
- [x] profile-connections-widget.stories.tsx
- [x] profile-identity-widget.stories.tsx
- [x] profile-spaces-widget.stories.tsx
- [x] welcome-mat.stories.tsx

### Templates (1 component)
- [x] profile-view-layout.stories.tsx

---

## 🚨 CRITICAL: Missing Feed Components (15 needed)

### Molecules
- [ ] **feed-post-card.tsx + .stories.tsx** - CRITICAL
  - Skeleton states: text-only, with-image, with-multiple-images, with-video, with-link-preview
  - Show author section, content, engagement buttons
  - Loading, error, empty states

- [ ] **feed-comment.tsx + .stories.tsx**
  - Single comment display
  - Author, content, actions (like, reply)

- [ ] **feed-comment-thread.tsx + .stories.tsx**
  - Nested comment display
  - Show 1 level, 2 levels, 3 levels deep
  - Collapse/expand functionality

- [ ] **feed-search-bar.tsx + .stories.tsx**
  - Search input with filters
  - Suggestions dropdown skeleton
  - Recent searches skeleton

### Organisms
- [ ] **feed-composer.tsx + .stories.tsx** - CRITICAL
  - Text input area
  - Toolbar (photo, video, event, poll buttons)
  - Space selector
  - Privacy selector
  - Submit button
  - States: empty, typing, with-media, submitting, success

- [ ] **feed-post-full.tsx + .stories.tsx** - CRITICAL
  - Complete post with all sections
  - Comment section included
  - All post types (text, image, video, link, event, poll)
  - Edit mode
  - Delete confirmation

- [ ] **feed-filters.tsx + .stories.tsx**
  - Filter tabs (Following, All)
  - Space filters
  - Content type filters
  - Sort options

- [ ] **feed-empty-state.tsx + .stories.tsx**
  - No posts yet state
  - Suggestions to get started

- [ ] **feed-skeleton-loader.tsx + .stories.tsx**
  - Skeleton layout for feed loading
  - Multiple post skeletons

### Templates
- [ ] **feed-layout.stories.tsx** - CRITICAL
  - Desktop: 3-column (left nav, center feed, right suggestions)
  - Mobile: single column with bottom nav
  - Show composer placement
  - Show filter placement

---

## 🚨 CRITICAL: Missing Spaces Components (25+ needed)

### Atoms
- [ ] **space-badge.tsx + .stories.tsx**
  - Category badge
  - Privacy indicator badge
  - Member count badge

### Molecules
- [ ] **space-card.tsx + .stories.tsx** - CRITICAL
  - Browse view card
  - Featured card variant
  - Minimal card variant
  - Show: cover image, icon, name, description, member count, join button
  - States: not-joined, joined, loading, hover

- [ ] **space-card-compact.tsx + .stories.tsx**
  - Smaller version for lists
  - Icon, name, member count

- [ ] **space-member-card.tsx + .stories.tsx**
  - Member display in lists
  - Avatar, name, role badge
  - Actions (view profile, message, promote, remove)

- [ ] **space-event-card.tsx + .stories.tsx**
  - Event display in space
  - Date, time, location, RSVP button

### Organisms
- [ ] **space-header.tsx + .stories.tsx** - CRITICAL
  - Cover image
  - Space icon and name
  - Description
  - Member count, activity stats
  - Join/Leave button
  - Leader indicator
  - Action menu (settings, share, report)
  - Variants: public, private, member-view, leader-view

- [ ] **space-post-feed.tsx + .stories.tsx** - CRITICAL
  - Post composer at top (for members)
  - Filter tabs (All, Announcements, Events)
  - Post list
  - Load more / infinite scroll
  - Empty state
  - Real-time update banner

- [ ] **space-sidebar.tsx + .stories.tsx**
  - About section
  - Member preview (avatars)
  - Recent activity
  - Upcoming events
  - Tools/resources
  - Collapsible sections

- [ ] **space-creation-modal.tsx + .stories.tsx** - CRITICAL
  - Multi-step wizard skeleton
  - Step 1: Basic info (name, description)
  - Step 2: Cover image upload
  - Step 3: Privacy settings
  - Step 4: Categories/tags
  - Step 5: Initial members (optional)
  - Step 6: RSS integration (optional)
  - Step 7: Review & create
  - Progress indicator
  - Navigation buttons

- [ ] **space-settings-modal.tsx + .stories.tsx**
  - Tab navigation
  - General settings tab
  - Privacy settings tab
  - Member management tab
  - RSS integration tab
  - Advanced settings tab
  - Delete space confirmation

- [ ] **space-member-list.tsx + .stories.tsx**
  - List of members with roles
  - Search members
  - Filter by role
  - Sort options
  - Pagination
  - Leader actions (promote, remove, ban)

- [ ] **space-discovery-hub.tsx + .stories.tsx**
  - Featured spaces carousel
  - Recommended spaces section
  - Trending spaces section
  - Browse by category grid
  - Your spaces quick access

- [ ] **space-about-section.tsx + .stories.tsx**
  - Full description
  - Created date, creator
  - Category and tags
  - Rules/guidelines
  - Links and resources

- [ ] **space-events-panel.tsx + .stories.tsx**
  - Upcoming events list
  - Calendar view option
  - Create event button (for leaders)

- [ ] **space-members-panel.tsx + .stories.tsx**
  - Member grid/list
  - Role filters
  - Search

- [ ] **space-resources-panel.tsx + .stories.tsx**
  - Pinned posts
  - Important links
  - Files/resources

- [ ] **space-leader-toolbar.tsx + .stories.tsx**
  - Quick actions for leaders
  - Pin post, create event, manage members
  - Settings access

### Templates
- [ ] **space-page-layout.stories.tsx** - CRITICAL
  - Header + tabs + content + sidebar layout
  - Posts tab view
  - Events tab view
  - Members tab view
  - About tab view
  - Leader view vs member view
  - Mobile responsive layout

- [ ] **space-browse-layout.stories.tsx** - CRITICAL
  - Filter sidebar + space grid layout
  - Search bar at top
  - Category filters
  - Space cards in grid
  - Mobile: filters in bottom sheet

---

## 🚨 CRITICAL: Missing Rituals Components (8+ needed)

### Molecules
- [ ] **ritual-card.tsx + .stories.tsx** - CRITICAL
  - Browse view card
  - Name, icon, description
  - Duration and schedule
  - Participation stats
  - Progress bar (community)
  - Leaderboard preview (top 3)
  - Reward display
  - Join button
  - States: active, joined, completed, upcoming

- [ ] **ritual-progress-tracker.tsx + .stories.tsx**
  - Your progress display
  - Daily goals checklist
  - Weekly progress bar
  - Overall completion percentage

- [ ] **ritual-streak-counter.tsx + .stories.tsx**
  - Streak display (fire icon + number)
  - Calendar view of check-ins
  - Longest streak

- [ ] **ritual-reward-display.tsx + .stories.tsx**
  - Reward icon and description
  - Points value
  - Earned vs not earned state

- [ ] **ritual-check-in-button.tsx + .stories.tsx**
  - Large prominent button
  - States: ready, checking-in, success, already-checked-in
  - Success animation (checkmark, confetti)

### Organisms
- [ ] **ritual-participation-ui.tsx + .stories.tsx** - CRITICAL
  - Check-in button (main action)
  - Progress tracker
  - Streak counter
  - Points earned
  - Next milestone
  - Leaderboard position
  - Rewards earned section
  - Share achievement button
  - States: before check-in, checking in, success, already checked in

- [ ] **ritual-leaderboard.tsx + .stories.tsx**
  - Top 3 podium display
  - Rank list (4-100)
  - User's position highlighted
  - Avatar, name, points for each
  - Filter: friends, campus, all
  - Time period: today, week, all-time

- [ ] **ritual-creation-modal.tsx + .stories.tsx**
  - Create ritual form
  - Name, description, icon
  - Schedule and duration
  - Goals and milestones
  - Rewards configuration
  - Preview

### Templates
- [ ] **ritual-page-layout.stories.tsx**
  - Header with ritual info
  - Tabs: Overview, Leaderboard, My Progress
  - Main content area
  - Right sidebar (stats, milestones)
  - Mobile responsive

---

## ⚠️ Missing Profile Components (10 needed)

### Molecules
- [ ] **profile-stat-card.tsx + .stories.tsx**
  - Single stat display (posts, connections, spaces)
  - Icon, number, label
  - Clickable to view details

- [ ] **profile-bio-editor.tsx + .stories.tsx**
  - Editable bio field
  - Character counter
  - Rich text formatting (optional)

- [ ] **profile-social-links.tsx + .stories.tsx**
  - Display social media links
  - Icons for each platform
  - Add/edit/remove links

### Organisms
- [ ] **profile-header.tsx + .stories.tsx** - IMPORTANT
  - Cover photo (optional, editable)
  - Large avatar (editable)
  - Name and handle
  - Bio
  - Stats row (connections, spaces, posts)
  - Action buttons (Edit, Share, Connect, Message)
  - Status indicator (online/offline)
  - Variants: own-profile, other-user, connected-user

- [ ] **profile-edit-form.tsx + .stories.tsx** - IMPORTANT
  - Personal info section (name, handle, bio)
  - Contact info (email - read-only)
  - Social links editor
  - Interests editor
  - Privacy settings
  - Validation
  - Save/cancel buttons
  - Unsaved changes warning

- [ ] **profile-connections-list.tsx + .stories.tsx**
  - Grid of connection cards
  - Search connections
  - Filter (all, mutual, pending)
  - Sort options

- [ ] **profile-activity-timeline.tsx + .stories.tsx**
  - Timeline of user activity
  - Posts, comments, spaces joined, tools created
  - Load more
  - Empty state

- [ ] **profile-stats-dashboard.tsx + .stories.tsx**
  - Detailed stats view
  - Charts and graphs
  - Engagement metrics
  - Growth over time

- [ ] **profile-calendar-view.tsx + .stories.tsx**
  - Calendar with user's events
  - Space events
  - Ritual check-ins
  - Month/week view

- [ ] **profile-tools-widget.tsx + .stories.tsx**
  - Display user's HiveLab tools
  - Tool cards in grid
  - Create tool button
  - View all link

---

## ⚠️ Missing Onboarding Components (6 needed)

### Molecules
- [ ] **onboarding-step-indicator.tsx + .stories.tsx**
  - Progress dots/bars
  - Current step highlighted
  - Completed steps indicator

- [ ] **onboarding-email-verification.tsx + .stories.tsx**
  - Email input
  - Verification code input
  - Resend code button
  - Success state

### Organisms
- [ ] **onboarding-wizard.tsx + .stories.tsx** - IMPORTANT
  - Multi-step container
  - Progress indicator at top
  - Step content area
  - Navigation buttons (Next, Back, Skip)
  - Step validation
  - All 7 steps integrated

- [ ] **onboarding-profile-setup.tsx + .stories.tsx**
  - Name input
  - Handle input
  - Bio textarea
  - Profile photo upload
  - Validation

- [ ] **onboarding-connection-suggestions.tsx + .stories.tsx**
  - Grid of user cards
  - Quick connect buttons
  - Skip option
  - No suggestions state

- [ ] **onboarding-space-recommendations.tsx + .stories.tsx**
  - Grid of space cards
  - Quick join buttons
  - Browse all link
  - No recommendations state

### Templates
- [ ] **onboarding-layout.stories.tsx**
  - Full-screen layout
  - Progress at top
  - Step content centered
  - Navigation at bottom
  - Mobile optimized
  - Exit confirmation modal

---

## ⚠️ Missing HiveLab Components (5 needed)

### Organisms
- [ ] **tool-builder-canvas.tsx + .stories.tsx**
  - Drag-drop canvas area
  - Grid/snap guides
  - Element selection
  - Zoom controls

- [ ] **tool-builder-palette.tsx + .stories.tsx**
  - Element palette sidebar
  - Categories (inputs, outputs, logic, UI)
  - Drag elements to canvas
  - Search elements

- [ ] **tool-builder-properties.tsx + .stories.tsx**
  - Properties panel for selected element
  - Form fields for configuration
  - Validation
  - Help text

- [ ] **tool-runtime-executor.tsx + .stories.tsx**
  - Tool execution interface
  - Input fields (based on tool config)
  - Run button
  - Output display area
  - States: ready, running, success, error

- [ ] **tool-browse-grid.tsx + .stories.tsx**
  - Grid of tool cards
  - Search and filters
  - Sort options
  - Install/run buttons

---

## 📊 Summary Statistics

### Existing (Done)
- ✅ **62 components** with stories
- ✅ **38 atoms** complete
- ✅ **12 molecules** complete
- ✅ **11 organisms** complete
- ✅ **1 template** complete

### Needed (To Create)
- 🚨 **Feed:** 15 components (10 organisms, 4 molecules, 1 template)
- 🚨 **Spaces:** 25 components (14 organisms, 5 molecules, 3 atoms, 2 templates)
- 🚨 **Rituals:** 8 components (3 organisms, 5 molecules, 1 template)
- ⚠️ **Profile:** 10 components (6 organisms, 3 molecules, 1 existing template to enhance)
- ⚠️ **Onboarding:** 6 components (4 organisms, 2 molecules, 1 template)
- ⚠️ **HiveLab:** 5 components (5 organisms)

### Total Components in Complete System
- **Current:** 62 components
- **Needed:** 69 new components
- **Total:** 131 components in Storybook

---

## 🎯 Creation Priority

### Phase 1: Critical Path (Feed, Spaces, Rituals)
1. Feed Post Card + Story (molecule)
2. Feed Composer + Story (organism)
3. Feed Layout + Story (template)
4. Space Card + Story (molecule)
5. Space Header + Story (organism)
6. Space Post Feed + Story (organism)
7. Space Page Layout + Story (template)
8. Space Creation Modal + Story (organism)
9. Ritual Card + Story (molecule)
10. Ritual Participation UI + Story (organism)

### Phase 2: Important (Profile, Onboarding)
11. Profile Header + Story (organism)
12. Profile Edit Form + Story (organism)
13. Onboarding Wizard + Story (organism)
14. Onboarding Layout + Story (template)

### Phase 3: Secondary (HiveLab, Additional Features)
15. Tool Builder + Story (organism)
16. Tool Runtime + Story (organism)
17. Remaining molecules
18. Remaining organisms
19. Remaining templates

---

## 📝 Story Requirements for Each Component

**Every story file must include:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta = {
  title: 'XX-Feature/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'fullscreen' or 'padded'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Required stories:
export const Default: Story = {
  args: {},
};

export const AllStates: Story = {
  render: () => (
    <div>
      {/* Show all states */}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Error message',
  },
};

export const Empty: Story = {
  args: {
    // Empty state
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```

---

## 🚀 Next Steps

1. **Create skeleton components** for all missing components
2. **Create story files** for each component showing structure
3. **Launch Storybook** to view all components
4. **Manual review** through Storybook to decide on actual UI/UX
5. **Iterate** on design based on review
6. **Implement** final designs
7. **Validate** all components pass quality checklist

---

**Remember:** These are SKELETON components - structure and states only, not final UI/UX. The design will be decided during Storybook review.
