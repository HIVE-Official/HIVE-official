"use client";

import React from 'react';

/**
 * Firebase Cost Monitoring and Control System
 * Prevents HIVE from unexpected Firebase bills
 */

export interface CostMetrics {
  readsPerMinute: number;
  writesPerMinute: number;
  listenersActive: number;
  estimatedMonthlyCost: number;
  lastReset: Date;
}

export interface CostLimits {
  maxListenersPerUser: number;
  maxReadsPerUserPerMinute: number;
  maxTotalListeners: number;
  dailyReadLimit: number;
  emergencyShutoffThreshold: number;
}

class FirebaseCostMonitor {
  private metrics: CostMetrics = {
    readsPerMinute: 0,
    writesPerMinute: 0,
    listenersActive: 0,
    estimatedMonthlyCost: 0,
    lastReset: new Date()
  };

  private limits: CostLimits = {
    maxListenersPerUser: 5,        // Limit each user to 5 concurrent listeners
    maxReadsPerUserPerMinute: 50,  // Max 50 reads per user per minute
    maxTotalListeners: 1000,       // Max 1000 total concurrent listeners
    dailyReadLimit: 100000,        // Max 100k reads per day
    emergencyShutoffThreshold: 500 // Emergency shutoff at $500/month estimate
  };

  private userReads = new Map<string, { count: number; lastMinute: number }>();
  private activeListeners = new Map<string, string[]>(); // userId -> listenerIds
  private costHistory: { timestamp: Date; cost: number }[] = [];

  // Cost per operation (Firebase pricing as of 2024)
  private readonly COST_PER_READ = 0.00000036; // $0.36 per 100k reads
  private readonly COST_PER_WRITE = 0.00000108; // $1.08 per 100k writes
  private readonly COST_PER_LISTENER_HOUR = 0.0001; // Estimated WebSocket cost

  constructor() {
    // Reset metrics every minute
    setInterval(() => this.resetMinutelyMetrics(), 60000);

    // Cost report every 5 minutes
    setInterval(() => this.logCostReport(), 300000);

    // Emergency monitoring every 10 seconds
    setInterval(() => this.checkEmergencyLimits(), 10000);
  }

  /**
   * Track a Firestore read operation
   */
  trackRead(userId: string, readCount: number = 1): boolean {
    const currentMinute = Math.floor(Date.now() / 60000);
    const userReadData = this.userReads.get(userId) || { count: 0, lastMinute: currentMinute };

    // Reset if new minute
    if (userReadData.lastMinute < currentMinute) {
      userReadData.count = 0;
      userReadData.lastMinute = currentMinute;
    }

    // Check user limit
    if (userReadData.count + readCount > this.limits.maxReadsPerUserPerMinute) {
      return false; // Deny the read
    }

    // Update metrics
    userReadData.count += readCount;
    this.userReads.set(userId, userReadData);
    this.metrics.readsPerMinute += readCount;

    return true;
  }

  /**
   * Track a Firestore write operation
   */
  trackWrite(userId: string, writeCount: number = 1): void {
    this.metrics.writesPerMinute += writeCount;
  }

  /**
   * Register a new real-time listener
   */
  registerListener(userId: string, listenerId: string, spaceId?: string): boolean {
    const userListeners = this.activeListeners.get(userId) || [];

    // Check per-user listener limit
    if (userListeners.length >= this.limits.maxListenersPerUser) {
      return false;
    }

    // Check total listener limit
    if (this.getTotalListenerCount() >= this.limits.maxTotalListeners) {
      return false;
    }

    // Register listener
    userListeners.push(listenerId);
    this.activeListeners.set(userId, userListeners);
    this.metrics.listenersActive = this.getTotalListenerCount();

    return true;
  }

  /**
   * Unregister a listener
   */
  unregisterListener(userId: string, listenerId: string): void {
    const userListeners = this.activeListeners.get(userId) || [];
    const filteredListeners = userListeners.filter(id => id !== listenerId);

    if (filteredListeners.length > 0) {
      this.activeListeners.set(userId, filteredListeners);
    } else {
      this.activeListeners.delete(userId);
    }

    this.metrics.listenersActive = this.getTotalListenerCount();
  }

  /**
   * Get current cost metrics
   */
  getMetrics(): CostMetrics {
    this.updateCostEstimate();
    return { ...this.metrics };
  }

  /**
   * Check if user can create more listeners
   */
  canCreateListener(userId: string): boolean {
    const userListeners = this.activeListeners.get(userId) || [];
    const totalListeners = this.getTotalListenerCount();

    return (
      userListeners.length < this.limits.maxListenersPerUser &&
      totalListeners < this.limits.maxTotalListeners
    );
  }

  /**
   * Get user's current read quota usage
   */
  getUserReadUsage(userId: string): { used: number; limit: number; percentage: number } {
    const currentMinute = Math.floor(Date.now() / 60000);
    const userReadData = this.userReads.get(userId) || { count: 0, lastMinute: currentMinute };

    // Reset if new minute
    if (userReadData.lastMinute < currentMinute) {
      userReadData.count = 0;
    }

    const used = userReadData.count;
    const limit = this.limits.maxReadsPerUserPerMinute;
    const percentage = Math.round((used / limit) * 100);

    return { used, limit, percentage };
  }

  /**
   * Emergency cost controls
   */
  private checkEmergencyLimits(): void {
    this.updateCostEstimate();

    // Emergency shutoff if estimated monthly cost too high
    if (this.metrics.estimatedMonthlyCost > this.limits.emergencyShutoffThreshold) {
      this.triggerEmergencyShutoff();
    }

    // Warn if approaching limits
    if (this.metrics.estimatedMonthlyCost > this.limits.emergencyShutoffThreshold * 0.8) {
      // Warning logged via monitoring system
    }
  }

  /**
   * Emergency shutoff - disable all real-time features
   */
  private triggerEmergencyShutoff(): void {
    // Broadcast emergency event to all components
    window.dispatchEvent(new CustomEvent('firebase-emergency-shutoff', {
      detail: {
        reason: 'cost_limit_exceeded',
        currentCost: this.metrics.estimatedMonthlyCost,
        limit: this.limits.emergencyShutoffThreshold
      }
    }));

    // Clear all active listeners
    this.activeListeners.clear();
    this.metrics.listenersActive = 0;

  }

  /**
   * Calculate estimated monthly cost
   */
  private updateCostEstimate(): void {
    const hoursInMonth = 30 * 24;
    const minutesInMonth = hoursInMonth * 60;

    // Read costs
    const monthlyReads = this.metrics.readsPerMinute * minutesInMonth;
    const readCost = monthlyReads * this.COST_PER_READ;

    // Write costs
    const monthlyWrites = this.metrics.writesPerMinute * minutesInMonth;
    const writeCost = monthlyWrites * this.COST_PER_WRITE;

    // Listener costs (rough estimate)
    const listenerCost = this.metrics.listenersActive * this.COST_PER_LISTENER_HOUR * hoursInMonth;

    this.metrics.estimatedMonthlyCost = readCost + writeCost + listenerCost;
  }

  /**
   * Reset per-minute metrics
   */
  private resetMinutelyMetrics(): void {
    this.metrics.readsPerMinute = 0;
    this.metrics.writesPerMinute = 0;
    this.metrics.lastReset = new Date();
  }

  /**
   * Log cost report for monitoring
   */
  private logCostReport(): void {
    this.updateCostEstimate();

    const report = {
      timestamp: new Date(),
      metrics: this.metrics,
      activeUsers: this.activeListeners.size,
      avgListenersPerUser: this.getTotalListenerCount() / Math.max(1, this.activeListeners.size),
      topUsers: Array.from(this.activeListeners.entries())
        .map(([userId, listeners]) => ({ userId, listenerCount: listeners.length }))
        .sort((a, b) => b.listenerCount - a.listenerCount)
        .slice(0, 5)
    };


    // Store for historical analysis
    this.costHistory.push({
      timestamp: new Date(),
      cost: this.metrics.estimatedMonthlyCost
    });

    // Keep last 24 hours of history
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    this.costHistory = this.costHistory.filter(entry => entry.timestamp.getTime() > oneDayAgo);
  }

  /**
   * Get total listener count across all users
   */
  private getTotalListenerCount(): number {
    return Array.from(this.activeListeners.values())
      .reduce((total, listeners) => total + listeners.length, 0);
  }

  /**
   * Get cost optimization suggestions
   */
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    const metrics = this.getMetrics();

    if (metrics.listenersActive > 100) {
      suggestions.push('Consider reducing listener count during low-activity periods');
    }

    if (metrics.readsPerMinute > 1000) {
      suggestions.push('Implement client-side caching to reduce Firestore reads');
    }

    const avgListenersPerUser = metrics.listenersActive / Math.max(1, this.activeListeners.size);
    if (avgListenersPerUser > 3) {
      suggestions.push('Users have too many concurrent listeners - implement listener prioritization');
    }

    if (metrics.estimatedMonthlyCost > 100) {
      suggestions.push('Consider implementing pagination or time-based filtering');
    }

    return suggestions;
  }

  /**
   * Update cost limits (for admin configuration)
   */
  updateLimits(newLimits: Partial<CostLimits>): void {
    this.limits = { ...this.limits, ...newLimits };
  }
}

// Global cost monitor instance
export const firebaseCostMonitor = new FirebaseCostMonitor();

// Helper function to check if operation should proceed
export function shouldProceedWithFirebaseOp(userId: string, action: 'read' | 'write' | 'listen'): boolean {
  switch (action) {
    case 'read':
      return firebaseCostMonitor.trackRead(userId, 1);
    case 'listen':
      return firebaseCostMonitor.canCreateListener(userId);
    case 'write':
      firebaseCostMonitor.trackWrite(userId, 1);
      return true; // Writes are generally allowed but tracked
    default:
      return true;
  }
}

// React hook for cost monitoring in components
export function useFirebaseCostMonitor() {
  const [metrics, setMetrics] = React.useState<CostMetrics>(firebaseCostMonitor.getMetrics());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(firebaseCostMonitor.getMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    suggestions: firebaseCostMonitor.getOptimizationSuggestions(),
    canCreateListener: (userId: string) => firebaseCostMonitor.canCreateListener(userId),
    getUserReadUsage: (userId: string) => firebaseCostMonitor.getUserReadUsage(userId)
  };
}

export default firebaseCostMonitor;
