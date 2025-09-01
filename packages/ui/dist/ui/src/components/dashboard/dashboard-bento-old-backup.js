'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, Reorder } from 'framer-motion';
import { GripVertical, Maximize2, Settings, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
// Grid size mappings
const gridSizeMap = {
    small: { cols: 1, rows: 1, minCols: 1, minRows: 1 },
    medium: { cols: 2, rows: 1, minCols: 1, minRows: 1 },
    large: { cols: 2, rows: 2, minCols: 2, minRows: 1 },
    xl: { cols: 3, rows: 2, minCols: 2, minRows: 2 }
};
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};
const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: {
            duration: 0.2
        }
    }
};
export function BentoGrid({ layout, onLayoutChange, onItemResize, onItemRemove, onItemAdd, onItemConfigure, editable = false, className = "" }) {
    const [items, setItems] = useState(layout.items);
    const [draggedItem, setDraggedItem] = useState(null);
    const [resizingItem, setResizingItem] = useState(null);
    const [showGridLines, setShowGridLines] = useState(false);
    const gridRef = useRef(null);
    // Handle item reorder
    const handleReorder = (newItems) => {
        setItems(newItems);
        onLayoutChange?.({
            ...layout,
            items: newItems
        });
    };
    // Handle item size change
    const handleItemResize = (itemId, newSize) => {
        const updatedItems = items.map(item => item.id === itemId ? { ...item, size: newSize } : item);
        setItems(updatedItems);
        onItemResize?.(itemId, newSize);
        onLayoutChange?.({
            ...layout,
            items: updatedItems
        });
    };
    // Handle item removal
    const handleItemRemove = (itemId) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        onItemRemove?.(itemId);
        onLayoutChange?.({
            ...layout,
            items: updatedItems
        });
    };
    // Get grid item style based on size
    const getItemStyle = (size) => {
        const mapping = gridSizeMap[size || "default"];
        return {
            gridColumn: `span ${mapping.cols}`,
            gridRow: `span ${mapping.rows}`,
            minHeight: `${mapping.rows * 120}px`
        };
    };
    // Get responsive grid columns
    const getGridColumns = () => {
        if (layout.responsive) {
            return {
                gridTemplateColumns: `repeat(${layout.responsive.desktop}, 1fr)`,
                '@media (max-width: theme(screens.lg))': {
                    gridTemplateColumns: `repeat(${layout.responsive.tablet}, 1fr)`
                },
                '@media (max-width: theme(screens.md))': {
                    gridTemplateColumns: `repeat(${layout.responsive.mobile}, 1fr)`
                }
            };
        }
        return {
            gridTemplateColumns: `repeat(${layout.columns}, 1fr)`
        };
    };
    return (_jsxs(motion.div, { className: `bento-grid-container ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: [editable && (_jsxs(motion.div, { className: "flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg", variants: itemVariants, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: layout.name }), _jsxs(Badge, { variant: "secondary", children: [items.length, " widgets"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => setShowGridLines(!showGridLines), children: "Grid Lines" }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: onItemAdd, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Widget"] })] })] })), _jsx(Reorder.Group, { as: "div", values: items, onReorder: handleReorder, className: `
          grid gap-${layout.gap} 
          ${showGridLines ? 'bg-grid-pattern' : ''}
          transition-all duration-300
        `, style: getGridColumns(), ref: gridRef, children: _jsx(AnimatePresence, { mode: "popLayout", children: items.map((item) => (_jsx(Reorder.Item, { value: item, as: "div", style: getItemStyle(item.size), className: "relative", whileDrag: {
                            scale: 1.05,
                            zIndex: 50,
                            boxShadow: "0 5 6 -5px color-mix(in_srgb,var(--hive-background-primary)_10%,transparent), 0 10px 10px -5px color-mix(in_srgb,var(--hive-background-primary)_4%,transparent)"
                        }, onDragStart: () => setDraggedItem(item.id), onDragEnd: () => setDraggedItem(null), children: _jsx(BentoGridItemComponent, { item: item, isEditable: editable, isDragging: draggedItem === item.id, isResizing: resizingItem === item.id, onResize: (newSize) => handleItemResize(item.id, newSize), onRemove: () => handleItemRemove(item.id), onConfigure: () => onItemConfigure?.(item.id), onResizeStart: () => setResizingItem(item.id), onResizeEnd: () => setResizingItem(null) }) }, item.id))) }) }), items.length === 0 && (_jsxs(motion.div, { className: "col-span-full flex flex-col items-center justify-center py-12 text-center", variants: itemVariants, children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center mb-4", children: _jsx(Plus, { className: "h-8 w-8 text-gray-400" }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No widgets configured" }), _jsx("p", { className: "text-[var(--hive-text-muted)] mb-4", children: "Add widgets to customize your dashboard" }), editable && (_jsxs(Button, { onClick: onItemAdd, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add First Widget"] }))] }))] }));
}
function BentoGridItemComponent({ item, isEditable, isDragging, isResizing, onResize, onRemove, onConfigure, onResizeStart, onResizeEnd }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showSizeMenu, setShowSizeMenu] = useState(false);
    const dragControls = useDragControls();
    const sizeOptions = [
        { size: 'small', label: 'Small (1x1)' },
        { size: 'medium', label: 'Medium (2x1)' },
        { size: 'large', label: 'Large (2x2)' },
        { size: 'xl', label: 'Extra Large (3x2)' }
    ].filter(option => {
        if (item.minSize && option.size < item.minSize)
            return false;
        if (item.maxSize && option.size > item.maxSize)
            return false;
        return true;
    });
    return (_jsx(motion.div, { className: "h-full", variants: itemVariants, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), layout: true, children: _jsxs(Card, { className: `
        h-full overflow-hidden transition-all duration-200
        ${isDragging ? 'ring-2 ring-blue-500 shadow-lg' : ''}
        ${isResizing ? 'ring-2 ring-purple-500' : ''}
        ${isHovered ? 'shadow-md' : ''}
      `, children: [_jsxs(CardHeader, { className: "pb-2 relative", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-sm font-medium flex items-center space-x-2", children: [item.icon, _jsx("span", { children: item.title }), item.category && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: item.category }))] }), isEditable && (isHovered || isDragging || isResizing) && (_jsxs("div", { className: "flex items-center space-x-1", children: [item.resizable && (_jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowSizeMenu(!showSizeMenu), onMouseDown: onResizeStart, onMouseUp: onResizeEnd, children: _jsx(Maximize2, { className: "h-3 w-3" }) }), showSizeMenu && (_jsx(motion.div, { className: "absolute top-8 right-0 bg-[var(--hive-text-primary)] rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[150px]", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, children: sizeOptions.map(({ size, label, disabled }) => (_jsx("button", { className: `
                              w-full text-left px-3 py-2 text-xs rounded hover:bg-gray-50 transition-colors
                              ${item.size === size ? 'bg-blue-50 text-blue-700' : ''}
                              ${disabled ? 'text-gray-400 cursor-not-allowed' : ''}
                            `, onClick: () => {
                                                            if (!disabled) {
                                                                onResize(size);
                                                                setShowSizeMenu(false);
                                                            }
                                                        }, disabled: disabled, children: label }, size))) }))] })), item.configurable && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onConfigure, children: _jsx(Settings, { className: "h-3 w-3" }) })), item.removable && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onRemove, className: "text-red-600 hover:text-red-700 hover:bg-red-50", children: _jsx(X, { className: "h-3 w-3" }) })), _jsx(Button, { variant: "ghost", size: "sm", onPointerDown: (e) => dragControls.start(e), className: "cursor-grab active:cursor-grabbing", children: _jsx(GripVertical, { className: "h-3 w-3" }) })] }))] }), item.description && (_jsx("p", { className: "text-xs text-[var(--hive-text-muted)] mt-1", children: item.description }))] }), _jsx(CardContent, { className: "pt-0 h-full", children: _jsx("div", { className: "h-full overflow-auto", children: item.component }) })] }) }));
}
// Predefined layouts
export const defaultLayouts = {
    academic: {
        id: 'academic',
        name: 'Academic Dashboard',
        columns: 4,
        gap: 4,
        responsive: {
            mobile: 1,
            tablet: 2,
            desktop: 4
        },
        items: []
    },
    productivity: {
        id: 'productivity',
        name: 'Productivity Dashboard',
        columns: 3,
        gap: 4,
        responsive: {
            mobile: 1,
            tablet: 2,
            desktop: 3
        },
        items: []
    },
    social: {
        id: 'social',
        name: 'Social Dashboard',
        columns: 3,
        gap: 6,
        responsive: {
            mobile: 1,
            tablet: 2,
            desktop: 3
        },
        items: []
    }
};
// Utility functions
export const createGridItem = (id, title, component, options = {}) => ({
    id,
    title,
    component,
    size: 'medium',
    resizable: true,
    removable: true,
    configurable: false,
    priority: 0,
    ...options
});
export const optimizeLayout = (items, columns) => {
    // Sort by priority and size for optimal positioning
    return items.sort((a, b) => {
        if (a.priority !== b.priority) {
            return (b.priority || 0) - (a.priority || 0);
        }
        const sizeOrder = { xl: 4, large: 3, medium: 2, small: 1 };
        return sizeOrder[b.size] - sizeOrder[a.size];
    });
};
export default BentoGrid;
//# sourceMappingURL=dashboard-bento-old-backup.js.map