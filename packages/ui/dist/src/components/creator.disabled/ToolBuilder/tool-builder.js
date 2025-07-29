"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef, useEffect, useMemo, } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cn } from "../../../lib/utils.js";
import { Button } from "../../../index.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs.js";
import { ElementLibrary } from "./element-library.js";
import { UnifiedDesignCanvas } from "./unified-design-canvas.js";
import { PropertiesPanel } from './properties-panel.js';
import { JsonViewer } from './json-viewer.js';
import { TemplateMode } from './template-mode.js';
import { WizardMode } from './wizard-mode.js';
import { ToolPreview } from './tool-preview.js';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "../../ui/resizable.js";
import { Eye, Code, Settings, Save, Play, Share, Undo, Redo, Grid, Smartphone, Monitor, Tablet, Rocket, } from "lucide-react";
export const ToolBuilder = ({ tool, elements, onSave, onPreview, onPublish, onShare, onDeploy, className, mode = "visual", onModeChange, }) => {
    const [currentTool, setCurrentTool] = useState(tool);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [viewMode, setViewMode] = useState("design");
    const [deviceMode, setDeviceMode] = useState("desktop");
    const [builderMode, setBuilderMode] = useState(mode);
    const [isDirty, setIsDirty] = useState(false);
    // const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [history, setHistory] = useState([tool]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const canvasRef = useRef(null);
    const elementsMap = useMemo(() => new Map(elements.map((el) => [el.id, el])), [elements]);
    // Auto-save functionality
    useEffect(() => {
        if (!isDirty)
            return;
        const performAutoSave = async () => {
            try {
                await onSave(currentTool);
                setIsDirty(false);
            }
            catch (error) {
                console.error("Auto-save failed:", error);
            }
        };
        const autoSaveTimer = setTimeout(() => {
            void performAutoSave();
        }, 2000); // Auto-save after 2 seconds of inactivity
        return () => clearTimeout(autoSaveTimer);
    }, [currentTool, isDirty, onSave]);
    // History management
    const addToHistory = useCallback((newTool) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newTool);
        // Limit history to 50 entries
        if (newHistory.length > 50) {
            newHistory.shift();
        }
        else {
            setHistoryIndex(historyIndex + 1);
        }
        setHistory(newHistory);
    }, [history, historyIndex]);
    const updateTool = useCallback((updater) => {
        const newTool = updater(currentTool);
        setCurrentTool(newTool);
        setIsDirty(true);
        addToHistory(newTool);
    }, [currentTool, addToHistory]);
    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentTool(history[newIndex]);
            setIsDirty(true);
        }
    }, [history, historyIndex]);
    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentTool(history[newIndex]);
            setIsDirty(true);
        }
    }, [history, historyIndex]);
    // Element management
    const addElement = useCallback((elementId, position) => {
        const elementDef = elementsMap.get(elementId);
        if (!elementDef)
            return;
        const newInstance = {
            id: `${elementId}_${Date.now()}`,
            elementId,
            config: elementDef.defaultConfig,
            position,
            order: currentTool.elements.length,
            isVisible: true,
            isLocked: false,
        };
        updateTool((tool) => ({
            ...tool,
            elements: [...tool.elements, newInstance],
        }));
    }, [elementsMap, currentTool.elements.length, updateTool]);
    const updateElement = useCallback((elementId, updates) => {
        updateTool((tool) => ({
            ...tool,
            elements: tool.elements.map((el) => el.id === elementId ? { ...el, ...updates } : el),
        }));
    }, [updateTool]);
    const deleteElement = useCallback((elementId) => {
        updateTool((tool) => ({
            ...tool,
            elements: tool.elements.filter((el) => el.id !== elementId),
        }));
        if (selectedElementId === elementId) {
            setSelectedElementId(null);
        }
    }, [updateTool, selectedElementId]);
    const duplicateElement = useCallback((elementId) => {
        const element = currentTool.elements.find((el) => el.id === elementId);
        if (!element)
            return;
        const newInstance = {
            ...element,
            id: `${element.elementId}_${Date.now()}`,
            position: {
                x: element.position.x + 20,
                y: element.position.y + 20,
                width: element.position.width,
                height: element.position.height,
            },
            order: currentTool.elements.length,
        };
        updateTool((tool) => ({
            ...tool,
            elements: [...tool.elements, newInstance],
        }));
    }, [currentTool.elements, updateTool]);
    // Save handlers
    const handleSave = async () => {
        if (!isDirty)
            return;
        setIsSaving(true);
        try {
            await onSave(currentTool);
            setIsDirty(false);
        }
        catch (error) {
            console.error("Save failed:", error);
        }
        finally {
            setIsSaving(false);
        }
    };
    const handlePreview = () => {
        onPreview(currentTool);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _onPublish = useCallback(async () => {
        try {
            await onPublish(currentTool);
        }
        catch (error) {
            console.error("Publish failed:", error);
        }
    }, [onPublish, currentTool]);
    // const selectedElement = selectedElementId
    //   ? currentTool.elements.find((el) => el.id === selectedElementId)
    //   : null;
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsxs("div", { className: cn("flex flex-col h-screen bg-background", className), children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b bg-background", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-lg font-semibold", children: currentTool.name }), isDirty && (_jsx("span", { className: "text-sm text-muted-foreground", children: "(Unsaved)" }))] }), _jsx("div", { className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1", children: ["visual", "template", "wizard"].map((modeOption) => (_jsx(Button, { variant: builderMode === modeOption ? "primary" : "ghost", size: "sm", onClick: () => {
                                            setBuilderMode(modeOption);
                                            onModeChange?.(modeOption);
                                        }, className: "h-7 px-3 text-xs", children: modeOption.charAt(0).toUpperCase() + modeOption.slice(1) }, modeOption))) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => void handleSave(), disabled: isSaving, children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), isSaving ? "Saving..." : "Save"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handlePreview, children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), "Preview"] }), onDeploy && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                                        // Simple deployment to user's profile
                                        onDeploy(currentTool, {
                                            deployTo: 'profile',
                                            targetId: 'current-user', // This should be the actual user ID
                                            permissions: {
                                                canInteract: true,
                                                canView: true,
                                            },
                                            settings: {
                                                showInDirectory: true,
                                                allowSharing: true,
                                            }
                                        });
                                    }, children: [_jsx(Rocket, { className: "h-4 w-4 mr-2" }), "Deploy"] })), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => onShare(currentTool), children: [_jsx(Share, { className: "h-4 w-4 mr-2" }), "Share"] })] })] }), _jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b bg-muted/50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: undo, disabled: !canUndo, children: _jsx(Undo, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: redo, disabled: !canRedo, children: _jsx(Redo, { className: "h-4 w-4" }) }), _jsx("div", { className: "w-px h-6 bg-border mx-2" }), _jsx(Tabs, { value: viewMode, onValueChange: (value) => setViewMode(value), children: _jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsxs(TabsTrigger, { value: "design", className: "flex items-center gap-2", children: [_jsx(Grid, { className: "h-4 w-4" }), "Design"] }), _jsxs(TabsTrigger, { value: "preview", className: "flex items-center gap-2", children: [_jsx(Eye, { className: "h-4 w-4" }), "Preview"] }), _jsxs(TabsTrigger, { value: "code", className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-4 w-4" }), "Code"] })] }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [viewMode === "design" && (_jsx(_Fragment, { children: _jsxs("div", { className: "flex items-center gap-1 border rounded-md", children: [_jsx(Button, { variant: deviceMode === "desktop" ? "primary" : "ghost", size: "sm", onClick: () => setDeviceMode("desktop"), children: _jsx(Monitor, { className: "h-4 w-4" }) }), _jsx(Button, { variant: deviceMode === "tablet" ? "primary" : "ghost", size: "sm", onClick: () => setDeviceMode("tablet"), children: _jsx(Tablet, { className: "h-4 w-4" }) }), _jsx(Button, { variant: deviceMode === "mobile" ? "primary" : "ghost", size: "sm", onClick: () => setDeviceMode("mobile"), children: _jsx(Smartphone, { className: "h-4 w-4" }) })] }) })), _jsxs(Button, { variant: "outline", size: "sm", onClick: handlePreview, children: [_jsx(Play, { className: "h-4 w-4 mr-2" }), "Test"] })] })] }), _jsxs("div", { className: "flex-1 overflow-hidden", children: [builderMode === "template" && (_jsx(TemplateMode, { onSelectTemplate: (template) => {
                                // Create a new tool based on template
                                const newTool = {
                                    ...currentTool,
                                    name: template.name,
                                    description: template.description,
                                    metadata: {
                                        ...currentTool.metadata,
                                        category: template.category,
                                    },
                                };
                                setCurrentTool(newTool);
                                addToHistory(newTool);
                                setIsDirty(true);
                                // Switch to visual mode after template selection
                                setBuilderMode("visual");
                                onModeChange?.("visual");
                            }, className: "h-full" })), builderMode === "wizard" && (_jsx(WizardMode, { onComplete: (toolConfig) => {
                                // Create a new tool based on wizard configuration
                                const newTool = {
                                    ...currentTool,
                                    ...toolConfig,
                                };
                                setCurrentTool(newTool);
                                addToHistory(newTool);
                                setIsDirty(true);
                                // Switch to visual mode after wizard completion
                                setBuilderMode("visual");
                                onModeChange?.("visual");
                            }, className: "h-full" })), builderMode === "visual" && (_jsxs(ResizablePanelGroup, { direction: "horizontal", children: [_jsx(ResizablePanel, { defaultSize: 20, minSize: 15, maxSize: 30, children: _jsx(ElementLibrary, { elements: elements, onElementSelect: addElement, searchQuery: "", selectedCategory: "all" }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 60, minSize: 40, children: _jsxs("div", { className: "h-full flex flex-col", children: [viewMode === "design" && (_jsx(UnifiedDesignCanvas, { ref: canvasRef, tool: currentTool, elements: elementsMap, selectedElementId: selectedElementId, deviceMode: deviceMode, mode: "full", onElementSelect: setSelectedElementId, onElementUpdate: updateElement, onElementDelete: deleteElement, onElementDuplicate: duplicateElement, onElementAdd: addElement })), viewMode === "preview" && (_jsx(ToolPreview, { tool: currentTool, elements: elementsMap, onShare: () => onShare(currentTool), onSettings: () => {
                                                    // Switch to properties panel
                                                    setViewMode("design");
                                                }, className: "h-full" })), viewMode === "code" && (_jsx(JsonViewer, { tool: currentTool, onImport: (importedTool) => {
                                                    setCurrentTool(importedTool);
                                                    addToHistory(importedTool);
                                                    setIsDirty(true);
                                                }, className: "h-full" }))] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 20, minSize: 15, maxSize: 30, children: _jsxs(Tabs, { defaultValue: "properties", className: "h-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsxs(TabsTrigger, { value: "properties", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Properties"] }), _jsxs(TabsTrigger, { value: "json", children: [_jsx(Code, { className: "h-4 w-4 mr-2" }), "JSON"] })] }), _jsx(TabsContent, { value: "properties", className: "h-full mt-0", children: _jsx(PropertiesPanel, { selectedInstance: selectedElementId ? currentTool.elements.find(el => el.id === selectedElementId) || null : null, element: selectedElementId ? elementsMap.get(currentTool.elements.find(el => el.id === selectedElementId)?.elementId || '') || null : null, onConfigChange: (instanceId, newConfig) => {
                                                        updateElement(instanceId, { config: newConfig });
                                                    }, onInstanceUpdate: updateElement, onDeleteInstance: deleteElement, onDuplicateInstance: duplicateElement, className: "h-full" }) }), _jsx(TabsContent, { value: "json", className: "h-full mt-0", children: _jsx(JsonViewer, { tool: currentTool, onImport: (importedTool) => {
                                                        setCurrentTool(importedTool);
                                                        addToHistory(importedTool);
                                                        setIsDirty(true);
                                                    }, className: "h-full" }) })] }) })] }))] }), _jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-t bg-muted/50 text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: [currentTool.elements.length, " elements"] }), _jsxs("span", { children: ["Version ", currentTool.currentVersion] }), _jsx("span", { className: cn("capitalize", currentTool.status === "published" && "text-green-600", currentTool.status === "preview" && "text-yellow-600", currentTool.status === "draft" && "text-gray-600"), children: currentTool.status })] }), _jsxs("div", { className: "flex items-center gap-4", children: [isDirty && (_jsx("span", { className: "text-yellow-600", children: "Unsaved changes" })), isSaving && _jsx("span", { className: "text-blue-600", children: "Saving..." }), _jsxs("span", { children: ["Last saved: ", new Date(currentTool.updatedAt).toLocaleTimeString()] })] })] })] }) }));
};
export default ToolBuilder;
//# sourceMappingURL=tool-builder.js.map