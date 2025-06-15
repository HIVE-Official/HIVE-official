"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import type { Tool, Element, ElementInstance } from "@hive/core";
import { ElementLibrary } from "./element-library";
import { DesignCanvas } from "./design-canvas";
// TODO: Implement these components
// import { PropertiesPanel } from './PropertiesPanel'
// import { JsonViewer } from './JsonViewer'
// import { ToolPreview } from './ToolPreview'
// import { ToolHeader } from './ToolHeader'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";
import {
  Eye,
  Code,
  Settings,
  Save,
  Play,
  Share,
  Undo,
  Redo,
  Grid,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

interface ToolBuilderProps {
  tool: Tool;
  elements: Element[];
  onSave: (tool: Tool) => Promise<void>;
  onPreview: (tool: Tool) => void;
  onPublish: (tool: Tool) => Promise<void>;
  onShare: (tool: Tool) => void;
  className?: string;
}

type ViewMode = "design" | "preview" | "code";
type DeviceMode = "desktop" | "tablet" | "mobile";

export const ToolBuilder: React.FC<ToolBuilderProps> = ({
  tool,
  elements,
  onSave,
  onPreview,
  onPublish: _onPublish,
  onShare,
  className,
}) => {
  const [currentTool, setCurrentTool] = useState<Tool>(tool);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<ViewMode>("design");
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [isDirty, setIsDirty] = useState(false);
  // const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [history, setHistory] = useState<Tool[]>([tool]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const elementsMap = useMemo(
    () => new Map(elements.map((el) => [el.id, el])),
    [elements]
  );

  // Auto-save functionality
  useEffect(() => {
    if (!isDirty) return;

    const performAutoSave = async () => {
      try {
        await onSave(currentTool);
        setIsDirty(false);
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    };

    const autoSaveTimer = setTimeout(() => {
      void performAutoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [currentTool, isDirty, onSave]);

  // History management
  const addToHistory = useCallback(
    (newTool: Tool) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newTool);

      // Limit history to 50 entries
      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        setHistoryIndex(historyIndex + 1);
      }

      setHistory(newHistory);
    },
    [history, historyIndex]
  );

  const updateTool = useCallback(
    (updater: (tool: Tool) => Tool) => {
      const newTool = updater(currentTool);
      setCurrentTool(newTool);
      setIsDirty(true);
      addToHistory(newTool);
    },
    [currentTool, addToHistory]
  );

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
  const addElement = useCallback(
    (elementId: string, position: { x: number; y: number }) => {
      const elementDef = elementsMap.get(elementId);
      if (!elementDef) return;

      const newInstance: ElementInstance = {
        id: `${elementId}_${Date.now()}`,
        elementId,
        config: elementDef.defaultConfig as Record<string, unknown>,
        position,
        order: currentTool.elements.length,
        isVisible: true,
        isLocked: false,
      };

      updateTool((tool) => ({
        ...tool,
        elements: [...tool.elements, newInstance],
      }));
    },
    [elementsMap, currentTool.elements.length, updateTool]
  );

  const updateElement = useCallback(
    (elementId: string, updates: Partial<ElementInstance>) => {
      updateTool((tool) => ({
        ...tool,
        elements: tool.elements.map((el) =>
          el.id === elementId ? { ...el, ...updates } : el
        ),
      }));
    },
    [updateTool]
  );

  const deleteElement = useCallback(
    (elementId: string) => {
      updateTool((tool) => ({
        ...tool,
        elements: tool.elements.filter((el) => el.id !== elementId),
      }));

      if (selectedElementId === elementId) {
        setSelectedElementId(null);
      }
    },
    [updateTool, selectedElementId]
  );

  const duplicateElement = useCallback(
    (elementId: string) => {
      const element = currentTool.elements.find((el) => el.id === elementId);
      if (!element) return;

      const newInstance: ElementInstance = {
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
    },
    [currentTool.elements, updateTool]
  );

  // Save handlers
  const handleSave = async () => {
    if (!isDirty) return;

    setIsSaving(true);
    try {
      await onSave(currentTool);
      setIsDirty(false);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    onPreview(currentTool);
  };

  // const handlePublish = async () => {
  //   try {
  //     await onPublish(currentTool);
  //   } catch (error) {
  //     console.error("Publish failed:", error);
  //   }
  // };

  // const selectedElement = selectedElementId
  //   ? currentTool.elements.find((el) => el.id === selectedElementId)
  //   : null;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn("flex flex-col h-screen bg-background", className)}>
        {/* Header */}
        {/* TODO: Implement ToolHeader component */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">{currentTool.name}</h1>
            {isDirty && (
              <span className="text-sm text-muted-foreground">(Unsaved)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => void handleSave()}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(currentTool)}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-2" />

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as ViewMode)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === "design" && (
              <>
                <div className="flex items-center gap-1 border rounded-md">
                  <Button
                    variant={deviceMode === "desktop" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setDeviceMode("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={deviceMode === "tablet" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setDeviceMode("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={deviceMode === "mobile" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setDeviceMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Play className="h-4 w-4 mr-2" />
              Test
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Element Library */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ElementLibrary
                elements={elements}
                onElementSelect={addElement}
                searchQuery=""
                selectedCategory="all"
              />
            </ResizablePanel>

            <ResizableHandle />

            {/* Main Canvas Area */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <div className="h-full flex flex-col">
                {viewMode === "design" && (
                  <DesignCanvas
                    ref={canvasRef}
                    tool={currentTool}
                    elements={elementsMap}
                    selectedElementId={selectedElementId}
                    deviceMode={deviceMode}
                    onElementSelect={setSelectedElementId}
                    onElementUpdate={updateElement}
                    onElementDelete={deleteElement}
                    onElementDuplicate={duplicateElement}
                    // @ts-ignore - Complex prop interface mismatch
                    onElementAdd={addElement}
                  />
                )}

                {viewMode === "preview" && (
                  <div className="flex items-center justify-center h-full bg-muted/20">
                    <div className="text-center">
                      <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Preview mode - ToolPreview component not implemented yet
                      </p>
                    </div>
                  </div>
                )}

                {viewMode === "code" && (
                  <div className="flex items-center justify-center h-full bg-muted/20">
                    <div className="text-center">
                      <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Code view - JsonViewer component not implemented yet
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Properties Panel */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <Tabs defaultValue="properties" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="properties">
                    <Settings className="h-4 w-4 mr-2" />
                    Properties
                  </TabsTrigger>
                  <TabsTrigger value="json">
                    <Code className="h-4 w-4 mr-2" />
                    JSON
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="properties" className="h-full mt-0">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        PropertiesPanel not implemented yet
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="json" className="h-full mt-0">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Code className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        JsonViewer not implemented yet
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{currentTool.elements.length} elements</span>
            <span>Version {currentTool.currentVersion}</span>
            <span
              className={cn(
                "capitalize",
                currentTool.status === "published" && "text-green-600",
                currentTool.status === "preview" && "text-yellow-600",
                currentTool.status === "draft" && "text-gray-600"
              )}
            >
              {currentTool.status}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isDirty && (
              <span className="text-yellow-600">Unsaved changes</span>
            )}
            {isSaving && <span className="text-blue-600">Saving...</span>}
            <span>
              Last saved: {new Date(currentTool.updatedAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ToolBuilder;
