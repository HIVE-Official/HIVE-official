// HIVE Visual Tool Builder - Atomic Design: Template
// Complete drag & drop tool building interface
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
import { Play, Save, Eye, Undo, Redo, Trash2, Move, ZoomIn, ZoomOut, Grid3X3, Layers, MousePointer, Hand } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import { ElementPicker } from './element-picker';
import { ElementConfig } from './element-config';
import { ToolPreview } from './tool-preview';
const Canvas = ({ tool, elements, onElementAdd, onElementUpdate, onElementDelete, onElementSelect, selectedElementId, canvas, onCanvasUpdate }) => {
    const canvasRef = useRef(null);
    const [draggedElement, setDraggedElement] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    // Handle element drop from element picker
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        if (!draggedElement || !canvasRef.current)
            return;
        const rect = canvasRef.current.getBoundingClientRect();
        const position = {
            x: (e.clientX - rect.left - dragOffset.x) / canvas.zoom,
            y: (e.clientY - rect.top - dragOffset.y) / canvas.zoom
        };
        onElementAdd(draggedElement, position);
        setDraggedElement(null);
        setIsDragging(false);
    }, [draggedElement, canvas.zoom, dragOffset, onElementAdd]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        if (!e.relatedTarget || !canvasRef.current?.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    }, []);
    // Handle element movement within canvas
    const handleElementDrag = useCallback((elementId, newPosition) => {
        onElementUpdate(elementId, { position: newPosition });
    }, [onElementUpdate]);
    // Handle element resize
    const handleElementResize = useCallback((elementId, newSize) => {
        onElementUpdate(elementId, { size: newSize });
    }, [onElementUpdate]);
    // Render element instances
    const renderElementInstance = (instance) => {
        const element = elements.find(el => el.id === instance.elementId);
        if (!element)
            return null;
        const IconComponent = element.icon;
        const isSelected = selectedElementId === instance.id;
        return (_jsx(HiveMotionWrapper, { layoutId: instance.id, children: _jsxs("div", { className: cn("absolute border-2 rounded-lg cursor-move transition-all duration-200", isSelected
                    ? "border-[var(--hive-color-gold-primary)] shadow-lg shadow-[var(--hive-color-gold-primary)]/20"
                    : "border-transparent hover:border-[var(--hive-border-default)]", "group"), style: {
                    left: instance.position.x,
                    top: instance.position.y,
                    width: instance.size.width === 'auto' ? 'auto' : instance.size.width,
                    height: instance.size.height === 'auto' ? 'auto' : instance.size.height,
                    zIndex: instance.zIndex,
                    transform: `scale(${canvas.zoom})`,
                    transformOrigin: 'top left'
                }, onClick: (e) => {
                    e.stopPropagation();
                    onElementSelect(instance.id);
                }, onMouseDown: (e) => {
                    e.stopPropagation();
                    // Handle drag start
                }, children: [_jsxs("div", { className: "w-full h-full p-3 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-6 h-6 rounded flex items-center justify-center", style: { backgroundColor: `${element.color}15`, color: element.color }, children: _jsx(IconComponent, { size: 14 }) }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)] truncate", children: instance.name || element.name })] }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: element.description })] }), isSelected && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "absolute -top-8 left-0 flex gap-1", children: [_jsx("div", { className: "w-6 h-6 bg-[var(--hive-color-gold-primary)] rounded flex items-center justify-center cursor-move", children: _jsx(Move, { size: 12, className: "text-[var(--hive-background-primary)]" }) }), _jsx("div", { className: "w-6 h-6 bg-red-500 rounded flex items-center justify-center cursor-pointer", onClick: (e) => {
                                            e.stopPropagation();
                                            onElementDelete(instance.id);
                                        }, children: _jsx(Trash2, { size: 12, className: "text-white" }) })] }), _jsx("div", { className: "absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--hive-color-gold-primary)] rounded cursor-se-resize" })] }))] }) }, instance.id));
    };
    return (_jsxs("div", { className: "relative flex-1 overflow-hidden bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "absolute top-4 left-4 z-10 flex gap-2", children: [_jsxs("div", { className: "flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: [_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => onCanvasUpdate({ zoom: Math.min(canvas.zoom + 0.1, 2) }), children: _jsx(ZoomIn, { size: 16 }) }), _jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => onCanvasUpdate({ zoom: Math.max(canvas.zoom - 0.1, 0.5) }), children: _jsx(ZoomOut, { size: 16 }) }), _jsxs("div", { className: "px-2 py-1 text-xs text-[var(--hive-text-secondary)] flex items-center", children: [Math.round(canvas.zoom * 100), "%"] })] }), _jsx("div", { className: "flex gap-1 p-1 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: _jsx(HiveButton, { variant: canvas.showGrid ? "primary" : "ghost", size: "sm", onClick: () => onCanvasUpdate({ showGrid: !canvas.showGrid }), children: _jsx(Grid3X3, { size: 16 }) }) })] }), _jsx("div", { ref: canvasRef, className: cn("w-full h-full relative overflow-auto", isDragging && "bg-[var(--hive-color-gold-primary)]/5"), onDrop: handleDrop, onDragOver: handleDragOver, onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onClick: () => onElementSelect(null), style: {
                    backgroundImage: canvas.showGrid
                        ? `radial-gradient(circle, var(--hive-border-default) 1px, transparent 1px)`
                        : undefined,
                    backgroundSize: canvas.showGrid ? `${canvas.gridSize}px ${canvas.gridSize}px` : undefined
                }, children: _jsxs("div", { className: "relative min-w-full min-h-full", style: {
                        width: '100%',
                        height: '100%',
                        transform: `translate(${canvas.offset.x}px, ${canvas.offset.y}px)`
                    }, children: [tool.elements.map(renderElementInstance), isDragging && (_jsx("div", { className: "absolute inset-0 border-2 border-dashed border-[var(--hive-color-gold-primary)] rounded-lg bg-[var(--hive-color-gold-primary)]/5 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-color-gold-primary)] rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx(MousePointer, { size: 24, className: "text-[var(--hive-background-primary)]" }) }), _jsx("p", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Drop element here" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Release to add to your tool" })] }) })), tool.elements.length === 0 && !isDragging && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx("div", { className: "w-20 h-20 bg-[var(--hive-background-tertiary)] rounded-2xl flex items-center justify-center mx-auto mb-6", children: _jsx(Layers, { size: 32, className: "text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "Start building your tool" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-6", children: "Drag elements from the library on the left to create your custom tool. Click elements to configure their properties." }), _jsxs(HiveBadge, { variant: "course-tag", className: "inline-flex items-center gap-1", children: [_jsx(Hand, { size: 14 }), "Drag & Drop Interface"] })] }) }))] }) })] }));
};
// Main Visual Tool Builder component
export const VisualToolBuilder = ({ tool, elements, onChange, onSave, onPreview, isLoading = false }) => {
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [canvas, setCanvas] = useState({
        zoom: 1,
        offset: { x: 0, y: 0 },
        gridSize: 20,
        showGrid: true,
        snapToGrid: false,
        rulers: false,
        guides: [],
        selection: []
    });
    // Get selected element instance
    const selectedElement = selectedElementId
        ? tool.elements.find(el => el.id === selectedElementId)
        : null;
    // Handle element addition
    const handleElementAdd = useCallback((element, position) => {
        const newInstance = {
            id: `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            elementId: element.id,
            position,
            size: { width: 200, height: 'auto' },
            config: { ...element.defaultConfig },
            style: {
                backgroundColor: 'transparent',
                padding: { top: 8, right: 8, bottom: 8, left: 8 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            },
            conditions: [],
            events: [],
            zIndex: tool.elements.length,
            isLocked: false,
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const updatedTool = {
            ...tool,
            elements: [...tool.elements, newInstance],
            updatedAt: new Date()
        };
        onChange(updatedTool);
        setSelectedElementId(newInstance.id);
    }, [tool, onChange]);
    // Handle element updates
    const handleElementUpdate = useCallback((elementId, changes) => {
        const updatedTool = {
            ...tool,
            elements: tool.elements.map(el => el.id === elementId
                ? { ...el, ...changes, updatedAt: new Date() }
                : el),
            updatedAt: new Date()
        };
        onChange(updatedTool);
    }, [tool, onChange]);
    // Handle element deletion
    const handleElementDelete = useCallback((elementId) => {
        const updatedTool = {
            ...tool,
            elements: tool.elements.filter(el => el.id !== elementId),
            updatedAt: new Date()
        };
        onChange(updatedTool);
        if (selectedElementId === elementId) {
            setSelectedElementId(null);
        }
    }, [tool, onChange, selectedElementId]);
    // Handle canvas updates
    const handleCanvasUpdate = useCallback((canvasChanges) => {
        setCanvas(prev => ({ ...prev, ...canvasChanges }));
    }, []);
    return (_jsxs("div", { className: "flex h-screen bg-[var(--hive-background-primary)]", children: [_jsxs("div", { className: "w-80 border-r border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: [_jsx(ElementPicker, { elements: elements, onElementSelect: (element) => {
                            // Set up drag data for canvas drop
                            const dragElement = document.createElement('div');
                            dragElement.style.display = 'none';
                            document.body.appendChild(dragElement);
                            const dragEvent = new DragEvent('dragstart', {
                                dataTransfer: new DataTransfer()
                            });
                            // Store element for canvas drop handling
                            window.hiveDraggedElement = element;
                        } }), ")} />"] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "h-16 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] flex items-center justify-between px-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: tool.name }), _jsxs(HiveBadge, { variant: "course-tag", children: [tool.elements.length, " element", tool.elements.length !== 1 ? 's' : ''] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => { }, disabled: true, children: _jsx(Undo, { size: 16 }) }), _jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => { }, disabled: true, children: _jsx(Redo, { size: 16 }) }), _jsx("div", { className: "w-px h-6 bg-[var(--hive-border-default)] mx-2" }), _jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: () => setShowPreview(true), children: [_jsx(Eye, { size: 16 }), "Preview"] }), _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: () => onSave(tool), disabled: isLoading, children: [_jsx(Save, { size: 16 }), "Save"] }), _jsxs(HiveButton, { variant: "primary", size: "sm", onClick: () => onPreview(tool), children: [_jsx(Play, { size: 16 }), "Run Tool"] })] })] }), _jsx(Canvas, { tool: tool, elements: elements, onElementAdd: handleElementAdd, onElementUpdate: handleElementUpdate, onElementDelete: handleElementDelete, onElementSelect: setSelectedElementId, selectedElementId: selectedElementId, canvas: canvas, onCanvasUpdate: handleCanvasUpdate })] }), selectedElement && selectedElementId && (_jsxs("div", { className: "w-80 border-l border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]", children: [_jsx(ElementConfig, { element: elements.find(el => el.id === selectedElement.elementId), instance: selectedElement, onChange: (config) => {
                            handleElementUpdate(selectedElementId, { config });
                        } }), ")} />"] })), showPreview && (_jsx(ToolPreview, { tool: tool, onClose: () => setShowPreview(false) }))] }));
};
export default VisualToolBuilder;
//# sourceMappingURL=visual-tool-builder.js.map