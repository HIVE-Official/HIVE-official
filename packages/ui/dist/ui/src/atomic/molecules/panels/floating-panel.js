/**
 * Floating Panel Component
 *
 * Draggable, collapsible, dockable panel for HiveLab builder.
 * Used for element library, properties, layers, and other tool panels.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/button';
import { ChevronDown, ChevronUp, GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';
export function FloatingPanel({ title, icon, children, position: propPosition, initialPosition, width: propWidth, initialWidth, height: propHeight, initialHeight, isCollapsed: controlledIsCollapsed, closable = true, collapsible = true, draggable = false, resizable = true, defaultCollapsed = false, onClose, onToggleCollapse, onCollapseChange, className, }) {
    // Support both new and deprecated prop names
    const position = propPosition ?? initialPosition ?? 'left';
    const width = propWidth ?? initialWidth ?? 320;
    const height = propHeight ?? initialHeight ?? 400;
    const [internalIsCollapsed, setInternalIsCollapsed] = useState(defaultCollapsed);
    const [isMaximized, setIsMaximized] = useState(false);
    // Use controlled or uncontrolled collapsed state
    const isCollapsed = controlledIsCollapsed ?? internalIsCollapsed;
    const handleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setInternalIsCollapsed(newCollapsed);
        onToggleCollapse?.();
        onCollapseChange?.(newCollapsed);
    };
    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };
    const isVertical = position === 'left' || position === 'right';
    return (_jsxs("div", { className: cn('floating-panel flex flex-col', 'bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg', 'transition-all duration-200', isCollapsed && 'h-auto', isMaximized && 'fixed inset-4 z-50', className), style: {
            width: isVertical && !isMaximized ? width : undefined,
            height: !isVertical && !isMaximized && !isCollapsed ? height : undefined,
        }, children: [_jsxs("div", { className: cn('flex items-center gap-2 px-4 py-3 border-b', draggable && 'cursor-move'), children: [draggable && (_jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })), icon && (_jsx("div", { className: "flex-shrink-0 text-muted-foreground", children: icon })), _jsx("h3", { className: "text-sm font-semibold flex-1 truncate", children: title }), _jsxs("div", { className: "flex items-center gap-1", children: [collapsible && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleCollapse, className: "h-6 w-6 p-0", children: isCollapsed ? (_jsx(ChevronDown, { className: "h-3.5 w-3.5" })) : (_jsx(ChevronUp, { className: "h-3.5 w-3.5" })) })), resizable && !isMaximized && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleMaximize, className: "h-6 w-6 p-0", children: _jsx(Maximize2, { className: "h-3.5 w-3.5" }) })), resizable && isMaximized && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleMaximize, className: "h-6 w-6 p-0", children: _jsx(Minimize2, { className: "h-3.5 w-3.5" }) })), closable && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "h-6 w-6 p-0", children: _jsx(X, { className: "h-3.5 w-3.5" }) }))] })] }), !isCollapsed && (_jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden", children: children })), resizable && !isCollapsed && !isMaximized && (_jsx("div", { className: cn('absolute bg-primary/10 hover:bg-primary/20 transition-colors', isVertical
                    ? 'right-0 top-0 bottom-0 w-1 cursor-ew-resize'
                    : 'left-0 right-0 bottom-0 h-1 cursor-ns-resize') }))] }));
}
FloatingPanel.displayName = 'FloatingPanel';
//# sourceMappingURL=floating-panel.js.map