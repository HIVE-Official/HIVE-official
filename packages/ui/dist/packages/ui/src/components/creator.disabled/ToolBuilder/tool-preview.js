"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { Button } from "../../../index";
import { Card } from "../../ui/card";
import { Play, Pause, RotateCcw, Settings, ExternalLink, Monitor, Tablet, Smartphone, Maximize2, Share } from "lucide-react";
import { cn } from "../../../lib/utils";
const DeviceFrame = ({ deviceMode, children }) => {
    const getFrameStyles = () => {
        switch (deviceMode) {
            case "mobile":
                return "w-[375px] h-[667px] mx-auto bg-[var(--hive-background-primary)] rounded-[2.5rem] p-2";
            case "tablet":
                return "w-[192] h-[256] mx-auto bg-gray-800 rounded-[1.5rem] p-3";
            default:
                return "w-full h-full";
        }
    };
    const getScreenStyles = () => {
        switch (deviceMode) {
            case "mobile":
                return "w-full h-full bg-[var(--hive-text-primary)] rounded-[2rem] overflow-hidden";
            case "tablet":
                return "w-full h-full bg-[var(--hive-text-primary)] rounded-[1rem] overflow-hidden";
            default:
                return "w-full h-full bg-[var(--hive-text-primary)] overflow-hidden";
        }
    };
    return (_jsx("div", { className: getFrameStyles(), children: _jsx("div", { className: getScreenStyles(), children: children }) }));
};
const ElementRenderer = ({ instance, element, isPreview = true }) => {
    // Render based on element type
    const renderElement = () => {
        switch (element.id) {
            case 'text':
                return (_jsx("div", { className: "p-2", style: {
                        fontSize: instance.config.fontSize || '16px',
                        color: instance.config.color || 'var(--hive-background-primary)',
                        fontWeight: instance.config.fontWeight || 'normal',
                    }, children: instance.config.content || element.name }));
            case 'button':
                return (_jsx(Button, { variant: instance.config.variant || 'default', size: instance.config.size || 'default', className: instance.config.className, disabled: !isPreview, children: instance.config.label || 'Button' }));
            case 'input':
                return (_jsxs("div", { className: "space-y-2", children: [instance.config.label && (_jsx("label", { className: "text-sm font-medium", children: instance.config.label })), _jsx("input", { type: instance.config.type || 'text', placeholder: instance.config.placeholder || '', className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: !isPreview })] }));
            case 'image':
                return (_jsx("div", { className: "relative", children: instance.config.src ? (_jsx("img", { src: instance.config.src, alt: instance.config.alt || 'Image', className: "w-full h-auto rounded-md", style: {
                            maxWidth: instance.config.maxWidth || '100%',
                            maxHeight: instance.config.maxHeight || 'auto',
                        } })) : (_jsx("div", { className: "w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500", children: "No image selected" })) }));
            case 'container':
                return (_jsxs("div", { className: cn("border border-dashed border-gray-300 rounded-md min-h-[100px]", instance.config.className), style: {
                        padding: instance.config.padding || '16px',
                        backgroundColor: instance.config.backgroundColor || 'transparent',
                    }, children: [instance.config.title && (_jsx("h3", { className: "text-lg font-semibold mb-2", children: instance.config.title })), _jsx("div", { className: "text-gray-500 text-sm", children: "Container - Drop elements here" })] }));
            default:
                return (_jsxs("div", { className: "p-4 bg-gray-100 rounded-md border border-gray-300", children: [_jsx("div", { className: "text-sm font-medium", children: element.name }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Element type: ", element.id] })] }));
        }
    };
    return (_jsx("div", { className: cn("absolute", instance.isVisible ? "block" : "hidden"), style: {
            left: instance.position.x,
            top: instance.position.y,
            width: instance.position.width,
            height: instance.position.height,
            zIndex: instance.order,
        }, children: renderElement() }));
};
export const ToolPreview = ({ tool, elements, className, onShare, onSettings, }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [deviceMode, setDeviceMode] = useState("desktop");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleStart = useCallback(() => {
        setIsRunning(true);
    }, []);
    const handleStop = useCallback(() => {
        setIsRunning(false);
    }, []);
    const handleReset = useCallback(() => {
        setIsRunning(false);
        // Reset any form data or state
    }, []);
    const handleFullscreen = useCallback(() => {
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);
    return (_jsxs("div", { className: cn("flex flex-col h-full bg-background", className), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b bg-muted/50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("h3", { className: "font-semibold", children: ["Preview: ", tool.name] }), _jsx("span", { className: cn("px-2 py-1 text-xs rounded-full", isRunning ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"), children: isRunning ? "Running" : "Stopped" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-1 border rounded-md", children: [_jsx(Button, { variant: deviceMode === "desktop" ? "default" : "ghost", size: "sm", onClick: () => setDeviceMode("desktop"), children: _jsx(Monitor, { className: "h-4 w-4" }) }), _jsx(Button, { variant: deviceMode === "tablet" ? "default" : "ghost", size: "sm", onClick: () => setDeviceMode("tablet"), children: _jsx(Tablet, { className: "h-4 w-4" }) }), _jsx(Button, { variant: deviceMode === "mobile" ? "default" : "ghost", size: "sm", onClick: () => setDeviceMode("mobile"), children: _jsx(Smartphone, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: isRunning ? handleStop : handleStart, children: isRunning ? (_jsx(Pause, { className: "h-4 w-4" })) : (_jsx(Play, { className: "h-4 w-4" })) }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleReset, children: _jsx(RotateCcw, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleFullscreen, children: isFullscreen ? (_jsx(ExternalLink, { className: "h-4 w-4" })) : (_jsx(Maximize2, { className: "h-4 w-4" })) })] }), _jsxs("div", { className: "flex items-center gap-1 border-l pl-2 ml-2", children: [onShare && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onShare, children: [_jsx(Share, { className: "h-4 w-4 mr-2" }), "Share"] })), onSettings && (_jsx(Button, { variant: "outline", size: "sm", onClick: onSettings, children: _jsx(Settings, { className: "h-4 w-4" }) }))] })] })] }), _jsx("div", { className: "flex-1 overflow-auto bg-gray-50", children: isFullscreen ? (
                // Fullscreen mode
                _jsx("div", { className: "fixed inset-0 z-50 bg-[var(--hive-text-primary)]", children: _jsxs("div", { className: "h-full", children: [_jsxs("div", { className: "h-16 bg-gray-900 flex items-center justify-between px-4", children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-semibold", children: tool.name }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsFullscreen(false), className: "text-[var(--hive-text-primary)] hover:bg-gray-800", children: _jsx(ExternalLink, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "h-[calc(100vh-4rem)] relative", children: tool.elements.map((instance) => {
                                    const element = elements.get(instance.elementId);
                                    if (!element)
                                        return null;
                                    return (_jsx(ElementRenderer, { instance: instance, element: element, isPreview: isRunning }, instance.id));
                                }) })] }) })) : (
                // Normal preview mode
                _jsx("div", { className: "p-8 h-full", children: _jsx(DeviceFrame, { deviceMode: deviceMode, children: _jsx("div", { className: "relative h-full overflow-auto", children: tool.elements.length > 0 ? (_jsx(_Fragment, { children: tool.elements.map((instance) => {
                                    const element = elements.get(instance.elementId);
                                    if (!element)
                                        return null;
                                    return (_jsx(ElementRenderer, { instance: instance, element: element, isPreview: isRunning }, instance.id));
                                }) })) : (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsxs(Card, { className: "p-8 text-center max-w-md", children: [_jsx(Play, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No Elements" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Add some elements to your tool to see the preview." }), _jsx(Button, { variant: "outline", onClick: () => window.location.hash = "#design", children: "Go to Design Mode" })] }) })) }) }) })) }), _jsx("div", { className: "p-2 border-t bg-muted/50 text-xs text-muted-foreground", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: [tool.elements.length, " elements"] }), _jsxs("span", { children: ["Version ", tool.currentVersion] }), _jsx("span", { className: "capitalize", children: tool.status })] }), _jsxs("div", { children: ["Device: ", deviceMode, " | ", isRunning ? "Interactive" : "Static"] })] }) })] }));
};
export default ToolPreview;
//# sourceMappingURL=tool-preview.js.map