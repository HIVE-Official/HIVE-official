import { useState, useEffect, useCallback, useRef } from 'react';
import { realtimeService, ChatMessage } from '@/lib/firebase-realtime';
import { logger } from '@/lib/logger';

interface UseRealtimeChatOptions {
  spaceId: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
  onNewMessage?: (message: ChatMessage) => void;
}

interface UseRealtimeChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  error: Error | null;
  sendMessage: (content: string, type?: ChatMessage['type']) => Promise<string | null>;
  isTyping: boolean;
  typingUsers: string[];
  setIsTyping: (isTyping: boolean) => void;
  reconnect: () => void;
}

export function useRealtimeChat(options: UseRealtimeChatOptions): UseRealtimeChatReturn {
  const { spaceId, enabled = true, onError, onNewMessage } = options;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  
  const cleanupRef = useRef<(() => void) | null>(null);
  const typingCleanupRef = useRef<(() => void) | null>(null);
  const userId = useRef<string | null>(null); // Should come from auth context

  // Get user ID from auth (you'll need to integrate with your auth system)
  useEffect(() => {
    // TODO: Get actual user ID from your auth context
    // For now, using a placeholder
    userId.current = 'current-user-id';
  }, []);

  // Set up chat listener
  useEffect(() => {
    if (!enabled || !spaceId || !realtimeService?.isAvailable()) {
      setIsLoading(false);
      setIsConnected(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Listen to chat messages
      const unsubscribe = realtimeService.listenToChat(spaceId, (newMessages: any) => {
        setMessages(newMessages);
        setIsLoading(false);
        setIsConnected(true);

        // Call onNewMessage for the latest message if it's new
        if (onNewMessage && newMessages.length > 0) {
          const latestMessage = newMessages[newMessages.length - 1];
          if (latestMessage.userId !== userId.current) {
            onNewMessage(latestMessage);
          }
        }
      });

      cleanupRef.current = unsubscribe;

      // Listen to typing indicators
      const typingUnsubscribe = realtimeService.listenToTyping(spaceId, (typing) => {
        const activeTypingUsers = Object.values(typing)
          .filter(t => t.isTyping && t.userId !== userId.current)
          .map(t => t.userId);
        
        setTypingUsers(activeTypingUsers);
      });

      typingCleanupRef.current = typingUnsubscribe;

      logger.info('Realtime chat listener established', { spaceId });

    } catch (err) {
      const error = err as Error;
      setError(error);
      setIsLoading(false);
      setIsConnected(false);
      onError?.(error);
      logger.error('Failed to establish chat listener', { error, spaceId });
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (typingCleanupRef.current) {
        typingCleanupRef.current();
        typingCleanupRef.current = null;
      }
    };
  }, [spaceId, enabled, onError, onNewMessage]);

  // Send message function
  const sendMessage = useCallback(async (
    content: string, 
    type: ChatMessage['type'] = 'text'
  ): Promise<string | null> => {
    if (!realtimeService?.isAvailable() || !userId.current) {
      return null;
    }

    try {
      const messageId = await realtimeService.sendChatMessage(
        spaceId,
        userId.current,
        content,
        type
      );

      logger.info('Message sent successfully', { messageId, spaceId });
      return messageId;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      logger.error('Failed to send message', { error, spaceId, content });
      return null;
    }
  }, [spaceId, onError]);

  // Handle typing indicator
  const handleSetIsTyping = useCallback(async (typing: boolean) => {
    if (!realtimeService?.isAvailable() || !userId.current) {
      return;
    }

    try {
      await realtimeService.setTypingIndicator(spaceId, userId.current, typing);
      setIsTyping(typing);
    } catch (err) {
      logger.error('Failed to set typing indicator', { error: err, spaceId, typing });
    }
  }, [spaceId]);

  // Reconnect function
  const reconnect = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    if (typingCleanupRef.current) {
      typingCleanupRef.current();
    }
    
    // Trigger re-effect by updating a dependency
    setError(null);
    setIsConnected(false);
    setIsLoading(true);
  }, []);

  return {
    messages,
    isLoading,
    isConnected,
    error,
    sendMessage,
    isTyping,
    typingUsers,
    setIsTyping: handleSetIsTyping,
    reconnect,
  };
}