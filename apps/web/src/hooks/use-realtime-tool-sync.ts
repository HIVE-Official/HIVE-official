import { useState, useEffect, useCallback, useRef } from 'react';
import { realtimeService, RealtimeMessage } from '@/lib/firebase-realtime';
import { logger } from '@/lib/logger';

interface ToolState {
  id: string;
  data: any;
  lastUpdated: Date;
  updatedBy: string;
  version: number;
  spaceId: string;
}

interface ToolUpdate {
  id: string;
  toolId: string;
  updateType: string;
  data: any;
  timestamp: Date;
  userId: string;
}

interface UseRealtimeToolSyncOptions {
  toolId: string;
  spaceId: string;
  userId: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
  onToolUpdate?: (update: ToolUpdate) => void;
  onStateChange?: (state: ToolState) => void;
}

interface UseRealtimeToolSyncReturn {
  currentState: ToolState | null;
  recentUpdates: ToolUpdate[];
  isLoading: boolean;
  isConnected: boolean;
  isSyncing: boolean;
  error: Error | null;
  updateToolState: (data: any, updateType?: string) => Promise<boolean>;
  resetState: () => void;
  reconnect: () => void;
}

export function useRealtimeToolSync(
  options: UseRealtimeToolSyncOptions
): UseRealtimeToolSyncReturn {
  const { 
    toolId, 
    spaceId, 
    userId, 
    enabled = true, 
    onError, 
    onToolUpdate,
    onStateChange 
  } = options;
  
  const [currentState, setCurrentState] = useState<ToolState | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<ToolUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const cleanupRef = useRef<(() => void) | null>(null);
  const stateVersionRef = useRef(0);

  // Set up tool updates listener
  useEffect(() => {
    if (!enabled || !toolId || !spaceId || !realtimeService?.isAvailable()) {
      setIsLoading(false);
      setIsConnected(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Listen to tool updates channel for the space
      const toolUpdatesChannel = `space:${spaceId}:tools`;
      
      const unsubscribe = realtimeService.listenToChannel(
        toolUpdatesChannel,
        (messages: RealtimeMessage[]) => {
          // Filter messages for this specific tool
          const toolMessages = messages.filter(msg => 
            msg.type === 'tool_update' && 
            msg.content.toolId === toolId
          );

          if (toolMessages.length > 0) {
            // Process tool updates
            const updates = toolMessages.map(msg => convertMessageToUpdate(msg));
            
            // Get the latest state update
            const latestStateUpdate = updates
              .filter(update => update.updateType === 'state_change')
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

            if (latestStateUpdate) {
              const newState: ToolState = {
                id: latestStateUpdate.toolId,
                data: latestStateUpdate.data,
                lastUpdated: latestStateUpdate.timestamp,
                updatedBy: latestStateUpdate.userId,
                version: stateVersionRef.current + 1,
                spaceId
              };

              setCurrentState(newState);
              stateVersionRef.current = newState.version;
              onStateChange?.(newState);
            }

            // Update recent updates (keep last 20)
            setRecentUpdates(prev => {
              const newUpdates = [...prev, ...updates]
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, 20);
              return newUpdates;
            });

            // Call update callback for latest update
            const latestUpdate = updates[updates.length - 1];
            if (latestUpdate && latestUpdate.userId !== userId) {
              onToolUpdate?.(latestUpdate);
            }
          }

          setIsLoading(false);
          setIsConnected(true);
        }
      );

      cleanupRef.current = unsubscribe;
      logger.info('Tool sync listener established', { toolId, spaceId });

    } catch (err) {
      const error = err as Error;
      setError(error);
      setIsLoading(false);
      setIsConnected(false);
      onError?.(error);
      logger.error('Failed to establish tool sync listener', { error, toolId, spaceId });
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [toolId, spaceId, userId, enabled, onError, onToolUpdate, onStateChange]);

  // Convert RealtimeMessage to ToolUpdate
  const convertMessageToUpdate = (message: RealtimeMessage): ToolUpdate => {
    return {
      id: message.id,
      toolId: message.content.toolId,
      updateType: message.content.updateType || 'state_change',
      data: message.content.data,
      timestamp: new Date(message.metadata.timestamp.toMillis()),
      userId: message.senderId,
    };
  };

  // Update tool state function
  const updateToolState = useCallback(async (
    data: any, 
    updateType: string = 'state_change'
  ): Promise<boolean> => {
    if (!realtimeService?.isAvailable() || isSyncing) {
      return false;
    }

    setIsSyncing(true);
    setError(null);

    try {
      await realtimeService.sendToolUpdate(toolId, spaceId, userId, {
        type: updateType,
        data,
        timestamp: new Date().toISOString(),
        version: stateVersionRef.current + 1
      });

      // Optimistically update local state
      const newState: ToolState = {
        id: toolId,
        data,
        lastUpdated: new Date(),
        updatedBy: userId,
        version: stateVersionRef.current + 1,
        spaceId
      };

      setCurrentState(newState);
      stateVersionRef.current = newState.version;

      logger.info('Tool state updated successfully', { toolId, spaceId, updateType });
      setIsSyncing(false);
      return true;

    } catch (err) {
      const error = err as Error;
      setError(error);
      setIsSyncing(false);
      onError?.(error);
      logger.error('Failed to update tool state', { error, toolId, spaceId });
      return false;
    }
  }, [toolId, spaceId, userId, isSyncing, onError]);

  // Reset state function
  const resetState = useCallback(() => {
    setCurrentState(null);
    setRecentUpdates([]);
    stateVersionRef.current = 0;
    setError(null);
  }, []);

  // Reconnect function
  const reconnect = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    
    setError(null);
    setIsConnected(false);
    setIsLoading(true);
  }, []);

  return {
    currentState,
    recentUpdates,
    isLoading,
    isConnected,
    isSyncing,
    error,
    updateToolState,
    resetState,
    reconnect,
  };
}

// Helper hook for tool collaboration features
export function useRealtimeToolCollaboration(toolId: string, spaceId: string, userId: string) {
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [isCollaborating, setIsCollaborating] = useState(false);

  const startCollaboration = useCallback(async () => {
    if (!realtimeService?.isAvailable()) return false;

    try {
      await realtimeService.sendMessage({
        type: 'tool_update',
        channel: `space:${spaceId}:tools`,
        senderId: userId,
        content: {
          toolId,
          updateType: 'collaboration_start',
          userId,
          action: 'join'
        },
        metadata: {
          timestamp: new Date() as any,
          priority: 'normal',
          requiresAck: false,
          retryCount: 0
        }
      });

      setIsCollaborating(true);
      return true;
    } catch (error) {
      logger.error('Failed to start collaboration', { error, toolId });
      return false;
    }
  }, [toolId, spaceId, userId]);

  const endCollaboration = useCallback(async () => {
    if (!realtimeService?.isAvailable()) return false;

    try {
      await realtimeService.sendMessage({
        type: 'tool_update',
        channel: `space:${spaceId}:tools`,
        senderId: userId,
        content: {
          toolId,
          updateType: 'collaboration_end',
          userId,
          action: 'leave'
        },
        metadata: {
          timestamp: new Date() as any,
          priority: 'normal',
          requiresAck: false,
          retryCount: 0
        }
      });

      setIsCollaborating(false);
      return true;
    } catch (error) {
      logger.error('Failed to end collaboration', { error, toolId });
      return false;
    }
  }, [toolId, spaceId, userId]);

  return {
    collaborators,
    isCollaborating,
    startCollaboration,
    endCollaboration
  };
}