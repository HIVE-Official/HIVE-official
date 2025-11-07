import type { SpaceMemberRole } from "./space-member-list-panel";
export interface SpaceMemberManagementStats {
    postsCount: number;
    eventsAttended: number;
    contributionScore: number;
}
export interface SpaceMemberManagementPermissions {
    canPost: boolean;
    canCreateEvents: boolean;
    canInviteMembers: boolean;
    canModerate: boolean;
}
export interface SpaceMemberManagementFlags {
    isReported?: boolean;
    warningCount?: number;
    isSuspended?: boolean;
}
export interface SpaceMemberManagementMember {
    id: string;
    name: string;
    username: string;
    email?: string;
    avatar?: string;
    role: SpaceMemberRole;
    status: "active" | "inactive" | "suspended";
    joinedAt?: Date | string | number;
    lastActive?: Date | string | number;
    stats?: Partial<SpaceMemberManagementStats>;
    permissions?: Partial<SpaceMemberManagementPermissions>;
    flags?: SpaceMemberManagementFlags;
}
export interface SpaceMemberManagementPanelProps {
    spaceName: string;
    members: SpaceMemberManagementMember[];
    currentUserRole: SpaceMemberRole;
    isLoading?: boolean;
    open?: boolean;
    onClose?: () => void;
    onInviteClick?: () => void;
    onChangeRole?: (memberId: string, newRole: SpaceMemberRole) => void;
    onSuspendMember?: (memberId: string, suspend: boolean) => void;
    onRemoveMember?: (memberId: string) => void;
    onViewMember?: (member: SpaceMemberManagementMember) => void;
    canChangeRoles?: boolean;
    canRemoveMembers?: boolean;
    canSuspendMembers?: boolean;
    canInviteMembers?: boolean;
}
export declare function SpaceMemberManagementPanel({ spaceName, members, currentUserRole, isLoading, open, onClose, onInviteClick, onChangeRole, onSuspendMember, onRemoveMember, onViewMember, canChangeRoles, canRemoveMembers, canSuspendMembers, canInviteMembers, }: SpaceMemberManagementPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=space-member-management-panel.d.ts.map