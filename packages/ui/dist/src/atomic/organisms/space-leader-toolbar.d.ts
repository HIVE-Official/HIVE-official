import * as React from "react";
export interface SpaceLeaderToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space statistics */
    pendingPosts?: number;
    pendingMembers?: number;
    reportedContent?: number;
    /** Action callbacks */
    onEdit?: () => void;
    onSettings?: () => void;
    onAnalytics?: () => void;
    onInvite?: () => void;
    onManageContent?: () => void;
    onManageMembers?: () => void;
    onManageEvents?: () => void;
    onExportData?: () => void;
    /** Display mode */
    variant?: "full" | "compact";
    /** Show notification badges */
    showBadges?: boolean;
}
declare const SpaceLeaderToolbar: React.ForwardRefExoticComponent<SpaceLeaderToolbarProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceLeaderToolbar };
//# sourceMappingURL=space-leader-toolbar.d.ts.map