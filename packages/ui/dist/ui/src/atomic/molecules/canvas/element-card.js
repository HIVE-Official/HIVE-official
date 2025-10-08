/**
 * Element Card Component
 *
 * Visual representation of an element on the canvas with ports.
 * Handles drag, selection, hover states, and port interactions.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from '../../../lib/utils.js';
import { Port } from '../../atoms/elements/port.js';
import { DataTypeBadge } from '../../atoms/elements/data-type-badge.js';
import { GripVertical } from 'lucide-react';
export function ElementCard({ element, isSelected = false, isDragging = false, isHovered = false, zoom = 1, hoveredPort = null, connectionState, onDragStart, onClick, onDoubleClick, onPortMouseDown, onPortClick, onPortHover, className, }) {
    // Get category color
    const categoryColors = {
        trigger: 'hsl(0, 70%, 50%)',
        collector: 'hsl(210, 70%, 50%)',
        transformer: 'hsl(280, 70%, 50%)',
        router: 'hsl(40, 70%, 50%)',
        storage: 'hsl(120, 70%, 40%)',
        display: 'hsl(180, 70%, 45%)',
        action: 'hsl(320, 70%, 50%)',
        connector: 'hsl(260, 70%, 50%)',
    };
    const categoryColor = categoryColors[element.type] || 'hsl(var(--muted))';
    // Check if element is new
    const isNew = element.isNew ?? false;
    return (_jsxs("div", { className: cn('absolute rounded-lg bg-background border-2 shadow-md transition-all duration-200', 'hover:shadow-lg', isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background', isDragging && 'opacity-60 cursor-grabbing', !isDragging && 'cursor-pointer', className), style: {
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            borderColor: isSelected ? 'hsl(var(--primary))' : categoryColor,
        }, onClick: onClick, onDoubleClick: onDoubleClick, children: [_jsxs("div", { className: "px-3 py-2 border-b flex items-center justify-between cursor-grab active:cursor-grabbing", style: { borderColor: categoryColor }, onMouseDown: onDragStart, children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [_jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }), _jsx("span", { className: "text-lg flex-shrink-0", children: element.icon }), _jsx("span", { className: "text-sm font-semibold truncate", children: element.name }), isNew && (_jsx("span", { className: "text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full", children: "New" }))] }), _jsx(DataTypeBadge, { type: element.outputs[0]?.type || 'any', size: "sm", variant: "subtle", showLabel: false })] }), _jsxs("div", { className: "relative h-full pb-10", children: [_jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4", children: element.inputs.map((port) => (_jsx("div", { children: _jsx(Port, { port: port, isHovered: hoveredPort === port.id, isCompatible: connectionState?.compatiblePorts?.includes(port.id), isConnecting: connectionState?.isConnecting, isConnected: false, onMouseDown: (e) => onPortMouseDown?.(port.id, e), onClick: () => onPortClick?.(port.id), onMouseEnter: () => onPortHover?.(port.id), onMouseLeave: () => onPortHover?.(null), showLabel: zoom > 0.75 }) }, port.id))) }), _jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 space-y-4", children: element.outputs.map((port) => (_jsx("div", { children: _jsx(Port, { port: port, isHovered: hoveredPort === port.id, isCompatible: connectionState?.compatiblePorts?.includes(port.id), isConnecting: connectionState?.isConnecting, isConnected: false, onMouseDown: (e) => onPortMouseDown?.(port.id, e), onClick: () => onPortClick?.(port.id), onMouseEnter: () => onPortHover?.(port.id), onMouseLeave: () => onPortHover?.(null), showLabel: zoom > 0.75 }) }, port.id))) }), zoom > 1 && element.description && (_jsx("div", { className: "px-3 py-2", children: _jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: element.description }) })), Object.keys(element.config).length > 0 && (_jsxs("div", { className: "absolute bottom-2 left-3 text-xs text-muted-foreground", children: [Object.keys(element.config).length, " config", Object.keys(element.config).length === 1 ? '' : 's'] }))] }), isSelected && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-primary" })] })), isHovered && !isSelected && (_jsx("div", { className: "absolute inset-0 rounded-lg pointer-events-none", style: {
                    boxShadow: `0 0 0 2px ${categoryColor}40`,
                } }))] }));
}
ElementCard.displayName = 'ElementCard';
//# sourceMappingURL=element-card.js.map