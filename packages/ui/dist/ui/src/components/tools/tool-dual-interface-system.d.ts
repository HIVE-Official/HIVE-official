interface ToolDualInterfaceProps {
    toolId: string;
    toolName: string;
    toolDescription: string;
    isLeaderView?: boolean;
    isActive?: boolean;
    onToggleInterface?: (isLeaderView: boolean) => void;
    onToggleActive?: () => void;
    onConfigureInterface?: () => void;
    onConfigureSurface?: () => void;
    className?: string;
}
export declare function ToolDualInterfaceSystem({ toolId, toolName, toolDescription, isLeaderView, isActive, onToggleInterface, onToggleActive, onConfigureInterface, onConfigureSurface, className }: ToolDualInterfaceProps): import("react/jsx-runtime").JSX.Element;
export default ToolDualInterfaceSystem;
//# sourceMappingURL=tool-dual-interface-system.d.ts.map