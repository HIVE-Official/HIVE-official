"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, Button, Alert, AlertDescription } from '@hive/ui';
import { Play, Square, RefreshCw, Settings, ExternalLink } from 'lucide-react';
import { ToolComposition, ElementRegistry, ElementEngine } from '@/lib/element-system';
import { renderElement } from './element-renderers';

interface ToolRuntimeProps {
  composition: ToolComposition;
  deploymentId?: string;
  userId: string;
  mode?: 'preview' | 'live';
  onExecutionResult?: (result: any) => void;
  onError?: (error: string) => void;
}

interface ElementInstance {
  id: string;
  elementId: string;
  instanceId: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: any;
  isActive: boolean;
}

export function ToolRuntime({
  composition,
  deploymentId,
  userId,
  mode = 'preview',
  onExecutionResult,
  onError
}: ToolRuntimeProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [elementStates, setElementStates] = useState<Map<string, any>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [executionHistory, setExecutionHistory] = useState<any[]>([]);
  const [globalState, setGlobalState] = useState<Record<string, any>>({});

  const elementRegistry = useMemo(() => ElementRegistry.getInstance(), []);
  const elementEngine = useMemo(() => new ElementEngine(), []);

  // Initialize tool runtime
  useEffect(() => {
    initializeRuntime();
  }, [composition]);

  const initializeRuntime = async () => {
    try {
      setError(null);
      
      // Initialize element states
      const initialStates = new Map();
      composition.elements.forEach(element => {
        const elementDef = elementRegistry.getElement(element.elementId);
        if (elementDef) {
          initialStates.set(element.instanceId, {
            ...element.config,
            data: null,
            isActive: false
          });
        }
      });
      
      setElementStates(initialStates);
      
      // Initialize global state if in live mode
      if (mode === 'live' && deploymentId) {
        await initializeLiveState();
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize tool runtime';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const initializeLiveState = async () => {
    if (!deploymentId) return;
    
    try {
      const response = await fetch('/api/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deploymentId,
          action: 'initialize',
          context: { mode: 'live', userId }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize live state');
      }
      
      const result = await response.json();
      if (result.result?.state) {
        setGlobalState(result.result.state);
      }
    } catch (err) {
      console.error('Failed to initialize live state:', err);
    }
  };

  const handleElementChange = useCallback(async (instanceId: string, data: any) => {
    // Update local element state
    setElementStates(prev => {
      const newStates = new Map(prev);
      const currentState = newStates.get(instanceId) || {};
      newStates.set(instanceId, { ...currentState, data, lastUpdated: Date.now() });
      return newStates;
    });

    // Process data flow through connections
    processDataFlow(instanceId, data);

    // If in live mode, sync with backend
    if (mode === 'live' && deploymentId) {
      try {
        await syncWithBackend(instanceId, data);
      } catch (err) {
        console.error('Failed to sync with backend:', err);
      }
    }
  }, [composition.connections, deploymentId, mode]);

  const processDataFlow = (sourceInstanceId: string, data: any) => {
    // Find connections from this element
    const outgoingConnections = composition.connections.filter(
      conn => conn.from.instanceId === sourceInstanceId
    );

    // Update connected elements
    outgoingConnections.forEach(connection => {
      setElementStates(prev => {
        const newStates = new Map(prev);
        const targetState = newStates.get(connection.to.instanceId) || {};
        
        // Map output data to input format
        const mappedData = mapConnectionData(data, connection);
        
        newStates.set(connection.to.instanceId, {
          ...targetState,
          data: { ...targetState.data, ...mappedData },
          isActive: true,
          lastUpdated: Date.now()
        });
        
        return newStates;
      });
    });
  };

  const mapConnectionData = (sourceData: any, connection: any) => {
    // Simple data mapping - in a full implementation, this would be more sophisticated
    const outputKey = connection.from.output || 'output';
    const inputKey = connection.to.input || 'input';
    
    return {
      [inputKey]: sourceData[outputKey] || sourceData
    };
  };

  const syncWithBackend = async (instanceId: string, data: any) => {
    if (!deploymentId) return;

    try {
      const response = await fetch('/api/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deploymentId,
          action: 'element_update',
          elementId: instanceId,
          data,
          context: { userId, timestamp: Date.now() }
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.result) {
          onExecutionResult?.(result.result);
          
          // Update execution history
          setExecutionHistory(prev => [...prev, {
            timestamp: Date.now(),
            instanceId,
            action: 'element_update',
            data,
            result: result.result
          }].slice(-50)); // Keep last 50 executions
        }
      }
    } catch (err) {
      console.error('Backend sync failed:', err);
    }
  };

  const handleElementAction = async (instanceId: string, action: string, payload: any) => {
    if (mode === 'live' && deploymentId) {
      try {
        const response = await fetch('/api/tools/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deploymentId,
            action,
            elementId: instanceId,
            data: payload,
            context: { userId, timestamp: Date.now() }
          })
        });

        if (response.ok) {
          const result = await response.json();
          onExecutionResult?.(result.result);
          
          // Update execution history
          setExecutionHistory(prev => [...prev, {
            timestamp: Date.now(),
            instanceId,
            action,
            payload,
            result: result.result
          }].slice(-50));
        }
      } catch (err) {
        console.error('Action execution failed:', err);
        onError?.(`Failed to execute action: ${action}`);
      }
    } else {
      // Preview mode - just update local state
      console.log(`Preview action: ${action}`, { instanceId, payload });
    }
  };

  const startTool = () => {
    setIsRunning(true);
    setError(null);
    
    // Mark all elements as active
    setElementStates(prev => {
      const newStates = new Map();
      prev.forEach((state, instanceId) => {
        newStates.set(instanceId, { ...state, isActive: true });
      });
      return newStates;
    });
  };

  const stopTool = () => {
    setIsRunning(false);
    
    // Mark all elements as inactive
    setElementStates(prev => {
      const newStates = new Map();
      prev.forEach((state, instanceId) => {
        newStates.set(instanceId, { ...state, isActive: false });
      });
      return newStates;
    });
  };

  const resetTool = async () => {
    setIsRunning(false);
    setError(null);
    setExecutionHistory([]);
    await initializeRuntime();
  };

  // Render elements in grid layout
  const renderElements = () => {
    if (composition.layout === 'grid') {
      return (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {composition.elements.map(element => {
            const elementDef = elementRegistry.getElement(element.elementId);
            const elementState = elementStates.get(element.instanceId);
            
            if (!elementDef) return null;

            return (
              <Card 
                key={element.instanceId}
                className={`transition-all duration-200 ${
                  elementState?.isActive ? 'border-primary shadow-sm' : 'border-border'
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{elementDef.name}</span>
                      {mode === 'live' && (
                        <div className={`w-2 h-2 rounded-full ${
                          elementState?.isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{elementDef.description}</p>
                  </div>
                  
                  {elementDef.render({
                    id: element.instanceId,
                    config: element.config,
                    data: elementState?.data,
                    onChange: (data) => handleElementChange(element.instanceId, data),
                    onAction: (action, payload) => handleElementAction(element.instanceId, action, payload)
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }

    // Other layout types can be implemented here
    return <div>Layout type "{composition.layout}" not implemented</div>;
  };

  return (
    <div className="space-y-4">
      {/* Tool Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{composition.name}</h2>
          <p className="text-sm text-muted-foreground">{composition.description}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {mode === 'preview' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={resetTool}
                disabled={isRunning}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button
                size="sm"
                onClick={isRunning ? stopTool : startTool}
                variant={isRunning ? "destructive" : "default"}
              >
                {isRunning ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </>
                )}
              </Button>
            </>
          )}
          
          {mode === 'live' && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Live</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tool Elements */}
      {composition.elements.length > 0 ? (
        renderElements()
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No elements in this tool</p>
          </CardContent>
        </Card>
      )}

      {/* Execution History (for debugging in preview mode) */}
      {mode === 'preview' && executionHistory.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Execution History</h3>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {executionHistory.slice(-10).map((entry, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded">
                  <div className="flex justify-between">
                    <span>{entry.action} on {entry.instanceId}</span>
                    <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}