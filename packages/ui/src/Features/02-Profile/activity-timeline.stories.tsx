import type { Meta, StoryObj } from "@storybook/react";
import { ActivityTimeline } from "../../atomic/molecules/activity-timeline";

/**
 * # ActivityTimeline
 *
 * Molecule component for displaying chronological user activity feed.
 * Shows posts, connections, space joins, and other engagement events.
 *
 * ## HIVE Activity Types
 * - **post**: User created a post
 * - **comment**: User commented on content
 * - **connection**: User connected with someone
 * - **space_join**: User joined a space
 * - **space_post**: User posted in a space
 * - **ritual_complete**: User completed a ritual check-in
 * - **tool_create**: User created a HiveLab tool
 * - **achievement**: User earned an achievement
 *
 * ## Features
 * - **Visual Timeline**: Vertical line with colored activity icons
 * - **Metadata Support**: Show post previews, connection avatars, badges
 * - **Clickable Items**: Navigate to activity detail pages
 * - **Limit & View All**: Show subset with "View All" button
 * - **Empty State**: Friendly message when no activities
 *
 * ## Usage
 * ```tsx
 * <ActivityTimeline
 *   activities={[
 *     {
 *       id: "1",
 *       type: "post",
 *       timestamp: "2 hours ago",
 *       title: "Posted in CS Study Group",
 *       description: "Shared study notes for midterm",
 *       metadata: { postPreview: "Check out these notes..." }
 *     }
 *   ]}
 *   limit={5}
 *   showViewAll={true}
 * />
 * ```
 */
const meta = {
  title: "02-Profile/ActivityTimeline",
  component: ActivityTimeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample activities
const recentActivities = [
  {
    id: "1",
    type: "post" as const,
    timestamp: "2 hours ago",
    title: "Posted in CS Study Group",
    description: "Shared study notes for the upcoming midterm",
    metadata: {
      spaceName: "CS Study Group",
      postPreview: "Check out these comprehensive notes for Chapter 5-8. Let me know if you have questions!",
    },
    onClick: () => console.log("Navigate to post"),
  },
  {
    id: "2",
    type: "connection" as const,
    timestamp: "5 hours ago",
    title: "Connected with Alex Morgan",
    description: "New connection from Biology department",
    metadata: {
      connectionName: "Alex Morgan",
      avatarUrl: "https://github.com/vercel.png",
    },
    onClick: () => console.log("Navigate to connection"),
  },
  {
    id: "3",
    type: "space_join" as const,
    timestamp: "Yesterday",
    title: "Joined AI/ML Club",
    description: "Started following this community",
    metadata: {
      spaceName: "AI/ML Club",
      badge: {
        label: "89 members",
        variant: "secondary" as const,
      },
    },
  },
  {
    id: "4",
    type: "comment" as const,
    timestamp: "2 days ago",
    title: "Commented on a post",
    description: "Added thoughts in Climate Action Club",
    metadata: {
      postPreview: "Great initiative! I'd love to help organize the campus cleanup event.",
    },
  },
  {
    id: "5",
    type: "ritual_complete" as const,
    timestamp: "3 days ago",
    title: "Completed Morning Meditation",
    description: "Day 7 streak!",
    metadata: {
      badge: {
        label: "7 day streak 🔥",
        variant: "default" as const,
      },
    },
  },
  {
    id: "6",
    type: "tool_create" as const,
    timestamp: "4 days ago",
    title: "Created Study Timer tool",
    description: "Built a Pomodoro timer in HiveLab",
    metadata: {
      badge: {
        label: "12 users",
        variant: "secondary" as const,
      },
    },
  },
  {
    id: "7",
    type: "achievement" as const,
    timestamp: "5 days ago",
    title: "Earned 'Community Builder' badge",
    description: "Connected with 50 people",
    metadata: {
      badge: {
        label: "Achievement unlocked",
        variant: "default" as const,
      },
    },
  },
  {
    id: "8",
    type: "space_post" as const,
    timestamp: "1 week ago",
    title: "Posted in Coffee Chats",
    description: "Looking for study partners",
    metadata: {
      spaceName: "Coffee Chats",
      postPreview: "Anyone free for coffee tomorrow at 2pm? Need to review calculus.",
    },
  },
];

/**
 * Default timeline (unlimited)
 */
export const Default: Story = {
  args: {
    activities: recentActivities.slice(0, 5),
  },
};

/**
 * With limit and "View All" button
 */
export const WithLimit: Story = {
  args: {
    activities: recentActivities,
    limit: 5,
    showViewAll: true,
    onViewAll: () => console.log("View all activities"),
  },
};

/**
 * Compact variant
 */
export const Compact: Story = {
  args: {
    activities: recentActivities.slice(0, 4),
    variant: "compact",
  },
};

/**
 * Long timeline (many activities)
 */
export const LongTimeline: Story = {
  args: {
    activities: recentActivities,
  },
};

/**
 * Recent activity only (3 items)
 */
export const RecentOnly: Story = {
  args: {
    activities: recentActivities.slice(0, 3),
  },
};

/**
 * Posts and comments only
 */
export const PostsAndComments: Story = {
  args: {
    activities: recentActivities.filter(
      (a) => a.type === "post" || a.type === "comment" || a.type === "space_post"
    ),
  },
};

/**
 * Social activities (connections and space joins)
 */
export const SocialActivities: Story = {
  args: {
    activities: recentActivities.filter(
      (a) => a.type === "connection" || a.type === "space_join"
    ),
  },
};

/**
 * Achievements and rituals
 */
export const AchievementsAndRituals: Story = {
  args: {
    activities: recentActivities.filter(
      (a) => a.type === "achievement" || a.type === "ritual_complete"
    ),
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    activities: [],
  },
};

/**
 * Single activity
 */
export const SingleActivity: Story = {
  args: {
    activities: [recentActivities[0]],
  },
};

/**
 * Without descriptions
 */
export const WithoutDescriptions: Story = {
  args: {
    activities: recentActivities.map((a) => ({
      ...a,
      description: undefined,
    })).slice(0, 5),
  },
};

/**
 * Without metadata
 */
export const WithoutMetadata: Story = {
  args: {
    activities: recentActivities.map((a) => ({
      ...a,
      metadata: undefined,
    })).slice(0, 5),
  },
};

/**
 * Profile page integration
 */
export const ProfilePageIntegration: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Recent Activity</h2>
        <p className="text-muted-foreground">
          Your latest posts, connections, and engagements
        </p>
      </div>

      <ActivityTimeline
        activities={recentActivities}
        limit={5}
        showViewAll={true}
        onViewAll={() => console.log("Navigate to full activity page")}
      />
    </div>
  ),
};

/**
 * Dashboard widget
 */
export const DashboardWidget: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Activity</h3>
          <button className="text-xs text-primary hover:underline">
            View all
          </button>
        </div>

        <ActivityTimeline
          activities={recentActivities.slice(0, 3)}
          variant="compact"
        />
      </div>
    </div>
  ),
};

/**
 * All activity types showcase
 */
export const AllActivityTypes: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Activity Type Examples
        </h2>
        <p className="text-muted-foreground">
          All 8 activity types with their unique icons and colors
        </p>
      </div>

      <ActivityTimeline activities={recentActivities} />
    </div>
  ),
};

/**
 * Comparative: Default vs Compact
 */
export const Comparison: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Default Variant (Full Details)
        </h3>
        <ActivityTimeline activities={recentActivities.slice(0, 3)} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Compact Variant (Minimal)
        </h3>
        <ActivityTimeline
          activities={recentActivities.slice(0, 3)}
          variant="compact"
        />
      </div>
    </div>
  ),
};

/**
 * Real-time updates simulation
 */
export const RealTimeUpdates: Story = {
  render: () => {
    const [activities, setActivities] = React.useState(recentActivities.slice(0, 3));

    const addActivity = () => {
      const newActivity = {
        id: `new-${Date.now()}`,
        type: "post" as const,
        timestamp: "Just now",
        title: "Posted a new update",
        description: "This activity was just added!",
        metadata: {
          postPreview: "Real-time activity update!",
          badge: {
            label: "New",
            variant: "default" as const,
          },
        },
      };

      setActivities([newActivity, ...activities]);
    };

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Activity Feed</h2>
          <button
            onClick={addActivity}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
          >
            + Add Activity
          </button>
        </div>

        <ActivityTimeline activities={activities} />
      </div>
    );
  },
};
