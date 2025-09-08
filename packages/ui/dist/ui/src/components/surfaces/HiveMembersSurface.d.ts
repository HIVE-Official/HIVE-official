import React from 'react';
interface SpaceMember {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    role: 'leader' | 'admin' | 'moderator' | 'member';
    joinedAt: Date;
    lastActive?: Date;
    bio?: string;
    major?: string;
    year?: string;
    isOnline?: boolean;
    contributions?: {
        posts: number;
        events: number;
        tools: number;
    };
}
export interface HiveMembersSurfaceProps {
    spaceId: string;
    spaceName?: string;
    isLeader?: boolean;
    currentUserId?: string;
    className?: string;
    variant?: 'widget' | 'full' | 'compact';
    members?: SpaceMember[];
    loading?: boolean;
    error?: Error | null;
    onInviteMember?: () => Promise<void>;
    onRemoveMember?: (memberId: string) => Promise<void>;
    onUpdateRole?: (memberId: string, newRole: SpaceMember['role']) => Promise<void>;
    onMessageMember?: (memberId: string) => void;
}
export declare const HiveMembersSurface: React.FC<HiveMembersSurfaceProps>;
export {};
//# sourceMappingURL=HiveMembersSurface.d.ts.map