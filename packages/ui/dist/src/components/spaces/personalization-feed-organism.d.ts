export interface UserSpace {
    id: string;
    name: string;
    description?: string;
    memberCount?: number;
    type?: string;
    role?: "member" | "admin" | "owner";
    isActive?: boolean;
    lastActivity?: Date;
}
export interface RecommendedSpace {
    id: string;
    name: string;
    description?: string;
    memberCount?: number;
    type?: string;
    reason?: string;
    confidence?: number;
}
export interface ActivityStats {
    spacesJoined: number;
    weeklyGrowth: number;
    activeNow: number;
    totalInteractions?: number;
    favoriteSpaces?: number;
}
export interface PersonalizationFeedOrganismProps {
    /** User's active spaces */
    mySpaces?: UserSpace[];
    /** AI-powered recommendations */
    recommendedSpaces?: RecommendedSpace[];
    /** User activity statistics */
    activityStats?: ActivityStats;
    /** Custom title override */
    title?: string;
    /** Custom subtitle override */
    subtitle?: string;
    /** Navigation handlers */
    onSpaceClick?: (spaceId: string) => void;
    onRecommendationClick?: (spaceId: string) => void;
    onBrowseSpaces?: () => void;
    onJoinSpace?: (spaceId: string) => void;
    /** Layout configuration */
    layout?: "default" | "compact" | "expanded";
    /** Show sections configuration */
    showSections?: {
        mySpaces?: boolean;
        recommendations?: boolean;
        activity?: boolean;
    };
    /** Loading states */
    isLoading?: {
        mySpaces?: boolean;
        recommendations?: boolean;
        activity?: boolean;
    };
    /** Custom className */
    className?: string;
}
export declare function PersonalizationFeedOrganism({ mySpaces, recommendedSpaces, activityStats, title, subtitle, onSpaceClick, onRecommendationClick, onBrowseSpaces, onJoinSpace, layout, showSections, isLoading, className }: PersonalizationFeedOrganismProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=personalization-feed-organism.d.ts.map