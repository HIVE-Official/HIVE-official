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

  // Save tool
  const handleSave = useCallback(async () => {
    if (!onSave) return;
    
    setIsSaving(true);
    try {
      await onSave(tool);
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
        description: 'Unable to save tool. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  }, [tool, onSave, toast]);

  // Load tool from library
  const handleLoadTool = useCallback((loadedTool: any) => {
    setTool({
      ...loadedTool,
      id: loadedTool.id || `tool-${Date.now()}`,
      metadata: {
        ...loadedTool.metadata,
        updatedAt: new Date()
      }
    });
    setViewMode('build');
    setSelectedElement(null);
  }, []);

  // Delete tool from library
  const handleDeleteTool = useCallback((toolId: string) => {
    
  }, []);

  // Duplicate tool in library
  const handleDuplicateTool = useCallback((toolId: string) => {
    
  }, []);

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
          >
            {panelLayout === 'fullscreen' ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Download className="h-4 w-4" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
              hasUnsavedChanges
                ? "bg-[var(--hive-brand-primary)] text-white hover:opacity-90"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            )}
          >
            <Save className="h-4 w-4" />
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
              onTest={(result) => {
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