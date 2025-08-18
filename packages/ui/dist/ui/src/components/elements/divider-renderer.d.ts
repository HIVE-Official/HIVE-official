/**
 * HIVE Divider Element Renderer
 * Renders visual dividers within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface DividerConfig {
    thickness?: number;
    color?: string;
    dividerStyle?: 'solid' | 'dashed' | 'dotted';
    style?: any;
}
interface DividerRendererProps {
    element: ElementInstance;
    config: DividerConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const DividerRenderer: React.FC<DividerRendererProps>;
export {};
//# sourceMappingURL=divider-renderer.d.ts.map