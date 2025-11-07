'use client';

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
import { cn } from '../../lib/utils';
import { XIcon } from '../atoms/icon-library';

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

export const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  (
    {
      chips,
      selectedIds,
      onChange,
      multiSelect = true,
      showClearAll = true,
      className,
    },
    ref
  ) => {
    const handleChipClick = (chipId: string) => {
      if (multiSelect) {
        // Toggle selection in multi-select mode
        if (selectedIds.includes(chipId)) {
          onChange(selectedIds.filter((id) => id !== chipId));
        } else {
          onChange([...selectedIds, chipId]);
        }
      } else {
        // Single selection mode
        if (selectedIds.includes(chipId)) {
          onChange([]); // Deselect if already selected
        } else {
          onChange([chipId]);
        }
      }
    };

    const handleClearAll = () => {
      onChange([]);
    };

    const hasSelections = selectedIds.length > 0;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide',
          className
        )}
        role="group"
        aria-label="Filter chips"
      >
        {/* Clear All button */}
        {showClearAll && hasSelections && (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--hive-border-default)] bg-transparent px-3 py-2 text-sm font-medium text-[var(--hive-text-secondary)] transition-all duration-200 hover:border-[var(--hive-status-error)]/50 hover:bg-[var(--hive-status-error)]/10 hover:text-[var(--hive-status-error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] min-h-[44px]"
            aria-label="Clear all filters"
          >
            <XIcon className="h-3.5 w-3.5" />
            Clear
          </button>
        )}

        {/* Chips */}
        {chips.map((chip) => {
          const isSelected = selectedIds.includes(chip.id);

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleChipClick(chip.id)}
              className={cn(
                'flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]',
                isSelected
                  ? 'border-[var(--hive-brand-primary)] bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20 text-[var(--hive-text-primary)] shadow-lg'
                  : 'border-[var(--hive-border-default)] bg-transparent text-[var(--hive-text-secondary)] hover:border-[var(--hive-border-strong)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]'
              )}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Apply'} ${chip.label} filter`}
            >
              {/* Icon */}
              {chip.icon && (
                <span className="text-base leading-none" aria-hidden="true">
                  {chip.icon}
                </span>
              )}

              {/* Label */}
              <span className="leading-none whitespace-nowrap">{chip.label}</span>

              {/* Count badge */}
              {chip.count !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none',
                    isSelected
                      ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-brand-primary-text)]'
                      : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-tertiary)]'
                  )}
                >
                  {chip.count > 99 ? '99+' : chip.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

FilterChips.displayName = 'FilterChips';
