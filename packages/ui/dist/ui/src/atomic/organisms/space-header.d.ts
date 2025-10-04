import * as React from "react";
import type { SpaceData, SpaceActionHandler } from "../../types/space.types";
export interface SpaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space data (canonical type) */
    space: SpaceData;
    /** Layout mode: header or sidebar */
    layout?: "header" | "sidebar";
    /** Whether sidebar is collapsed */
    isCollapsed?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Action handler (aggregated) */
    onAction?: SpaceActionHandler;
    /** Layout toggle handler */
    onToggleLayout?: () => void;
    /** Legacy callbacks (for backward compatibility) */
    onJoin?: () => void;
    onLeave?: () => void;
    onEdit?: () => void;
    onSettings?: () => void;
    onAnalytics?: () => void;
    onInvite?: () => void;
}
declare const SpaceHeader: React.ForwardRefExoticComponent<SpaceHeaderProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceHeader };
//# sourceMappingURL=space-header.d.ts.map