import * as React from "react";
export interface Tool {
    id: string;
    name: string;
    icon: string;
    color?: string;
    description?: string;
    isCustom?: boolean;
    createdBy?: string;
    usageCount?: number;
    permissions?: "all" | "leaders" | "custom";
}
export interface SpaceToolsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Default tools (Event, Poll, Task, Resource) */
    defaultTools?: Tool[];
    /** Custom HiveLab tools */
    customTools?: Tool[];
    /** Whether the current user is a space leader */
    isLeader?: boolean;
    /** Handler for tool click */
    onToolClick?: (tool: Tool) => void;
    /** Handler for creating/managing tools (leaders only) */
    onManageTools?: () => void;
    /** Handler for creating a new tool in HiveLab */
    onCreateTool?: () => void;
    /** Loading state */
    isLoading?: boolean;
}
declare const SpaceToolsPanel: React.ForwardRefExoticComponent<SpaceToolsPanelProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceToolsPanel };
//# sourceMappingURL=space-tools-panel.d.ts.map