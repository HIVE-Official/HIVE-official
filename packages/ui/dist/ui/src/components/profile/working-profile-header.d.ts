/**
 * HIVE Profile Header - Campus Command Center
 * Brand-consistent Profile header with HIVE's gold/black design system
 * Built for University at Buffalo students
 */
import * as React from 'react';
export interface ProfileStats {
    spacesCount: number;
    toolsCount: number;
    connectionsCount: number;
    reputation?: number;
}
export interface ViewerContext {
    isOwnProfile: boolean;
    isConnected?: boolean;
    canMessage?: boolean;
    canConnect?: boolean;
}
export interface WorkingProfileHeaderProps {
    name: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    dorm?: string;
    status?: 'online' | 'away' | 'offline' | 'studying';
    role?: 'student' | 'admin' | 'leader';
    verified?: boolean;
    isBuilder?: boolean;
    completionPercentage?: number;
    ghostMode?: boolean;
    stats?: ProfileStats;
    viewerContext?: ViewerContext;
    showCampusInfo?: boolean;
    showSocialActions?: boolean;
    showCompletionPrompt?: boolean;
    showStats?: boolean;
    onEditProfile?: () => void;
    onShareProfile?: () => void;
    onConnect?: () => void;
    onMessage?: () => void;
    onToggleGhostMode?: () => void;
    onStatsClick?: (statType: string) => void;
    className?: string;
}
export declare const WorkingProfileHeader: React.ForwardRefExoticComponent<WorkingProfileHeaderProps & React.RefAttributes<HTMLDivElement>>;
export type { ProfileStats, ViewerContext, WorkingProfileHeaderProps };
//# sourceMappingURL=working-profile-header.d.ts.map