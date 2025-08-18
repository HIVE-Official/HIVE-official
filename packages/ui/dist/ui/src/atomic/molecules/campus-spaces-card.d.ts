import React from 'react';
export interface CampusSpace {
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
    memberCount: number;
    unreadCount?: number;
    lastActivity?: string;
    icon?: string;
    color?: string;
    isPrivate?: boolean;
    isFavorite?: boolean;
    isPinned?: boolean;
    isMuted?: boolean;
    userRole?: 'member' | 'moderator' | 'leader';
    recentActivity?: {
        type: 'message' | 'event' | 'announcement';
        preview: string;
        timestamp: string;
    };
}
export interface CampusSpacesCardProps {
    spaces: CampusSpace[];
    isLoading?: boolean;
    variant?: 'default' | 'compact' | 'detailed';
    showQuickActions?: boolean;
    onSpaceClick?: (spaceId: string) => void;
    onJoinSpace?: () => void;
    onViewAll?: () => void;
    onMuteSpace?: (spaceId: string, muted: boolean) => void;
    onPinSpace?: (spaceId: string, pinned: boolean) => void;
    onLeaveSpace?: (spaceId: string) => void;
    onQuickPost?: (spaceId: string, message: string) => void;
    className?: string;
}
export declare const CampusSpacesCard: React.FC<CampusSpacesCardProps>;
export default CampusSpacesCard;
//# sourceMappingURL=campus-spaces-card.d.ts.map