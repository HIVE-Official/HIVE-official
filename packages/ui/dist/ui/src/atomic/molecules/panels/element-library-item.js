/**
 * Element Library Item Component
 *
 * Draggable element card in the library panel.
 * Represents an element type that can be dragged onto the canvas.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
// Category colors (matches element-card.tsx)
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
export function ElementLibraryItem({ element, isDragging = false, onDragStart, onDragEnd, onClick, className, }) {
    const categoryColor = categoryColors[element.category] || categoryColors.connector;
    const handleDragStart = (e) => {
        onDragStart?.(e, element);
    };
    const handleClick = () => {
        onClick?.(element);
    };
    return (_jsxs("div", { draggable: true, onDragStart: handleDragStart, onDragEnd: onDragEnd, onClick: handleClick, className: cn('element-library-item group', 'flex items-center gap-2 px-3 py-2.5 rounded-md', 'bg-background border transition-all cursor-grab active:cursor-grabbing', 'hover:shadow-md hover:scale-[1.02]', isDragging && 'opacity-50 scale-95', !isDragging && 'hover:border-primary/40', className), style: {
            borderColor: isDragging ? categoryColor : undefined,
        }, children: [_jsx(GripVertical, { className: "h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0" }), _jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded border flex-shrink-0 transition-colors", style: {
                    borderColor: `${categoryColor}40`,
                    backgroundColor: `${categoryColor}10`,
                }, children: _jsx("span", { className: "text-base", children: element.icon }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium truncate", children: element.name }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: element.description })] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0", children: [element.defaultInputs.length > 0 && (_jsxs("span", { title: `${element.defaultInputs.length} input${element.defaultInputs.length === 1 ? '' : 's'}`, children: ["\u2B05\uFE0F ", element.defaultInputs.length] })), element.defaultOutputs.length > 0 && (_jsxs("span", { title: `${element.defaultOutputs.length} output${element.defaultOutputs.length === 1 ? '' : 's'}`, children: [element.defaultOutputs.length, " \u27A1\uFE0F"] }))] })] }));
}
ElementLibraryItem.displayName = 'ElementLibraryItem';
//# sourceMappingURL=element-library-item.js.map