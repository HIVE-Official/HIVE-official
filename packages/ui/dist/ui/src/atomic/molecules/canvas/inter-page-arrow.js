/**
 * Inter-Page Arrow Component
 *
 * Visual indicator for navigation connections between pages in multi-page tools.
 * Shows connections from router elements to target pages on the canvas.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils';
import { ExternalLink } from 'lucide-react';
export function InterPageArrow({ sourcePage, targetPage, sourceName, targetName, routerElement, isSelected = false, isHovered = false, color = 'hsl(var(--primary))', onClick, className, }) {
    // Calculate start and end points (center of page edges)
    const sourceCenter = {
        x: sourcePage.x + sourcePage.width / 2,
        y: sourcePage.y + sourcePage.height / 2,
    };
    const targetCenter = {
        x: targetPage.x + targetPage.width / 2,
        y: targetPage.y + targetPage.height / 2,
    };
    // Determine which edges to connect based on relative positions
    const dx = targetCenter.x - sourceCenter.x;
    const dy = targetCenter.y - sourceCenter.y;
    let start;
    let end;
    // Horizontal connection (left-to-right or right-to-left)
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            // Source right edge → Target left edge
            start = { x: sourcePage.x + sourcePage.width, y: sourceCenter.y };
            end = { x: targetPage.x, y: targetCenter.y };
        }
        else {
            // Source left edge → Target right edge
            start = { x: sourcePage.x, y: sourceCenter.y };
            end = { x: targetPage.x + targetPage.width, y: targetCenter.y };
        }
    }
    else {
        // Vertical connection (top-to-bottom or bottom-to-top)
        if (dy > 0) {
            // Source bottom edge → Target top edge
            start = { x: sourceCenter.x, y: sourcePage.y + sourcePage.height };
            end = { x: targetCenter.x, y: targetPage.y };
        }
        else {
            // Source top edge → Target bottom edge
            start = { x: sourceCenter.x, y: sourcePage.y };
            end = { x: targetCenter.x, y: targetPage.y + targetPage.height };
        }
    }
    // Calculate label position (midpoint)
    const labelX = (start.x + end.x) / 2;
    const labelY = (start.y + end.y) / 2;
    // Calculate arrow angle for rotation
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
    return (_jsxs("g", { className: cn('inter-page-arrow', className), children: [_jsx("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y, stroke: "transparent", strokeWidth: 20, className: "cursor-pointer", onClick: onClick }), _jsx("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y, stroke: color, strokeWidth: isSelected ? 3 : isHovered ? 2.5 : 2, strokeDasharray: "8 4", className: cn('transition-all', isHovered && 'opacity-80'), opacity: isSelected ? 1 : 0.6 }), _jsx("polygon", { points: `0,0 -12,-6 -12,6`, fill: color, opacity: isSelected ? 1 : 0.6, transform: `translate(${end.x}, ${end.y}) rotate(${angle})`, className: "transition-all" }), _jsx("foreignObject", { x: labelX - 80, y: labelY - 16, width: 160, height: 32, className: "pointer-events-auto", onClick: onClick, children: _jsxs("div", { className: cn('flex items-center justify-center gap-1.5 h-full', 'bg-background/95 backdrop-blur-sm border rounded-md shadow-sm', 'px-2 py-1 cursor-pointer transition-all', isSelected && 'ring-2 ring-primary', isHovered && 'bg-background'), style: {
                        borderColor: isSelected ? color : undefined,
                    }, children: [_jsx(ExternalLink, { className: "h-3 w-3", style: { color } }), _jsx("span", { className: "text-xs font-medium truncate max-w-[120px]", children: targetName })] }) }), routerElement && (_jsx("foreignObject", { x: start.x - 40, y: start.y - 12, width: 80, height: 24, className: "pointer-events-none", children: _jsx("div", { className: "flex items-center justify-center h-full bg-background/80 border rounded text-xs px-1.5", children: _jsx("span", { className: "truncate", style: { color }, children: routerElement.name }) }) }))] }));
}
InterPageArrow.displayName = 'InterPageArrow';
//# sourceMappingURL=inter-page-arrow.js.map