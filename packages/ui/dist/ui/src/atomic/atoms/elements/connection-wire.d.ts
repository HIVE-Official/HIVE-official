/**
 * Connection Wire Component
 *
 * Renders a Bézier curve connection between two ports.
 * Supports hover states, selection, and animated data flow.
 */
import React from 'react';
export interface ConnectionWireProps {
    /** SVG path string (Bézier curve) */
    path: string;
    /** Wire color (based on data type) */
    color?: string;
    /** Is this wire selected */
    isSelected?: boolean;
    /** Is this wire hovered */
    isHovered?: boolean;
    /** Show animated data flow */
    animated?: boolean;
    /** Wire thickness */
    strokeWidth?: number;
    /** Click handler */
    onClick?: (e: React.MouseEvent) => void;
    /** Mouse enter handler */
    onMouseEnter?: () => void;
    /** Mouse leave handler */
    onMouseLeave?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function ConnectionWire({ path, color, isSelected, isHovered, animated, strokeWidth, onClick, onMouseEnter, onMouseLeave, className, }: ConnectionWireProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ConnectionWire {
    var displayName: string;
}
//# sourceMappingURL=connection-wire.d.ts.map