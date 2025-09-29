"use client";

import React from 'react';
import { firebaseCostMonitor } from './firebase-cost-monitor';
import { logger } from './structured-logger';

/**
 * Cost-Aware Feed Fallback System
 * Gracefully degrades from real-time to polling when costs get high
 */

export interface FallbackConfig {
  costThreshold: number;        // Monthly cost limit before fallback
  userListenerLimit: number;    // Max listeners per user
  pollInterval: number;         // Fallback polling interval in ms
  enableProgressiveDegradation: boolean;
}

export enum FeedMode {
  REALTIME_FULL = 'realtime_full',           // All real-time features
  REALTIME_LIMITED = 'realtime_limited',     // Limited real-time (priority only)
  HYBRID = 'hybrid',                         // Mix of real-time + polling
  POLLING_ONLY = 'polling_only',             // Traditional polling fallback
  EMERGENCY_READONLY = 'emergency_readonly'   // Emergency read-only mode
}

class CostAwareFeedManager {
  private currentMode: FeedMode = FeedMode.REALTIME_FULL;
  private config: FallbackConfig = {
    costThreshold: 200,           // $200/month limit
    userListenerLimit: 3,         // Max 3 listeners per user
    pollInterval: 30000,          // 30-second fallback polling
    enableProgressiveDegradation: true
  };

  private fallbackIntervals: Map<string, NodeJS.Timeout> = new Map();
  private degradationHistory: { timestamp: Date; mode: FeedMode; reason: string }[] = [];

  constructor() {
    // Monitor costs every 30 seconds
    setInterval(() => this.evaluateFeedMode(), 30000);

    // Listen for emergency shutoff
    window.addEventListener('firebase-emergency-shutoff', () => {
      this.setFeedMode(FeedMode.EMERGENCY_READONLY, 'emergency_shutoff');
    });
  }

  /**
   * Evaluate and adjust feed mode based on current costs
   */
  private evaluateFeedMode(): void {
    const metrics = firebaseCostMonitor.getMetrics();
    const currentCost = metrics.estimatedMonthlyCost;
    const listenerCount = metrics.listenersActive;

    let newMode = this.currentMode;
    let reason = '';

    // Progressive degradation based on cost
    if (currentCost > this.config.costThreshold * 1.2) {
      // 20% over limit - emergency mode
      newMode = FeedMode.EMERGENCY_READONLY;
      reason = `Cost ${currentCost} exceeded emergency threshold`;
    } else if (currentCost > this.config.costThreshold) {
      // Over limit - polling only
      newMode = FeedMode.POLLING_ONLY;
      reason = `Cost ${currentCost} exceeded limit ${this.config.costThreshold}`;
    } else if (currentCost > this.config.costThreshold * 0.8) {
      // 80% of limit - hybrid mode
      newMode = FeedMode.HYBRID;
      reason = `Cost ${currentCost} approaching limit`;
    } else if (listenerCount > 500) {
      // Too many listeners - limited real-time
      newMode = FeedMode.REALTIME_LIMITED;
      reason = `High listener count: ${listenerCount}`;
    } else if (currentCost < this.config.costThreshold * 0.5) {
      // Under 50% of limit - full real-time OK
      newMode = FeedMode.REALTIME_FULL;
      reason = 'Costs under control';
    }

    if (newMode !== this.currentMode) {
      this.setFeedMode(newMode, reason);
    }
  }

  /**
   * Set feed mode and notify components
   */
  private setFeedMode(mode: FeedMode, reason: string): void {
    const oldMode = this.currentMode;
    this.currentMode = mode;

    logger.info(`📊 Feed mode changed: ${oldMode} → ${mode}`, { reason });

    // Record history
    this.degradationHistory.push({
      timestamp: new Date(),
      mode,
      reason
    });

    // Keep last 24 hours of history
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    this.degradationHistory = this.degradationHistory.filter(
      entry => entry.timestamp.getTime() > oneDayAgo
    );

    // Broadcast mode change to components
    window.dispatchEvent(new CustomEvent('feed-mode-changed', {
      detail: {
        newMode: mode,
        oldMode,
        reason,
        config: this.getModeConfig(mode)
      }
    }));

    // Start fallback mechanisms if needed
    this.handleModeChange(mode);
  }

  /**
   * Handle mode-specific setup
   */
  private handleModeChange(mode: FeedMode): void {
    // Clear existing fallback intervals
    this.fallbackIntervals.forEach(interval => clearInterval(interval));
    this.fallbackIntervals.clear();

    switch (mode) {
      case FeedMode.POLLING_ONLY:
        this.startPollingFallback();
        break;

      case FeedMode.HYBRID:
        this.startHybridMode();
        break;

      case FeedMode.EMERGENCY_READONLY:
        this.enterEmergencyMode();
        break;

      // REALTIME_FULL and REALTIME_LIMITED are handled by listener limits
      default:
        break;
    }
  }

  /**
   * Start polling fallback for feed updates
   */
  private startPollingFallback(): void {
    const pollForFeedUpdates = async () => {
      try {
        // Broadcast polling update event
        window.dispatchEvent(new CustomEvent('feed-fallback-poll', {
          detail: { timestamp: new Date() }
        }));
      } catch (error) {
        logger.error('Fallback polling error', { error });
      }
    };

    const interval = setInterval(pollForFeedUpdates, this.config.pollInterval);
    this.fallbackIntervals.set('feed-poll', interval);
  }

  /**
   * Start hybrid mode (limited real-time + polling)
   */
  private startHybridMode(): void {
    // Poll for less critical updates
    const hybridPoll = async () => {
      window.dispatchEvent(new CustomEvent('feed-hybrid-poll', {
        detail: {
          timestamp: new Date(),
          pollType: 'non_critical_updates'
        }
      }));
    };

    const interval = setInterval(hybridPoll, this.config.pollInterval * 2); // Slower polling
    this.fallbackIntervals.set('hybrid-poll', interval);
  }

  /**
   * Enter emergency read-only mode
   */
  private enterEmergencyMode(): void {
    logger.error('🚨 Entering emergency read-only mode');

    // Disable all writes
    window.dispatchEvent(new CustomEvent('feed-emergency-mode', {
      detail: {
        message: 'HIVE is in cost-control mode. Some features temporarily disabled.',
        allowWrites: false,
        showBanner: true
      }
    }));
  }

  /**
   * Get configuration for current mode
   */
  getModeConfig(mode: FeedMode = this.currentMode): any {
    const baseConfig = {
      mode,
      timestamp: new Date(),
      costMetrics: firebaseCostMonitor.getMetrics()
    };

    switch (mode) {
      case FeedMode.REALTIME_FULL:
        return {
          ...baseConfig,
          maxListenersPerUser: 5,
          enableAllListeners: true,
          pollInterval: null
        };

      case FeedMode.REALTIME_LIMITED:
        return {
          ...baseConfig,
          maxListenersPerUser: 3,
          enableAllListeners: false,
          priorityOnly: true,
          pollInterval: null
        };

      case FeedMode.HYBRID:
        return {
          ...baseConfig,
          maxListenersPerUser: 2,
          enableAllListeners: false,
          pollInterval: this.config.pollInterval * 2,
          hybridMode: true
        };

      case FeedMode.POLLING_ONLY:
        return {
          ...baseConfig,
          maxListenersPerUser: 0,
          enableAllListeners: false,
          pollInterval: this.config.pollInterval,
          realtimeDisabled: true
        };

      case FeedMode.EMERGENCY_READONLY:
        return {
          ...baseConfig,
          maxListenersPerUser: 0,
          enableAllListeners: false,
          pollInterval: this.config.pollInterval * 4,
          readOnlyMode: true,
          showEmergencyBanner: true
        };

      default:
        return baseConfig;
    }
  }

  /**
   * Check if user can use real-time features
   */
  canUseRealtime(userId: string): boolean {
    if (this.currentMode === FeedMode.EMERGENCY_READONLY ||
        this.currentMode === FeedMode.POLLING_ONLY) {
      return false;
    }

    return firebaseCostMonitor.canCreateListener(userId);
  }

  /**
   * Get recommended listener count for user
   */
  getRecommendedListenerCount(userId: string): number {
    const config = this.getModeConfig();

    switch (this.currentMode) {
      case FeedMode.REALTIME_FULL:
        return Math.min(5, config.maxListenersPerUser);
      case FeedMode.REALTIME_LIMITED:
        return Math.min(3, config.maxListenersPerUser);
      case FeedMode.HYBRID:
        return Math.min(2, config.maxListenersPerUser);
      default:
        return 0;
    }
  }

  /**
   * Get current status for UI display
   */
  getStatus(): {
    mode: FeedMode;
    isHealthy: boolean;
    message: string;
    recommendations: string[];
  } {
    const metrics = firebaseCostMonitor.getMetrics();
    const costPercentage = (metrics.estimatedMonthlyCost / this.config.costThreshold) * 100;

    let isHealthy = true;
    let message = 'All systems optimal';
    const recommendations: string[] = [];

    if (this.currentMode === FeedMode.EMERGENCY_READONLY) {
      isHealthy = false;
      message = 'Emergency mode: High Firebase costs detected';
      recommendations.push('Some features temporarily disabled to control costs');
    } else if (this.currentMode === FeedMode.POLLING_ONLY) {
      isHealthy = false;
      message = 'Polling mode: Real-time features limited';
      recommendations.push('Real-time updates paused to manage costs');
    } else if (costPercentage > 80) {
      isHealthy = false;
      message = `Cost warning: ${Math.round(costPercentage)}% of monthly budget used`;
      recommendations.push('Consider reducing active spaces');
    }

    return {
      mode: this.currentMode,
      isHealthy,
      message,
      recommendations
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<FallbackConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('💰 Feed fallback config updated', this.config);
  }

  /**
   * Get degradation history for debugging
   */
  getDegradationHistory(): typeof this.degradationHistory {
    return [...this.degradationHistory];
  }
}

// Global fallback manager
export const costAwareFeedManager = new CostAwareFeedManager();

// React hook for components
export function useCostAwareFeed() {
  const [status, setStatus] = React.useState(costAwareFeedManager.getStatus());
  const [config, setConfig] = React.useState(costAwareFeedManager.getModeConfig());

  React.useEffect(() => {
    const handleModeChange = (event: any) => {
      setStatus(costAwareFeedManager.getStatus());
      setConfig(event.detail.config);
    };

    window.addEventListener('feed-mode-changed', handleModeChange);

    return () => {
      window.removeEventListener('feed-mode-changed', handleModeChange);
    };
  }, []);

  return {
    ...status,
    config,
    canUseRealtime: (userId: string) => costAwareFeedManager.canUseRealtime(userId),
    getRecommendedListenerCount: (userId: string) =>
      costAwareFeedManager.getRecommendedListenerCount(userId)
  };
}

export default costAwareFeedManager;