'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const filterChipVariants = cva('inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]', {
    variants: {
        active: {
            true: 'border-2 border-[var(--hive-text-primary)] bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] shadow-lg',
            false: 'border border-[var(--hive-border-default)] bg-transparent text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-strong)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]',
        },
    },
    defaultVariants: {
        active: false,
    },
});
export const FeedFilterBar = React.forwardRef(({ activeFilter, onFilterChange, counts, className }, ref) => {
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'my_spaces', label: 'My Spaces' },
        { value: 'events', label: 'Events' },
    ];
    return (_jsx("div", { ref: ref, className: cn('flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide', className), role: "tablist", "aria-label": "Feed filters", children: filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            const count = counts?.[filter.value];
            return (_jsxs("button", { type: "button", role: "tab", "aria-selected": isActive, onClick: () => onFilterChange(filter.value), className: filterChipVariants({ active: isActive }), children: [filter.label, count !== undefined && (_jsx("span", { className: cn('ml-1.5 rounded-full px-1.5 py-0.5 text-xs font-semibold', isActive
                            ? 'bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)]'
                            : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-tertiary)]'), children: count > 99 ? '99+' : count }))] }, filter.value));
        }) }));
});
FeedFilterBar.displayName = 'FeedFilterBar';
//# sourceMappingURL=feed-filter-bar.js.map