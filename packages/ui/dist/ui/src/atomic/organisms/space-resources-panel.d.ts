import * as React from "react";
export interface SpaceResource {
    id: string;
    title: string;
    description?: string;
    url: string;
    type: "link" | "document" | "video" | "github" | "other";
    addedBy?: {
        name: string;
        handle: string;
        avatar?: string;
    };
    addedAt: Date;
    isPinned?: boolean;
    clicks?: number;
}
export interface SpaceResourcesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** List of resources */
    resources?: SpaceResource[];
    /** Add resource handler */
    onAddResource?: () => void;
    /** Resource click handler */
    onResourceClick?: (resource: SpaceResource) => void;
    /** Remove resource handler */
    onRemoveResource?: (resourceId: string) => void;
    /** Whether user can add resources */
    canAddResources?: boolean;
    /** Show add button even when resources exist */
    alwaysShowAddButton?: boolean;
    /** Loading state */
    isLoading?: boolean;
    /** Empty state message */
    emptyStateMessage?: string;
}
declare const SpaceResourcesPanel: React.ForwardRefExoticComponent<SpaceResourcesPanelProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceResourcesPanel };
//# sourceMappingURL=space-resources-panel.d.ts.map