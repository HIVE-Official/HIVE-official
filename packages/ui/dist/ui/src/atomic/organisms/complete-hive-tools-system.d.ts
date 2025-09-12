import React from 'react';
interface ToolElement {
    id: string;
    type: 'input' | 'button' | 'text' | 'image' | 'container' | 'link';
    label: string;
    properties: Record<string, unknown>;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style?: Record<string, unknown>;
    events?: Array<{
        trigger: string;
        action: string;
        target?: string;
        data?: any;
    }>;
}
interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    type: 'template' | 'custom' | 'installed';
    icon: React.ComponentType<any>;
    color: string;
    downloads: number;
    rating: number;
    ratingCount: number;
    creator: string;
    creatorType: 'student' | 'faculty' | 'community' | 'verified';
    tags: string[];
    version: string;
    isInstalled?: boolean;
    isFavorite?: boolean;
    lastUsed?: string;
    elements?: ToolElement[];
    config?: Record<string, unknown>;
}
interface CompleteHIVEToolsSystemProps {
    tools: Tool[];
    personalTools?: Tool[];
    onToolInstall?: (toolId: string) => void;
    onToolCreate?: (tool: Partial<Tool>) => void;
    onToolUpdate?: (toolId: string, updates: Partial<Tool>) => void;
    onToolDelete?: (toolId: string) => void;
    className?: string;
}
export declare function CompleteHIVEToolsSystem({ tools, personalTools, onToolInstall, onToolCreate, onToolUpdate, onToolDelete, className }: CompleteHIVEToolsSystemProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=complete-hive-tools-system.d.ts.map