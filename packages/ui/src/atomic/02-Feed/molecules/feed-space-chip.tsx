'use client';

/**
 * FeedSpaceChip - Colored space badge for posts
 *
 * Features:
 * - Colored badge showing space name (e.g., "CS Study Group")
 * - Uses space.color from Firestore (dynamic colors)
 * - Clickable → navigates to space
 * - Icon + text layout
 * - Accessible and keyboard-friendly
 *
 * Usage:
 * ```tsx
 * import { FeedSpaceChip } from '@hive/ui';
 *
 * <FeedSpaceChip
 *   spaceId="cs-study-group"
 *   spaceName="CS Study Group"
 *   spaceColor="#3b82f6"
 *   spaceIcon="💻"
 *   onClick={() => router.push('/spaces/cs-study-group')}
 * />
 * ```
 */

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { HashIcon } from '../../00-Global/atoms/icon-library';

export interface FeedSpaceChipProps {
  /**
   * Space ID (for navigation)
   */
  spaceId: string;

  /**
   * Space display name
   */
  spaceName: string;

  /**
   * Space color (hex code)
   */
  spaceColor?: string;

  /**
   * Space icon/emoji
   */
  spaceIcon?: string;

  /**
   * Callback when chip is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Additional class names
   */
  className?: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md';
}

export const FeedSpaceChip = React.forwardRef<HTMLButtonElement, FeedSpaceChipProps>(
  (
    {
      spaceId,
      spaceName,
      spaceColor = '#6b7280', // Default gray
      spaceIcon,
      onClick,
      className,
      size = 'md',
    },
    ref
  ) => {
    // Convert hex color to RGB for opacity variations
    const hexToRgb = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '107, 114, 128'; // Fallback gray
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    };

    const rgb = hexToRgb(spaceColor);

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]',
          size === 'sm' ? 'px-2.5 py-1 text-xs min-h-[32px]' : 'px-3 py-1.5 text-sm min-h-[36px]',
          className
        )}
        style={{
          backgroundColor: `rgba(${rgb}, 0.12)`,
          borderColor: `rgba(${rgb}, 0.3)`,
          color: spaceColor,
        }}
        aria-label={`View ${spaceName} space`}
      >
        {/* Icon */}
        {spaceIcon ? (
          <span className="text-base leading-none" aria-hidden="true">
            {spaceIcon}
          </span>
        ) : (
          <HashIcon
            className={cn('flex-shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')}
            style={{ color: spaceColor }}
          />
        )}

        {/* Space name */}
        <span className="font-medium leading-none truncate max-w-[200px]">
          {spaceName}
        </span>
      </button>
    );
  }
);

FeedSpaceChip.displayName = 'FeedSpaceChip';
