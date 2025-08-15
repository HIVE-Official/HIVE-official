'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3 } from 'lucide-react';
import { BaseWidget } from './base-widget';
import { HiveButton } from '../../hive-button';
import { HiveCard } from '../../hive-card';
import { cn } from '../../../lib/utils';
export const GridLayoutEngine = ({ widgets, isEditing, isMobile = false, isTablet = false, onLayoutChange, onWidgetSettings, onAddWidget, onRemoveWidget }) => {
    const [dragState, setDragState] = useState({
        draggedWidget: null,
        dragOffset: { x: 0, y: 0 },
        dropZones: [],
        isValidDrop: false
    });
    const gridRef = useRef(null);
    const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
    // Responsive grid configuration
    const gridConfig = {
        columns: isMobile ? 1 : isTablet ? 2 : 4,
        gap: isMobile ? 12 : 16,
        minRowHeight: isMobile ? 140 : 160
    };
    useEffect(() => {
        const updateGridDimensions = () => {
            if (gridRef.current) {
                const rect = gridRef.current.getBoundingClientRect();
                setGridDimensions({ width: rect.width, height: rect.height });
            }
        };
        updateGridDimensions();
        window.addEventListener('resize', updateGridDimensions);
        return () => window.removeEventListener('resize', updateGridDimensions);
    }, []);
    // Generate drop zones for drag and drop
    const generateDropZones = useCallback((excludeWidget) => {
        const zones = [];
        const occupiedPositions = new Set();
        // Mark occupied positions
        widgets
            .filter(w => w.id !== excludeWidget)
            .forEach(widget => {
            for (let x = widget.position.x; x < widget.position.x + widget.size.width; x++) {
                for (let y = widget.position.y; y < widget.position.y + widget.size.height; y++) {
                    occupiedPositions.add(`${x},${y}`);
                }
            }
        });
        // Generate all possible drop zones
        for (let y = 0; y < 10; y++) { // Assume max 10 rows
            for (let x = 0; x < gridConfig.columns; x++) {
                // Check 1x1 zones
                const pos1x1 = `${x},${y}`;
                if (!occupiedPositions.has(pos1x1)) {
                    zones.push({
                        position: { x, y },
                        size: { width: 1, height: 1 },
                        isOccupied: false,
                        isValid: true
                    });
                }
                // Check 2x1 zones (if not mobile)
                if (!isMobile && x < gridConfig.columns - 1) {
                    const pos2x1 = [`${x},${y}`, `${x + 1},${y}`];
                    if (pos2x1.every(p => !occupiedPositions.has(p))) {
                        zones.push({
                            position: { x, y },
                            size: { width: 2, height: 1 },
                            isOccupied: false,
                            isValid: true
                        });
                    }
                }
                // Check 1x2 zones
                const pos1x2 = [`${x},${y}`, `${x},${y + 1}`];
                if (pos1x2.every(p => !occupiedPositions.has(p))) {
                    zones.push({
                        position: { x, y },
                        size: { width: 1, height: 2 },
                        isOccupied: false,
                        isValid: true
                    });
                }
                // Check 2x2 zones (if not mobile)
                if (!isMobile && x < gridConfig.columns - 1) {
                    const pos2x2 = [`${x},${y}`, `${x + 1},${y}`, `${x},${y + 1}`, `${x + 1},${y + 1}`];
                    if (pos2x2.every(p => !occupiedPositions.has(p))) {
                        zones.push({
                            position: { x, y },
                            size: { width: 2, height: 2 },
                            isOccupied: false,
                            isValid: true
                        });
                    }
                }
            }
        }
        return zones;
    }, [widgets, gridConfig.columns, isMobile]);
    const handleDragStart = useCallback((widgetId, event) => {
        const widget = widgets.find(w => w.id === widgetId);
        if (!widget)
            return;
        const rect = event.currentTarget.getBoundingClientRect();
        const offset = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        setDragState({
            draggedWidget: widgetId,
            dragOffset: offset,
            dropZones: generateDropZones(widgetId),
            isValidDrop: false
        });
    }, [widgets, generateDropZones]);
    const handleDragMove = useCallback((event) => {
        if (!dragState.draggedWidget || !gridRef.current)
            return;
        const gridRect = gridRef.current.getBoundingClientRect();
        const cellWidth = (gridRect.width - (gridConfig.columns - 1) * gridConfig.gap) / gridConfig.columns;
        const cellHeight = gridConfig.minRowHeight;
        const relativeX = event.clientX - gridRect.left - dragState.dragOffset.x;
        const relativeY = event.clientY - gridRect.top - dragState.dragOffset.y;
        const gridX = Math.floor(relativeX / (cellWidth + gridConfig.gap));
        const gridY = Math.floor(relativeY / (cellHeight + gridConfig.gap));
        const validZone = dragState.dropZones.find(zone => zone.position.x === gridX && zone.position.y === gridY);
        setDragState(prev => ({
            ...prev,
            isValidDrop: !!validZone
        }));
    }, [dragState, gridConfig]);
    const handleDragEnd = useCallback((event) => {
        if (!dragState.draggedWidget || !gridRef.current)
            return;
        const gridRect = gridRef.current.getBoundingClientRect();
        const cellWidth = (gridRect.width - (gridConfig.columns - 1) * gridConfig.gap) / gridConfig.columns;
        const cellHeight = gridConfig.minRowHeight;
        const relativeX = event.clientX - gridRect.left - dragState.dragOffset.x;
        const relativeY = event.clientY - gridRect.top - dragState.dragOffset.y;
        const gridX = Math.max(0, Math.min(gridConfig.columns - 1, Math.floor(relativeX / (cellWidth + gridConfig.gap))));
        const gridY = Math.max(0, Math.floor(relativeY / (cellHeight + gridConfig.gap)));
        if (dragState.isValidDrop) {
            const updatedWidgets = widgets.map(widget => widget.id === dragState.draggedWidget
                ? { ...widget, position: { x: gridX, y: gridY } }
                : widget);
            onLayoutChange(updatedWidgets);
        }
        setDragState({
            draggedWidget: null,
            dragOffset: { x: 0, y: 0 },
            dropZones: [],
            isValidDrop: false
        });
    }, [dragState, widgets, onLayoutChange, gridConfig]);
    // Set up drag event listeners
    useEffect(() => {
        if (dragState.draggedWidget) {
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
            return () => {
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
            };
        }
    }, [dragState.draggedWidget, handleDragMove, handleDragEnd]);
    const handleWidgetPositionChange = (widgetId, position) => {
        const updatedWidgets = widgets.map(widget => widget.id === widgetId ? { ...widget, position } : widget);
        onLayoutChange(updatedWidgets);
    };
    const handleWidgetSizeChange = (widgetId, size) => {
        const updatedWidgets = widgets.map(widget => widget.id === widgetId ? { ...widget, size } : widget);
        onLayoutChange(updatedWidgets);
    };
    const renderWidget = (widget) => {
        const isDragging = dragState.draggedWidget === widget.id;
        return (_jsx(BaseWidget, { id: widget.id, title: widget.title, size: widget.size, position: widget.position, settings: widget.settings, isEditing: isEditing, isDragging: isDragging, onSettingsChange: (settings) => onWidgetSettings(widget.id, settings), onSizeChange: (size) => handleWidgetSizeChange(widget.id, size), onPositionChange: (position) => handleWidgetPositionChange(widget.id, position), onRemove: () => onRemoveWidget(widget.id), className: isDragging ? 'cursor-grabbing' : isEditing ? 'cursor-grab' : '', children: _jsx(WidgetContent, { widget: widget }) }, widget.id));
    };
    const gridStyle = {
        gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
        gap: `${gridConfig.gap}px`,
        gridAutoRows: `${gridConfig.minRowHeight}px`
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(AnimatePresence, { children: isEditing && (_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "flex items-center justify-between p-4 bg-hive-surface-elevated/50 rounded-xl border border-hive-border-subtle backdrop-blur-sm", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Edit3, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Edit Mode" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Drag widgets to customize your layout" })] })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: () => onAddWidget('social-avatar'), className: "gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Widget"] }) })] })) }), _jsxs("div", { ref: gridRef, className: cn('grid auto-rows-fr relative', isEditing && 'bg-hive-surface-elevated/20 rounded-xl p-4 border border-dashed border-hive-border-subtle'), style: gridStyle, children: [_jsx(AnimatePresence, { children: isEditing && dragState.draggedWidget && (_jsx(_Fragment, { children: dragState.dropZones.map((zone, index) => (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 0.3 }, exit: { opacity: 0 }, className: cn('absolute border-2 border-dashed rounded-lg pointer-events-none', zone.isValid
                                    ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10'
                                    : 'border-red-400 bg-red-400/10'), style: {
                                    left: `${zone.position.x * (100 / gridConfig.columns)}%`,
                                    top: `${zone.position.y * (gridConfig.minRowHeight + gridConfig.gap)}px`,
                                    width: `${zone.size.width * (100 / gridConfig.columns)}%`,
                                    height: `${zone.size.height * gridConfig.minRowHeight + (zone.size.height - 1) * gridConfig.gap}px`
                                } }, `dropzone-${zone.position.x}-${zone.position.y}-${zone.size.width}x${zone.size.height}`))) })) }), _jsx(AnimatePresence, { mode: "popLayout", children: widgets
                            .filter(widget => widget.isVisible)
                            .sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x)
                            .map(renderWidget) }), widgets.length === 0 && (_jsx("div", { className: "col-span-full flex items-center justify-center min-h-100", children: _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-hive-surface-elevated flex items-center justify-center mx-auto mb-4", children: _jsx(Plus, { className: "h-8 w-8 text-hive-text-secondary" }) }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Customize Your Profile" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Add widgets to create your personalized campus command center" }), _jsx(HiveButton, { onClick: () => onAddWidget('social-avatar'), children: "Add Your First Widget" })] }) }))] })] }));
};
// Placeholder widget content - will be replaced with actual widget implementations
const WidgetContent = ({ widget }) => {
    const contentMap = {
        'social-avatar': _jsx("div", { className: "text-hive-text-secondary", children: "Social Avatar Widget" }),
        'priority-coordination': _jsx("div", { className: "text-hive-text-secondary", children: "Priority Coordination Widget" }),
        'community-coordination': _jsx("div", { className: "text-hive-text-secondary", children: "Community Coordination Widget" }),
        'social-calendar': _jsx("div", { className: "text-hive-text-secondary", children: "Social Calendar Widget" }),
        'privacy-control': _jsx("div", { className: "text-hive-text-secondary", children: "Privacy Control Widget" }),
        'personal-tools': _jsx("div", { className: "text-hive-text-secondary", children: "Personal Tools Widget" }),
        'profile-stats': _jsx("div", { className: "text-hive-text-secondary", children: "Profile Stats Widget" }),
        'campus-connections': _jsx("div", { className: "text-hive-text-secondary", children: "Campus Connections Widget" })
    };
    return (_jsx("div", { className: "h-full flex items-center justify-center", children: contentMap[widget.type] || _jsx("div", { className: "text-hive-text-secondary", children: "Unknown Widget" }) }));
};
//# sourceMappingURL=grid-layout-engine.js.map