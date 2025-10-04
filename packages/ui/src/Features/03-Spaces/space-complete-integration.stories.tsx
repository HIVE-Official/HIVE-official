/**
 * Space Complete Integration Story
 *
 * Demonstrates the full Spaces → HiveLab Tools vertical slice with all components
 * refactored to dark monochrome. This story showcases:
 *
 * - SpaceHeader (collapsible sidebar with layout animations)
 * - SpacePostFeed (Discord-style message grouping, reactions, hover actions)
 * - SpaceComposerWithTools (inline tool menu, slash commands)
 * - SpaceToolsPanel (default + custom HiveLab tools)
 * - SpaceEventsPanel (event cards, RSVP actions)
 * - SpaceMembersPanel (member grid, online status)
 * - SpaceResourcesPanel (pinned resources, external links)
 * - SpaceAboutSection (description, stats, rules, creator info)
 *
 * **Phase 2 Complete**: All semantic tokens replaced with explicit dark monochrome values.
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { SpaceHeader } from "../../atomic/organisms/space-header"
import { SpacePostFeed } from "../../atomic/organisms/space-post-feed"
import { SpaceComposerWithTools } from "../../atomic/molecules/space-composer-with-tools"
import { SpaceToolsPanel } from "../../atomic/organisms/space-tools-panel"
import { SpaceEventsPanel } from "../../atomic/organisms/space-events-panel"
import { SpaceMembersPanel } from "../../atomic/organisms/space-members-panel"
import { SpaceResourcesPanel } from "../../atomic/organisms/space-resources-panel"
import { SpaceAboutSection } from "../../atomic/organisms/space-about-section"
import type { SpacePost } from "../../atomic/organisms/space-post-feed"
import type { Tool } from "../../atomic/organisms/space-tools-panel"
import type { SpaceEvent } from "../../atomic/organisms/space-events-panel"
import type { SpaceMemberPreview } from "../../atomic/organisms/space-members-panel"
import type { SpaceResource } from "../../atomic/organisms/space-resources-panel"

// Mock Data
const mockSpace = {
  id: "cs-study-group",
  name: "CSE 442 Study Group",
  description: "Collaborative study space for Software Engineering. Weekly study sessions, project help, exam prep, and tech discussions. All CSE 442 students welcome!",
  coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
  memberCount: 47,
  postCount: 328,
  eventCount: 12,
  isPrivate: false,
  category: "Academic",
  type: "academic" as const,
  tags: ["software-engineering", "study-group", "cse-442", "project-help"],
  createdAt: new Date("2024-09-01"),
  createdBy: {
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  rules: [
    "Be respectful and professional in all interactions",
    "No sharing of exam answers or assignment solutions",
    "Use appropriate channels for different topics",
    "Help others when you can - we're all learning together",
    "Mark spoilers for project discussions"
  ]
}

const mockMembers: SpaceMemberPreview[] = [
  { userId: "1", name: "Sarah Chen", handle: "@sarahc", avatar: "https://i.pravatar.cc/150?img=1", role: "founder", isOnline: true },
  { userId: "2", name: "Mike Johnson", handle: "@mikej", role: "leader", isOnline: true },
  { userId: "3", name: "Emily Davis", handle: "@emilyd", avatar: "https://i.pravatar.cc/150?img=3", role: "moderator", isOnline: false },
  { userId: "4", name: "Alex Kim", handle: "@alexk", role: "member", isOnline: true },
  { userId: "5", name: "Jordan Lee", handle: "@jordanl", avatar: "https://i.pravatar.cc/150?img=5", role: "member", isOnline: false },
  { userId: "6", name: "Taylor Swift", handle: "@tswift", role: "member", isOnline: true },
]

const mockEvents: SpaceEvent[] = [
  {
    id: "1",
    title: "Final Exam Study Session",
    description: "Review session covering chapters 8-12. Bring questions!",
    startDate: new Date("2025-10-10T18:00:00"),
    endDate: new Date("2025-10-10T21:00:00"),
    location: "Davis Hall 101",
    type: "academic",
    rsvpCount: 23,
    isAttending: true,
    status: "upcoming"
  },
  {
    id: "2",
    title: "Project 3 Workshop",
    description: "Work on Project 3 together, debugging help available",
    startDate: new Date("2025-10-08T15:00:00"),
    endDate: new Date("2025-10-08T17:00:00"),
    location: "Natural Sciences Library",
    type: "workshop",
    rsvpCount: 15,
    isAttending: false,
    status: "upcoming"
  },
  {
    id: "3",
    title: "Tech Talk: React Best Practices",
    description: "Guest speaker from industry discussing modern React patterns",
    startDate: new Date("2025-10-12T19:00:00"),
    endDate: new Date("2025-10-12T20:30:00"),
    location: "Virtual (Zoom link in pinned resources)",
    type: "social",
    rsvpCount: 31,
    status: "upcoming"
  }
]

const mockResources: SpaceResource[] = [
  {
    id: "1",
    title: "Course Syllabus & Schedule",
    url: "https://www.cse.buffalo.edu/~mikej/cse442/syllabus",
    type: "document",
    isPinned: true,
    clicks: 142,
    addedAt: new Date("2024-09-01"),
    addedBy: { name: "Sarah Chen", handle: "@sarahc" }
  },
  {
    id: "2",
    title: "Project 3 Starter Code",
    url: "https://github.com/cse442/project3-starter",
    type: "github",
    description: "React starter template with TypeScript and testing setup",
    isPinned: true,
    clicks: 89,
    addedAt: new Date("2024-10-01")
  },
  {
    id: "3",
    title: "Study Guide - Midterm",
    url: "https://docs.google.com/document/d/abc123",
    type: "document",
    description: "Collaborative notes covering lectures 1-15",
    clicks: 67,
    addedAt: new Date("2024-09-25")
  },
  {
    id: "4",
    title: "React Testing Library Docs",
    url: "https://testing-library.com/docs/react-testing-library/intro/",
    type: "link",
    description: "Official documentation for RTL",
    clicks: 34,
    addedAt: new Date("2024-09-20")
  }
]

const mockPosts: SpacePost[] = [
  {
    id: "1",
    content: "Quick reminder: Final exam study session tomorrow at 6pm in Davis 101! Bring any questions you have from chapters 8-12. Pizza will be provided 🍕",
    author: {
      userId: "1",
      name: "Sarah Chen",
      handle: "@sarahc",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    timestamp: new Date("2025-10-03T14:30:00"),
    isPinned: true,
    reactionCount: 12,
    commentCount: 3,
    isLiked: false
  },
  {
    id: "2",
    content: "Has anyone else run into issues with the test suite on Project 3? I'm getting weird timeout errors on the async tests.",
    author: {
      userId: "4",
      name: "Alex Kim",
      handle: "@alexk"
    },
    timestamp: new Date("2025-10-03T13:15:00"),
    reactionCount: 5,
    commentCount: 8,
    isLiked: true
  },
  {
    id: "3",
    content: "Pro tip: If you're stuck on the state management part, check out the React docs section on useReducer. Game changer for complex state.",
    author: {
      userId: "2",
      name: "Mike Johnson",
      handle: "@mikej"
    },
    timestamp: new Date("2025-10-03T13:16:00"),
    reactionCount: 18,
    commentCount: 2,
    isLiked: true
  },
  {
    id: "4",
    content: "Thanks for the help yesterday! Finally got my tests passing 🎉",
    author: {
      userId: "5",
      name: "Jordan Lee",
      handle: "@jordanl",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    timestamp: new Date("2025-10-03T12:00:00"),
    reactionCount: 7,
    commentCount: 1,
    isLiked: false
  }
]

const mockTools: Tool[] = [
  {
    id: "attendance",
    name: "Attendance Tracker",
    icon: "📋",
    description: "Track who attended study sessions",
    isCustom: true,
    createdBy: "Sarah Chen",
    usageCount: 47,
    permissions: "leaders"
  },
  {
    id: "flashcards",
    name: "Flashcards",
    icon: "🗂️",
    description: "Study flashcards for exams",
    isCustom: true,
    createdBy: "Mike Johnson",
    usageCount: 89,
    permissions: "all"
  }
]

// Main Integration Component
const SpaceCompleteIntegration = ({
  isLeader = false,
  isMobile = false
}: {
  isLeader?: boolean
  isMobile?: boolean
}) => {
  const [composerValue, setComposerValue] = React.useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(isMobile)

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Desktop Layout (60/40 split) */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex gap-6 p-6">
          {/* Main Content (60%) */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Space Header/Sidebar */}
            <SpaceHeader
              space={{
                id: mockSpace.id,
                name: mockSpace.name,
                description: mockSpace.description,
                coverImage: mockSpace.coverImage,
                memberCount: mockSpace.memberCount,
                isPrivate: mockSpace.isPrivate
              }}
              members={mockMembers}
              isJoined={true}
              isLeader={isLeader}
              onJoin={() => console.log("Join")}
              onLeave={() => console.log("Leave")}
              onInvite={() => console.log("Invite")}
              onSettings={() => console.log("Settings")}
              isSidebar={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Post Feed */}
            <SpacePostFeed
              posts={mockPosts}
              onPostClick={(post) => console.log("Post clicked:", post.id)}
              onLoadMore={() => console.log("Load more")}
              hasMore={true}
              isLoading={false}
              onCreatePost={(content) => console.log("Create post:", content)}
              currentUserId="current-user-123"
            />
          </div>

          {/* Sidebar (40%) */}
          {!sidebarCollapsed && (
            <div className="w-[400px] shrink-0 space-y-6">
              {/* Composer */}
              <SpaceComposerWithTools
                value={composerValue}
                onValueChange={setComposerValue}
                onCreatePost={(content) => {
                  console.log("Create post:", content)
                  setComposerValue("")
                }}
                onToolSelect={(toolId) => console.log("Tool selected:", toolId)}
                placeholder="Message #cse-442-study-group..."
                showInlineTools={true}
              />

              {/* Tools Panel */}
              <SpaceToolsPanel
                customTools={mockTools}
                isLeader={isLeader}
                onToolClick={(tool) => console.log("Tool clicked:", tool.id)}
                onManageTools={() => console.log("Manage tools")}
                onCreateTool={() => console.log("Create tool")}
              />

              {/* Events Panel */}
              <SpaceEventsPanel
                events={mockEvents}
                onEventClick={(event) => console.log("Event clicked:", event.id)}
                onRSVP={(eventId, attending) => console.log("RSVP:", eventId, attending)}
                onCreateEvent={() => console.log("Create event")}
                canCreateEvents={isLeader}
              />

              {/* Members Panel */}
              <SpaceMembersPanel
                members={mockMembers}
                totalMemberCount={mockSpace.memberCount}
                onMemberClick={(member) => console.log("Member clicked:", member.userId)}
                onInvite={() => console.log("Invite members")}
                onViewAll={() => console.log("View all members")}
                canInvite={true}
                showOnlineStatus={true}
              />

              {/* Resources Panel */}
              <SpaceResourcesPanel
                resources={mockResources}
                onResourceClick={(resource) => console.log("Resource clicked:", resource.id)}
                onAddResource={() => console.log("Add resource")}
                canAddResources={isLeader}
                alwaysShowAddButton={true}
              />

              {/* About Section */}
              <SpaceAboutSection
                description={mockSpace.description}
                tags={mockSpace.tags}
                category={mockSpace.category}
                type={mockSpace.type}
                memberCount={mockSpace.memberCount}
                postCount={mockSpace.postCount}
                eventCount={mockSpace.eventCount}
                rules={mockSpace.rules}
                createdAt={mockSpace.createdAt}
                createdBy={mockSpace.createdBy}
                onEditDescription={() => console.log("Edit description")}
                onEditRules={() => console.log("Edit rules")}
                isLeader={isLeader}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const meta = {
  title: "Features/03-Spaces/Complete Integration",
  component: SpaceCompleteIntegration,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Space Complete Integration

**Phase 2 Complete**: Full vertical slice refactored to dark monochrome aesthetic.

## Components Integrated

### Critical Path (Phase 1)
- **SpaceComposerWithTools**: Claude-style rounded composer with inline tool menu
- **InlineToolMenu**: Dropdown for quick tool access (Poll, Event, Task, Resource)
- **Badge**: Extended with \`secondary\` and \`outline\` variants

### Organisms (Phase 2)
- **SpaceHeader**: Collapsible sidebar with layout animations, member previews, leader toolbar
- **SpacePostFeed**: Discord-style message grouping, reactions, hover actions, bottom composer
- **SpaceToolsPanel**: Default tools + custom HiveLab tools grid
- **SpaceEventsPanel**: Event cards with RSVP, date/location/description
- **SpaceMembersPanel**: Member grid with avatars, online status, role badges
- **SpaceResourcesPanel**: Pinned resources, external links, click tracking
- **SpaceAboutSection**: Description, tags, stats, rules, creator info

## Dark Monochrome Spec

- **Backgrounds**: \`#000000\` (page), \`#0c0c0c\` (cards)
- **Text**: \`text-white\` (primary), \`text-white/70\` (secondary), \`text-white/50\` (tertiary)
- **Borders**: \`border-white/8\` → \`border-white/20\` on hover
- **Gold accents**: \`#FFD700\` for special states (pinned, leader, reactions)
- **Hover states**: \`hover:bg-white/10\`

## User Flows

1. **Browse & Engage**: Scroll feed → React to posts → Comment
2. **Create Content**: Use composer → Select tool → Post content
3. **Manage Events**: View events → RSVP → Create new event (leaders)
4. **Discover Resources**: Browse pinned → Open external links
5. **Community Info**: Read about → View members → Check rules
        `
      }
    }
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceCompleteIntegration>

export default meta
type Story = StoryObj<typeof meta>

export const MemberView: Story = {
  args: {
    isLeader: false,
    isMobile: false
  },
  parameters: {
    docs: {
      description: {
        story: "Default member view with all panels visible. Members can create posts, RSVP to events, and view resources."
      }
    }
  }
}

export const LeaderView: Story = {
  args: {
    isLeader: true,
    isMobile: false
  },
  parameters: {
    docs: {
      description: {
        story: "Leader view with additional controls: Create events, manage tools, edit description/rules, invite members."
      }
    }
  }
}

export const MobileCollapsed: Story = {
  args: {
    isLeader: false,
    isMobile: true
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    },
    docs: {
      description: {
        story: "Mobile view with sidebar collapsed by default. Header shows collapsed icon buttons for quick navigation."
      }
    }
  }
}

export const LeaderMobile: Story = {
  args: {
    isLeader: true,
    isMobile: true
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    },
    docs: {
      description: {
        story: "Mobile leader view with full controls accessible via collapsed sidebar."
      }
    }
  }
}
