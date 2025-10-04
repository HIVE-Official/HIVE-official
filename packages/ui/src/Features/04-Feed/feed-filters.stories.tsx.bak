import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FeedFilters, FeedFilter, TimeFilter } from "../../atomic/molecules/feed-filters";

/**
 * # FeedFilters
 *
 * Horizontal filter bar for the main feed, allowing users to filter by content type
 * and time range.
 *
 * ## Features
 * - Main filters: All, Events, My Spaces, Friends
 * - Time filters: Happening Now, Today, This Week
 * - Badge counts for urgent events
 * - Filter descriptions
 * - Compact mode for mobile
 * - Auto-show time filters when relevant
 *
 * ## HIVE Motion System
 * - Smooth transitions on filter changes
 * - Badge animations for counts
 * - Horizontal scroll with momentum
 *
 * ## Usage
 * ```tsx
 * <FeedFilters
 *   activeFilter="all"
 *   onFilterChange={(filter) => console.log(filter)}
 *   eventsCount={12}
 *   urgentEventsCount={3}
 *   showTimeFilters
 * />
 * ```
 */
const meta = {
  title: "04-Feed/FeedFilters",
  component: FeedFilters,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default filter bar with all options
 */
export const Default: Story = {
  args: {
    activeFilter: "all",
    eventsCount: 12,
    urgentEventsCount: 3,
  },
};

/**
 * Events filter active
 */
export const EventsActive: Story = {
  args: {
    activeFilter: "events",
    eventsCount: 12,
    urgentEventsCount: 3,
    showTimeFilters: true,
  },
};

/**
 * My Spaces filter active
 */
export const SpacesActive: Story = {
  args: {
    activeFilter: "spaces",
  },
};

/**
 * Friends filter active
 */
export const FriendsActive: Story = {
  args: {
    activeFilter: "friends",
  },
};

/**
 * With high event counts (shows urgency)
 */
export const HighEventCounts: Story = {
  args: {
    activeFilter: "all",
    eventsCount: 47,
    urgentEventsCount: 8,
  },
};

/**
 * With time filters visible
 */
export const WithTimeFilters: Story = {
  args: {
    activeFilter: "events",
    eventsCount: 12,
    showTimeFilters: true,
  },
};

/**
 * Time filter: Happening Now
 */
export const HappeningNow: Story = {
  args: {
    activeFilter: "events",
    activeTimeFilter: "now",
    showTimeFilters: true,
    eventsCount: 5,
    urgentEventsCount: 5,
  },
};

/**
 * Time filter: Today
 */
export const TodayFilter: Story = {
  args: {
    activeFilter: "events",
    activeTimeFilter: "today",
    showTimeFilters: true,
    eventsCount: 18,
  },
};

/**
 * Time filter: This Week
 */
export const ThisWeekFilter: Story = {
  args: {
    activeFilter: "events",
    activeTimeFilter: "week",
    showTimeFilters: true,
    eventsCount: 42,
  },
};

/**
 * Compact mode (mobile)
 */
export const Compact: Story = {
  args: {
    activeFilter: "all",
    eventsCount: 12,
    compact: true,
  },
};

/**
 * No events (zero counts)
 */
export const NoEvents: Story = {
  args: {
    activeFilter: "all",
    eventsCount: 0,
    urgentEventsCount: 0,
  },
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(null);

    return (
      <div className="space-y-4">
        <FeedFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeTimeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          eventsCount={24}
          urgentEventsCount={3}
          showTimeFilters={activeFilter === "events"}
        />

        {/* Preview of filtered content */}
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Active Filter: <span className="font-semibold text-foreground">{activeFilter}</span>
          </p>
          {timeFilter && (
            <p className="text-sm text-muted-foreground mt-1">
              Time Filter: <span className="font-semibold text-foreground">{timeFilter}</span>
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * HIVE Pattern: Full feed header with filters
 */
export const FeedHeader: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(null);

    return (
      <div className="max-w-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Feed</h1>
            <p className="text-sm text-muted-foreground">
              What's happening at UB Buffalo
            </p>
          </div>
        </div>

        {/* Filters */}
        <FeedFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeTimeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          eventsCount={24}
          urgentEventsCount={3}
          showTimeFilters={activeFilter === "events"}
        />

        {/* Content preview */}
        <div className="p-6 bg-card border border-border rounded-lg text-center">
          <p className="text-muted-foreground">
            Feed content would appear here...
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Mobile viewport (narrow width)
 */
export const MobileView: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState<FeedFilter>("all");

    return (
      <div className="max-w-sm">
        <FeedFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          eventsCount={24}
          urgentEventsCount={3}
          compact
        />
      </div>
    );
  },
};

/**
 * All time filters active (cycling)
 */
export const AllTimeFilters: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">Happening Now</p>
        <FeedFilters
          activeFilter="events"
          activeTimeFilter="now"
          showTimeFilters
          urgentEventsCount={5}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Today</p>
        <FeedFilters
          activeFilter="events"
          activeTimeFilter="today"
          showTimeFilters
          eventsCount={18}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">This Week</p>
        <FeedFilters
          activeFilter="events"
          activeTimeFilter="week"
          showTimeFilters
          eventsCount={42}
        />
      </div>
    </div>
  ),
};

/**
 * Edge case: Very high counts
 */
export const HighCounts: Story = {
  args: {
    activeFilter: "events",
    eventsCount: 999,
    urgentEventsCount: 99,
  },
};
