import React from 'react';
export interface UBToolTemplate {
    id: string;
    name: string;
    description: string;
    category: 'coordination' | 'academic' | 'social' | 'campus-life';
    icon: React.ComponentType<any>;
    complexity: 'simple' | 'medium' | 'advanced';
    campusUseCase: string;
    expectedUsers: number;
    buildTime: string;
}
export declare const UB_TOOL_TEMPLATES: UBToolTemplate[];
interface SimpleToolBuilderProps {
    selectedTemplate?: UBToolTemplate;
    onTemplateSelect?: (template: UBToolTemplate) => void;
    onBuildTool?: (template: UBToolTemplate, config: ToolBuildConfig) => void;
    className?: string;
}
export interface ToolBuildConfig {
    toolName: string;
    description: string;
    targetSpace?: string;
    isPublic: boolean;
    settings: Record<string, any>;
}
export declare function SimpleToolBuilder({ selectedTemplate, onTemplateSelect, onBuildTool, className }: SimpleToolBuilderProps): import("react/jsx-runtime").JSX.Element;
interface ToolTemplateSelectionProps {
    templates: UBToolTemplate[];
    onSelectTemplate: (template: UBToolTemplate) => void;
}
export declare function ToolTemplateSelection({ templates, onSelectTemplate }: ToolTemplateSelectionProps): import("react/jsx-runtime").JSX.Element;
interface ToolConfigurationProps {
    template: UBToolTemplate;
    config: ToolBuildConfig;
    onConfigChange: (config: ToolBuildConfig) => void;
    onNext: () => void;
    onBack: () => void;
}
export declare function ToolConfiguration({ template, config, onConfigChange, onNext, onBack }: ToolConfigurationProps): import("react/jsx-runtime").JSX.Element;
interface ToolPreviewProps {
    template: UBToolTemplate;
    config: ToolBuildConfig;
    onBuild: () => void;
    onBack: () => void;
}
export declare function ToolPreview({ template, config, onBuild, onBack }: ToolPreviewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=simple-tool-builder.d.ts.map