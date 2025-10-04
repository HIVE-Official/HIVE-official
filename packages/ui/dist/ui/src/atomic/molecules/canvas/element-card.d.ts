/**
 * Element Card Component
 *
 * Visual representation of an element on the canvas with ports.
 * Handles drag, selection, hover states, and port interactions.
 */
import React from 'react';
import type { Element } from '../../../types/hivelab.types';
export interface ElementCardProps {
    /** Element data */
    element: Element;
    /** Is this element selected */
    isSelected?: boolean;
    /** Is this element being dragged */
    isDragging?: boolean;
    /** Is this element hovered */
    isHovered?: boolean;
    /** Zoom level (affects rendering) */
    zoom?: number;
    /** Hovered port ID */
    hoveredPort?: string | null;
    /** Connection creation state */
    connectionState?: {
        isConnecting: boolean;
        compatiblePorts?: string[];
    };
    /** Drag handlers */
    onDragStart?: (e: React.MouseEvent) => void;
    onDrag?: (e: React.MouseEvent) => void;
    onDragEnd?: (e: React.MouseEvent) => void;
    /** Click handler */
    onClick?: (e: React.MouseEvent) => void;
    /** Double click handler (edit) */
    onDoubleClick?: (e: React.MouseEvent) => void;
    /** Port interaction handlers */
    onPortMouseDown?: (portId: string, e: React.MouseEvent) => void;
    onPortClick?: (portId: string) => void;
    onPortHover?: (portId: string | null) => void;
    /** Additional class names */
    className?: string;
}
export declare function ElementCard({ element, isSelected, isDragging, isHovered, zoom, hoveredPort, connectionState, onDragStart, onClick, onDoubleClick, onPortMouseDown, onPortClick, onPortHover, className, }: ElementCardProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ElementCard {
    var displayName: string;
}
//# sourceMappingURL=element-card.d.ts.map