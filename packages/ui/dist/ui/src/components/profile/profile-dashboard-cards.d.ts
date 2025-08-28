/**
 * Profile Dashboard Cards - Campus Command Center
 * Uses ComprehensiveCard molecule for profile dashboard widgets
 *
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveCard molecule for consistent card structure
 * - SocialInteraction molecule for card engagement
 * - UserIdentity molecule for user displays in cards
 * - Campus-specific dashboard widgets and cross-slice integration
 */
import React from 'react';
export interface SpaceActivity {
    id: string;
    name: string;
    icon?: string;
    unreadCount: number;
    lastActivity: string;
    memberCount: number;
    type: 'academic' | 'social' | 'project' | 'interest';
}
export interface ToolSummary {
    id: string;
    name: string;
    category: string;
    usageCount: number;
    rating: number;
    lastUsed: Date;
    isBuiltByUser: boolean;
}
export interface UpcomingEvent {
    id: string;
    title: string;
    type: 'class' | 'meeting' | 'social' | 'deadline';
    startTime: Date;
    location?: string;
    spaceId?: string;
    spaceName?: string;
}
export interface CampusConnection {
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    mutualConnections: number;
    lastSeen: string;
    status: 'online' | 'away' | 'offline' | 'studying';
    context?: string;
}
export interface ProfileStats {
    spacesCount: number;
    toolsBuilt: number;
    toolsUsed: number;
    connectionsCount: number;
    reputation: number;
    weeklyActive: boolean;
    campusRank?: number;
}
export interface MySpacesCardProps {
    spaces: SpaceActivity[];
    onSpaceClick?: (spaceId: string) => void;
    onViewAll?: () => void;
    className?: string;
}
export interface MyToolsCardProps {
    tools: ToolSummary[];
    builderStats?: {
        totalBuilt: number;
        totalUsage: number;
        averageRating: number;
    };
    onToolClick?: (toolId: string) => void;
    onBuildNew?: () => void;
    onViewAll?: () => void;
    className?: string;
}
export interface UpcomingEventsCardProps {
    events: UpcomingEvent[];
    onEventClick?: (eventId: string) => void;
    onCreateEvent?: () => void;
    onViewCalendar?: () => void;
    className?: string;
}
export interface CampusConnectionsCardProps {
    connections: CampusConnection[];
    suggestedConnections?: CampusConnection[];
    onConnectionClick?: (userId: string) => void;
    onViewAll?: () => void;
    onDiscoverMore?: () => void;
    className?: string;
}
export interface ProfileStatsCardProps {
    stats: ProfileStats;
    onStatClick?: (statType: string) => void;
    className?: string;
}
export interface QuickActionsCardProps {
    actions?: Array<{
        id: string;
        label: string;
        icon: React.ComponentType<{
            className?: string;
        }>;
        description: string;
        onClick: () => void;
    }>;
    className?: string;
}
export declare const MySpacesCard: React.ForwardRefExoticComponent<MySpacesCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const MyToolsCard: React.ForwardRefExoticComponent<MyToolsCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const UpcomingEventsCard: React.ForwardRefExoticComponent<UpcomingEventsCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const CampusConnectionsCard: React.ForwardRefExoticComponent<CampusConnectionsCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const ProfileStatsCard: React.ForwardRefExoticComponent<ProfileStatsCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const QuickActionsCard: React.ForwardRefExoticComponent<QuickActionsCardProps & React.RefAttributes<HTMLDivElement>>;
export type { MySpacesCardProps, MyToolsCardProps, UpcomingEventsCardProps, CampusConnectionsCardProps, ProfileStatsCardProps, QuickActionsCardProps, SpaceActivity, ToolSummary, UpcomingEvent, CampusConnection, ProfileStats };
//# sourceMappingURL=profile-dashboard-cards.d.ts.map