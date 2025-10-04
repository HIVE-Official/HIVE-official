import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "../../atomic/molecules/stat-card";

/**
 * # StatCard
 *
 * Molecule component combining Card + Badge + Progress for displaying statistics.
 * Used throughout HIVE for profile stats, space metrics, ritual progress, and analytics.
 *
 * ## HIVE Motion System
 * - Uses `duration-smooth ease-liquid` for hover effects and transitions
 * - Progress bar uses smooth HIVE motion tokens
 *
 * ## Usage
 * ```tsx
 * <StatCard
 *   label="Profile Completion"
 *   value="75%"
 *   progress={75}
 *   icon={<UserIcon />}
 * />
 * ```
 */
const meta = {
  title: "11-Shared/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default stat card with just label and value
 */
export const Default: Story = {
  args: {
    label: "Total Members",
    value: "1,234",
    className: "w-[280px]",
  },
};

/**
 * With icon
 */
export const WithIcon: Story = {
  args: {
    label: "Active Spaces",
    value: "12",
    icon: (
      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    className: "w-[280px]",
  },
};

/**
 * With progress bar
 */
export const WithProgress: Story = {
  args: {
    label: "Profile Completion",
    value: "75%",
    progress: 75,
    description: "Almost there! Complete your profile to unlock features",
    icon: (
      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    className: "w-[300px]",
  },
};

/**
 * With trend indicator (positive)
 */
export const WithTrendUp: Story = {
  args: {
    label: "New Members",
    value: "87",
    trend: "up",
    trendValue: "+12%",
    description: "vs. last week",
    icon: (
      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    className: "w-[280px]",
  },
};

/**
 * With trend indicator (negative)
 */
export const WithTrendDown: Story = {
  args: {
    label: "Event Attendance",
    value: "45",
    trend: "down",
    trendValue: "-8%",
    description: "vs. last month",
    icon: (
      <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    className: "w-[280px]",
  },
};

/**
 * With badge
 */
export const WithBadge: Story = {
  args: {
    label: "Ritual Streak",
    value: "12 days",
    badge: "Active",
    icon: (
      <span className="text-xl">🔥</span>
    ),
    className: "w-[280px]",
  },
};

/**
 * HIVE Pattern: Profile stats dashboard
 */
export const ProfileStats: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Profile Completion"
        value="75%"
        progress={75}
        description="Add social links to reach 100%"
        icon={
          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />
      <StatCard
        label="Connections"
        value="143"
        trend="up"
        trendValue="+23"
        description="This semester"
        icon={
          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
      <StatCard
        label="Spaces Joined"
        value="8"
        badge="Active"
        description="Across 4 categories"
        icon={
          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        }
      />
      <StatCard
        label="Event Attendance"
        value="24"
        trend="up"
        trendValue="+6"
        description="This month"
        icon={
          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Space metrics
 */
export const SpaceMetrics: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">CS Study Group Analytics</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Members"
          value="87"
          progress={87}
          description="87% to 100 member goal"
          progressColor="[&>*]:bg-gradient-to-r [&>*]:from-primary [&>*]:to-green-500"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          label="Weekly Posts"
          value="34"
          trend="up"
          trendValue="+18%"
          description="vs. last week"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
        />
        <StatCard
          label="Engagement Rate"
          value="68%"
          trend="up"
          trendValue="+5%"
          badge="Excellent"
          badgeVariant="default"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Ritual tracking
 */
export const RitualTracking: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        label="Current Streak"
        value="12 days"
        progress={40}
        description="18 days until 30-day badge"
        progressColor="[&>*]:bg-gradient-to-r [&>*]:from-yellow-500 [&>*]:via-orange-500 [&>*]:to-red-500"
        icon={<span className="text-xl">🔥</span>}
        badge="Active"
      />
      <StatCard
        label="Total Check-ins"
        value="156"
        trend="up"
        trendValue="+12"
        description="This semester"
        icon={<span className="text-xl">✅</span>}
        badge="Consistent"
        badgeVariant="default"
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Campus-wide stats
 */
export const CampusStats: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">UB Buffalo Stats</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Students"
          value="2,456"
          trend="up"
          trendValue="+234"
          description="This week"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total Spaces"
          value="143"
          trend="up"
          trendValue="+8"
          description="New this month"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard
          label="Events Today"
          value="12"
          badge="Happening Now"
          description="Across campus"
          icon={
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Active Rituals"
          value="24"
          badge="Trending"
          badgeVariant="default"
          description="Join one today"
          icon={<span className="text-xl">⚡</span>}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
