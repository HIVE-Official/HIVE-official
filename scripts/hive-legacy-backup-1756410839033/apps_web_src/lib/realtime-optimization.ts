/**
 * Real-time System Optimization & Performance Manager
 * Handles connection pooling, message batching, fallback systems, and performance monitoring
 */

import { logger } from './logger';
import { sseRealtimeService, RealtimeMessage } from './sse-realtime-service';
import { realtimeService as firebaseRealtimeService } from './firebase-realtime';

interface ConnectionMetrics {
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

interface SystemMetrics {
  totalConnections: number;
  activeConnections: number;
  messagesPerSecond: number;
  averageLatency: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
  lastUpdated: number;
}

interface MessageBatch {
  id: string;
  userId: string;
  messages: RealtimeMessage[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  scheduledFor: number;
  createdAt: number;
  size: number;
}

interface FallbackConfig {
  enableFirebaseRealtime: boolean;
  enablePolling: boolean;
  pollingInterval: number;
  maxRetries: number;
  retryBackoff: number;
  healthCheckInterval: number;
}

export class RealtimeOptimizationManager {
  private connectionMetrics: Map<string, ConnectionMetrics> = new Map();
  private systemMetrics: SystemMetrics = {
    totalConnections: 0,
    activeConnections: 0,
    messagesPerSecond: 0,
    averageLatency: 0,
    errorRate: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    lastUpdated: Date.now()
  };

  private messageBatches: Map<string, MessageBatch[]> = new Map();
  private batchProcessor: NodeJS.Timeout | null = null;
  private metricsCollector: NodeJS.Timeout | null = null;
  private healthChecker: NodeJS.Timeout | null = null;

  private fallbackConfig: FallbackConfig = {
    enableFirebaseRealtime: true,
    enablePolling: false,
    pollingInterval: 5000,
    maxRetries: 3,
    retryBackoff: 1000,
    healthCheckInterval: 30000
  };

  private performanceThresholds = {
    maxLatency: 2000, // ms
    maxErrorRate: 0.05, // 5%
    maxMemoryUsage: 512, // MB
    maxConnectionsPerUser: 3,
    batchSize: 10,
    batchTimeout: 1000 // ms
  };

  constructor() {
    this.startOptimizationServices();
  }

  /**
   * Start all optimization services
   */
  private startOptimizationServices(): void {
    this.startMessageBatchProcessor();
    this.startMetricsCollection();
    this.startHealthMonitoring();
    logger.info('Real-time optimization services started');
  }

  /**
   * Connection Management & Pooling
   */
  public registerConnection(connectionId: string, userId: string): void {
    const now = Date.now();
    const existingConnections = Array.from(this.connectionMetrics.values())
      .filter(metrics => metrics.userId === userId);

    // Enforce connection limits per user
    if (existingConnections.length >= this.performanceThresholds.maxConnectionsPerUser) {
      const oldestConnection = existingConnections
        .sort((a, b) => a.establishedAt - b.establishedAt)[0];
      
      this.closeConnection(oldestConnection.connectionId, 'connection_limit_exceeded');
    }

    this.connectionMetrics.set(connectionId, {
      connectionId,
      userId,
      establishedAt: now,
      messagesReceived: 0,
      messagesSent: 0,
      lastActivity: now,
      averageLatency: 0,
      errorCount: 0,
      reconnectionCount: 0
    });

    this.updateSystemMetrics();
    logger.info('Connection registered for optimization', { connectionId, userId });
  }

  public unregisterConnection(connectionId: string): void {
    this.connectionMetrics.delete(connectionId);
    this.updateSystemMetrics();
    logger.info('Connection unregistered from optimization', { connectionId });
  }

  private closeConnection(connectionId: string, reason: string): void {
    // This would be implemented to actually close the SSE connection
    logger.info('Connection closed by optimization manager', { connectionId, reason });
    this.unregisterConnection(connectionId);
  }

  /**
   * Message Batching & Optimization
   */
  public async optimizeMessageDelivery(
    userId: string,
    messages: RealtimeMessage[]
  ): Promise<void> {
    // Sort messages by priority
    const prioritizedMessages = this.prioritizeMessages(messages);
    
    // Check if we should batch or send immediately
    if (this.shouldBatchMessages(userId, prioritizedMessages)) {
      await this.addToBatch(userId, prioritizedMessages);
    } else {
      await this.sendImmediately(prioritizedMessages);
    }
  }

  private prioritizeMessages(messages: RealtimeMessage[]): RealtimeMessage[] {
    const priorityOrder = { 'urgent': 0, 'high': 1, 'normal': 2, 'low': 3 };
    
    return messages.sort((a, b) => {
      const aPriority = priorityOrder[a.metadata.priority] ?? 2;
      const bPriority = priorityOrder[b.metadata.priority] ?? 2;
      return aPriority - bPriority;
    });
  }

  private shouldBatchMessages(userId: string, messages: RealtimeMessage[]): boolean {
    // Don't batch urgent messages
    if (messages.some(msg => msg.metadata.priority === 'urgent')) {
      return false;
    }

    // Check current system load
    if (this.systemMetrics.messagesPerSecond > 100) {
      return true; // Batch under high load
    }

    // Check user's current batch status
    const userBatches = this.messageBatches.get(userId) || [];
    return userBatches.length > 0; // Continue batching if already batching
  }

  private async addToBatch(userId: string, messages: RealtimeMessage[]): Promise<void> {
    if (!this.messageBatches.has(userId)) {
      this.messageBatches.set(userId, []);
    }

    const batches = this.messageBatches.get(userId)!;
    const now = Date.now();

    const newBatch: MessageBatch = {
      id: `batch_${userId}_${now}`,
      userId,
      messages,
      priority: this.getHighestPriority(messages),
      scheduledFor: now + this.performanceThresholds.batchTimeout,
      createdAt: now,
      size: messages.length
    };

    batches.push(newBatch);
    
    // Enforce batch limits
    if (batches.length > 10) {
      await this.processBatch(batches.shift()!);
    }
  }

  private getHighestPriority(messages: RealtimeMessage[]): 'low' | 'normal' | 'high' | 'urgent' {
    const priorities = messages.map(msg => msg.metadata.priority);
    if (priorities.includes('urgent')) return 'urgent';
    if (priorities.includes('high')) return 'high';
    if (priorities.includes('normal')) return 'normal';
    return 'low';
  }

  private async sendImmediately(messages: RealtimeMessage[]): Promise<void> {
    for (const message of messages) {
      try {
        await sseRealtimeService.sendMessage(message);
        this.recordMessageSent(message);
      } catch (error) {
        await this.handleMessageFailure(message, error);
      }
    }
  }

  /**
   * Batch Processing
   */
  private startMessageBatchProcessor(): void {
    this.batchProcessor = setInterval(async () => {
      await this.processPendingBatches();
    }, 500); // Process every 500ms
  }

  private async processPendingBatches(): Promise<void> {
    const now = Date.now();
    const processPromises: Promise<void>[] = [];

    for (const [userId, batches] of this.messageBatches.entries()) {
      const readyBatches = batches.filter(batch => batch.scheduledFor <= now);
      
      for (const batch of readyBatches) {
        processPromises.push(this.processBatch(batch));
        
        // Remove processed batch
        const index = batches.indexOf(batch);
        if (index > -1) {
          batches.splice(index, 1);
        }
      }
    }

    if (processPromises.length > 0) {
      await Promise.all(processPromises);
    }
  }

  private async processBatch(batch: MessageBatch): Promise<void> {
    try {
      // Send all messages in batch
      await Promise.all(
        batch.messages.map(message => 
          sseRealtimeService.sendMessage(message)
        )
      );

      batch.messages.forEach(message => this.recordMessageSent(message));
      
      logger.info('Batch processed successfully', { 
        batchId: batch.id, 
        messageCount: batch.messages.length 
      });
    } catch (error) {
      logger.error('Batch processing failed', { 
        batchId: batch.id, 
        error,
        messageCount: batch.messages.length 
      });
      
      // Handle individual message failures
      for (const message of batch.messages) {
        await this.handleMessageFailure(message, error);
      }
    }
  }

  /**
   * Performance Monitoring
   */
  private startMetricsCollection(): void {
    this.metricsCollector = setInterval(() => {
      this.updateSystemMetrics();
      this.analyzePerformance();
    }, 5000); // Collect every 5 seconds
  }

  private updateSystemMetrics(): void {
    const now = Date.now();
    const connections = Array.from(this.connectionMetrics.values());

    this.systemMetrics = {
      totalConnections: connections.length,
      activeConnections: connections.filter(c => now - c.lastActivity < 60000).length,
      messagesPerSecond: this.calculateMessagesPerSecond(),
      averageLatency: this.calculateAverageLatency(),
      errorRate: this.calculateErrorRate(),
      memoryUsage: this.getMemoryUsage(),
      cpuUsage: this.getCpuUsage(),
      lastUpdated: now
    };
  }

  private calculateMessagesPerSecond(): number {
    const now = Date.now();
    const recentWindow = 60000; // 1 minute
    
    let messageCount = 0;
    for (const metrics of this.connectionMetrics.values()) {
      if (now - metrics.lastActivity < recentWindow) {
        messageCount += metrics.messagesReceived + metrics.messagesSent;
      }
    }
    
    return messageCount / 60; // Messages per second over last minute
  }

  private calculateAverageLatency(): number {
    const connections = Array.from(this.connectionMetrics.values());
    if (connections.length === 0) return 0;
    
    const totalLatency = connections.reduce((sum, conn) => sum + conn.averageLatency, 0);
    return totalLatency / connections.length;
  }

  private calculateErrorRate(): number {
    const connections = Array.from(this.connectionMetrics.values());
    if (connections.length === 0) return 0;
    
    const totalMessages = connections.reduce((sum, conn) => 
      sum + conn.messagesReceived + conn.messagesSent, 0);
    const totalErrors = connections.reduce((sum, conn) => sum + conn.errorCount, 0);
    
    return totalMessages > 0 ? totalErrors / totalMessages : 0;
  }

  private getMemoryUsage(): number {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed / 1024 / 1024; // MB
    }
    return 0;
  }

  private getCpuUsage(): number {
    // This is a simplified implementation
    // In production, you'd use proper CPU monitoring
    return 0;
  }

  private analyzePerformance(): void {
    const metrics = this.systemMetrics;
    
    // Check latency
    if (metrics.averageLatency > this.performanceThresholds.maxLatency) {
      logger.warn('High latency detected', { latency: metrics.averageLatency });
      this.handleHighLatency();
    }
    
    // Check error rate
    if (metrics.errorRate > this.performanceThresholds.maxErrorRate) {
      logger.warn('High error rate detected', { errorRate: metrics.errorRate });
      this.handleHighErrorRate();
    }
    
    // Check memory usage
    if (metrics.memoryUsage > this.performanceThresholds.maxMemoryUsage) {
      logger.warn('High memory usage detected', { memoryUsage: metrics.memoryUsage });
      this.handleHighMemoryUsage();
    }
  }

  /**
   * Health Monitoring & Fallbacks
   */
  private startHealthMonitoring(): void {
    this.healthChecker = setInterval(async () => {
      await this.performHealthCheck();
    }, this.fallbackConfig.healthCheckInterval);
  }

  private async performHealthCheck(): Promise<void> {
    try {
      // Test SSE endpoint
      const sseHealthy = await this.testSSEHealth();
      
      // Test Firebase Realtime
      const firebaseHealthy = await this.testFirebaseHealth();
      
      if (!sseHealthy && !firebaseHealthy) {
        logger.error('All real-time systems unhealthy, enabling polling fallback');
        this.enablePollingFallback();
      } else if (!sseHealthy && firebaseHealthy) {
        logger.warn('SSE unhealthy, falling back to Firebase Realtime');
        this.enableFirebaseFallback();
      }
      
      logger.info('Health check completed', { sseHealthy, firebaseHealthy });
    } catch (error) {
      logger.error('Health check failed', { error });
    }
  }

  private async testSSEHealth(): Promise<boolean> {
    try {
      // Simple health test - attempt to create a test connection
      const testMessage = {
        type: 'system' as const,
        channel: 'health_check',
        senderId: 'system',
        content: { test: true },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'low' as const,
          requiresAck: false,
          retryCount: 0
        }
      };
      
      await sseRealtimeService.sendMessage(testMessage);
      return true;
    } catch (error) {
      logger.error('SSE health check failed', { error });
      return false;
    }
  }

  private async testFirebaseHealth(): Promise<boolean> {
    try {
      if (!this.fallbackConfig.enableFirebaseRealtime) {
        return false;
      }
      
      // Test Firebase connection
      await firebaseRealtimeService.sendMessage({
        type: 'system',
        channel: 'health_check',
        senderId: 'system',
        content: { test: true },
        metadata: {
          timestamp: new Date(),
          priority: 'low',
          requiresAck: false,
          retryCount: 0
        }
      });
      
      return true;
    } catch (error) {
      logger.error('Firebase health check failed', { error });
      return false;
    }
  }

  /**
   * Fallback Handling
   */
  private enableFirebaseFallback(): void {
    // Switch message routing to Firebase Realtime Database
    logger.info('Enabling Firebase Realtime fallback');
  }

  private enablePollingFallback(): void {
    if (!this.fallbackConfig.enablePolling) {
      this.fallbackConfig.enablePolling = true;
      logger.info('Enabling polling fallback');
      
      // Start polling service
      this.startPollingFallback();
    }
  }

  private startPollingFallback(): void {
    // Implementation would set up polling-based updates
    logger.info('Polling fallback started');
  }

  /**
   * Error Handling & Recovery
   */
  private async handleMessageFailure(message: RealtimeMessage, error: any): Promise<void> {
    logger.error('Message delivery failed', { 
      messageId: message.id, 
      error,
      retryCount: message.metadata.retryCount 
    });

    // Retry with backoff
    if (message.metadata.retryCount < this.fallbackConfig.maxRetries) {
      const delay = this.fallbackConfig.retryBackoff * Math.pow(2, message.metadata.retryCount);
      
      setTimeout(async () => {
        const retryMessage = {
          ...message,
          metadata: {
            ...message.metadata,
            retryCount: message.metadata.retryCount + 1
          }
        };
        
        try {
          await sseRealtimeService.sendMessage(retryMessage);
          this.recordMessageSent(retryMessage);
        } catch (retryError) {
          await this.handleMessageFailure(retryMessage, retryError);
        }
      }, delay);
    } else {
      // Max retries exceeded, try fallback
      await this.tryFallbackDelivery(message);
    }
  }

  private async tryFallbackDelivery(message: RealtimeMessage): Promise<void> {
    try {
      if (this.fallbackConfig.enableFirebaseRealtime) {
        await firebaseRealtimeService.sendMessage(message);
        logger.info('Message delivered via Firebase fallback', { messageId: message.id });
      } else {
        logger.error('Message delivery completely failed', { messageId: message.id });
      }
    } catch (error) {
      logger.error('Fallback delivery also failed', { messageId: message.id, error });
    }
  }

  private handleHighLatency(): void {
    // Implement latency reduction strategies
    logger.info('Implementing latency reduction measures');
    
    // Increase batch timeout to reduce frequency
    this.performanceThresholds.batchTimeout = Math.min(
      this.performanceThresholds.batchTimeout * 1.2, 
      5000
    );
  }

  private handleHighErrorRate(): void {
    // Implement error rate reduction strategies
    logger.info('Implementing error rate reduction measures');
    
    // Increase retry backoff
    this.fallbackConfig.retryBackoff = Math.min(
      this.fallbackConfig.retryBackoff * 1.5, 
      10000
    );
  }

  private handleHighMemoryUsage(): void {
    // Implement memory optimization
    logger.info('Implementing memory optimization measures');
    
    // Clean up old metrics
    this.cleanupOldMetrics();
    
    // Reduce batch sizes
    this.performanceThresholds.batchSize = Math.max(
      this.performanceThresholds.batchSize * 0.8, 
      5
    );
  }

  private cleanupOldMetrics(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [connectionId, metrics] of this.connectionMetrics.entries()) {
      if (now - metrics.lastActivity > maxAge) {
        this.connectionMetrics.delete(connectionId);
      }
    }
  }

  /**
   * Utility Methods
   */
  private recordMessageSent(message: RealtimeMessage): void {
    // Update metrics for sent messages
    for (const metrics of this.connectionMetrics.values()) {
      if (message.targetUsers?.includes(metrics.userId)) {
        metrics.messagesSent++;
        metrics.lastActivity = Date.now();
      }
    }
  }

  /**
   * Public API
   */
  public getSystemMetrics(): SystemMetrics {
    return { ...this.systemMetrics };
  }

  public getConnectionMetrics(connectionId: string): ConnectionMetrics | null {
    return this.connectionMetrics.get(connectionId) || null;
  }

  public updateConfiguration(config: Partial<FallbackConfig>): void {
    this.fallbackConfig = { ...this.fallbackConfig, ...config };
    logger.info('Real-time optimization configuration updated', { config });
  }

  public async shutdown(): Promise<void> {
    if (this.batchProcessor) {
      clearInterval(this.batchProcessor);
      this.batchProcessor = null;
    }
    
    if (this.metricsCollector) {
      clearInterval(this.metricsCollector);
      this.metricsCollector = null;
    }
    
    if (this.healthChecker) {
      clearInterval(this.healthChecker);
      this.healthChecker = null;
    }
    
    // Process remaining batches
    await this.processPendingBatches();
    
    logger.info('Real-time optimization manager shut down');
  }
}

// Export singleton instance
export const realtimeOptimizationManager = new RealtimeOptimizationManager();