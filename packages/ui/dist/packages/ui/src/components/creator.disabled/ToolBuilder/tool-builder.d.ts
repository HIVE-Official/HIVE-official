import React from "react";
import type { Tool, Element } from "@hive/core";
interface ToolBuilderProps {
    tool: Tool;
    elements: Element[];
    onSave: (tool: Tool) => Promise<void>;
    onPreview: (tool: Tool) => void;
    onPublish: (tool: Tool) => Promise<void>;
    onShare: (tool: Tool) => void;
    onDeploy?: (tool: Tool, deploymentOptions: DeploymentOptions) => Promise<void>;
    className?: string;
    mode?: "visual" | "template" | "wizard";
    onModeChange?: (mode: "visual" | "template" | "wizard") => void;
}
interface DeploymentOptions {
    deployTo: 'profile' | 'space';
    targetId: string;
    surface?: string;
    permissions?: {
        canInteract?: boolean;
        canView?: boolean;
        canEdit?: boolean;
        allowedRoles?: string[];
    };
    settings?: {
        showInDirectory?: boolean;
        allowSharing?: boolean;
        collectAnalytics?: boolean;
        notifyOnInteraction?: boolean;
    };
}
export declare const ToolBuilder: React.FC<ToolBuilderProps>;
export default ToolBuilder;
//# sourceMappingURL=tool-builder.d.ts.map