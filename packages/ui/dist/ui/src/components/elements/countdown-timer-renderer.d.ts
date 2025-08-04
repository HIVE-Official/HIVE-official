/**
 * HIVE CountdownTimer Element Renderer
 * Renders countdown timers within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface CountdownTimerConfig {
    label?: string;
    targetDate: string;
    format?: 'days' | 'hours' | 'minutes' | 'seconds' | 'dhms';
    onComplete?: {
        type: 'message' | 'redirect' | 'trigger';
        value: string;
    };
    style?: any;
}
interface CountdownTimerRendererProps {
    element: ElementInstance;
    config: CountdownTimerConfig;
    value?: any;
    onChange?: (value: any) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const CountdownTimerRenderer: React.FC<CountdownTimerRendererProps>;
export {};
//# sourceMappingURL=countdown-timer-renderer.d.ts.map