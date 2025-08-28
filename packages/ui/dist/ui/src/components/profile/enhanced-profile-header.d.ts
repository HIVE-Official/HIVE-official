/**
 * Enhanced Profile Header - Campus Command Center Header
 * Integrates user identity with campus-specific profile actions
 *
 * Built using existing HIVE components for guaranteed compatibility
 */
import React from 'react';
export interface EnhancedProfileHeaderProps {
    user: {
        id: string;
        fullName: string;
        handle?: string;
        avatar?: string;
        bio?: string;
        major?: string;
        graduationYear?: number;
        dorm?: string;
        status?: 'online' | 'away' | 'offline' | 'studying';
        role?: 'student' | 'faculty' | 'admin' | 'leader';
        verified?: boolean;
        completionPercentage?: number;
        isBuilder?: boolean;
        ghostMode?: boolean;
    };
    stats?: {
        spacesCount: number;
        toolsCount: number;
        connectionsCount: number;
        reputation: number;
    };
    viewerContext?: {
        isOwnProfile: boolean;
        isConnected?: boolean;
        canMessage?: boolean;
        canConnect?: boolean;
    };
    showCampusInfo?: boolean;
    showSocialActions?: boolean;
    showCompletionPrompt?: boolean;
    onEditProfile?: () => void;
    onShareProfile?: () => void;
    onConnect?: () => void;
    onMessage?: () => void;
    onToggleGhostMode?: (enabled: boolean) => void;
    onStatsClick?: (statType: string) => void;
    className?: string;
}
export declare const EnhancedProfileHeader: React.ForwardRefExoticComponent<EnhancedProfileHeaderProps & React.RefAttributes<HTMLDivElement>>;
export type { EnhancedProfileHeaderProps };
//# sourceMappingURL=enhanced-profile-header.d.ts.map