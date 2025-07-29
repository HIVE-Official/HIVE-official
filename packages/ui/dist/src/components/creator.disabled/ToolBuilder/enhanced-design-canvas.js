"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Card } from '../../ui/card.js';
import { Button } from '../../../index.js';
import { Badge } from '../../ui/badge.js';
import { Lock, Unlock, Eye, EyeOff, RotateCcw, RotateCw, ZoomIn, ZoomOut, Grid, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils.js';
const RESIZE_HANDLES = [
    { position: 'nw', cursor: 'nw-resize' },
    { position: 'n', cursor: 'n-resize' },
    { position: 'ne', cursor: 'ne-resize' },
    { position: 'w', cursor: 'w-resize' },
    { position: 'e', cursor: 'e-resize' },
    { position: 'sw', cursor: 'sw-resize' },
    { position: 's', cursor: 's-resize' },
    { position: 'se', cursor: 'se-resize' }
];
export const EnhancedDesignCanvas = ({ elements, canvasSettings, selectedElementIds, onElementsUpdate, onSelectionChange, onElementDoubleClick, onCanvasSettingsChange, className }) => {
    const canvasRef = useRef(null);
    const [dragState, setDragState] = useState({
        isDragging: false,
        dragType: 'move',
        startPosition: { x: 0, y: 0 },
        startElementStates: []
    });
    const [showLayers, setShowLayers] = useState(false);
    const [clipboard, setClipboard] = useState([]);
    // Snap to grid helper
    const snapToGrid = useCallback((value) => {
        if (!canvasSettings.snapToGrid)
            return value;
        return Math.round(value / canvasSettings.gridSize) * canvasSettings.gridSize;
    }, [canvasSettings.snapToGrid, canvasSettings.gridSize]);
    // Get element bounds including children
    const getElementBounds = useCallback((elementId) => {
        const element = elements.find(el => el.id === elementId);
        if (!element)
            return { x: 0, y: 0, width: 0, height: 0 };
        const children = elements.filter(el => el.parentId === elementId);
        if (children.length === 0) {
            return {
                x: element.position.x,
                y: element.position.y,
                width: element.size.width,
                height: element.size.height
            };
        }
        // Calculate bounds including all children
        let minX = element.position.x;
        let minY = element.position.y;
        let maxX = element.position.x + element.size.width;
        let maxY = element.position.y + element.size.height;
        children.forEach(child => {
            const childBounds = getElementBounds(child.id);
            minX = Math.min(minX, childBounds.x);
            minY = Math.min(minY, childBounds.y);
            maxX = Math.max(maxX, childBounds.x + childBounds.width);
            maxY = Math.max(maxY, childBounds.y + childBounds.height);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }, [elements]);
    // Handle mouse down on canvas
    const handleCanvasMouseDown = useCallback((e) => {
        if (e.target === canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / canvasSettings.zoom;
            const y = (e.clientY - rect.top) / canvasSettings.zoom;
            setDragState({
                isDragging: true,
                dragType: 'select',
                startPosition: { x, y },
                startElementStates: [],
                selectionBox: {
                    startX: x,
                    startY: y,
                    currentX: x,
                    currentY: y
                }
            });
            onSelectionChange([]);
        }
    }, [canvasSettings.zoom, onSelectionChange]);
    // Handle element mouse down
    const handleElementMouseDown = useCallback((e, elementId) => {
        e.stopPropagation();
        const element = elements.find(el => el.id === elementId);
        if (!element || element.isLocked)
            return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const x = (e.clientX - rect.left) / canvasSettings.zoom;
        const y = (e.clientY - rect.top) / canvasSettings.zoom;
        // If element is not selected, select it
        if (!selectedElementIds.includes(elementId)) {
            if (e.ctrlKey || e.metaKey) {
                onSelectionChange([...selectedElementIds, elementId]);
            }
            else {
                onSelectionChange([elementId]);
            }
        }
        // Start drag operation
        const selectedElements = elements.filter(el => selectedElementIds.includes(el.id) || el.id === elementId);
        setDragState({
            isDragging: true,
            dragType: 'move',
            startPosition: { x, y },
            startElementStates: selectedElements.map(el => ({
                id: el.id,
                position: { ...el.position },
                size: { ...el.size }
            }))
        });
    }, [elements, selectedElementIds, canvasSettings.zoom, onSelectionChange]);
    // Handle mouse move
    const handleMouseMove = useCallback((e) => {
        if (!dragState.isDragging)
            return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const currentX = (e.clientX - rect.left) / canvasSettings.zoom;
        const currentY = (e.clientY - rect.top) / canvasSettings.zoom;
        const deltaX = currentX - dragState.startPosition.x;
        const deltaY = currentY - dragState.startPosition.y;
        if (dragState.dragType === 'select' && dragState.selectionBox) {
            // Update selection box
            setDragState(prev => ({
                ...prev,
                selectionBox: prev.selectionBox ? {
                    ...prev.selectionBox,
                    currentX,
                    currentY
                } : undefined
            }));
        }
        else if (dragState.dragType === 'move') {
            // Move selected elements
            const updatedElements = elements.map(element => {
                const startState = dragState.startElementStates.find(state => state.id === element.id);
                if (!startState)
                    return element;
                const newX = snapToGrid(startState.position.x + deltaX);
                const newY = snapToGrid(startState.position.y + deltaY);
                return {
                    ...element,
                    position: { x: newX, y: newY }
                };
            });
            onElementsUpdate(updatedElements);
        }
    }, [dragState, elements, canvasSettings.zoom, snapToGrid, onElementsUpdate]);
    // Handle mouse up
    const handleMouseUp = useCallback(() => {
        if (dragState.dragType === 'select' && dragState.selectionBox) {
            // Select elements within selection box
            const { startX, startY, currentX, currentY } = dragState.selectionBox;
            const minX = Math.min(startX, currentX);
            const maxX = Math.max(startX, currentX);
            const minY = Math.min(startY, currentY);
            const maxY = Math.max(startY, currentY);
            const selectedIds = elements
                .filter(element => {
                const bounds = getElementBounds(element.id);
                return bounds.x >= minX && bounds.y >= minY &&
                    bounds.x + bounds.width <= maxX && bounds.y + bounds.height <= maxY;
            })
                .map(element => element.id);
            onSelectionChange(selectedIds);
        }
        setDragState({
            isDragging: false,
            dragType: 'move',
            startPosition: { x: 0, y: 0 },
            startElementStates: []
        });
    }, [dragState, elements, getElementBounds, onSelectionChange]);
    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedElements();
            }
            else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
                copySelectedElements();
            }
            else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
                pasteElements();
            }
            else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                duplicateSelectedElements();
            }
            else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                onSelectionChange(elements.map(el => el.id));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedElementIds, elements, clipboard]);
    // Element operations
    const deleteSelectedElements = useCallback(() => {
        const updatedElements = elements.filter(el => !selectedElementIds.includes(el.id));
        onElementsUpdate(updatedElements);
        onSelectionChange([]);
    }, [elements, selectedElementIds, onElementsUpdate, onSelectionChange]);
    const copySelectedElements = useCallback(() => {
        const selectedElements = elements.filter(el => selectedElementIds.includes(el.id));
        setClipboard(selectedElements);
    }, [elements, selectedElementIds]);
    const pasteElements = useCallback(() => {
        if (clipboard.length === 0)
            return;
        const pastedElements = clipboard.map(element => ({
            ...element,
            id: `${element.id}_copy_${Date.now()}`,
            position: {
                x: element.position.x + 20,
                y: element.position.y + 20
            },
            order: Math.max(...elements.map(el => el.order)) + 1
        }));
        onElementsUpdate([...elements, ...pastedElements]);
        onSelectionChange(pastedElements.map(el => el.id));
    }, [clipboard, elements, onElementsUpdate, onSelectionChange]);
    const duplicateSelectedElements = useCallback(() => {
        copySelectedElements();
        setTimeout(pasteElements, 0);
    }, [copySelectedElements, pasteElements]);
    const toggleElementVisibility = useCallback((elementId) => {
        const updatedElements = elements.map(el => el.id === elementId ? { ...el, isVisible: !el.isVisible } : el);
        onElementsUpdate(updatedElements);
    }, [elements, onElementsUpdate]);
    const toggleElementLock = useCallback((elementId) => {
        const updatedElements = elements.map(el => el.id === elementId ? { ...el, isLocked: !el.isLocked } : el);
        onElementsUpdate(updatedElements);
    }, [elements, onElementsUpdate]);
    const bringToFront = useCallback((elementId) => {
        const maxOrder = Math.max(...elements.map(el => el.order));
        const updatedElements = elements.map(el => el.id === elementId ? { ...el, order: maxOrder + 1 } : el);
        onElementsUpdate(updatedElements);
    }, [elements, onElementsUpdate]);
    const sendToBack = useCallback((elementId) => {
        const minOrder = Math.min(...elements.map(el => el.order));
        const updatedElements = elements.map(el => el.id === elementId ? { ...el, order: minOrder - 1 } : el);
        onElementsUpdate(updatedElements);
    }, [elements, onElementsUpdate]);
    // Render grid
    const renderGrid = () => {
        if (!canvasSettings.showGrid)
            return null;
        const gridLines = [];
        const { width, height, gridSize } = canvasSettings;
        // Vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            gridLines.push(_jsx("line", { x1: x, y1: 0, x2: x, y2: height, stroke: "var(--hive-border-default)", strokeWidth: 1 }, `v-${x}`));
        }
        // Horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            gridLines.push(_jsx("line", { x1: 0, y1: y, x2: width, y2: y, stroke: "var(--hive-border-default)", strokeWidth: 1 }, `h-${y}`));
        }
        return (_jsx("svg", { className: "absolute inset-0 pointer-events-none", width: width, height: height, style: { transform: `scale(${canvasSettings.zoom})` }, children: gridLines }));
    };
    // Render selection box
    const renderSelectionBox = () => {
        if (!dragState.selectionBox)
            return null;
        const { startX, startY, currentX, currentY } = dragState.selectionBox;
        const minX = Math.min(startX, currentX);
        const minY = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        return (_jsx("div", { className: "absolute border-2 border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 pointer-events-none", style: {
                left: minX * canvasSettings.zoom,
                top: minY * canvasSettings.zoom,
                width: width * canvasSettings.zoom,
                height: height * canvasSettings.zoom,
                transform: `scale(${canvasSettings.zoom})`
            } }));
    };
    // Render element
    const renderElement = (element) => {
        const isSelected = selectedElementIds.includes(element.id);
        const bounds = getElementBounds(element.id);
        return (_jsxs("div", { className: cn("absolute border-2 transition-all cursor-move", isSelected ? "border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10" : "border-transparent", element.isLocked && "cursor-not-allowed", !element.isVisible && "opacity-50"), style: {
                left: bounds.x * canvasSettings.zoom,
                top: bounds.y * canvasSettings.zoom,
                width: bounds.width * canvasSettings.zoom,
                height: bounds.height * canvasSettings.zoom,
                zIndex: element.order,
                transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined
            }, onMouseDown: (e) => handleElementMouseDown(e, element.id), onDoubleClick: () => onElementDoubleClick(element.id), children: [_jsx("div", { className: "w-full h-full bg-[var(--hive-bg-tertiary)] rounded border border-[var(--hive-border-default)] flex items-center justify-center text-[var(--hive-text-primary)] text-sm", children: element.config.label || element.elementId }), isSelected && !element.isLocked && (_jsx(_Fragment, { children: RESIZE_HANDLES.map(handle => (_jsx("div", { className: "absolute w-2 h-2 bg-[var(--hive-brand-secondary)] border border-[var(--hive-text-primary)]", style: {
                            cursor: handle.cursor,
                            ...getHandlePosition(handle.position)
                        } }, handle.position))) })), isSelected && (_jsxs("div", { className: "absolute -top-8 left-0 flex items-center gap-1", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => toggleElementVisibility(element.id), className: "h-6 w-6 p-0 bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90", children: element.isVisible ? (_jsx(Eye, { className: "h-3 w-3 text-[var(--hive-text-primary)]" })) : (_jsx(EyeOff, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => toggleElementLock(element.id), className: "h-6 w-6 p-0 bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90", children: element.isLocked ? (_jsx(Lock, { className: "h-3 w-3 text-[var(--hive-status-error)]" })) : (_jsx(Unlock, { className: "h-3 w-3 text-[var(--hive-text-primary)]" })) })] }))] }, element.id));
    };
    const getHandlePosition = (position) => {
        switch (position) {
            case 'nw': return { top: -4, left: -4 };
            case 'n': return { top: -4, left: '50%', transform: 'translateX(-50%)' };
            case 'ne': return { top: -4, right: -4 };
            case 'w': return { top: '50%', left: -4, transform: 'translateY(-50%)' };
            case 'e': return { top: '50%', right: -4, transform: 'translateY(-50%)' };
            case 'sw': return { bottom: -4, left: -4 };
            case 's': return { bottom: -4, left: '50%', transform: 'translateX(-50%)' };
            case 'se': return { bottom: -4, right: -4 };
            default: return {};
        }
    };
    return (_jsxs("div", { className: cn("relative bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-lg overflow-hidden", className), children: [_jsxs("div", { className: "absolute top-4 left-4 z-20 flex items-center gap-2", children: [_jsxs(Badge, { variant: "outline", className: "border-[var(--hive-border-default)] text-[var(--hive-text-primary)]", children: [Math.round(canvasSettings.zoom * 100), "%"] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onCanvasSettingsChange({
                            ...canvasSettings,
                            zoom: Math.max(0.25, canvasSettings.zoom - 0.25)
                        }), className: "h-8 w-8 p-0 bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90", children: _jsx(ZoomOut, { className: "h-4 w-4 text-[var(--hive-text-primary)]" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onCanvasSettingsChange({
                            ...canvasSettings,
                            zoom: Math.min(3, canvasSettings.zoom + 0.25)
                        }), className: "h-8 w-8 p-0 bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90", children: _jsx(ZoomIn, { className: "h-4 w-4 text-[var(--hive-text-primary)]" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onCanvasSettingsChange({
                            ...canvasSettings,
                            showGrid: !canvasSettings.showGrid
                        }), className: cn("h-8 w-8 p-0", canvasSettings.showGrid
                            ? "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]"
                            : "bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90 text-[var(--hive-text-primary)]"), children: _jsx(Grid, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "absolute top-4 right-4 z-20", children: _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowLayers(!showLayers), className: cn("h-8 w-8 p-0", showLayers
                        ? "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]"
                        : "bg-[var(--hive-bg-primary)]/80 hover:bg-[var(--hive-bg-primary)]/90 text-[var(--hive-text-primary)]"), children: _jsx(Layers, { className: "h-4 w-4" }) }) }), _jsxs("div", { ref: canvasRef, className: "relative w-full h-full min-h-150 overflow-auto cursor-crosshair", style: {
                    backgroundColor: canvasSettings.backgroundColor,
                    backgroundSize: `${canvasSettings.gridSize * canvasSettings.zoom}px ${canvasSettings.gridSize * canvasSettings.zoom}px`,
                    backgroundImage: canvasSettings.showGrid
                        ? `radial-gradient(circle, var(--hive-border-default) 1px, transparent 1px)`
                        : undefined
                }, onMouseDown: handleCanvasMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, children: [renderGrid(), elements
                        .sort((a, b) => a.order - b.order)
                        .map(renderElement), renderSelectionBox()] }), showLayers && (_jsxs(Card, { className: "absolute top-16 right-4 w-64 p-4 bg-[var(--hive-bg-primary)]/90 border-[var(--hive-border-default)] z-30 backdrop-blur-md", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Layers" }), _jsx("div", { className: "space-y-1 max-h-64 overflow-y-auto", children: elements
                            .sort((a, b) => b.order - a.order)
                            .map(element => (_jsxs("div", { className: cn("flex items-center gap-2 p-2 rounded cursor-pointer transition-colors", selectedElementIds.includes(element.id)
                                ? "bg-[var(--hive-brand-secondary)]/20 border border-[var(--hive-brand-secondary)]/30"
                                : "hover:bg-[var(--hive-interactive-hover)]"), onClick: () => onSelectionChange([element.id]), children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                                e.stopPropagation();
                                                toggleElementVisibility(element.id);
                                            }, className: "h-4 w-4 p-0", children: element.isVisible ? (_jsx(Eye, { className: "h-3 w-3 text-[var(--hive-text-primary)]" })) : (_jsx(EyeOff, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                                e.stopPropagation();
                                                toggleElementLock(element.id);
                                            }, className: "h-4 w-4 p-0", children: element.isLocked ? (_jsx(Lock, { className: "h-3 w-3 text-[var(--hive-status-error)]" })) : (_jsx(Unlock, { className: "h-3 w-3 text-[var(--hive-text-primary)]" })) })] }), _jsx("span", { className: "flex-1 text-sm text-[var(--hive-text-primary)] truncate", children: element.config.label || element.elementId }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                                e.stopPropagation();
                                                bringToFront(element.id);
                                            }, className: "h-4 w-4 p-0", children: _jsx(RotateCcw, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => {
                                                e.stopPropagation();
                                                sendToBack(element.id);
                                            }, className: "h-4 w-4 p-0", children: _jsx(RotateCw, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" }) })] })] }, element.id))) })] }))] }));
};
export default EnhancedDesignCanvas;
//# sourceMappingURL=enhanced-design-canvas.js.map