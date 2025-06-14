import React, { forwardRef, useCallback, useState, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { cn } from '@/lib/utils'
import { Tool, ElementInstance } from '@hive/core/domain/creation/tool'
import { Element } from '@hive/core/domain/creation/element'
import { ElementRenderer } from './ElementRenderer'
import { SelectionBox } from './SelectionBox'
import { ContextMenu } from './ContextMenu'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Grid3X3, 
  Move, 
  Copy, 
  Trash2, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  RotateCcw
} from 'lucide-react'

interface DesignCanvasProps {
  tool: Tool
  elements: Map<string, Element>
  selectedElementId: string | null
  deviceMode: 'desktop' | 'tablet' | 'mobile'
  onElementSelect: (elementId: string | null) => void
  onElementUpdate: (elementId: string, updates: Partial<ElementInstance>) => void
  onElementDelete: (elementId: string) => void
  onElementDuplicate: (elementId: string) => void
  onElementAdd: (elementId: string, position: { x: number; y: number }) => void
  className?: string
}

interface DragItem {
  elementId: string
  elementType: string
}

interface DropResult {
  position: { x: number; y: number }
}

const DEVICE_DIMENSIONS = {
  desktop: { width: '100%', height: '100%', maxWidth: 'none' },
  tablet: { width: '768px', height: '1024px', maxWidth: '768px' },
  mobile: { width: '375px', height: '667px', maxWidth: '375px' },
}

const GRID_SIZE = 8

export const DesignCanvas = forwardRef<HTMLDivElement, DesignCanvasProps>(({
  tool,
  elements,
  selectedElementId,
  deviceMode,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementDuplicate,
  onElementAdd,
  className
}, ref) => {
  const [showGrid, setShowGrid] = useState(true)
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    elementId: string | null
  } | null>(null)
  
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(ref as any)

  // Drop zone for new elements
  const [{ isOver, canDrop }, drop] = useDrop<DragItem, DropResult, { isOver: boolean; canDrop: boolean }>(() => ({
    accept: 'element',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const position = {
        x: Math.max(0, clientOffset.x - canvasRect.left),
        y: Math.max(0, clientOffset.y - canvasRect.top),
      }

      // Snap to grid
      const snappedPosition = {
        x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
      }

      return { position: snappedPosition }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  // Combine refs
  const combinedRef = useCallback((node: HTMLDivElement) => {
    canvasRef.current = node
    drop(node)
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [drop, ref])

  // Element interaction handlers
  const handleElementClick = useCallback((elementId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    onElementSelect(elementId)
  }, [onElementSelect])

  const handleElementDoubleClick = useCallback((elementId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // Enter edit mode for text elements
    const element = tool.elements.find(el => el.id === elementId)
    if (element && elements.get(element.elementId)?.type === 'textBlock') {
      // TODO: Implement inline text editing
    }
  }, [tool.elements, elements])

  const handleElementDrag = useCallback((elementId: string, newPosition: { x: number; y: number }) => {
    // Snap to grid
    const snappedPosition = {
      x: Math.round(newPosition.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(newPosition.y / GRID_SIZE) * GRID_SIZE,
    }
    
    onElementUpdate(elementId, { position: snappedPosition })
  }, [onElementUpdate])

  const handleElementResize = useCallback((elementId: string, newSize: { width: number; height: number }) => {
    onElementUpdate(elementId, { 
      position: { 
        ...tool.elements.find(el => el.id === elementId)?.position!,
        width: newSize.width,
        height: newSize.height
      }
    })
  }, [onElementUpdate, tool.elements])

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onElementSelect(null)
      setContextMenu(null)
    }
  }, [onElementSelect])

  const handleContextMenu = useCallback((event: React.MouseEvent, elementId?: string) => {
    event.preventDefault()
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      elementId: elementId || null
    })
  }, [])

  const handleContextMenuAction = useCallback((action: string, elementId?: string) => {
    if (!elementId && action !== 'paste') return

    switch (action) {
      case 'duplicate':
        if (elementId) onElementDuplicate(elementId)
        break
      case 'delete':
        if (elementId) onElementDelete(elementId)
        break
      case 'lock':
        if (elementId) {
          const element = tool.elements.find(el => el.id === elementId)
          onElementUpdate(elementId, { isLocked: !element?.isLocked })
        }
        break
      case 'hide':
        if (elementId) {
          const element = tool.elements.find(el => el.id === elementId)
          onElementUpdate(elementId, { isVisible: !element?.isVisible })
        }
        break
      case 'reset':
        if (elementId) {
          const element = tool.elements.find(el => el.id === elementId)
          const elementDef = element ? elements.get(element.elementId) : null
          if (element && elementDef) {
            onElementUpdate(elementId, { config: elementDef.defaultConfig })
          }
        }
        break
    }
    setContextMenu(null)
  }, [tool.elements, elements, onElementUpdate, onElementDuplicate, onElementDelete])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedElementId) return

      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          event.preventDefault()
          onElementDelete(selectedElementId)
          break
        case 'd':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            onElementDuplicate(selectedElementId)
          }
          break
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          event.preventDefault()
          const element = tool.elements.find(el => el.id === selectedElementId)
          if (element && !element.isLocked) {
            const step = event.shiftKey ? GRID_SIZE * 4 : GRID_SIZE
            const newPosition = { ...element.position }
            
            switch (event.key) {
              case 'ArrowUp':
                newPosition.y = Math.max(0, newPosition.y - step)
                break
              case 'ArrowDown':
                newPosition.y += step
                break
              case 'ArrowLeft':
                newPosition.x = Math.max(0, newPosition.x - step)
                break
              case 'ArrowRight':
                newPosition.x += step
                break
            }
            
            onElementUpdate(selectedElementId, { position: newPosition })
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedElementId, tool.elements, onElementUpdate, onElementDelete, onElementDuplicate])

  const deviceDimensions = DEVICE_DIMENSIONS[deviceMode]
  const sortedElements = [...tool.elements].sort((a, b) => a.order - b.order)

  return (
    <div className={cn('flex-1 overflow-hidden bg-muted/30', className)} ref={containerRef}>
      {/* Canvas Controls */}
      <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button
            variant={showGrid ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {deviceMode === 'desktop' ? 'Desktop' : deviceMode === 'tablet' ? 'Tablet (768px)' : 'Mobile (375px)'}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{tool.elements.length} elements</span>
          {selectedElementId && (
            <span>• Selected: {tool.elements.find(el => el.id === selectedElementId)?.elementId}</span>
          )}
        </div>
      </div>

      {/* Canvas Container */}
      <ScrollArea className="h-full">
        <div className="flex items-center justify-center min-h-full p-8">
          <div
            className={cn(
              'relative bg-background border shadow-lg',
              deviceMode === 'mobile' && 'rounded-[2.5rem] border-8 border-gray-800',
              deviceMode === 'tablet' && 'rounded-xl',
              deviceMode === 'desktop' && 'rounded-lg'
            )}
            style={{
              width: deviceDimensions.width,
              height: deviceMode === 'desktop' ? '800px' : deviceDimensions.height,
              maxWidth: deviceDimensions.maxWidth,
              minHeight: '600px',
            }}
          >
            {/* Canvas */}
            <div
              ref={combinedRef}
              className={cn(
                'relative w-full h-full overflow-hidden',
                deviceMode === 'mobile' && 'rounded-[1.75rem]',
                deviceMode === 'tablet' && 'rounded-lg',
                deviceMode === 'desktop' && 'rounded-md',
                showGrid && 'bg-grid-pattern',
                isOver && canDrop && 'bg-primary/5 border-primary border-dashed'
              )}
              onClick={handleCanvasClick}
              onContextMenu={(e) => handleContextMenu(e)}
              style={{
                backgroundImage: showGrid ? 
                  `radial-gradient(circle, #e5e7eb 1px, transparent 1px)` : 
                  undefined,
                backgroundSize: showGrid ? `${GRID_SIZE}px ${GRID_SIZE}px` : undefined,
              }}
            >
              {/* Drop Zone Indicator */}
              {isOver && canDrop && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary rounded-md">
                  <div className="text-primary font-medium">Drop element here</div>
                </div>
              )}

              {/* Elements */}
              {sortedElements.map((elementInstance) => {
                const elementDef = elements.get(elementInstance.elementId)
                if (!elementDef || !elementInstance.isVisible) return null

                return (
                  <div
                    key={elementInstance.id}
                    className={cn(
                      'absolute',
                      elementInstance.isLocked && 'pointer-events-none opacity-75'
                    )}
                    style={{
                      left: elementInstance.position.x,
                      top: elementInstance.position.y,
                      width: elementInstance.position.width || 'auto',
                      height: elementInstance.position.height || 'auto',
                      zIndex: elementInstance.order,
                    }}
                    onClick={(e) => handleElementClick(elementInstance.id, e)}
                    onDoubleClick={(e) => handleElementDoubleClick(elementInstance.id, e)}
                    onContextMenu={(e) => handleContextMenu(e, elementInstance.id)}
                  >
                    <ElementRenderer
                      elementInstance={elementInstance}
                      elementDefinition={elementDef}
                      isSelected={selectedElementId === elementInstance.id}
                      isPreview={false}
                      onDrag={(newPosition) => handleElementDrag(elementInstance.id, newPosition)}
                      onResize={(newSize) => handleElementResize(elementInstance.id, newSize)}
                    />

                    {/* Selection Box */}
                    {selectedElementId === elementInstance.id && (
                      <SelectionBox
                        element={elementInstance}
                        onMove={(newPosition) => handleElementDrag(elementInstance.id, newPosition)}
                        onResize={(newSize) => handleElementResize(elementInstance.id, newSize)}
                        isLocked={elementInstance.isLocked}
                      />
                    )}

                    {/* Lock Indicator */}
                    {elementInstance.isLocked && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
                        <Lock className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Empty State */}
              {tool.elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Move className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-medium mb-2">Start building your tool</h3>
                    <p className="text-sm">Drag elements from the library or click to add them</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          elementId={contextMenu.elementId}
          element={contextMenu.elementId ? tool.elements.find(el => el.id === contextMenu.elementId) : undefined}
          onAction={handleContextMenuAction}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
})

DesignCanvas.displayName = 'DesignCanvas'

export default DesignCanvas 