import type { Meta, StoryObj } from "@storybook/react";
import { NavigationShell } from "../../atomic/organisms/navigation-shell";
// import { useState } from "react"; // Temporarily disabled for debugging

/**
 * # NavigationShell
 *
 * Organism component providing the main app navigation structure with dual-layout support.
 * Used as the persistent layout wrapper for all HIVE pages.
 *
 * ## HIVE Motion System
 * - Framer Motion `layout` prop creates smooth transitions between layouts
 * - Uses `transition-smooth ease-liquid` for dropdown animations
 * - Smooth width/height animations when toggling sidebar collapse state
 * - Hover states on navigation links and buttons use consistent transitions
 * - Backdrop blur effect for depth
 *
 * ## Layout Modes
 * - **Header** (default): Full-width sticky top navigation with horizontal links
 * - **Sidebar**: Fixed-width (240px) vertical navigation on left side
 * - **Collapsed Sidebar**: Minimal (64px) icon-only vertical navigation
 *
 * ## Features
 * - **Dual layout support**: Seamlessly switch between header and sidebar modes
 * - **Collapse state**: Sidebar can collapse to icon-only for maximum content space
 * - **Sticky positioning**: Header stays at top, sidebar stays on left
 * - **Search integration**: Built-in SearchBar (header mode only)
 * - **Notifications**: Dropdown with NotificationItem components
 * - **User menu**: Profile preview with quick actions
 * - **Portrait avatars**: Consistent with HIVE's ID card aesthetic (8×7px ratio)
 * - **Click-outside detection**: Automatically closes dropdowns
 * - **Badge support**: Navigation links show unread counts
 * - **Responsive dropdowns**: Positioning adapts based on layout mode
 *
 * ## Usage
 * ```tsx
 * // Header layout
 * <NavigationShell
 *   currentUserName="Sarah Chen"
 *   currentUserAvatar="https://..."
 *   currentUserHandle="@sarahc"
 *   links={[
 *     { label: "Feed", href: "/feed", isActive: true },
 *     { label: "Spaces", href: "/spaces", badge: 3 }
 *   ]}
 *   layout="header"
 * >
 *   <div>Page content</div>
 * </NavigationShell>
 *
 * // Sidebar layout
 * <NavigationShell
 *   layout="sidebar"
 *   isCollapsed={false}
 * >
 *   <div>Page content</div>
 * </NavigationShell>
 * ```
 */
const meta = {
  title: "08-Navigation/NavigationShell",
  component: NavigationShell,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default navigation shell with basic setup
 */
export const Default: Story = {
  args: {
    currentUserName: "Sarah Chen",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@sarahc",
    links: [
      { label: "Feed", href: "/feed", isActive: true },
      { label: "Spaces", href: "/spaces" },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Profile", href: "/profile" },
    ],
    children: (
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome to HIVE</h1>
        <p className="mt-4 text-muted-foreground">
          This is the main content area. The navigation shell wraps all pages.
        </p>
      </div>
    ),
  },
};

/**
 * With notifications
 */
export const WithNotifications: Story = {
  args: {
    currentUserName: "Alex Morgan",
    currentUserAvatar: "https://github.com/vercel.png",
    currentUserHandle: "@alex",
    links: [
      { label: "Feed", href: "/feed", isActive: true },
      { label: "Spaces", href: "/spaces", badge: 2 },
      { label: "HiveLab", href: "/hivelab" },
    ],
    notificationCount: 5,
    notifications: [
      {
        userName: "Jordan Lee",
        avatar: "https://github.com/shadcn.png",
        type: "comment",
        message: "commented on your post in CS Study Group",
        timestamp: "2 minutes ago",
        isRead: false,
      },
      {
        userName: "Casey Kim",
        avatar: "https://github.com/vercel.png",
        type: "like",
        message: "liked your post",
        timestamp: "5 minutes ago",
        isRead: false,
      },
      {
        userName: "Morgan Taylor",
        type: "follow",
        message: "started following you",
        timestamp: "1 hour ago",
        isRead: false,
        badge: "New",
      },
      {
        userName: "Campus Events",
        type: "event_reminder",
        message: "Study Session starts in 1 hour",
        timestamp: "Just now",
        isRead: false,
        badge: "Today",
        badgeVariant: "destructive",
      },
      {
        userName: "Riley Park",
        avatar: "https://github.com/shadcn.png",
        type: "mention",
        message: "mentioned you in a post",
        timestamp: "Yesterday",
        isRead: true,
      },
    ],
    children: (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-foreground">Feed</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Click the notification bell to see your notifications
        </p>
      </div>
    ),
  },
};

/**
 * Without search bar (focused app)
 */
export const WithoutSearch: Story = {
  args: {
    currentUserName: "Jordan Lee",
    currentUserHandle: "@jordan",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces", isActive: true },
      { label: "HiveLab", href: "/hivelab" },
    ],
    showSearch: false,
    notificationCount: 0,
    children: (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-foreground">Spaces</h1>
      </div>
    ),
  },
};

/**
 * Guest user (not signed in)
 */
export const GuestUser: Story = {
  args: {
    currentUserName: "Guest",
    currentUserHandle: "@guest",
    links: [
      { label: "Feed", href: "/feed", isActive: true },
      { label: "Spaces", href: "/spaces" },
    ],
    showSearch: true,
    notificationCount: 0,
    notifications: [],
    children: (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-foreground">Discover HIVE</h1>
        <p className="mt-4 text-muted-foreground">
          Sign in to access all features
        </p>
      </div>
    ),
  },
};

/**
 * HIVE Pattern: Feed page layout
 */
export const FeedPage: Story = {
  args: {
    currentUserName: "Sarah Chen",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@sarahc",
    links: [
      { label: "Feed", href: "/feed", isActive: true },
      { label: "Spaces", href: "/spaces", badge: 3 },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Rituals", href: "/rituals", badge: 1 },
    ],
    notificationCount: 2,
    notifications: [
      {
        userName: "Alex Morgan",
        avatar: "https://github.com/vercel.png",
        type: "comment",
        message: "replied to your comment",
        timestamp: "5 minutes ago",
        isRead: false,
      },
      {
        userName: "HIVE",
        type: "ritual_reminder",
        message: "Don't forget your daily check-in!",
        timestamp: "8:00 AM",
        isRead: false,
        badge: "Ritual",
      },
    ],
    children: (
      <div className="container py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Feed Composer Placeholder */}
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              What's happening on campus?
            </p>
          </div>

          {/* Feed Posts Placeholder */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-3">
                <div className="h-12 w-10 rounded-md bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * HIVE Pattern: Spaces page layout
 */
export const SpacesPage: Story = {
  args: {
    currentUserName: "Casey Kim",
    currentUserAvatar: "https://github.com/vercel.png",
    currentUserHandle: "@casey",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces", isActive: true },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Profile", href: "/profile" },
    ],
    notificationCount: 1,
    notifications: [
      {
        userName: "Morgan Taylor",
        type: "space_invite",
        message: "invited you to join UB Gaming",
        timestamp: "Just now",
        isRead: false,
        badge: "Invite",
        badgeVariant: "default",
      },
    ],
    children: (
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Discover Spaces</h1>
          <p className="mt-2 text-muted-foreground">
            Join communities around your interests
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Space Cards Placeholder */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * HIVE Pattern: HiveLab page layout
 */
export const HiveLabPage: Story = {
  args: {
    currentUserName: "Riley Park",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@riley",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces" },
      { label: "HiveLab", href: "/hivelab", isActive: true },
      { label: "Profile", href: "/profile" },
    ],
    notificationCount: 0,
    children: (
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">🧪 HiveLab</h1>
          <p className="mt-2 text-muted-foreground">
            Build no-code tools for your spaces
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tool Cards Placeholder */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * HIVE Pattern: Profile page layout
 */
export const ProfilePage: Story = {
  args: {
    currentUserName: "Morgan Taylor",
    currentUserAvatar: "https://github.com/vercel.png",
    currentUserHandle: "@morgan",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces" },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Profile", href: "/profile", isActive: true },
    ],
    notificationCount: 0,
    children: (
      <div className="container py-6">
        {/* Profile Header Placeholder */}
        <div className="mb-6 rounded-lg border border-border bg-card p-6">
          <div className="flex gap-6">
            <div className="h-24 w-20 rounded-lg bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-3 w-full max-w-md rounded bg-muted" />
            </div>
          </div>
        </div>

        {/* Stats Grid Placeholder */}
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-8 w-16 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * Interactive demo with all features
 */
export const InteractiveDemo: Story = {
  args: {
    currentUserName: "Jamie Davis",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@jamie",
    links: [
      { label: "Feed", href: "/feed", isActive: true, badge: 5 },
      { label: "Spaces", href: "/spaces", badge: 2 },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Rituals", href: "/rituals", badge: 1 },
      { label: "Profile", href: "/profile" },
    ],
    notificationCount: 7,
    notifications: [
      {
        userName: "Sarah Chen",
        avatar: "https://github.com/shadcn.png",
        type: "comment",
        message: "commented on your post",
        timestamp: "2 minutes ago",
        isRead: false,
      },
      {
        userName: "Alex Morgan",
        avatar: "https://github.com/vercel.png",
        type: "like",
        message: "liked your post",
        timestamp: "5 minutes ago",
        isRead: false,
      },
      {
        userName: "Jordan Lee",
        type: "follow",
        message: "started following you",
        timestamp: "1 hour ago",
        isRead: false,
      },
    ],
    onSearch: (query) => console.log("Search:", query),
    onNotificationClick: (notification) => console.log("Notification clicked:", notification),
    onProfileClick: () => console.log("View profile clicked"),
    onSettingsClick: () => console.log("Settings clicked"),
    onSignOutClick: () => console.log("Sign out clicked"),
    children: (
      <div className="container py-8">
        <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Try the Interactive Features
          </h2>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>• Click the notification bell to see notifications</p>
            <p>• Click your avatar to open the user menu</p>
            <p>• Try the search bar with ⌘K shortcut</p>
            <p>• Navigate between pages using the links</p>
            <p>• Click outside dropdowns to close them</p>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Sidebar layout - vertical navigation
 */
export const SidebarLayout: Story = {
  args: {
    currentUserName: "Sarah Chen",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@sarahc",
    links: [
      { label: "Feed", href: "/feed", isActive: true },
      { label: "Spaces", href: "/spaces", badge: 3 },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Rituals", href: "/rituals", badge: 1 },
      { label: "Profile", href: "/profile" },
    ],
    notificationCount: 2,
    notifications: [
      {
        userName: "Alex Morgan",
        avatar: "https://github.com/vercel.png",
        type: "comment",
        message: "commented on your post in CS Study Group",
        timestamp: "5 minutes ago",
        isRead: false,
      },
      {
        userName: "HIVE",
        type: "ritual_reminder",
        message: "Don't forget your daily check-in!",
        timestamp: "8:00 AM",
        isRead: false,
        badge: "Ritual",
      },
    ],
    layout: "sidebar",
    children: (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Feed</h1>
          <p className="text-sm text-muted-foreground">
            Sidebar navigation keeps your context while browsing
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-3">
                <div className="h-12 w-10 rounded-md bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * Collapsed sidebar - icon-only navigation
 */
export const SidebarCollapsed: Story = {
  args: {
    currentUserName: "Jordan Lee",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@jordan",
    links: [
      { label: "Feed", href: "/feed", isActive: true, badge: 5 },
      { label: "Spaces", href: "/spaces" },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Rituals", href: "/rituals", badge: 2 },
    ],
    notificationCount: 3,
    notifications: [
      {
        userName: "Casey Kim",
        type: "follow",
        message: "started following you",
        timestamp: "Just now",
        isRead: false,
      },
    ],
    layout: "sidebar",
    isCollapsed: true,
    children: (
      <div className="p-6">
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <h2 className="text-xl font-bold text-foreground">
            Collapsed Sidebar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Maximizes content space while keeping navigation accessible
          </p>
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p>• Hover over navigation items to see labels</p>
            <p>• Dropdowns open to the side</p>
            <p>• Only icons and badges visible</p>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Sidebar with notifications demo
 */
export const SidebarWithNotifications: Story = {
  args: {
    currentUserName: "Morgan Taylor",
    currentUserAvatar: "https://github.com/vercel.png",
    currentUserHandle: "@morgan",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces", isActive: true, badge: 2 },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Profile", href: "/profile" },
    ],
    notificationCount: 8,
    notifications: [
      {
        userName: "Sarah Chen",
        avatar: "https://github.com/shadcn.png",
        type: "comment",
        message: "commented on your post",
        timestamp: "2 minutes ago",
        isRead: false,
      },
      {
        userName: "Alex Morgan",
        avatar: "https://github.com/vercel.png",
        type: "like",
        message: "liked your post",
        timestamp: "5 minutes ago",
        isRead: false,
      },
      {
        userName: "Jordan Lee",
        type: "space_invite",
        message: "invited you to join CS Study Group",
        timestamp: "1 hour ago",
        isRead: false,
        badge: "Invite",
        badgeVariant: "default",
      },
      {
        userName: "Riley Park",
        avatar: "https://github.com/shadcn.png",
        type: "follow",
        message: "started following you",
        timestamp: "2 hours ago",
        isRead: false,
      },
      {
        userName: "Campus Events",
        type: "event_reminder",
        message: "Study Session starts in 1 hour",
        timestamp: "3 hours ago",
        isRead: true,
        badge: "Today",
      },
    ],
    onNotificationClick: (notification) => console.log("Notification clicked:", notification),
    layout: "sidebar",
    children: (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Spaces</h1>
          <p className="text-sm text-muted-foreground">
            Click the notification button in the sidebar
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

/**
 * Interactive sidebar toggle demo
 * TEMPORARILY DISABLED - Testing if useState causes import issues
 */
/*
export const InteractiveSidebarToggle: Story = {
  render: () => {
    const [layout, setLayout] = useState<"header" | "sidebar">("sidebar");
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <NavigationShell
        currentUserName="Casey Kim"
        currentUserAvatar="https://github.com/vercel.png"
        currentUserHandle="@casey"
        links={[
          { label: "Feed", href: "/feed", isActive: true, badge: 3 },
          { label: "Spaces", href: "/spaces" },
          { label: "HiveLab", href: "/hivelab" },
          { label: "Rituals", href: "/rituals", badge: 1 },
          { label: "Profile", href: "/profile" },
        ]}
        notificationCount={2}
        notifications={[
          {
            userName: "Alex Morgan",
            avatar: "https://github.com/vercel.png",
            type: "comment",
            message: "commented on your post",
            timestamp: "5 minutes ago",
            isRead: false,
          },
        ]}
        layout={layout}
        isCollapsed={isCollapsed}
        onSearch={(query) => console.log("Search:", query)}
      >
        <div className="p-6">
          <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interactive Layout Demo
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Try switching between layouts and collapse states
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setLayout("header")}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-smooth ease-liquid hover:bg-accent"
              >
                Switch to Header
              </button>
              <button
                onClick={() => setLayout("sidebar")}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-smooth ease-liquid hover:bg-accent"
              >
                Switch to Sidebar
              </button>
              {layout === "sidebar" && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90"
                >
                  {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                </button>
              )}
            </div>
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p><strong>Current Layout:</strong> {layout === "sidebar" ? "Sidebar" : "Header"}</p>
              {layout === "sidebar" && (
                <p><strong>Sidebar State:</strong> {isCollapsed ? "Collapsed (64px)" : "Expanded (240px)"}</p>
              )}
              <p className="mt-4">• Watch smooth framer-motion transitions</p>
              <p>• Dropdowns reposition based on layout</p>
              <p>• Navigation adapts to vertical/horizontal</p>
            </div>
          </div>
        </div>
      </NavigationShell>
    );
  },
};
*/

/**
 * HIVE Pattern: Sidebar with space content
 */
export const SidebarSpacePage: Story = {
  args: {
    currentUserName: "Riley Park",
    currentUserAvatar: "https://github.com/shadcn.png",
    currentUserHandle: "@riley",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Spaces", href: "/spaces", isActive: true },
      { label: "HiveLab", href: "/hivelab" },
      { label: "Rituals", href: "/rituals" },
    ],
    notificationCount: 1,
    layout: "sidebar",
    children: (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">CS Study Group</h1>
          <p className="text-sm text-muted-foreground">
            Weekly study sessions for Computer Science students
          </p>
        </div>

        {/* Space Feed */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-3">
                <div className="h-10 w-8 rounded bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                    <div className="h-3 w-2/3 rounded bg-muted" />
                  </div>
                  {/* Engagement */}
                  <div className="mt-4 flex gap-4">
                    <div className="h-6 w-16 rounded bg-muted" />
                    <div className="h-6 w-16 rounded bg-muted" />
                    <div className="h-6 w-16 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
