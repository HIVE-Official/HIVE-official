import * as React from "react";
export interface SpaceMember {
    userId: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    role: "member" | "moderator" | "leader" | "founder";
    joinedAt: Date;
    contribution?: {
        posts: number;
        comments: number;
        events: number;
    };
    isOnline?: boolean;
}
export interface SpaceMemberListProps extends React.HTMLAttributes<HTMLDivElement> {
    members: SpaceMember[];
    currentUserId?: string;
    isSpaceLeader?: boolean;
    onMemberClick?: (member: SpaceMember) => void;
    onMemberAction?: (member: SpaceMember, action: "promote" | "remove" | "message") => void;
    showSearch?: boolean;
    showFilters?: boolean;
    emptyStateMessage?: string;
}
declare const SpaceMemberList: React.ForwardRefExoticComponent<SpaceMemberListProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceMemberList };
//# sourceMappingURL=space-member-list.d.ts.map