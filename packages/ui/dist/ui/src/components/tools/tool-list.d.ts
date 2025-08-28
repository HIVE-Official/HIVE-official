/**
 * ToolList - Simple, purpose-built tool browsing
 *
 * Replaces the AI "CompleteHIVEToolsSystem" with focused components.
 * Students just want to find, install, and use tools - that's it.
 */
import { Tool } from './tool-card';
export interface ToolListProps {
    tools: Tool[];
    loading?: boolean;
    currentUserId?: string;
    onInstallTool?: (toolId: string) => void;
    onRunTool?: (toolId: string) => void;
    onShareTool?: (toolId: string) => void;
    onFavoriteTool?: (toolId: string) => void;
    onViewTool?: (toolId: string) => void;
    showSearch?: boolean;
    showViewToggle?: boolean;
    className?: string;
}
export declare function ToolList({ tools, loading, currentUserId, onInstallTool, onRunTool, onShareTool, onFavoriteTool, onViewTool, showSearch, showViewToggle, className }: ToolListProps): import("react/jsx-runtime").JSX.Element;
export declare function ToolQuickList({ title, tools, onViewAll, ...props }: ToolListProps & {
    title: string;
    onViewAll?: () => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tool-list.d.ts.map