/**
 * Connection Wire Component
 *
 * Renders a Bézier curve connection between two ports.
 * Supports hover states, selection, and animated data flow.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../../lib/utils.js';
export function ConnectionWire({ path, color = 'hsl(var(--muted-foreground))', isSelected = false, isHovered = false, animated = false, strokeWidth = 2, onClick, onMouseEnter, onMouseLeave, className, }) {
    const wireId = React.useId();
    // Adjust stroke width based on state
    const effectiveStrokeWidth = isSelected || isHovered ? strokeWidth + 1 : strokeWidth;
    return (_jsxs("g", { className: cn('connection-wire', className), children: [_jsx("path", { d: path, fill: "none", stroke: "transparent", strokeWidth: effectiveStrokeWidth + 8, className: "cursor-pointer", onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }), isSelected && (_jsx("path", { d: path, fill: "none", stroke: color, strokeWidth: effectiveStrokeWidth + 4, opacity: 0.3, className: "blur-sm" })), _jsx("path", { d: path, fill: "none", stroke: color, strokeWidth: effectiveStrokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className: cn('transition-all duration-200', isHovered && 'drop-shadow-lg'), opacity: isHovered ? 1 : 0.8, markerEnd: `url(#arrow-${wireId})` }), animated && (_jsx("path", { d: path, fill: "none", stroke: color, strokeWidth: effectiveStrokeWidth, strokeLinecap: "round", strokeDasharray: "5 10", className: "animate-dash", opacity: 0.6 })), _jsx("defs", { children: _jsx("marker", { id: `arrow-${wireId}`, markerWidth: "10", markerHeight: "10", refX: "8", refY: "3", orient: "auto", markerUnits: "strokeWidth", children: _jsx("path", { d: "M0,0 L0,6 L9,3 z", fill: color, opacity: isHovered ? 1 : 0.8 }) }) })] }));
}
ConnectionWire.displayName = 'ConnectionWire';
// Animation for dashed line
const dashAnimation = `
  @keyframes dash {
    to {
      stroke-dashoffset: -15;
    }
  }

  .animate-dash {
    animation: dash 1s linear infinite;
  }
`;
// Inject animation styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = dashAnimation;
    if (!document.querySelector('style[data-connection-wire-animation]')) {
        style.setAttribute('data-connection-wire-animation', 'true');
        document.head.appendChild(style);
    }
}
//# sourceMappingURL=connection-wire.js.map