import React from 'react';
export interface JoinedSpace {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'residential' | 'social' | 'professional' | 'hobby';
    memberCount: number;
    role: 'member' | 'moderator' | 'admin' | 'founder';
    joinedDate: string;
    lastActive: string;
    isPrivate: boolean;
    activityLevel: 'high' | 'medium' | 'low';
    unreadMessages?: number;
    upcomingEvents?: number;
}
export interface ProfileSpacesWidgetProps {
    user: {
        id: string;
        name: string;
    };
    joinedSpaces?: JoinedSpace[];
    totalSpaces?: number;
    spacesCreated?: number;
    totalMembers?: number;
    weeklyEngagement?: number;
    featuredSpace?: JoinedSpace;
    isEditable?: boolean;
    onJoinSpace?: () => void;
    onViewSpace?: (spaceId: string) => void;
    onCreateSpace?: () => void;
    onViewAllSpaces?: () => void;
    onExploreSpaces?: () => void;
    className?: string;
}
export declare const ProfileSpacesWidget: React.FC<ProfileSpacesWidgetProps>;
//# sourceMappingURL=profile-spaces-widget.d.ts.map