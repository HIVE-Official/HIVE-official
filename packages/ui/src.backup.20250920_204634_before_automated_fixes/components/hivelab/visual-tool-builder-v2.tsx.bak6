"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiveCard, HiveButton, HiveInput, HiveTextarea, HiveBadge } from '../index';
import { Plus, Grip, Settings, Eye, Play, Save, Share, Trash2, Type, Square, Image, ToggleLeft, Hash, Calendar, Clock, Star, CheckSquare } from 'lucide-react';
import { cn } from '../lib/utils';

// Visual Component Types - What students actually understand
interface VisualComponent {
  id: string;
  type: 'text' | 'button' | 'input' | 'textarea' | 'image' | 'checkbox' | 'select' | 'number' | 'date' | 'timer' | 'rating' | 'toggle' | 'divider' | 'heading' | 'card';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  defaultValue?: any;
  style?: {
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  };
  position: { x: number; y: number };
  width: number;
  height: number;
}

interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  components: VisualComponent[];
  actions: ToolAction[];
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

interface ToolAction {
  id: string;
  trigger: string; // component ID that triggers this action
  type: 'calculate' | 'save' | 'share' | 'redirect' | 'show_message';
  config: any;
}

// Component Palette - Visual library students can understand
const COMPONENT_PALETTE = [
  { type: 'heading', icon: Type, label: 'Heading', description: 'Title text for your tool' },
  { type: 'text', icon: Type, label: 'Text', description: 'Display text to users' },
  { type: 'input', icon: Square, label: 'Text Input', description: 'Let users type text' },
  { type: 'textarea', icon: Square, label: 'Long Text', description: 'Multi-line text input' },
  { type: 'button', icon: Square, label: 'Button', description: 'Clickable action button' },
  { type: 'number', icon: Hash, label: 'Number', description: 'Number input field' },
  { type: 'select', icon: Square, label: 'Dropdown', description: 'Choose from options' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Yes/no option' },
  { type: 'toggle', icon: ToggleLeft, label: 'Toggle', description: 'On/off switch' },
  { type: 'date', icon: Calendar, label: 'Date Picker', description: 'Select a date' },
  { type: 'timer', icon: Clock, label: 'Timer', description: 'Countdown timer' },
  { type: 'rating', icon: Star, label: 'Rating', description: 'Star rating system' },
  { type: 'image', icon: Image, label: 'Image', description: 'Display pictures' },
  { type: 'card', icon: Square, label: 'Card', description: 'Container for content' },
  { type: 'divider', icon: Square, label: 'Divider', description: 'Visual separator' },
] as const;

// Draggable Component from Palette
function PaletteItem({ component }: { component: typeof COMPONENT_PALETTE[0] }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${component.type}`,
    data: { type: 'palette-item', componentType: component.type }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200",
        "hover:border-amber-300 hover:shadow-sm cursor-grab active:cursor-grabbing",
        "transition-all duration-150"
      )}
    >
      <component.icon className="w-5 h-5 text-amber-600" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{component.label}</p>
        <p className="text-xs text-gray-500 truncate">{component.description}</p>
      </div>
    </div>
  );
}

// Canvas Component - Where students build
function CanvasComponent({ component, isSelected, onSelect, onUpdate, onDelete }: {
  component: VisualComponent;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<VisualComponent>) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: component.id,
    data: { type: 'canvas-component', component }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'heading':
        return (
          <h2 className={cn(
            "font-bold text-gray-900",
            component.style?.size === 'sm' && "text-lg",
            component.style?.size === 'md' && "text-xl",
            component.style?.size === 'lg' && "text-2xl",
            !component.style?.size && "text-xl"
          )}>
            {component.label || 'Your Heading'}
          </h2>
        );
      case 'text':
        return <p className="text-gray-700">{component.label || 'Your text content'}</p>;
      case 'input':
        return <HiveInput placeholder={component.placeholder || 'Enter text...'} className="w-full" />;
      case 'textarea':
        return <HiveTextarea placeholder={component.placeholder || 'Enter long text...'} className="w-full" />;
      case 'button':
        return (
          <HiveButton variant={component.style?.variant || 'default'} size={component.style?.size || 'md'}>
            {component.label || 'Button'}
          </HiveButton>
        );
      case 'number':
        return <HiveInput type="number" placeholder="0" className="w-full" />;
      case 'checkbox':
        return (
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span>{component.label || 'Checkbox option'}</span>
          </label>
        );
      case 'select':
        return (
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option>Choose an option...</option>
            {component.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'divider':
        return <hr className="border-gray-300 w-full" />;
      case 'card':
        return (
          <HiveCard className="p-4 min-h-[80px] border-dashed border-gray-300">
            <p className="text-gray-500 text-center">Card content goes here</p>
          </HiveCard>
        );
      default:
        return <div className="p-2 bg-gray-100 rounded text-sm">{component.type}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={cn(
        "relative group p-2 rounded-lg border-2 transition-all",
        isSelected ? "border-amber-400 bg-amber-50" : "border-transparent hover:border-gray-200",
        "cursor-pointer"
      )}
    >
      {/* Drag Handle */}
      <div
        {...listeners}
        {...attributes}
        className={cn(
          "absolute -top-2 -left-2 w-6 h-6 bg-amber-500 rounded-full",
          "flex items-center justify-center cursor-grab active:cursor-grabbing",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        <Grip className="w-3 h-3 text-white" />
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className={cn(
          "absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full",
          "flex items-center justify-center",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        <Trash2 className="w-3 h-3 text-white" />
      </button>

      {/* Component Content */}
      <div className="pointer-events-none">
        {renderComponent()}
      </div>
    </div>
  );
}

// Property Panel - Simple settings students can understand
function PropertyPanel({ component, onUpdate }: {
  component: VisualComponent | null;
  onUpdate: (updates: Partial<VisualComponent>) => void;
}) {
  if (!component) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Settings className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-amber-600" />
        <h3 className="font-semibold">Component Settings</h3>
      </div>

      {/* Label/Content */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {component.type === 'text' || component.type === 'heading' ? 'Content' : 'Label'}
        </label>
        <HiveInput
          value={component.label || ''}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="Enter text..."
        />
      </div>

      {/* Placeholder for inputs */}
      {(['input', 'textarea', 'number'].includes(component.type)) && (
        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <HiveInput
            value={component.placeholder || ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Hint text..."
          />
        </div>
      )}

      {/* Options for select */}
      {component.type === 'select' && (
        <div>
          <label className="block text-sm font-medium mb-1">Options (one per line)</label>
          <HiveTextarea
            value={component.options?.join('\n') || ''}
            onChange={(e) => onUpdate({ options: e.target.value.split('\n').filter(Boolean) })}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
            rows={4}
          />
        </div>
      )}

      {/* Style Options */}
      {(['button', 'heading'].includes(component.type)) && (
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            value={component.style?.size || 'md'}
            onChange={(e) => onUpdate({ 
              style: { ...component.style, size: e.target.value as 'sm' | 'md' | 'lg' }
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
      )}

      {/* Required checkbox */}
      {(['input', 'textarea', 'number', 'select'].includes(component.type)) && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={component.required || false}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span className="text-sm">Required field</span>
        </label>
      )}
    </div>
  );
}

// Main Visual Tool Builder
export function VisualToolBuilderV2() {
  const [tool, setTool] = useState<ToolDefinition>({
    id: 'new-tool',
    name: 'My New Tool',
    description: 'A tool to help students',
    components: [],
    actions: [],
    theme: {
      primaryColor: '#D4AF37',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937'
    }
  });

  const [selectedComponent, setSelectedComponent] = useState<VisualComponent | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<'build' | 'preview'>('build');

  // Canvas drop zone
  const { setNodeRef: setCanvasRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Adding new component from palette
    if (active.data.current?.type === 'palette-item' && over.id === 'canvas') {
      const componentType = active.data.current.componentType;
      const newComponent: VisualComponent = {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        label: COMPONENT_PALETTE.find(c => c.type === componentType)?.label || '',
        position: { x: 50, y: tool.components.length * 80 + 50 },
        width: 200,
        height: 60,
        style: { size: 'md', variant: 'default' }
      };

      setTool(prev => ({
        ...prev,
        components: [...prev.components, newComponent]
      }));
      setSelectedComponent(newComponent);
    }
  };

  const updateComponent = useCallback((id: string, updates: Partial<VisualComponent>) => {
    setTool(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    }));

    if (selectedComponent?.id === id) {
      setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedComponent]);

  const deleteComponent = useCallback((id: string) => {
    setTool(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id)
    }));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const saveTool = async () => {
    // TODO: Implement actual save to backend
    console.log('Saving tool:', tool);
    alert('Tool saved! (This will connect to the backend)');
  };

  const previewTool = () => {
    setMode('preview');
    setSelectedComponent(null);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Component Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="font-semibold text-gray-900 mb-2">Add Components</h2>
            <p className="text-xs text-gray-500">Drag components to your canvas</p>
          </div>
          <div className="space-y-2">
            {COMPONENT_PALETTE.map(component => (
              <PaletteItem key={component.type} component={component as any} />
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HiveInput
                value={tool.name}
                onChange={(e) => setTool(prev => ({ ...prev, name: e.target.value }))}
                className="font-semibold text-lg border-none p-0 h-auto focus:ring-0"
                placeholder="Tool Name"
              />
              <HiveBadge variant="outline">Draft</HiveBadge>
            </div>
            <div className="flex items-center gap-2">
              <HiveButton
                variant={mode === 'build' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('build')}
              >
                <Settings className="w-4 h-4 mr-1" />
                Build
              </HiveButton>
              <HiveButton
                variant={mode === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={previewTool}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </HiveButton>
              <HiveButton onClick={saveTool} size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save
              </HiveButton>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-8 overflow-auto">
            <div
              ref={setCanvasRef}
              className={cn(
                "max-w-2xl mx-auto bg-white rounded-lg shadow-sm border-2 border-dashed min-h-96 p-6",
                isOver ? "border-amber-400 bg-amber-50" : "border-gray-300",
                tool.components.length === 0 && "flex items-center justify-center"
              )}
            >
              {tool.components.length === 0 ? (
                <div className="text-center text-gray-500">
                  <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Start Building Your Tool</p>
                  <p className="text-sm">Drag components from the left panel to get started</p>
                </div>
              ) : (
                <SortableContext items={tool.components.map(c => c.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {tool.components.map(component => (
                      <CanvasComponent
                        key={component.id}
                        component={component}
                        isSelected={selectedComponent?.id === component.id}
                        onSelect={() => setSelectedComponent(component)}
                        onUpdate={(updates) => updateComponent(component.id, updates)}
                        onDelete={() => deleteComponent(component.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {mode === 'build' && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <PropertyPanel
              component={selectedComponent}
              onUpdate={(updates) => {
                if (selectedComponent) {
                  updateComponent(selectedComponent.id, updates);
                }
              }}
            />
          </div>
        )}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId && activeId.startsWith('palette-') && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium">Adding component...</span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default VisualToolBuilderV2;