import * as React from "react";
export interface HiveSpaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space name */
    title: string;
    /** Brief description */
    description?: string;
    /** Cover image URL */
    coverImage?: string;
    /** Member count */
    memberCount: number;
    /** Already joined */
    isJoined?: boolean;
    /** Expandable content */
    expandedContent?: React.ReactNode;
    /** Initially expanded */
    defaultExpanded?: boolean;
    /** Click handler for card */
    onCardClick?: () => void;
    /** Join/Leave handler */
    onJoinToggle?: () => void;
}
/**
 * HIVE Space Card
 *
 * Custom space card with HIVE's unique visual identity.
 * Features collapsible sections, distinctive hover states, and no generic badges.
 *
 * Design Philosophy:
 * - Bulletin board aesthetic with paper-like cards
 * - Gold accents on interaction (#FFD700)
 * - Collapsible to show/hide details
 * - Clear member count display
 * - Immediate visual feedback for joined state
 */
declare const HiveSpaceCard: React.ForwardRefExoticComponent<HiveSpaceCardProps & React.RefAttributes<HTMLDivElement>>;
export { HiveSpaceCard };
//# sourceMappingURL=hive-space-card.d.ts.map