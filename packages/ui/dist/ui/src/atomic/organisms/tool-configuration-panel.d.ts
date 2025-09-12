import React from 'react';
export type ConfigFieldType = 'text' | 'password' | 'number' | 'email' | 'url' | 'textarea' | 'boolean' | 'select' | 'multiselect' | 'date' | 'time' | 'color' | 'file' | 'api_key' | 'webhook_url';
export interface ConfigField {
    id: string;
    name: string;
    type: ConfigFieldType;
    required: boolean;
    description?: string;
    placeholder?: string;
    defaultValue?: any;
    options?: Array<{
        value: string;
        label: string;
        description?: string;
    }>;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    sensitive?: boolean;
    group?: string;
}
export interface ToolConfigurationData {
    toolId: string;
    toolName: string;
    toolIcon: string;
    version: string;
    category: 'productivity' | 'social' | 'academic' | 'coordination';
    description: string;
    fields: ConfigField[];
    currentValues: Record<string, unknown>;
    permissions: {
        canConfigure: boolean;
        canView: boolean;
        canActivate: boolean;
        canRemove: boolean;
    };
    status: 'active' | 'configured' | 'needs_setup' | 'error' | 'disabled';
    isConfigured: boolean;
    lastConfigured?: string;
    configuredBy?: string;
    webhookUrl?: string;
    apiEndpoints?: Array<{
        name: string;
        url: string;
        method: string;
    }>;
    documentationUrl?: string;
    supportUrl?: string;
}
export interface ToolConfigurationPanelProps {
    tool: ToolConfigurationData;
    isOpen: boolean;
    onClose: () => void;
    onSave: (toolId: string, values: Record<string, unknown>) => Promise<void>;
    onActivate?: (toolId: string) => Promise<void>;
    onDeactivate?: (toolId: string) => Promise<void>;
    onReset?: (toolId: string) => Promise<void>;
    onRemove?: (toolId: string) => Promise<void>;
    onTestConfiguration?: (toolId: string, values: Record<string, unknown>) => Promise<{
        success: boolean;
        message: string;
    }>;
    isSaving?: boolean;
    className?: string;
}
export declare const ToolConfigurationPanel: React.FC<ToolConfigurationPanelProps>;
export default ToolConfigurationPanel;
//# sourceMappingURL=tool-configuration-panel.d.ts.map