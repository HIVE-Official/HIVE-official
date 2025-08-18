import React from 'react';
export interface SpaceCardProps {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
    status: 'preview' | 'active' | 'invite_only';
    memberCount?: number;
    potentialMembers?: number;
    recentActivity?: string;
    upcomingEvents?: number;
    leaders?: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
    }>;
    isJoined?: boolean;
    canRequest?: boolean;
    onJoin?: () => void;
    onRequestAccess?: () => void;
    onViewSpace?: () => void;
    className?: string;
}
export declare const SpaceCard: React.FC<SpaceCardProps>;
//# sourceMappingURL=space-card.d.ts.map