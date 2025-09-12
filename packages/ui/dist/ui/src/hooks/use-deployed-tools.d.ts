export interface DeployedTool {
    id: string;
    deploymentId: string;
    toolId: string;
    name: string;
    description: string;
    type: string;
    surface: string;
    createdBy: string;
    deployedBy: string;
    deployedAt: string;
    usageCount: number;
    lastUsed: Date | null;
    permissions: {
        canInteract: boolean;
        canView: boolean;
        canEdit: boolean;
        allowedRoles?: string[];
    };
    settings: {
        showInDirectory: boolean;
        allowSharing: boolean;
        collectAnalytics: boolean;
        notifyOnInteraction: boolean;
    };
    position: number;
    toolData: {
        elements: unknown[];
        currentVersion: string;
        status: string;
    };
}
export interface DeployedToolsResponse {
    summary: {
        availableTools: number;
        recentlyUsed: number;
        totalUsage: number;
    };
    available: DeployedTool[];
}
export declare function useDeployedTools(spaceId: string | null): {
    tools: DeployedTool[];
    loading: boolean;
    error: string | null;
};
//# sourceMappingURL=use-deployed-tools.d.ts.map