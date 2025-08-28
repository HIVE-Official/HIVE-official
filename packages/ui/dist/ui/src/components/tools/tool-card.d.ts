/**
 * ToolCard - Purpose-built for UB student tools
 *
 * Shows what students want to know about tools:
 * 1. What does this tool do? (name, purpose)
 * 2. Who built it and where? (creator, space context)
 * 3. How do I use/get it? (install, run, share)
 */
export interface Tool {
    id: string;
    name: string;
    description: string;
    category: 'academic' | 'productivity' | 'social' | 'utility';
    creator: {
        id: string;
        name: string;
        avatar?: string;
    };
    space?: {
        id: string;
        name: string;
    };
    usageCount: number;
    isInstalled?: boolean;
    isFavorite?: boolean;
    createdAt: string;
    lastUsed?: string;
}
export interface ToolCardProps {
    tool: Tool;
    currentUserId?: string;
    showCreator?: boolean;
    showSpace?: boolean;
    showUsage?: boolean;
    onInstall?: (toolId: string) => void;
    onRun?: (toolId: string) => void;
    onShare?: (toolId: string) => void;
    onFavorite?: (toolId: string) => void;
    onView?: (toolId: string) => void;
    className?: string;
}
export declare function ToolCard({ tool, currentUserId, showCreator, showSpace, showUsage, onInstall, onRun, onShare, onFavorite, onView, className }: ToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function ToolCardCompact({ tool, onInstall, onRun, className }: ToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function ToolCardSkeleton(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tool-card.d.ts.map