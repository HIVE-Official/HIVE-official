interface MemberDirectoryToolProps {
    spaceId: string;
    spaceName: string;
    isLeader: boolean;
    currentUserRole: 'owner' | 'admin' | 'moderator' | 'member';
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    onMemberAction?: (memberId: string, action: string, data?: any) => void;
    authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
    className?: string;
}
export declare function MemberDirectoryTool({ spaceId, spaceName, isLeader, currentUserRole, leaderMode, onMemberAction, authenticatedFetch, className }: MemberDirectoryToolProps): void;
export {};
//# sourceMappingURL=member-directory-tool.d.ts.map