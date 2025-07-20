"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Type, 
  Image, 
  Square, 
  ArrowRight, 
  MousePointer, 
  Settings,
  Eye,
  Save,
  Trash2,
} from 'lucide-react';

// Tool element types
interface ToolElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'input' | 'divider';
  config: Record<string, any>;
  position: { x: number; y: number };
}

// Element palette items
const ELEMENT_PALETTE = [
  { type: 'text', icon: Type, label: 'Text Block', color: 'bg-blue-500' },
  { type: 'image', icon: Image, label: 'Image', color: 'bg-green-500' },
  { type: 'button', icon: MousePointer, label: 'Button', color: 'bg-purple-500' },
  { type: 'input', icon: Square, label: 'Input Field', color: 'bg-orange-500' },
  { type: 'divider', icon: ArrowRight, label: 'Divider', color: 'bg-gray-500' },
];

// Draggable palette item (simplified for Storybook)
function PaletteItem({ element }: { element: typeof ELEMENT_PALETTE[0] }) {
  return (
    <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg cursor-grab hover:bg-zinc-750 transition-colors group">
      <div className={`w-8 h-8 ${element.color} rounded-lg flex items-center justify-center mb-2 mx-auto`}>
        <element.icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-xs text-zinc-300 text-center font-medium">{element.label}</p>
    </div>
  );
}

// Canvas element component
function CanvasElement({ element, isSelected, onSelect, onDelete }: {
  element: ToolElement;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
            <p className="text-white">{element.config.text || 'Text content goes here...'}</p>
          </div>
        );
      case 'image':
        return (
          <div className="h-32 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
            <Image className="w-8 h-8 text-zinc-500" />
            <span className="ml-2 text-zinc-500">Image placeholder</span>
          </div>
        );
      case 'button':
        return (
          <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
            {element.config.text || 'Button'}
          </Button>
        );
      case 'input':
        return (
          <input
            type="text"
            placeholder={element.config.placeholder || 'Enter text...'}
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500"
            readOnly
          />
        );
      case 'divider':
        return (
          <div className="w-full h-px bg-zinc-700 my-4" />
        );
      default:
        return <div>Unknown element</div>;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer ${
        isSelected ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-zinc-900' : ''
      }`}
    >
      {renderElement()}
      
      {/* Element controls */}
      <div className={`absolute -top-2 -right-2 flex space-x-1 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      } transition-opacity`}>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-6 h-6 p-0 bg-zinc-800 border-zinc-600 hover:bg-red-600"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// Properties panel
function PropertiesPanel({ selectedElement, onUpdateElement }: {
  selectedElement: ToolElement | null;
  onUpdateElement: (updates: Partial<ToolElement['config']>) => void;
}) {
  if (!selectedElement) {
    return (
      <div className="p-6 text-center text-zinc-500">
        <Settings className="w-8 h-8 mx-auto mb-2" />
        <p>Select an element to edit properties</p>
      </div>
    );
  }

  const renderProperties = () => {
    switch (selectedElement.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Text Content</label>
              <textarea
                value={selectedElement.config.text || ''}
                onChange={(e) => onUpdateElement({ text: e.target.value })}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                rows={3}
                placeholder="Enter your text..."
              />
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedElement.config.text || ''}
                onChange={(e) => onUpdateElement({ text: e.target.value })}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                placeholder="Button text"
              />
            </div>
          </div>
        );
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Placeholder</label>
              <input
                type="text"
                value={selectedElement.config.placeholder || ''}
                onChange={(e) => onUpdateElement({ placeholder: e.target.value })}
                className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white"
                placeholder="Input placeholder"
              />
            </div>
          </div>
        );
      default:
        return <p className="text-zinc-500">No properties available</p>;
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4 capitalize">
        {selectedElement.type} Properties
      </h3>
      {renderProperties()}
    </div>
  );
}

// Main Visual Builder Component (simplified for Storybook)
export function VisualToolBuilder({ 
  initialElements = [],
  toolName = 'Untitled Tool' 
}: {
  initialElements?: ToolElement[];
  toolName?: string;
}) {
  const [elements, setElements] = useState<ToolElement[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<ToolElement | null>(null);
  const [currentToolName, setCurrentToolName] = useState(toolName);

  const addElement = (type: string) => {
    const newElement: ToolElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      config: {},
      position: { x: 0, y: 0 },
    };
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = useCallback((elementId: string, updates: Partial<ToolElement['config']>) => {
    setElements(prev => prev.map(el => 
      el.id === elementId 
        ? { ...el, config: { ...el.config, ...updates } }
        : el
    ));
  }, []);

  const deleteElement = useCallback((elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  return (
    <div className="h-screen flex bg-[#0A0A0A]">
      {/* Element Palette */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Elements</h2>
        <div className="grid grid-cols-2 gap-3">
          {ELEMENT_PALETTE.map((element) => (
            <div key={element.type} onClick={() => addElement(element.type)}>
              <PaletteItem element={element} />
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
          <input
            type="text"
            value={currentToolName}
            onChange={(e) => setCurrentToolName(e.target.value)}
            className="text-xl font-semibold bg-transparent text-white border-none outline-none"
          />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="min-h-full bg-zinc-950 rounded-lg border-2 border-dashed border-zinc-700 p-6">
            {elements.length === 0 ? (
              <div className="text-center text-zinc-500 py-16">
                <Square className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Start building your tool</h3>
                <p>Click elements from the left panel to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map((element) => (
                  <CanvasElement
                    key={element.id}
                    element={element}
                    isSelected={selectedElement?.id === element.id}
                    onSelect={() => setSelectedElement(element)}
                    onDelete={() => deleteElement(element.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-zinc-900 border-l border-zinc-800">
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={(updates) => {
            if (selectedElement) {
              updateElement(selectedElement.id, updates);
              setSelectedElement(prev => prev ? { ...prev, config: { ...prev.config, ...updates } } : null);
            }
          }}
        />
      </div>
    </div>
  );
}