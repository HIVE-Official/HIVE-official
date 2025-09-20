import { type Space } from '@hive/core';
export interface MemberDirectoryWidgetProps {
    space: Space;
    isLeader?: boolean;
    currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    showCompact?: boolean;
    maxMembers?: number;
    onMemberAction?: (memberId: string, action: string, data?: any) => void;
    authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
    className?: string;
}
export declare function MemberDirectoryWidget({ space, isLeader, currentUserRole, leaderMode, showCompact, maxMembers, onMemberAction, authenticatedFetch, className }: MemberDirectoryWidgetProps): void;
//# sourceMappingURL=member-directory-widget.d.ts.map