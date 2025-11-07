'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef, useState } from 'react';
import { Alert, AlertDescription, Badge, Button, Card, CardContent, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, } from '../../atomic/atoms/index.js';
import { ArrowRight, Box, CheckCircle, Copy, Eye, Grid, Layers, Link, Maximize2 as Resize, Move, Play, Save, Settings, Trash2, } from 'lucide-react';
import { ElementRegistry, initializeElementSystem, } from '../../lib/hivelab/element-system.js';
import { cn } from '../../lib/utils.js';
export function VisualToolComposer({ onSave, onPreview, onCancel, initialComposition, userId, }) {
    const [toolName, setToolName] = useState(initialComposition?.name || '');
    const [toolDescription, setToolDescription] = useState(initialComposition?.description || '');
    const [canvasElements, setCanvasElements] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStart, setConnectionStart] = useState(null);
    const [draggedElement, setDraggedElement] = useState(null);
    const [canvasSize] = useState({ width: 1200, height: 800 });
    const [zoom, setZoom] = useState(1);
    const [showGrid, setShowGrid] = useState(true);
    const [activeTab, setActiveTab] = useState('elements');
    const canvasRef = useRef(null);
    const elementRegistry = useRef(ElementRegistry.getInstance());
    // Initialize element system once
    useState(() => {
        initializeElementSystem();
    });
    const handleDragStart = (element) => {
        setDraggedElement(element);
    };
    const handleCanvasDrop = useCallback((e) => {
        e.preventDefault();
        if (!draggedElement || !canvasRef.current)
            return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        const newElement = {
            id: `element_${Date.now()}`,
            elementId: draggedElement.id,
            instanceId: `${draggedElement.id}_${Date.now()}`,
            position: { x: Math.max(0, x - 120), y: Math.max(0, y - 60) },
            size: { width: 240, height: 140 },
            config: { ...draggedElement.defaultConfig },
            isSelected: false,
        };
        setCanvasElements((prev) => [...prev, newElement]);
        setDraggedElement(null);
    }, [draggedElement, zoom]);
    const handleCanvasDragOver = (e) => {
        e.preventDefault();
    };
    const handleElementSelect = (elementId) => {
        setCanvasElements((prev) => prev.map((el) => ({ ...el, isSelected: el.id === elementId })));
        setSelectedElement(elementId);
    };
    const handleElementMove = (elementId, newPosition) => {
        setCanvasElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, position: newPosition } : el)));
    };
    const handleElementResize = (elementId, newSize) => {
        setCanvasElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, size: newSize } : el)));
    };
    const handleElementDelete = (elementId) => {
        setCanvasElements((prev) => prev.filter((el) => el.id !== elementId));
        setConnections((prev) => prev.filter((conn) => conn.from.instanceId !== elementId && conn.to.instanceId !== elementId));
        if (selectedElement === elementId) {
            setSelectedElement(null);
        }
    };
    const handleConnectionStart = (instanceId, output, x, y) => {
        setIsConnecting(true);
        setConnectionStart({ instanceId, output, x, y });
    };
    const handleConnectionEnd = (instanceId, input, x, y) => {
        if (connectionStart && connectionStart.instanceId !== instanceId) {
            const newConnection = {
                id: `conn_${Date.now()}`,
                from: connectionStart,
                to: { instanceId, input, x, y },
            };
            setConnections((prev) => [...prev, newConnection]);
        }
        setIsConnecting(false);
        setConnectionStart(null);
    };
    const handleElementConfigChange = (elementId, newConfig) => {
        setCanvasElements((prev) => prev.map((el) => el.id === elementId ? { ...el, config: { ...el.config, ...newConfig } } : el));
    };
    const buildToolComposition = () => {
        return {
            id: initialComposition?.id || `tool_${Date.now()}`,
            name: toolName,
            description: toolDescription,
            elements: canvasElements.map((canvasEl) => ({
                elementId: canvasEl.elementId,
                instanceId: canvasEl.instanceId,
                config: canvasEl.config,
                position: canvasEl.position,
                size: canvasEl.size,
            })),
            connections: connections.map((conn) => ({
                from: { instanceId: conn.from.instanceId, output: conn.from.output },
                to: { instanceId: conn.to.instanceId, input: conn.to.input },
            })),
            layout: 'grid',
        };
    };
    const handleSave = async () => {
        if (!toolName.trim()) {
            alert('Please enter a tool name');
            return;
        }
        const composition = buildToolComposition();
        await onSave(composition);
    };
    const handlePreview = () => {
        const composition = buildToolComposition();
        onPreview(composition);
    };
    const selectedCanvasElement = canvasElements.find((el) => el.id === selectedElement);
    const selectedElementDef = selectedCanvasElement
        ? elementRegistry.current.getElement(selectedCanvasElement.elementId)
        : null;
    const elementCategories = [
        { id: 'input', name: 'Input', icon: 'Type', color: 'text-blue-400' },
        { id: 'display', name: 'Display', icon: 'Eye', color: 'text-green-400' },
        { id: 'filter', name: 'Filter', icon: 'Filter', color: 'text-purple-400' },
        { id: 'action', name: 'Action', icon: 'Zap', color: 'text-orange-400' },
        { id: 'layout', name: 'Layout', icon: 'Grid', color: 'text-pink-400' },
    ];
    return (_jsxs("div", { className: "h-screen flex flex-col bg-hive-background-primary text-hive-foreground", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-hive-border-default bg-hive-background-overlay", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Box, { className: "h-6 w-6 text-hive-brand-primary" }), _jsx("h1", { className: "text-xl font-bold", children: "Tool Composer" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Input, { value: toolName, onChange: (e) => setToolName(e.target.value), placeholder: "Tool name...", className: "w-48 bg-hive-background-secondary border-hive-border-default" }), _jsxs(Badge, { variant: "outline", className: "border-hive-border-default text-xs", children: [canvasElements.length, " elements"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: showGrid ? 'brand' : 'outline', onClick: () => setShowGrid(!showGrid), className: cn('flex items-center gap-2', showGrid ? 'bg-hive-brand-primary/20 text-hive-brand-primary' : undefined), children: [_jsx(Grid, { className: "h-4 w-4" }), "Grid"] }), _jsxs("div", { className: "flex items-center space-x-1 bg-hive-background-tertiary rounded-lg p-1 border border-hive-border-default", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setZoom(Math.max(0.5, zoom - 0.1)), className: "h-8 w-8 text-hive-foreground", children: "-" }), _jsxs("span", { className: "text-sm text-white px-2 w-12 text-center", children: [Math.round(zoom * 100), "%"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setZoom(Math.min(2, zoom + 0.1)), className: "h-8 w-8 text-hive-foreground", children: "+" })] }), _jsxs(Button, { variant: "outline", onClick: handlePreview, disabled: canvasElements.length === 0, className: "flex items-center gap-2", children: [_jsx(Play, { className: "h-4 w-4" }), "Preview"] }), _jsxs(Button, { variant: "brand", onClick: handleSave, disabled: !toolName.trim() || canvasElements.length === 0, className: "flex items-center gap-2 bg-hive-brand-primary text-hive-obsidian hover:bg-hive-champagne", children: [_jsx(Save, { className: "h-4 w-4" }), "Save Tool"] }), _jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" })] })] }), _jsxs("div", { className: "flex-1 flex", children: [_jsxs("div", { className: "w-80 border-r border-hive-border-default bg-hive-background-overlay", children: [_jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 m-2 bg-hive-background-tertiary", children: [_jsxs(TabsTrigger, { value: "elements", className: "text-sm data-[state=active]:bg-hive-background-secondary", children: [_jsx(Layers, { className: "h-4 w-4 mr-2" }), "Elements"] }), _jsxs(TabsTrigger, { value: "properties", className: "text-sm data-[state=active]:bg-hive-background-secondary", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Properties"] })] }), _jsx(TabsContent, { value: "elements", className: "p-4 space-y-4", children: elementCategories.map((category) => {
                                            const elements = elementRegistry.current.getElementsByCategory(category.id);
                                            return (_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: cn('text-xs font-semibold uppercase tracking-wide text-hive-text-secondary', category.color), children: [category.name, " (", elements.length, ")"] }), _jsx("div", { className: "space-y-2", children: elements.map((element) => (_jsx(Card, { draggable: true, onDragStart: () => handleDragStart(element), className: "bg-hive-background-tertiary border-hive-border-default cursor-move hover:border-hive-brand-primary/50 transition-colors", children: _jsx(CardContent, { className: "p-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-lg bg-hive-background-primary border border-hive-border-default flex items-center justify-center text-sm", children: "\uD83D\uDCE6" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-white truncate", children: element.name }), _jsx("p", { className: "text-xs text-hive-text-mutedLight truncate", children: element.description })] })] }) }) }, element.id))) })] }, category.id));
                                        }) }), _jsx(TabsContent, { value: "properties", className: "p-4", children: selectedCanvasElement && selectedElementDef ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-white mb-1", children: selectedElementDef.name }), _jsx("p", { className: "text-sm text-hive-text-mutedLight mb-4", children: selectedElementDef.description })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-xs uppercase tracking-wide text-hive-text-tertiary", children: "Position" }), _jsxs("div", { className: "flex space-x-2 mt-1", children: [_jsx(Input, { type: "number", value: selectedCanvasElement.position.x, onChange: (e) => handleElementMove(selectedCanvasElement.id, {
                                                                                x: parseInt(e.target.value, 10) || 0,
                                                                                y: selectedCanvasElement.position.y,
                                                                            }), className: "w-20 bg-hive-background-secondary border-hive-border-default" }), _jsx(Input, { type: "number", value: selectedCanvasElement.position.y, onChange: (e) => handleElementMove(selectedCanvasElement.id, {
                                                                                x: selectedCanvasElement.position.x,
                                                                                y: parseInt(e.target.value, 10) || 0,
                                                                            }), className: "w-20 bg-hive-background-secondary border-hive-border-default" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-xs uppercase tracking-wide text-hive-text-tertiary", children: "Size" }), _jsxs("div", { className: "flex space-x-2 mt-1", children: [_jsx(Input, { type: "number", value: selectedCanvasElement.size.width, onChange: (e) => handleElementResize(selectedCanvasElement.id, {
                                                                                width: parseInt(e.target.value, 10) || 100,
                                                                                height: selectedCanvasElement.size.height,
                                                                            }), className: "w-20 bg-hive-background-secondary border-hive-border-default" }), _jsx(Input, { type: "number", value: selectedCanvasElement.size.height, onChange: (e) => handleElementResize(selectedCanvasElement.id, {
                                                                                width: selectedCanvasElement.size.width,
                                                                                height: parseInt(e.target.value, 10) || 50,
                                                                            }), className: "w-20 bg-hive-background-secondary border-hive-border-default" })] })] }), Object.entries(selectedElementDef.configSchema).map(([key, schema]) => (_jsxs("div", { className: "space-y-1", children: [_jsx(Label, { className: "text-xs uppercase tracking-wide text-hive-text-tertiary", children: key }), schema.type === 'string' && (_jsx(Input, { value: selectedCanvasElement.config[key] || '', onChange: (e) => handleElementConfigChange(selectedCanvasElement.id, {
                                                                        [key]: e.target.value,
                                                                    }), className: "bg-hive-background-secondary border-hive-border-default" })), schema.type === 'boolean' && (_jsx(Button, { variant: selectedCanvasElement.config[key] ? 'brand' : 'outline', size: "sm", onClick: () => handleElementConfigChange(selectedCanvasElement.id, {
                                                                        [key]: !selectedCanvasElement.config[key],
                                                                    }), className: "mt-1", children: selectedCanvasElement.config[key] ? (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), "Enabled"] })) : ('Disabled') })), schema.type === 'number' && (_jsx(Input, { type: "number", value: selectedCanvasElement.config[key] || 0, onChange: (e) => handleElementConfigChange(selectedCanvasElement.id, {
                                                                        [key]: parseInt(e.target.value, 10) || 0,
                                                                    }), className: "bg-hive-background-secondary border-hive-border-default" }))] }, key)))] }), _jsx("div", { className: "pt-4 border-t border-hive-border-default", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleElementDelete(selectedCanvasElement.id), className: "text-red-400 border-red-500 hover:bg-red-500/10 flex items-center gap-2", children: [_jsx(Trash2, { className: "h-4 w-4" }), "Delete Element"] }) })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Settings, { className: "h-12 w-12 mx-auto mb-3 text-hive-text-mutedLight opacity-50" }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Select an element to view its properties" })] })) })] }), _jsx("div", { className: "px-4 pb-4", children: _jsx(Alert, { className: "bg-hive-background-secondary border-hive-border-default text-hive-text-secondary", children: _jsx(AlertDescription, { children: "Drag any element into the canvas to start composing your tool. Connect nodes to wire interactions." }) }) })] }), _jsx("div", { className: "flex-1 relative overflow-hidden", children: _jsxs("div", { ref: canvasRef, className: cn('w-full h-full relative', showGrid ? 'bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.08)_1px,_transparent_1px)]' : ''), style: {
                                transform: `scale(${zoom})`,
                                transformOrigin: 'top left',
                                backgroundSize: showGrid ? `${28 * zoom}px ${28 * zoom}px` : 'none'
                            }, onDrop: handleCanvasDrop, onDragOver: handleCanvasDragOver, onClick: () => setSelectedElement(null), children: [canvasElements.map((element) => {
                                    const elementDef = elementRegistry.current.getElement(element.elementId);
                                    return (_jsxs("div", { className: cn('absolute rounded-xl border bg-hive-background-tertiary/90 cursor-pointer transition-all', element.isSelected
                                            ? 'border-hive-brand-primary shadow-[0_0_0_2px_rgba(255,200,0,0.3)]'
                                            : 'border-hive-border-default hover:border-hive-brand-primary/60'), style: {
                                            left: element.position.x,
                                            top: element.position.y,
                                            width: element.size.width,
                                            height: element.size.height,
                                        }, onClick: (e) => {
                                            e.stopPropagation();
                                            handleElementSelect(element.id);
                                        }, children: [_jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-b border-hive-border-default", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 bg-hive-brand-primary rounded-full" }), _jsx("span", { className: "text-sm font-medium text-white truncate max-w-[140px]", children: elementDef?.name || element.elementId })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-hive-text-mutedLight", children: _jsx(Move, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-hive-text-mutedLight", children: _jsx(Resize, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-hive-text-mutedLight", children: _jsx(Copy, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-red-400 hover:text-red-300", onClick: (e) => {
                                                                    e.stopPropagation();
                                                                    handleElementDelete(element.id);
                                                                }, children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }), _jsx("div", { className: "p-4 text-hive-text-secondary text-xs", children: elementDef?.description || 'Element placeholder' }), _jsx("div", { className: "absolute -right-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-y-1/2 flex items-center justify-center text-white", onClick: (e) => {
                                                    e.stopPropagation();
                                                    handleConnectionStart(element.instanceId, 'output', element.position.x + element.size.width, element.position.y + element.size.height / 2);
                                                }, children: _jsx(ArrowRight, { className: "h-3 w-3" }) }), _jsx("div", { className: "absolute -left-2 top-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer transform -translate-y-1/2 flex items-center justify-center text-white", onClick: (e) => {
                                                    e.stopPropagation();
                                                    handleConnectionEnd(element.instanceId, 'input', element.position.x, element.position.y + element.size.height / 2);
                                                }, children: _jsx(ArrowRight, { className: "h-3 w-3 rotate-180" }) })] }, element.id));
                                }), _jsxs("svg", { className: "absolute inset-0 pointer-events-none", children: [connections.map((connection) => (_jsx("line", { x1: connection.from.x, y1: connection.from.y, x2: connection.to.x, y2: connection.to.y, stroke: "rgba(255, 214, 0, 0.9)", strokeWidth: "2", markerEnd: "url(#arrowhead)" }, connection.id))), _jsx("defs", { children: _jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "rgba(255, 214, 0, 0.9)" }) }) })] }), canvasElements.length === 0 && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-3", children: [_jsx(Box, { className: "h-16 w-16 mx-auto text-hive-text-mutedLight opacity-40" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: "Start Building Your Tool" }), _jsx("p", { className: "text-sm text-hive-text-mutedLight", children: "Drag elements from the palette to create your custom tool, then connect them to power your workflows." }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-hive-text-mutedLight", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsx("span", { children: "Preview to simulate data flow" })] })] }) }))] }) })] }), _jsxs("div", { className: "h-8 bg-hive-background-tertiary border-t border-hive-border-default flex items-center justify-between px-4 text-xs text-hive-text-mutedLight", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { children: ["Canvas: ", canvasSize.width, " \u00D7 ", canvasSize.height] }), _jsxs("span", { children: ["Elements: ", canvasElements.length] }), _jsxs("span", { children: ["Connections: ", connections.length] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [isConnecting && (_jsxs("div", { className: "flex items-center space-x-2 text-hive-brand-primary", children: [_jsx(Link, { className: "h-3 w-3" }), _jsx("span", { children: "Click target element to connect" })] })), _jsxs("span", { children: ["Zoom: ", Math.round(zoom * 100), "%"] }), _jsxs("span", { children: ["User: ", userId] })] })] })] }));
}
//# sourceMappingURL=visual-tool-composer.js.map