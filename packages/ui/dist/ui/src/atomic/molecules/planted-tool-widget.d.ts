import React from 'react';
export interface PlantedTool {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'productivity' | 'social' | 'academic' | 'coordination';
    version: string;
    status: 'active' | 'configured' | 'needs_setup' | 'error' | 'disabled';
    lastUsed?: string;
    usageCount?: number;
    errorMessage?: string;
    outputs?: number;
    interactions?: number;
    isConfigured: boolean;
    hasRequiredSettings?: boolean;
    configurationUrl?: string;
    canConfigure?: boolean;
    canRemove?: boolean;
    canView?: boolean;
}
export interface PlantedToolWidgetProps {
    tool: PlantedTool;
    variant?: 'default' | 'compact' | 'detailed';
    onConfigure?: (toolId: string) => void;
    onRemove?: (toolId: string) => void;
    onToggleStatus?: (toolId: string, active: boolean) => void;
    onViewDetails?: (toolId: string) => void;
    onViewOutputs?: (toolId: string) => void;
    showStats?: boolean;
    showActions?: boolean;
    className?: string;
}
export declare const PlantedToolWidget: React.FC<PlantedToolWidgetProps>;
export default PlantedToolWidget;
//# sourceMappingURL=planted-tool-widget.d.ts.map