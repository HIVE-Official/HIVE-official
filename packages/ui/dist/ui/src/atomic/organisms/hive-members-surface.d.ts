import React from 'react';
import type { Space } from '../../types';
export type HiveMemberRole = 'owner' | 'admin' | 'moderator' | 'member';
export type HiveMemberStatus = 'active' | 'inactive' | 'suspended';
export interface HiveSpaceMember {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    role: HiveMemberRole;
    status: HiveMemberStatus;
    joinedAt: Date;
    lastActive?: Date;
    major?: string;
    year?: string;
    dorm?: string;
    postsCount?: number;
    engagementScore?: number;
    coordinationParticipation?: number;
}
export interface HiveMembersSurfaceProps {
    space: Space;
    members?: HiveSpaceMember[];
    maxMembers?: number;
    isBuilder?: boolean;
    leaderMode?: 'configure' | 'moderate' | 'insights' | null;
    canManageMembers?: boolean;
    onChangeRole?: (memberId: string, role: HiveMemberRole) => void;
    onRemoveMember?: (memberId: string) => void;
    onBlockMember?: (memberId: string) => void;
    onInviteMember?: () => void;
    onMessageMember?: (memberId: string) => void;
}
export declare const HiveMembersSurface: React.FC<HiveMembersSurfaceProps>;
export default HiveMembersSurface;
//# sourceMappingURL=hive-members-surface.d.ts.map