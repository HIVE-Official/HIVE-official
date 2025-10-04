import * as React from "react";
export interface JoinedSpaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space name */
    title: string;
    /** Brief description */
    description?: string;
    /** Cover image URL */
    coverImage?: string;
    /** Member count */
    memberCount: number;
    /** Unread count (notifications, messages) */
    unreadCount?: number;
    /** Click handler */
    onClick?: () => void;
}
/**
 * Joined Space Card
 *
 * Built on shadcn Card with HIVE monochrome + gold visual language.
 * For "My Spaces" section - spaces the user has already joined.
 *
 * Design Strategy:
 * - shadcn Card as base (no reinventing primitives)
 * - Monochrome hierarchy (muted backgrounds, subtle borders)
 * - Gold accent ONLY for active state (hover)
 * - Motion on hover for tactile feel
 * - Cover image as visual anchor
 *
 * Differentiation from generic cards:
 * - Vertical layout with cover image on top
 * - Unread count badge (gold when active)
 * - ChevronRight for affordance
 * - Hover state with gold border
 */
declare const JoinedSpaceCard: React.ForwardRefExoticComponent<JoinedSpaceCardProps & React.RefAttributes<HTMLDivElement>>;
export { JoinedSpaceCard };
//# sourceMappingURL=joined-space-card.d.ts.map