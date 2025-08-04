import React from 'react';
export type MemberRole = 'leader' | 'co_leader' | 'member' | 'pending';
export type MemberStatus = 'active' | 'inactive' | 'banned' | 'pending';
export interface SpaceMember {
    id: string;
    handle: string;
    displayName: string;
    avatar?: string;
    role: MemberRole;
    status: MemberStatus;
    joinedAt: string;
    lastActive?: string;
    bio?: string;
    major?: string;
    year?: string;
    postsCount: number;
    eventsAttended: number;
    toolsUsed: number;
    canManageMembers: boolean;
    canManageTools: boolean;
    canCreateEvents: boolean;
    canModerate: boolean;
    email?: string;
    isOnline?: boolean;
}
export type MemberFilterType = 'all' | 'leaders' | 'members' | 'pending' | 'online';
export type MemberSortType = 'name' | 'role' | 'joined' | 'activity';
export interface SpaceMemberDirectoryProps {
    members: SpaceMember[];
    currentUserRole: MemberRole;
    spaceType: 'university' | 'residential' | 'greek' | 'student';
    onInviteMembers?: () => void;
    onManageMember?: (memberId: string, action: 'promote' | 'demote' | 'remove' | 'ban' | 'unban') => Promise<void>;
    onViewMemberProfile?: (memberId: string) => void;
    onMessageMember?: (memberId: string) => void;
    onApproveMember?: (memberId: string) => Promise<void>;
    onRejectMember?: (memberId: string) => Promise<void>;
    className?: string;
}
export declare const SpaceMemberDirectory: React.FC<SpaceMemberDirectoryProps>;
export default SpaceMemberDirectory;
//# sourceMappingURL=space-member-directory.d.ts.map