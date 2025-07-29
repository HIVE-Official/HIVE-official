"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef, useCallback, useState, useRef, useEffect, useMemo, } from "react";
import { useDrop, useDrag } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Copy, Trash2, Settings, Lock, Unlock, Eye, EyeOff, ZoomIn, ZoomOut, Layers, MousePointer } from "lucide-react";
import { cn } from "../../../lib/utils.js";
import { Button } from "../../../index.js";
import { ScrollArea } from "../../ui/scroll-area.js";
const DEVICE_DIMENSIONS = {
    desktop: { width: "100%", height: "100%", maxWidth: "none" },
    tablet: { width: "192px", height: "256px", maxWidth: "768px" },
    mobile: { width: "375px", height: "667px", maxWidth: "375px" },
};
export const UnifiedDesignCanvas = forwardRef(({ tool, elements, selectedElementId, deviceMode, mode = "full", onElementSelect, onElementUpdate, onElementDelete, onElementDuplicate, onElementAdd, className, }, ref) => {
    const [canvasSettings, setCanvasSettings] = useState({
        showGrid: true,
        snapToGrid: true,
        gridSize: 20,
        zoom: 1,
        backgroundColor: "var(--hive-background-primary)"
    });
    const [dragState, setDragState] = useState({
        isDragging: false,
        dragType: 'move',
        startPosition: { x: 0, y: 0 }
    });
    const canvasRef = useRef(null);
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
    // Setup drop zone for elements from library
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "ELEMENT",
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const canvasRect = canvasRef.current?.getBoundingClientRect();
            if (offset && canvasRect) {
                const x = (offset.x - canvasRect.left) / canvasSettings.zoom;
                const y = (offset.y - canvasRect.top) / canvasSettings.zoom;
                // Snap to grid if enabled
                const position = canvasSettings.snapToGrid
                    ? {
                        x: Math.round(x / canvasSettings.gridSize) * canvasSettings.gridSize,
                        y: Math.round(y / canvasSettings.gridSize) * canvasSettings.gridSize
                    }
                    : { x, y };
                onElementAdd(item.elementId, position);
            }
            return { position: { x: 0, y: 0 } };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    // Combine refs
    useEffect(() => {
        if (canvasRef.current) {
            drop(canvasRef.current);
        }
    }, [drop]);
    // Grid pattern generation
    const gridPattern = useMemo(() => {
        if (!canvasSettings.showGrid)
            return null;
        const size = canvasSettings.gridSize * canvasSettings.zoom;
        return `
        radial-gradient(circle, var(--hive-border-primary) 1px, transparent 1px)
        ${size}px ${size}px
      `;
    }, [canvasSettings.showGrid, canvasSettings.gridSize, canvasSettings.zoom]);
    // Element positioning and interaction
    const handleElementClick = useCallback((elementId, event) => {
        event.stopPropagation();
        onElementSelect(elementId);
    }, [onElementSelect]);
    const handleCanvasClick = useCallback((event) => {
        if (event.target === event.currentTarget) {
            onElementSelect(null);
            setContextMenu({ show: false, x: 0, y: 0 });
        }
    }, [onElementSelect]);
    const handleContextMenu = useCallback((event, elementId) => {
        event.preventDefault();
        setContextMenu({
            show: true,
            x: event.clientX,
            y: event.clientY,
            elementId
        });
    }, []);
    // Canvas settings handlers
    const toggleGrid = useCallback(() => {
        setCanvasSettings(prev => ({ ...prev, showGrid: !prev.showGrid }));
    }, []);
    const toggleSnapToGrid = useCallback(() => {
        setCanvasSettings(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }));
    }, []);
    const adjustZoom = useCallback((delta) => {
        setCanvasSettings(prev => ({
            ...prev,
            zoom: Math.max(0.25, Math.min(2, prev.zoom + delta))
        }));
    }, []);
    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }
            switch (event.key) {
                case 'Delete':
                case 'Backspace':
                    if (selectedElementId) {
                        onElementDelete(selectedElementId);
                    }
                    break;
                case 'Escape':
                    onElementSelect(null);
                    setContextMenu({ show: false, x: 0, y: 0 });
                    break;
                case 'g':
                    if (event.metaKey || event.ctrlKey) {
                        event.preventDefault();
                        toggleGrid();
                    }
                    break;
                case '=':
                case '+':
                    if (event.metaKey || event.ctrlKey) {
                        event.preventDefault();
                        adjustZoom(0.25);
                    }
                    break;
                case '-':
                    if (event.metaKey || event.ctrlKey) {
                        event.preventDefault();
                        adjustZoom(-0.25);
                    }
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedElementId, onElementDelete, onElementSelect, toggleGrid, adjustZoom]);
    // Close context menu on outside click
    useEffect(() => {
        const handleClickOutside = () => {
            setContextMenu({ show: false, x: 0, y: 0 });
        };
        if (contextMenu.show) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [contextMenu.show]);
    const deviceDimensions = DEVICE_DIMENSIONS[deviceMode];
    return (_jsxs("div", { className: cn("relative h-full overflow-hidden", className), ref: ref, children: [(mode === "full" || mode === "enhanced") && (_jsxs("div", { className: "absolute top-4 left-4 z-10 flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-1 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg p-1 border border-[var(--hive-border-primary)]", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: toggleGrid, className: cn("h-8 w-8 p-0", canvasSettings.showGrid && "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]"), children: _jsx(Grid3X3, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: toggleSnapToGrid, className: cn("h-8 w-8 p-0", canvasSettings.snapToGrid && "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]"), children: _jsx(MousePointer, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex items-center gap-1 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg p-1 border border-[var(--hive-border-primary)]", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => adjustZoom(-0.25), disabled: canvasSettings.zoom <= 0.25, className: "h-8 w-8 p-0", children: _jsx(ZoomOut, { className: "h-4 w-4" }) }), _jsxs("span", { className: "px-2 text-sm text-[var(--hive-text-primary)] min-w-[3rem] text-center", children: [Math.round(canvasSettings.zoom * 100), "%"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => adjustZoom(0.25), disabled: canvasSettings.zoom >= 2, className: "h-8 w-8 p-0", children: _jsx(ZoomIn, { className: "h-4 w-4" }) })] })] })), deviceMode !== "desktop" && (_jsx("div", { className: "absolute top-4 right-4 z-10", children: _jsx("div", { className: "bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-[var(--hive-border-primary)]", children: _jsxs("span", { className: "text-sm text-[var(--hive-text-primary)] font-medium", children: [deviceMode, " (", deviceDimensions.width, " \u00D7 ", deviceDimensions.height, ")"] }) }) })), _jsx(ScrollArea, { className: "h-full", children: _jsxs("div", { ref: canvasRef, className: cn("relative min-h-full transition-all duration-200", "bg-[var(--hive-background-primary)]", isOver && canDrop && "bg-[var(--hive-brand-primary)]/5", !isOver && canDrop && "bg-[var(--hive-background-secondary)]/30"), style: {
                        backgroundImage: gridPattern || undefined,
                        backgroundSize: gridPattern ? `${canvasSettings.gridSize * canvasSettings.zoom}px ${canvasSettings.gridSize * canvasSettings.zoom}px` : undefined,
                        transform: `scale(${canvasSettings.zoom})`,
                        transformOrigin: "top left",
                        minWidth: deviceDimensions.width,
                        minHeight: deviceDimensions.height || "100vh",
                        maxWidth: deviceDimensions.maxWidth,
                        margin: deviceMode !== "desktop" ? "0 auto" : undefined
                    }, onClick: handleCanvasClick, onContextMenu: (e) => handleContextMenu(e), children: [_jsx(AnimatePresence, { children: isOver && canDrop && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: _jsx("div", { className: "bg-[var(--hive-brand-primary)]/10 border-2 border-dashed border-[var(--hive-brand-primary)] rounded-lg p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(Layers, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }), _jsx("p", { className: "text-[var(--hive-brand-primary)] font-medium", children: "Drop element here" })] }) }) })) }), _jsx(AnimatePresence, { children: tool.elements.map((element) => (_jsx(ElementRenderer, { element: element, elementDefinition: elements.get(element.elementId), isSelected: selectedElementId === element.id, canvasSettings: canvasSettings, mode: mode, onClick: (e) => handleElementClick(element.id, e), onContextMenu: (e) => handleContextMenu(e, element.id), onUpdate: (updates) => onElementUpdate(element.id, updates) }, element.id))) }), tool.elements.length === 0 && !isOver && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-24 h-24 mx-auto mb-6 bg-[var(--hive-background-secondary)]/50 rounded-full flex items-center justify-center", children: _jsx(Layers, { className: "h-12 w-12 text-[var(--hive-text-secondary)]" }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "Start building your tool" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] max-w-md", children: "Drag elements from the library to get started. Use the grid and snap features for precise positioning." })] }) }))] }) }), _jsx(AnimatePresence, { children: contextMenu.show && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.1 }, className: "fixed z-50 bg-[var(--hive-background-secondary)]/95 backdrop-blur-sm border border-[var(--hive-border-primary)] rounded-lg shadow-lg py-2 min-w-[160px]", style: {
                        left: contextMenu.x,
                        top: contextMenu.y,
                    }, children: contextMenu.elementId ? (
                    // Element context menu
                    _jsxs(_Fragment, { children: [_jsx(ContextMenuItem, { icon: Copy, label: "Duplicate", onClick: () => {
                                    onElementDuplicate(contextMenu.elementId);
                                    setContextMenu({ show: false, x: 0, y: 0 });
                                } }), _jsx(ContextMenuItem, { icon: Settings, label: "Properties", onClick: () => {
                                    onElementSelect(contextMenu.elementId);
                                    setContextMenu({ show: false, x: 0, y: 0 });
                                } }), _jsx("div", { className: "border-t border-[var(--hive-border-primary)] my-1" }), _jsx(ContextMenuItem, { icon: Trash2, label: "Delete", danger: true, onClick: () => {
                                    onElementDelete(contextMenu.elementId);
                                    setContextMenu({ show: false, x: 0, y: 0 });
                                } })] })) : (
                    // Canvas context menu
                    _jsxs(_Fragment, { children: [_jsx(ContextMenuItem, { icon: Grid3X3, label: canvasSettings.showGrid ? "Hide Grid" : "Show Grid", onClick: () => {
                                    toggleGrid();
                                    setContextMenu({ show: false, x: 0, y: 0 });
                                } }), _jsx(ContextMenuItem, { icon: MousePointer, label: canvasSettings.snapToGrid ? "Disable Snap" : "Enable Snap", onClick: () => {
                                    toggleSnapToGrid();
                                    setContextMenu({ show: false, x: 0, y: 0 });
                                } })] })) })) })] }));
});
const ContextMenuItem = ({ icon: Icon, label, danger = false, onClick }) => (_jsxs("button", { onClick: onClick, className: cn("w-full px-3 py-2 text-left flex items-center gap-2 text-sm", "hover:bg-[var(--hive-background-tertiary)]", "transition-colors duration-150", danger
        ? "text-[var(--hive-status-error)] hover:bg-[var(--hive-status-error)]/10"
        : "text-[var(--hive-text-primary)]"), children: [_jsx(Icon, { className: "h-4 w-4" }), label] }));
const ElementRenderer = ({ element, elementDefinition, isSelected, canvasSettings, mode, onClick, onContextMenu, onUpdate }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [{ isDragging: isDragSource }, drag] = useDrag(() => ({
        type: "ELEMENT_INSTANCE",
        item: { instanceId: element.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    useEffect(() => {
        setIsDragging(isDragSource);
    }, [isDragSource]);
    const handleMouseDown = useCallback((e) => {
        e.stopPropagation();
        onClick(e);
    }, [onClick]);
    return (_jsxs(motion.div, { ref: drag, layout: true, className: cn("absolute group cursor-pointer", isDragging && "opacity-50", element.isLocked && "cursor-not-allowed", !element.isVisible && "opacity-30"), style: {
            left: element.position.x,
            top: element.position.y,
            width: element.position.width,
            height: element.position.height,
            zIndex: element.order
        }, onMouseDown: handleMouseDown, onContextMenu: onContextMenu, whileHover: { scale: element.isLocked ? 1 : 1.02 }, whileTap: { scale: element.isLocked ? 1 : 0.98 }, children: [isSelected && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "absolute -inset-2 border-2 border-[var(--hive-brand-primary)] rounded-lg bg-[var(--hive-brand-primary)]/5" })), _jsx("div", { className: cn("w-full h-full rounded-lg border border-[var(--hive-border-primary)]", "bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm", "flex items-center justify-center", "text-[var(--hive-text-secondary)] text-sm"), children: elementDefinition?.name || element.elementId }), isSelected && (mode === "full" || mode === "enhanced") && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "absolute -top-8 -right-2 flex items-center gap-1", children: [_jsx(Button, { variant: "outline", size: "sm", className: "h-6 w-6 p-0 bg-[var(--hive-background-secondary)]/90", onClick: (e) => {
                            e.stopPropagation();
                            onUpdate({ isVisible: !element.isVisible });
                        }, children: element.isVisible ? (_jsx(Eye, { className: "h-3 w-3" })) : (_jsx(EyeOff, { className: "h-3 w-3" })) }), _jsx(Button, { variant: "outline", size: "sm", className: "h-6 w-6 p-0 bg-[var(--hive-background-secondary)]/90", onClick: (e) => {
                            e.stopPropagation();
                            onUpdate({ isLocked: !element.isLocked });
                        }, children: element.isLocked ? (_jsx(Lock, { className: "h-3 w-3" })) : (_jsx(Unlock, { className: "h-3 w-3" })) })] }))] }));
};
UnifiedDesignCanvas.displayName = "UnifiedDesignCanvas";
export default UnifiedDesignCanvas;
//# sourceMappingURL=unified-design-canvas.js.map