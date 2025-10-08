import * as React from "react";
export type FeedFilter = "all" | "events" | "spaces" | "friends" | "trending" | "rituals";
export type TimeFilter = "now" | "today" | "week" | null;
export interface FeedFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Active feed filter */
    activeFilter?: FeedFilter;
    /** Filter change handler */
    onFilterChange?: (filter: FeedFilter) => void;
    /** Active time filter */
    activeTimeFilter?: TimeFilter;
    /** Time filter change handler */
    onTimeFilterChange?: (filter: TimeFilter) => void;
    /** Event count (for badge) */
    eventsCount?: number;
    /** Urgent events count */
    urgentEventsCount?: number;
    /** Active rituals count */
    ritualsCount?: number;
    /** Trending content count */
    trendingCount?: number;
    /** Show time filters */
    showTimeFilters?: boolean;
    /** Enable behavioral psychology features */
    enablePsychology?: boolean;
    /** Show live activity indicators */
    showLiveActivity?: boolean;
    /** Compact mode */
    compact?: boolean;
}
declare const FeedFilters: React.ForwardRefExoticComponent<FeedFiltersProps & React.RefAttributes<HTMLDivElement>>;
export { FeedFilters };
//# sourceMappingURL=feed-filters.d.ts.map