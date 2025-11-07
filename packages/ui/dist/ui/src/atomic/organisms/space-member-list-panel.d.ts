export type SpaceMemberRole = "owner" | "admin" | "moderator" | "member";
type MemberFilterTab = "online" | "offline" | "all";
export interface SpaceMemberListMember {
    id: string;
    userId: string;
    displayName: string;
    handle?: string | null;
    avatarUrl?: string | null;
    role: SpaceMemberRole;
    isOnline?: boolean;
    lastSeen?: Date | string | number | null;
}
export interface SpaceMemberListCurrentUser {
    userId: string;
    role: SpaceMemberRole;
}
export interface SpaceMemberListPanelCopy {
    title: string;
    searchPlaceholder: string;
    emptyDefault: string;
    emptySearch: string;
    onlineTab: string;
    offlineTab: string;
    allTab: string;
    inviteTooltip: string;
    onlineLabel: string;
    totalMembersLabel: string;
}
export interface SpaceMemberListPanelProps {
    members?: SpaceMemberListMember[];
    currentUserMembership?: SpaceMemberListCurrentUser | null;
    isLoading?: boolean;
    initialTab?: MemberFilterTab;
    onClose?: () => void;
    onInviteClick?: () => void;
    onSearchChange?: (query: string) => void;
    onMessageMember?: (member: SpaceMemberListMember) => void;
    onMemberAction?: (member: SpaceMemberListMember) => void;
    canManageMembers?: boolean;
    copy?: Partial<SpaceMemberListPanelCopy>;
    showCloseButton?: boolean;
}
export declare function SpaceMemberListPanel({ members: rawMembers, currentUserMembership, isLoading, initialTab, onClose, onInviteClick, onSearchChange, onMessageMember, onMemberAction, canManageMembers, copy, showCloseButton, }: SpaceMemberListPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=space-member-list-panel.d.ts.map