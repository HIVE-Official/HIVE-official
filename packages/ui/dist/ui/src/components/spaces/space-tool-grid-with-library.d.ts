import React from 'react';
interface ToolInstallation {
    id: string;
    elementId: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    category: string;
    author: string;
    isActive: boolean;
    isPinned: boolean;
    usageCount: number;
    lastUsed: Date;
    configuration: Record<string, any>;
    permissions: {
        canEdit: boolean;
        canDelete: boolean;
        canShare: boolean;
    };
}
interface SpaceToolGridWithLibraryProps {
    space: any;
    tools?: ToolInstallation[];
    onToolLaunch?: (toolId: string) => void;
    onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
    onToolConfigure?: (toolId: string) => void;
    onToolRemove?: (toolId: string) => void;
    variant?: 'grid' | 'list';
    showPlantButton?: boolean;
    className?: string;
}
export declare function SpaceToolGridWithLibrary({ space, tools, onToolLaunch, onToolInstall, onToolConfigure, onToolRemove, variant, showPlantButton, className }: SpaceToolGridWithLibraryProps): import("react/jsx-runtime").JSX.Element;
export default SpaceToolGridWithLibrary;
//# sourceMappingURL=space-tool-grid-with-library.d.ts.map