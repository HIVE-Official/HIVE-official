# HIVE Storybook Checklist
**Component Props, States, and Stories Reference**

> **Purpose**: Wire components without guesswork. Every state documented, every prop specified.

---

## 1. Composer (S4 Slot)

### Component: `<Composer />`

**Location**: `packages/ui/src/atomic/organisms/composer.tsx`

### Props Interface
```typescript
interface ComposerProps {
  // Context
  mode: 'space' | 'feed' | 'reply';           // Where is this composer?
  spaceId?: string;                            // If mode='space'
  parentPostId?: string;                       // If mode='reply'

  // Visibility
  defaultVisibility: 'space' | 'campus';       // Default visibility choice
  allowVisibilityToggle: boolean;              // Can user change visibility?

  // Tool Picker
  availableTools: ToolAction[];                // Max 6 tools
  onToolSelect: (tool: ToolAction) => void;    // Tool selected callback

  // Content
  placeholder?: string;                        // Textarea placeholder
  maxLength?: number;                          // Character limit (default: 500)

  // Media
  allowMedia: boolean;                         // Enable image/video upload
  maxMediaFiles?: number;                      // Max files (default: 4)

  // Scheduling
  allowScheduling?: boolean;                   // Enable post scheduling

  // Callbacks
  onSubmit: (content: ComposerSubmission) => void;
  onCancel?: () => void;
  onDraft?: (content: string) => void;         // Auto-save draft

  // State
  isSubmitting?: boolean;
  error?: string;

  // Styling
  className?: string;
  expanded?: boolean;                          // Start expanded or collapsed
}

interface ToolAction {
  id: string;
  label: string;                               // "Poll", "Event", "RSVP"
  icon: React.ReactNode;
  disabled?: boolean;
}

interface ComposerSubmission {
  content: string;
  visibility: 'space' | 'campus';
  mediaUrls?: string[];
  scheduledFor?: Date;
  toolId?: string;                             // If tool selected
  toolData?: Record<string, any>;
}
```

### States to Cover

#### 1. Collapsed (Default)
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={[]}
  allowMedia={true}
  expanded={false}
  onSubmit={handleSubmit}
/>
```
**Visual**: Single-line "What's on your mind?" with avatar

#### 2. Expanded (Typing)
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={mockTools} // 6 tools max
  allowMedia={true}
  expanded={true}
  onSubmit={handleSubmit}
/>
```
**Visual**: Multi-line textarea, tool picker grid visible, visibility toggle, media upload

#### 3. With Tool Selected (Poll)
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={mockTools}
  allowMedia={false} // Disabled when tool active
  expanded={true}
  onSubmit={handleSubmit}
  onToolSelect={(tool) => console.log('Selected:', tool)}
/>
```
**Visual**: Tool configuration panel replaces media upload area

#### 4. Submitting State
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={mockTools}
  allowMedia={true}
  expanded={true}
  isSubmitting={true}
  onSubmit={handleSubmit}
/>
```
**Visual**: Submit button shows loading spinner, form disabled

#### 5. Error State
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={mockTools}
  allowMedia={true}
  expanded={true}
  error="Failed to upload image. Please try again."
  onSubmit={handleSubmit}
/>
```
**Visual**: Red error banner above submit button

#### 6. Feed Mode (Campus Visibility)
```tsx
<Composer
  mode="feed"
  defaultVisibility="campus"
  allowVisibilityToggle={false} // Campus only
  availableTools={[]}
  allowMedia={true}
  expanded={true}
  onSubmit={handleSubmit}
/>
```
**Visual**: No Space context, campus-wide visibility locked

#### 7. Reply Mode
```tsx
<Composer
  mode="reply"
  parentPostId="post-123"
  defaultVisibility="space" // Inherits from parent
  allowVisibilityToggle={false}
  availableTools={[]} // No tools in replies
  allowMedia={true}
  expanded={true}
  placeholder="Write a reply..."
  onSubmit={handleSubmit}
/>
```
**Visual**: Compact mode, no tool picker, simpler UI

#### 8. Mobile View
```tsx
<Composer
  mode="space"
  spaceId="photography-club"
  defaultVisibility="space"
  allowVisibilityToggle={true}
  availableTools={mockTools}
  allowMedia={true}
  expanded={true}
  onSubmit={handleSubmit}
  className="mobile-viewport"
/>
```
**Visual**: Full-screen on mobile, tool picker becomes bottom sheet

### Cognitive Caps
- **Max tools**: 6 actions in picker grid
- **Max media**: 4 files
- **Max character**: 500 (show count at 400+)
- **Tool complexity**: Max 2 actions per tool post

### Interaction Timeline
```
1. Click collapsed composer (120ms expand animation)
2. Textarea auto-focuses
3. Type content (draft auto-saves every 2s)
4. Select tool (160ms tool panel slide in)
5. Configure tool (< 12 fields, UX Law)
6. Toggle visibility (explicit choice, gold highlight)
7. Upload media (progress bar, blur-up preview)
8. Click Submit (100ms button feedback)
9. Post animates into Stream (240ms slide up)
```

---

## 2. PostCard (S3 Stream)

### Component: `<PostCard />`

**Location**: `packages/ui/src/atomic/atoms/post-card.tsx` (already animated!)

### Props Interface
```typescript
interface PostCardProps {
  // Content
  post: {
    id: string;
    authorId: string;
    authorName: string;
    authorHandle: string;
    authorAvatar?: string;
    authorRole?: 'student' | 'leader' | 'admin';

    content: string;                           // Post body
    mediaUrls?: string[];                      // Images/videos

    createdAt: Date;

    // Context
    spaceId?: string;
    spaceName?: string;
    spaceAccentColor?: string;

    visibility: 'space' | 'campus';

    // Engagement
    upvotes: number;
    commentCount: number;
    repostCount?: number;
    shareCount?: number;

    // User state
    isUpvoted: boolean;
    isReposted?: boolean;
    isSaved?: boolean;
  };

  // Tool Integration
  tool?: {
    type: 'poll' | 'rsvp' | 'form' | 'counter';
    data: any;                                 // Tool-specific data
    actions: ToolAction[];                     // Max 2 actions
  };

  // Explainability
  feedReason?: {
    type: 'space_membership' | 'interest_match' | 'trending' | 'promoted';
    label: string;                             // "You're in Photography Club"
  };

  // Callbacks
  onUpvote: () => void;
  onComment: () => void;
  onRepost?: () => void;
  onShare: () => void;
  onAuthorClick: (userId: string) => void;
  onSpaceClick?: (spaceId: string) => void;
  onMoreOptions: () => void;

  // Display
  variant?: 'feed' | 'space' | 'profile';      // Context-specific styling
  showExplainability?: boolean;                // Feed only

  // State
  isLoading?: boolean;

  className?: string;
}
```

### States to Cover

#### 1. Standard Text Post
```tsx
<PostCard
  post={{
    id: 'post-1',
    authorId: 'user-123',
    authorName: 'Sarah Chen',
    authorHandle: '@sarahchen',
    authorAvatar: '/avatars/sarah.jpg',
    content: 'Just captured this amazing sunset at Lake LaSalle! 🌅',
    createdAt: new Date(),
    spaceId: 'photography-club',
    spaceName: 'Photography Club',
    visibility: 'space',
    upvotes: 24,
    commentCount: 5,
    isUpvoted: false
  }}
  variant="feed"
  showExplainability={true}
  feedReason={{
    type: 'space_membership',
    label: "You're in Photography Club"
  }}
  onUpvote={handleUpvote}
  onComment={handleComment}
  onShare={handleShare}
  onAuthorClick={handleAuthorClick}
  onSpaceClick={handleSpaceClick}
  onMoreOptions={handleMoreOptions}
/>
```

#### 2. Post with Images (1-4 images)
```tsx
<PostCard
  post={{
    ...basePost,
    content: 'Photo dump from this weekend! Which one should I print?',
    mediaUrls: [
      '/media/photo1.jpg',
      '/media/photo2.jpg',
      '/media/photo3.jpg',
      '/media/photo4.jpg'
    ]
  }}
  {...handlers}
/>
```
**Visual**: Grid layout (1 img = 16:9, 2 imgs = side-by-side, 3-4 imgs = 2x2 grid)

#### 3. Post with Poll Tool
```tsx
<PostCard
  post={{
    ...basePost,
    content: 'Which lens should I buy next?'
  }}
  tool={{
    type: 'poll',
    data: {
      options: [
        { id: '1', label: '50mm f/1.8', votes: 12 },
        { id: '2', label: '24-70mm f/2.8', votes: 18 },
        { id: '3', label: '70-200mm f/4', votes: 7 }
      ],
      totalVotes: 37,
      userVote: '2',
      endsAt: new Date(Date.now() + 86400000) // 24h from now
    },
    actions: [
      { id: 'vote', label: 'Vote', disabled: false },
      { id: 'results', label: 'See Results', disabled: false }
    ]
  }}
  {...handlers}
/>
```
**Visual**: Poll results bars embedded in card, max 2 actions (Vote + Results)

#### 4. Post with RSVP Tool (Event)
```tsx
<PostCard
  post={{
    ...basePost,
    content: 'Sunset Photography Walk this Saturday at 6pm!'
  }}
  tool={{
    type: 'rsvp',
    data: {
      eventTime: new Date('2025-11-05T18:00:00'),
      location: 'Lake LaSalle, North Campus',
      capacity: 20,
      attendees: 12,
      userStatus: null // 'going' | 'interested' | 'not_going' | null
    },
    actions: [
      { id: 'rsvp', label: 'RSVP', disabled: false }
    ]
  }}
  {...handlers}
/>
```
**Visual**: Event details card with time/location, RSVP button, capacity counter

#### 5. Upvoted State
```tsx
<PostCard
  post={{
    ...basePost,
    isUpvoted: true,
    upvotes: 25
  }}
  {...handlers}
/>
```
**Visual**: Upvote button gold (#FFD700), count updated

#### 6. Loading State (Optimistic Update)
```tsx
<PostCard
  post={basePost}
  isLoading={true}
  {...handlers}
/>
```
**Visual**: Subtle opacity reduction, spinner on active action

#### 7. Campus-Wide Post (Feed)
```tsx
<PostCard
  post={{
    ...basePost,
    visibility: 'campus',
    spaceId: undefined,
    spaceName: undefined
  }}
  variant="feed"
  showExplainability={true}
  feedReason={{
    type: 'trending',
    label: 'Popular on campus today'
  }}
  {...handlers}
/>
```
**Visual**: No Space chip, "Campus" badge, explainability chip prominent

#### 8. Space Board Context
```tsx
<PostCard
  post={{
    ...basePost,
    visibility: 'space'
  }}
  variant="space"
  showExplainability={false} // No explainability in Space context
  {...handlers}
/>
```
**Visual**: No explainability chip, Space context implicit

#### 9. Profile Timeline Context
```tsx
<PostCard
  post={{
    ...basePost
  }}
  variant="profile"
  showExplainability={false}
  {...handlers}
/>
```
**Visual**: Compact mode, Space chip included for context

#### 10. Long Content (Truncation)
```tsx
<PostCard
  post={{
    ...basePost,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }}
  {...handlers}
/>
```
**Visual**: Truncate at 2 lines, "Read more" link expands

### Cognitive Caps
- **1 primary CTA**: Dominant action based on tool type
- **≤2 tool actions**: Vote + Results, RSVP only, etc.
- **Max 2 lines body text**: Before "Read more"
- **Max 4 images**: Grid layout

### Interaction Timeline
```
1. Card enters viewport (scroll trigger, 400ms fade up + stagger)
2. Hover card (120ms lift -2px)
3. Click Upvote (100ms scale 0.95 → 1.05, gold fill)
4. Click tool action (160ms sheet slide up)
5. Click author/space (120ms navigate to profile/space)
```

---

## 3. EventSheet (Z1 Overlay)

### Component: `<EventSheet />`

**Location**: `packages/ui/src/atomic/organisms/event-sheet.tsx` (to be created)

### Props Interface
```typescript
interface EventSheetProps {
  // Event Data
  event: {
    id: string;
    title: string;
    description?: string;

    // Time & Place
    startTime: Date;
    endTime?: Date;
    location: string;
    locationUrl?: string;                      // Google Maps link

    // Host
    hostSpaceId: string;
    hostSpaceName: string;
    hostSpaceAccentColor?: string;
    coHosts?: Array<{
      spaceId: string;
      spaceName: string;
    }>;

    // Capacity
    capacity?: number;
    attendees: Array<{
      userId: string;
      userName: string;
      userAvatar?: string;
      status: 'going' | 'interested';
    }>;

    // Media
    coverImage?: string;

    // State
    status: 'upcoming' | 'live' | 'ended';

    // User State
    userRsvp?: 'going' | 'interested' | 'not_going' | null;
    hasCheckedIn?: boolean;
  };

  // Features
  enableChat?: boolean;                        // Event chat (future)
  enableCheckIn?: boolean;                     // Check-in during live window

  // Callbacks
  onRsvp: (status: 'going' | 'interested' | 'not_going') => void;
  onCheckIn?: () => void;
  onShare: () => void;
  onClose: () => void;
  onSpaceClick: (spaceId: string) => void;
  onAttendeeClick: (userId: string) => void;

  // Sheet Controls
  isOpen: boolean;

  className?: string;
}
```

### States to Cover

#### 1. Upcoming Event (T > 1 hour)
```tsx
<EventSheet
  event={{
    id: 'event-123',
    title: 'Sunset Photography Walk',
    description: 'Join us for a guided photography walk around Lake LaSalle. Bring your camera and creativity!',
    startTime: new Date(Date.now() + 86400000), // Tomorrow
    endTime: new Date(Date.now() + 90000000),   // Tomorrow + 1h
    location: 'Lake LaSalle, North Campus',
    locationUrl: 'https://maps.google.com/?q=Lake+LaSalle',
    hostSpaceId: 'photography-club',
    hostSpaceName: 'Photography Club',
    capacity: 20,
    attendees: mockAttendees, // 12 users
    coverImage: '/events/sunset-walk.jpg',
    status: 'upcoming',
    userRsvp: null
  }}
  enableChat={false}
  enableCheckIn={false}
  isOpen={true}
  onRsvp={handleRsvp}
  onShare={handleShare}
  onClose={handleClose}
  onSpaceClick={handleSpaceClick}
  onAttendeeClick={handleAttendeeClick}
/>
```
**Visual**: Cover image, time/location prominent, RSVP buttons, attendee list

#### 2. User RSVP'd as "Going"
```tsx
<EventSheet
  event={{
    ...upcomingEvent,
    userRsvp: 'going'
  }}
  {...handlers}
/>
```
**Visual**: "Going" button highlighted gold, "Add to Calendar" option visible

#### 3. Live Event (T–1h to T+endTime)
```tsx
<EventSheet
  event={{
    ...upcomingEvent,
    startTime: new Date(Date.now() - 600000),  // Started 10 min ago
    status: 'live',
    userRsvp: 'going'
  }}
  enableCheckIn={true}
  {...handlers}
/>
```
**Visual**: "Now" chip (orange pulse), "Check In" button prominent

#### 4. User Checked In
```tsx
<EventSheet
  event={{
    ...liveEvent,
    hasCheckedIn: true
  }}
  enableCheckIn={true}
  {...handlers}
/>
```
**Visual**: "Checked In" badge (green), confetti animation on check-in action

#### 5. Event at Capacity
```tsx
<EventSheet
  event={{
    ...upcomingEvent,
    capacity: 20,
    attendees: mock20Attendees, // Full capacity
    userRsvp: null
  }}
  {...handlers}
/>
```
**Visual**: "Event Full" message, "Join Waitlist" option

#### 6. Ended Event (with Recap)
```tsx
<EventSheet
  event={{
    ...upcomingEvent,
    status: 'ended',
    userRsvp: 'going',
    hasCheckedIn: true
  }}
  enableCheckIn={false}
  {...handlers}
/>
```
**Visual**: "Event Ended" badge, link to recap post in Feed, attendee photos

#### 7. Co-Hosted Event
```tsx
<EventSheet
  event={{
    ...upcomingEvent,
    coHosts: [
      { spaceId: 'sustainability-club', spaceName: 'Sustainability Club' },
      { spaceId: 'outdoor-adventure', spaceName: 'Outdoor Adventure' }
    ]
  }}
  {...handlers}
/>
```
**Visual**: Multiple Space badges, "Co-hosted by..." label

#### 8. Mobile View (Full-Screen Sheet)
```tsx
<EventSheet
  event={upcomingEvent}
  isOpen={true}
  {...handlers}
  className="mobile-viewport"
/>
```
**Visual**: Full-screen on mobile, swipe-down to close gesture

### Cognitive Caps
- **1 primary CTA**: RSVP (upcoming), Check In (live), View Recap (ended)
- **Max 3 tabs**: Details, Attendees, Chat (if enabled)
- **Attendee list**: Show 10, "View all X attendees" link

### Interaction Timeline
```
1. Card tap opens sheet (240ms slide up from bottom)
2. Scrim fades in (240ms opacity 0 → 0.5)
3. RSVP button tap (100ms scale feedback, gold fill)
4. Check-in success (240ms confetti burst, green badge)
5. Swipe down to close (200ms slide down, scrim fade out)
```

---

## 4. Rail Widgets (R Slot, Desktop Only)

### Component: `<RailWidget />`

**Location**: `packages/ui/src/atomic/molecules/rail-widget.tsx` (to be created)

### Props Interface
```typescript
interface RailWidgetProps {
  // Widget Type
  type: 'now' | 'upcoming' | 'members' | 'tools' | 'analytics';

  // Content
  title: string;
  data: RailWidgetData;

  // Actions
  primaryAction?: {
    label: string;
    onClick: () => void;
  };

  // Callbacks
  onItemClick?: (itemId: string) => void;
  onDismiss?: () => void;                      // Close widget

  // State
  isLoading?: boolean;
  isEmpty?: boolean;

  className?: string;
}

type RailWidgetData =
  | NowWidgetData
  | UpcomingWidgetData
  | MembersWidgetData
  | ToolsWidgetData
  | AnalyticsWidgetData;

interface NowWidgetData {
  type: 'event' | 'tool_deadline' | 'ritual';
  title: string;
  subtitle: string;                            // Time remaining, location
  image?: string;
  progress?: number;                           // 0-100 for tool/ritual
  action: {
    label: string;                             // "Join Now", "Submit", "RSVP"
    onClick: () => void;
  };
}
```

### States to Cover

#### 1. "Now" Widget (Live Event)
```tsx
<RailWidget
  type="now"
  title="Happening Now"
  data={{
    type: 'event',
    title: 'Study Break Yoga',
    subtitle: 'Started 5 min ago • Student Union',
    image: '/events/yoga.jpg',
    action: {
      label: 'Join Now',
      onClick: handleJoinEvent
    }
  }}
  onDismiss={handleDismiss}
/>
```
**Visual**: Orange "Now" pulse, event image, countdown, prominent CTA

#### 2. "Now" Widget (Tool Deadline)
```tsx
<RailWidget
  type="now"
  title="Closing Soon"
  data={{
    type: 'tool_deadline',
    title: 'Week 12 Study Buddy Poll',
    subtitle: 'Closes in 2 hours',
    progress: 68,                              // 68% response rate
    action: {
      label: 'Vote Now',
      onClick: handleVoteTool
    }
  }}
/>
```
**Visual**: Progress ring, urgency color, countdown

#### 3. "Now" Widget (Active Ritual)
```tsx
<RailWidget
  type="now"
  title="Campus Ritual"
  data={{
    type: 'ritual',
    title: 'Study Break Week',
    subtitle: 'Day 3 of 5 • 847 students joined',
    image: '/rituals/study-break.jpg',
    progress: 60,                              // Day 3/5
    action: {
      label: 'Join Ritual',
      onClick: handleJoinRitual
    }
  }}
/>
```
**Visual**: Ritual theme image, progress bar, participation count

#### 4. "Upcoming" Widget (Events)
```tsx
<RailWidget
  type="upcoming"
  title="Upcoming Events"
  data={{
    events: [
      {
        id: 'event-1',
        title: 'Sunset Photography Walk',
        startTime: new Date(Date.now() + 86400000),
        attendees: 12,
        capacity: 20
      },
      {
        id: 'event-2',
        title: 'Weekly Club Meeting',
        startTime: new Date(Date.now() + 172800000),
        attendees: 8,
        capacity: null
      }
    ]
  }}
  primaryAction={{
    label: 'View Calendar',
    onClick: handleViewCalendar
  }}
  onItemClick={handleEventClick}
/>
```
**Visual**: List of 2-3 upcoming events, time + attendee count

#### 5. "Members" Widget (Space Leaders)
```tsx
<RailWidget
  type="members"
  title="Space Leaders"
  data={{
    members: [
      {
        userId: 'user-1',
        userName: 'Sarah Chen',
        userAvatar: '/avatars/sarah.jpg',
        role: 'leader'
      },
      {
        userId: 'user-2',
        userName: 'Mike Johnson',
        userAvatar: '/avatars/mike.jpg',
        role: 'moderator'
      }
    ],
    totalMembers: 247
  }}
  primaryAction={{
    label: 'View All Members',
    onClick: handleViewMembers
  }}
  onItemClick={handleMemberClick}
/>
```
**Visual**: Avatar list, role badges, member count

#### 6. "Tools" Widget (Active Tools)
```tsx
<RailWidget
  type="tools"
  title="Active Tools"
  data={{
    tools: [
      {
        toolId: 'tool-1',
        title: 'Week 12 Study Buddy Poll',
        deadline: new Date(Date.now() + 7200000),
        responses: 68,
        status: 'active'
      }
    ]
  }}
  primaryAction={{
    label: 'Create Tool',
    onClick: handleCreateTool
  }}
  onItemClick={handleToolClick}
/>
```
**Visual**: Tool list, deadline countdown, response count

#### 7. "Analytics" Widget (Leader Dashboard)
```tsx
<RailWidget
  type="analytics"
  title="Space Analytics"
  data={{
    metrics: [
      { label: 'Active Members', value: '186', delta: '+12' },
      { label: 'Posts This Week', value: '24', delta: '+8' },
      { label: 'Event RSVPs', value: '47', delta: '+15' }
    ]
  }}
  primaryAction={{
    label: 'View Dashboard',
    onClick: handleViewAnalytics
  }}
/>
```
**Visual**: Stat tiles with deltas, sparklines (optional)

#### 8. Empty State
```tsx
<RailWidget
  type="upcoming"
  title="Upcoming Events"
  data={{ events: [] }}
  isEmpty={true}
  primaryAction={{
    label: 'Create Event',
    onClick: handleCreateEvent
  }}
/>
```
**Visual**: "No upcoming events" message, CTA to create

#### 9. Loading State
```tsx
<RailWidget
  type="now"
  title="Happening Now"
  data={null}
  isLoading={true}
/>
```
**Visual**: Skeleton placeholder (shimmer effect)

### Cognitive Caps
- **1 Now widget** max at a time
- **≤2 active widgets** below Now widget
- **≤3 items** per widget list
- **1 primary action** per widget

### Interaction Timeline
```
1. Widget loads (400ms fade in)
2. Hover widget (120ms lift, subtle shadow)
3. Click item (120ms navigate or open sheet)
4. Dismiss widget (200ms fade out, slide right)
```

---

## Storybook Organization

### Recommended Story Structure

#### Example: Composer.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Composer } from './composer';

const meta: Meta<typeof Composer> = {
  title: 'Organisms/Composer',
  component: Composer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['space', 'feed', 'reply']
    },
    defaultVisibility: {
      control: 'radio',
      options: ['space', 'campus']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Composer>;

// Stories matching UX Law states
export const CollapsedDefault: Story = {
  args: {
    mode: 'space',
    spaceId: 'photography-club',
    defaultVisibility: 'space',
    allowVisibilityToggle: true,
    availableTools: [],
    allowMedia: true,
    expanded: false,
    onSubmit: (data) => console.log('Submit:', data)
  }
};

export const ExpandedTyping: Story = {
  args: {
    ...CollapsedDefault.args,
    expanded: true,
    availableTools: mockTools
  }
};

export const WithToolSelected: Story = {
  args: {
    ...ExpandedTyping.args,
    // Tool picker should show selected state
  }
};

export const Submitting: Story = {
  args: {
    ...ExpandedTyping.args,
    isSubmitting: true
  }
};

export const ErrorState: Story = {
  args: {
    ...ExpandedTyping.args,
    error: 'Failed to upload image. Please try again.'
  }
};

export const FeedMode: Story = {
  args: {
    mode: 'feed',
    defaultVisibility: 'campus',
    allowVisibilityToggle: false,
    availableTools: [],
    allowMedia: true,
    expanded: true,
    onSubmit: (data) => console.log('Submit:', data)
  }
};

export const ReplyMode: Story = {
  args: {
    mode: 'reply',
    parentPostId: 'post-123',
    defaultVisibility: 'space',
    allowVisibilityToggle: false,
    availableTools: [],
    allowMedia: true,
    expanded: true,
    placeholder: 'Write a reply...',
    onSubmit: (data) => console.log('Submit:', data)
  }
};

// Mobile viewport story
export const MobileView: Story = {
  args: {
    ...ExpandedTyping.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
```

---

## Quick Validation Checklist

Before marking component "Story Complete", verify:

### Composer
- [ ] 8 states covered (Collapsed, Expanded, Tool Selected, Submitting, Error, Feed, Reply, Mobile)
- [ ] Max 6 tools in picker
- [ ] Visibility toggle explicit and gold-highlighted
- [ ] Character limit shown at 400+
- [ ] Draft auto-save working
- [ ] All animations 100-160ms

### PostCard
- [ ] 10 states covered (Standard, Images, Poll, RSVP, Upvoted, Loading, Campus, Space, Profile, Long)
- [ ] 1 primary CTA per card
- [ ] Max 2 tool actions
- [ ] Explainability chips in Feed mode
- [ ] Truncation at 2 lines
- [ ] Animations: entry 400ms, hover 120ms, tap 100ms

### EventSheet
- [ ] 8 states covered (Upcoming, RSVP'd, Live, Checked In, Capacity, Ended, Co-Hosted, Mobile)
- [ ] "Now" chip during live window
- [ ] Check-in confetti on success
- [ ] Swipe-down to close on mobile
- [ ] Sheet slide 240ms

### RailWidget
- [ ] 9 states covered (Now Event/Tool/Ritual, Upcoming, Members, Tools, Analytics, Empty, Loading)
- [ ] 1 Now widget max
- [ ] ≤2 active widgets below Now
- [ ] ≤3 items per list
- [ ] Dismiss gesture working

---

## Mock Data Library

Create `/packages/ui/src/__mocks__/storybook-data.ts` with:

```typescript
export const mockTools: ToolAction[] = [
  { id: 'poll', label: 'Poll', icon: '📊', disabled: false },
  { id: 'rsvp', label: 'RSVP', icon: '📅', disabled: false },
  { id: 'form', label: 'Form', icon: '📝', disabled: false },
  { id: 'counter', label: 'Counter', icon: '🔢', disabled: false },
  { id: 'media', label: 'Media', icon: '🖼️', disabled: false },
  { id: 'rating', label: 'Rating', icon: '⭐', disabled: false }
];

export const mockPost = {
  id: 'post-1',
  authorId: 'user-123',
  authorName: 'Sarah Chen',
  authorHandle: '@sarahchen',
  authorAvatar: '/avatars/sarah.jpg',
  content: 'Just captured this amazing sunset at Lake LaSalle! 🌅',
  createdAt: new Date(),
  spaceId: 'photography-club',
  spaceName: 'Photography Club',
  visibility: 'space' as const,
  upvotes: 24,
  commentCount: 5,
  isUpvoted: false
};

export const mockAttendees = [
  { userId: 'user-1', userName: 'Sarah Chen', userAvatar: '/avatars/sarah.jpg', status: 'going' as const },
  { userId: 'user-2', userName: 'Mike Johnson', userAvatar: '/avatars/mike.jpg', status: 'going' as const },
  // ... 10 more
];

// Export more mocks as needed
```

---

**Remember**: These stories are engineering contracts. If a state isn't in Storybook, it doesn't exist in production. Wire without guesswork.
