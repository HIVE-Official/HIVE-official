/**
 * Floating Panel Component
 *
 * Draggable, collapsible, dockable panel for HiveLab builder.
 * Used for element library, properties, layers, and other tool panels.
 */
import React from 'react';
export interface FloatingPanelProps {
    /** Panel title */
    title: string;
    /** Panel content */
    children: React.ReactNode;
    /** Initial position */
    initialPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** Initial width (for left/right panels) */
    initialWidth?: number;
    /** Initial height (for top/bottom panels) */
    initialHeight?: number;
    /** Can the panel be closed? */
    closable?: boolean;
    /** Can the panel be collapsed? */
    collapsible?: boolean;
    /** Can the panel be dragged? */
    draggable?: boolean;
    /** Can the panel be resized? */
    resizable?: boolean;
    /** Initially collapsed? */
    defaultCollapsed?: boolean;
    /** Close handler */
    onClose?: () => void;
    /** Collapse state change handler */
    onCollapseChange?: (collapsed: boolean) => void;
    /** Additional class names */
    className?: string;
}
export declare function FloatingPanel({ title, children, initialPosition, initialWidth, initialHeight, closable, collapsible, draggable, resizable, defaultCollapsed, onClose, onCollapseChange, className, }: FloatingPanelProps): import("react/jsx-runtime").JSX.Element;
export declare namespace FloatingPanel {
    var displayName: string;
}
//# sourceMappingURL=floating-panel.d.ts.map