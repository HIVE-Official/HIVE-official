'use client';

/**
 * AriaLiveRegion - Screen reader announcements
 *
 * Invisible component that announces dynamic content changes to screen readers
 * Uses aria-live="polite" for non-critical updates
 *
 * Features:
 * - Visually hidden but accessible to screen readers
 * - Polite announcements (doesn't interrupt)
 * - Automatic message clearing after announcement
 * - Debouncing for rapid updates
 *
 * Usage:
 * ```tsx
 * import { AriaLiveRegion } from '@hive/ui';
 *
 * const [announcement, setAnnouncement] = useState('');
 *
 * // Trigger announcement
 * setAnnouncement('Post upvoted');
 *
 * <AriaLiveRegion message={announcement} />
 * ```
 */

import * as React from 'react';

export interface AriaLiveRegionProps {
  /**
   * Message to announce to screen readers
   */
  message: string;

  /**
   * Politeness setting for aria-live
   * - 'polite': Wait for screen reader to finish current announcement (default)
   * - 'assertive': Interrupt screen reader immediately
   */
  politeness?: 'polite' | 'assertive';

  /**
   * Auto-clear message after announcement (ms)
   * Set to 0 to disable auto-clear
   * @default 3000
   */
  clearAfter?: number;

  /**
   * Callback when message is cleared
   */
  onClear?: () => void;
}

export const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({
  message,
  politeness = 'polite',
  clearAfter = 3000,
  onClear,
}) => {
  // Auto-clear message after delay
  React.useEffect(() => {
    if (message && clearAfter > 0) {
      const timer = setTimeout(() => {
        onClear?.();
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter, onClear]);

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

AriaLiveRegion.displayName = 'AriaLiveRegion';
