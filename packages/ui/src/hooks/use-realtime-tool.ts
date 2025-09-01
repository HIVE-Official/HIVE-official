/**
 * HIVE Real-time Tool Hook
 * Real-time state synchronization and updates for tools
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ToolUpdateEvent} from '../lib/api-client';
import { apiClient, ToolUpdatesResponse } from '../lib/api-client';
import { Tool } from '@hive/core';

interface RealtimeToolState {
  // Current tool state
  toolState: any;
  isLoading: boolean;
  error: string | null;
  
  // Sync status
  syncStatus: 'connected' | 'disconnected' | 'syncing' | 'conflict' | 'error';
  lastSync: Date | null;
  serverVersion: number;
  clientVersion: number;
  
  // Updates
  updates: ToolUpdateEvent[];
  pendingUpdates: number;
  
  // Connection status
  isConnected: boolean;
  connectionId: string | null;
}

interface RealtimeToolActions {
  // State management
  updateToolState: (newState: any, optimistic?: boolean) => Promise<void>;
  syncWithServer: (force?: boolean) => Promise<void>;
  resetToServerState: () => Promise<void>;
  
  // Real-time updates
  sendUpdate: (updateType: string, eventData: any) => Promise<void>;
  markUpdateAsRead: (updateId: string) => void;
  
  // Connection management
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
}

interface UseRealtimeToolOptions {
  toolId: string;
  deploymentId?: string;
  spaceId?: string;
  initialState?: any;
  autoConnect?: boolean;
  syncInterval?: number; // ms
  maxRetries?: number;
  onStateChange?: (newState: any, previousState: any) => void;
  onUpdate?: (update: ToolUpdateEvent) => void;
  onError?: (error: string) => void;
  onConnectionChange?: (isConnected: boolean) => void;
}

export function useRealtimeTool(options: UseRealtimeToolOptions): [RealtimeToolState, RealtimeToolActions] {
  const {
    toolId,
    deploymentId,
    spaceId,
    initialState = {},
    autoConnect = true,
    syncInterval = 5000,
    maxRetries = 3,
    onStateChange,
    onUpdate,
    onError,
    onConnectionChange,
  } = options;

  // State
  const [state, setState] = useState<RealtimeToolState>({
    toolState: initialState,
    isLoading: false,
    error: null,
    syncStatus: 'disconnected',
    lastSync: null,
    serverVersion: 0,
    clientVersion: 0,
    updates: [],
    pendingUpdates: 0,
    isConnected: false,
    connectionId: null,
  });

  // Refs for cleanup and intervals
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const lastSequenceNumberRef = useRef(0);
  const optimisticUpdatesRef = useRef<Map<string, any>>(new Map());

  // Generate connection ID
  const generateConnectionId = useCallback(() => {
    return `conn_${toolId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
  }, [toolId]);

  // Fetch initial tool updates and state
  const fetchInitialState = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiClient.getToolUpdates({
        toolId,
        deploymentId,
        spaceId,
        includeSnapshot: true,
        limit: 50,
      });

      const newState = response.stateSnapshot?.currentState || initialState;
      
      setState(prev => {
        const updatedState = {
          ...prev,
          toolState: newState,
          serverVersion: response.syncStatus.version,
          clientVersion: response.syncStatus.version,
          syncStatus: 'connected' as const,
          lastSync: new Date(),
          updates: response.updates,
          pendingUpdates: 0,
          isLoading: false,
        };

        // Notify state change
        if (onStateChange) {
          onStateChange(newState, prev.toolState);
        }

        return updatedState;
      });

      lastSequenceNumberRef.current = response.lastSequenceNumber;

      retryCountRef.current = 0;
    } catch (error: any) {
      const errorMessage = `Failed to load tool state: ${error.message}`;
      setState(prev => ({
        ...prev,
        error: errorMessage,
        syncStatus: 'error',
        isLoading: false,
      }));
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [toolId, deploymentId, spaceId, initialState, onStateChange, onError]);

  // Poll for updates
  const pollForUpdates = useCallback(async () => {
    if (state.syncStatus === 'disconnected' || state.isLoading) {
      return;
    }

    try {
      const response = await apiClient.getToolUpdates({
        toolId,
        deploymentId,
        spaceId,
        since: state.lastSync?.toISOString(),
        limit: 20,
      });

      if (response.updates.length > 0) {
        // Process new updates
        let newState = state.toolState;
        const newUpdates = [...state.updates];

        for (const update of response.updates) {
          // Skip updates we've already processed
          if (update.sequenceNumber <= lastSequenceNumberRef.current) {
            continue;
          }

          // Apply state changes
          if (update.eventData.newState) {
            newState = update.eventData.newState;
          }

          newUpdates.unshift(update);
          lastSequenceNumberRef.current = Math.max(lastSequenceNumberRef.current, update.sequenceNumber);

          // Notify about update
          if (onUpdate) {
            onUpdate(update);
          }
        }

        // Update state
        setState(prev => ({
          ...prev,
          toolState: newState,
          updates: newUpdates.slice(0, 100), // Keep last 100 updates
          serverVersion: response.syncStatus.version,
          lastSync: new Date(),
          pendingUpdates: response.syncStatus.pendingUpdates,
        }));

        // Notify state change if state actually changed
        if (JSON.stringify(newState) !== JSON.stringify(state.toolState)) {
          if (onStateChange) {
            onStateChange(newState, state.toolState);
          }
        }
      }

      // Update sync status
      setState(prev => ({
        ...prev,
        syncStatus: response.syncStatus.status === 'synced' ? 'connected' : 'conflict',
        lastSync: new Date(),
      }));

      retryCountRef.current = 0;
    } catch (error: any) {
      retryCountRef.current++;
      
      if (retryCountRef.current >= maxRetries) {
        setState(prev => ({
          ...prev,
          syncStatus: 'error',
          error: `Connection lost: ${error.message}`,
        }));
        
        if (onError) {
          onError(`Connection lost after ${maxRetries} retries`);
        }
      }
    }
  }, [toolId, deploymentId, spaceId, state, maxRetries, onUpdate, onStateChange, onError]);

  // Connect to real-time updates
  const connect = useCallback(() => {
    if (state.isConnected) {
      return;
    }

    const connectionId = generateConnectionId();
    
    setState(prev => ({
      ...prev,
      isConnected: true,
      connectionId,
      syncStatus: 'syncing',
    }));

    // Initial state fetch
    fetchInitialState();

    // Start polling for updates
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
    }
    
    syncIntervalRef.current = setInterval(pollForUpdates, syncInterval);

    if (onConnectionChange) {
      onConnectionChange(true);
    }
  }, [state.isConnected, generateConnectionId, fetchInitialState, pollForUpdates, syncInterval, onConnectionChange]);

  // Disconnect from real-time updates
  const disconnect = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
      syncIntervalRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isConnected: false,
      connectionId: null,
      syncStatus: 'disconnected',
    }));

    if (onConnectionChange) {
      onConnectionChange(false);
    }
  }, [onConnectionChange]);

  // Reconnect
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 1000);
  }, [disconnect, connect]);

  // Update tool state (with optimistic updates)
  const updateToolState = useCallback(async (newState: any, optimistic: boolean = true) => {
    const updateId = `update_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    const previousState = state.toolState;

    try {
      // Optimistic update
      if (optimistic) {
        setState(prev => ({
          ...prev,
          toolState: newState,
          clientVersion: prev.clientVersion + 1,
        }));
        
        optimisticUpdatesRef.current.set(updateId, { previousState, newState });

        // Notify state change immediately
        if (onStateChange) {
          onStateChange(newState, previousState);
        }
      }

      // Send update to server
      const response = await apiClient.syncToolState({
        toolId,
        deploymentId,
        clientVersion: state.clientVersion + 1,
        clientState: newState,
        conflictResolution: 'latest_wins',
      });

      // Update with server response
      setState(prev => ({
        ...prev,
        toolState: response.serverState,
        serverVersion: response.serverVersion,
        clientVersion: response.serverVersion,
        syncStatus: response.conflicts.length > 0 ? 'conflict' : 'connected',
        lastSync: new Date(),
      }));

      // Remove optimistic update
      optimisticUpdatesRef.current.delete(updateId);

      // Handle conflicts
      if (response.conflicts.length > 0) {
        console.warn('Tool state conflicts detected:', response.conflicts);
        
        if (onError) {
          onError(`State conflicts detected. Resolution: ${response.resolutionStrategy}`);
        }
      }

    } catch (error: any) {
      // Revert optimistic update on error
      if (optimistic && optimisticUpdatesRef.current.has(updateId)) {
        setState(prev => ({
          ...prev,
          toolState: previousState,
          clientVersion: prev.clientVersion - 1,
        }));
        
        optimisticUpdatesRef.current.delete(updateId);

        if (onStateChange) {
          onStateChange(previousState, newState);
        }
      }

      const errorMessage = `Failed to update tool state: ${error.message}`;
      setState(prev => ({ ...prev, error: errorMessage }));
      
      if (onError) {
        onError(errorMessage);
      }

      throw error;
    }
  }, [toolId, deploymentId, state, onStateChange, onError]);

  // Force sync with server
  const syncWithServer = useCallback(async (force: boolean = false) => {
    setState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    try {
      const response = await apiClient.syncToolState({
        toolId,
        deploymentId,
        clientVersion: state.clientVersion,
        clientState: state.toolState,
        conflictResolution: 'latest_wins',
        forceMerge: force,
      });

      setState(prev => ({
        ...prev,
        toolState: response.serverState,
        serverVersion: response.serverVersion,
        clientVersion: response.serverVersion,
        syncStatus: 'connected',
        lastSync: new Date(),
        error: null,
      }));

      if (onStateChange) {
        onStateChange(response.serverState, state.toolState);
      }

    } catch (error: any) {
      setState(prev => ({
        ...prev,
        syncStatus: 'error',
        error: `Sync failed: ${error.message}`,
      }));
      
      if (onError) {
        onError(`Sync failed: ${error.message}`);
      }
    }
  }, [toolId, deploymentId, state, onStateChange, onError]);

  // Reset to server state
  const resetToServerState = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await apiClient.getToolUpdates({
        toolId,
        deploymentId,
        spaceId,
        includeSnapshot: true,
      });

      const serverState = response.stateSnapshot?.currentState || {};
      
      setState(prev => ({
        ...prev,
        toolState: serverState,
        serverVersion: response.syncStatus.version,
        clientVersion: response.syncStatus.version,
        syncStatus: 'connected',
        lastSync: new Date(),
        error: null,
        isLoading: false,
      }));

      // Clear optimistic updates
      optimisticUpdatesRef.current.clear();

      if (onStateChange) {
        onStateChange(serverState, state.toolState);
      }

    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: `Failed to reset state: ${error.message}`,
        isLoading: false,
      }));
      
      if (onError) {
        onError(`Failed to reset state: ${error.message}`);
      }
    }
  }, [toolId, deploymentId, spaceId, state.toolState, onStateChange, onError]);

  // Send real-time update
  const sendUpdate = useCallback(async (updateType: string, eventData: any) => {
    try {
      await apiClient.sendToolUpdate({
        toolId,
        deploymentId,
        spaceId,
        updateType,
        eventData: {
          ...eventData,
          previousState: state.toolState,
          metadata: {
            ...eventData.metadata,
            connectionId: state.connectionId,
            timestamp: new Date().toISOString(),
          },
        },
        broadcastToSpace: true,
      });
    } catch (error: any) {
      console.error('Failed to send tool update:', error);
      
      if (onError) {
        onError(`Failed to send update: ${error.message}`);
      }
    }
  }, [toolId, deploymentId, spaceId, state.toolState, state.connectionId, onError]);

  // Mark update as read
  const markUpdateAsRead = useCallback((updateId: string) => {
    setState(prev => ({
      ...prev,
      updates: prev.updates.map(update => 
        update.id === updateId 
          ? { ...update, isRead: true } 
          : update
      ),
    }));
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, []);

  const actions: RealtimeToolActions = {
    updateToolState,
    syncWithServer,
    resetToServerState,
    sendUpdate,
    markUpdateAsRead,
    connect,
    disconnect,
    reconnect,
  };

  return [state, actions];
}

// Convenience hook for simple tool state management
export function useToolState(toolId: string, initialState: any = {}) {
  const [realtimeState, realtimeActions] = useRealtimeTool({
    toolId,
    initialState,
    autoConnect: true,
  });

  return {
    state: realtimeState.toolState,
    setState: realtimeActions.updateToolState,
    isLoading: realtimeState.isLoading,
    error: realtimeState.error,
    isConnected: realtimeState.isConnected,
    sync: realtimeActions.syncWithServer,
  };
}