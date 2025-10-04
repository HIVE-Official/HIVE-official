import * as React from "react";
export interface BulletinCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space name */
    title: string;
    /** Brief description */
    description?: string;
    /** Cover image URL (like a poster on bulletin board) */
    coverImage?: string;
    /** Category badge text */
    category?: string;
    /** Member count */
    memberCount?: number;
    /** Trending indicator */
    isTrending?: boolean;
    /** Pinned/featured */
    isPinned?: boolean;
    /** Tags array */
    tags?: string[];
    /** Join handler */
    onJoin?: () => void;
    /** Click handler */
    onClick?: () => void;
    /** Already joined */
    isJoined?: boolean;
}
/**
 * Bulletin Board Card Component
 *
 * Custom primitive built from shadcn Card with bulletin board aesthetic.
 * Designed to look like a notice pinned to a cork board.
 *
 * Features:
 * - Pin icon indicator for featured/pinned items
 * - Slight rotation effect on hover (like physical pin tilt)
 * - Shadow depth for layered bulletin feel
 * - Trending indicator for active spaces
 */
declare const BulletinCard: React.ForwardRefExoticComponent<BulletinCardProps & React.RefAttributes<HTMLDivElement>>;
export { BulletinCard };
//# sourceMappingURL=bulletin-card.d.ts.map