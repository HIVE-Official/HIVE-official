/**
 * HIVE Stack Element Renderer
 * Renders layout containers for organizing other elements
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance, Tool } from '@hive/core';
interface StackConfig {
    direction?: 'vertical' | 'horizontal';
    spacing?: number;
    alignment?: 'start' | 'center' | 'end' | 'stretch';
    wrap?: boolean;
    style?: any;
}
interface StackRendererProps {
    element: ElementInstance;
    config: StackConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
    tool?: Tool;
    renderElement?: (element: ElementInstance) => React.ReactNode;
}
export declare const StackRenderer: React.FC<StackRendererProps>;
export {};
//# sourceMappingURL=stack-renderer.d.ts.map