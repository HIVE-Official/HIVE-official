import React from 'react';
import type { CampusIdentityHeaderProps } from '../molecules/campus-identity-header';
import type { CampusSpacesCardProps } from '../molecules/campus-spaces-card';
import type { CampusActivityFeedProps } from '../molecules/campus-activity-feed';
import type { CampusBuilderToolsProps } from '../molecules/campus-builder-tools';
export interface ProfileDashboardProps {
    user: CampusIdentityHeaderProps['user'];
    spaces: CampusSpacesCardProps['spaces'];
    activities: CampusActivityFeedProps['activities'];
    availableTools: CampusBuilderToolsProps['availableTools'];
    createdTools: CampusBuilderToolsProps['createdTools'];
    layout?: 'desktop' | 'tablet' | 'mobile';
    variant?: 'default' | 'compact' | 'focused';
    showBuilder?: boolean;
    isLoading?: {
        profile?: boolean;
        spaces?: boolean;
        activities?: boolean;
        tools?: boolean;
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
    className?: string;
}
export declare const ProfileDashboard: React.FC<ProfileDashboardProps>;
export declare const CompactProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant'>>;
export declare const FocusedProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant' | 'showBuilder'>>;
export default ProfileDashboard;
//# sourceMappingURL=profile-dashboard.d.ts.map