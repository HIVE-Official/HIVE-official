/**
 * FeedFilterBar - Feed content filter toggle
 *
 * Features:
 * - All/My Spaces/Events toggle chips
 * - Horizontal layout, mobile-optimized
 * - Active state: white border (NOT gold)
 * - 44×44px minimum touch targets
 * - Keyboard accessible
 *
 * Usage:
 * ```tsx
 * import { FeedFilterBar } from '@hive/ui';
 *
 * const [filter, setFilter] = useState<'all' | 'my_spaces' | 'events'>('all');
 *
 * <FeedFilterBar
 *   activeFilter={filter}
 *   onFilterChange={setFilter}
 * />
 * ```
 */
import * as React from 'react';
export type FeedFilter = 'all' | 'my_spaces' | 'events';
export interface FeedFilterBarProps {
    /**
     * Currently active filter
     */
    activeFilter: FeedFilter;
    /**
     * Callback when filter changes
     */
    onFilterChange: (filter: FeedFilter) => void;
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Counts for each filter (optional)
     */
    counts?: {
        all?: number;
        my_spaces?: number;
        events?: number;
    };
}
export declare const FeedFilterBar: React.ForwardRefExoticComponent<FeedFilterBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-filter-bar.d.ts.map