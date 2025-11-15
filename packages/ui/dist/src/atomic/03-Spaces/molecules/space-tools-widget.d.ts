import * as React from 'react';
export interface SpaceTool {
    id: string;
    name: string;
    icon?: string;
    type: string;
    closeTime?: string;
    isActive: boolean;
    responseCount?: number;
}
export interface SpaceToolsWidgetData {
    spaceId: string;
    tools: SpaceTool[];
    hasMore: boolean;
}
export interface SpaceToolsWidgetCallbacks {
    onToolClick?: (toolId: string) => void;
    onViewAll?: (spaceId: string) => void;
}
export interface SpaceToolsWidgetProps extends SpaceToolsWidgetCallbacks, React.HTMLAttributes<HTMLDivElement> {
    data: SpaceToolsWidgetData;
    maxVisible?: number;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
export declare const SpaceToolsWidget: React.ForwardRefExoticComponent<SpaceToolsWidgetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-tools-widget.d.ts.map