import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatGrid } from "./stat-grid";
import { Users, MessageCircle, Calendar, TrendingUp } from "lucide-react";

/**
 * # StatGrid
 *
 * Generic statistics display component that works for ANY metrics (analytics, social stats, dashboards, etc.)
 *
 * **Use Cases:**
 * - Social platform metrics (connections, posts, followers)
 * - Business analytics (revenue, users, conversions)
 * - Dashboard KPIs
 * - Performance metrics
 *
 * **Variants:**
 * - `grid` - Card-based grid layout
 * - `inline` - Compact inline display
 *
 * ## Props
 * ```tsx
 * <StatGrid
 *   stats={[
 *     { label: "Connections", value: 234, icon: <Users /> },
 *     { label: "Revenue", value: "$12.5k", trend: { value: 12, isPositive: true } }
 *   ]}
 *   variant="grid"
 *   columns={4}
 * />
 * ```
 */
const meta = {
  title: "Atomic/Molecules/StatGrid",
  component: StatGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Generic statistics grid for displaying metrics. Supports trends, icons, and clickable stats.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatGrid>;

export default meta;
type Story = StoryObj<typeof StatGrid>;

/**
 * Grid variant with 4 social metrics
 */
export const SocialMetrics: Story = {
  args: {
    variant: "grid",
    stats: [
      {
        label: "Connections",
        value: 234,
        icon: <Users className="h-5 w-5" />,
        trend: { value: 12, isPositive: true },
      },
      {
        label: "Posts",
        value: 89,
        icon: <MessageCircle className="h-5 w-5" />,
        trend: { value: 5, isPositive: false },
      },
      {
        label: "Events Attended",
        value: 24,
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        label: "Engagement",
        value: "8.2k",
        icon: <TrendingUp className="h-5 w-5" />,
        trend: { value: 23, isPositive: true },
      },
    ],
  },
};

/**
 * Analytics dashboard with large numbers
 */
export const AnalyticsDashboard: Story = {
  args: {
    variant: "grid",
    columns: 3,
    stats: [
      {
        label: "Total Revenue",
        value: "$127.5k",
        trend: { value: 18, isPositive: true },
      },
      {
        label: "Active Users",
        value: 12458,
        trend: { value: 7, isPositive: true },
      },
      {
        label: "Conversion Rate",
        value: "3.2%",
        trend: { value: 0.5, isPositive: false },
      },
    ],
  },
};

/**
 * 2-column grid
 */
export const TwoColumns: Story = {
  args: {
    variant: "grid",
    columns: 2,
    stats: [
      {
        label: "Total Users",
        value: 1234,
        icon: <Users className="h-5 w-5" />,
      },
      {
        label: "Growth",
        value: "+24%",
        icon: <TrendingUp className="h-5 w-5" />,
        trend: { value: 24, isPositive: true },
      },
    ],
  },
};

/**
 * Inline compact variant
 */
export const InlineVariant: Story = {
  args: {
    variant: "inline",
    stats: [
      { label: "Followers", value: 1234 },
      { label: "Following", value: 567 },
      { label: "Posts", value: 89 },
    ],
  },
};

/**
 * With clickable stats (href)
 */
export const ClickableStats: Story = {
  args: {
    variant: "grid",
    stats: [
      {
        label: "Connections",
        value: 234,
        href: "/connections",
        icon: <Users className="h-5 w-5" />,
      },
      {
        label: "Messages",
        value: 12,
        href: "/messages",
        icon: <MessageCircle className="h-5 w-5" />,
      },
      {
        label: "Events",
        value: 5,
        href: "/events",
        icon: <Calendar className="h-5 w-5" />,
      },
    ],
  },
};

/**
 * Large numbers with k formatting
 */
export const LargeNumbers: Story = {
  args: {
    variant: "grid",
    columns: 4,
    stats: [
      { label: "Users", value: 15234 },
      { label: "Views", value: 234567 },
      { label: "Clicks", value: 45678 },
      { label: "Conversions", value: 8912 },
    ],
  },
};
