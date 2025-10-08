/**
 * Selection Box Component
 *
 * Visual rectangle shown during multi-select drag operation.
 * Updates in real-time as the user drags to select multiple elements.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils.js';
export function SelectionBox({ start, current, className }) {
    // Calculate box dimensions
    const x = Math.min(start.x, current.x);
    const y = Math.min(start.y, current.y);
    const width = Math.abs(current.x - start.x);
    const height = Math.abs(current.y - start.y);
    return (_jsxs("div", { className: cn('absolute pointer-events-none', 'border-2 border-primary/60 bg-primary/10', 'rounded-sm', className), style: {
            left: x,
            top: y,
            width,
            height,
        }, children: [_jsx("div", { className: "absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-primary" }), width > 50 && height > 30 && (_jsxs("div", { className: "absolute -top-6 left-0 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded", children: [Math.round(width), " \u00D7 ", Math.round(height)] }))] }));
}
SelectionBox.displayName = 'SelectionBox';
//# sourceMappingURL=selection-box.js.map