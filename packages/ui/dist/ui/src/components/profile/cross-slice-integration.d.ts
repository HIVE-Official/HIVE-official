/**
 * Cross-Slice Integration - Campus Command Center Hub
 * Provides integration components connecting Profile with Spaces, Tools, Feed, and Events
 *
 * Built using HIVE foundation systems and molecules:
 * - All molecule components for consistent UI patterns
 * - Campus-specific integration features
 * - Real-time cross-slice data flow
 * - Mobile-first responsive design
 */
import React from 'react';
export interface SpaceData {
    id: string;
    name: string;
    type: 'dorm' | 'major' | 'club' | 'class' | 'interest';
    memberCount: number;
    unreadCount: number;
    lastActivity: Date;
    isActive: boolean;
    role?: 'leader' | 'admin' | 'member';
    avatar?: string;
}
export interface ToolData {
    id: string;
    name: string;
    category: 'academic' | 'social' | 'utility' | 'event';
    usage: number;
    rating: number;
    isOwned: boolean;
    lastUsed?: Date;
    spaceId?: string;
    spaceName?: string;
}
export interface EventData {
    id: string;
    title: string;
    type: 'academic' | 'social' | 'ritual' | 'meeting';
    startTime: Date;
    location?: string;
    spaceId?: string;
    spaceName?: string;
    attendeeCount: number;
    isRSVP: boolean;
}
export interface ActivityData {
    id: string;
    type: 'space_join' | 'tool_create' | 'event_attend' | 'connection_made' | 'post_create';
    timestamp: Date;
    title: string;
    description: string;
    user: {
        id: string;
        name: string;
        avatar?: string;
    };
    metadata?: {
        spaceId?: string;
        spaceName?: string;
        toolId?: string;
        toolName?: string;
        eventId?: string;
        eventName?: string;
    };
}
export interface QuickActionData {
    id: string;
    label: string;
    description: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    href?: string;
    onClick?: () => void;
    badge?: number;
    campus?: boolean;
    category: 'space' | 'tool' | 'event' | 'social';
}
export interface CrossSliceIntegrationProps {
    spaces?: SpaceData[];
    tools?: ToolData[];
    events?: EventData[];
    recentActivity?: ActivityData[];
    quickActions?: QuickActionData[];
    showQuickActions?: boolean;
    showSpaceActivity?: boolean;
    showToolUsage?: boolean;
    showUpcomingEvents?: boolean;
    showCampusActivity?: boolean;
    campusOptimized?: boolean;
    onSpaceClick?: (spaceId: string) => void;
    onToolClick?: (toolId: string) => void;
    onEventClick?: (eventId: string) => void;
    onActivityClick?: (activityId: string) => void;
    onQuickAction?: (actionId: string) => void;
    onRefresh?: () => void;
    isLoading?: boolean;
    className?: string;
}
export interface SpacesIntegrationProps {
    spaces: SpaceData[];
    onSpaceClick?: (spaceId: string) => void;
    onViewAll?: () => void;
    className?: string;
}
export declare const SpacesIntegration: React.ForwardRefExoticComponent<SpacesIntegrationProps & React.RefAttributes<HTMLDivElement>>;
export interface ToolsIntegrationProps {
    tools: ToolData[];
    onToolClick?: (toolId: string) => void;
    onViewAll?: () => void;
    className?: string;
}
export declare const ToolsIntegration: React.ForwardRefExoticComponent<ToolsIntegrationProps & React.RefAttributes<HTMLDivElement>>;
export interface EventsIntegrationProps {
    events: EventData[];
    onEventClick?: (eventId: string) => void;
    onViewAll?: () => void;
    className?: string;
}
export declare const EventsIntegration: React.ForwardRefExoticComponent<EventsIntegrationProps & React.RefAttributes<HTMLDivElement>>;
export interface ActivityIntegrationProps {
    activities: ActivityData[];
    onActivityClick?: (activityId: string) => void;
    onViewAll?: () => void;
    className?: string;
}
export declare const ActivityIntegration: React.ForwardRefExoticComponent<ActivityIntegrationProps & React.RefAttributes<HTMLDivElement>>;
export interface QuickActionsProps {
    actions: QuickActionData[];
    onAction?: (actionId: string) => void;
    className?: string;
}
export declare const QuickActions: React.ForwardRefExoticComponent<QuickActionsProps & React.RefAttributes<HTMLDivElement>>;
export declare const CrossSliceIntegration: React.ForwardRefExoticComponent<CrossSliceIntegrationProps & React.RefAttributes<HTMLDivElement>>;
export type { CrossSliceIntegrationProps, SpaceData, ToolData, EventData, ActivityData, QuickActionData, SpacesIntegrationProps, ToolsIntegrationProps, EventsIntegrationProps, ActivityIntegrationProps, QuickActionsProps };
//# sourceMappingURL=cross-slice-integration.d.ts.map