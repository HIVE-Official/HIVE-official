/**
 * Data Mapping Row Component
 *
 * Shows a single data mapping/connection between element ports.
 * Used in properties panel to visualize how data flows through elements.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { DATA_TYPE_COLORS } from '@/types/hivelab.types';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/atomic/atoms/button';
import { DataTypeBadge } from '@/atomic/atoms/elements/data-type-badge';
export function DataMappingRow({ port, sourcePort: propSourcePort, targetPort: propTargetPort, sourceElementName, isSelected = false, removable = true, onClick, onRemove, className, }) {
    // Support simplified usage with just 'port'
    const sourcePort = propSourcePort ?? port;
    const targetPort = propTargetPort ?? port;
    // Handle case where no ports provided
    if (!sourcePort || !targetPort) {
        return (_jsx("div", { className: cn('data-mapping-row px-3 py-2 rounded-md border border-border', className), children: _jsx("p", { className: "text-xs text-muted-foreground", children: "No port data" }) }));
    }
    // Get primary type for color
    const sourceType = Array.isArray(sourcePort.type) ? sourcePort.type[0] : sourcePort.type;
    const targetType = Array.isArray(targetPort.type) ? targetPort.type[0] : targetPort.type;
    const color = DATA_TYPE_COLORS[sourceType];
    // Simplified display if used with just 'port' and optional sourceElementName
    const isSimplified = port && !propSourcePort && !propTargetPort;
    if (isSimplified) {
        return (_jsxs("div", { className: cn('data-mapping-row group', 'flex items-center gap-2 px-3 py-2 rounded-md border transition-all', 'hover:bg-muted/50', isSelected && 'bg-primary/5 border-primary/40', !isSelected && 'border-border', className), onClick: onClick, children: [_jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: color } }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium truncate", children: port.name }), _jsx(DataTypeBadge, { type: sourceType, size: "sm", variant: "subtle" }), sourceElementName && (_jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: sourceElementName }))] }), removable && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                        e.stopPropagation();
                        onRemove?.();
                    }, className: "h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3.5 w-3.5" }) }))] }));
    }
    // Full display with source and target
    return (_jsxs("div", { className: cn('data-mapping-row group', 'flex items-center gap-2 px-3 py-2 rounded-md border transition-all', 'hover:bg-muted/50 cursor-pointer', isSelected && 'bg-primary/5 border-primary/40', !isSelected && 'border-border', className), onClick: onClick, children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { backgroundColor: color } }), _jsxs("div", { className: "min-w-0 flex-1", children: [sourceElementName && (_jsx("p", { className: "text-xs text-muted-foreground truncate", children: sourceElementName })), _jsx("p", { className: "text-sm font-medium truncate", children: sourcePort.name })] })] }) }), _jsx(ArrowRight, { className: "h-4 w-4 flex-shrink-0 text-muted-foreground", style: { color } }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium truncate", children: targetPort.name }), _jsx(DataTypeBadge, { type: targetType, size: "sm", variant: "subtle" })] }) }) }), removable && (_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                    e.stopPropagation();
                    onRemove?.();
                }, className: "h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3.5 w-3.5" }) }))] }));
}
DataMappingRow.displayName = 'DataMappingRow';
//# sourceMappingURL=data-mapping-row.js.map