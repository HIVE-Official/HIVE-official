export interface ToolDefinition {
    id: string;
    name: string;
    description: string;
    version: string;
    elements: ToolElement[];
    actions: ToolAction[];
    style?: ToolStyle;
    metadata: {
        createdBy: string;
        createdAt: string;
        category: string;
        tags: string[];
    };
}
export interface ToolElement {
    id: string;
    type: string;
    label?: string;
    properties: Record<string, any>;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    validation?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        pattern?: string;
    };
}
export interface ToolAction {
    id: string;
    trigger: string;
    type: 'save' | 'calculate' | 'submit' | 'redirect' | 'show_message' | 'update_element';
    config: Record<string, any>;
}
export interface ToolStyle {
    primaryColor?: string;
    backgroundColor?: string;
    borderRadius?: string;
    spacing?: 'compact' | 'normal' | 'relaxed';
}
interface ToolRuntimeEngineProps {
    tool: ToolDefinition;
    userId?: string;
    spaceId?: string;
    mode?: 'preview' | 'production';
    onSave?: (data: Record<string, any>) => Promise<void>;
    onSubmit?: (data: Record<string, any>) => Promise<void>;
    className?: string;
}
export declare function ToolRuntimeEngine({ tool, userId, spaceId, mode, onSave, onSubmit, className }: ToolRuntimeEngineProps): import("react/jsx-runtime").JSX.Element;
export declare function createSampleTool(): ToolDefinition;
export default ToolRuntimeEngine;
//# sourceMappingURL=tool-runtime-engine.d.ts.map