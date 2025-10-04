/**
 * Element Library Item Component
 *
 * Draggable element card in the library panel.
 * Represents an element type that can be dragged onto the canvas.
 */
import React from 'react';
import type { ElementDefinition } from '@/types/hivelab.types';
export interface ElementLibraryItemProps {
    /** Element definition */
    element: ElementDefinition;
    /** Is this item being dragged? */
    isDragging?: boolean;
    /** Drag start handler */
    onDragStart?: (e: React.DragEvent, element: ElementDefinition) => void;
    /** Drag end handler */
    onDragEnd?: (e: React.DragEvent) => void;
    /** Click handler */
    onClick?: (element: ElementDefinition) => void;
    /** Additional class names */
    className?: string;
}
export declare function ElementLibraryItem({ element, isDragging, onDragStart, onDragEnd, onClick, className, }: ElementLibraryItemProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ElementLibraryItem {
    var displayName: string;
}
//# sourceMappingURL=element-library-item.d.ts.map