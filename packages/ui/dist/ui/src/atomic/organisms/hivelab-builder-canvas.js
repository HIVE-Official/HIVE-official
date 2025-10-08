"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Card } from "../atoms/card.js";
import { Button } from "../atoms/button.js";
import { Play, Trash2, Copy, ZoomIn, ZoomOut } from "lucide-react";
const HiveLabBuilderCanvas = React.forwardRef(({ className, elements = [], onElementAdd, onElementRemove, onElementMove, onElementSelect, selectedElementId, onTestTool, onClearCanvas, toolName = "Untitled Tool", ...props }, ref) => {
    const canvasRef = React.useRef(null);
    const [zoom, setZoom] = React.useState(100);
    const [isDraggingElement, setIsDraggingElement] = React.useState(null);
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
    // Handle drop from element library
    const handleDrop = (e) => {
        e.preventDefault();
        if (!canvasRef.current)
            return;
        const rect = canvasRef.current.getBoundingClientRect();
        const element = JSON.parse(e.dataTransfer.getData("application/json"));
        const canvasElement = {
            ...element,
            canvasId: `${element.id}-${Date.now()}`,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        onElementAdd?.(canvasElement);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };
    // Handle element dragging on canvas
    const handleElementMouseDown = (e, elementId) => {
        e.stopPropagation();
        const element = elements.find((el) => el.canvasId === elementId);
        if (!element)
            return;
        setIsDraggingElement(elementId);
        setDragOffset({
            x: e.clientX - element.x,
            y: e.clientY - element.y,
        });
        onElementSelect?.(elementId);
    };
    React.useEffect(() => {
        if (!isDraggingElement)
            return;
        const handleMouseMove = (e) => {
            if (!canvasRef.current)
                return;
            const rect = canvasRef.current.getBoundingClientRect();
            onElementMove?.(isDraggingElement, e.clientX - rect.left - dragOffset.x, e.clientY - rect.top - dragOffset.y);
        };
        const handleMouseUp = () => {
            setIsDraggingElement(null);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDraggingElement, dragOffset, onElementMove]);
    return (_jsxs(Card, { ref: ref, className: cn("flex flex-col h-full", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between p-3 border-b border-white/8 bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: toolName }), _jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 px-2 text-xs", children: [_jsx(Copy, { className: "h-3 w-3 mr-1" }), "Rename"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-7 w-7 p-0", onClick: () => setZoom(Math.max(50, zoom - 10)), children: _jsx(ZoomOut, { className: "h-4 w-4" }) }), _jsxs("span", { className: "text-xs text-white/70 w-12 text-center", children: [zoom, "%"] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-7 w-7 p-0", onClick: () => setZoom(Math.min(200, zoom + 10)), children: _jsx(ZoomIn, { className: "h-4 w-4" }) }), _jsx("div", { className: "w-px h-6 bg-white/8 mx-2" }), _jsxs(Button, { variant: "default", size: "sm", className: "h-7 px-3 text-xs", onClick: onTestTool, children: [_jsx(Play, { className: "h-3 w-3 mr-1.5" }), "Test Tool"] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 px-2 text-xs text-red-500 hover:text-red-500", onClick: onClearCanvas, children: [_jsx(Trash2, { className: "h-3 w-3 mr-1" }), "Clear"] })] })] }), _jsx("div", { className: "flex-1 relative overflow-hidden bg-white/5", children: _jsxs("div", { ref: canvasRef, onDrop: handleDrop, onDragOver: handleDragOver, onClick: () => onElementSelect?.(null), className: "absolute inset-0 bg-dot-pattern", style: { transform: `scale(${zoom / 100})`, transformOrigin: "top left" }, children: [_jsx("div", { className: "absolute inset-0 pointer-events-none" }), elements.map((element) => (_jsxs("div", { onMouseDown: (e) => handleElementMouseDown(e, element.canvasId), className: cn("absolute p-3 rounded-lg border-2 bg-[#0c0c0c] transition-all cursor-move", "hover:border-[#FFD700]/50 hover:shadow-md", selectedElementId === element.canvasId
                                ? "border-[#FFD700] shadow-lg ring-2 ring-[#FFD700]/20"
                                : "border-white/8"), style: {
                                left: element.x,
                                top: element.y,
                                minWidth: "120px",
                            }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-xl", children: element.icon }), _jsx("span", { className: "text-xs font-medium text-white", children: element.name })] }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0c0c0c] -ml-6" }), _jsx("div", { className: "w-3 h-3 rounded-full bg-green-500 border-2 border-[#0c0c0c] -mr-6 ml-auto" })] })] }, element.canvasId))), elements.length === 0 && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center text-center p-12", children: _jsxs("div", { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFA8" }), _jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: "Start Building Your Tool" }), _jsx("p", { className: "text-sm text-white/70 max-w-md", children: "Drag elements from the library on the left to build your custom tool. Connect them together to create data flows." })] }) }))] }) }), _jsxs("div", { className: "px-3 py-2 border-t border-white/8 bg-white/5 flex items-center justify-between text-xs text-white/70", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: [elements.length, " elements"] }), _jsx("span", { children: "0 connections" })] }), _jsx("div", { children: "Click and drag to move elements \u2022 Drag from library to add" })] })] }));
});
HiveLabBuilderCanvas.displayName = "HiveLabBuilderCanvas";
export { HiveLabBuilderCanvas };
//# sourceMappingURL=hivelab-builder-canvas.js.map