/**
 * HIVE ImageBlock Element Renderer
 * Renders images within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface ImageBlockConfig {
    src: string;
    alt: string;
    caption?: string;
    style?: any;
}
interface ImageBlockRendererProps {
    element: ElementInstance;
    config: ImageBlockConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const ImageBlockRenderer: React.FC<ImageBlockRendererProps>;
export {};
//# sourceMappingURL=image-block-renderer.d.ts.map