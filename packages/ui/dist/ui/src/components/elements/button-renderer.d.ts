/**
 * HIVE Button Element Renderer
 * Renders interactive buttons within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface ButtonConfig {
    text: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    onClick?: {
        type: 'navigate' | 'submit' | 'reset' | 'custom';
        target?: string;
        data?: Record<string, any>;
    };
    disabled?: boolean;
    style?: any;
}
interface ButtonRendererProps {
    element: ElementInstance;
    config: ButtonConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const ButtonRenderer: React.FC<ButtonRendererProps>;
export {};
//# sourceMappingURL=button-renderer.d.ts.map