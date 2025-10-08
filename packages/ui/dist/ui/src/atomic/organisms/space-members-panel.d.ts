import * as React from "react";
import type { SpaceActionHandler } from "../../types/space.types";
export interface SpaceMemberPreview {
    userId: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: "member" | "moderator" | "leader" | "founder";
    isOnline?: boolean;
}
export interface SpaceMembersPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** List of members to preview */
    members?: SpaceMemberPreview[];
    /** Total member count (may be more than preview length) */
    totalMemberCount?: number;
    /** Maximum members to show in preview */
    previewLimit?: number;
    /** Whether user can invite */
    canInvite?: boolean;
    /** Show online status indicators */
    showOnlineStatus?: boolean;
    /** Empty state message */
    emptyStateMessage?: string;
    /** Loading state */
    isLoading?: boolean;
    /** Action handler (aggregated) */
    onAction?: SpaceActionHandler;
    /** Legacy handlers (for backward compatibility) */
    onInvite?: () => void;
    onViewAll?: () => void;
    onMemberClick?: (member: SpaceMemberPreview) => void;
}
declare const SpaceMembersPanel: React.ForwardRefExoticComponent<SpaceMembersPanelProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceMembersPanel };
//# sourceMappingURL=space-members-panel.d.ts.map