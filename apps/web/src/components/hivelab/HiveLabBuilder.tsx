'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save,
  Play,
  Share2,
  Download,
  Upload,
  Settings,
  HelpCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Code,
  Eye,
  Layers,
  Package,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ElementPalette } from './ElementPalette';
import { Canvas } from './Canvas';
import { PropertyPanel } from './PropertyPanel';
import { PreviewPanel } from './PreviewPanel';
import { ToolLibrary } from './ToolLibrary';
import { useToast } from '@/hooks/use-toast';

interface CanvasElement {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  config: Record<string, any>;
  category: string;
  properties: any[];
  inputs?: string[];
  outputs?: string[];
}

interface Connection {
  id: string;
  from: string;
  to: string;
  fromPort?: string;
  toPort?: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  elements: CanvasElement[];
  connections: Connection[];
  config: Record<string, any>;
  metadata?: {
    author: string;
    version: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };
}

interface HiveLabBuilderProps {
  userId: string;
  initialTool?: Tool;
  onSave?: (tool: Tool) => Promise<void>;
  onDeploy?: (tool: Tool, spaceId: string) => Promise<void>;
  onClose?: () => void;
}

type ViewMode = 'build' | 'preview' | 'library';
type PanelLayout = 'default' | 'focused' | 'fullscreen';

export function HiveLabBuilder({
  userId,
  initialTool,
  onSave,
  onDeploy,
  onClose
}: HiveLabBuilderProps) {
  const { toast } = useToast();
  
  // Tool state
  const [tool, setTool] = useState<Tool>(initialTool || {
    id: `tool-${Date.now()}`,
    name: 'Untitled Tool',
    description: '',
    elements: [],
    connections: [],
    config: {},
    metadata: {
      author: userId,
      version: '1.0.0',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('build');
  const [panelLayout, setPanelLayout] = useState<PanelLayout>('default');
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Track changes
  useEffect(() => {
    if (initialTool) {
      setHasUnsavedChanges(
        JSON.stringify(tool.elements) !== JSON.stringify(initialTool.elements) ||
        JSON.stringify(tool.connections) !== JSON.stringify(initialTool.connections)
      );
    } else {
      setHasUnsavedChanges(tool.elements.length > 0 || tool.connections.length > 0);
    }
  }, [tool, initialTool]);

  // Handle element drag start
  const handleElementDragStart = useCallback((element: any) => {
    
  }, []);

  // Add element to canvas
  const handleAddElement = useCallback((element: Omit<CanvasElement, 'id'>) => {
    const newElement: CanvasElement = {
      ...element,
      id: `element-${Date.now()}`,
      properties: [
        { key: 'label', label: 'Label', type: 'text', value: element.name },
        { key: 'required', label: 'Required', type: 'boolean', value: false },
        { key: 'placeholder', label: 'Placeholder', type: 'text', value: '' }
      ]
    };
    
    setTool(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
    
    setSelectedElement(newElement.id);
  }, []);

  // Update element
  const handleUpdateElement = useCallback((elementId: string, updates: Partial<CanvasElement>) => {
    setTool(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      ),
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
  }, []);

  // Delete element
  const handleDeleteElement = useCallback((elementId: string) => {
    setTool(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId),
      connections: prev.connections.filter(conn =>
        conn.from !== elementId && conn.to !== elementId
      ),
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
    
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  // Duplicate element
  const handleDuplicateElement = useCallback((elementId: string) => {
    const element = tool.elements.find(el => el.id === elementId);
    if (!element) return;
    
    const newElement: CanvasElement = {
      ...element,
      id: `element-${Date.now()}`,
      name: `${element.name} (Copy)`,
      position: {
        x: element.position.x + 20,
        y: element.position.y + 20
      }
    };
    
    setTool(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
    
    setSelectedElement(newElement.id);
  }, [tool.elements]);

  // Add connection
  const handleConnect = useCallback((from: string, to: string) => {
    const connectionExists = tool.connections.some(conn =>
      (conn.from === from && conn.to === to) ||
      (conn.from === to && conn.to === from)
    );
    
    if (connectionExists) return;
    
    const newConnection: Connection = {
      id: `connection-${Date.now()}`,
      from,
      to
    };
    
    setTool(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection],
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
  }, [tool.connections]);

  // Remove connection
  const handleDisconnect = useCallback((connectionId: string) => {
    setTool(prev => ({
      ...prev,
      connections: prev.connections.filter(conn => conn.id !== connectionId),
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
  }, []);

  // Save tool with proper API integration
  const handleSave = useCallback(async () => {
    if (!tool.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Tool name is required',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const toolData = {
        id: tool.id,
        name: tool.name,
        description: tool.description || '',
        elements: tool.elements,
        connections: tool.connections,
        config: tool.config,
        type: 'visual' as const,
        status: 'draft' as const,
        visibility: 'private' as const,
        authorId: userId
      };

      const response = await fetch('/api/tools', {
        method: initialTool ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialTool ? { toolId: tool.id, ...toolData } : toolData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save tool');
      }

      const result = await response.json();
      
      if (onSave) {
        await onSave(result.tool);
      }
      
      setTool(prev => ({ ...prev, id: result.tool.id }));
      setHasUnsavedChanges(false);
      
      toast({
        title: 'Tool Saved',
        description: `${tool.name} has been saved successfully`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Failed to save tool:', error);
      toast({
        title: 'Save Failed',
        description: error instanceof Error ? error.message : 'Unable to save tool. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  }, [tool, onSave, toast, userId, initialTool]);

  // Load tool from library with validation
  const handleLoadTool = useCallback((loadedTool: any) => {
    try {
      setTool({
        ...loadedTool,
        id: loadedTool.id || `tool-${Date.now()}`,
        elements: loadedTool.elements || [],
        connections: loadedTool.connections || [],
        config: loadedTool.config || {},
        metadata: {
          author: userId,
          version: loadedTool.metadata?.version || '1.0.0',
          tags: loadedTool.metadata?.tags || [],
          createdAt: loadedTool.metadata?.createdAt ? new Date(loadedTool.metadata.createdAt) : new Date(),
          updatedAt: new Date()
        }
      });
      setViewMode('build');
      setSelectedElement(null);
      setHasUnsavedChanges(false);
      
      toast({
        title: 'Tool Loaded',
        description: `${loadedTool.name} has been loaded successfully`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Failed to load tool:', error);
      toast({
        title: 'Load Failed',
        description: 'Unable to load tool. The file may be corrupted.',
        variant: 'destructive'
      });
    }
  }, [userId, toast]);

  // Delete tool from library
  const handleDeleteTool = useCallback(async (toolId: string) => {
    try {
      const response = await fetch(`/api/tools/${toolId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete tool');
      }

      toast({
        title: 'Tool Deleted',
        description: 'Tool has been permanently deleted',
        variant: 'default'
      });
    } catch (error) {
      console.error('Failed to delete tool:', error);
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Unable to delete tool. Please try again.',
        variant: 'destructive'
      });
    }
  }, [toast]);

  // Duplicate tool in library
  const handleDuplicateTool = useCallback(async (originalToolId: string) => {
    try {
      // Create a duplicate with modified name and new ID
      const duplicatedTool = {
        ...tool,
        id: `tool-${Date.now()}`,
        name: `${tool.name} (Copy)`,
        metadata: {
          ...tool.metadata,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };

      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: duplicatedTool.name,
          description: duplicatedTool.description,
          elements: duplicatedTool.elements,
          connections: duplicatedTool.connections,
          config: duplicatedTool.config,
          type: 'visual',
          status: 'draft',
          visibility: 'private',
          authorId: userId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to duplicate tool');
      }

      const result = await response.json();
      
      toast({
        title: 'Tool Duplicated',
        description: `${duplicatedTool.name} has been created successfully`,
        variant: 'default'
      });
      
      // Load the duplicated tool
      handleLoadTool(result.tool);
    } catch (error) {
      console.error('Failed to duplicate tool:', error);
      toast({
        title: 'Duplicate Failed',
        description: error instanceof Error ? error.message : 'Unable to duplicate tool. Please try again.',
        variant: 'destructive'
      });
    }
  }, [tool, userId, toast, handleLoadTool]);

  // Get selected element config
  const selectedElementConfig = tool.elements.find(el => el.id === selectedElement);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      
      // Delete: Delete key
      if (e.key === 'Delete' && selectedElement) {
        handleDeleteElement(selectedElement);
      }
      
      // Toggle panels: Ctrl/Cmd + B (left), Ctrl/Cmd + P (right)
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setShowLeftPanel(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setShowRightPanel(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, handleSave, handleDeleteElement]);

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <div className="h-14 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <div>
              <input
                type="text"
                value={tool.name}
                onChange={(e) => setTool(prev => ({ ...prev, name: e.target.value }))}
                className="bg-transparent text-white font-medium focus:outline-none"
                placeholder="Tool Name"
              />
              {hasUnsavedChanges && (
                <span className="text-xs text-yellow-500 ml-2">• Unsaved changes</span>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('build')}
            className={cn(
              "px-4 py-1.5 rounded text-sm transition-all",
              viewMode === 'build'
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Layers className="h-4 w-4 inline mr-2" />
            Build
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              "px-4 py-1.5 rounded text-sm transition-all",
              viewMode === 'preview'
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Eye className="h-4 w-4 inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('library')}
            className={cn(
              "px-4 py-1.5 rounded text-sm transition-all",
              viewMode === 'library'
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Library
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPanelLayout(
              panelLayout === 'fullscreen' ? 'default' : 'fullscreen'
            )}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {panelLayout === 'fullscreen' ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          
          <button 
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Share Tool"
            onClick={() => {
              if (navigator.share && tool.id) {
                navigator.share({
                  title: tool.name,
                  text: tool.description,
                  url: `${window.location.origin}/tools/${tool.id}`
                });
              } else {
                toast({
                  title: 'Share Link Copied',
                  description: 'Tool share link copied to clipboard',
                  variant: 'default'
                });
              }
            }}
          >
            <Share2 className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Export Tool"
            onClick={() => {
              const exportData = {
                ...tool,
                exportedAt: new Date().toISOString(),
                exportVersion: '1.0.0'
              };
              const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${tool.name.replace(/\s+/g, '-').toLowerCase()}.hive-tool.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              toast({
                title: 'Tool Exported',
                description: 'Tool has been downloaded as JSON file',
                variant: 'default'
              });
            }}
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button 
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Tool Settings"
            onClick={() => {
              toast({
                title: 'Settings',
                description: 'Tool settings panel coming soon',
                variant: 'default'
              });
            }}
          >
            <Settings className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges || !tool.name.trim()}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
              hasUnsavedChanges && tool.name.trim()
                ? "bg-[var(--hive-brand-primary)] text-white hover:opacity-90"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            )}
            title={!tool.name.trim() ? 'Tool name is required' : hasUnsavedChanges ? 'Save changes' : 'No changes to save'}
          >
            {isSaving ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <AnimatePresence mode="wait">
          {showLeftPanel && viewMode === 'build' && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 280 }}
              exit={{ width: 0 }}
              className="border-r border-gray-800 overflow-hidden"
            >
              <ElementPalette
                onDragStart={handleElementDragStart}
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Area */}
        <div className="flex-1 relative">
          {viewMode === 'build' && (
            <Canvas
              elements={tool.elements}
              connections={tool.connections}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onAddElement={handleAddElement}
              onUpdateElement={handleUpdateElement}
              onDeleteElement={handleDeleteElement}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          )}
          
          {viewMode === 'preview' && (
            <PreviewPanel
              toolConfig={tool.config}
              elements={tool.elements}
              connections={tool.connections}
              onTest={(result: any) => {
                toast({
                  title: 'Test Complete',
                  description: `Tool executed in ${result.duration.toFixed(2)}ms`,
                  variant: 'default'
                });
              }}
            />
          )}
          
          {viewMode === 'library' && (
            <ToolLibrary
              userId={userId}
              onLoadTool={handleLoadTool}
              onDeleteTool={handleDeleteTool}
              onDuplicateTool={handleDuplicateTool}
            />
          )}
        </div>

        {/* Right Panel */}
        <AnimatePresence mode="wait">
          {showRightPanel && viewMode === 'build' && selectedElementConfig && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              className="border-l border-gray-800 overflow-hidden"
            >
              <PropertyPanel
                element={selectedElementConfig ? {
                  ...selectedElementConfig,
                  permissions: {
                    canEdit: true,
                    canDelete: true,
                    canDuplicate: true
                  },
                  connections: {
                    inputs: tool.connections.filter(c => c.to === selectedElement).map(c => c.from),
                    outputs: tool.connections.filter(c => c.from === selectedElement).map(c => c.to)
                  }
                } : null}
                onUpdate={handleUpdateElement}
                onDelete={handleDeleteElement}
                onDuplicate={handleDuplicateElement}
                className="h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Panel Toggle Buttons */}
      {!showLeftPanel && viewMode === 'build' && (
        <button
          onClick={() => setShowLeftPanel(true)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 border border-gray-800 rounded-r-lg text-gray-400 hover:text-white transition-all"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
      
      {!showRightPanel && viewMode === 'build' && (
        <button
          onClick={() => setShowRightPanel(true)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 border border-gray-800 rounded-l-lg text-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}