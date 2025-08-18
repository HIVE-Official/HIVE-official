import { Database, getDatabase, ref, push, set, onValue, off, serverTimestamp, DataSnapshot } from 'firebase/database';
import { app } from '@hive/core';
import { logger } from './logger';

/**
 * Firebase Realtime Database Helper for HIVE Platform
 * Handles real-time messaging, presence, and broadcasting
 */

export interface RealtimeMessage {
  id: string;
  type: 'chat' | 'notification' | 'tool_update' | 'presence' | 'system';
  channel: string;
  senderId: string;
  targetUsers?: string[];
  content: any;
  metadata: {
    timestamp: any; // Firebase ServerValue.TIMESTAMP
    priority: 'low' | 'normal' | 'high' | 'urgent';
    requiresAck: boolean;
    expiresAt?: any;
    retryCount: number;
  };
  delivery?: {
    sent: string[];
    delivered: string[];
    read: string[];
    failed: string[];
  };
}

export interface PresenceData {
  userId: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: any; // Firebase ServerValue.TIMESTAMP
  connectionId?: string;
  currentSpace?: string;
  activity?: string;
  metadata?: {
    platform: string;
    version: string;
  };
}

export interface ChatMessage {
  id: string;
  spaceId: string;
  userId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'poll' | 'system';
  timestamp: any;
  reactions?: {
    [emoji: string]: string[]; // array of user IDs
  };
  edited?: boolean;
  editedAt?: any;
  replyTo?: string;
  mentions?: string[];
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size: number;
  }[];
}

export interface TypingIndicator {
  userId: string;
  spaceId: string;
  timestamp: any;
  isTyping: boolean;
}

export class FirebaseRealtimeService {
  private database: Database;
  private listeners: Map<string, any[]> = new Map();

  constructor() {
    this.database = getDatabase(app);
  }

  /**
   * Send a message to a specific channel
   */
  async sendMessage(message: Omit<RealtimeMessage, 'id'>): Promise<string> {
    try {
      const messagesRef = ref(this.database, `channels/${message.channel}/messages`);
      const messageRef = push(messagesRef);
      
      const messageWithId: RealtimeMessage = {
        ...message,
        id: messageRef.key!,
        metadata: {
          ...message.metadata,
          timestamp: serverTimestamp()
        }
      };

      await set(messageRef, messageWithId);
      
      // Update channel's last activity
      await set(ref(this.database, `channels/${message.channel}/lastActivity`), serverTimestamp());
      
      logger.info('Message sent to channel', { 
        messageId: messageRef.key, 
        channel: message.channel,
        type: message.type 
      });

      return messageRef.key!;
    } catch (error) {
      logger.error('Error sending message', { error, channel: message.channel });
      throw error;
    }
  }

  /**
   * Send a chat message to a space
   */
  async sendChatMessage(spaceId: string, userId: string, content: string, type: ChatMessage['type'] = 'text'): Promise<string> {
    try {
      const chatRef = ref(this.database, `chats/${spaceId}/messages`);
      const messageRef = push(chatRef);
      
      const chatMessage: ChatMessage = {
        id: messageRef.key!,
        spaceId,
        userId,
        content,
        type,
        timestamp: serverTimestamp()
      };

      await set(messageRef, chatMessage);
      
      // Update space's last message info
      await set(ref(this.database, `chats/${spaceId}/lastMessage`), {
        id: messageRef.key,
        userId,
        timestamp: serverTimestamp(),
        preview: content.substring(0, 100)
      });

      // Send notification via message system
      await this.sendMessage({
        type: 'notification',
        channel: `space:${spaceId}:chat`,
        senderId: userId,
        content: {
          type: 'new_chat_message',
          spaceId,
          messageId: messageRef.key,
          preview: content.substring(0, 100)
        },
        metadata: {
          timestamp: serverTimestamp(),
          priority: 'normal',
          requiresAck: false,
          retryCount: 0
        }
      });

      return messageRef.key!;
    } catch (error) {
      logger.error('Error sending chat message', { error, spaceId, userId });
      throw error;
    }
  }

  /**
   * Update user presence
   */
  async updatePresence(userId: string, presenceData: Omit<PresenceData, 'userId'>): Promise<void> {
    try {
      const presenceRef = ref(this.database, `presence/${userId}`);
      const fullPresenceData: PresenceData = {
        userId,
        ...presenceData,
        lastSeen: serverTimestamp()
      };

      await set(presenceRef, fullPresenceData);

      // Broadcast presence update to relevant spaces
      if (presenceData.currentSpace) {
        await this.sendMessage({
          type: 'presence',
          channel: `space:${presenceData.currentSpace}:presence`,
          senderId: 'system',
          content: {
            userId,
            status: presenceData.status,
            activity: presenceData.activity
          },
          metadata: {
            timestamp: serverTimestamp(),
            priority: 'low',
            requiresAck: false,
            retryCount: 0
          }
        });
      }

      logger.info('User presence updated', { userId, status: presenceData.status });
    } catch (error) {
      logger.error('Error updating presence', { error, userId });
      throw error;
    }
  }

  /**
   * Set typing indicator
   */
  async setTypingIndicator(spaceId: string, userId: string, isTyping: boolean): Promise<void> {
    try {
      const typingRef = ref(this.database, `typing/${spaceId}/${userId}`);
      
      if (isTyping) {
        const typingData: TypingIndicator = {
          userId,
          spaceId,
          timestamp: serverTimestamp(),
          isTyping: true
        };
        await set(typingRef, typingData);
      } else {
        await set(typingRef, null); // Remove typing indicator
      }

      // Broadcast typing status
      await this.sendMessage({
        type: 'system',
        channel: `space:${spaceId}:typing`,
        senderId: userId,
        content: {
          isTyping,
          userId
        },
        metadata: {
          timestamp: serverTimestamp(),
          priority: 'low',
          requiresAck: false,
          retryCount: 0
        }
      });
    } catch (error) {
      logger.error('Error setting typing indicator', { error, spaceId, userId });
      throw error;
    }
  }

  /**
   * Send tool state update
   */
  async sendToolUpdate(toolId: string, spaceId: string, userId: string, updateData: any): Promise<void> {
    try {
      // Store tool state
      await set(ref(this.database, `tools/${toolId}/state`), {
        ...updateData,
        lastUpdated: serverTimestamp(),
        updatedBy: userId
      });

      // Broadcast update to space
      await this.sendMessage({
        type: 'tool_update',
        channel: `space:${spaceId}:tools`,
        senderId: userId,
        content: {
          toolId,
          updateType: updateData.type || 'state_change',
          data: updateData
        },
        metadata: {
          timestamp: serverTimestamp(),
          priority: 'normal',
          requiresAck: true,
          retryCount: 0
        }
      });

      logger.info('Tool update sent', { toolId, spaceId, userId });
    } catch (error) {
      logger.error('Error sending tool update', { error, toolId, spaceId });
      throw error;
    }
  }

  /**
   * Send system notification
   */
  async sendNotification(userId: string | string[], notification: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    actionUrl?: string;
    metadata?: any;
  }): Promise<void> {
    try {
      const userIds = Array.isArray(userId) ? userId : [userId];
      
      for (const uid of userIds) {
        await this.sendMessage({
          type: 'notification',
          channel: `user:${uid}:notifications`,
          senderId: 'system',
          targetUsers: [uid],
          content: notification,
          metadata: {
            timestamp: serverTimestamp(),
            priority: notification.type === 'error' ? 'high' : 'normal',
            requiresAck: true,
            retryCount: 0
          }
        });
      }

      logger.info('Notification sent', { userIds: userIds.join(','), type: notification.type });
    } catch (error) {
      logger.error('Error sending notification', { error, userId: Array.isArray(userId) ? userId.join(',') : userId });
      throw error;
    }
  }

  /**
   * Listen to channel messages
   */
  listenToChannel(channel: string, callback: (messages: RealtimeMessage[]) => void): () => void {
    const channelRef = ref(this.database, `channels/${channel}/messages`);
    
    const listener = onValue(channelRef, (snapshot: DataSnapshot) => {
      const messages: RealtimeMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        messages.push(childSnapshot.val());
      });
      
      // Sort by timestamp
      messages.sort((a, b) => (a.metadata.timestamp || 0) - (b.metadata.timestamp || 0));
      callback(messages);
    });

    // Store listener for cleanup
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, []);
    }
    this.listeners.get(channel)!.push(listener);

    // Return cleanup function
    return () => {
      off(channelRef, 'value', listener);
      const channelListeners = this.listeners.get(channel);
      if (channelListeners) {
        const index = channelListeners.indexOf(listener);
        if (index > -1) {
          channelListeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Listen to chat messages for a space
   */
  listenToChat(spaceId: string, callback: (messages: ChatMessage[]) => void): () => void {
    const chatRef = ref(this.database, `chats/${spaceId}/messages`);
    
    const listener = onValue(chatRef, (snapshot: DataSnapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        messages.push(childSnapshot.val());
      });
      
      // Sort by timestamp
      messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      callback(messages);
    });

    // Store listener for cleanup
    const listenerKey = `chat:${spaceId}`;
    if (!this.listeners.has(listenerKey)) {
      this.listeners.set(listenerKey, []);
    }
    this.listeners.get(listenerKey)!.push(listener);

    return () => {
      off(chatRef, 'value', listener);
      const chatListeners = this.listeners.get(listenerKey);
      if (chatListeners) {
        const index = chatListeners.indexOf(listener);
        if (index > -1) {
          chatListeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Listen to presence updates for a space
   */
  listenToPresence(spaceId: string, callback: (presence: Record<string, PresenceData>) => void): () => void {
    const presenceRef = ref(this.database, 'presence');
    
    const listener = onValue(presenceRef, (snapshot: DataSnapshot) => {
      const allPresence: Record<string, PresenceData> = {};
      snapshot.forEach((childSnapshot) => {
        const presenceData = childSnapshot.val();
        if (presenceData.currentSpace === spaceId) {
          allPresence[childSnapshot.key!] = presenceData;
        }
      });
      
      callback(allPresence);
    });

    const listenerKey = `presence:${spaceId}`;
    if (!this.listeners.has(listenerKey)) {
      this.listeners.set(listenerKey, []);
    }
    this.listeners.get(listenerKey)!.push(listener);

    return () => {
      off(presenceRef, 'value', listener);
      const presenceListeners = this.listeners.get(listenerKey);
      if (presenceListeners) {
        const index = presenceListeners.indexOf(listener);
        if (index > -1) {
          presenceListeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Listen to typing indicators for a space
   */
  listenToTyping(spaceId: string, callback: (typing: Record<string, TypingIndicator>) => void): () => void {
    const typingRef = ref(this.database, `typing/${spaceId}`);
    
    const listener = onValue(typingRef, (snapshot: DataSnapshot) => {
      const typing: Record<string, TypingIndicator> = {};
      snapshot.forEach((childSnapshot) => {
        typing[childSnapshot.key!] = childSnapshot.val();
      });
      
      callback(typing);
    });

    const listenerKey = `typing:${spaceId}`;
    if (!this.listeners.has(listenerKey)) {
      this.listeners.set(listenerKey, []);
    }
    this.listeners.get(listenerKey)!.push(listener);

    return () => {
      off(typingRef, 'value', listener);
      const typingListeners = this.listeners.get(listenerKey);
      if (typingListeners) {
        const index = typingListeners.indexOf(listener);
        if (index > -1) {
          typingListeners.splice(index, 1);
        }
      }
    };
  }

  /**
   * Get message history for a channel
   */
  async getMessageHistory(channel: string, limit: number = 50): Promise<RealtimeMessage[]> {
    try {
      const messagesRef = ref(this.database, `channels/${channel}/messages`);
      // In a production app, you'd use Firebase's query methods to limit and paginate
      // For now, we'll get all messages and limit client-side
      
      return new Promise((resolve, reject) => {
        onValue(messagesRef, (snapshot: DataSnapshot) => {
          const messages: RealtimeMessage[] = [];
          snapshot.forEach((childSnapshot) => {
            messages.push(childSnapshot.val());
          });
          
          // Sort by timestamp and limit
          messages.sort((a, b) => (b.metadata.timestamp || 0) - (a.metadata.timestamp || 0));
          resolve(messages.slice(0, limit));
        }, reject, { onlyOnce: true });
      });
    } catch (error) {
      logger.error('Error getting message history', { error, channel });
      throw error;
    }
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(channel: string, userId: string, messageIds: string[]): Promise<void> {
    try {
      for (const messageId of messageIds) {
        const readRef = ref(this.database, `channels/${channel}/messages/${messageId}/delivery/read`);
        // Add userId to read array if not already present
        // This is a simplified implementation - in production you'd use transactions
        onValue(readRef, (snapshot) => {
          const currentRead = snapshot.val() || [];
          if (!currentRead.includes(userId)) {
            set(readRef, [...currentRead, userId]);
          }
        }, { onlyOnce: true });
      }
    } catch (error) {
      logger.error('Error marking messages as read', { error, channel, userId });
      throw error;
    }
  }

  /**
   * Clean up all listeners
   */
  cleanup(): void {
    this.listeners.forEach((listeners, channel) => {
      listeners.forEach(listener => {
        // The actual cleanup would depend on the channel type
        // This is a simplified cleanup
      });
    });
    this.listeners.clear();
  }
}

// Export singleton instance
export const realtimeService = new FirebaseRealtimeService();