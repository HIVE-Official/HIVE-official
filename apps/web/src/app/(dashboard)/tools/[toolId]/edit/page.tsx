"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Grid as _Grid } from "@hive/ui";
import { Save, Eye, Play, Settings as _Settings, Code2, Palette as _Palette, Layout, Database, Zap, ArrowLeft, MoreHorizontal, Copy as _Copy, Trash2 as _Trash2 } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";

interface ToolElement {
  id: string;
  type: 'input' | 'button' | 'text' | 'image' | 'chart' | 'list';
  label: string;
  properties: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  privacy: 'personal' | 'space' | 'public';
  elements: ToolElement[];
  settings: Record<string, any>;
}

// Element types for the builder
const ELEMENT_TYPES = [
  {
    type: 'input',
    icon: Code2,
    label: 'Text Input',
    description: 'Collect text input from users'
  },
  {
    type: 'button',
    icon: Zap,
    label: 'Action Button',
    description: 'Trigger actions and workflows'
  },
  {
    type: 'text',
    icon: Layout,
    label: 'Text Block',
    description: 'Display text and headings'
  },
  {
    type: 'chart',
    icon: Database,
    label: 'Data Chart',
    description: 'Visualize data with charts'
  }
];

// Mock tool data
const MOCK_TOOL: ToolConfig = {
  id: 'poll-maker',
  name: 'Poll Maker',
  description: 'Create interactive polls for spaces and events',
  icon: '📊',
  category: 'communication',
  privacy: 'space',
  elements: [
    {
      id: 'title-input',
      type: 'input',
      label: 'Poll Title',
      properties: { placeholder: 'Enter poll question...', required: true },
      position: { x: 50, y: 50 },
      size: { width: 300, height: 40 }
    },
    {
      id: 'submit-button',
      type: 'button',
      label: 'Create Poll',
      properties: { variant: 'primary', action: 'submit' },
      position: { x: 50, y: 120 },
      size: { width: 120, height: 40 }
    }
  ],
  settings: {
    allowAnonymousVoting: true,
    showResults: 'after_voting',
    endDate: null
  }
};

const ElementCard = ({ element, onSelect, isSelected }: { 
  element: ToolElement; 
  onSelect: (_id: string) => void;
  isSelected: boolean;
}) => {
  const getIcon = (type: string) => {
    const elementType = ELEMENT_TYPES.find(t => t.type === type);
    return elementType?.icon || Code2;
  };
  
  const IconComponent = getIcon(element.type);

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all group ${
        isSelected 
          ? 'bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/30' 
          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)]'
      }`}
      onClick={() => onSelect(element.id)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-[var(--hive-brand-secondary)]/20' : 'bg-[rgba(255,255,255,0.05)] group-hover:bg-[var(--hive-brand-secondary)]/20'
        }`}>
          <IconComponent className={`h-4 w-4 ${isSelected ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-secondary)]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm truncate ${isSelected ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-inverse)]'}`}>
            {element.label}
          </div>
          <div className="text-xs text-[var(--hive-text-muted)] capitalize">
            {element.type}
          </div>
        </div>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="h-3 w-3 text-[var(--hive-text-muted)]" />
        </Button>
      </div>
    </div>
  );
};

const PropertyPanel = ({ element }: { element: ToolElement | null }) => {
  if (!element) {
    return (
      <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-center">
        <div className="text-[var(--hive-text-muted)] mb-2">No element selected</div>
        <p className="text-sm text-[var(--hive-text-muted)]">Select an element to edit its properties</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Element Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-muted)] mb-2">Label</label>
          <input
            type="text"
            value={element.label}
            className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[var(--hive-text-inverse)] focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
          />
        </div>
        
        {element.type === 'input' && (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-muted)] mb-2">Placeholder</label>
              <input
                type="text"
                value={element.properties.placeholder || ''}
                className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[var(--hive-text-inverse)] focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={element.properties.required} className="rounded" />
              <label className="text-sm text-[var(--hive-text-muted)]">Required field</label>
            </div>
          </>
        )}
        
        {element.type === 'button' && (
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-muted)] mb-2">Button Style</label>
            <select className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[var(--hive-text-inverse)] focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
            </select>
          </div>
        )}
        
        <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
          <h4 className="text-sm font-medium text-[var(--hive-text-inverse)] mb-3">Position & Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--hive-text-muted)] mb-1">X Position</label>
              <input
                type="number"
                value={element.position.x}
                className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--hive-text-muted)] mb-1">Y Position</label>
              <input
                type="number"
                value={element.position.y}
                className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--hive-text-muted)] mb-1">Width</label>
              <input
                type="number"
                value={element.size.width}
                className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--hive-text-muted)] mb-1">Height</label>
              <input
                type="number"
                value={element.size.height}
                className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function ToolEditPage() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState<ToolConfig>(MOCK_TOOL);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const flags = useFeatureFlags();

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-editor', toolId: params.toolId });
  }, [flags, params.toolId]);

  const selectedElement = tool.elements.find(el => el.id === selectedElementId) || null;

  const handleSave = () => {
    flags.trackEvent('tools', 'interact', { action: 'save_tool', toolId: tool.id });
    setHasChanges(false);
    // API call to save tool
  };

  const handlePreview = () => {
    flags.trackEvent('tools', 'interact', { action: 'preview_tool', toolId: tool.id });
    router.push(`/tools/${tool.id}/preview`);
  };

  const handleTest = () => {
    flags.trackEvent('tools', 'interact', { action: 'test_tool', toolId: tool.id });
    // Open test modal or redirect to test environment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[#1A1A1A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.back()}
                className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  Editing: {tool.name}
                </h1>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {hasChanges ? '• Unsaved changes' : '• All changes saved'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleTest}
                className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <Play className="h-4 w-4 mr-2" />
                Test
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handlePreview}
                className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                disabled={!hasChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Elements Panel - Left */}
          <div className="col-span-3 space-y-6">
            {/* Tool Info */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-sm font-semibold text-[var(--hive-text-inverse)] mb-3">Tool Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[var(--hive-text-muted)] mb-1">Tool Name</label>
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => {
                      setTool({ ...tool, name: e.target.value });
                      setHasChanges(true);
                    }}
                    className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--hive-text-muted)] mb-1">Privacy</label>
                  <select
                    value={tool.privacy}
                    onChange={(e) => {
                      setTool({ ...tool, privacy: e.target.value as any });
                      setHasChanges(true);
                    }}
                    className="w-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
                  >
                    <option value="personal">Personal</option>
                    <option value="space">Space</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Elements List */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--hive-text-inverse)]">Elements</h3>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3 text-[var(--hive-text-muted)]" />
                </Button>
              </div>
              <div className="space-y-2">
                {tool.elements.map(element => (
                  <ElementCard
                    key={element.id}
                    element={element}
                    onSelect={setSelectedElementId}
                    isSelected={selectedElementId === element.id}
                  />
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-xs font-medium text-[var(--hive-text-muted)] mb-2">Add Element</h4>
                <div className="grid grid-cols-2 gap-2">
                  {ELEMENT_TYPES.map(elementType => {
                    const IconComponent = elementType.icon;
                    return (
                      <Button
                        key={elementType.type}
                        size="sm"
                        variant="outline"
                        className="border-[rgba(255,255,255,0.1)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)] hover:border-[var(--hive-brand-secondary)]/30 p-2 h-auto"
                        onClick={() => {
                          const newElement: ToolElement = {
                            id: `element-${Date.now()}`,
                            type: elementType.type as any,
                            label: elementType.label,
                            properties: {},
                            position: { x: 100, y: 100 },
                            size: { width: 200, height: 40 }
                          };
                          setTool({
                            ...tool,
                            elements: [...tool.elements, newElement]
                          });
                          setSelectedElementId(newElement.id);
                          setHasChanges(true);
                        }}
                      >
                        <IconComponent className="h-3 w-3 mb-1" />
                        <span className="text-xs">{elementType.type}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Canvas - Center */}
          <div className="col-span-6">
            <Card className="h-full bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] relative overflow-hidden">
              <div className="absolute top-4 left-4 text-sm text-[var(--hive-text-muted)]">
                Canvas - Tool Preview
              </div>
              <div className="p-8 h-full">
                <div className="w-full h-full bg-[rgba(255,255,255,0.01)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-lg relative">
                  {tool.elements.map(element => (
                    <div
                      key={element.id}
                      className={`absolute cursor-pointer transition-all ${
                        selectedElementId === element.id 
                          ? 'ring-2 ring-[var(--hive-brand-secondary)]/50' 
                          : 'hover:ring-2 hover:ring-[var(--hive-text-muted)]/30'
                      }`}
                      style={{
                        left: element.position.x,
                        top: element.position.y,
                        width: element.size.width,
                        height: element.size.height
                      }}
                      onClick={() => setSelectedElementId(element.id)}
                    >
                      {element.type === 'input' && (
                        <input
                          type="text"
                          placeholder={element.properties.placeholder}
                          className="w-full h-full p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm pointer-events-none"
                          readOnly
                        />
                      )}
                      {element.type === 'button' && (
                        <button className="w-full h-full bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded font-medium text-sm pointer-events-none">
                          {element.label}
                        </button>
                      )}
                      {element.type === 'text' && (
                        <div className="w-full h-full text-[var(--hive-text-inverse)] text-sm flex items-center pointer-events-none">
                          {element.label}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {tool.elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div className="text-2xl mb-2">🎨</div>
                        <div className="text-[var(--hive-text-muted)] text-sm">
                          Add elements from the left panel to start building
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Properties Panel - Right */}
          <div className="col-span-3">
            <PropertyPanel element={selectedElement} />
          </div>
        </div>
      </div>
    </div>
  );
}