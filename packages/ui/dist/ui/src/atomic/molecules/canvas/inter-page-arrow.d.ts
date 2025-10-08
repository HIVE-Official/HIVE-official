/**
 * Inter-Page Arrow Component
 *
 * Visual indicator for navigation connections between pages in multi-page tools.
 * Shows connections from router elements to target pages on the canvas.
 */
import React from 'react';
export interface InterPageArrowProps {
    /** Source page position and size */
    sourcePage: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** Target page position and size */
    targetPage: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** Source page name */
    sourceName: string;
    /** Target page name */
    targetName: string;
    /** Router element that creates this navigation */
    routerElement?: {
        id: string;
        name: string;
    };
    /** Is this arrow selected */
    isSelected?: boolean;
    /** Is this arrow being hovered */
    isHovered?: boolean;
    /** Arrow color (default: primary) */
    color?: string;
    /** Click handler */
    onClick?: (e: React.MouseEvent) => void;
    /** Additional class names */
    className?: string;
}
export declare function InterPageArrow({ sourcePage, targetPage, sourceName, targetName, routerElement, isSelected, isHovered, color, onClick, className, }: InterPageArrowProps): import("react/jsx-runtime").JSX.Element;
export declare namespace InterPageArrow {
    var displayName: string;
}
//# sourceMappingURL=inter-page-arrow.d.ts.map