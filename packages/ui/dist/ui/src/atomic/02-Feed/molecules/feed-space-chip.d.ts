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
export declare const FeedSpaceChip: React.ForwardRefExoticComponent<FeedSpaceChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=feed-space-chip.d.ts.map