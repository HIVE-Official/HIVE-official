import type { Meta, StoryObj } from "@storybook/react";
import { SpaceMembersPanel, SpaceMemberPreview } from "../../atomic/organisms/space-members-panel";

/**
 * # SpaceMembersPanel
 *
 * Organism component displaying a preview grid of space members in the 40% sidebar.
 * Shows circular avatars with online status, roles, and a "View All" link to the full member list.
 *
 * ## HIVE Motion System
 * - Smooth hover effects on member cards
 * - Border color transitions
 * - Avatar scale on hover (subtle)
 *
 * ## Features
 * - **Circular Avatars**: 12×12px round avatars with initials fallback
 * - **Online Indicators**: Green dot for online members
 * - **Role Badges**: Visual indicators for leaders, moderators, founders
 * - **3-Column Grid**: Compact layout showing 6-9 members at a glance
 * - **View All Button**: Links to full member list with total count
 * - **Invite Button**: Quick access for space leaders
 * - **Empty States**: Helpful prompts when no members exist
 * - **Smart Truncation**: Shows first names only to fit grid
 *
 * ## Usage
 * ```tsx
 * <SpaceMembersPanel
 *   members={recentMembers}
 *   totalMemberCount={87}
 *   previewLimit={6}
 *   canInvite={isLeader}
 *   onInvite={() => openInviteDialog()}
 *   onViewAll={() => navigate('/space/members')}
 *   onMemberClick={(member) => navigate(`/profile/${member.handle}`)}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceMembersPanel",
  component: SpaceMembersPanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceMembersPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample member data
const sampleMembers: SpaceMemberPreview[] = [
  {
    userId: "1",
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://github.com/shadcn.png",
    role: "founder",
    isOnline: true,
  },
  {
    userId: "2",
    name: "Alex Morgan",
    handle: "@alex",
    avatar: "https://github.com/vercel.png",
    role: "leader",
    isOnline: true,
  },
  {
    userId: "3",
    name: "Jordan Lee",
    handle: "@jordan",
    role: "moderator",
    isOnline: false,
  },
  {
    userId: "4",
    name: "Casey Kim",
    handle: "@casey",
    avatar: "https://github.com/shadcn.png",
    role: "member",
    isOnline: true,
  },
  {
    userId: "5",
    name: "Morgan Taylor",
    handle: "@morgan",
    avatar: "https://github.com/vercel.png",
    role: "member",
    isOnline: false,
  },
  {
    userId: "6",
    name: "Riley Park",
    handle: "@riley",
    role: "member",
    isOnline: true,
  },
  {
    userId: "7",
    name: "Jamie Davis",
    handle: "@jamie",
    avatar: "https://github.com/shadcn.png",
    role: "member",
    isOnline: false,
  },
  {
    userId: "8",
    name: "Avery Brown",
    handle: "@avery",
    role: "member",
    isOnline: true,
  },
  {
    userId: "9",
    name: "Quinn Martinez",
    handle: "@quinn",
    avatar: "https://github.com/vercel.png",
    role: "member",
    isOnline: false,
  },
];

/**
 * Default members panel with 6 member preview
 */
export const Default: Story = {
  args: {
    members: sampleMembers.slice(0, 6),
    totalMemberCount: 87,
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * As space leader - can invite new members
 */
export const AsSpaceLeader: Story = {
  args: {
    members: sampleMembers,
    totalMemberCount: 143,
    canInvite: true,
    onInvite: () => console.log("Invite members"),
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Empty state - no members yet
 */
export const EmptyState: Story = {
  args: {
    members: [],
    emptyStateMessage: "Be the first to join this space!",
  },
};

/**
 * Empty state as leader - can invite
 */
export const EmptyStateAsLeader: Story = {
  args: {
    members: [],
    canInvite: true,
    emptyStateMessage: "Invite members to get started",
    onInvite: () => console.log("Invite members"),
  },
};

/**
 * Small space (few members, no "more" indicator)
 */
export const SmallSpace: Story = {
  args: {
    members: sampleMembers.slice(0, 3),
    totalMemberCount: 3,
    canInvite: true,
    onInvite: () => console.log("Invite members"),
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Leadership team (founders, leaders, moderators)
 */
export const LeadershipTeam: Story = {
  args: {
    members: sampleMembers.filter((m) => m.role !== "member"),
    totalMemberCount: sampleMembers.filter((m) => m.role !== "member").length,
    onViewAll: () => console.log("View leadership team"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Large community (many more members)
 */
export const LargeCommunity: Story = {
  args: {
    members: sampleMembers,
    totalMemberCount: 523,
    previewLimit: 9,
    canInvite: true,
    onInvite: () => console.log("Invite members"),
    onViewAll: () => console.log("View all 523 members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * All members online
 */
export const AllOnline: Story = {
  args: {
    members: sampleMembers.map((m) => ({ ...m, isOnline: true })).slice(0, 6),
    totalMemberCount: 45,
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * No online status indicators
 */
export const WithoutOnlineStatus: Story = {
  args: {
    members: sampleMembers.slice(0, 6),
    totalMemberCount: 87,
    showOnlineStatus: false,
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Custom preview limit (9 members)
 */
export const NineMemberPreview: Story = {
  args: {
    members: sampleMembers,
    totalMemberCount: 234,
    previewLimit: 9,
    canInvite: true,
    onInvite: () => console.log("Invite members"),
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * Members without avatars (initials fallback)
 */
export const WithoutAvatars: Story = {
  args: {
    members: sampleMembers.map((m) => ({ ...m, avatar: undefined })).slice(0, 6),
    totalMemberCount: 67,
    onViewAll: () => console.log("View all members"),
    onMemberClick: (member) => console.log("Member clicked:", member),
  },
};

/**
 * HIVE Pattern: In 40% sidebar (complete sidebar stack)
 */
export const In40Sidebar: Story = {
  render: () => (
    <div className="flex gap-6 w-full max-w-6xl">
      {/* 60% Main Content */}
      <div className="flex-[6] space-y-4">
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">60% Main Feed Area</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Space posts and content go here
          </p>
        </div>
      </div>

      {/* 40% Sidebar */}
      <div className="flex-[4] space-y-4">
        {/* About Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
          <p className="text-xs text-muted-foreground">
            CS Study Group description...
          </p>
        </div>

        {/* Events Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Upcoming Events</h4>
          <p className="text-xs text-muted-foreground">
            3 events this month
          </p>
        </div>

        {/* Resources Panel Placeholder */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Resources</h4>
          <p className="text-xs text-muted-foreground">
            5 helpful links
          </p>
        </div>

        {/* Members Panel */}
        <SpaceMembersPanel
          members={sampleMembers.slice(0, 6)}
          totalMemberCount={87}
          canInvite={true}
          onInvite={() => console.log("Invite members")}
          onViewAll={() => console.log("View all members")}
          onMemberClick={(member) => console.log("Member clicked:", member)}
        />
      </div>
    </div>
  ),
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    members: sampleMembers,
    totalMemberCount: 143,
    previewLimit: 6,
    canInvite: true,
    showOnlineStatus: true,
    onInvite: () => alert("Opening invite dialog..."),
    onViewAll: () => alert("Navigating to full member list..."),
    onMemberClick: (member) => alert(`Viewing profile: ${member.name} (${member.handle})`),
  },
};
