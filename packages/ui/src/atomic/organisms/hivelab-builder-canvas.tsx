"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Button } from "../atoms/button"
import { Play, Trash2, Copy, ZoomIn, ZoomOut } from "lucide-react"
import type { Element } from "./hivelab-element-library"

export interface CanvasElement extends Element {
  x: number
  y: number
  canvasId: string
  connections?: { to: string; fromPort: string; toPort: string }[]
}

export interface HiveLabBuilderCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elements placed on canvas */
  elements?: CanvasElement[]

  /** Element added to canvas */
  onElementAdd?: (element: CanvasElement) => void

  /** Element removed from canvas */
  onElementRemove?: (canvasId: string) => void

  /** Element moved */
  onElementMove?: (canvasId: string, x: number, y: number) => void

  /** Element selected */
  onElementSelect?: (canvasId: string | null) => void

  /** Selected element ID */
  selectedElementId?: string | null

  /** Test mode handler */
  onTestTool?: () => void

  /** Clear canvas */
  onClearCanvas?: () => void

  /** Tool name */
  toolName?: string
}

const HiveLabBuilderCanvas = React.forwardRef<HTMLDivElement, HiveLabBuilderCanvasProps>(
  (
    {
      className,
      elements = [],
      onElementAdd,
      onElementRemove,
      onElementMove,
      onElementSelect,
      selectedElementId,
      onTestTool,
      onClearCanvas,
      toolName = "Untitled Tool",
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLDivElement>(null)
    const [zoom, setZoom] = React.useState(100)
    const [isDraggingElement, setIsDraggingElement] = React.useState<string | null>(null)
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })

    // Handle drop from element library
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const element = JSON.parse(e.dataTransfer.getData("application/json")) as Element

      const canvasElement: CanvasElement = {
        ...element,
        canvasId: `${element.id}-${Date.now()}`,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      onElementAdd?.(canvasElement)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
    }

    // Handle element dragging on canvas
    const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
      e.stopPropagation()
      const element = elements.find((el) => el.canvasId === elementId)
      if (!element) return

      setIsDraggingElement(elementId)
      setDragOffset({
        x: e.clientX - element.x,
        y: e.clientY - element.y,
      })
      onElementSelect?.(elementId)
    }

    React.useEffect(() => {
      if (!isDraggingElement) return

      const handleMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()

        onElementMove?.(
          isDraggingElement,
          e.clientX - rect.left - dragOffset.x,
          e.clientY - rect.top - dragOffset.y
        )
      }

      const handleMouseUp = () => {
        setIsDraggingElement(null)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isDraggingElement, dragOffset, onElementMove])

    return (
      <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-white/8 bg-white/5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">{toolName}</h3>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Copy className="h-3 w-3 mr-1" />
              Rename
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {/* Zoom Controls */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-white/70 w-12 text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setZoom(Math.min(200, zoom + 10))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-white/8 mx-2" />

            {/* Test Button */}
            <Button
              variant="default"
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={onTestTool}
            >
              <Play className="h-3 w-3 mr-1.5" />
              Test Tool
            </Button>

            {/* Clear Canvas */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-red-500 hover:text-red-500"
              onClick={onClearCanvas}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-white/5">
          <div
            ref={canvasRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => onElementSelect?.(null)}
            className="absolute inset-0 bg-dot-pattern"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
          >
            {/* Grid overlay for visual guidance */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Add subtle grid lines */}
            </div>

            {/* Placed Elements */}
            {elements.map((element) => (
              <div
                key={element.canvasId}
                onMouseDown={(e) => handleElementMouseDown(e, element.canvasId)}
                className={cn(
                  "absolute p-3 rounded-lg border-2 bg-[#0c0c0c] transition-all cursor-move",
                  "hover:border-[#FFD700]/50 hover:shadow-md",
                  selectedElementId === element.canvasId
                    ? "border-[#FFD700] shadow-lg ring-2 ring-[#FFD700]/20"
                    : "border-white/8"
                )}
                style={{
                  left: element.x,
                  top: element.y,
                  minWidth: "120px",
                }}
              >
                {/* Element Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{element.icon}</span>
                  <span className="text-xs font-medium text-white">{element.name}</span>
                </div>

                {/* Ports (connection points) */}
                <div className="flex justify-between items-center mt-2">
                  {/* Input Port */}
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0c0c0c] -ml-6" />

                  {/* Output Port */}
                  <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-[#0c0c0c] -mr-6 ml-auto" />
                </div>
              </div>
            ))}

            {/* Empty State */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-center p-12">
                <div>
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Start Building Your Tool
                  </h3>
                  <p className="text-sm text-white/70 max-w-md">
                    Drag elements from the library on the left to build your custom tool.
                    Connect them together to create data flows.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-3 py-2 border-t border-white/8 bg-white/5 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-4">
            <span>{elements.length} elements</span>
            <span>0 connections</span>
          </div>
          <div>
            Click and drag to move elements • Drag from library to add
          </div>
        </div>
      </Card>
    )
  }
)

HiveLabBuilderCanvas.displayName = "HiveLabBuilderCanvas"

export { HiveLabBuilderCanvas }
