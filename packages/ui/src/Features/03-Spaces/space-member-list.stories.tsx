import type { Meta, StoryObj } from "@storybook/react";
import { SpaceMemberList, SpaceMember } from "../../atomic/organisms/space-member-list";

/**
 * # SpaceMemberList
 *
 * Organism component displaying a searchable, filterable grid of space members.
 * Uses UserCard molecules for consistent portrait card styling (16×14px avatars).
 *
 * ## HIVE Motion System
 * - UserCard hover effects with smooth lift and border color change
 * - Smooth transitions on filter changes
 * - Empty state with subtle icon animation potential
 *
 * ## Features
 * - **Search**: Real-time filtering by name or handle
 * - **Role filtering**: Filter by member, moderator, leader, or founder
 * - **Sorting**: By recent, oldest, name (A-Z), or most active
 * - **Role badges**: Visual indicators for leaders/moderators/founders
 * - **Action buttons**: Context-aware actions (Message, Manage)
 * - **Empty states**: Helpful messages when no results
 * - **Responsive grid**: 1 column mobile, 2 tablet, 3 desktop
 *
 * ## Usage
 * ```tsx
 * <SpaceMemberList
 *   members={members}
 *   currentUserId="user123"
 *   isSpaceLeader={true}
 *   onMemberClick={(member) => navigate(`/profile/${member.handle}`)}
 *   onMemberAction={(member, action) => handleAction(member, action)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceMemberList",
  component: SpaceMemberList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceMemberList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample member data
const sampleMembers: SpaceMember[] = [
  {
    userId: "1",
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://github.com/shadcn.png",
    bio: "CS major, coffee addict, Bills Mafia member",
    role: "founder",
    joinedAt: new Date("2024-01-15"),
    contribution: {
      posts: 45,
      comments: 123,
      events: 8,
    },
    isOnline: true,
  },
  {
    userId: "2",
    name: "Alex Morgan",
    handle: "@alex",
    avatar: "https://github.com/vercel.png",
    bio: "Ramen connoisseur, Knox Hall survivor",
    role: "leader",
    joinedAt: new Date("2024-01-20"),
    contribution: {
      posts: 32,
      comments: 98,
      events: 5,
    },
    isOnline: true,
  },
  {
    userId: "3",
    name: "Jordan Lee",
    handle: "@jordan",
    bio: "Engineering student, actually cool unlike at other schools",
    role: "moderator",
    joinedAt: new Date("2024-02-01"),
    contribution: {
      posts: 28,
      comments: 67,
      events: 3,
    },
    isOnline: false,
  },
  {
    userId: "4",
    name: "Casey Kim",
    handle: "@casey",
    avatar: "https://github.com/shadcn.png",
    bio: "Theater kid, bubble tea enthusiast",
    role: "member",
    joinedAt: new Date("2024-02-15"),
    contribution: {
      posts: 12,
      comments: 34,
      events: 1,
    },
    isOnline: true,
  },
  {
    userId: "5",
    name: "Morgan Taylor",
    handle: "@morgan",
    avatar: "https://github.com/vercel.png",
    bio: "Pre-med, gym rat, occasional philosopher",
    role: "member",
    joinedAt: new Date("2024-03-01"),
    contribution: {
      posts: 8,
      comments: 23,
      events: 0,
    },
    isOnline: false,
  },
  {
    userId: "6",
    name: "Riley Park",
    handle: "@riley",
    bio: "Art major, vintage fashion lover",
    role: "member",
    joinedAt: new Date("2024-03-10"),
    contribution: {
      posts: 15,
      comments: 45,
      events: 2,
    },
    isOnline: true,
  },
  {
    userId: "7",
    name: "Jamie Davis",
    handle: "@jamie",
    avatar: "https://github.com/shadcn.png",
    bio: "Business major, entrepreneur in training",
    role: "member",
    joinedAt: new Date("2024-03-15"),
    contribution: {
      posts: 5,
      comments: 12,
      events: 0,
    },
    isOnline: false,
  },
  {
    userId: "8",
    name: "Avery Brown",
    handle: "@avery",
    bio: "Music production, always has headphones on",
    role: "member",
    joinedAt: new Date("2024-03-20"),
    contribution: {
      posts: 3,
      comments: 8,
      events: 0,
    },
    isOnline: true,
  },
];

/**
 * Default member list with all features
 */
export const Default: Story = {
  args: {
    members: sampleMembers,
    currentUserId: "current-user-id",
    isSpaceLeader: false,
    onMemberClick: (member) => console.log("Member clicked:", member),
    onMemberAction: (member, action) => console.log("Action:", action, member),
  },
};

/**
 * As space leader - shows Manage action for members
 */
export const AsSpaceLeader: Story = {
  args: {
    members: sampleMembers,
    currentUserId: "1", // Sarah Chen is the current user
    isSpaceLeader: true,
    onMemberClick: (member) => console.log("Member clicked:", member),
    onMemberAction: (member, action) => console.log("Action:", action, member),
  },
};

/**
 * Small space (few members)
 */
export const SmallSpace: Story = {
  args: {
    members: sampleMembers.slice(0, 3),
    currentUserId: "current-user-id",
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Large active community
 */
export const LargeCommunity: Story = {
  args: {
    members: [
      ...sampleMembers,
      ...Array.from({ length: 20 }, (_, i) => ({
        userId: `user-${i + 9}`,
        name: `Student ${i + 9}`,
        handle: `@student${i + 9}`,
        bio: "Campus community member",
        role: "member" as const,
        joinedAt: new Date(2024, 3, i + 1),
        contribution: {
          posts: Math.floor(Math.random() * 20),
          comments: Math.floor(Math.random() * 50),
          events: Math.floor(Math.random() * 5),
        },
        isOnline: Math.random() > 0.5,
      })),
    ],
    currentUserId: "current-user-id",
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Leadership team view - only founders/leaders/moderators
 */
export const LeadershipTeam: Story = {
  args: {
    members: sampleMembers.filter((m) => m.role !== "member"),
    currentUserId: "current-user-id",
    showFilters: false,
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Empty state - no members
 */
export const EmptyState: Story = {
  args: {
    members: [],
    currentUserId: "current-user-id",
    emptyStateMessage: "No members have joined this space yet",
  },
};

/**
 * Without search and filters (simple grid)
 */
export const SimpleGrid: Story = {
  args: {
    members: sampleMembers,
    currentUserId: "current-user-id",
    showSearch: false,
    showFilters: false,
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Online members only
 */
export const OnlineMembers: Story = {
  args: {
    members: sampleMembers.filter((m) => m.isOnline),
    currentUserId: "current-user-id",
    showFilters: false,
    emptyStateMessage: "No members are currently online",
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Active contributors
 */
export const ActiveContributors: Story = {
  args: {
    members: sampleMembers
      .filter((m) => (m.contribution?.posts || 0) + (m.contribution?.comments || 0) > 30)
      .sort((a, b) => {
        const aTotal = (a.contribution?.posts || 0) + (a.contribution?.comments || 0);
        const bTotal = (b.contribution?.posts || 0) + (b.contribution?.comments || 0);
        return bTotal - aTotal;
      }),
    currentUserId: "current-user-id",
    showFilters: false,
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * HIVE Pattern: Space members panel
 */
export const SpaceMembersPanel: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Members</h2>
          <p className="text-sm text-muted-foreground">
            Active community members in CS Study Group
          </p>
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
          Invite Members
        </button>
      </div>

      <SpaceMemberList
        members={sampleMembers}
        currentUserId="1"
        isSpaceLeader={true}
        onMemberClick={(member) => console.log("View profile:", member)}
        onMemberAction={(member, action) => console.log("Action:", action, member)}
      />
    </div>
  ),
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    members: sampleMembers,
    currentUserId: "1",
    isSpaceLeader: true,
    onMemberClick: (member) => console.log("Member clicked:", member),
    onMemberAction: (member, action) => console.log("Action:", action, "for", member.name),
  },
};
