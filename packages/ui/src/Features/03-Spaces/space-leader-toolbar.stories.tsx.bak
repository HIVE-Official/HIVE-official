import type { Meta, StoryObj } from "@storybook/react";
import { SpaceLeaderToolbar } from "../../atomic/organisms/space-leader-toolbar";

/**
 * # SpaceLeaderToolbar
 *
 * Organism component providing quick access to space management actions for leaders.
 * Displays primary actions as buttons and secondary actions in a dropdown menu.
 *
 * ## HIVE Motion System
 * - Smooth transitions on hover states
 * - Dropdown menu with backdrop blur
 * - Badge animations for pending items
 *
 * ## Features
 * - **Primary actions**: Edit, Settings, Analytics, Invite (always visible)
 * - **Secondary actions**: Manage Content, Members, Events, Export Data (in dropdown)
 * - **Notification badges**: Visual indicators for pending reviews/approvals
 * - **Compact mode**: Icon-only variant for smaller viewports
 * - **Responsive design**: Adapts to available space
 *
 * ## Usage
 * ```tsx
 * <SpaceLeaderToolbar
 *   pendingPosts={5}
 *   pendingMembers={2}
 *   reportedContent={1}
 *   onEdit={() => openEditModal()}
 *   onSettings={() => openSettings()}
 *   onAnalytics={() => navigate('/analytics')}
 *   onInvite={() => openInviteDialog()}
 * />
 * ```
 */
const meta = {
  title: "03-Spaces/SpaceLeaderToolbar",
  component: SpaceLeaderToolbar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpaceLeaderToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toolbar with all actions
 */
export const Default: Story = {
  args: {
    pendingPosts: 0,
    pendingMembers: 0,
    reportedContent: 0,
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
    onAnalytics: () => console.log("View analytics"),
    onInvite: () => console.log("Invite members"),
    onManageContent: () => console.log("Manage content"),
    onManageMembers: () => console.log("Manage members"),
    onManageEvents: () => console.log("Manage events"),
    onExportData: () => console.log("Export data"),
  },
};

/**
 * With pending items requiring attention
 */
export const WithPendingItems: Story = {
  args: {
    pendingPosts: 5,
    pendingMembers: 2,
    reportedContent: 1,
    showBadges: true,
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
    onAnalytics: () => console.log("View analytics"),
    onInvite: () => console.log("Invite members"),
    onManageContent: () => console.log("Manage content"),
    onManageMembers: () => console.log("Manage members"),
    onManageEvents: () => console.log("Manage events"),
    onExportData: () => console.log("Export data"),
  },
};

/**
 * Compact variant for mobile/small screens
 */
export const CompactVariant: Story = {
  args: {
    variant: "compact",
    pendingPosts: 3,
    pendingMembers: 1,
    showBadges: true,
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
    onAnalytics: () => console.log("View analytics"),
    onInvite: () => console.log("Invite members"),
    onManageContent: () => console.log("Manage content"),
    onManageMembers: () => console.log("Manage members"),
    onManageEvents: () => console.log("Manage events"),
  },
};

/**
 * With critical reported content
 */
export const WithReportedContent: Story = {
  args: {
    pendingPosts: 0,
    pendingMembers: 0,
    reportedContent: 8,
    showBadges: true,
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
    onAnalytics: () => console.log("View analytics"),
    onInvite: () => console.log("Invite members"),
    onManageContent: () => console.log("Manage content"),
    onManageMembers: () => console.log("Manage members"),
  },
};

/**
 * Without badges (clean view)
 */
export const WithoutBadges: Story = {
  args: {
    pendingPosts: 5,
    pendingMembers: 2,
    reportedContent: 1,
    showBadges: false,
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
    onAnalytics: () => console.log("View analytics"),
    onInvite: () => console.log("Invite members"),
    onManageContent: () => console.log("Manage content"),
    onManageMembers: () => console.log("Manage members"),
  },
};

/**
 * Minimal actions (edit and settings only)
 */
export const MinimalActions: Story = {
  args: {
    onEdit: () => console.log("Edit space"),
    onSettings: () => console.log("Open settings"),
  },
};

/**
 * HIVE Pattern: Toolbar in space header
 */
export const InSpaceHeader: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-6">
      {/* Space Header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">CS Study Group</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Weekly study sessions for Computer Science students
            </p>
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span>87 members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span>234 posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leader Toolbar */}
        <div className="mt-6">
          <SpaceLeaderToolbar
            pendingPosts={5}
            pendingMembers={2}
            reportedContent={1}
            onEdit={() => console.log("Edit space")}
            onSettings={() => console.log("Open settings")}
            onAnalytics={() => console.log("View analytics")}
            onInvite={() => console.log("Invite members")}
            onManageContent={() => console.log("Manage content")}
            onManageMembers={() => console.log("Manage members")}
            onManageEvents={() => console.log("Manage events")}
            onExportData={() => console.log("Export data")}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Space content goes here...
        </p>
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Responsive toolbar states
 */
export const ResponsiveStates: Story = {
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Full Variant (Desktop)</h3>
        <SpaceLeaderToolbar
          variant="full"
          pendingPosts={5}
          pendingMembers={2}
          onEdit={() => console.log("Edit")}
          onSettings={() => console.log("Settings")}
          onAnalytics={() => console.log("Analytics")}
          onInvite={() => console.log("Invite")}
          onManageContent={() => console.log("Manage content")}
          onManageMembers={() => console.log("Manage members")}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Compact Variant (Mobile)</h3>
        <SpaceLeaderToolbar
          variant="compact"
          pendingPosts={5}
          pendingMembers={2}
          onEdit={() => console.log("Edit")}
          onSettings={() => console.log("Settings")}
          onAnalytics={() => console.log("Analytics")}
          onInvite={() => console.log("Invite")}
          onManageContent={() => console.log("Manage content")}
          onManageMembers={() => console.log("Manage members")}
        />
      </div>
    </div>
  ),
};

/**
 * Interactive demo
 */
export const InteractiveDemo: Story = {
  args: {
    pendingPosts: 5,
    pendingMembers: 2,
    reportedContent: 1,
    showBadges: true,
    onEdit: () => alert("Opening edit modal..."),
    onSettings: () => alert("Opening settings..."),
    onAnalytics: () => alert("Navigating to analytics..."),
    onInvite: () => alert("Opening invite dialog..."),
    onManageContent: () => alert("Opening content moderation..."),
    onManageMembers: () => alert("Opening member management..."),
    onManageEvents: () => alert("Opening event management..."),
    onExportData: () => alert("Exporting space data..."),
  },
};
