import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem } from "../../atomic/molecules/notification-item";

/**
 * # NotificationItem
 *
 * Molecule component combining Avatar + Card + Badge for displaying notifications.
 * Used throughout HIVE for real-time updates on comments, likes, follows, space invites, and event reminders.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for hover effects and read state transitions
 * - Unread indicator dot animates smoothly when marked as read
 * - Type icon badge uses smooth positioning transitions
 *
 * ## Notification Types
 * - **comment**: New comment on your post
 * - **like**: Someone liked your post
 * - **follow**: New follower
 * - **mention**: Mentioned in a post
 * - **space_invite**: Invited to join a space
 * - **event_reminder**: Upcoming event reminder
 * - **ritual_reminder**: Ritual check-in reminder
 * - **post**: New post in followed space
 *
 * ## Usage
 * ```tsx
 * <NotificationItem
 *   userName="Sarah Chen"
 *   type="comment"
 *   message="commented on your post"
 *   timestamp="2 minutes ago"
 *   isRead={false}
 *   onRead={() => markAsRead()}
 * />
 * ```
 */
const meta = {
  title: "11-Shared/NotificationItem",
  component: NotificationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Unread comment notification
 */
export const Comment: Story = {
  args: {
    userName: "Sarah Chen",
    avatar: "https://github.com/shadcn.png",
    type: "comment",
    message: "commented on your post in CS Study Group",
    timestamp: "2 minutes ago",
    isRead: false,
    className: "w-[400px]",
  },
};

/**
 * Like notification
 */
export const Like: Story = {
  args: {
    userName: "Alex Morgan",
    avatar: "https://github.com/vercel.png",
    type: "like",
    message: "liked your post about the midterm",
    timestamp: "5 minutes ago",
    isRead: false,
    className: "w-[400px]",
  },
};

/**
 * New follower notification
 */
export const Follow: Story = {
  args: {
    userName: "Jordan Lee",
    type: "follow",
    message: "started following you",
    timestamp: "1 hour ago",
    isRead: false,
    badge: "New",
    badgeVariant: "secondary",
    className: "w-[400px]",
  },
};

/**
 * Mention notification
 */
export const Mention: Story = {
  args: {
    userName: "Casey Kim",
    avatar: "https://github.com/shadcn.png",
    type: "mention",
    message: "mentioned you in a post",
    timestamp: "3 hours ago",
    isRead: false,
    className: "w-[400px]",
  },
};

/**
 * Space invite notification
 */
export const SpaceInvite: Story = {
  args: {
    userName: "Morgan Taylor",
    avatar: "https://github.com/vercel.png",
    type: "space_invite",
    message: "invited you to join UB Gaming",
    timestamp: "Yesterday",
    isRead: false,
    badge: "Invite",
    badgeVariant: "default",
    className: "w-[400px]",
  },
};

/**
 * Event reminder notification
 */
export const EventReminder: Story = {
  args: {
    userName: "Campus Events",
    type: "event_reminder",
    message: "Study Session: Data Structures starts in 1 hour",
    timestamp: "Just now",
    isRead: false,
    badge: "Today",
    badgeVariant: "destructive",
    className: "w-[400px]",
  },
};

/**
 * Ritual reminder notification
 */
export const RitualReminder: Story = {
  args: {
    userName: "HIVE",
    type: "ritual_reminder",
    message: "Don't forget your daily check-in! Keep your streak alive 🔥",
    timestamp: "8:00 AM",
    isRead: false,
    badge: "Ritual",
    badgeVariant: "default",
    className: "w-[400px]",
  },
};

/**
 * New post notification
 */
export const Post: Story = {
  args: {
    userName: "Engineering Social",
    avatar: "https://github.com/shadcn.png",
    type: "post",
    message: "posted a new event: Career Fair Prep Workshop",
    timestamp: "2 days ago",
    isRead: false,
    className: "w-[400px]",
  },
};

/**
 * Read notification (muted appearance)
 */
export const Read: Story = {
  args: {
    userName: "Riley Park",
    avatar: "https://github.com/vercel.png",
    type: "comment",
    message: "replied to your comment",
    timestamp: "3 days ago",
    isRead: true,
    className: "w-[400px]",
  },
};

/**
 * HIVE Pattern: Notification feed
 */
export const NotificationFeed: Story = {
  render: () => (
    <div className="flex w-[450px] flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            4 new
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <NotificationItem
          userName="Sarah Chen"
          avatar="https://github.com/shadcn.png"
          type="comment"
          message="commented on your post in CS Study Group"
          timestamp="2 minutes ago"
          isRead={false}
        />
        <NotificationItem
          userName="Alex Morgan"
          avatar="https://github.com/vercel.png"
          type="like"
          message="liked your post about the midterm"
          timestamp="5 minutes ago"
          isRead={false}
        />
        <NotificationItem
          userName="Jordan Lee"
          type="follow"
          message="started following you"
          timestamp="1 hour ago"
          isRead={false}
          badge="New"
        />
        <NotificationItem
          userName="Campus Events"
          type="event_reminder"
          message="Study Session starts in 1 hour"
          timestamp="Just now"
          isRead={false}
          badge="Today"
          badgeVariant="destructive"
        />
        <NotificationItem
          userName="Riley Park"
          avatar="https://github.com/shadcn.png"
          type="comment"
          message="replied to your comment"
          timestamp="Yesterday"
          isRead={true}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Mixed notification types (inbox)
 */
export const MixedNotifications: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">All Notifications</h3>
        <button className="text-xs text-primary hover:underline">Mark all as read</button>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
        <NotificationItem
          userName="HIVE"
          type="ritual_reminder"
          message="Daily check-in reminder! Keep your 12-day streak alive 🔥"
          timestamp="8:00 AM"
          isRead={false}
          badge="Ritual"
        />
        <NotificationItem
          userName="Morgan Taylor"
          avatar="https://github.com/vercel.png"
          type="space_invite"
          message="invited you to join UB Gaming"
          timestamp="Yesterday"
          isRead={false}
          badge="Invite"
          badgeVariant="default"
        />
        <NotificationItem
          userName="Casey Kim"
          avatar="https://github.com/shadcn.png"
          type="mention"
          message="mentioned you in CS Study Group"
          timestamp="2 days ago"
          isRead={false}
        />
        <NotificationItem
          userName="Engineering Social"
          type="post"
          message="posted a new event: Career Fair Prep"
          timestamp="3 days ago"
          isRead={true}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Time-grouped notifications
 */
export const TimeGrouped: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Today
        </h4>
        <div className="flex flex-col gap-1.5">
          <NotificationItem
            userName="Sarah Chen"
            avatar="https://github.com/shadcn.png"
            type="comment"
            message="commented on your post"
            timestamp="2 minutes ago"
            isRead={false}
          />
          <NotificationItem
            userName="Alex Morgan"
            avatar="https://github.com/vercel.png"
            type="like"
            message="liked your post"
            timestamp="5 minutes ago"
            isRead={false}
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Yesterday
        </h4>
        <div className="flex flex-col gap-1.5">
          <NotificationItem
            userName="Jordan Lee"
            type="follow"
            message="started following you"
            timestamp="Yesterday at 3:45 PM"
            isRead={true}
          />
          <NotificationItem
            userName="Campus Events"
            type="event_reminder"
            message="Reminder: Game Night tonight"
            timestamp="Yesterday at 2:00 PM"
            isRead={true}
            badge="Event"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Earlier
        </h4>
        <div className="flex flex-col gap-1.5">
          <NotificationItem
            userName="Morgan Taylor"
            avatar="https://github.com/vercel.png"
            type="space_invite"
            message="invited you to UB Gaming"
            timestamp="3 days ago"
            isRead={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Compact notification list
 */
export const CompactList: Story = {
  render: () => (
    <div className="flex w-[350px] flex-col gap-1 rounded-lg border border-border bg-card p-2">
      <NotificationItem
        userName="Sarah Chen"
        avatar="https://github.com/shadcn.png"
        type="comment"
        message="commented"
        timestamp="2m"
        isRead={false}
      />
      <NotificationItem
        userName="Alex Morgan"
        avatar="https://github.com/vercel.png"
        type="like"
        message="liked your post"
        timestamp="5m"
        isRead={false}
      />
      <NotificationItem
        userName="Jordan Lee"
        type="follow"
        message="followed you"
        timestamp="1h"
        isRead={true}
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * All notification types showcase
 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex w-[450px] flex-col gap-2">
      <h3 className="text-sm font-semibold text-muted-foreground">
        All Notification Types
      </h3>
      <div className="flex flex-col gap-1.5">
        <NotificationItem
          userName="User"
          type="comment"
          message="Comment notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="like"
          message="Like notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="follow"
          message="Follow notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="mention"
          message="Mention notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="space_invite"
          message="Space invite notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="event_reminder"
          message="Event reminder notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="ritual_reminder"
          message="Ritual reminder notification"
          timestamp="now"
          isRead={false}
        />
        <NotificationItem
          userName="User"
          type="post"
          message="Post notification"
          timestamp="now"
          isRead={false}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
