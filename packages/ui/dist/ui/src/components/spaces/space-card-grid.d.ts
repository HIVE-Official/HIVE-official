import React from 'react';
export interface SpaceCardGridProps {
    id: string;
    name: string;
    description: string;
    type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
    status: 'preview' | 'active' | 'invite_only';
    memberCount?: number;
    potentialMembers?: number;
    recentActivity?: string;
    upcomingEvents?: number;
    activityLevel: 'low' | 'medium' | 'high';
    leaders?: Array<{
        id: string;
        name: string;
        avatarUrl?: string;
    }>;
    isJoined?: boolean;
    onJoin?: () => void;
    onViewSpace?: () => void;
    className?: string;
}
export declare const SpaceCardGrid: React.FC<SpaceCardGridProps>;
//# sourceMappingURL=space-card-grid.d.ts.map