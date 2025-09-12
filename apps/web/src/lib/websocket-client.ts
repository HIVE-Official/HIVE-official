/// <reference path="../types/global.d.ts" />
import { logger } from '@/lib/logger';
import { useAuth } from '@/hooks/use-auth';

export interface WebSocketMessage {
  id: string;
  type: 'chat' | 'notification' | 'tool_update' | 'presence' | 'system' | 'post_update' | 'space_update';
  channel: string;
  senderId: string;
  targetUsers?: string[];
  content: any;
  metadata: {
    timestamp: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    requiresAck: boolean;
    expiresAt?: string;
    retryCount: number;
  };
}

export interface ConnectionConfig {
  connectionType: 'chat' | 'notifications' | 'tool_updates' | 'presence' | 'feed';
  spaceId?: string;
  channels?: string[];
  settings?: {
    enableNotifications: boolean;
    enablePresence: boolean;
    enableToolUpdates: boolean;
    messagePreferences: {
      sound: boolean;
      desktop: boolean;
      mobile: boolean;
    };
  };
}

export interface WebSocketClientEvents {
  connected: (connectionId: string) => void;
  disconnected: (reason: string) => void;
  reconnecting: (attempt: number) => void;
  message: (message: WebSocketMessage) => void;
  error: (error: Error) => void;
  presence: (presenceData: any) => void;
  typing: (typingData: any) => void;
}

class WebSocketClient extends EventTarget {
  private ws: WebSocket | null = null;
  private connectionId: string | null = null;
  private config: ConnectionConfig;
  private isConnected = false;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private eventListeners = new Map<string, Function[]>();

  constructor(config: ConnectionConfig) {
    super();
    this.config = config;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });

    // Handle online/offline events
    window.addEventListener('online', () => {
      if (!this.isConnected) {
        this.connect();
      }
    });

    window.addEventListener('offline', () => {
      this.handleNetworkOffline();
    });

    // Handle beforeunload to gracefully close connection
    window.addEventListener('beforeunload', () => {
      this.disconnect();
    });
  }

  async connect(): Promise<void> {
    if (this.isConnecting || this.isConnected) {
      return;
    }

    this.isConnecting = true;

    try {
      // First, establish HTTP connection to get WebSocket details
      const response = await fetch('/api/realtime/websocket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...this.config,
          clientInfo: {
            platform: 'web',
            version: '1.0.0',
            userAgent: navigator.userAgent
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to establish connection: ${response.statusText}`);
      }

      const connectionData = await response.json();
      this.connectionId = connectionData.connectionId;

      // For now, we'll simulate WebSocket connection using Server-Sent Events
      // In production, you would establish actual WebSocket connection here
      await this.establishSSEConnection();

      this.isConnected = true;
      this.isConnecting = false;
      this.reconnectAttempts = 0;

      // Start heartbeat
      this.startHeartbeat();

      // Process queued messages
      this.processMessageQueue();

      // Emit connected event
      this.emit('connected', this.connectionId);
      
      logger.info('WebSocket client connected', { connectionId: this.connectionId });

    } catch (error) {
      this.isConnecting = false;
      logger.error('Failed to connect WebSocket client', { error });
      this.emit('error', error as Error);
      
      // Attempt to reconnect
      this.scheduleReconnect();
    }
  }

  private async establishSSEConnection(): Promise<void> {
    // For demonstration, using SSE as WebSocket alternative
    // In production, this would be replaced with actual WebSocket connection
    
    if (typeof EventSource !== 'undefined') {
      const eventSource = new EventSource(`/api/realtime/sse?connectionId=${this.connectionId}`);
      
      eventSource.onopen = () => {
        logger.info('SSE connection established');
      };

      eventSource.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          logger.error('Failed to parse SSE message', { error });
        }
      };

      eventSource.onerror = (error) => {
        logger.error('SSE connection error', { error });
        eventSource.close();
        this.handleConnectionLost();
      };

      // Store reference for cleanup
      (this as any).eventSource = eventSource;
    } else {
      // Fallback to polling for older browsers
      this.startPolling();
    }
  }

  private startPolling(): void {
    const pollInterval = setInterval(async () => {
      if (!this.isConnected || !this.connectionId) {
        clearInterval(pollInterval);
        return;
      }

      try {
        const response = await fetch(`/api/realtime/messages?connectionId=${this.connectionId}`);
        if (response.ok) {
          const { messages } = await response.json();
          messages.forEach((message: WebSocketMessage) => {
            this.handleMessage(message);
          });
        }
      } catch (error) {
        logger.error('Polling error', { error });
      }
    }, 2000); // Poll every 2 seconds

    (this as any).pollInterval = pollInterval;
  }

  private handleMessage(message: WebSocketMessage): void {
    // Handle different message types
    switch (message.type) {
      case 'presence':
        this.emit('presence', message.content);
        break;
      case 'notification':
        // Show browser notification if enabled
        if (this.config.settings?.enableNotifications && 'Notification' in window) {
          this.showNotification(message);
        }
        break;
      case 'chat':
        // Play sound if enabled
        if (this.config.settings?.messagePreferences.sound) {
          this.playNotificationSound();
        }
        break;
      case 'post_update':
      case 'space_update':
        // Handle real-time content updates
        break;
    }

    // Send acknowledgment if required
    if (message.metadata.requiresAck) {
      this.sendAcknowledgment(message.id);
    }

    // Emit message event
    this.emit('message', message);
  }

  private showNotification(message: WebSocketMessage): void {
    if (Notification.permission === 'granted' && document.hidden) {
      const notification = new Notification(
        message.content.title || 'New message',
        {
          body: message.content.body,
          icon: '/assets/hive-logo-192.png',
          badge: '/assets/hive-badge-72.png',
          tag: message.id,
          requireInteraction: message.metadata.priority === 'urgent'
        }
      );

      notification.onclick = () => {
        window.focus();
        if (message.content.actionUrl) {
          window.location.href = message.content.actionUrl;
        }
        notification.close();
      };

      setTimeout(() => notification.close(), 5000);
    }
  }

  private playNotificationSound(): void {
    try {
      const audio = new Audio('/assets/notification-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio play errors (browser restrictions)
      });
    } catch (error) {
      // Ignore audio errors
    }
  }

  private sendAcknowledgment(messageId: string): void {
    if (this.connectionId) {
      fetch('/api/realtime/ack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectionId: this.connectionId,
          messageId,
          timestamp: new Date().toISOString()
        })
      }).catch(error => {
        logger.error('Failed to send acknowledgment', { error, messageId });
      });
    }
  }

  async sendMessage(message: Omit<WebSocketMessage, 'id' | 'senderId' | 'metadata'>): Promise<void> {
    if (!this.isConnected || !this.connectionId) {
      // Queue message for when connection is established
      this.messageQueue.push({
        ...message,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        senderId: 'current_user', // This would come from auth context
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'normal',
          requiresAck: false,
          retryCount: 0
        }
      } as WebSocketMessage);
      return;
    }

    try {
      await fetch('/api/realtime/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectionId: this.connectionId,
          message: {
            ...message,
            metadata: {
              timestamp: new Date().toISOString(),
              priority: message.type === 'system' ? 'high' : 'normal',
              requiresAck: message.type === 'chat',
              retryCount: 0
            }
          }
        })
      });
    } catch (error) {
      logger.error('Failed to send message', { error });
      throw error;
    }
  }

  async updatePresence(status: 'online' | 'away' | 'busy', metadata?: any): Promise<void> {
    if (!this.connectionId) return;

    try {
      await fetch('/api/realtime/presence', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectionId: this.connectionId,
          status,
          metadata
        })
      });
    } catch (error) {
      logger.error('Failed to update presence', { error });
    }
  }

  async subscribeToChannel(channel: string): Promise<void> {
    if (!this.connectionId) return;

    try {
      await fetch('/api/realtime/websocket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectionId: this.connectionId,
          channels: [channel],
          action: 'subscribe'
        })
      });
    } catch (error) {
      logger.error('Failed to subscribe to channel', { error, channel });
    }
  }

  async unsubscribeFromChannel(channel: string): Promise<void> {
    if (!this.connectionId) return;

    try {
      await fetch('/api/realtime/websocket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          connectionId: this.connectionId,
          channels: [channel],
          action: 'unsubscribe'
        })
      });
    } catch (error) {
      logger.error('Failed to unsubscribe from channel', { error, channel });
    }
  }

  disconnect(): void {
    if (!this.isConnected && !this.isConnecting) {
      return;
    }

    this.isConnected = false;
    this.isConnecting = false;

    // Clear heartbeat
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    // Close SSE connection
    if ((this as any).eventSource) {
      (this as any).eventSource.close();
      (this as any).eventSource = null;
    }

    // Clear polling
    if ((this as any).pollInterval) {
      clearInterval((this as any).pollInterval);
      (this as any).pollInterval = null;
    }

    // Close HTTP connection
    if (this.connectionId) {
      fetch('/api/realtime/websocket', {
        method: 'DELETE',
        body: new URLSearchParams({ connectionId: this.connectionId })
      }).catch(error => {
        logger.error('Failed to close connection gracefully', { error });
      });

      this.connectionId = null;
    }

    this.emit('disconnected', 'User disconnected');
    logger.info('WebSocket client disconnected');
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.connectionId) {
        this.sendHeartbeat();
      }
    }, 30000); // Send heartbeat every 30 seconds
  }

  private sendHeartbeat(): void {
    if (!this.connectionId) return;

    fetch('/api/realtime/heartbeat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        connectionId: this.connectionId,
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      logger.error('Heartbeat failed', { error });
      this.handleConnectionLost();
    });
  }

  private handleConnectionLost(): void {
    if (!this.isConnected) return;

    this.isConnected = false;
    this.emit('disconnected', 'Connection lost');
    
    // Attempt to reconnect
    this.scheduleReconnect();
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error('Max reconnection attempts reached');
      this.emit('error', new Error('Failed to reconnect after multiple attempts'));
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

    logger.info(`Scheduling reconnection attempt ${this.reconnectAttempts} in ${delay}ms`);
    this.emit('reconnecting', this.reconnectAttempts);

    setTimeout(() => {
      if (!this.isConnected) {
        this.connect();
      }
    }, delay);
  }

  private processMessageQueue(): void {
    if (this.messageQueue.length === 0) return;

    logger.info(`Processing ${this.messageQueue.length} queued messages`);
    
    const queue = [...this.messageQueue];
    this.messageQueue = [];

    queue.forEach(message => {
      this.sendMessage(message).catch(error => {
        logger.error('Failed to send queued message', { error });
        // Re-queue the message
        this.messageQueue.push(message);
      });
    });
  }

  private handlePageHidden(): void {
    // Reduce activity when page is hidden
    this.updatePresence('away');
  }

  private handlePageVisible(): void {
    // Resume full activity when page is visible
    this.updatePresence('online');
    
    // Reconnect if needed
    if (!this.isConnected) {
      this.connect();
    }
  }

  private handleNetworkOffline(): void {
    this.emit('disconnected', 'Network offline');
  }

  // EventTarget implementation helpers
  emit(event: string, data?: any): void {
    this.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
    this.addEventListener(event, callback as EventListenerOrEventListenerObject);
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
        this.removeEventListener(event, callback as EventListenerOrEventListenerObject);
      }
    }
  }

  // Connection status
  get connected(): boolean {
    return this.isConnected;
  }

  get connecting(): boolean {
    return this.isConnecting;
  }

  get currentConnectionId(): string | null {
    return this.connectionId;
  }
}

export { WebSocketClient };