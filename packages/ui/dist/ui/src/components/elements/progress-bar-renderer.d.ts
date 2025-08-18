/**
 * HIVE ProgressBar Element Renderer
 * Renders progress indicators within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface ProgressBarConfig {
    label?: string;
    value?: number;
    max?: number;
    showPercentage?: boolean;
    color?: string;
    backgroundColor?: string;
    height?: number;
    style?: any;
}
interface ProgressBarRendererProps {
    element: ElementInstance;
    config: ProgressBarConfig;
    value?: number;
    onChange?: (value: number) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const ProgressBarRenderer: React.FC<ProgressBarRendererProps>;
export {};
//# sourceMappingURL=progress-bar-renderer.d.ts.map