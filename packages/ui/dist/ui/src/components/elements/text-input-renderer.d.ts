/**
 * HIVE TextInput Element Renderer
 * Renders interactive text input fields within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface TextInputConfig {
    label: string;
    placeholder?: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
    style?: any;
}
interface TextInputRendererProps {
    element: ElementInstance;
    config: TextInputConfig;
    value?: string;
    onChange?: (value: string) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const TextInputRenderer: React.FC<TextInputRendererProps>;
export {};
//# sourceMappingURL=text-input-renderer.d.ts.map