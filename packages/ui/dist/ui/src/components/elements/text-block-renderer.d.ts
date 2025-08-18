/**
 * HIVE TextBlock Element Renderer
 * Renders static text content within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface TextBlockConfig {
    text: string;
    style?: any;
}
interface TextBlockRendererProps {
    element: ElementInstance;
    config: TextBlockConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const TextBlockRenderer: React.FC<TextBlockRendererProps>;
export {};
//# sourceMappingURL=text-block-renderer.d.ts.map