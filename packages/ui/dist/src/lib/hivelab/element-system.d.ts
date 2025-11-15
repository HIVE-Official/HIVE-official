export interface ElementProps {
    id: string;
    config: Record<string, any>;
    data?: any;
    onChange?: (data: any) => void;
    onAction?: (action: string, payload: any) => void;
}
export interface ElementDefinition {
    id: string;
    name: string;
    description: string;
    category: 'input' | 'display' | 'filter' | 'action' | 'layout';
    icon: string;
    configSchema: Record<string, any>;
    defaultConfig: Record<string, any>;
    render: (props: ElementProps) => JSX.Element;
}
export interface ToolComposition {
    id: string;
    name: string;
    description: string;
    elements: {
        elementId: string;
        instanceId: string;
        config: Record<string, any>;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
    }[];
    connections: {
        from: {
            instanceId: string;
            output: string;
        };
        to: {
            instanceId: string;
            input: string;
        };
    }[];
    layout: 'grid' | 'flow' | 'tabs' | 'sidebar';
}
export declare class ElementRegistry {
    private static instance;
    private elements;
    static getInstance(): ElementRegistry;
    registerElement(element: ElementDefinition): void;
    getElement(id: string): ElementDefinition | undefined;
    getElementsByCategory(category: string): ElementDefinition[];
    getAllElements(): ElementDefinition[];
}
export declare class ElementEngine {
    private compositions;
    private elementStates;
    executeComposition(composition: ToolComposition): void;
    private processDataFlow;
}
export declare const CORE_ELEMENTS: ElementDefinition[];
export declare const TOOL_TEMPLATES: ToolComposition[];
export declare function initializeElementSystem(): ElementRegistry;
//# sourceMappingURL=element-system.d.ts.map