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
    /** Panel icon */
    icon?: React.ReactNode;
    /** Panel content */
    children: React.ReactNode;
    /** Panel position (renamed from initialPosition for consistency) */
    position?: 'left' | 'right' | 'top' | 'bottom';
    /** Initial position (deprecated, use position) */
    initialPosition?: 'left' | 'right' | 'top' | 'bottom';
    /** Panel width (renamed from initialWidth for consistency) */
    width?: number;
    /** Initial width (deprecated, use width) */
    initialWidth?: number;
    /** Panel height (renamed from initialHeight for consistency) */
    height?: number;
    /** Initial height (deprecated, use height) */
    initialHeight?: number;
    /** Is panel collapsed? */
    isCollapsed?: boolean;
    /** Can the panel be closed? */
    closable?: boolean;
    /** Can the panel be collapsed? */
    collapsible?: boolean;
    /** Can the panel be dragged? */
    draggable?: boolean;
    /** Can the panel be resized? */
    resizable?: boolean;
    /** Initially collapsed? (deprecated, use isCollapsed) */
    defaultCollapsed?: boolean;
    /** Close handler */
    onClose?: () => void;
    /** Toggle collapse handler */
    onToggleCollapse?: () => void;
    /** Collapse state change handler */
    onCollapseChange?: (collapsed: boolean) => void;
    /** Additional class names */
    className?: string;
}
export declare function FloatingPanel({ title, icon, children, position: propPosition, initialPosition, width: propWidth, initialWidth, height: propHeight, initialHeight, isCollapsed: controlledIsCollapsed, closable, collapsible, draggable, resizable, defaultCollapsed, onClose, onToggleCollapse, onCollapseChange, className, }: FloatingPanelProps): import("react/jsx-runtime").JSX.Element;
export declare namespace FloatingPanel {
    var displayName: string;
}
//# sourceMappingURL=floating-panel.d.ts.map