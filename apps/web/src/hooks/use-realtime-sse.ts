/**
 * React hook for Server-Sent Events real-time communication
 * Replaces broken Firebase Realtime Database WebSocket connection
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { RealtimeMessage } from '@/lib/sse-realtime-service';

export interface SSEConnectionState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  connectionId: string | null;
  messageCount: number;
}

export interface UseRealtimeSSEOptions {
  channels: string[];
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  onMessage?: (message: RealtimeMessage) => void;
  onConnectionChange?: (state: SSEConnectionState) => void;
}

export function useRealtimeSSE(options: UseRealtimeSSEOptions) {
  const {
    channels,
    reconnectDelay = 3000,
    maxReconnectAttempts = 5,
    onMessage,
    onConnectionChange
  } = options;

  const [state, setState] = useState<SSEConnectionState>({
    connected: false,
    connecting: false,
    error: null,
    connectionId: null,
    messageCount: 0
  });

  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = useCallback((updates: Partial<SSEConnectionState>) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      onConnectionChange?.(newState);
      return newState;
    });
  }, [onConnectionChange]);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    updateState({ connecting: true, error: null });

    try {
      const channelsParam = channels.join(',');
      const eventSource = new EventSource(`/api/realtime/sse?channels=${encodeURIComponent(channelsParam)}`, {
        withCredentials: true
      });

      eventSource.onopen = () => {
        reconnectAttemptsRef.current = 0;
        updateState({
          connected: true,
          connecting: false,
          error: null
        });
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'connection') {
            updateState({
              connectionId: data.data.connectionId,
              connected: true,
              connecting: false
            });
          } else if (data.type === 'message') {
            const message: RealtimeMessage = data.data;
            
            setMessages(prev => [...prev, message]);
            updateState({
              messageCount: state.messageCount + 1
            });
            
            onMessage?.(message);
          }
        } catch (error) {
        }
      };

      eventSource.onerror = (error) => {
        
        updateState({
          connected: false,
          connecting: false,
          error: 'Connection failed'
        });

        // Attempt reconnection
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectDelay * reconnectAttemptsRef.current);
        } else {
          updateState({
            error: `Failed to connect after ${maxReconnectAttempts} attempts`
          });
        }
      };

      eventSourceRef.current = eventSource;

    } catch (error) {
      updateState({
        connected: false,
        connecting: false,
        error: 'Failed to create connection'
      });
    }
  }, [channels, maxReconnectAttempts, reconnectDelay, updateState, onMessage]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    updateState({
      connected: false,
      connecting: false,
      connectionId: null
    });
  }, [updateState]);

  const sendMessage = useCallback(async (
    type: RealtimeMessage['type'],
    channel: string,
    content: any,
    targetUsers?: string[]
  ) => {
    try {
      const response = await fetch('/api/realtime/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          channel,
          content,
          targetUsers,
          metadata: {
            timestamp: new Date().toISOString(),
            priority: 'normal',
            requiresAck: false,
            retryCount: 0
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const result = await response.json();
      return result.messageId;
    } catch (error) {
      throw error;
    }
  }, []);

  const sendChatMessage = useCallback(async (
    spaceId: string,
    content: string,
    type: 'text' | 'image' | 'file' = 'text'
  ) => {
    return sendMessage('chat', `space:${spaceId}`, {
      spaceId,
      message: content,
      messageType: type
    });
  }, [sendMessage]);

  const updatePresence = useCallback(async (
    status: 'online' | 'away' | 'offline',
    currentSpace?: string
  ) => {
    try {
      await fetch('/api/realtime/presence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          currentSpace
        })
      });
    } catch (error) {
    }
  }, []);

  const getChannelMessages = useCallback((channel: string): RealtimeMessage[] => {
    return messages.filter(msg => msg.channel === channel);
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    updateState({ messageCount: 0 });
  }, [updateState]);

  // Auto-connect on mount, disconnect on unmount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Reconnect when channels change
  useEffect(() => {
    if (state.connected) {
      disconnect();
      setTimeout(connect, 100); // Small delay to ensure clean disconnect
    }
  }, [channels.join(',')]);

  return {
    // Connection state
    ...state,
    
    // Messages
    messages,
    getChannelMessages,
    clearMessages,
    
    // Connection control
    connect,
    disconnect,
    
    // Messaging
    sendMessage,
    sendChatMessage,
    updatePresence
  };
}