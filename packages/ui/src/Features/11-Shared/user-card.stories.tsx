import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "../../atomic/molecules/user-card";

/**
 * # UserCard
 *
 * Molecule component combining Avatar + Card + Button for displaying user profiles.
 * Used throughout HIVE for member lists, connection suggestions, search results, and friend requests.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for hover effects and button interactions
 * - Online status indicator uses smooth transitions
 * - Badge and button interactions use HIVE motion tokens
 *
 * ## Usage
 * ```tsx
 * <UserCard
 *   name="Sarah Chen"
 *   handle="@sarahc"
 *   avatar="https://..."
 *   bio="CS major, coffee enthusiast"
 *   actionLabel="Follow"
 *   onAction={() => console.log('followed')}
 *   isOnline
 * />
 * ```
 */
const meta = {
  title: "11-Shared/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default user card with just name and handle
 */
export const Default: Story = {
  args: {
    name: "Sarah Chen",
    handle: "@sarahc",
    className: "w-[350px]",
  },
};

/**
 * With avatar image
 */
export const WithAvatar: Story = {
  args: {
    name: "Alex Morgan",
    handle: "@alex",
    avatar: "https://github.com/shadcn.png",
    className: "w-[350px]",
  },
};

/**
 * With bio description
 */
export const WithBio: Story = {
  args: {
    name: "Jordan Lee",
    handle: "@jordan",
    avatar: "https://github.com/vercel.png",
    bio: "CS major | Coffee enthusiast | Always down for study sessions",
    className: "w-[350px]",
  },
};

/**
 * With badge (Leader, Verified, etc.)
 */
export const WithBadge: Story = {
  args: {
    name: "Casey Kim",
    handle: "@casey",
    avatar: "https://github.com/shadcn.png",
    bio: "Space leader for CS Study Group",
    badge: "Leader",
    badgeVariant: "default",
    className: "w-[350px]",
  },
};

/**
 * With online status indicator
 */
export const WithOnlineStatus: Story = {
  args: {
    name: "Morgan Taylor",
    handle: "@morgan",
    avatar: "https://github.com/vercel.png",
    bio: "Currently studying in Norton Hall",
    isOnline: true,
    className: "w-[350px]",
  },
};

/**
 * With Follow action button
 */
export const WithFollowButton: Story = {
  args: {
    name: "Riley Park",
    handle: "@riley",
    avatar: "https://github.com/shadcn.png",
    bio: "Engineering major | Intramural basketball captain",
    actionLabel: "Follow",
    onAction: () => console.log("Followed Riley"),
    isOnline: true,
    className: "w-[350px]",
  },
};

/**
 * With Message action button
 */
export const WithMessageButton: Story = {
  args: {
    name: "Jamie Davis",
    handle: "@jamie",
    avatar: "https://github.com/vercel.png",
    bio: "Looking for study buddies for CSE 250",
    actionLabel: "Message",
    actionVariant: "secondary",
    onAction: () => console.log("Messaging Jamie"),
    badge: "New",
    badgeVariant: "secondary",
    className: "w-[350px]",
  },
};

/**
 * Disabled state (already followed, etc.)
 */
export const Disabled: Story = {
  args: {
    name: "Sam Rodriguez",
    handle: "@sam",
    avatar: "https://github.com/shadcn.png",
    bio: "Data Science enthusiast",
    actionLabel: "Following",
    disabled: true,
    className: "w-[350px]",
  },
};

/**
 * HIVE Pattern: Space member list
 */
export const SpaceMemberList: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">
        CS Study Group Members
      </h3>
      <div className="flex flex-col gap-2">
        <UserCard
          name="Sarah Chen"
          handle="@sarahc"
          avatar="https://github.com/shadcn.png"
          bio="Space founder | CS senior"
          badge="Leader"
          badgeVariant="default"
          isOnline
          actionLabel="Message"
          actionVariant="secondary"
        />
        <UserCard
          name="Alex Morgan"
          handle="@alex"
          avatar="https://github.com/vercel.png"
          bio="TA for CSE 250"
          badge="Moderator"
          badgeVariant="secondary"
          isOnline
          actionLabel="Message"
          actionVariant="secondary"
        />
        <UserCard
          name="Jordan Lee"
          handle="@jordan"
          bio="Joined last week"
          badge="New Member"
          badgeVariant="outline"
          actionLabel="Follow"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Connection suggestions
 */
export const ConnectionSuggestions: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Suggested Connections
        </h3>
        <span className="text-xs text-muted-foreground">Based on your spaces</span>
      </div>
      <div className="flex flex-col gap-2">
        <UserCard
          name="Riley Park"
          handle="@riley"
          avatar="https://github.com/shadcn.png"
          bio="Engineering major | 12 mutual connections"
          actionLabel="Follow"
          isOnline
        />
        <UserCard
          name="Morgan Taylor"
          handle="@morgan"
          avatar="https://github.com/vercel.png"
          bio="CS Study Group member | Lives in Ellicott"
          actionLabel="Follow"
        />
        <UserCard
          name="Casey Kim"
          handle="@casey"
          bio="Intramural basketball | 8 mutual connections"
          actionLabel="Follow"
          isOnline
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Friend requests
 */
export const FriendRequests: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Friend Requests
        </h3>
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          3
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <UserCard
          name="Jamie Davis"
          handle="@jamie"
          avatar="https://github.com/shadcn.png"
          bio="From UB Gaming space"
          actionLabel="Accept"
          isOnline
        />
        <UserCard
          name="Taylor Brown"
          handle="@taylor"
          avatar="https://github.com/vercel.png"
          bio="Engineering Social member"
          actionLabel="Accept"
        />
        <UserCard
          name="Jordan White"
          handle="@jordanw"
          bio="Campus Events organizer"
          actionLabel="Accept"
          isOnline
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Search results with mixed states
 */
export const SearchResults: Story = {
  render: () => (
    <div className="flex w-[450px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <h3 className="text-lg font-semibold text-foreground">
        Search Results for "chen"
      </h3>
      <div className="flex flex-col gap-2">
        <UserCard
          name="Sarah Chen"
          handle="@sarahc"
          avatar="https://github.com/shadcn.png"
          bio="CS senior | Study group leader"
          badge="Leader"
          badgeVariant="default"
          actionLabel="Following"
          disabled
          isOnline
        />
        <UserCard
          name="Michael Chen"
          handle="@mchen"
          avatar="https://github.com/vercel.png"
          bio="Physics major | Lab partner for PHYS 207"
          actionLabel="Follow"
        />
        <UserCard
          name="Emily Chen"
          handle="@emilyc"
          bio="Just joined HIVE"
          badge="New"
          badgeVariant="secondary"
          actionLabel="Follow"
          isOnline
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Online students (real-time)
 */
export const OnlineStudents: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Online Now
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">24 students</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <UserCard
          name="Alex Morgan"
          handle="@alex"
          avatar="https://github.com/vercel.png"
          bio="Studying in Lockwood Library"
          isOnline
          actionLabel="Message"
          actionVariant="secondary"
        />
        <UserCard
          name="Riley Park"
          handle="@riley"
          avatar="https://github.com/shadcn.png"
          bio="At the gym right now"
          isOnline
          actionLabel="Message"
          actionVariant="secondary"
        />
        <UserCard
          name="Morgan Taylor"
          handle="@morgan"
          bio="Norton Hall, room 341"
          isOnline
          actionLabel="Message"
          actionVariant="secondary"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Compact mode for dense lists
 */
export const CompactList: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-2">
      <UserCard
        name="Sarah Chen"
        handle="@sarahc"
        avatar="https://github.com/shadcn.png"
        actionLabel="Follow"
        actionVariant="ghost"
        isOnline
      />
      <UserCard
        name="Alex Morgan"
        handle="@alex"
        avatar="https://github.com/vercel.png"
        actionLabel="Follow"
        actionVariant="ghost"
      />
      <UserCard
        name="Jordan Lee"
        handle="@jordan"
        actionLabel="Follow"
        actionVariant="ghost"
        isOnline
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
