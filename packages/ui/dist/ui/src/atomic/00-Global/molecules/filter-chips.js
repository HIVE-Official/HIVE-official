'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { cn } from '../../../lib/utils';
import { XIcon } from '../../00-Global/atoms/icon-library';
export const FilterChips = React.forwardRef(({ chips, selectedIds, onChange, multiSelect = true, showClearAll = true, className, }, ref) => {
    const handleChipClick = (chipId) => {
        if (multiSelect) {
            // Toggle selection in multi-select mode
            if (selectedIds.includes(chipId)) {
                onChange(selectedIds.filter((id) => id !== chipId));
            }
            else {
                onChange([...selectedIds, chipId]);
            }
        }
        else {
            // Single selection mode
            if (selectedIds.includes(chipId)) {
                onChange([]); // Deselect if already selected
            }
            else {
                onChange([chipId]);
            }
        }
    };
    const handleClearAll = () => {
        onChange([]);
    };
    const hasSelections = selectedIds.length > 0;
    return (_jsxs("div", { ref: ref, className: cn('flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide', className), role: "group", "aria-label": "Filter chips", children: [showClearAll && hasSelections && (_jsxs("button", { type: "button", onClick: handleClearAll, className: "flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--hive-border-default)] bg-transparent px-3 py-2 text-sm font-medium text-[var(--hive-text-secondary)] transition-all duration-200 hover:border-[var(--hive-status-error)]/50 hover:bg-[var(--hive-status-error)]/10 hover:text-[var(--hive-status-error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] min-h-[44px]", "aria-label": "Clear all filters", children: [_jsx(XIcon, { className: "h-3.5 w-3.5" }), "Clear"] })), chips.map((chip) => {
                const isSelected = selectedIds.includes(chip.id);
                return (_jsxs("button", { type: "button", onClick: () => handleChipClick(chip.id), className: cn('flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]', isSelected
                        ? 'border-[var(--hive-brand-primary)] bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20 text-[var(--hive-text-primary)] shadow-lg'
                        : 'border-[var(--hive-border-default)] bg-transparent text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-strong)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'), role: "checkbox", "aria-checked": isSelected, "aria-label": `${isSelected ? 'Remove' : 'Apply'} ${chip.label} filter`, children: [chip.icon && (_jsx("span", { className: "text-base leading-none", "aria-hidden": "true", children: chip.icon })), _jsx("span", { className: "leading-none whitespace-nowrap", children: chip.label }), chip.count !== undefined && (_jsx("span", { className: cn('rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none', isSelected
                                ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-brand-primary-text)]'
                                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-tertiary)]'), children: chip.count > 99 ? '99+' : chip.count }))] }, chip.id));
            })] }));
});
FilterChips.displayName = 'FilterChips';
//# sourceMappingURL=filter-chips.js.map