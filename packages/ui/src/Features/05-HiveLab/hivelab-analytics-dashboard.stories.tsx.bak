import type { Meta, StoryObj } from "@storybook/react";
import { HiveLabAnalyticsDashboard, ToolAnalytics } from "../../atomic/organisms/hivelab-analytics-dashboard";

/**
 * # HiveLabAnalyticsDashboard
 *
 * Comprehensive analytics dashboard for tracking HiveLab tool performance, user engagement,
 * and participation metrics. Helps space leaders understand how their tools are being used.
 *
 * ## Features
 * - Multi-tool analytics comparison
 * - Time-based trend analysis (hourly/daily)
 * - Submission and completion tracking
 * - Top contributors leaderboard
 * - Engagement metrics (views, clicks, abandonment)
 * - Participation rate tracking
 * - Automated insights and recommendations
 * - Date range selection
 * - Export functionality
 *
 * ## HIVE Motion System
 * - Smooth tab transitions
 * - Chart animations
 * - Metric card hover effects
 * - Trend indicator animations (up/down arrows)
 *
 * ## Usage
 * ```tsx
 * <HiveLabAnalyticsDashboard
 *   toolsAnalytics={analyticsData}
 *   selectedToolId="tool-1"
 *   onToolSelect={(id) => console.log(id)}
 * />
 * ```
 */
const meta = {
  title: "05-HiveLab/HiveLabAnalyticsDashboard",
  component: HiveLabAnalyticsDashboard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabAnalyticsDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAnalytics: ToolAnalytics = {
  toolId: "poll-1",
  toolName: "Midterm Study Topics Poll",
  toolIcon: "",
  totalSubmissions: 156,
  submissionTrend: 23.5,
  completionRate: 87.2,
  avgCompletionTime: "1m 12s",
  totalViews: 234,
  uniqueUsers: 189,
  abandonmentRate: 12.8,
  activeMembers: 156,
  totalMembers: 234,
  participationRate: 66.7,
  topContributors: [
    { name: "Sarah Chen", handle: "@sarahc", count: 12 },
    { name: "Mike Rodriguez", handle: "@mike", count: 9 },
    { name: "Alex Kim", handle: "@alex", count: 7 },
  ],
  usageByHour: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 30) + 5,
  })),
  usageByDay: [
    { day: "Mon", count: 45 },
    { day: "Tue", count: 38 },
    { day: "Wed", count: 52 },
    { day: "Thu", count: 41 },
    { day: "Fri", count: 28 },
    { day: "Sat", count: 12 },
    { day: "Sun", count: 18 },
  ],
  topResponses: [
    { answer: "Data Structures", count: 89, percentage: 57 },
    { answer: "Algorithms", count: 67, percentage: 43 },
  ],
};

/**
 * Default dashboard with single tool
 */
export const Default: Story = {
  args: {
    toolsAnalytics: [sampleAnalytics],
    selectedToolId: "poll-1",
  },
};

/**
 * High engagement tool (viral)
 */
export const HighEngagement: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        totalSubmissions: 1247,
        submissionTrend: 187.3,
        totalViews: 2834,
        uniqueUsers: 1892,
        completionRate: 94.2,
        participationRate: 89.4,
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * Low engagement tool (needs improvement)
 */
export const LowEngagement: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        totalSubmissions: 12,
        submissionTrend: -23.4,
        totalViews: 67,
        uniqueUsers: 45,
        completionRate: 34.2,
        abandonmentRate: 65.8,
        participationRate: 12.1,
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * Multiple tools comparison
 */
export const MultipleTools: Story = {
  args: {
    toolsAnalytics: [
      sampleAnalytics,
      {
        ...sampleAnalytics,
        toolId: "event-1",
        toolName: "Study Session RSVP",
        toolIcon: "📅",
        totalSubmissions: 89,
        submissionTrend: 12.3,
        participationRate: 45.2,
      },
      {
        ...sampleAnalytics,
        toolId: "task-1",
        toolName: "Group Project Tracker",
        toolIcon: "",
        totalSubmissions: 234,
        submissionTrend: 45.7,
        participationRate: 78.3,
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * New tool (just launched)
 */
export const NewTool: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        totalSubmissions: 3,
        submissionTrend: 0,
        totalViews: 15,
        uniqueUsers: 12,
        completionRate: 100,
        participationRate: 5.1,
        usageByDay: [
          { day: "Mon", count: 0 },
          { day: "Tue", count: 0 },
          { day: "Wed", count: 0 },
          { day: "Thu", count: 0 },
          { day: "Fri", count: 3 },
          { day: "Sat", count: 0 },
          { day: "Sun", count: 0 },
        ],
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * HIVE Pattern: Space leader dashboard context
 */
export const InLeaderContext: Story = {
  render: () => (
    <div className="max-w-6xl space-y-4">
      {/* Space Header */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">CS Study Group Analytics</h2>
            <p className="text-sm text-muted-foreground">234 members · 3 active tools</p>
          </div>
          <div className="flex gap-2">
            <select className="h-9 px-3 bg-background border border-border rounded text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <HiveLabAnalyticsDashboard
        toolsAnalytics={[sampleAnalytics]}
        selectedToolId="poll-1"
      />
    </div>
  ),
};

/**
 * With automated insights
 */
export const WithInsights: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        submissionTrend: 87.5,
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * Mobile view (responsive)
 */
export const MobileView: Story = {
  render: () => (
    <div className="max-w-sm">
      <HiveLabAnalyticsDashboard
        toolsAnalytics={[sampleAnalytics]}
        selectedToolId="poll-1"
      />
    </div>
  ),
};

/**
 * Empty state (no data yet)
 */
export const EmptyState: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        totalSubmissions: 0,
        submissionTrend: 0,
        totalViews: 0,
        uniqueUsers: 0,
        completionRate: 0,
        abandonmentRate: 0,
        activeMembers: 0,
        participationRate: 0,
        topContributors: [],
        topResponses: [],
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * Peak usage hours visualization
 */
export const PeakUsageAnalysis: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        usageByHour: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          count:
            i >= 18 && i <= 22 // Peak: 6pm-10pm
              ? Math.floor(Math.random() * 50) + 40
              : i >= 10 && i <= 14 // Medium: 10am-2pm
              ? Math.floor(Math.random() * 30) + 20
              : Math.floor(Math.random() * 10) + 2, // Low: other times
        })),
      },
    ],
    selectedToolId: "poll-1",
  },
};

/**
 * Weekend vs weekday comparison
 */
export const WeekdayWeekendComparison: Story = {
  args: {
    toolsAnalytics: [
      {
        ...sampleAnalytics,
        usageByDay: [
          { day: "Mon", count: 52 },
          { day: "Tue", count: 48 },
          { day: "Wed", count: 61 },
          { day: "Thu", count: 54 },
          { day: "Fri", count: 38 },
          { day: "Sat", count: 8 },
          { day: "Sun", count: 12 },
        ],
      },
    ],
    selectedToolId: "poll-1",
  },
};
