import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  HiveLabAnalyticsDashboard,
  type ToolAnalytics,
  type AnalyticsInsight,
} from "../../atomic/organisms/hivelab-analytics-dashboard";
import { Lightbulb, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";

/**
 * # HiveLab Analytics - Tool Performance Dashboard
 *
 * **Data-Driven Tool Optimization**
 *
 * The analytics dashboard helps space leaders understand how their tools
 * are being used and where they can improve.
 *
 * ## Core Metrics
 * 1. **Submissions**: Total usage, trends, completion rate
 * 2. **Engagement**: Views, starts, abandonment rate
 * 3. **Participation**: Who used it, who didn't
 * 4. **Patterns**: Usage times, common responses
 *
 * ## Key Features
 * - **Multi-Tab Interface**: Overview, Engagement, Participants, Insights
 * - **Date Range Filtering**: 7d, 30d, 90d, all-time
 * - **Visual Charts**: Bar graphs, trend lines, heat maps
 * - **Automatic Insights**: "80% prefer evening events"
 * - **Export Options**: CSV, PDF reports
 * - **Top Contributors**: Leaderboard of active members
 *
 * ## Insights Engine
 * The dashboard automatically generates insights:
 * - **Success Patterns**: What's working well
 * - **Warnings**: Areas that need attention
 * - **Recommendations**: Specific improvements to try
 * - **Anomaly Detection**: Unusual patterns
 *
 * ## Use Cases
 * - **Optimize Timing**: See when members are most active
 * - **Improve Completion**: Identify abandonment points
 * - **Increase Participation**: Find who's not engaging
 * - **Validate Changes**: A/B test tool variations
 *
 * ## Real Examples
 * - "Meeting Scheduler": 78% response rate, peak usage 6-8pm
 * - "Anonymous Feedback": 92% completion, 156 submissions
 * - "Task Roulette": 45 unique users, 23% abandonment
 */
const meta = {
  title: "05-HiveLab/Analytics",
  component: HiveLabAnalyticsDashboard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HiveLabAnalyticsDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample analytics data
const sampleToolsAnalytics: ToolAnalytics[] = [
  {
    toolId: "meeting-scheduler",
    toolName: "Weekly Meeting Scheduler",
    toolIcon: "📅",
    totalSubmissions: 156,
    submissionTrend: 23,
    completionRate: 78,
    avgCompletionTime: "1m 24s",
    totalViews: 234,
    uniqueUsers: 89,
    abandonmentRate: 22,
    activeMembers: 89,
    totalMembers: 120,
    participationRate: 74,
    topContributors: [
      { name: "Sarah Chen", handle: "@sarachen", count: 12 },
      { name: "Mike Johnson", handle: "@mikej", count: 9 },
      { name: "Emma Davis", handle: "@emmad", count: 8 },
      { name: "Alex Park", handle: "@alexpark", count: 7 },
      { name: "Jordan Lee", handle: "@jordanlee", count: 6 },
    ],
    usageByHour: [
      { hour: 0, count: 2 },
      { hour: 1, count: 1 },
      { hour: 2, count: 0 },
      { hour: 3, count: 0 },
      { hour: 4, count: 1 },
      { hour: 5, count: 3 },
      { hour: 6, count: 8 },
      { hour: 7, count: 15 },
      { hour: 8, count: 22 },
      { hour: 9, count: 18 },
      { hour: 10, count: 12 },
      { hour: 11, count: 8 },
      { hour: 12, count: 14 },
      { hour: 13, count: 10 },
      { hour: 14, count: 7 },
      { hour: 15, count: 9 },
      { hour: 16, count: 11 },
      { hour: 17, count: 16 },
      { hour: 18, count: 24 },
      { hour: 19, count: 28 },
      { hour: 20, count: 19 },
      { hour: 21, count: 13 },
      { hour: 22, count: 8 },
      { hour: 23, count: 4 },
    ],
    usageByDay: [
      { day: "Mon", count: 28 },
      { day: "Tue", count: 24 },
      { day: "Wed", count: 19 },
      { day: "Thu", count: 32 },
      { day: "Fri", count: 15 },
      { day: "Sat", count: 21 },
      { day: "Sun", count: 17 },
    ],
    topResponses: [
      { answer: "Thursday 7pm", count: 67, percentage: 43 },
      { answer: "Tuesday 6pm", count: 42, percentage: 27 },
      { answer: "Wednesday 8pm", count: 31, percentage: 20 },
      { answer: "Monday 7pm", count: 16, percentage: 10 },
    ],
  },
  {
    toolId: "anonymous-feedback",
    toolName: "Anonymous Feedback Form",
    toolIcon: "📝",
    totalSubmissions: 234,
    submissionTrend: 45,
    completionRate: 92,
    avgCompletionTime: "2m 12s",
    totalViews: 287,
    uniqueUsers: 112,
    abandonmentRate: 8,
    activeMembers: 112,
    totalMembers: 120,
    participationRate: 93,
    topContributors: [
      { name: "Anonymous", handle: "anonymous", count: 234 },
    ],
    usageByHour: [
      { hour: 0, count: 5 },
      { hour: 1, count: 3 },
      { hour: 2, count: 2 },
      { hour: 3, count: 1 },
      { hour: 4, count: 2 },
      { hour: 5, count: 4 },
      { hour: 6, count: 7 },
      { hour: 7, count: 12 },
      { hour: 8, count: 18 },
      { hour: 9, count: 24 },
      { hour: 10, count: 16 },
      { hour: 11, count: 14 },
      { hour: 12, count: 11 },
      { hour: 13, count: 9 },
      { hour: 14, count: 13 },
      { hour: 15, count: 15 },
      { hour: 16, count: 19 },
      { hour: 17, count: 22 },
      { hour: 18, count: 26 },
      { hour: 19, count: 31 },
      { hour: 20, count: 24 },
      { hour: 21, count: 17 },
      { hour: 22, count: 11 },
      { hour: 23, count: 8 },
    ],
    usageByDay: [
      { day: "Mon", count: 34 },
      { day: "Tue", count: 38 },
      { day: "Wed", count: 42 },
      { day: "Thu", count: 39 },
      { day: "Fri", count: 28 },
      { day: "Sat", count: 26 },
      { day: "Sun", count: 27 },
    ],
  },
  {
    toolId: "task-roulette",
    toolName: "Task Assignment Roulette",
    toolIcon: "🎲",
    totalSubmissions: 89,
    submissionTrend: -12,
    completionRate: 65,
    avgCompletionTime: "45s",
    totalViews: 156,
    uniqueUsers: 45,
    abandonmentRate: 35,
    activeMembers: 45,
    totalMembers: 120,
    participationRate: 38,
    topContributors: [
      { name: "Chris Taylor", handle: "@christ", count: 8 },
      { name: "Pat Kim", handle: "@patkim", count: 7 },
      { name: "Sam Wilson", handle: "@samw", count: 6 },
      { name: "Jamie Fox", handle: "@jamiefox", count: 5 },
      { name: "Morgan Lee", handle: "@morganl", count: 4 },
    ],
    usageByHour: [
      { hour: 0, count: 1 },
      { hour: 1, count: 0 },
      { hour: 2, count: 0 },
      { hour: 3, count: 0 },
      { hour: 4, count: 1 },
      { hour: 5, count: 2 },
      { hour: 6, count: 4 },
      { hour: 7, count: 6 },
      { hour: 8, count: 9 },
      { hour: 9, count: 11 },
      { hour: 10, count: 8 },
      { hour: 11, count: 5 },
      { hour: 12, count: 7 },
      { hour: 13, count: 6 },
      { hour: 14, count: 4 },
      { hour: 15, count: 5 },
      { hour: 16, count: 7 },
      { hour: 17, count: 9 },
      { hour: 18, count: 12 },
      { hour: 19, count: 8 },
      { hour: 20, count: 6 },
      { hour: 21, count: 4 },
      { hour: 22, count: 2 },
      { hour: 23, count: 1 },
    ],
    usageByDay: [
      { day: "Mon", count: 15 },
      { day: "Tue", count: 12 },
      { day: "Wed", count: 14 },
      { day: "Thu", count: 18 },
      { day: "Fri", count: 10 },
      { day: "Sat", count: 11 },
      { day: "Sun", count: 9 },
    ],
  },
];

const sampleInsights: AnalyticsInsight[] = [
  {
    id: "insight-1",
    type: "success",
    title: "Peak engagement time identified",
    description:
      "80% of submissions happen between 6pm-9pm. Consider scheduling important announcements during this window.",
    metric: "6pm-9pm peak",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    id: "insight-2",
    type: "success",
    title: "High completion rate",
    description:
      "Your tool has a 92% completion rate, significantly higher than the campus average of 68%.",
    metric: "92% completion",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    id: "insight-3",
    type: "warning",
    title: "Low weekend participation",
    description:
      "Weekend submissions are 40% lower than weekdays. Consider timing your tool launches for Monday-Thursday.",
    metric: "40% weekend drop",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    id: "insight-4",
    type: "info",
    title: "Preferred time slot emerging",
    description:
      "Thursday 7pm is consistently the most popular choice, selected 43% of the time. Consider making this the default.",
    metric: "Thursday 7pm: 43%",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    id: "insight-5",
    type: "warning",
    title: "Member participation could improve",
    description:
      "38% of space members have used this tool. Try posting a reminder or incentivizing participation.",
    metric: "38% participation",
    icon: <AlertCircle className="h-4 w-4" />,
  },
];

/**
 * Complete Analytics Dashboard
 */
export const AnalyticsDashboard: Story = {
  render: () => {
    const [selectedToolId, setSelectedToolId] = React.useState("meeting-scheduler");
    const [dateRange, setDateRange] = React.useState<"7d" | "30d" | "90d" | "all">("30d");

    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard
          toolsAnalytics={sampleToolsAnalytics}
          selectedToolId={selectedToolId}
          onToolSelect={setSelectedToolId}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={(format) => alert(`Exporting data as ${format.toUpperCase()}...`)}
          insights={sampleInsights}
        />
      </div>
    );
  },
};

/**
 * High Performing Tool (Anonymous Feedback)
 */
export const HighPerformingTool: Story = {
  render: () => {
    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard
          toolsAnalytics={sampleToolsAnalytics}
          selectedToolId="anonymous-feedback"
          insights={sampleInsights.filter((i) => i.type === "success")}
        />
      </div>
    );
  },
};

/**
 * Underperforming Tool (Task Roulette)
 */
export const UnderperformingTool: Story = {
  render: () => {
    const warningInsights: AnalyticsInsight[] = [
      {
        id: "low-participation",
        type: "warning",
        title: "Low member participation",
        description:
          "Only 38% of space members have used this tool. Consider posting a reminder or incentivizing participation.",
        metric: "38% participation",
        icon: <AlertCircle className="h-4 w-4" />,
      },
      {
        id: "high-abandonment",
        type: "warning",
        title: "High abandonment rate",
        description:
          "35% of users start but don't complete the task assignment. Try simplifying the flow or reducing required fields.",
        metric: "35% abandonment",
        icon: <AlertCircle className="h-4 w-4" />,
      },
      {
        id: "declining-trend",
        type: "warning",
        title: "Declining usage trend",
        description:
          "Submissions are down 12% from last period. Survey members to understand why engagement is dropping.",
        metric: "-12% trend",
        icon: <AlertCircle className="h-4 w-4" />,
      },
    ];

    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard
          toolsAnalytics={sampleToolsAnalytics}
          selectedToolId="task-roulette"
          insights={warningInsights}
        />
      </div>
    );
  },
};

/**
 * No Tool Selected
 */
export const NoToolSelected: Story = {
  render: () => {
    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard
          toolsAnalytics={sampleToolsAnalytics}
          insights={sampleInsights}
        />
      </div>
    );
  },
};

/**
 * Empty State (No Tools)
 */
export const EmptyState: Story = {
  render: () => {
    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard toolsAnalytics={[]} />
      </div>
    );
  },
};

/**
 * With Custom Date Range
 */
export const WithDateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = React.useState<"7d" | "30d" | "90d" | "all">("7d");

    return (
      <div className="h-screen bg-background p-6">
        <HiveLabAnalyticsDashboard
          toolsAnalytics={sampleToolsAnalytics}
          selectedToolId="meeting-scheduler"
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          insights={sampleInsights}
        />
      </div>
    );
  },
};
