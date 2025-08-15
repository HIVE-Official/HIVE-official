import React from 'react';
interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    status: 'draft' | 'published' | 'featured' | 'deprecated';
    usageCount?: number;
    likes?: number;
    createdAt: string;
    updatedAt?: string;
    author?: {
        name: string;
        handle: string;
        avatar?: string;
    };
    tags?: string[];
    isPublic?: boolean;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    timeToComplete?: string;
    version?: string;
}
interface ToolDetailsWidgetProps {
    tool: Tool;
    isOwnTool?: boolean;
    onRun?: (toolId: string) => void;
    onEdit?: (toolId: string) => void;
    onShare?: (toolId: string) => void;
    onFavorite?: (toolId: string) => void;
    onViewAnalytics?: (toolId: string) => void;
    onDownload?: (toolId: string) => void;
}
export declare const ToolDetailsWidget: React.FC<ToolDetailsWidgetProps>;
export default ToolDetailsWidget;
//# sourceMappingURL=tool-details-widget.d.ts.map