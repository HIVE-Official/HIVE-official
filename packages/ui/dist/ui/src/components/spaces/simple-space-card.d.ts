/**
 * SpaceCard - Purpose-built for UB campus spaces
 *
 * Shows the information students actually scan for:
 * 1. What's the space about? (name, activity)
 * 2. Who's there? (member count, activity level)
 * 3. How do I join? (clear action)
 */
export interface Space {
    id: string;
    name: string;
    description?: string;
    location?: string;
    memberCount: number;
    isActive: boolean;
    recentActivity?: string;
    category: 'academic' | 'residential' | 'social' | 'professional';
    isPrivate: boolean;
    lastActive?: string;
}
export interface SpaceCardProps {
    space: Space;
    showLocation?: boolean;
    showActivity?: boolean;
    onJoin?: (spaceId: string) => void;
    onView?: (spaceId: string) => void;
    isJoined?: boolean;
    className?: string;
}
export declare function SpaceCard({ space, showLocation, showActivity, onJoin, onView, isJoined, className }: SpaceCardProps): import("react/jsx-runtime").JSX.Element;
export declare function SpaceCardCompact({ space, onJoin, isJoined, className }: SpaceCardProps): import("react/jsx-runtime").JSX.Element;
export declare function SpaceCardSkeleton(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=simple-space-card.d.ts.map