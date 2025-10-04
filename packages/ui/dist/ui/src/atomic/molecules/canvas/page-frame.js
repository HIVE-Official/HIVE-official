/**
 * Page Frame Component
 *
 * Visual frame showing page boundaries on the infinite canvas.
 * Displays page name, type, and dimensions.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils';
import { Maximize2, Layout, Layers } from 'lucide-react';
export function PageFrame({ page, isCurrent = false, isHovered = false, zoom = 1, onClick, onDoubleClick, className, }) {
    // Page type icons and colors
    const pageTypeConfig = {
        default: {
            icon: Layout,
            color: 'hsl(210, 70%, 50%)',
            label: 'Page',
        },
        modal: {
            icon: Maximize2,
            color: 'hsl(280, 70%, 50%)',
            label: 'Modal',
        },
        drawer: {
            icon: Layers,
            color: 'hsl(160, 70%, 45%)',
            label: 'Drawer',
        },
    };
    const config = pageTypeConfig[page.type];
    const Icon = config.icon;
    // Calculate element count
    const elementCount = page.elements.length;
    // Show details at zoom > 0.5
    const showDetails = zoom > 0.5;
    return (_jsxs("div", { className: cn('absolute pointer-events-none', className), style: {
            left: page.x,
            top: page.y,
            width: page.width,
            height: page.height,
        }, children: [_jsx("div", { className: cn('absolute inset-0 rounded-lg border-2 transition-all', isCurrent && 'border-primary shadow-lg', !isCurrent && 'border-border', isHovered && !isCurrent && 'border-primary/50'), style: {
                    borderColor: isCurrent ? config.color : undefined,
                    boxShadow: isCurrent
                        ? `0 0 0 4px ${config.color}20, 0 10px 15px -3px rgb(0 0 0 / 0.1)`
                        : undefined,
                } }), _jsx("div", { className: "absolute inset-0 cursor-pointer pointer-events-auto", onClick: onClick, onDoubleClick: onDoubleClick }), showDetails && (_jsxs("div", { className: cn('absolute -top-8 left-0 flex items-center gap-2 px-3 py-1.5', 'bg-background/95 backdrop-blur-sm border rounded-md shadow-sm', 'pointer-events-auto'), style: {
                    borderColor: isCurrent ? config.color : undefined,
                }, children: [_jsx(Icon, { className: "h-4 w-4", style: { color: config.color } }), _jsx("span", { className: "text-sm font-semibold", children: page.name }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["(", elementCount, " element", elementCount === 1 ? '' : 's', ")"] })] })), showDetails && (_jsx("div", { className: cn('absolute -bottom-6 right-0 px-2 py-1', 'bg-background/90 border rounded text-xs', 'pointer-events-none'), style: {
                    color: config.color,
                    borderColor: config.color,
                }, children: config.label })), zoom > 1 && (_jsxs("div", { className: "absolute -bottom-6 left-0 text-xs text-muted-foreground pointer-events-none", children: [page.width, " \u00D7 ", page.height] })), _jsx("div", { className: "absolute inset-0 rounded-lg pointer-events-none", style: {
                    backgroundColor: isCurrent ? `${config.color}05` : 'transparent',
                } })] }));
}
PageFrame.displayName = 'PageFrame';
//# sourceMappingURL=page-frame.js.map