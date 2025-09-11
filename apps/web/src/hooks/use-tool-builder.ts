'use client';

import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';
import { authenticatedFetch } from '@/lib/api-client';

interface ToolElement {
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

interface ToolConnection {
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
  elements: ToolElement[];
  connections: ToolConnection[];
  config: Record<string, any>;
  metadata?: {
    author: string;
    version: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };
}

interface UseToolBuilderOptions {
  userId: string;
  spaceId?: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
}

export function useToolBuilder(options: UseToolBuilderOptions) {
  const { userId, spaceId, autoSave = false, autoSaveInterval = 30000 } = options;
  const { toast } = useToast();
  
  const [tool, setTool] = useState<Tool>({
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(tool.elements.length > 0 || tool.connections.length > 0);
  }, [tool]);

  // Auto-save
  useEffect(() => {
    if (!autoSave || !hasUnsavedChanges) return;
    
    const timer = setTimeout(() => {
      saveTool();
    }, autoSaveInterval);
    
    return () => clearTimeout(timer);
  }, [tool, autoSave, autoSaveInterval, hasUnsavedChanges]);

  // Load tool
  const loadTool = useCallback(async (toolId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authenticatedFetch(`/api/tools/${toolId}`);
      if (!response.ok) throw new Error('Failed to load tool');
      
      const data = await response.json();
      setTool(data);
      setSelectedElement(null);
      
      toast({
        title: 'Tool Loaded',
        description: `${data.name} has been loaded`,
        variant: 'default'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load tool';
      setError(message);
      toast({
        title: 'Load Failed',
        description: message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Save tool
  const saveTool = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await authenticatedFetch('/api/tools', {
        method: tool.id.startsWith('tool-') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tool,
          spaceId,
          authorId: userId
        })
      });
      
      if (!response.ok) throw new Error('Failed to save tool');
      
      const savedTool = await response.json();
      setTool(savedTool);
      setHasUnsavedChanges(false);
      
      toast({
        title: 'Tool Saved',
        description: `${tool.name} has been saved`,
        variant: 'default'
      });
      
      return savedTool;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save tool';
      setError(message);
      toast({
        title: 'Save Failed',
        description: message,
        variant: 'destructive'
      });
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [tool, spaceId, userId, isSaving, toast]);

  // Deploy tool
  const deployTool = useCallback(async (targetSpaceId: string) => {
    try {
      const response = await authenticatedFetch('/api/tools/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          spaceId: targetSpaceId
        })
      });
      
      if (!response.ok) throw new Error('Failed to deploy tool');
      
      const deployment = await response.json();
      
      toast({
        title: 'Tool Deployed',
        description: `${tool.name} has been deployed to the space`,
        variant: 'default'
      });
      
      return deployment;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to deploy tool';
      toast({
        title: 'Deploy Failed',
        description: message,
        variant: 'destructive'
      });
      throw err;
    }
  }, [tool, toast]);

  // Add element
  const addElement = useCallback((element: Omit<ToolElement, 'id'>) => {
    const newElement: ToolElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setTool(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
    
    setSelectedElement(newElement.id);
    return newElement;
  }, []);

  // Update element
  const updateElement = useCallback((elementId: string, updates: Partial<ToolElement>) => {
    setTool(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      ),
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
  }, []);

  // Delete element
  const deleteElement = useCallback((elementId: string) => {
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

  // Add connection
  const addConnection = useCallback((from: string, to: string, fromPort?: string, toPort?: string) => {
    const connectionExists = tool.connections.some(conn =>
      (conn.from === from && conn.to === to && conn.fromPort === fromPort && conn.toPort === toPort)
    );
    
    if (connectionExists) return null;
    
    const newConnection: ToolConnection = {
      id: `connection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from,
      to,
      fromPort,
      toPort
    };
    
    setTool(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection],
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
    
    return newConnection;
  }, [tool.connections]);

  // Remove connection
  const removeConnection = useCallback((connectionId: string) => {
    setTool(prev => ({
      ...prev,
      connections: prev.connections.filter(conn => conn.id !== connectionId),
      metadata: prev.metadata ? { ...prev.metadata, updatedAt: new Date() } : undefined
    }));
  }, []);

  // Validate tool
  const validateTool = useCallback(() => {
    const errors: string[] = [];
    
    if (!tool.name || tool.name === 'Untitled Tool') {
      errors.push('Tool must have a name');
    }
    
    if (tool.elements.length === 0) {
      errors.push('Tool must have at least one element');
    }
    
    // Check for orphaned connections
    tool.connections.forEach(conn => {
      const fromExists = tool.elements.some(el => el.id === conn.from);
      const toExists = tool.elements.some(el => el.id === conn.to);
      
      if (!fromExists || !toExists) {
        errors.push(`Connection ${conn.id} references non-existent elements`);
      }
    });
    
    // Check for circular dependencies
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    
    const hasCycle = (elementId: string): boolean => {
      visited.add(elementId);
      recursionStack.add(elementId);
      
      const outgoingConnections = tool.connections.filter(c => c.from === elementId);
      
      for (const conn of outgoingConnections) {
        if (!visited.has(conn.to)) {
          if (hasCycle(conn.to)) return true;
        } else if (recursionStack.has(conn.to)) {
          return true;
        }
      }
      
      recursionStack.delete(elementId);
      return false;
    };
    
    for (const element of tool.elements) {
      if (!visited.has(element.id)) {
        if (hasCycle(element.id)) {
          errors.push('Tool contains circular dependencies');
          break;
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }, [tool]);

  // Export tool
  const exportTool = useCallback(() => {
    const exportData = JSON.stringify(tool, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Tool Exported',
      description: `${tool.name} has been exported`,
      variant: 'default'
    });
  }, [tool, toast]);

  // Import tool
  const importTool = useCallback((file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const importedTool = JSON.parse(e.target?.result as string);
        
        // Generate new IDs to avoid conflicts
        const idMap = new Map<string, string>();
        
        importedTool.elements = importedTool.elements.map((el: ToolElement) => {
          const newId = `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          idMap.set(el.id, newId);
          return { ...el, id: newId };
        });
        
        importedTool.connections = importedTool.connections.map((conn: ToolConnection) => ({
          ...conn,
          id: `connection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          from: idMap.get(conn.from) || conn.from,
          to: idMap.get(conn.to) || conn.to
        }));
        
        importedTool.id = `tool-${Date.now()}`;
        importedTool.metadata = {
          ...importedTool.metadata,
          author: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        setTool(importedTool);
        setSelectedElement(null);
        
        toast({
          title: 'Tool Imported',
          description: `${importedTool.name} has been imported`,
          variant: 'default'
        });
      } catch (err) {
        toast({
          title: 'Import Failed',
          description: 'Invalid tool file',
          variant: 'destructive'
        });
      }
    };
    
    reader.readAsText(file);
  }, [userId, toast]);

  return {
    // State
    tool,
    selectedElement,
    hasUnsavedChanges,
    isSaving,
    isLoading,
    error,
    
    // Actions
    setTool,
    setSelectedElement,
    loadTool,
    saveTool,
    deployTool,
    addElement,
    updateElement,
    deleteElement,
    addConnection,
    removeConnection,
    validateTool,
    exportTool,
    importTool
  };
}