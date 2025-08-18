/**
 * HIVE RatingStars Element Renderer
 * Renders star rating inputs within tools
 * Uses standard style system for consistent output
 */
import React from 'react';
import { ElementInstance } from '@hive/core';
interface RatingStarsConfig {
    label: string;
    maxRating?: number;
    allowHalf?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    required?: boolean;
    disabled?: boolean;
    style?: any;
}
interface RatingStarsRendererProps {
    element: ElementInstance;
    config: RatingStarsConfig;
    value?: number;
    onChange?: (value: number) => void;
    onStateChange?: (state: any) => void;
    readOnly?: boolean;
    runtimeContext?: {
        formData: Record<string, any>;
        elementStates: Map<string, any>;
    };
}
export declare const RatingStarsRenderer: React.FC<RatingStarsRendererProps>;
export {};
//# sourceMappingURL=rating-stars-renderer.d.ts.map