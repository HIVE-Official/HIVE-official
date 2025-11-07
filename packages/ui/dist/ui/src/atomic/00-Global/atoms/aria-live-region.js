'use client';
import { jsx as _jsx } from "react/jsx-runtime";
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
export const AriaLiveRegion = ({ message, politeness = 'polite', clearAfter = 3000, onClear, }) => {
    // Auto-clear message after delay
    React.useEffect(() => {
        if (message && clearAfter > 0) {
            const timer = setTimeout(() => {
                onClear?.();
            }, clearAfter);
            return () => clearTimeout(timer);
        }
    }, [message, clearAfter, onClear]);
    return (_jsx("div", { role: "status", "aria-live": politeness, "aria-atomic": "true", className: "sr-only", children: message }));
};
AriaLiveRegion.displayName = 'AriaLiveRegion';
//# sourceMappingURL=aria-live-region.js.map