import * as React from "react";
/**
 * Campus-specific context for space discovery
 */
export interface CampusSpaceContext {
    /** Friends/connections who are members */
    friendsInSpace?: Array<{
        id: string;
        name: string;
        avatar?: string;
        major?: string;
    }>;
    /** Campus trending indicator */
    isTrending?: boolean;
    trendingCategory?: string;
    /** Space type/category */
    spaceType?: "academic" | "greek" | "residential" | "interest" | "official";
    primaryMajor?: string;
    building?: string;
    /** Activity metrics */
    activeToday?: number;
    recentPostCount?: number;
}
export interface DiscoverableSpaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space name */
    title: string;
    /** Description */
    description: string;
    /** Cover image URL */
    coverImage?: string;
    /** Member count */
    memberCount: number;
    /** Post count (optional) */
    postCount?: number;
    /** Campus context (HIVE-specific) */
    campusContext?: CampusSpaceContext;
    /** Join handler */
    onJoin?: () => void;
    /** Card click handler (navigate to space) */
    onClick?: () => void;
}
/**
 * Discoverable Space Card
 *
 * Built on shadcn Card with HIVE monochrome + gold visual language.
 * For spaces the user hasn't joined yet (discovery/browse state).
 *
 * Design Strategy:
 * - shadcn Card + Button (no custom primitives)
 * - Monochrome base with strategic gold on primary button
 * - Horizontal layout for browse efficiency
 * - Motion for tactile feedback
 * - Clear join CTA
 *
 * Differentiation from JoinedSpaceCard:
 * - Horizontal layout (image on left, content on right)
 * - Primary "Join" button instead of chevron
 * - No unread badge (not joined yet)
 * - Description always visible (not truncated)
 */
declare const DiscoverableSpaceCard: React.ForwardRefExoticComponent<DiscoverableSpaceCardProps & React.RefAttributes<HTMLDivElement>>;
export { DiscoverableSpaceCard };
//# sourceMappingURL=discoverable-space-card.d.ts.map