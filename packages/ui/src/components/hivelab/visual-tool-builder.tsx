"use client";

/**
 * HIVE Visual Tool Builder
 * Drag-and-drop interface for creating tools from elements
 */

import React, { useState, useCallback, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Tool, 
  ElementInstance, 
  Element,
  ElementType,
  createToolDefaults,
  CreateTool
} from '@hive/core';
import { HiveCard } from '../hive-card';
import { Button } from '../ui/button';
import { LiveToolRuntime } from '../live-tool-runtime';
import { ElementConfigPanel } from './element-config-panel';
import { SpaceToolDeployment } from '../community/space-tool-deployment';
import { apiClient } from '../../lib/api-client';
import { 
  Type, 
  Image, 
  Minus, 
  Layout, 
  MousePointer, 
  ChevronDown,
  List,
  Star,
  Timer,
  BarChart3,
  Settings,
  Eye,
  Save,
  Play,
  Trash2,
  Plus,
  Zap
} from 'lucide-react';

// Element library with all available elements
const ELEMENT_LIBRARY: Element[] = [
  {
    id: 'textBlock-v1',
    name: 'Text Block',
    type: 'textBlock',
    category: 'Display & Layout',
    description: 'Display text content with formatting options',
    icon: 'Type',
    version: 1,
    configSchema: JSON.stringify({}), // Simplified for now
    defaultConfig: {
      text: 'Enter your text here...',
      style: {
        fontSize: 'base',
        fontWeight: 'normal',
        textAlign: 'left'
      }
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'textInput-v1',
    name: 'Text Input',
    type: 'textInput',
    category: 'Inputs & Choices',
    description: 'Collect text input from users',
    icon: 'Type',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      label: 'Enter label',
      placeholder: 'Type here...',
      type: 'text',
      required: false
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'button-v1',
    name: 'Button',
    type: 'button',
    category: 'Inputs & Choices',
    description: 'Interactive button for actions',
    icon: 'MousePointer',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      text: 'Click me',
      variant: 'primary',
      size: 'md',
      onClick: {
        type: 'submit'
      }
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'imageBlock-v1',
    name: 'Image',
    type: 'imageBlock',
    category: 'Display & Layout',
    description: 'Display images with captions',
    icon: 'Image',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      src: 'https://via.placeholder.com/300x200',
      alt: 'Image placeholder',
      caption: 'Add a caption here'
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'divider-v1',
    name: 'Divider',
    type: 'divider',
    category: 'Display & Layout',
    description: 'Visual divider line',
    icon: 'Minus',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      thickness: 1,
      color: '#e5e7eb',
      style: 'solid',
      margin: 16
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'choiceSelect-v1',
    name: 'Choice Select',
    type: 'choiceSelect',
    category: 'Inputs & Choices',
    description: 'Dropdown, radio, or checkbox selection',
    icon: 'List3',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      label: 'Select an option',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ],
      multiple: false,
      required: false
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'ratingStars-v1',
    name: 'Rating Stars',
    type: 'ratingStars',
    category: 'Inputs & Choices',
    description: 'Star rating input',
    icon: 'Star',
    version: 1,
    configSchema: JSON.stringify({}),
    defaultConfig: {
      label: 'Rate this',
      maxRating: 5,
      allowHalf: false,
      required: false,
      size: 'md',
      color: '#fbbf24'
    },
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Icon mapping
const getElementIcon = (iconName: string) => {
  switch (iconName) {
    case 'Type': return Type;
    case 'Image': return Image;
    case 'Minus': return Minus;
    case 'MousePointer': return MousePointer;
    case 'List3': return List;
    case 'Star': return Star;
    case 'Timer': return Timer;
    case 'BarChart3': return BarChart3;
    default: return Layout;
  }
};

// Draggable element from library
const DraggableElement: React.FC<{ element: Element }> = ({ element }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { elementId: element.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const IconComponent = getElementIcon(element.icon);

  return (
    <div
      ref={drag as any}
      className={`
        p-3 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]
        hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-background-tertiary)]
        cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center space-x-2">
        <IconComponent className="w-4 h-4 text-[var(--hive-text-secondary)]" />
        <span className="text-sm font-medium text-[var(--hive-text-primary)]">
          {element.name}
        </span>
      </div>
      <p className="text-xs text-[var(--hive-text-secondary)] mt-1">
        {element.description}
      </p>
    </div>
  );
};

// Canvas element instance
const CanvasElement: React.FC<{
  element: ElementInstance;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}> = ({ element, isSelected, onSelect, onDelete }) => {
  const elementDef = ELEMENT_LIBRARY.find(el => el.id === element.elementId);
  const IconComponent = elementDef ? getElementIcon(elementDef.icon) : Layout;

  return (
    <div
      className={`
        relative p-3 m-2 rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10' 
          : 'border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-hover)]'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IconComponent className="w-4 h-4 text-[var(--hive-text-secondary)]" />
          <span className="text-sm font-medium text-[var(--hive-text-primary)]">
            {elementDef?.name || 'Unknown Element'}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-[var(--hive-text-tertiary)] hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {/* Element preview */}
      <div className="mt-2 p-2 bg-[var(--hive-background-primary)] rounded border text-xs">
        {element.elementId.includes('textBlock') && (
          <div>📝 {(element.config as any)?.text || 'Text content'}</div>
        )}
        {element.elementId.includes('textInput') && (
          <div>📝 Input: {(element.config as any)?.label || 'Label'}</div>
        )}
        {element.elementId.includes('button') && (
          <div>🔘 {(element.config as any)?.text || 'Button'}</div>
        )}
        {element.elementId.includes('image') && (
          <div>🖼️ Image</div>
        )}
        {element.elementId.includes('divider') && (
          <div>➖ Divider</div>
        )}
        {element.elementId.includes('choiceSelect') && (
          <div>☑️ {(element.config as any)?.label || 'Select'}</div>
        )}
        {element.elementId.includes('ratingStars') && (
          <div>⭐ {(element.config as any)?.label || 'Rating'}</div>
        )}
      </div>
    </div>
  );
};

// Drop zone canvas
const ToolCanvas: React.FC<{
  elements: ElementInstance[];
  selectedElementId: string | null;
  onElementSelect: (id: string) => void;
  onElementAdd: (elementId: string) => void;
  onElementDelete: (id: string) => void;
}> = ({ elements, selectedElementId, onElementSelect, onElementAdd, onElementDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { elementId: string }) => {
      onElementAdd(item.elementId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`
        min-h-96 rounded-lg border-2 border-dashed transition-all duration-200
        ${isOver 
          ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/5' 
          : 'border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]'
        }
      `}
    >
      {elements.length === 0 ? (
        <div className="flex items-center justify-center h-96 text-center">
          <div>
            <Layout className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
              Build Your Tool
            </h3>
            <p className="text-[var(--hive-text-secondary)]">
              Drag elements from the library to start building
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onSelect={() => onElementSelect(element.id)}
              onDelete={() => onElementDelete(element.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Mock space data for deployment
interface Space {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'public' | 'private' | 'restricted';
  category: string;
  userRole: 'admin' | 'moderator' | 'member';
}

export interface VisualToolBuilderProps {
  onSave?: (tool: Tool) => void;
  onPreview?: (tool: Tool) => void;
  onDeploy?: (tool: Tool, deploymentConfig: any) => void;
  initialTool?: Tool;
  availableSpaces?: Space[];
}

export const VisualToolBuilder: React.FC<VisualToolBuilderProps> = ({
  onSave,
  onPreview,
  onDeploy,
  initialTool,
  availableSpaces = []
}) => {
  const [toolName, setToolName] = useState(initialTool?.name || 'My New Tool');
  const [toolDescription, setToolDescription] = useState(initialTool?.description || '');
  const [elements, setElements] = useState<ElementInstance[]>(initialTool?.elements || []);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'build' | 'preview'>('build');
  const [showDeployment, setShowDeployment] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Group elements by category
  const elementsByCategory = useMemo(() => {
    return ELEMENT_LIBRARY.reduce((acc, element) => {
      if (!acc[element.category]) {
        acc[element.category] = [];
      }
      acc[element.category].push(element);
      return acc;
    }, {} as Record<string, Element[]>);
  }, []);

  // Add element to canvas
  const handleElementAdd = useCallback((elementId: string) => {
    const elementDef = ELEMENT_LIBRARY.find(el => el.id === elementId);
    if (!elementDef) return;

    const newElement: ElementInstance = {
      id: `${elementId}-${Date.now()}`,
      elementId: elementId,
      config: elementDef.defaultConfig,
      position: { x: 0, y: elements.length * 100 },
      order: elements.length,
      isVisible: true,
      isLocked: false
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  }, [elements.length]);

  // Delete element
  const handleElementDelete = useCallback((elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElementId(null);
  }, []);

  // Update element config
  const handleElementConfigChange = useCallback((elementId: string, newConfig: any) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, config: newConfig } : el
    ));
  }, []);

  // Create tool object
  const createTool = useCallback((): Tool => {
    const createData: CreateTool = {
      name: toolName,
      description: toolDescription
    };

    const toolDefaults = createToolDefaults('user-id', createData);

    return {
      id: initialTool?.id || `tool-${Date.now()}`,
      ...toolDefaults,
      elements,
      createdAt: initialTool?.createdAt || new Date(),
      updatedAt: new Date()
    };
  }, [toolName, toolDescription, elements, initialTool]);

  // Handle save
  const handleSave = useCallback(() => {
    const tool = createTool();
    if (onSave) {
      onSave(tool);
    }
  }, [createTool, onSave]);

  // Handle preview
  const handlePreview = useCallback(() => {
    const tool = createTool();
    if (onPreview) {
      onPreview(tool);
    }
    setActiveTab('preview');
  }, [createTool, onPreview]);

  // Handle deployment
  const handleDeployment = useCallback(async (deploymentConfig: any) => {
    setIsDeploying(true);
    try {
      const tool = createTool();
      
      // First save the tool if it doesn't exist or has changes
      let savedTool = tool;
      if (!tool.id || JSON.stringify(elements) !== JSON.stringify(initialTool?.elements || [])) {
        const saveResult = initialTool?.id 
          ? await apiClient.updateTool(initialTool.id, tool)
          : await apiClient.createTool({
              name: tool.name,
              description: tool.description,
              isSpaceTool: true,
              spaceId: deploymentConfig.spaceId,
            });
        
        savedTool = saveResult.tool;
      }

      // Deploy the saved tool to the space using real API
      await apiClient.deployTool({
        toolId: savedTool.id,
        deployTo: 'space',
        targetId: deploymentConfig.spaceId,
        surface: 'tools',
        permissions: {
          canView: deploymentConfig.permissions?.view?.includes('all') || true,
          canInteract: deploymentConfig.permissions?.use?.length > 0 || true,
          canEdit: deploymentConfig.permissions?.manage?.length > 0 || false,
          allowedRoles: deploymentConfig.permissions?.use || ['member', 'moderator', 'admin'],
        },
        settings: {
          showInDirectory: deploymentConfig.settings?.isActive !== false,
          allowSharing: true,
          collectAnalytics: deploymentConfig.settings?.trackUsage !== false,
          notifyOnInteraction: false,
        },
        config: {
          displayName: deploymentConfig.customization?.displayName || tool.name,
          description: deploymentConfig.customization?.description || tool.description,
          category: deploymentConfig.customization?.category || 'productivity',
          autoLaunch: deploymentConfig.settings?.autoLaunch || false,
          requirePermission: deploymentConfig.settings?.requirePermission || false,
          maxConcurrentUsers: deploymentConfig.settings?.maxConcurrentUsers,
        },
      });

      // Call original onDeploy callback if provided
      if (onDeploy) {
        await onDeploy(savedTool, deploymentConfig);
      }
      
      setShowDeployment(false);
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error; // Let the deployment component handle the error display
    } finally {
      setIsDeploying(false);
    }
  }, [createTool, elements, initialTool, onDeploy]);

  const currentTool = createTool();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-[var(--hive-border-default)] p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none outline-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] w-full"
                placeholder="Tool name"
              />
              <input
                type="text"
                value={toolDescription}
                onChange={(e) => setToolDescription(e.target.value)}
                className="text-sm bg-transparent border-none outline-none text-[var(--hive-text-secondary)] placeholder-[var(--hive-text-tertiary)] w-full mt-1"
                placeholder="Tool description"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-[var(--hive-background-secondary)] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('build')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'build'
                      ? 'bg-[var(--hive-primary)] text-white'
                      : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-1" />
                  Build
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-[var(--hive-primary)] text-white'
                      : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  Preview
                </button>
              </div>
              
              <Button variant="outline" onClick={handlePreview}>
                <Play className="w-4 h-4 mr-2" />
                Test
              </Button>
              <Button variant="outline" onClick={() => setShowDeployment(true)} disabled={elements.length === 0}>
                <Zap className="w-4 h-4 mr-2" />
                Deploy
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'build' ? (
            <>
              {/* Element Library Sidebar */}
              <div className="w-80 border-r border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                    Element Library
                  </h3>
                  
                  {Object.entries(elementsByCategory).map(([category, categoryElements]) => (
                    <div key={category} className="mb-6">
                      <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-3 flex items-center">
                        {category}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </h4>
                      <div className="space-y-2">
                        {categoryElements.map((element) => (
                          <DraggableElement key={element.id} element={element} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 p-6 overflow-y-auto">
                <ToolCanvas
                  elements={elements}
                  selectedElementId={selectedElementId}
                  onElementSelect={setSelectedElementId}
                  onElementAdd={handleElementAdd}
                  onElementDelete={handleElementDelete}
                />
              </div>

              {/* Configuration Panel */}
              <ElementConfigPanel
                element={elements.find(el => el.id === selectedElementId) || null}
                elementDefinition={
                  selectedElementId 
                    ? ELEMENT_LIBRARY.find(lib => lib.id === elements.find(el => el.id === selectedElementId)?.elementId) || null
                    : null
                }
                onChange={(newConfig) => {
                  if (selectedElementId) {
                    handleElementConfigChange(selectedElementId, newConfig);
                  }
                }}
                onClose={() => setSelectedElementId(null)}
              />
            </>
          ) : (
            /* Preview Mode */
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <LiveToolRuntime
                  tool={currentTool}
                  readOnly={false}
                  showDebugInfo={true}
                  onDataSubmit={(data) => {
                    console.log('Tool submitted:', data);
                    alert('Tool test completed! Check console for submission data.');
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Deployment Modal */}
        {showDeployment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[var(--hive-background-primary)] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <SpaceToolDeployment
                tool={currentTool}
                availableSpaces={availableSpaces}
                onDeploy={handleDeployment}
                onCancel={() => setShowDeployment(false)}
                isDeploying={isDeploying}
              />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};