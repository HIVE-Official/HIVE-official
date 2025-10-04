import type { Meta, StoryObj } from "@storybook/react";
import { SpaceHeader } from "../../atomic/organisms/space-header";
import { useState } from "react";

/**
 * # SpaceHeader
 *
 * Organism component that serves as the main header for space pages.
 * Supports both traditional header and sidebar layouts with smooth motion transitions.
 *
 * ## HIVE Motion System
 * - Uses framer-motion `layout` prop for seamless header ↔ sidebar transitions
 * - Smooth expand/collapse animations with `transition-smooth ease-liquid`
 * - Hover states on all interactive elements
 *
 * ## Layout Modes
 * - **Header** (default): Full-width top header with stats grid and member previews
 * - **Sidebar**: Compact 320px sticky sidebar with vertical layout
 * - **Collapsed Sidebar**: Minimal 72px icon-only sidebar
 *
 * ## Features
 * - Cover photo upload support
 * - Privacy indicators (Public/Private/Hidden)
 * - Member/Post/Event statistics
 * - Join/Leave actions
 * - Leader toolbar (Edit/Settings/Analytics)
 * - Member preview avatars with portrait cards
 * - Space tags with overflow handling
 *
 * ## Usage
 * ```tsx
 * <SpaceHeader
 *   name="CS Study Group"
 *   description="Weekly study sessions for Computer Science students"
 *   category="Academic"
 *   memberCount={87}
 *   postCount={234}
 *   eventCount={12}
 *   hasJoined={true}
 *   layout="header"
 * />
 * ```
 */
const meta = {
  title: "09-Spaces/SpaceHeader",
  component: SpaceHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header layout - academic space
 */
export const Default: Story = {
  args: {
    name: "CS Study Group",
    description: "Weekly study sessions for Computer Science students. Join us to collaborate on assignments, prepare for exams, and build lasting connections.",
    category: "Academic",
    memberCount: 87,
    postCount: 234,
    eventCount: 12,
    hasJoined: false,
    privacy: "public",
    tags: ["computer-science", "study-group", "academic"],
    memberAvatars: [
      { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
      { name: "Alex Morgan", avatar: "https://github.com/vercel.png" },
      { name: "Jordan Lee" },
      { name: "Casey Kim" },
      { name: "Morgan Taylor", avatar: "https://github.com/shadcn.png" },
      { name: "Riley Park" },
    ],
    layout: "header",
  },
};

/**
 * Already joined space with leader access
 */
export const JoinedAsLeader: Story = {
  args: {
    name: "UB Gaming",
    description: "Official gaming community for UB students. Organize tournaments, find teammates, and join weekly game nights.",
    coverPhoto: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Gaming",
    memberCount: 143,
    postCount: 567,
    eventCount: 28,
    hasJoined: true,
    isLeader: true,
    privacy: "public",
    tags: ["gaming", "esports", "tournaments", "social"],
    memberAvatars: [
      { name: "Alex Thompson", avatar: "https://github.com/vercel.png" },
      { name: "Sam Rodriguez" },
      { name: "Jamie Davis", avatar: "https://github.com/shadcn.png" },
      { name: "Taylor Kim" },
      { name: "Morgan Lee", avatar: "https://github.com/vercel.png" },
      { name: "Casey Park" },
      { name: "Jordan Smith" },
      { name: "Riley Chen" },
    ],
    layout: "header",
  },
};

/**
 * Private space with custom cover
 */
export const PrivateSpace: Story = {
  args: {
    name: "Engineering Social",
    description: "Private community for engineering students. Share resources, collaborate on projects, and network with peers in your major.",
    coverPhoto: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=400&fit=crop",
    category: "Academic",
    memberCount: 92,
    postCount: 178,
    eventCount: 15,
    hasJoined: true,
    privacy: "private",
    tags: ["engineering", "networking", "projects"],
    memberAvatars: [
      { name: "Maya Patel", avatar: "https://github.com/shadcn.png" },
      { name: "Chris Johnson" },
      { name: "Zoe Williams", avatar: "https://github.com/vercel.png" },
      { name: "Noah Martinez" },
    ],
    layout: "header",
  },
};

/**
 * Sidebar layout - compact vertical view
 */
export const SidebarLayout: Story = {
  args: {
    name: "Campus Events",
    description: "Stay updated on all campus happenings, festivals, and student activities.",
    category: "Social",
    memberCount: 256,
    postCount: 892,
    eventCount: 45,
    hasJoined: true,
    privacy: "public",
    tags: ["events", "campus", "social", "festivals"],
    memberAvatars: [
      { name: "Alex Chen", avatar: "https://github.com/shadcn.png" },
      { name: "Sam Kim" },
      { name: "Jordan Lee", avatar: "https://github.com/vercel.png" },
      { name: "Taylor Park" },
    ],
    layout: "sidebar",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <div className="flex-1 bg-background p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Space Feed</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <div className="h-16 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
};

/**
 * Sidebar with leader controls
 */
export const SidebarWithLeaderControls: Story = {
  args: {
    name: "Tech Innovation Hub",
    description: "Explore cutting-edge technology and innovation projects.",
    coverPhoto: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    category: "Technology",
    memberCount: 124,
    postCount: 445,
    eventCount: 22,
    hasJoined: true,
    isLeader: true,
    privacy: "public",
    tags: ["tech", "innovation", "startups"],
    memberAvatars: [
      { name: "Sophia Liu", avatar: "https://github.com/shadcn.png" },
      { name: "Ethan Brown" },
      { name: "Olivia Garcia", avatar: "https://github.com/vercel.png" },
    ],
    layout: "sidebar",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <div className="flex-1 bg-background" />
      </div>
    ),
  ],
};

/**
 * Interactive layout toggle demo
 */
export const InteractiveLayoutToggle: Story = {
  render: () => {
    const [layout, setLayout] = useState<"header" | "sidebar">("header");

    return (
      <div className="min-h-screen bg-background">
        {layout === "header" ? (
          <div>
            <SpaceHeader
              name="Outdoor Adventures"
              description="Explore nature with fellow students. Weekly hikes, camping trips, and outdoor activities around Buffalo and Niagara Falls."
              coverPhoto="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
              category="Recreation"
              memberCount={78}
              postCount={156}
              eventCount={19}
              hasJoined={true}
              isLeader={false}
              privacy="public"
              tags={["hiking", "camping", "nature", "outdoor"]}
              memberAvatars={[
                { name: "Emma Wilson", avatar: "https://github.com/shadcn.png" },
                { name: "Liam Davis" },
                { name: "Ava Martinez", avatar: "https://github.com/vercel.png" },
                { name: "Noah Johnson" },
              ]}
              layout="header"
            />
            <div className="container py-6">
              <button
                onClick={() => setLayout("sidebar")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90"
              >
                Switch to Sidebar Layout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-screen">
            <SpaceHeader
              name="Outdoor Adventures"
              description="Explore nature with fellow students."
              category="Recreation"
              memberCount={78}
              postCount={156}
              eventCount={19}
              hasJoined={true}
              privacy="public"
              tags={["hiking", "camping", "nature"]}
              memberAvatars={[
                { name: "Emma Wilson", avatar: "https://github.com/shadcn.png" },
                { name: "Liam Davis" },
                { name: "Ava Martinez", avatar: "https://github.com/vercel.png" },
              ]}
              layout="sidebar"
              onToggleLayout={() => setLayout("header")}
            />
            <div className="flex-1 bg-background p-6">
              <button
                onClick={() => setLayout("header")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90"
              >
                Switch to Header Layout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Collapsed sidebar state
 */
export const CollapsedSidebar: Story = {
  args: {
    name: "Music & Arts",
    category: "Arts",
    memberCount: 112,
    postCount: 334,
    eventCount: 27,
    hasJoined: true,
    layout: "sidebar",
    isCollapsed: true,
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <div className="flex-1 bg-background p-6">
          <p className="text-sm text-muted-foreground">Collapsed sidebar shows icon-only quick access</p>
        </div>
      </div>
    ),
  ],
};

/**
 * Hidden space
 */
export const HiddenSpace: Story = {
  args: {
    name: "Secret Study Squad",
    description: "Invitation-only study group for advanced coursework",
    category: "Academic",
    memberCount: 12,
    postCount: 45,
    eventCount: 3,
    hasJoined: true,
    isLeader: true,
    privacy: "hidden",
    tags: ["private", "advanced"],
    memberAvatars: [
      { name: "Alice Wong", avatar: "https://github.com/shadcn.png" },
      { name: "Bob Smith" },
    ],
    layout: "header",
  },
};

/**
 * HIVE Pattern: New space (not joined)
 */
export const NotJoinedYet: Story = {
  args: {
    name: "Photography Club",
    description: "Capture moments and improve your photography skills. Weekly photo walks, workshops, and critiques.",
    coverPhoto: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop",
    category: "Arts",
    memberCount: 68,
    postCount: 289,
    eventCount: 16,
    hasJoined: false,
    privacy: "public",
    tags: ["photography", "art", "creative"],
    memberAvatars: [
      { name: "Luna Zhang", avatar: "https://github.com/vercel.png" },
      { name: "Max Cooper" },
      { name: "Ivy Lee", avatar: "https://github.com/shadcn.png" },
    ],
    layout: "header",
  },
};

/**
 * HIVE Pattern: Large active community
 */
export const LargeCommunity: Story = {
  args: {
    name: "UB Bulls Basketball Fans",
    description: "Official fan community for UB Bulls basketball. Game discussions, tailgate planning, and team updates.",
    coverPhoto: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    category: "Sports",
    memberCount: 523,
    postCount: 1847,
    eventCount: 38,
    hasJoined: true,
    privacy: "public",
    tags: ["basketball", "sports", "ub-bulls", "game-day"],
    memberAvatars: [
      { name: "Marcus Johnson", avatar: "https://github.com/shadcn.png" },
      { name: "Lisa Chen" },
      { name: "David Kim", avatar: "https://github.com/vercel.png" },
      { name: "Amy Rodriguez" },
      { name: "Chris Lee" },
      { name: "Nina Patel", avatar: "https://github.com/shadcn.png" },
      { name: "Tom Wilson" },
      { name: "Sara Garcia" },
    ],
    layout: "header",
  },
};

/**
 * All space actions demo
 */
export const AllActionsDemo: Story = {
  args: {
    name: "Campus Wellness",
    description: "Mental health, fitness, and overall wellness for students",
    category: "Health",
    memberCount: 156,
    postCount: 423,
    eventCount: 31,
    hasJoined: true,
    isLeader: true,
    privacy: "public",
    tags: ["wellness", "fitness", "mental-health"],
    memberAvatars: [
      { name: "Dr. Sarah Miller", avatar: "https://github.com/vercel.png" },
      { name: "Coach Mike" },
      { name: "Wellness Team", avatar: "https://github.com/shadcn.png" },
    ],
    onJoin: () => console.log("Join clicked"),
    onLeave: () => console.log("Leave clicked"),
    onEdit: () => console.log("Edit clicked"),
    onSettings: () => console.log("Settings clicked"),
    onAnalytics: () => console.log("Analytics clicked"),
    onInvite: () => console.log("Invite clicked"),
    layout: "header",
  },
};
