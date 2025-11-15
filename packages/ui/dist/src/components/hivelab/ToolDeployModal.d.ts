export type DeploymentTarget = {
    id: string;
    name: string;
    type: 'profile' | 'space';
    description?: string;
    permissions?: string[];
};
export type DeploymentConfig = {
    targetType: 'profile' | 'space';
    targetId: string;
    surface?: string;
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
};
export interface ToolDeployModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    toolName: string;
    availableTargets: DeploymentTarget[];
    onDeploy: (config: DeploymentConfig) => Promise<void> | void;
    initialConfig?: Partial<DeploymentConfig>;
}
export declare function ToolDeployModal({ open, onOpenChange, toolName, availableTargets, onDeploy, initialConfig }: ToolDeployModalProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ToolDeployModal {
    var displayName: string;
}
//# sourceMappingURL=ToolDeployModal.d.ts.map