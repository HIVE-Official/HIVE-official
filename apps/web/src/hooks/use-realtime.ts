import { useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketClient, type WebSocketMessage, type ConnectionConfig } from '@/lib/websocket-client';
import { useAuth } from './use-auth';
import { logger } from '@/lib/logger';

interface RealtimeState {
  isConnected: boolean;
  isConnecting: boolean;
  connectionId: string | null;
  error: Error | null;
  reconnectAttempts: number;
}

interface PresenceData {
  userId: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  metadata?: any;
}

interface RealtimeHook {
  // Connection state
  state: RealtimeState;
  
  // Connection methods
  connect: () => Promise<void>;
  disconnect: () => void;
  reconnect: () => Promise<void>;
  
  // Messaging
  sendMessage: (message: Omit<WebSocketMessage, 'id' | 'senderId' | 'metadata'>) => Promise<void>;
  
  // Presence
  updatePresence: (status: 'online' | 'away' | 'busy', metadata?: any) => Promise<void>;
  getPresence: (userId: string) => PresenceData | null;
  
  // Channels
  subscribeToChannel: (channel: string) => Promise<void>;
  unsubscribeFromChannel: (channel: string) => Promise<void>;
  
  // Event listeners
  onMessage: (callback: (message: WebSocketMessage) => void) => () => void;
  onPresence: (callback: (presenceData: PresenceData) => void) => () => void;
  onError: (callback: (error: Error) => void) => () => void;
  
  // Typing indicators
  sendTyping: (channel: string, isTyping: boolean) => void;
  onTyping: (callback: (data: { userId: string; channel: string; isTyping: boolean }) => void) => () => void;
}

export function useRealtime(config?: Partial<ConnectionConfig>): RealtimeHook {
  const { user } = useAuth();
  const [state, setState] = useState<RealtimeState>({
    isConnected: false,
    isConnecting: false,
    connectionId: null,
    error: null,
    reconnectAttempts: 0
  });

  const clientRef = useRef<WebSocketClient | null>(null);
  const presenceDataRef = useRef<Map<string, PresenceData>>(new Map());
  const typingTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Default configuration
  const defaultConfig: ConnectionConfig = {
    connectionType: 'notifications',
    settings: {
      enableNotifications: true,
      enablePresence: true,
      enableToolUpdates: true,
      messagePreferences: {
        sound: true,
        desktop: true,
        mobile: true
      }
    }
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Initialize WebSocket client
  useEffect(() => {
    if (!user) {
      return;
    }

    const client = new WebSocketClient(finalConfig);
    clientRef.current = client;

    // Setup event listeners
    const handleConnected = (connectionId: string) => {
      setState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        connectionId,
        error: null,
        reconnectAttempts: 0
      }));
      logger.info('Realtime connection established', { connectionId });
    };

    const handleDisconnected = (reason: string) => {
      setState(prev => ({
        ...prev,
        isConnected: false,
        isConnecting: false,
        connectionId: null
      }));
      logger.info('Realtime connection lost', { reason });
    };

    const handleReconnecting = (attempt: number) => {
      setState(prev => ({
        ...prev,
        isConnecting: true,
        reconnectAttempts: attempt
      }));
      logger.info('Attempting to reconnect', { attempt });
    };

    const handleError = (error: Error) => {
      setState(prev => ({
        ...prev,
        error,
        isConnecting: false
      }));
      logger.error('Realtime connection error', { error });
    };

    const handlePresence = (presenceData: PresenceData) => {
      presenceDataRef.current.set(presenceData.userId, presenceData);
    };

    // Add event listeners
    client.on('connected', handleConnected);
    client.on('disconnected', handleDisconnected);
    client.on('reconnecting', handleReconnecting);
    client.on('error', handleError);
    client.on('presence', handlePresence);

    // Auto-connect
    if (user) {
      setState(prev => ({ ...prev, isConnecting: true }));
      client.connect().catch(error => {
        logger.error('Failed to auto-connect', { error });
      });
    }

    // Cleanup on unmount
    return () => {
      client.disconnect();
      clientRef.current = null;
      
      // Clear typing timers
      typingTimersRef.current.forEach(timer => clearTimeout(timer));
      typingTimersRef.current.clear();
    };
  }, [user, finalConfig.connectionType, finalConfig.spaceId]);

  // Connection methods
  const connect = useCallback(async (): Promise<void> => {
    if (clientRef.current && !state.isConnected) {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));
      return clientRef.current.connect();
    }
  }, [state.isConnected]);

  const disconnect = useCallback((): void => {
    if (clientRef.current) {
      clientRef.current.disconnect();
    }
  }, []);

  const reconnect = useCallback(async (): Promise<void> => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return clientRef.current.connect();
    }
  }, []);

  // Messaging
  const sendMessage = useCallback(async (message: Omit<WebSocketMessage, 'id' | 'senderId' | 'metadata'>): Promise<void> => {
    if (clientRef.current) {
      return clientRef.current.sendMessage(message);
    }
    throw new Error('WebSocket client not initialized');
  }, []);

  // Presence
  const updatePresence = useCallback(async (status: 'online' | 'away' | 'busy', metadata?: any): Promise<void> => {
    if (clientRef.current) {
      return clientRef.current.updatePresence(status, metadata);
    }
  }, []);

  const getPresence = useCallback((userId: string): PresenceData | null => {
    return presenceDataRef.current.get(userId) || null;
  }, []);

  // Channels
  const subscribeToChannel = useCallback(async (channel: string): Promise<void> => {
    if (clientRef.current) {
      return clientRef.current.subscribeToChannel(channel);
    }
  }, []);

  const unsubscribeFromChannel = useCallback(async (channel: string): Promise<void> => {
    if (clientRef.current) {
      return clientRef.current.unsubscribeFromChannel(channel);
    }
  }, []);

  // Event listeners
  const onMessage = useCallback((callback: (message: WebSocketMessage) => void) => {
    if (clientRef.current) {
      clientRef.current.on('message', callback);
      return () => clientRef.current?.off('message', callback);
    }
    return () => {};
  }, []);

  const onPresence = useCallback((callback: (presenceData: PresenceData) => void) => {
    if (clientRef.current) {
      clientRef.current.on('presence', callback);
      return () => clientRef.current?.off('presence', callback);
    }
    return () => {};
  }, []);

  const onError = useCallback((callback: (error: Error) => void) => {
    if (clientRef.current) {
      clientRef.current.on('error', callback);
      return () => clientRef.current?.off('error', callback);
    }
    return () => {};
  }, []);

  // Typing indicators
  const sendTyping = useCallback((channel: string, isTyping: boolean): void => {
    if (!clientRef.current || !user) return;

    // Clear existing timer for this channel
    const existingTimer = typingTimersRef.current.get(channel);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    if (isTyping) {
      // Send typing indicator
      clientRef.current.sendMessage({
        type: 'system',
        channel,
        content: {
          type: 'typing_start',
          userId: user.id,
          timestamp: new Date().toISOString()
        }
      }).catch(error => {
        logger.error('Failed to send typing indicator', { error });
      });

      // Set timer to automatically stop typing after 3 seconds
      const timer = setTimeout(() => {
        sendTyping(channel, false);
      }, 3000);

      typingTimersRef.current.set(channel, timer);
    } else {
      // Send stop typing indicator
      clientRef.current.sendMessage({
        type: 'system',
        channel,
        content: {
          type: 'typing_stop',
          userId: user.id,
          timestamp: new Date().toISOString()
        }
      }).catch(error => {
        logger.error('Failed to send stop typing indicator', { error });
      });

      typingTimersRef.current.delete(channel);
    }
  }, [user]);

  const onTyping = useCallback((callback: (data: { userId: string; channel: string; isTyping: boolean }) => void) => {
    const messageHandler = (message: WebSocketMessage) => {
      if (message.type === 'system' && message.content?.type?.startsWith('typing_')) {
        callback({
          userId: message.content.userId,
          channel: message.channel,
          isTyping: message.content.type === 'typing_start'
        });
      }
    };

    return onMessage(messageHandler);
  }, [onMessage]);

  return {
    state,
    connect,
    disconnect,
    reconnect,
    sendMessage,
    updatePresence,
    getPresence,
    subscribeToChannel,
    unsubscribeFromChannel,
    onMessage,
    onPresence,
    onError,
    sendTyping,
    onTyping
  };
}

// Specialized hooks for specific use cases
export function useSpaceRealtime(spaceId: string) {
  return useRealtime({
    connectionType: 'chat',
    spaceId,
    channels: [
      `space:${spaceId}:chat`,
      `space:${spaceId}:presence`,
      `space:${spaceId}:posts`,
      `space:${spaceId}:events`
    ]
  });
}

export function useFeedRealtime() {
  return useRealtime({
    connectionType: 'feed',
    channels: ['feed:updates', 'feed:notifications']
  });
}

export function useToolRealtime(toolId?: string) {
  const channels = toolId 
    ? [`tool:${toolId}:updates`, `tool:${toolId}:comments`]
    : ['tools:updates'];

  return useRealtime({
    connectionType: 'tool_updates',
    channels
  });
}

export function useNotificationRealtime() {
  return useRealtime({
    connectionType: 'notifications',
    settings: {
      enableNotifications: true,
      enablePresence: false,
      enableToolUpdates: false,
      messagePreferences: {
        sound: true,
        desktop: true,
        mobile: true
      }
    }
  });
}