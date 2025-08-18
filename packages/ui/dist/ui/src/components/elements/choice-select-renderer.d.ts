/**
 * HIVE ChoiceSelect Element Renderer
 * Renders selection inputs (dropdown, radio, checkboxes) within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface ChoiceOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface ChoiceSelectConfig {
    label: string;
    options: ChoiceOption[];
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    style?: any;
}
interface ChoiceSelectRendererProps {
    element: ElementInstance;
    config: ChoiceSelectConfig;
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const ChoiceSelectRenderer: React.FC<ChoiceSelectRendererProps>;
export {};
//# sourceMappingURL=choice-select-renderer.d.ts.map