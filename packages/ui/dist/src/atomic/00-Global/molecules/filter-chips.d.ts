/**
 * FilterChips - Horizontal scrollable filter tags
 *
 * Features:
 * - Horizontal scrollable chip container
 * - Selected state tracking
 * - Mobile swipe navigation
 * - Multi-select or single-select modes
 * - Accessible keyboard navigation
 *
 * Usage:
 * ```tsx
 * import { FilterChips } from '@hive/ui';
 *
 * const [selected, setSelected] = useState<string[]>([]);
 *
 * <FilterChips
 *   chips={[
 *     { id: 'academic', label: 'Academic Help', icon: '📚' },
 *     { id: 'events', label: 'Social Events', icon: '🎉' },
 *     { id: 'housing', label: 'Housing', icon: '🏠' }
 *   ]}
 *   selectedIds={selected}
 *   onChange={setSelected}
 *   multiSelect={true}
 * />
 * ```
 */
import * as React from 'react';
export interface FilterChip {
    /**
     * Unique chip ID
     */
    id: string;
    /**
     * Display label
     */
    label: string;
    /**
     * Optional icon/emoji
     */
    icon?: string;
    /**
     * Optional count badge
     */
    count?: number;
}
export interface FilterChipsProps {
    /**
     * Array of available chips
     */
    chips: FilterChip[];
    /**
     * Array of selected chip IDs
     */
    selectedIds: string[];
    /**
     * Callback when selection changes
     */
    onChange: (selectedIds: string[]) => void;
    /**
     * Allow multiple selections
     * @default true
     */
    multiSelect?: boolean;
    /**
     * Show clear all button
     * @default true
     */
    showClearAll?: boolean;
    /**
     * Additional class names
     */
    className?: string;
}
export declare const FilterChips: React.ForwardRefExoticComponent<FilterChipsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=filter-chips.d.ts.map