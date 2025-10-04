import type { Meta, StoryObj } from "@storybook/react";
import { SpaceCard } from "../../atomic/molecules/space-card";

/**
 * # SpaceCard
 *
 * Molecule component for displaying space previews in discovery/browse views.
 * Combines cover photo, stats, member previews, and join actions.
 *
 * ## HIVE Motion System
 * - Framer Motion `whileHover` creates smooth lift effect
 * - Cover photo scales on hover with `transition-smooth ease-liquid`
 * - All interactive elements use consistent motion timing
 *
 * ## Features
 * - Cover photo with gradient fallback
 * - Privacy indicators (Public/Private/Hidden)
 * - Category badge
 * - Member/Post counts with icons
 * - Portrait card member previews (8×7px)
 * - Tag display with overflow handling
 * - Join/Joined state toggle
 *
 * ## Usage
 * ```tsx
 * <SpaceCard
 *   name="CS Study Group"
 *   description="Weekly study sessions for Computer Science students"
 *   category="Academic"
 *   memberCount={87}
 *   postCount={234}
 *   isJoined={false}
 *   onJoin={() => console.log("Joined!")}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceCard",
  component: SpaceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default space card - academic category
 */
export const Default: Story = {
  args: {
    name: "CS Study Group",
    description: "Weekly study sessions for Computer Science students. Join us to collaborate on assignments and prepare for exams.",
    category: "Academic",
    memberCount: 87,
    postCount: 234,
    privacy: "public",
    tags: ["computer-science", "study-group"],
    memberAvatars: [
      { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
      { name: "Alex Morgan", avatar: "https://github.com/vercel.png" },
      { name: "Jordan Lee" },
    ],
  },
};

/**
 * Space with cover photo
 */
export const WithCoverPhoto: Story = {
  args: {
    name: "UB Gaming",
    description: "Official gaming community for UB students. Organize tournaments, find teammates, and join weekly game nights.",
    coverPhoto: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    category: "Gaming",
    memberCount: 143,
    postCount: 567,
    privacy: "public",
    tags: ["gaming", "esports", "tournaments"],
    memberAvatars: [
      { name: "Alex Thompson", avatar: "https://github.com/vercel.png" },
      { name: "Sam Rodriguez" },
      { name: "Jamie Davis", avatar: "https://github.com/shadcn.png" },
      { name: "Taylor Kim" },
      { name: "Morgan Lee" },
    ],
  },
};

/**
 * Already joined space
 */
export const Joined: Story = {
  args: {
    name: "Campus Events",
    description: "Stay updated on all campus happenings, festivals, and student activities.",
    coverPhoto: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop",
    category: "Social",
    memberCount: 256,
    postCount: 892,
    isJoined: true,
    privacy: "public",
    tags: ["events", "campus", "social"],
    memberAvatars: [
      { name: "Emma Wilson", avatar: "https://github.com/shadcn.png" },
      { name: "Liam Davis" },
    ],
  },
};

/**
 * Private space
 */
export const PrivateSpace: Story = {
  args: {
    name: "Engineering Social",
    description: "Private community for engineering students. Share resources and collaborate on projects.",
    coverPhoto: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop",
    category: "Academic",
    memberCount: 92,
    postCount: 178,
    privacy: "private",
    tags: ["engineering", "networking"],
    memberAvatars: [
      { name: "Maya Patel", avatar: "https://github.com/shadcn.png" },
      { name: "Chris Johnson" },
    ],
  },
};

/**
 * Hidden space (invitation only)
 */
export const HiddenSpace: Story = {
  args: {
    name: "Secret Study Squad",
    description: "Invitation-only study group for advanced coursework",
    category: "Academic",
    memberCount: 12,
    postCount: 45,
    isJoined: true,
    privacy: "hidden",
    tags: ["private", "advanced"],
    memberAvatars: [
      { name: "Alice Wong" },
      { name: "Bob Smith" },
    ],
  },
};

/**
 * Large active community
 */
export const LargeCommunity: Story = {
  args: {
    name: "UB Bulls Basketball Fans",
    description: "Official fan community for UB Bulls basketball. Game discussions, tailgate planning, and team updates.",
    coverPhoto: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop",
    category: "Sports",
    memberCount: 523,
    postCount: 1847,
    privacy: "public",
    tags: ["basketball", "sports", "ub-bulls", "game-day"],
    memberAvatars: [
      { name: "Marcus Johnson", avatar: "https://github.com/shadcn.png" },
      { name: "Lisa Chen" },
      { name: "David Kim", avatar: "https://github.com/vercel.png" },
      { name: "Amy Rodriguez" },
      { name: "Chris Lee" },
      { name: "Nina Patel" },
    ],
  },
};

/**
 * Minimal space (new)
 */
export const NewSpace: Story = {
  args: {
    name: "Photography Club",
    description: "Just getting started! Join us to capture moments and improve your skills.",
    category: "Arts",
    memberCount: 5,
    postCount: 2,
    privacy: "public",
    tags: ["photography"],
    memberAvatars: [
      { name: "Luna Zhang", avatar: "https://github.com/vercel.png" },
    ],
  },
};

/**
 * Many tags overflow
 */
export const ManyTags: Story = {
  args: {
    name: "Tech Innovation Hub",
    description: "Explore cutting-edge technology and innovation projects",
    category: "Technology",
    memberCount: 124,
    postCount: 445,
    privacy: "public",
    tags: ["tech", "innovation", "startups", "ai", "blockchain", "web3", "mobile"],
    memberAvatars: [
      { name: "Sophia Liu", avatar: "https://github.com/shadcn.png" },
      { name: "Ethan Brown" },
    ],
  },
};

/**
 * HIVE Pattern: Discovery grid
 */
export const DiscoveryGrid: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Discover Spaces</h2>
        <p className="text-sm text-muted-foreground">Join communities around your interests</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SpaceCard
          name="CS Study Group"
          description="Weekly study sessions for Computer Science students"
          category="Academic"
          memberCount={87}
          postCount={234}
          privacy="public"
          tags={["computer-science", "study-group"]}
          memberAvatars={[
            { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
            { name: "Alex Morgan" },
          ]}
        />
        <SpaceCard
          name="UB Gaming"
          description="Official gaming community for UB students"
          coverPhoto="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop"
          category="Gaming"
          memberCount={143}
          postCount={567}
          isJoined={true}
          privacy="public"
          tags={["gaming", "esports"]}
          memberAvatars={[
            { name: "Alex Thompson", avatar: "https://github.com/vercel.png" },
            { name: "Sam Rodriguez" },
            { name: "Jamie Davis", avatar: "https://github.com/shadcn.png" },
          ]}
        />
        <SpaceCard
          name="Campus Events"
          description="Stay updated on all campus happenings"
          coverPhoto="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
          category="Social"
          memberCount={256}
          postCount={892}
          privacy="public"
          tags={["events", "campus"]}
          memberAvatars={[
            { name: "Emma Wilson", avatar: "https://github.com/shadcn.png" },
          ]}
        />
        <SpaceCard
          name="Engineering Social"
          description="Private community for engineering students"
          coverPhoto="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop"
          category="Academic"
          memberCount={92}
          postCount={178}
          privacy="private"
          tags={["engineering"]}
          memberAvatars={[
            { name: "Maya Patel", avatar: "https://github.com/shadcn.png" },
            { name: "Chris Johnson" },
          ]}
        />
        <SpaceCard
          name="Outdoor Adventures"
          description="Explore nature with fellow students"
          coverPhoto="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          category="Recreation"
          memberCount={78}
          postCount={156}
          privacy="public"
          tags={["hiking", "camping"]}
          memberAvatars={[
            { name: "Liam Davis" },
            { name: "Ava Martinez", avatar: "https://github.com/vercel.png" },
          ]}
        />
        <SpaceCard
          name="Music & Arts"
          description="Creative community for musicians and artists"
          category="Arts"
          memberCount={112}
          postCount={334}
          privacy="public"
          tags={["music", "art"]}
          memberAvatars={[
            { name: "Luna Zhang", avatar: "https://github.com/vercel.png" },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Interactive demo
 */
export const InteractiveDemo: Story = {
  args: {
    name: "Outdoor Adventures",
    description: "Weekly hikes, camping trips, and outdoor activities around Buffalo and Niagara Falls.",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "Recreation",
    memberCount: 78,
    postCount: 156,
    privacy: "public",
    tags: ["hiking", "camping", "nature"],
    memberAvatars: [
      { name: "Emma Wilson", avatar: "https://github.com/shadcn.png" },
      { name: "Liam Davis" },
      { name: "Ava Martinez", avatar: "https://github.com/vercel.png" },
    ],
    onClick: () => console.log("Card clicked - navigate to space"),
    onJoin: () => console.log("Join clicked"),
    onLeave: () => console.log("Leave clicked"),
  },
};
