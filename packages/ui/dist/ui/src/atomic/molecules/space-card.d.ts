/**
 * Space Card - Unified Polymorphic Component
 *
 * Single card molecule that handles all space display variants:
 * - default: Standard vertical card for grids
 * - discovery: Horizontal card with campus context for browse/discovery
 * - joined: Vertical card with unread badge for joined spaces
 * - compact: Minimal card for lists
 *
 * Uses SpaceData canonical type and SpaceActionHandler for events.
 *
 * @module molecules/space-card
 */
import * as React from "react";
import type { SpaceData, SpaceCardVariant, SpaceCardLayout, SpaceActionHandler } from "../../types/space.types";
export interface SpaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space data (canonical type) */
    space: SpaceData;
    /** Visual variant */
    variant?: SpaceCardVariant;
    /** Layout orientation */
    layout?: SpaceCardLayout;
    /** Whether to show action buttons */
    showActions?: boolean;
    /** Whether to show stats */
    showStats?: boolean;
    /** Whether to show campus context (friends, trending) */
    showCampusContext?: boolean;
    /** Whether to show tags */
    showTags?: boolean;
    /** Maximum tags to display */
    maxTags?: number;
    /** Action handler (aggregated) */
    onAction?: SpaceActionHandler;
    /** Legacy handlers (for backward compatibility) */
    onClick?: () => void;
    onJoin?: () => void;
    onLeave?: () => void;
}
/**
 * Space Card Component
 */
declare const SpaceCard: React.ForwardRefExoticComponent<SpaceCardProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceCard };
//# sourceMappingURL=space-card.d.ts.map