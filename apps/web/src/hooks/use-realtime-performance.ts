/**
 * React Hook for Real-time Performance Monitoring
 * Provides client-side performance metrics and optimization
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { logger } from '@/lib/logger';

interface PerformanceMetrics {
  connectionLatency: number;
  messageLatency: number;
  reconnectionCount: number;
  errorCount: number;
  messagesReceived: number;
  messagesSent: number;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'critical';
  bandwidthUsage: number;
  memoryUsage: number;
  lastUpdated: number;
}

interface ConnectionHealth {
  isHealthy: boolean;
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  quality: 'excellent' | 'good' | 'poor' | 'critical';
  latency: number;
  uptime: number;
  issues: string[];
  recommendations: string[];
}

interface PerformanceAlert {
  id: string;
  type: 'latency' | 'error' | 'memory' | 'bandwidth' | 'connection';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  acknowledged: boolean;
}

interface UseRealtimePerformanceOptions {
  enableMetrics?: boolean;
  enableAlerts?: boolean;
  metricsInterval?: number;
  alertThresholds?: {
    maxLatency: number;
    maxErrorRate: number;
    maxMemoryUsage: number;
    maxBandwidthUsage: number;
  };
  onAlert?: (alert: PerformanceAlert) => void;
  onQualityChange?: (quality: ConnectionHealth['quality']) => void;
}

interface PerformanceActions {
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;
  recordLatency: (latency: number) => void;
  recordError: (error: any) => void;
  recordMessage: (type: 'sent' | 'received', size: number) => void;
  runSpeedTest: () => Promise<number>;
  optimizeConnection: () => Promise<void>;
  exportMetrics: () => any;
}

export function useRealtimePerformance(
  options: UseRealtimePerformanceOptions = {}
): [PerformanceMetrics, ConnectionHealth, PerformanceAlert[], PerformanceActions] {
  const {
    enableMetrics = true,
    enableAlerts = true,
    metricsInterval = 5000,
    alertThresholds = {
      maxLatency: 2000,
      maxErrorRate: 0.05,
      maxMemoryUsage: 100,
      maxBandwidthUsage: 1000
    },
    onAlert,
    onQualityChange
  } = options;

  // State
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    connectionLatency: 0,
    messageLatency: 0,
    reconnectionCount: 0,
    errorCount: 0,
    messagesReceived: 0,
    messagesSent: 0,
    connectionQuality: 'good',
    bandwidthUsage: 0,
    memoryUsage: 0,
    lastUpdated: Date.now()
  });

  const [connectionHealth, setConnectionHealth] = useState<ConnectionHealth>({
    isHealthy: true,
    status: 'disconnected',
    quality: 'good',
    latency: 0,
    uptime: 0,
    issues: [],
    recommendations: []
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);

  // Refs for tracking
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const latencyMeasurements = useRef<number[]>([]);
  const errorCounts = useRef<{ [key: string]: number }>({});
  const bandwidthTracker = useRef<{ timestamp: number; bytes: number }[]>([]);

  // Initialize performance monitoring
  useEffect(() => {
    if (!enableMetrics) return;

    startTimeRef.current = Date.now();
    
    // Start metrics collection
    startMetricsCollection();
    
    // Add performance observer if available
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      setupPerformanceObserver();
    }

    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, [enableMetrics, metricsInterval]);

  // Monitor connection quality changes
  useEffect(() => {
    if (onQualityChange && connectionHealth.quality !== metrics.connectionQuality) {
      onQualityChange(connectionHealth.quality);
    }
  }, [connectionHealth.quality, metrics.connectionQuality, onQualityChange]);

  const startMetricsCollection = useCallback(() => {
    metricsIntervalRef.current = setInterval(() => {
      updateMetrics();
    }, metricsInterval);
  }, [metricsInterval]);

  const setupPerformanceObserver = useCallback(() => {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            // Track navigation performance
            const navEntry = entry as PerformanceNavigationTiming;
            recordLatency(navEntry.loadEventEnd - navEntry.loadEventStart);
          } else if (entry.entryType === 'measure') {
            // Track custom measurements
            recordLatency(entry.duration);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'measure'] });
    } catch (error) {
      logger.warn('PerformanceObserver not supported', { error: error instanceof Error ? error : new Error(String(error)) });
    }
  }, []);

  const updateMetrics = useCallback(() => {
    const now = Date.now();
    const uptime = now - startTimeRef.current;

    // Calculate average latency
    const avgLatency = latencyMeasurements.current.length > 0
      ? latencyMeasurements.current.reduce((sum, val) => sum + val, 0) / latencyMeasurements.current.length
      : 0;

    // Calculate bandwidth usage (bytes per second over last minute)
    const recentBandwidth = bandwidthTracker.current.filter(
      entry => now - entry.timestamp < 60000
    );
    const bandwidthUsage = recentBandwidth.length > 0
      ? recentBandwidth.reduce((sum, entry) => sum + entry.bytes, 0) / 60
      : 0;

    // Calculate memory usage (if available)
    const memoryUsage = getMemoryUsage();

    // Calculate connection quality
    const quality = calculateConnectionQuality(avgLatency, metrics.errorCount, bandwidthUsage);

    // Update metrics
    const newMetrics: PerformanceMetrics = {
      ...metrics,
      connectionLatency: avgLatency,
      messageLatency: avgLatency,
      connectionQuality: quality,
      bandwidthUsage,
      memoryUsage,
      lastUpdated: now
    };

    setMetrics(newMetrics);

    // Update connection health
    const health: ConnectionHealth = {
      isHealthy: quality !== 'critical' && quality !== 'poor',
      status: determineConnectionStatus(avgLatency, metrics.errorCount),
      quality,
      latency: avgLatency,
      uptime,
      issues: identifyIssues(newMetrics),
      recommendations: generateRecommendations(newMetrics)
    };

    setConnectionHealth(health);

    // Check for alerts
    if (enableAlerts) {
      checkForAlerts(newMetrics);
    }

    // Clean up old measurements
    cleanupMeasurements();
  }, [metrics, enableAlerts, alertThresholds]);

  const calculateConnectionQuality = useCallback((
    latency: number,
    errorCount: number,
    bandwidth: number
  ): ConnectionHealth['quality'] => {
    let score = 100;

    // Latency penalties
    if (latency > 2000) score -= 40;
    else if (latency > 1000) score -= 20;
    else if (latency > 500) score -= 10;

    // Error penalties
    const errorRate = errorCount / Math.max(metrics.messagesReceived + metrics.messagesSent, 1);
    if (errorRate > 0.1) score -= 30;
    else if (errorRate > 0.05) score -= 15;
    else if (errorRate > 0.02) score -= 5;

    // Bandwidth penalties (for very high usage)
    if (bandwidth > 2000) score -= 20;
    else if (bandwidth > 1000) score -= 10;

    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'poor';
    return 'critical';
  }, [metrics.messagesReceived, metrics.messagesSent]);

  const determineConnectionStatus = useCallback((
    latency: number,
    errorCount: number
  ): ConnectionHealth['status'] => {
    if (latency === 0 && errorCount === 0) return 'disconnected';
    if (latency > 5000) return 'error';
    if (latency > 2000) return 'connecting';
    return 'connected';
  }, []);

  const identifyIssues = useCallback((metrics: PerformanceMetrics): string[] => {
    const issues: string[] = [];

    if (metrics.connectionLatency > alertThresholds.maxLatency) {
      issues.push('High connection latency detected');
    }

    const errorRate = metrics.errorCount / Math.max(metrics.messagesReceived + metrics.messagesSent, 1);
    if (errorRate > alertThresholds.maxErrorRate) {
      issues.push('High error rate detected');
    }

    if (metrics.memoryUsage > alertThresholds.maxMemoryUsage) {
      issues.push('High memory usage detected');
    }

    if (metrics.bandwidthUsage > alertThresholds.maxBandwidthUsage) {
      issues.push('High bandwidth usage detected');
    }

    return issues;
  }, [alertThresholds]);

  const generateRecommendations = useCallback((metrics: PerformanceMetrics): string[] => {
    const recommendations: string[] = [];

    if (metrics.connectionLatency > 1000) {
      recommendations.push('Consider switching to a faster network connection');
      recommendations.push('Close unnecessary browser tabs to free up resources');
    }

    if (metrics.errorCount > 5) {
      recommendations.push('Check your internet connection stability');
      recommendations.push('Try refreshing the page to reset the connection');
    }

    if (metrics.memoryUsage > 80) {
      recommendations.push('Close other applications to free up memory');
      recommendations.push('Refresh the page to clear memory caches');
    }

    if (metrics.bandwidthUsage > 800) {
      recommendations.push('Reduce other network activity for better performance');
      recommendations.push('Consider using a wired connection for stability');
    }

    return recommendations;
  }, []);

  const checkForAlerts = useCallback((metrics: PerformanceMetrics) => {
    const now = Date.now();
    const newAlerts: PerformanceAlert[] = [];

    // Latency alert
    if (metrics.connectionLatency > alertThresholds.maxLatency) {
      newAlerts.push({
        id: `latency-${now}`,
        type: 'latency',
        severity: metrics.connectionLatency > alertThresholds.maxLatency * 2 ? 'critical' : 'high',
        message: `High latency detected: ${Math.round(metrics.connectionLatency)}ms`,
        timestamp: now,
        acknowledged: false
      });
    }

    // Error rate alert
    const errorRate = metrics.errorCount / Math.max(metrics.messagesReceived + metrics.messagesSent, 1);
    if (errorRate > alertThresholds.maxErrorRate) {
      newAlerts.push({
        id: `error-${now}`,
        type: 'error',
        severity: errorRate > alertThresholds.maxErrorRate * 2 ? 'critical' : 'high',
        message: `High error rate: ${(errorRate * 100).toFixed(1)}%`,
        timestamp: now,
        acknowledged: false
      });
    }

    // Memory alert
    if (metrics.memoryUsage > alertThresholds.maxMemoryUsage) {
      newAlerts.push({
        id: `memory-${now}`,
        type: 'memory',
        severity: metrics.memoryUsage > alertThresholds.maxMemoryUsage * 1.5 ? 'critical' : 'medium',
        message: `High memory usage: ${Math.round(metrics.memoryUsage)}MB`,
        timestamp: now,
        acknowledged: false
      });
    }

    // Bandwidth alert
    if (metrics.bandwidthUsage > alertThresholds.maxBandwidthUsage) {
      newAlerts.push({
        id: `bandwidth-${now}`,
        type: 'bandwidth',
        severity: 'medium',
        message: `High bandwidth usage: ${Math.round(metrics.bandwidthUsage)} bytes/s`,
        timestamp: now,
        acknowledged: false
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...prev, ...newAlerts]);
      newAlerts.forEach(alert => onAlert?.(alert));
    }
  }, [alertThresholds, onAlert]);

  const getMemoryUsage = useCallback((): number => {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }, []);

  const cleanupMeasurements = useCallback(() => {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    // Keep only recent latency measurements
    latencyMeasurements.current = latencyMeasurements.current.slice(-100);

    // Clean up bandwidth tracker
    bandwidthTracker.current = bandwidthTracker.current.filter(
      entry => now - entry.timestamp < maxAge
    );

    // Clean up old alerts
    setAlerts(prev => prev.filter(alert => now - alert.timestamp < maxAge));
  }, []);

  // Performance action functions
  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const recordLatency = useCallback((latency: number) => {
    latencyMeasurements.current.push(latency);
    // Keep only recent measurements
    if (latencyMeasurements.current.length > 100) {
      latencyMeasurements.current = latencyMeasurements.current.slice(-100);
    }
  }, []);

  const recordError = useCallback((error: any) => {
    setMetrics(prev => ({
      ...prev,
      errorCount: prev.errorCount + 1,
      lastUpdated: Date.now()
    }));

    const errorType = error.type || 'unknown';
    errorCounts.current[errorType] = (errorCounts.current[errorType] || 0) + 1;
  }, []);

  const recordMessage = useCallback((type: 'sent' | 'received', size: number) => {
    const now = Date.now();
    bandwidthTracker.current.push({ timestamp: now, bytes: size });

    setMetrics(prev => ({
      ...prev,
      [type === 'sent' ? 'messagesSent' : 'messagesReceived']: 
        prev[type === 'sent' ? 'messagesSent' : 'messagesReceived'] + 1,
      lastUpdated: now
    }));
  }, []);

  const runSpeedTest = useCallback(async (): Promise<number> => {
    try {
      const start = performance.now();
      
      // Simple ping test to server
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      const end = performance.now();
      const latency = end - start;
      
      if (response.ok) {
        recordLatency(latency);
        return latency;
      } else {
        throw new Error('Speed test failed');
      }
    } catch (error) {
      recordError(error);
      return -1;
    }
  }, [recordLatency, recordError]);

  const optimizeConnection = useCallback(async (): Promise<void> => {
    try {
      // Clear old measurements
      latencyMeasurements.current = [];
      bandwidthTracker.current = [];
      errorCounts.current = {};
      
      // Reset error count
      setMetrics(prev => ({
        ...prev,
        errorCount: 0,
        reconnectionCount: prev.reconnectionCount + 1,
        lastUpdated: Date.now()
      }));

      // Clear alerts
      clearAlerts();
      
      logger.info('Connection optimization completed');
    } catch (error) {
      logger.error('Connection optimization failed', { error: error instanceof Error ? error : new Error(String(error)) });
      recordError(error);
    }
  }, [clearAlerts, recordError]);

  const exportMetrics = useCallback(() => {
    return {
      metrics,
      connectionHealth,
      alerts: alerts.filter(alert => !alert.acknowledged),
      measurements: {
        latency: latencyMeasurements.current.slice(-50),
        bandwidth: bandwidthTracker.current.slice(-50),
        errors: errorCounts.current
      },
      exportedAt: new Date().toISOString()
    };
  }, [metrics, connectionHealth, alerts]);

  const actions: PerformanceActions = {
    acknowledgeAlert,
    clearAlerts,
    recordLatency,
    recordError,
    recordMessage,
    runSpeedTest,
    optimizeConnection,
    exportMetrics
  };

  return [metrics, connectionHealth, alerts, actions];
}