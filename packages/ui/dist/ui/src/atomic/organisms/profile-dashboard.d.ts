import React from 'react';
import type { CampusIdentityHeaderProps } from '../molecules/campus-identity-header';
import type { CampusSpacesCardProps } from '../molecules/campus-spaces-card';
import type { CampusActivityFeedProps } from '../molecules/campus-activity-feed';
import type { CampusBuilderToolsProps } from '../molecules/campus-builder-tools';
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
}
export interface ProfileDashboardProps {
    user: CampusIdentityHeaderProps['user'];
    spaces: CampusSpacesCardProps['spaces'];
    activities: CampusActivityFeedProps['activities'];
    availableTools: CampusBuilderToolsProps['availableTools'];
    createdTools: CampusBuilderToolsProps['createdTools'];
    calendarEvents?: CalendarEvent[];
    calendarConflicts?: CalendarConflict[];
    layout?: 'desktop' | 'tablet' | 'mobile';
    variant?: 'default' | 'compact' | 'focused';
    showBuilder?: boolean;
    showCalendar?: boolean;
    isLoading?: {
        profile?: boolean;
        spaces?: boolean;
        activities?: boolean;
        tools?: boolean;
        calendar?: boolean;
    };
    onAvatarClick?: () => void;
    onEditProfile?: () => void;
    onSpaceClick?: (spaceId: string) => void;
    onActivityClick?: (activityId: string) => void;
    onToolClick?: (toolId: string) => void;
    onCreateTool?: (toolType: string) => void;
    onBecomeBuilder?: () => void;
    onJoinSpace?: () => void;
    onViewAllSpaces?: () => void;
    onViewAllActivities?: () => void;
    onMuteSpace?: (spaceId: string, muted: boolean) => void;
    onPinSpace?: (spaceId: string, pinned: boolean) => void;
    onLeaveSpace?: (spaceId: string) => void;
    onQuickPost?: (spaceId: string, message: string) => void;
    onJoinToolsWaitlist?: () => void;
    onCreateEvent?: (event: Partial<CalendarEvent>) => void;
    onUpdateEvent?: (id: string, updates: Partial<CalendarEvent>) => void;
    onDeleteEvent?: (id: string) => void;
    onResolveConflict?: (conflictId: string, resolution: string, eventId?: string) => void;
    className?: string;
}
export declare const ProfileDashboard: React.FC<ProfileDashboardProps>;
export declare const CompactProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant'>>;
export declare const FocusedProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant' | 'showBuilder'>>;
export default ProfileDashboard;
//# sourceMappingURL=profile-dashboard.d.ts.map