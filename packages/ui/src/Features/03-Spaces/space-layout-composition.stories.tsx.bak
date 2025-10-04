/**
 * Space Layout - Full Composition Demo
 *
 * This story demonstrates the complete Spaces composition architecture:
 * - Canonical SpaceData type
 * - Single SpaceActionHandler for all events
 * - Template → Organism → Molecule hierarchy
 * - 60/40 responsive layout
 * - Controlled context panel state
 *
 * @see SPACES_COMPOSITION_AUDIT.md for architectural details
 */

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { SpaceLayout } from "../../atomic/templates/space-layout"
import type { SpaceData, SpaceAction, ContextPanelState } from "../../types/space.types"
import type { SpacePost } from "../../atomic/organisms/space-post-feed"
import type { SpaceEvent } from "../../atomic/organisms/space-events-panel"
import type { SpaceResource } from "../../atomic/organisms/space-resources-panel"
import type { SpaceMemberPreview } from "../../atomic/organisms/space-members-panel"

const meta = {
  title: "Features/03-Spaces/Space Layout (Full Composition)",
  component: SpaceLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Space Layout - Complete Composition Demo

This demonstrates the **fully refactored Spaces architecture** with:

## Key Features
- ✅ **Canonical SpaceData type** - Single source of truth
- ✅ **Event Aggregation** - One \`onAction\` handler replaces 40+ callbacks
- ✅ **Controlled State** - Context panel externally managed
- ✅ **Atomic Design** - Template → Organism → Molecule → Atom

## Before vs After

**Before:** 40+ separate callback props
\`\`\`typescript
onCreatePost, onPostClick, onLikePost, onCommentPost, onSharePost,
onLoadMore, onEditDescription, onEditRules, onCreateEvent, ...
\`\`\`

**After:** Single action handler + canonical data
\`\`\`typescript
space: SpaceData
onAction: SpaceActionHandler
contextPanel: ContextPanelState
\`\`\`

## Action Flow
User clicks → Component emits SpaceAction → Template routes → Parent handles

Example:
\`\`\`typescript
<SpaceLayout
  space={spaceData}
  onAction={(action) => {
    console.log(action) // { type: "post.like", postId: "123" }
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceLayout>

export default meta
type Story = StoryObj<typeof meta>

// Mock Data
const mockSpace: SpaceData = {
  id: "cs-study-group",
  name: "CS Study Group",
  description:
    "A collaborative space for Computer Science students at UB. Share notes, form study groups, and help each other succeed. Everyone's welcome!",
  coverPhoto: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  category: "academic",
  spaceType: "academic",
  privacy: "public",
  tags: ["computer-science", "study-group", "tutoring", "exam-prep"],
  stats: {
    memberCount: 247,
    postCount: 1423,
    eventCount: 12,
    activeToday: 34,
  },
  campus: {
    friendsInSpace: [
      { id: "1", name: "Sarah Chen", handle: "@sarahchen" },
      { id: "2", name: "Mike Johnson", handle: "@mikej" },
    ],
    isTrending: true,
    trendingCategory: "Most Active This Week",
    primaryMajor: "Computer Science",
  },
  userContext: {
    isJoined: true,
    isLeader: false,
    unreadCount: 5,
    lastActivity: new Date("2025-10-02T15:30:00"),
  },
  creator: {
    id: "creator-1",
    name: "Alex Rivera",
    handle: "@alexr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  createdAt: new Date("2024-09-01"),
  rules: [
    "Be respectful and constructive",
    "No homework cheating - helping is encouraged, copying is not",
    "Stay on topic - CS and academic content only",
    "Give credit where it's due",
  ],
}

const mockPosts: SpacePost[] = [
  {
    id: "post-1",
    author: {
      userId: "user-1",
      name: "Emma Thompson",
      handle: "@emmat",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    content:
      "Anyone want to form a study group for CSE 250 midterm next week? I'm free Tuesday/Thursday evenings!",
    createdAt: new Date("2025-10-02T14:23:00"),
    likeCount: 12,
    commentCount: 8,
    isLiked: false,
  },
  {
    id: "post-2",
    author: {
      userId: "user-2",
      name: "James Park",
      handle: "@jamespark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    content:
      "PSA: The CSE tutoring center has extended hours during finals week (8am-10pm). Take advantage of it!",
    createdAt: new Date("2025-10-02T12:15:00"),
    likeCount: 45,
    commentCount: 3,
    isPinned: true,
    isAnnouncement: true,
  },
  {
    id: "post-3",
    author: {
      userId: "user-3",
      name: "Priya Sharma",
      handle: "@priyasharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    content: "Quick tip: Use visualization tools for understanding recursion. Helped me ace my algorithms exam!",
    linkPreview: {
      title: "Python Tutor - Visualize Code Execution",
      description: "Step through your code and see what happens in memory",
      url: "https://pythontutor.com",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    },
    createdAt: new Date("2025-10-02T10:45:00"),
    likeCount: 23,
    commentCount: 5,
    isLiked: true,
  },
]

const mockEvents: SpaceEvent[] = [
  {
    id: "event-1",
    title: "Algorithm Study Session",
    description: "Group study for CSE 331 exam covering graphs, trees, and dynamic programming",
    date: new Date("2025-10-05T18:00:00"),
    location: "Capen Library, 3rd Floor Study Room",
    attendeeCount: 15,
    isAttending: true,
  },
  {
    id: "event-2",
    title: "Coding Interview Prep Workshop",
    description: "Practice common interview questions and learn problem-solving strategies",
    date: new Date("2025-10-08T19:00:00"),
    location: "Davis Hall Room 101",
    attendeeCount: 32,
    isAttending: false,
  },
]

const mockResources: SpaceResource[] = [
  {
    id: "resource-1",
    title: "CSE 250 Study Guide",
    description: "Comprehensive notes covering data structures",
    url: "https://example.com/cse250-guide",
    type: "document",
  },
  {
    id: "resource-2",
    title: "Leetcode Problem Set",
    description: "Curated list of practice problems by difficulty",
    url: "https://leetcode.com/problemset",
    type: "link",
  },
  {
    id: "resource-3",
    title: "Algorithm Cheat Sheet",
    description: "Big-O complexity reference",
    url: "https://example.com/algorithms",
    type: "document",
  },
]

const mockMembers: SpaceMemberPreview[] = [
  {
    userId: "1",
    name: "Alex Rivera",
    handle: "@alexr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    role: "founder",
    isOnline: true,
  },
  {
    userId: "2",
    name: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "moderator",
    isOnline: true,
  },
  {
    userId: "3",
    name: "Mike Johnson",
    handle: "@mikej",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    role: "member",
    isOnline: false,
  },
  {
    userId: "4",
    name: "Emma Thompson",
    handle: "@emmat",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    role: "member",
    isOnline: true,
  },
  {
    userId: "5",
    name: "James Park",
    handle: "@jamespark",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    role: "member",
    isOnline: false,
  },
  {
    userId: "6",
    name: "Priya Sharma",
    handle: "@priyasharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    role: "member",
    isOnline: true,
  },
]

/**
 * Default Story - Member View (Can Post)
 *
 * Shows the full Space layout as a joined member with posting permissions.
 * Demonstrates the complete composition with all panels populated.
 */
export const MemberView: Story = {
  render: () => {
    const [contextPanel, setContextPanel] = useState<ContextPanelState>({ isOpen: false })
    const [actionLog, setActionLog] = useState<SpaceAction[]>([])

    const handleAction = (action: SpaceAction) => {
      console.log("Action:", action)
      setActionLog((prev) => [action, ...prev].slice(0, 10))
    }

    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="border-b border-white/8 p-4">
          <h2 className="text-lg font-semibold mb-2">Member View - Full Composition Demo</h2>
          <p className="text-sm text-white/70">
            Click any element to see action routing. Check browser console for full event details.
          </p>
        </div>

        <SpaceLayout
          space={mockSpace}
          posts={mockPosts}
          events={mockEvents}
          resources={mockResources}
          members={mockMembers}
          contextPanel={contextPanel}
          onContextPanelChange={setContextPanel}
          onAction={handleAction}
          layoutMode="sidebar"
        />

        {/* Action Log Panel */}
        <div className="fixed bottom-4 right-4 w-80 max-h-96 bg-[#0c0c0c] border border-white/8 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-white/8 bg-white/5">
            <h3 className="text-sm font-semibold">Action Log (Last 10)</h3>
          </div>
          <div className="p-2 space-y-1 overflow-y-auto max-h-80">
            {actionLog.length === 0 ? (
              <p className="text-xs text-white/50 text-center py-8">
                No actions yet. Click around to see events!
              </p>
            ) : (
              actionLog.map((action, i) => (
                <div
                  key={i}
                  className="text-xs font-mono bg-white/5 p-2 rounded border border-white/8"
                >
                  <span className="text-[#FFD700]">{action.type}</span>
                  {Object.keys(action).length > 1 && (
                    <span className="text-white/70 ml-2">
                      {JSON.stringify(
                        Object.fromEntries(Object.entries(action).filter(([k]) => k !== "type")),
                        null,
                        0
                      )}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Leader View
 *
 * Shows the layout with leader permissions, demonstrating additional controls
 * for managing the space (edit, analytics, invite, etc.)
 */
export const LeaderView: Story = {
  render: () => {
    const [contextPanel, setContextPanel] = useState<ContextPanelState>({ isOpen: false })

    const leaderSpace: SpaceData = {
      ...mockSpace,
      userContext: {
        ...mockSpace.userContext,
        isLeader: true,
      },
    }

    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="border-b border-white/8 p-4">
          <h2 className="text-lg font-semibold mb-2">Leader View</h2>
          <p className="text-sm text-white/70">
            Leader has additional controls: edit space, invite members, create events/resources
          </p>
        </div>

        <SpaceLayout
          space={leaderSpace}
          posts={mockPosts}
          events={mockEvents}
          resources={mockResources}
          members={mockMembers}
          contextPanel={contextPanel}
          onContextPanelChange={setContextPanel}
          onAction={(action) => console.log("Leader action:", action)}
          layoutMode="sidebar"
        />
      </div>
    )
  },
}

/**
 * Visitor View (Not Joined)
 *
 * Shows the layout for a non-member visitor. Feed composer is hidden,
 * and join CTA is prominent.
 */
export const VisitorView: Story = {
  render: () => {
    const visitorSpace: SpaceData = {
      ...mockSpace,
      userContext: {
        isJoined: false,
        isLeader: false,
        unreadCount: 0,
      },
    }

    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="border-b border-white/8 p-4">
          <h2 className="text-lg font-semibold mb-2">Visitor View (Not Joined)</h2>
          <p className="text-sm text-white/70">
            Non-members can view content but cannot post. Join button is prominent.
          </p>
        </div>

        <SpaceLayout
          space={visitorSpace}
          posts={mockPosts}
          events={mockEvents}
          resources={mockResources}
          members={mockMembers}
          onAction={(action) => console.log("Visitor action:", action)}
          layoutMode="sidebar"
        />
      </div>
    )
  },
}

/**
 * Fullwidth Mode (Discord-style)
 *
 * Shows the alternative layout mode with sliding context panel.
 * Better for focused conversation view.
 */
export const FullwidthMode: Story = {
  render: () => {
    const [contextPanel, setContextPanel] = useState<ContextPanelState>({ isOpen: false })

    return (
      <div className="h-screen bg-[#000000] text-white overflow-hidden">
        <div className="border-b border-white/8 p-4">
          <h2 className="text-lg font-semibold mb-2">Fullwidth Mode</h2>
          <p className="text-sm text-white/70">
            Click a post to open thread view. Context panel slides in from right.
          </p>
        </div>

        <SpaceLayout
          space={mockSpace}
          posts={mockPosts}
          events={mockEvents}
          resources={mockResources}
          members={mockMembers}
          contextPanel={contextPanel}
          onContextPanelChange={setContextPanel}
          onAction={(action) => console.log("Fullwidth action:", action)}
          layoutMode="fullwidth"
        />
      </div>
    )
  },
}

/**
 * Loading States
 *
 * Demonstrates skeleton loading states for async data fetching.
 */
export const LoadingStates: Story = {
  render: () => (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="border-b border-white/8 p-4">
        <h2 className="text-lg font-semibold mb-2">Loading States</h2>
        <p className="text-sm text-white/70">Shows skeleton loaders while data is fetching</p>
      </div>

      <SpaceLayout
        space={mockSpace}
        posts={[]}
        events={[]}
        resources={[]}
        members={[]}
        isLoadingPosts={true}
        isLoadingEvents={true}
        isLoadingResources={true}
        isLoadingMembers={true}
        onAction={(action) => console.log("Loading action:", action)}
        layoutMode="sidebar"
      />
    </div>
  ),
}

/**
 * Empty States
 *
 * Shows the layout when space has no content yet.
 */
export const EmptyStates: Story = {
  render: () => {
    const emptySpace: SpaceData = {
      ...mockSpace,
      stats: {
        memberCount: 3,
        postCount: 0,
        eventCount: 0,
        activeToday: 0,
      },
    }

    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="border-b border-white/8 p-4">
          <h2 className="text-lg font-semibold mb-2">Empty States</h2>
          <p className="text-sm text-white/70">New space with no content yet</p>
        </div>

        <SpaceLayout
          space={emptySpace}
          posts={[]}
          events={[]}
          resources={[]}
          members={mockMembers.slice(0, 3)}
          onAction={(action) => console.log("Empty action:", action)}
          layoutMode="sidebar"
        />
      </div>
    )
  },
}

/**
 * Widget-Based Sidebar with Modals (SPEC-COMPLIANT)
 *
 * Demonstrates the 60/40 split layout with widget previews:
 * - 60% Feed area for posts/threads
 * - 40% Sidebar with Universal Widgets (spec.md compliant)
 * - Widget previews show next 3 items
 * - "View All" buttons open full modals
 * - Events modal shows calendar component
 */
export const WidgetBasedSidebar: Story = {
  render: () => (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="border-b border-white/8 p-4 bg-[#0c0c0c]">
        <h2 className="text-lg font-semibold mb-2">✅ Widget-Based Sidebar (Spec-Compliant)</h2>
        <p className="text-sm text-white/70 mb-2">
          <strong>60/40 Split:</strong> Feed (60%) + Universal Widgets (40%)
        </p>
        <p className="text-sm text-white/70">
          <strong>Widget Previews:</strong> Shows next 3 items, "View All" opens modal
        </p>
      </div>

      <SpaceLayout
        space={mockSpace}
        posts={mockPosts}
        events={mockEvents}
        resources={mockResources}
        members={mockMembers}
        onAction={(action) => console.log("Widget sidebar action:", action)}
        layoutMode="sidebar"
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: `
### Widget-Based Sidebar (SPEC.md Compliant)

**Layout Structure:**
- **Feed (60%)**: Posts, threads, announcements
- **Sidebar (40%)**: Universal Widgets with previews

**Universal Sidebar Widgets (per spec.md):**

1. **Members Widget**
   - Shows first 3 members with avatars
   - Online status indicators (green dot)
   - "View All" opens full member modal

2. **Events Widget**
   - Shows next 3 upcoming events
   - Event title + time display
   - Gold badge for event count
   - "View Calendar" opens full calendar modal with date picker

3. **Tools Widget**
   - HiveLab integration placeholder
   - "Coming Soon" badge
   - "Learn More" opens info modal

4. **Resources Widget**
   - Shows first 3 resources
   - Resource titles with count badge
   - "View All" opens resource browser modal

5. **About Widget**
   - Space description preview (2 lines)
   - "View Details" opens full about modal with rules, stats, creator

**Design System:**
- Dark monochrome (#000000, #0c0c0c)
- Gold accents (#FFD700) for events/highlights
- White/8 borders for subtle separation
- Hover states with border-white/20
- 400ms transitions for smooth interactions

**Modal Behavior:**
- Clicking "View All/Calendar/Details" opens full-screen modal
- Events modal shows EventsCalendar organism
- Modals use Dialog component (max-w based on content)
- Close on backdrop click or X button
        `,
      },
    },
  },
}

/**
 * Hot Threads with Collapsible Sidebar (DEPRECATED)
 *
 * This approach has been replaced by modal-based architecture.
 * Kept for comparison purposes only.
 */
export const HotThreadsAndCollapsibleSidebar_Deprecated: Story = {
  render: () => {
    const hotThreads = [
      {
        id: "thread-1",
        title: "CSE 250 Midterm Study Tips",
        replyCount: 45,
        posts: [
          {
            id: "thread-1-post-1",
            author: {
              userId: "user-1",
              name: "Sarah Chen",
              handle: "@sarahchen",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            },
            content: "What topics should we focus on for the midterm? I'm struggling with recursion.",
            createdAt: new Date("2025-10-02T10:00:00"),
            likeCount: 15,
            commentCount: 45,
            isLiked: false,
          },
          {
            id: "thread-1-post-2",
            author: {
              userId: "user-2",
              name: "Mike Johnson",
              handle: "@mikej",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            },
            content: "Focus on binary trees and graph traversal. Those were 50% of last year's exam.",
            createdAt: new Date("2025-10-02T10:15:00"),
            likeCount: 23,
            commentCount: 0,
            isLiked: true,
          },
        ],
      },
      {
        id: "thread-2",
        title: "Group Project Teams Forming",
        replyCount: 32,
        posts: [
          {
            id: "thread-2-post-1",
            author: {
              userId: "user-3",
              name: "Alex Kim",
              handle: "@alexkim",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            },
            content: "Looking for 2 more people for CSE 442 project. Need frontend and backend skills!",
            createdAt: new Date("2025-10-02T09:30:00"),
            likeCount: 8,
            commentCount: 32,
            isLiked: false,
          },
        ],
      },
      {
        id: "thread-3",
        title: "Best Resources for Learning C++",
        replyCount: 28,
        posts: [
          {
            id: "thread-3-post-1",
            author: {
              userId: "user-4",
              name: "Emma Thompson",
              handle: "@emmat",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            },
            content: "Any recommendations for C++ learning resources beyond the textbook?",
            createdAt: new Date("2025-10-02T08:00:00"),
            likeCount: 12,
            commentCount: 28,
            isLiked: false,
          },
        ],
      },
    ]

    return (
      <div className="min-h-screen bg-[#000000] text-white">
        <div className="border-b border-white/8 p-4 bg-[#0c0c0c]">
          <h2 className="text-lg font-semibold mb-2">🔥 Hot Threads + Collapsible Sidebar (NEW)</h2>
          <p className="text-sm text-white/70 mb-2">
            <strong>Thread Tabs:</strong> Hot discussions (10+ replies) become tabs for easy navigation
          </p>
          <p className="text-sm text-white/70">
            <strong>Collapsible Sidebar:</strong> Priority ordering (Members → Events → Tools → Resources → About) reduces scroll
          </p>
        </div>

        <SpaceLayout
          space={mockSpace}
          posts={mockPosts}
          hotThreads={hotThreads}
          events={mockEvents}
          resources={mockResources}
          members={mockMembers}
          onAction={(action) => console.log("Hot threads action:", action)}
          layoutMode="sidebar"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
### NEW Features Demonstrated

**Thread Tabs System (Spec Required):**
- Hot threads (10+ replies) automatically become tabs
- Max 5 tabs displayed (spec: auto-archive after 7 days)
- Gold accent on active tab
- Horizontal swipe on mobile

**Collapsible Sidebar Sections:**
- **Members** - Always expanded (highest priority)
- **Events** - Expanded if content exists
- **Tools** - Placeholder for HiveLab integration
- **Resources** - Collapsed by default
- **About** - Collapsed by default (lowest priority)

**Benefits:**
- ✅ Reduces sidebar scroll length by ~60%
- ✅ Prioritizes most-accessed content (Members, Events)
- ✅ Visual separators between sections
- ✅ Spec-compliant thread tabs
- ✅ Mobile-optimized collapsible UI
        `,
      },
    },
  },
}
