"use client";

import React, {
  forwardRef,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDrop } from "react-dnd";
import { cn } from "../../../lib/utils";
import type { Tool, Element, ElementInstance } from "@hive/core";
// TODO: Implement these components
// import { ElementRenderer } from './ElementRenderer'
// import { SelectionBox } from './SelectionBox'
// import { ContextMenu } from './ContextMenu'
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { Grid3X3, Move } from "lucide-react";

interface DesignCanvasProps {
  tool: Tool;
  elements: Map<string, Element>;
  selectedElementId: string | null;
  deviceMode: "desktop" | "tablet" | "mobile";
  onElementSelect: (elementId: string | null) => void;
  onElementUpdate: (
    elementId: string,
    updates: Partial<ElementInstance>
  ) => void;
  onElementDelete: (elementId: string) => void;
  onElementDuplicate: (elementId: string) => void;
  _onElementAdd: (
    elementId: string,
    position: { x: number; y: number }
  ) => void;
  className?: string;
}

interface DragItem {
  elementId: string;
  elementType: string;
}

interface DropResult {
  position: { x: number; y: number };
}

const DEVICE_DIMENSIONS = {
  desktop: { width: "100%", height: "100%", maxWidth: "none" },
  tablet: { width: "768px", height: "1024px", maxWidth: "768px" },
  mobile: { width: "375px", height: "667px", maxWidth: "375px" },
};

const GRID_SIZE = 10;

const getClipboardData = (): string | null => {
  // For now, return null since clipboard API needs async handling
  return null;
};

export const DesignCanvas = forwardRef<HTMLDivElement, DesignCanvasProps>(
  (
    {
      tool,
      elements,
      selectedElementId,
      deviceMode,
      onElementSelect,
      onElementUpdate,
      onElementDelete,
      onElementDuplicate,
      _onElementAdd,
      className,
    },
    ref
  ) => {
    const [showGrid, setShowGrid] = useState(true);
    // const [_draggedElement, _setDraggedElement] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{
      x: number;
      y: number;
      elementId: string | null;
    } | null>(null);

    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Drop zone for new elements
    const [{ isOver, canDrop }, drop] = useDrop<
      DragItem,
      DropResult,
      { isOver: boolean; canDrop: boolean }
    >(() => ({
      accept: "element",
      drop: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset || !canvasRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const position = {
          x: Math.max(0, clientOffset.x - canvasRect.left),
          y: Math.max(0, clientOffset.y - canvasRect.top),
        };

        // Snap to grid
        const snappedPosition = {
          x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
          y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
        };

        return { position: snappedPosition };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    // Combine refs
    const combinedRef = useCallback(
      (node: HTMLDivElement) => {
        // Use Object.defineProperty to set the ref value
        if (canvasRef) {
          Object.defineProperty(canvasRef, "current", {
            value: node,
            writable: true,
            configurable: true,
          });
        }
        drop(node);
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [drop, ref]
    );

    // Element interaction handlers
    const handleElementClick = useCallback(
      (elementId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        onElementSelect(elementId);
      },
      [onElementSelect]
    );

    const handleElementDoubleClick = useCallback(
      (elementId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        // Enter edit mode for text elements
        const element = tool.elements.find((el) => el.id === elementId);
        if (element && elements.get(element.elementId)?.type === "textBlock") {
          // TODO: Implement inline text editing
        }
      },
      [tool.elements, elements]
    );

    // const handleElementDrag = useCallback(
    //   (elementId: string, newPosition: { x: number; y: number }) => {
    //     // Snap to grid
    //     const snappedPosition = {
    //       x: Math.round(newPosition.x / GRID_SIZE) * GRID_SIZE,
    //       y: Math.round(newPosition.y / GRID_SIZE) * GRID_SIZE,
    //     };

    //     onElementUpdate(elementId, { position: snappedPosition });
    //   },
    //   [onElementUpdate]
    // );

    // const handleElementResize = useCallback(
    //   (elementId: string, newSize: { width: number; height: number }) => {
    //     const element = tool.elements.find((el) => el.id === elementId);
    //     if (!element?.position) return;

    //     onElementUpdate(elementId, {
    //       position: {
    //         ...element.position,
    //         width: newSize.width,
    //         height: newSize.height,
    //       },
    //     });
    //   },
    //   [onElementUpdate, tool.elements]
    // );

    const handleCanvasClick = useCallback(
      (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
          onElementSelect(null);
          setContextMenu(null);
        }
      },
      [onElementSelect]
    );

    const handleContextMenu = useCallback(
      (event: React.MouseEvent, elementId?: string) => {
        event.preventDefault();
        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          elementId: elementId || null,
        });
      },
      []
    );

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!selectedElementId) return;

        switch (event.key) {
          case "Delete":
          case "Backspace":
            event.preventDefault();
            onElementDelete(selectedElementId);
            break;
          case "d":
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault();
              onElementDuplicate(selectedElementId);
            }
            break;
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight": {
            event.preventDefault();
            const element = tool.elements.find(
              (el) => el.id === selectedElementId
            );
            if (element && !element.isLocked) {
              const step = event.shiftKey ? GRID_SIZE * 4 : GRID_SIZE;
              const newPosition = { ...element.position };

              switch (event.key) {
                case "ArrowUp":
                  newPosition.y = Math.max(0, newPosition.y - step);
                  break;
                case "ArrowDown":
                  newPosition.y += step;
                  break;
                case "ArrowLeft":
                  newPosition.x = Math.max(0, newPosition.x - step);
                  break;
                case "ArrowRight":
                  newPosition.x += step;
                  break;
              }

              onElementUpdate(selectedElementId, { position: newPosition });
            }
            break;
          }
          case "paste": {
            const clipboardData = getClipboardData();
            if (clipboardData) {
              console.log("Pasting:", clipboardData);
            }
            break;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      selectedElementId,
      tool.elements,
      onElementUpdate,
      onElementDelete,
      onElementDuplicate,
    ]);

    const deviceDimensions = DEVICE_DIMENSIONS[deviceMode];
    const sortedElements = [...tool.elements].sort((a, b) => a.order - b.order);

    return (
      <div
        className={cn("flex-1 overflow-hidden bg-muted/30", className)}
        ref={containerRef}
      >
        {/* Canvas Controls */}
        <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <Button
              variant={showGrid ? "primary" : "ghost"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>

            <div className="text-sm text-muted-foreground">
              {deviceMode === "desktop"
                ? "Desktop"
                : deviceMode === "tablet"
                  ? "Tablet (768px)"
                  : "Mobile (375px)"}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{tool.elements.length} elements</span>
            {selectedElementId && (
              <span>
                • Selected:{" "}
                {
                  tool.elements.find((el) => el.id === selectedElementId)
                    ?.elementId
                }
              </span>
            )}
          </div>
        </div>

        {/* Canvas Container */}
        <ScrollArea className="h-full">
          <div className="flex items-center justify-center min-h-full p-8">
            <div
              className={cn(
                "relative bg-background border shadow-lg",
                deviceMode === "mobile" &&
                  "rounded-[2.5rem] border-8 border-gray-800",
                deviceMode === "tablet" && "rounded-xl",
                deviceMode === "desktop" && "rounded-lg"
              )}
              style={{
                width: deviceDimensions.width,
                height:
                  deviceMode === "desktop" ? "800px" : deviceDimensions.height,
                maxWidth: deviceDimensions.maxWidth,
                minHeight: "600px",
              }}
            >
              {/* Canvas */}
              <div
                ref={combinedRef}
                className={cn(
                  "relative w-full h-full overflow-hidden",
                  deviceMode === "mobile" && "rounded-[1.75rem]",
                  deviceMode === "tablet" && "rounded-lg",
                  deviceMode === "desktop" && "rounded-md",
                  showGrid && "bg-grid-pattern",
                  isOver &&
                    canDrop &&
                    "bg-primary/5 border-primary border-dashed"
                )}
                onClick={handleCanvasClick}
                onContextMenu={(e) => handleContextMenu(e)}
                style={{
                  backgroundImage: showGrid
                    ? `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`
                    : undefined,
                  backgroundSize: showGrid
                    ? `${GRID_SIZE}px ${GRID_SIZE}px`
                    : undefined,
                }}
              >
                {/* Drop Zone Indicator */}
                {isOver && canDrop && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary rounded-md">
                    <div className="text-primary font-medium">
                      Drop element here
                    </div>
                  </div>
                )}

                {/* Elements */}
                {sortedElements.map((elementInstance) => {
                  const elementDef = elements.get(elementInstance.elementId);
                  if (!elementDef || !elementInstance.isVisible) return null;

                  return (
                    <div
                      key={elementInstance.id}
                      className={cn(
                        "absolute",
                        elementInstance.isLocked &&
                          "pointer-events-none opacity-75"
                      )}
                      style={{
                        left: elementInstance.position.x,
                        top: elementInstance.position.y,
                        width: elementInstance.position.width || "auto",
                        height: elementInstance.position.height || "auto",
                        zIndex: elementInstance.order,
                      }}
                      onClick={(e) => handleElementClick(elementInstance.id, e)}
                      onDoubleClick={(e) =>
                        handleElementDoubleClick(elementInstance.id, e)
                      }
                      onContextMenu={(e) =>
                        handleContextMenu(e, elementInstance.id)
                      }
                    >
                      {/* TODO: Implement ElementRenderer component */}
                      <div className="w-full h-full bg-muted border border-dashed border-muted-foreground/50 rounded flex items-center justify-center">
                        <div className="text-center text-sm text-muted-foreground">
                          <div className="font-medium">{elementDef.name}</div>
                          <div className="text-xs">{elementInstance.id}</div>
                        </div>
                      </div>

                      {/* TODO: Implement SelectionBox component */}
                      {selectedElementId === elementInstance.id && (
                        <div className="absolute inset-0 border-2 border-primary rounded pointer-events-none">
                          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      )}

                      {/* Lock Indicator */}
                      {elementInstance.isLocked && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1 text-xs">
                          🔒
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Empty State */}
                {tool.elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Move className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="font-medium mb-2">
                        Start building your tool
                      </h3>
                      <p className="text-sm">
                        Drag elements from the library or click to add them
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* TODO: Implement ContextMenu component */}
        {contextMenu && (
          <div
            className="fixed bg-background border rounded-md shadow-lg p-2 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <div className="text-sm text-muted-foreground">
              Context menu not implemented yet
            </div>
            <button
              className="text-xs text-primary hover:underline"
              onClick={() => setContextMenu(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
);

DesignCanvas.displayName = "DesignCanvas";

export default DesignCanvas;
