import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionList } from "../../atomic/organisms/connection-list";

/**
 * # ConnectionList
 *
 * Organism component for displaying and managing user connections (followers/following).
 * Shows ProfileCards in a grid with optional follow/unfollow actions.
 *
 * ## HIVE Connection System
 * - Follower/following relationships
 * - Mutual connections indicator
 * - Tab interface for "both" variant
 * - Empty states for no connections
 * - Click-through to profiles
 *
 * ## Features
 * - **Three Variants**: followers, following, or both (tabbed)
 * - **Actions**: Follow/Unfollow buttons
 * - **Mutual Connections**: Shows count of shared connections
 * - **Responsive Grid**: 1 col mobile, 2 col tablet, 3 col desktop
 * - **Empty States**: Friendly messaging when no connections
 *
 * ## Usage
 * ```tsx
 * <ConnectionList
 *   variant="both"
 *   connections={followers}
 *   following={following}
 *   showActions={true}
 *   onToggleFollow={(id, isFollowing) => console.log(id, isFollowing)}
 * />
 * ```
 */
const meta = {
  title: "02-Profile/ConnectionList",
  component: ConnectionList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample connection data
const sampleConnections = [
  {
    id: "1",
    name: "Alex Morgan",
    handle: "alex",
    avatarUrl: "https://github.com/vercel.png",
    major: "Biology",
    academicYear: "Sophomore",
    verified: true,
    mutualConnections: 12,
    isFollowing: false,
  },
  {
    id: "2",
    name: "Jordan Lee",
    handle: "jordan",
    avatarUrl: "https://github.com/shadcn.png",
    major: "Mechanical Engineering",
    academicYear: "Senior",
    verified: true,
    mutualConnections: 5,
    isFollowing: true,
  },
  {
    id: "3",
    name: "Casey Kim",
    handle: "casey",
    major: "Business",
    academicYear: "Freshman",
    verified: false,
    mutualConnections: 0,
    isFollowing: false,
  },
  {
    id: "4",
    name: "Riley Park",
    handle: "riley",
    avatarUrl: "https://github.com/microsoft.png",
    major: "Psychology",
    academicYear: "Junior",
    verified: true,
    mutualConnections: 8,
    isFollowing: true,
  },
  {
    id: "5",
    name: "Sam Taylor",
    handle: "samtaylor",
    major: "Computer Science",
    academicYear: "Sophomore",
    verified: true,
    mutualConnections: 3,
    isFollowing: false,
  },
  {
    id: "6",
    name: "Jamie Davis",
    handle: "jamie",
    avatarUrl: "https://github.com/facebook.png",
    major: "English",
    academicYear: "Senior",
    verified: false,
    mutualConnections: 15,
    isFollowing: true,
  },
];

const following = [
  {
    id: "7",
    name: "Chris Brown",
    handle: "chris",
    avatarUrl: "https://github.com/google.png",
    major: "Physics",
    academicYear: "Junior",
    verified: true,
    isFollowing: true,
  },
  {
    id: "8",
    name: "Morgan White",
    handle: "morgan",
    major: "Art History",
    academicYear: "Sophomore",
    verified: false,
    isFollowing: true,
  },
];

/**
 * Default followers list
 */
export const Default: Story = {
  args: {
    variant: "followers",
    connections: sampleConnections.slice(0, 3),
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing}`);
    },
    onConnectionClick: (id) => {
      console.log(`Clicked connection: ${id}`);
    },
  },
};

/**
 * Following list
 */
export const Following: Story = {
  args: {
    variant: "following",
    connections: sampleConnections.filter((c) => c.isFollowing),
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing}`);
    },
  },
};

/**
 * Both tabs (followers and following)
 */
export const BothTabs: Story = {
  args: {
    variant: "both",
    connections: sampleConnections,
    following: following,
    showActions: true,
    onToggleFollow: (id, isFollowing) => {
      console.log(`Toggle follow for ${id}: ${isFollowing}`);
    },
  },
};

/**
 * Large connection list (6+ connections)
 */
export const LargeList: Story = {
  args: {
    variant: "followers",
    connections: sampleConnections,
    showActions: true,
  },
};

/**
 * Without actions (read-only)
 */
export const WithoutActions: Story = {
  args: {
    variant: "followers",
    connections: sampleConnections.slice(0, 4),
    showActions: false,
  },
};

/**
 * With mutual connections highlighted
 */
export const WithMutualConnections: Story = {
  args: {
    variant: "followers",
    connections: sampleConnections.filter((c) => c.mutualConnections && c.mutualConnections > 0),
    showActions: true,
  },
};

/**
 * Empty followers state
 */
export const EmptyFollowers: Story = {
  args: {
    variant: "followers",
    connections: [],
    showActions: false,
  },
};

/**
 * Empty following state
 */
export const EmptyFollowing: Story = {
  args: {
    variant: "following",
    connections: [],
    showActions: false,
  },
};

/**
 * Empty both tabs
 */
export const EmptyBothTabs: Story = {
  args: {
    variant: "both",
    connections: [],
    following: [],
    showActions: false,
  },
};

/**
 * Small list (2 connections)
 */
export const SmallList: Story = {
  args: {
    variant: "followers",
    connections: sampleConnections.slice(0, 2),
    showActions: true,
  },
};

/**
 * Mixed verified status
 */
export const MixedVerified: Story = {
  args: {
    variant: "followers",
    connections: [
      sampleConnections[0], // verified
      sampleConnections[2], // not verified
      sampleConnections[4], // verified
      sampleConnections[5], // not verified
    ],
    showActions: true,
  },
};

/**
 * Profile page integration example
 */
export const ProfilePageIntegration: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Connections</h1>
        <p className="text-muted-foreground">
          Manage your network of {sampleConnections.length} followers and{" "}
          {following.length} following
        </p>
      </div>

      {/* Connection list with tabs */}
      <ConnectionList
        variant="both"
        connections={sampleConnections}
        following={following}
        showActions={true}
        onToggleFollow={(id, isFollowing) => {
          console.log(`Toggle follow for ${id}: ${isFollowing}`);
        }}
        onConnectionClick={(id) => {
          console.log(`Navigate to profile: ${id}`);
        }}
      />
    </div>
  ),
};

/**
 * Suggested connections (no mutual connections)
 */
export const SuggestedConnections: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Suggested Connections
        </h2>
        <p className="text-muted-foreground">
          People you might know based on your network
        </p>
      </div>

      <ConnectionList
        variant="followers"
        connections={sampleConnections.slice(0, 3).map((c) => ({
          ...c,
          isFollowing: false,
          mutualConnections: Math.floor(Math.random() * 20) + 1,
        }))}
        showActions={true}
        onToggleFollow={(id, isFollowing) => {
          console.log(`Follow suggested user: ${id}`);
        }}
      />
    </div>
  ),
};
