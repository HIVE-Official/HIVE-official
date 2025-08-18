import React from 'react';
/**
 * UNIFIED PROFILE DASHBOARD - PRODUCTION READY
 *
 * This is THE definitive profile dashboard component for HIVE.
 * Consolidates all previous implementations into one production-ready solution.
 *
 * Features:
 * - Atomic design principles
 * - Expand & Focus interaction patterns
 * - Real-time data integration
 * - Mobile-responsive design
 * - Error boundary integration
 * - Performance optimized
 *
 * @version 2.0.0 - Production Consolidation
 */
interface HiveUser {
    id: string;
    name: string;
    handle: string;
    email?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    school?: string;
    major?: string;
    year?: string;
    joinedAt?: string;
    status?: 'online' | 'offline' | 'busy' | 'away' | 'studying';
    isOnline?: boolean;
    isBuilder?: boolean;
    completionPercentage?: number;
    statusMessage?: string;
    memberSince?: string;
}
interface CampusSpace {
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
    memberCount?: number;
    unreadCount?: number;
    lastActivity?: string;
    isPinned?: boolean;
    isFavorite?: boolean;
    isMuted?: boolean;
    userRole?: 'member' | 'moderator' | 'leader';
    recentActivity?: {
        type: 'message' | 'announcement' | 'event';
        preview: string;
        timestamp: string;
    };
}
interface CampusActivity {
    id: string;
    type: 'space_join' | 'tool_created' | 'assignment' | 'social' | 'message';
    title: string;
    content?: string;
    author?: {
        name: string;
        handle: string;
    };
    timestamp: string;
    priority?: 'low' | 'medium' | 'high';
    isUnread?: boolean;
    metadata?: {
        likes?: number;
        replyCount?: number;
    };
}
interface CampusTool {
    id: string;
    name: string;
    type: 'template' | 'app' | 'widget' | 'automation';
    category: 'productivity' | 'social' | 'academic' | 'utility';
    description: string;
    icon: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    timeToCreate?: string;
    popularity?: number;
    usageCount?: number;
    createdAt?: string;
    isPublic?: boolean;
    likes?: number;
}
interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
    location?: string;
    spaceId?: string;
    spaceName?: string;
    status: 'confirmed' | 'tentative' | 'cancelled';
}
interface CalendarConflict {
    id: string;
    type: 'overlap' | 'double_booking' | 'travel_time';
    severity: 'high' | 'medium' | 'low';
    eventIds: string[];
    description: string;
    suggestion: string;
    suggestedActions: Array<{
        action: 'reschedule' | 'cancel' | 'shorten' | 'move_location';
        eventId: string;
        newTime?: string;
        newLocation?: string;
    }>;
}
interface UserStats {
    connections?: number;
    spaces?: number;
    tools?: number;
    achievements?: number;
    contributions?: number;
}
interface LoadingStates {
    profile?: boolean;
    spaces?: boolean;
    activities?: boolean;
    tools?: boolean;
    calendar?: boolean;
}
export interface UnifiedProfileDashboardProps {
    user: HiveUser;
    spaces?: CampusSpace[];
    activities?: CampusActivity[];
    availableTools?: CampusTool[];
    createdTools?: CampusTool[];
    calendarEvents?: CalendarEvent[];
    calendarConflicts?: CalendarConflict[];
    stats?: UserStats;
    layout?: 'desktop' | 'tablet' | 'mobile';
    showBuilder?: boolean;
    showCalendar?: boolean;
    isLoading?: LoadingStates;
    onSpaceClick?: (spaceId: string) => void;
    onActivityClick?: (activityId: string) => void;
    onToolClick?: (toolId: string) => void;
    onCreateTool?: (toolType: string) => void;
    onBecomeBuilder?: () => void;
    onJoinSpace?: () => void;
    onViewAllSpaces?: () => void;
    onViewAllActivities?: () => void;
    onEditProfile?: () => void;
    onMuteSpace?: (spaceId: string, muted: boolean) => void;
    onPinSpace?: (spaceId: string, pinned: boolean) => void;
    onLeaveSpace?: (spaceId: string) => void;
    onQuickPost?: (spaceId: string, message: string) => void;
    onJoinToolsWaitlist?: () => void;
    onCreateEvent?: (eventData: Record<string, unknown>) => void;
    onUpdateEvent?: (id: string, updates: Record<string, unknown>) => void;
    onDeleteEvent?: (id: string) => void;
    onResolveConflict?: (conflictId: string, resolution: string, eventId?: string) => void;
    onAvatarChange?: (file: File) => void;
    onStatClick?: (statType: string) => void;
}
export declare const UnifiedProfileDashboard: React.FC<UnifiedProfileDashboardProps>;
export default UnifiedProfileDashboard;
//# sourceMappingURL=unified-profile-dashboard.d.ts.map