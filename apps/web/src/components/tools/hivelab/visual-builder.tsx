"use client";

import React, { useState, useCallback, useRef } from 'react';
import { logger } from '@/lib/logger';

import { 
  Tool, 
  Element, 
  ComposedElement, 
  ToolComposition,
  ToolType,
  ToolCategory
} from '@hive/core/domain/tools';
import { HIVE_ELEMENTS } from '@hive/core/domain/tools/element-registry';
import { Card, Button, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import { 
  Plus, 
  Save, 
  Play, 
  Eye, 
  Settings2, 
  Layers, 
  Grid3x3,
  Type,
  Calendar,
  ToggleLeft,
  Image,
  BarChart,
  Table,
  MousePointer,
  Link2,
  Timer,
  GitBranch,
  Calculator,
  Box,
  Trash2,
  Copy,
  Move,
  ChevronRight,
  Palette,
  Layout
} from 'lucide-react';
import { ElementRenderer } from '../element-renderers';
import { ToolExecutor } from '../tool-executor';
import { v4 as uuidv4 } from 'uuid';

interface HiveLabBuilderProps {
  initialTool?: Tool;
  onSave?: (tool: Tool) => Promise<void>;
  onPublish?: (tool: Tool) => Promise<void>;
  className?: string;
}

interface DraggedElement {
  element?: Element;
  composedElement?: ComposedElement;
  sourceIndex?: number;
}

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  'text-input': <Type className="h-4 w-4" />,
  'number-input': <Calculator className="h-4 w-4" />,
  'date-picker': <Calendar className="h-4 w-4" />,
  'dropdown': <ChevronRight className="h-4 w-4" />,
  'checkbox': <ToggleLeft className="h-4 w-4" />,
  'file-upload': <Image className="h-4 w-4" />,
  'display-text': <Type className="h-4 w-4" />,
  'display-image': <Image className="h-4 w-4" />,
  'display-chart': <BarChart className="h-4 w-4" />,
  'display-table': <Table className="h-4 w-4" />,
  'button': <MousePointer className="h-4 w-4" />,
  'link': <Link2 className="h-4 w-4" />,
  'timer': <Timer className="h-4 w-4" />,
  'condition': <GitBranch className="h-4 w-4" />,
  'calculation': <Calculator className="h-4 w-4" />,
  'container': <Box className="h-4 w-4" />,
  'grid': <Grid3x3 className="h-4 w-4" />,
  'tabs': <Layout className="h-4 w-4" />
};

export function HiveLabBuilder({
  initialTool,
  onSave,
  onPublish,
  className = ''
}: HiveLabBuilderProps) {
  // Tool state
  const [tool, setTool] = useState<Tool>(initialTool || {
    id: uuidv4(),
    name: 'New Tool',
    description: '',
    type: 'utility' as ToolType,
    category: 'productivity' as ToolCategory,
    visibility: 'private',
    composition: {
      elements: [],
      connections: []
    },
    creator: {
      id: 'current-user',
      name: 'You'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  // UI state
  const [selectedElement, setSelectedElement] = useState<ComposedElement | null>(null);
  const [draggedElement, setDraggedElement] = useState<DraggedElement | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('design');
  const [saving, setSaving] = useState(false);
  
  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Add element to composition
  const addElement = useCallback((element: Element, parentId?: string) => {
    const newComposedElement: ComposedElement = {
      instanceId: uuidv4(),
      elementId: element.id,
      config: {
        label: element.name,
        ...element.defaultConfig
      }
    };
    
    setTool(prev => ({
      ...prev,
      composition: {
        ...prev.composition,
        elements: [...prev.composition.elements, newComposedElement]
      },
      updatedAt: new Date()
    }));
    
    setSelectedElement(newComposedElement);
  }, []);
  
  // Remove element from composition
  const removeElement = useCallback((instanceId: string) => {
    setTool(prev => ({
      ...prev,
      composition: {
        ...prev.composition,
        elements: prev.composition.elements.filter(el => el.instanceId !== instanceId),
        connections: prev.composition.connections?.filter(
          conn => conn.from !== instanceId && conn.to !== instanceId
        )
      },
      updatedAt: new Date()
    }));
    
    if (selectedElement?.instanceId === instanceId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);
  
  // Update element config
  const updateElementConfig = useCallback((instanceId: string, config: any) => {
    setTool(prev => ({
      ...prev,
      composition: {
        ...prev.composition,
        elements: prev.composition.elements.map(el =>
          el.instanceId === instanceId
            ? { ...el, config: { ...el.config, ...config } }
            : el
        )
      },
      updatedAt: new Date()
    }));
  }, []);
  
  // Duplicate element
  const duplicateElement = useCallback((element: ComposedElement) => {
    const newElement: ComposedElement = {
      ...element,
      instanceId: uuidv4(),
      config: { ...element.config }
    };
    
    setTool(prev => ({
      ...prev,
      composition: {
        ...prev.composition,
        elements: [...prev.composition.elements, newElement]
      },
      updatedAt: new Date()
    }));
    
    setSelectedElement(newElement);
  }, []);
  
  // Reorder elements
  const reorderElements = useCallback((fromIndex: number, toIndex: number) => {
    setTool(prev => {
      const elements = [...prev.composition.elements];
      const [removed] = elements.splice(fromIndex, 1);
      elements.splice(toIndex, 0, removed);
      
      return {
        ...prev,
        composition: {
          ...prev.composition,
          elements
        },
        updatedAt: new Date()
      };
    });
  }, []);
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, item: DraggedElement) => {
    setDraggedElement(item);
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    if (draggedElement.element) {
      // Adding new element from palette
      addElement(draggedElement.element);
    } else if (draggedElement.composedElement && draggedElement.sourceIndex !== undefined) {
      // Reordering existing element
      if (targetIndex !== undefined && targetIndex !== draggedElement.sourceIndex) {
        reorderElements(draggedElement.sourceIndex, targetIndex);
      }
    }
    
    setDraggedElement(null);
  };
  
  // Save tool
  const handleSave = async () => {
    if (!onSave) return;
    
    setSaving(true);
    try {
      await onSave(tool);
    } catch (error) {
      logger.error('Error saving tool:', { error: String(error) });
    } finally {
      setSaving(false);
    }
  };
  
  // Render element palette
  const renderElementPalette = () => {
    const categories = {
      input: HIVE_ELEMENTS.filter(el => el.category === 'input'),
      display: HIVE_ELEMENTS.filter(el => el.category === 'display'),
      action: HIVE_ELEMENTS.filter(el => el.category === 'action'),
      logic: HIVE_ELEMENTS.filter(el => el.category === 'logic'),
      layout: HIVE_ELEMENTS.filter(el => el.category === 'layout')
    };
    
    return (
      <div className="space-y-4">
        {Object.entries(categories).map(([category, elements]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {elements.map(element => (
                <div
                  key={element.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, { element })}
                  className="p-2 bg-white dark:bg-gray-800 border rounded-lg cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    {ELEMENT_ICONS[element.type]}
                    <span className="text-xs">{element.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render canvas
  const renderCanvas = () => {
    if (tool.composition.elements.length === 0) {
      return (
        <div 
          className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-8"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center text-gray-500">
            <Box className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Start building your tool</p>
            <p className="text-sm">Drag elements from the palette to get started</p>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        ref={canvasRef}
        className="flex-1 bg-white dark:bg-gray-900 border rounded-lg p-6 space-y-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tool.composition.elements.map((element, index) => {
          const elementDef = HIVE_ELEMENTS.find(el => el.id === element.elementId);
          if (!elementDef) return null;
          
          return (
            <div
              key={element.instanceId}
              draggable
              onDragStart={(e) => handleDragStart(e, { composedElement: element, sourceIndex: index })}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => setSelectedElement(element)}
              className={`relative group p-3 border-2 rounded-lg transition-all ${
                selectedElement?.instanceId === element.instanceId
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              {/* Element Controls */}
              <div className="absolute -top-3 right-2 hidden group-hover:flex gap-1 bg-white dark:bg-gray-800 rounded shadow-md">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateElement(element);
                  }}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <Copy className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeElement(element.instanceId);
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              
              {/* Element Renderer */}
              <ElementRenderer
                element={element}
                elementDef={elementDef}
                isBuilder={true}
                isPreview={false}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render properties panel
  const renderPropertiesPanel = () => {
    if (!selectedElement) {
      return (
        <div className="text-center text-gray-500 py-8">
          <Settings2 className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Select an element to configure</p>
        </div>
      );
    }
    
    const elementDef = HIVE_ELEMENTS.find(el => el.id === selectedElement.elementId);
    if (!elementDef) return null;
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            {ELEMENT_ICONS[elementDef.type]}
            {elementDef.name}
          </h3>
        </div>
        
        {/* Basic Properties */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Label</label>
            <Input
              value={selectedElement.config.label || ''}
              onChange={(e) => updateElementConfig(selectedElement.instanceId, { label: e.target.value })}
              placeholder="Element label"
            />
          </div>
          
          {elementDef.type === 'text-input' && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Placeholder</label>
                <Input
                  value={selectedElement.config.placeholder || ''}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { placeholder: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedElement.config.required || false}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { required: e.target.checked })}
                />
                <label className="text-sm">Required field</label>
              </div>
            </>
          )}
          
          {elementDef.type === 'button' && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Button Text</label>
                <Input
                  value={selectedElement.config.text || ''}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { text: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Variant</label>
                <select
                  value={selectedElement.config.variant || 'default'}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { variant: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="default">Default</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                </select>
              </div>
            </>
          )}
          
          {elementDef.type === 'container' && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Layout</label>
                <select
                  value={selectedElement.config.layout || 'vertical'}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { layout: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="wrap">Wrap</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Padding</label>
                <select
                  value={selectedElement.config.padding || 'medium'}
                  onChange={(e) => updateElementConfig(selectedElement.instanceId, { padding: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className={`hivelab-builder h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              value={tool.name}
              onChange={(e) => setTool(prev => ({ ...prev, name: e.target.value }))}
              className="text-lg font-semibold"
              placeholder="Tool Name"
            />
            <Button
              size="sm"
              variant={isPreviewMode ? 'default' : 'outline'}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
            {onPublish && (
              <Button onClick={() => onPublish(tool)}>
                Publish
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {isPreviewMode ? (
          <div className="flex-1 p-6 overflow-auto">
            <ToolExecutor
              tool={tool}
              isPreview={true}
            />
          </div>
        ) : (
          <>
            {/* Left Panel - Element Palette */}
            <div className="w-64 border-r p-4 overflow-auto">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Elements
              </h3>
              {renderElementPalette()}
            </div>
            
            {/* Center - Canvas */}
            <div className="flex-1 p-6 overflow-auto">
              {renderCanvas()}
            </div>
            
            {/* Right Panel - Properties */}
            <div className="w-80 border-l p-4 overflow-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="design">
                  {renderPropertiesPanel()}
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <textarea
                        value={tool.description || ''}
                        onChange={(e) => setTool(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        rows={3}
                        placeholder="Describe what this tool does..."
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <select
                        value={tool.category}
                        onChange={(e) => setTool(prev => ({ ...prev, category: e.target.value as ToolCategory }))}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="productivity">Productivity</option>
                        <option value="social">Social</option>
                        <option value="academic">Academic</option>
                        <option value="utility">Utility</option>
                        <option value="entertainment">Entertainment</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Visibility</label>
                      <select
                        value={tool.visibility}
                        onChange={(e) => setTool(prev => ({ ...prev, visibility: e.target.value as any }))}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                        <option value="unlisted">Unlisted</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </div>
  );
}