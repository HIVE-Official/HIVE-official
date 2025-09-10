'use client';

import React, { useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Star, 
  Eye,
  Settings,
  Code,
  Palette,
  Layers,
  Play,
  Save,
  Share2,
  Trash2,
  Copy,
  Edit,
  Grid,
  Layout,
  Type,
  Image,
  Link,
  MousePointer,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '../atoms';

interface ToolElement {
  id: string;
  type: 'input' | 'button' | 'text' | 'image' | 'container' | 'link';
  label: string;
  properties: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: Record<string, any>;
  events?: Array<{
    trigger: string;
    action: string;
    target?: string;
    data?: any;
  }>;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'template' | 'custom' | 'installed';
  icon: React.ComponentType<any>;
  color: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  creator: string;
  creatorType: 'student' | 'faculty' | 'community' | 'verified';
  tags: string[];
  version: string;
  isInstalled?: boolean;
  isFavorite?: boolean;
  lastUsed?: string;
  elements?: ToolElement[];
  config?: Record<string, any>;
}

interface CompleteHIVEToolsSystemProps {
  tools: Tool[];
  personalTools?: Tool[];
  onToolInstall?: (toolId: string) => void;
  onToolCreate?: (tool: Partial<Tool>) => void;
  onToolUpdate?: (toolId: string, updates: Partial<Tool>) => void;
  onToolDelete?: (toolId: string) => void;
  className?: string;
}

// Available element types for the visual builder
const ELEMENT_TYPES = [
  {
    type: 'input',
    label: 'Text Input',
    icon: Type,
    color: 'text-blue-500',
    defaultProps: {
      placeholder: 'Enter text...',
      label: 'Input Field',
      required: false
    }
  },
  {
    type: 'button',
    label: 'Button',
    icon: MousePointer,
    color: 'text-green-500',
    defaultProps: {
      text: 'Click me',
      variant: 'primary',
      size: 'medium'
    }
  },
  {
    type: 'text',
    label: 'Text Block',
    icon: Type,
    color: 'text-gray-500',
    defaultProps: {
      content: 'Sample text',
      size: 'medium',
      weight: 'normal'
    }
  },
  {
    type: 'image',
    label: 'Image',
    icon: Image,
    color: 'text-purple-500',
    defaultProps: {
      src: '/placeholder-image.jpg',
      alt: 'Image description',
      fit: 'cover'
    }
  },
  {
    type: 'container',
    label: 'Container',
    icon: Layout,
    color: 'text-orange-500',
    defaultProps: {
      padding: 16,
      margin: 8,
      backgroundColor: 'transparent',
      borderRadius: 8
    }
  },
  {
    type: 'link',
    label: 'Link',
    icon: Link,
    color: 'text-indigo-500',
    defaultProps: {
      text: 'Click here',
      url: 'https://example.com',
      target: '_blank'
    }
  }
];

export function CompleteHIVEToolsSystem({
  tools,
  personalTools = [],
  onToolInstall,
  onToolCreate,
  onToolUpdate,
  onToolDelete,
  className = ''
}: CompleteHIVEToolsSystemProps) {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'personal' | 'builder'>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [builderMode, setBuilderMode] = useState<'design' | 'preview' | 'code'>('design');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<Partial<Tool> | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let filtered = tools;
    
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    
    return filtered;
  }, [tools, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(tools.map(tool => tool.category))];
    return ['all', ...cats];
  }, [tools]);

  // Handle element drag and drop
  const handleElementDrag = useCallback((elementType: string, event: React.DragEvent) => {
    event.dataTransfer.setData('elementType', elementType);
    setDraggedElement(elementType);
  }, []);

  const handleCanvasDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData('elementType');
    const canvas = canvasRef.current;
    
    if (!canvas || !elementType) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const elementTemplate = ELEMENT_TYPES.find(t => t.type === elementType);
    if (!elementTemplate) return;

    const newElement: ToolElement = {
      id: `element-${Date.now()}`,
      type: elementType as any,
      label: elementTemplate.label,
      properties: { ...elementTemplate.defaultProps },
      position: { x, y },
      size: { width: 200, height: 40 },
      style: {}
    };

    setCurrentTool(prev => ({
      ...prev,
      elements: [...(prev?.elements || []), newElement]
    }));

    setDraggedElement(null);
  }, []);

  const handleCanvasDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  // Tool creation and management
  const startNewTool = useCallback(() => {
    setCurrentTool({
      id: `tool-${Date.now()}`,
      name: 'New Tool',
      description: 'A custom tool created with HiveLab',
      category: 'custom',
      type: 'custom',
      elements: [],
      config: {}
    });
    setActiveTab('builder');
    setBuilderMode('design');
  }, []);

  const saveTool = useCallback(() => {
    if (currentTool && onToolCreate) {
      onToolCreate(currentTool);
      setCurrentTool(null);
      setActiveTab('personal');
    }
  }, [currentTool, onToolCreate]);

  const renderElement = useCallback((element: ToolElement) => {
    const { type, properties, position, size, style } = element;
    const isSelected = selectedElement === element.id;

    const elementStyle = {
      position: 'absolute' as const,
      left: position.x,
      top: position.y,
      width: size.width,
      height: type === 'container' ? 'auto' : size.height,
      minHeight: type === 'container' ? size.height : undefined,
      border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
      borderRadius: '6px',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      ...style
    };

    const handleElementClick = () => setSelectedElement(element.id);

    switch (type) {
      case 'input':
        return (
          <div key={element.id} style={elementStyle} onClick={handleElementClick}>
            <input
              type="text"
              placeholder={properties.placeholder}
              disabled={builderMode === 'design'}
              className="w-full border-0 bg-transparent outline-none"
            />
          </div>
        );
      
      case 'button':
        return (
          <div key={element.id} style={elementStyle} onClick={handleElementClick}>
            <Button
              size="sm"
              variant={properties.variant}
              disabled={builderMode === 'design'}
              className="w-full"
            >
              {properties.text}
            </Button>
          </div>
        );
      
      case 'text':
        return (
          <div key={element.id} style={elementStyle} onClick={handleElementClick}>
            <span style={{ 
              fontSize: properties.size === 'large' ? '18px' : properties.size === 'small' ? '12px' : '14px',
              fontWeight: properties.weight 
            }}>
              {properties.content}
            </span>
          </div>
        );
      
      case 'image':
        return (
          <div key={element.id} style={elementStyle} onClick={handleElementClick}>
            <img 
              src={properties.src} 
              alt={properties.alt}
              className="w-full h-full object-cover rounded"
            />
          </div>
        );
      
      case 'container':
        return (
          <div key={element.id} style={{
            ...elementStyle,
            backgroundColor: properties.backgroundColor || 'rgba(249, 250, 251, 0.8)',
            padding: properties.padding || 16,
            minHeight: 100
          }} onClick={handleElementClick}>
            <div className="text-sm text-gray-500 text-center">
              Container
            </div>
          </div>
        );
      
      case 'link':
        return (
          <div key={element.id} style={elementStyle} onClick={handleElementClick}>
            <a 
              href={builderMode === 'preview' ? properties.url : '#'}
              target={properties.target}
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={(e) => builderMode === 'design' && e.preventDefault()}
            >
              {properties.text}
            </a>
          </div>
        );
      
      default:
        return null;
    }
  }, [selectedElement, builderMode]);

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[var(--hive-gold)]" />
          <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
            HIVE Tools
          </h2>
        </div>
        
        <Button onClick={startNewTool} className="bg-[var(--hive-gold)] text-[var(--hive-obsidian)]">
          <Plus className="h-4 w-4 mr-2" />
          Create Tool
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "builder" | "personal" | "marketplace")} className="flex-1 flex flex-col">
        <TabsList className="w-full bg-white/5 p-1">
          <TabsTrigger value="marketplace" className="flex-1">
            <Target className="h-4 w-4 mr-2" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            My Tools
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex-1">
            <Zap className="h-4 w-4 mr-2" />
            HiveLab
          </TabsTrigger>
        </TabsList>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="flex-1 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Card key={tool.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${tool.color}20` }}>
                        <IconComponent className="h-5 w-5" style={{ color: tool.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--hive-text-inverse)] truncate">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-400">
                          {tool.rating} ({tool.ratingCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {tool.downloads}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => onToolInstall?.(tool.id)}
                        disabled={tool.isInstalled}
                      >
                        {tool.isInstalled ? 'Installed' : 'Install'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Personal Tools Tab */}
        <TabsContent value="personal" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {personalTools.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Zap className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-[var(--hive-text-inverse)] mb-2">
                  No personal tools yet
                </h3>
                <p className="text-gray-400 text-center mb-4">
                  Create your first custom tool using HiveLab or install tools from the marketplace.
                </p>
                <Button onClick={startNewTool}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Tool
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Card key={tool.id} className="p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${tool.color}20` }}>
                          <IconComponent className="h-5 w-5" style={{ color: tool.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--hive-text-inverse)] truncate">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Visual Builder Tab */}
        <TabsContent value="builder" className="flex-1 flex flex-col">
          {!currentTool ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Code className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">
                Welcome to HiveLab
              </h3>
              <p className="text-gray-400 text-center mb-6 max-w-md">
                Build powerful tools for your campus community without writing any code. 
                Drag and drop elements to create exactly what you need.
              </p>
              <Button onClick={startNewTool} size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Start Building
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex">
              {/* Element Palette */}
              <div className="w-64 border-r border-white/10 p-4 bg-white/[0.02]">
                <h4 className="font-medium text-[var(--hive-text-inverse)] mb-4">Elements</h4>
                <div className="space-y-2">
                  {ELEMENT_TYPES.map((elementType) => {
                    const IconComponent = elementType.icon;
                    return (
                      <div
                        key={elementType.type}
                        draggable
                        onDragStart={(e) => handleElementDrag(elementType.type, e)}
                        className="flex items-center gap-2 p-3 rounded-lg border border-white/10 cursor-move hover:bg-white/5 transition-colors"
                      >
                        <IconComponent className={`h-4 w-4 ${elementType.color}`} />
                        <span className="text-sm text-[var(--hive-text-inverse)]">
                          {elementType.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 p-4 border-b border-white/10">
                  <Input
                    value={currentTool.name || ''}
                    onChange={(e) => setCurrentTool(prev => ({ ...prev, name: e.target.value }))}
                    className="flex-1"
                    placeholder="Tool name..."
                  />
                  <Button onClick={saveTool} disabled={!currentTool.name}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>

                <div
                  ref={canvasRef}
                  className="flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-auto"
                  onDrop={handleCanvasDrop}
                  onDragOver={handleCanvasDragOver}
                  style={{ minHeight: '500px' }}
                >
                  {currentTool.elements?.map(renderElement)}
                  
                  {draggedElement && (
                    <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500 pointer-events-none flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        Drop to add {ELEMENT_TYPES.find(t => t.type === draggedElement)?.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}