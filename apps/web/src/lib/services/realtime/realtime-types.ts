/**
 * Shared types for real-time services
 */

export interface RealtimeMessage {
  id: string;
  type: 'chat' | 'notification' | 'tool_update' | 'presence' | 'system';
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

export interface SSEConnection {
  userId: string;
  connectionId: string;
  channels: Set<string>;
  response: any; // Response object type depends on framework
  isAlive: boolean;
  lastPing: number;
  createdAt: number;
}

export interface ConnectionMetrics {
  connectionId: string;
  userId: string;
  establishedAt: number;
  messagesReceived: number;
  messagesSent: number;
  lastActivity: number;
  averageLatency: number;
  errorCount: number;
  reconnectionCount: number;
}

export interface SystemMetrics {
  totalConnections: number;
  activeConnections: number;
  messagesPerSecond: number;
  averageLatency: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
  lastUpdated: number;
}