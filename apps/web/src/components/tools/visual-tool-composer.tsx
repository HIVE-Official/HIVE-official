"use client";

import { useState, useRef, useCallback } from 'react';
import {
  Card,
  Button,
  Input,
  Label,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription
} from '@hive/ui';
import {
  Plus,
  Search,
  Grid,
  Layers,
  Settings,
  Play,
  Save,
  Trash2,
  Copy,
  Link,
  Move,
  Resize,
  Eye,
  Code,
  Zap,
  Palette,
  Box,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { 
  ElementRegistry, 
  ToolComposition, 
  ElementDefinition, 
  initializeElementSystem 
} from '../../lib/element-system';

interface VisualToolComposerProps {
  onSave: (composition: ToolComposition) => Promise<void>;
  onPreview: (composition: ToolComposition) => void;
  onCancel: () => void;
  initialComposition?: ToolComposition;
  userId: string;
}

interface CanvasElement {
  id: string;
  elementId: string;
  instanceId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  config: Record<string, any>;
  isSelected: boolean;
}

interface Connection {
  id: string;
  from: { instanceId: string; output: string; x: number; y: number };
  to: { instanceId: string; input: string; x: number; y: number };
}

export function VisualToolComposer({
  onSave,
  onPreview,
  onCancel,
  initialComposition,
  userId
}: VisualToolComposerProps) {
  const [toolName, setToolName] = useState(initialComposition?.name || '');
  const [toolDescription, setToolDescription] = useState(initialComposition?.description || '');
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<{
    instanceId: string;
    output: string;
    x: number;
    y: number;
  } | null>(null);
  const [draggedElement, setDraggedElement] = useState<ElementDefinition | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [activeTab, setActiveTab] = useState('canvas');

  const canvasRef = useRef<HTMLDivElement>(null);
  const elementRegistry = useRef(ElementRegistry.getInstance());

  // Initialize element system
  useState(() => {
    initializeElementSystem();
  });

  const handleDragStart = (element: ElementDefinition) => {
    setDraggedElement(element);
  };

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const newElement: CanvasElement = {
      id: `element_${Date.now()}`,
      elementId: draggedElement.id,
      instanceId: `${draggedElement.id}_${Date.now()}`,
      position: { x: Math.max(0, x - 50), y: Math.max(0, y - 25) },
      size: { width: 200, height: 100 },
      config: { ...draggedElement.defaultConfig },
      isSelected: false
    };

    setCanvasElements(prev => [...prev, newElement]);
    setDraggedElement(null);
  }, [draggedElement, zoom]);

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleElementSelect = (elementId: string) => {
    setCanvasElements(prev => 
      prev.map(el => ({ ...el, isSelected: el.id === elementId }))
    );
    setSelectedElement(elementId);
  };

  const handleElementMove = (elementId: string, newPosition: { x: number; y: number }) => {
    setCanvasElements(prev =>
      prev.map(el => 
        el.id === elementId 
          ? { ...el, position: newPosition }
          : el
      )
    );
  };

  const handleElementResize = (elementId: string, newSize: { width: number; height: number }) => {
    setCanvasElements(prev =>
      prev.map(el => 
        el.id === elementId 
          ? { ...el, size: newSize }
          : el
      )
    );
  };

  const handleElementDelete = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    setConnections(prev => 
      prev.filter(conn => 
        conn.from.instanceId !== elementId && conn.to.instanceId !== elementId
      )
    );
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const handleConnectionStart = (instanceId: string, output: string, x: number, y: number) => {
    setIsConnecting(true);
    setConnectionStart({ instanceId, output, x, y });
  };

  const handleConnectionEnd = (instanceId: string, input: string, x: number, y: number) => {
    if (connectionStart && connectionStart.instanceId !== instanceId) {
      const newConnection: Connection = {
        id: `conn_${Date.now()}`,
        from: connectionStart,
        to: { instanceId, input, x, y }
      };
      setConnections(prev => [...prev, newConnection]);
    }
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const handleElementConfigChange = (elementId: string, newConfig: Record<string, any>) => {
    setCanvasElements(prev =>
      prev.map(el => 
        el.id === elementId 
          ? { ...el, config: { ...el.config, ...newConfig } }
          : el
      )
    );
  };

  const buildToolComposition = (): ToolComposition => {
    return {
      id: initialComposition?.id || `tool_${Date.now()}`,
      name: toolName,
      description: toolDescription,
      elements: canvasElements.map(canvasEl => ({
        elementId: canvasEl.elementId,
        instanceId: canvasEl.instanceId,
        config: canvasEl.config,
        position: canvasEl.position,
        size: canvasEl.size
      })),
      connections: connections.map(conn => ({
        from: { instanceId: conn.from.instanceId, output: conn.from.output },
        to: { instanceId: conn.to.instanceId, input: conn.to.input }
      })),
      layout: 'grid'
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

  const selectedCanvasElement = canvasElements.find(el => el.id === selectedElement);
  const selectedElementDef = selectedCanvasElement 
    ? elementRegistry.current.getElement(selectedCanvasElement.elementId)
    : null;

  const elementCategories = [
    { id: 'input', name: 'Input', icon: 'Type', color: 'text-blue-400' },
    { id: 'display', name: 'Display', icon: 'Eye', color: 'text-green-400' },
    { id: 'filter', name: 'Filter', icon: 'Filter', color: 'text-purple-400' },
    { id: 'action', name: 'Action', icon: 'Zap', color: 'text-orange-400' },
    { id: 'layout', name: 'Layout', icon: 'Grid', color: 'text-pink-400' }
  ];

  return (
    <div className="h-screen flex flex-col bg-hive-background-primary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-hive-border-default bg-hive-background-overlay">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Box className="h-6 w-6 text-hive-gold" />
            <h1 className="text-xl font-bold text-white">Tool Composer</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              value={toolName}
              onChange={(e: React.ChangeEvent) => setToolName(e.target.value)}
              placeholder="Tool name..."
              className="w-48"
            />
            <Badge variant="freshman">
              {canvasElements.length} elements
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            onClick={() => setShowGrid(!showGrid)}
            className={showGrid ? 'bg-hive-gold/20 border-hive-gold' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-1 bg-hive-background-tertiary rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              -
            </Button>
            <span className="text-sm text-white px-2">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              +
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={handlePreview}
            disabled={canvasElements.length === 0}
          >
            <Play className="h-4 w-4 mr-2" />
            Preview
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={!toolName.trim() || canvasElements.length === 0}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Tool
          </Button>
          
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Element Palette */}
        <div className="w-80 border-r border-hive-border-default bg-hive-background-overlay">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 m-2">
              <TabsTrigger value="elements">
                <Layers className="h-4 w-4 mr-2" />
                Elements
              </TabsTrigger>
              <TabsTrigger value="properties">
                <Settings className="h-4 w-4 mr-2" />
                Properties
              </TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="p-4 space-y-4">
              {elementCategories.map(category => {
                const elements = elementRegistry.current.getElementsByCategory(category.id);
                return (
                  <div key={category.id}>
                    <h3 className={`text-sm font-medium mb-2 ${category.color}`}>
                      {category.name} ({elements.length})
                    </h3>
                    <div className="space-y-2">
                      {elements.map(element => (
                        <div
                          key={element.id}
                          draggable
                          onDragStart={() => handleDragStart(element)}
                          className="p-3 bg-hive-background-tertiary rounded-lg cursor-move hover:bg-hive-background-secondary transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded flex items-center justify-center bg-hive-background-primary ${category.color}`}>
                              <span className="text-xs">📦</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">
                                {element.name}
                              </h4>
                              <p className="text-xs text-hive-text-mutedLight truncate">
                                {element.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="properties" className="p-4">
              {selectedCanvasElement && selectedElementDef ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {selectedElementDef.name}
                    </h3>
                    <p className="text-sm text-hive-text-mutedLight mb-4">
                      {selectedElementDef.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-white">Position</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          type="number"
                          value={selectedCanvasElement.position.x}
                          onChange={(e: React.ChangeEvent) => handleElementMove(selectedCanvasElement.id, {
                            x: parseInt(e.target.value) || 0,
                            y: selectedCanvasElement.position.y
                          })}
                          className="w-20"
                        />
                        <Input
                          type="number"
                          value={selectedCanvasElement.position.y}
                          onChange={(e: React.ChangeEvent) => handleElementMove(selectedCanvasElement.id, {
                            x: selectedCanvasElement.position.x,
                            y: parseInt(e.target.value) || 0
                          })}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Size</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          type="number"
                          value={selectedCanvasElement.size.width}
                          onChange={(e: React.ChangeEvent) => handleElementResize(selectedCanvasElement.id, {
                            width: parseInt(e.target.value) || 100,
                            height: selectedCanvasElement.size.height
                          })}
                          className="w-20"
                        />
                        <Input
                          type="number"
                          value={selectedCanvasElement.size.height}
                          onChange={(e: React.ChangeEvent) => handleElementResize(selectedCanvasElement.id, {
                            width: selectedCanvasElement.size.width,
                            height: parseInt(e.target.value) || 50
                          })}
                          className="w-20"
                        />
                      </div>
                    </div>

                    {Object.entries(selectedElementDef.configSchema).map(([key, schema]) => (
                      <div key={key}>
                        <Label className="text-white capitalize">{key}</Label>
                        {(schema as any).type === 'string' && (
                          <Input
                            value={selectedCanvasElement.config[key] || ''}
                            onChange={(e: React.ChangeEvent) => handleElementConfigChange(selectedCanvasElement.id, {
                              [key]: e.target.value
                            })}
                            className="mt-1"
                          />
                        )}
                        {(schema as any).type === 'boolean' && (
                          <div className="mt-1">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleElementConfigChange(selectedCanvasElement.id, {
                                [key]: !selectedCanvasElement.config[key]
                              })}
                              className={selectedCanvasElement.config[key] ? 'bg-green-500/20 border-green-500' : ''}
                            >
                              {selectedCanvasElement.config[key] ? 'True' : 'False'}
                            </Button>
                          </div>
                        )}
                        {(schema as any).type === 'number' && (
                          <Input
                            type="number"
                            value={selectedCanvasElement.config[key] || 0}
                            onChange={(e: React.ChangeEvent) => handleElementConfigChange(selectedCanvasElement.id, {
                              [key]: parseInt(e.target.value) || 0
                            })}
                            className="mt-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-hive-border-default">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleElementDelete(selectedCanvasElement.id)}
                      className="text-red-400 border-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Element
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto mb-3 text-hive-text-mutedLight opacity-50" />
                  <p className="text-hive-text-mutedLight">
                    Select an element to view its properties
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={canvasRef}
            className={`w-full h-full relative ${showGrid ? 'bg-grid-pattern' : ''}`}
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              backgroundSize: showGrid ? `${20 * zoom}px ${20 * zoom}px` : 'none'
            }}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onClick={() => setSelectedElement(null)}
          >
            {/* Canvas Elements */}
            {canvasElements.map(element => {
              const elementDef = elementRegistry.current.getElement(element.elementId);
              if (!elementDef) return null;

              return (
                <div
                  key={element.id}
                  className={`absolute bg-hive-background-overlay border-2 rounded-lg p-3 cursor-move ${
                    element.isSelected 
                      ? 'border-hive-gold shadow-lg shadow-hive-gold/20' 
                      : 'border-hive-border-default hover:border-hive-border-hover'
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.size.width,
                    height: element.size.height
                  }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleElementSelect(element.id);
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-hive-gold rounded flex items-center justify-center">
                      <span className="text-xs">📦</span>
                    </div>
                    <span className="text-sm font-medium text-white truncate">
                      {elementDef.name}
                    </span>
                  </div>
                  
                  <div className="text-xs text-hive-text-mutedLight">
                    {elementDef.description}
                  </div>

                  {/* Connection Points */}
                  <div className="absolute -right-2 top-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-y-1/2"
                       onClick={(e: React.MouseEvent) => {
                         e.stopPropagation();
                         handleConnectionStart(element.instanceId, 'output', element.position.x + element.size.width, element.position.y + element.size.height / 2);
                       }}>
                    <ArrowRight className="h-3 w-3 text-white m-0.5" />
                  </div>
                  
                  <div className="absolute -left-2 top-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer transform -translate-y-1/2"
                       onClick={(e: React.MouseEvent) => {
                         e.stopPropagation();
                         handleConnectionEnd(element.instanceId, 'input', element.position.x, element.position.y + element.size.height / 2);
                       }}>
                    <ArrowRight className="h-3 w-3 text-white m-0.5 rotate-180" />
                  </div>
                </div>
              );
            })}

            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map(connection => (
                <line
                  key={connection.id}
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke="#D4AF37"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              ))}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#D4AF37"
                  />
                </marker>
              </defs>
            </svg>

            {/* Empty State */}
            {canvasElements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Box className="h-16 w-16 mx-auto mb-4 text-hive-text-mutedLight opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Start Building Your Tool
                  </h3>
                  <p className="text-hive-text-mutedLight mb-4">
                    Drag elements from the palette to create your custom tool
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-hive-text-mutedLight">
                    <span>💡 Tip: Connect elements to create data flow</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-hive-background-tertiary border-t border-hive-border-default flex items-center justify-between px-4 text-xs text-hive-text-mutedLight">
        <div className="flex items-center space-x-4">
          <span>Canvas: {canvasSize.width} × {canvasSize.height}</span>
          <span>Elements: {canvasElements.length}</span>
          <span>Connections: {connections.length}</span>
        </div>
        <div className="flex items-center space-x-4">
          {isConnecting && (
            <div className="flex items-center space-x-2 text-hive-gold">
              <Link className="h-3 w-3" />
              <span>Click target element to connect</span>
            </div>
          )}
          <span>Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
}