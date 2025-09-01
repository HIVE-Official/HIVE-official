'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../../atomic/atoms/button-enhanced';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';

// Offline capability levels
type OfflineCapability = 
  | 'full'        // Complete offline functionality
  | 'read-only'   // Can view cached content
  | 'essential'   // Core features only
  | 'limited'     // Basic functionality
  | 'none';       // No offline support

// Sync strategies for when connection returns
type SyncStrategy = 
  | 'immediate'   // Sync as soon as online
  | 'batched'     // Collect changes and sync in batches
  | 'manual'      // User-initiated sync
  | 'intelligent' // Smart sync based on usage patterns
  | 'background'; // Sync in background without user notice

// Campus-specific offline contexts
interface CampusOfflineContext {
  location: 'dorm' | 'library' | 'classroom' | 'outdoor' | 'commuting' | 'unknown';
  commonDisconnectPatterns: {
    expectedDuration: number; // minutes
    reliability: 'high' | 'medium' | 'low';
    alternatives: string[]; // Suggested locations with better connectivity
  };
  campusWifiStatus: 'operational' | 'maintenance' | 'outage' | 'unknown';
}

// User activity during offline periods
interface OfflineActivity {
  actionsPerformed: {
    id: string;
    type: 'create' | 'edit' | 'delete' | 'view' | 'interact';
    data: any;
    timestamp: Date;
    syncPriority: 'high' | 'medium' | 'low';
  }[];
  contentViewed: string[];
  timeSpentOffline: number; // milliseconds
  userFrustrationLevel: 'low' | 'medium' | 'high'; // Based on attempted actions
}

interface OfflineHandlerProps {
  // Core configuration
  offlineCapability?: OfflineCapability;
  syncStrategy?: SyncStrategy;
  
  // Campus context
  campusContext?: CampusOfflineContext;
  
  // Features
  enableOfflineNotifications?: boolean;
  enableSmartSync?: boolean;
  enableOfflineAnalytics?: boolean;
  showOfflineIndicator?: boolean;
  
  // Content management
  cachedContent?: any;
  essentialFeatures?: string[];
  offlineActions?: string[];
  
  // Sync configuration
  syncBatchSize?: number;
  syncTimeout?: number; // milliseconds
  maxRetries?: number;
  
  // Callbacks
  onOffline?: (context?: CampusOfflineContext) => void;
  onOnline?: (offlineActivity: OfflineActivity) => void;
  onSyncStart?: (pendingActions: any[]) => void;
  onSyncComplete?: (results: SyncResult[]) => void;
  onSyncError?: (error: Error, retryCount: number) => void;
  
  // UI customization
  offlineMessage?: string;
  reconnectingMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

// Sync operation result
interface SyncResult {
  actionId: string;
  success: boolean;
  error?: string;
  serverResponse?: any;
}

// Connection state with detailed information
interface ConnectionState {
  isOnline: boolean;
  isReconnecting: boolean;
  lastOnlineTime?: Date;
  offlineDuration: number; // milliseconds
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';
  estimatedReconnectTime?: number; // milliseconds
}

// Advanced offline manager
class CampusOfflineManager {
  private static instance: CampusOfflineManager;
  private pendingActions: OfflineActivity['actionsPerformed'] = [];
  private offlineContent = new Map<string, any>();
  private syncQueue: any[] = [];
  private isRetrying = false;
  
  static getInstance(): CampusOfflineManager {
    if (!CampusOfflineManager.instance) {
      CampusOfflineManager.instance = new CampusOfflineManager();
    }
    return CampusOfflineManager.instance;
  }
  
  // Queue action for sync when online
  queueAction(action: OfflineActivity['actionsPerformed'][0]) {
    // Merge similar actions to reduce sync load
    const existingIndex = this.pendingActions.findIndex(
      a => a.id === action.id && a.type === action.type
    );
    
    if (existingIndex >= 0) {
      // Update existing action with latest data
      this.pendingActions[existingIndex] = {
        ...this.pendingActions[existingIndex],
        data: { ...this.pendingActions[existingIndex].data, ...action.data },
        timestamp: action.timestamp
      };
    } else {
      this.pendingActions.push(action);
    }
    
    // Store in localStorage for persistence
    this.persistPendingActions();
  }
  
  // Cache content for offline access
  cacheContent(key: string, content: any, expiryTime?: number) {
    const cacheEntry = {
      content,
      timestamp: Date.now(),
      expiryTime: expiryTime || Date.now() + (24 * 60 * 60 * 1000) // 24 hours default
    };
    
    this.offlineContent.set(key, cacheEntry);
    
    // Store in localStorage
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn('Failed to cache content offline:', error);
    }
  }
  
  // Retrieve cached content
  getCachedContent(key: string): any | null {
    // Check memory cache first
    const memoryCache = this.offlineContent.get(key);
    if (memoryCache && memoryCache.expiryTime > Date.now()) {
      return memoryCache.content;
    }
    
    // Check localStorage
    try {
      const stored = localStorage.getItem(`offline_${key}`);
      if (stored) {
        const cacheEntry = JSON.parse(stored);
        if (cacheEntry.expiryTime > Date.now()) {
          // Restore to memory cache
          this.offlineContent.set(key, cacheEntry);
          return cacheEntry.content;
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cached content:', error);
    }
    
    return null;
  }
  
  // Sync pending actions when connection returns
  async syncPendingActions(
    strategy: SyncStrategy,
    batchSize: number = 10,
    maxRetries: number = 3
  ): Promise<SyncResult[]> {
    if (this.pendingActions.length === 0) {
      return [];
    }
    
    const results: SyncResult[] = [];
    
    switch (strategy) {
      case 'immediate':
        // Sync all actions immediately
        for (const action of this.pendingActions) {
          const result = await this.syncSingleAction(action, maxRetries);
          results.push(result);
        }
        break;
        
      case 'batched':
        // Sync in batches
        for (let i = 0; i < this.pendingActions.length; i += batchSize) {
          const batch = this.pendingActions.slice(i, i + batchSize);
          const batchResults = await Promise.all(
            batch.map(action => this.syncSingleAction(action, maxRetries))
          );
          results.push(...batchResults);
          
          // Small delay between batches to avoid overwhelming server
          if (i + batchSize < this.pendingActions.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
        break;
        
      case 'intelligent':
        // Sync high priority actions first
        const priorityGroups = {
          high: this.pendingActions.filter(a => a.syncPriority === 'high'),
          medium: this.pendingActions.filter(a => a.syncPriority === 'medium'),
          low: this.pendingActions.filter(a => a.syncPriority === 'low')
        };
        
        for (const [priority, actions] of Object.entries(priorityGroups)) {
          for (const action of actions) {
            const result = await this.syncSingleAction(action, maxRetries);
            results.push(result);
          }
          
          // Longer delay after high priority items
          if (priority === 'high' && actions.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
        break;
        
      case 'background':
        // Sync silently in background
        setTimeout(async () => {
          for (const action of this.pendingActions) {
            await this.syncSingleAction(action, maxRetries);
          }
        }, 1000);
        break;
    }
    
    // Clear successfully synced actions
    const successfulIds = results
      .filter(r => r.success)
      .map(r => r.actionId);
    
    this.pendingActions = this.pendingActions.filter(
      action => !successfulIds.includes(action.id)
    );
    
    this.persistPendingActions();
    
    return results;
  }
  
  private async syncSingleAction(
    action: OfflineActivity['actionsPerformed'][0],
    maxRetries: number
  ): Promise<SyncResult> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // This would be replaced with actual API calls
        const response = await this.simulateApiCall(action);
        
        return {
          actionId: action.id,
          success: true,
          serverResponse: response
        };
      } catch (error) {
        if (attempt === maxRetries) {
          return {
            actionId: action.id,
            success: false,
            error: (error as Error).message
          };
        }
        
        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
    
    return {
      actionId: action.id,
      success: false,
      error: 'Max retries exceeded'
    };
  }
  
  private async simulateApiCall(action: any): Promise<any> {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ id: action.id, synced: true });
        } else {
          reject(new Error('Sync failed'));
        }
      }, 500 + Math.random() * 1000);
    });
  }
  
  private persistPendingActions() {
    try {
      localStorage.setItem(
        'offline_pending_actions',
        JSON.stringify(this.pendingActions)
      );
    } catch (error) {
      console.warn('Failed to persist pending actions:', error);
    }
  }
  
  getPendingActionsCount(): number {
    return this.pendingActions.length;
  }
  
  clearPendingActions() {
    this.pendingActions = [];
    localStorage.removeItem('offline_pending_actions');
  }
}

// Custom hook for connection monitoring
function useConnectionMonitor(): ConnectionState {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isReconnecting: false,
    offlineDuration: 0,
    connectionQuality: 'unknown'
  });
  
  const offlineStartTime = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);
  
  useEffect(() => {
    const updateConnectionState = () => {
      const isOnline = navigator.onLine;
      const now = Date.now();
      
      if (isOnline && !connectionState.isOnline) {
        // Just came back online
        setConnectionState(prev => ({
          ...prev,
          isOnline: true,
          isReconnecting: false,
          lastOnlineTime: new Date(),
          offlineDuration: offlineStartTime.current ? now - offlineStartTime.current : 0
        }));
        
        offlineStartTime.current = null;
        reconnectAttempts.current = 0;
      } else if (!isOnline && connectionState.isOnline) {
        // Just went offline
        offlineStartTime.current = now;
        setConnectionState(prev => ({
          ...prev,
          isOnline: false,
          isReconnecting: false
        }));
      }
    };
    
    // Connection quality monitoring (simplified)
    const monitorQuality = () => {
      // @ts-ignore - Network Information API
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        let quality: ConnectionState['connectionQuality'] = 'unknown';
        
        if (connection.effectiveType === '4g' && connection.downlink > 10) {
          quality = 'excellent';
        } else if (connection.effectiveType === '4g' || connection.downlink > 5) {
          quality = 'good';
        } else if (connection.effectiveType === '3g' || connection.downlink > 1) {
          quality = 'fair';
        } else {
          quality = 'poor';
        }
        
        setConnectionState(prev => ({ ...prev, connectionQuality: quality }));
      }
    };
    
    // Update offline duration periodically
    const updateOfflineDuration = () => {
      if (!connectionState.isOnline && offlineStartTime.current) {
        const duration = Date.now() - offlineStartTime.current;
        setConnectionState(prev => ({ ...prev, offlineDuration: duration }));
      }
    };
    
    updateConnectionState();
    monitorQuality();
    
    // Event listeners
    window.addEventListener('online', updateConnectionState);
    window.addEventListener('offline', updateConnectionState);
    
    // @ts-ignore
    const connection = navigator.connection;
    if (connection) {
      connection.addEventListener('change', monitorQuality);
    }
    
    // Periodic updates
    const qualityInterval = setInterval(monitorQuality, 10000);
    const durationInterval = setInterval(updateOfflineDuration, 1000);
    
    return () => {
      window.removeEventListener('online', updateConnectionState);
      window.removeEventListener('offline', updateConnectionState);
      if (connection) {
        connection.removeEventListener('change', monitorQuality);
      }
      clearInterval(qualityInterval);
      clearInterval(durationInterval);
    };
  }, [connectionState.isOnline]);
  
  return connectionState;
}

export const OfflineHandler: React.FC<OfflineHandlerProps> = ({
  offlineCapability = 'read-only',
  syncStrategy = 'intelligent',
  campusContext,
  enableOfflineNotifications = true,
  enableSmartSync = true,
  enableOfflineAnalytics = true,
  showOfflineIndicator = true,
  cachedContent,
  essentialFeatures = [],
  offlineActions = [],
  syncBatchSize = 10,
  syncTimeout = 30000,
  maxRetries = 3,
  onOffline,
  onOnline,
  onSyncStart,
  onSyncComplete,
  onSyncError,
  offlineMessage,
  reconnectingMessage,
  className,
  children
}) => {
  const viewport = useAdvancedViewport();
  const connectionState = useConnectionMonitor();
  const offlineManager = CampusOfflineManager.getInstance();
  const [offlineActivity, setOfflineActivity] = useState<OfflineActivity>({
    actionsPerformed: [],
    contentViewed: [],
    timeSpentOffline: 0,
    userFrustrationLevel: 'low'
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  
  // Handle offline/online transitions
  useEffect(() => {
    if (!connectionState.isOnline) {
      onOffline?.(campusContext);
    } else if (connectionState.lastOnlineTime) {
      // Just came back online
      onOnline?.(offlineActivity);
      
      // Start sync if enabled
      if (enableSmartSync && pendingCount > 0) {
        handleSync();
      }
    }
  }, [connectionState.isOnline]);
  
  // Update pending actions count
  useEffect(() => {
    const updateCount = () => {
      setPendingCount(offlineManager.getPendingActionsCount());
    };
    
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Handle sync operation
  const handleSync = useCallback(async () => {
    if (isSyncing || !connectionState.isOnline) return;
    
    setIsSyncing(true);
    onSyncStart?.([]);
    
    try {
      const results = await offlineManager.syncPendingActions(
        syncStrategy,
        syncBatchSize,
        maxRetries
      );
      
      onSyncComplete?.(results);
      
      // Check for failed syncs
      const failures = results.filter(r => !r.success);
      if (failures.length > 0) {
        console.warn(`${failures.length} sync operations failed:`, failures);
      }
      
    } catch (error) {
      onSyncError?.(error as Error, 0);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, connectionState.isOnline, syncStrategy, syncBatchSize, maxRetries]);
  
  // Generate appropriate offline message
  const getOfflineMessage = () => {
    if (offlineMessage) return offlineMessage;
    
    if (campusContext?.location) {
      const locationMessages = {
        dorm: "Campus Wi-Fi seems down in your dorm - try the common area!",
        library: "Library network issues - try switching to mobile data",
        classroom: "Classroom Wi-Fi having trouble - totally normal during class!",
        outdoor: "Outdoor Wi-Fi can be spotty - try moving closer to a building",
        commuting: "You're on the move - HIVE works great offline too!",
        unknown: "Connection lost, but HIVE keeps working offline!"
      };
      return locationMessages[campusContext.location];
    }
    
    return "You're offline, but don't worry - HIVE has you covered!";
  };
  
  // Don't show offline UI if capability is 'none'
  if (offlineCapability === 'none' && !connectionState.isOnline) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-hive-background-primary">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <Text variant="heading-lg" color="primary">
            Connection Required
          </Text>
          <Text variant="body-md" color="secondary">
            HIVE needs an internet connection to work. Please check your network and try again.
          </Text>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn('relative', className)}>
      {children}
      
      {/* Offline indicator */}
      {showOfflineIndicator && !connectionState.isOnline && (
        <div className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'bg-hive-gold text-[var(--hive-text-primary)] px-4 py-2 text-center text-sm font-medium',
          'border-b border-hive-gold/20'
        )}>
          <div className="flex items-center justify-center space-x-2">
            <span>📱</span>
            <span>{getOfflineMessage()}</span>
            {offlineCapability !== 'none' && (
              <span className="text-xs opacity-75">
                ({offlineCapability} mode)
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Reconnecting indicator */}
      {connectionState.isReconnecting && (
        <div className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'bg-hive-emerald text-[var(--hive-text-inverse)] px-4 py-2 text-center text-sm font-medium'
        )}>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{reconnectingMessage || 'Reconnecting to HIVE...'}</span>
          </div>
        </div>
      )}
      
      {/* Sync status */}
      {connectionState.isOnline && pendingCount > 0 && (
        <div className={cn(
          'fixed bottom-4 right-4 z-40',
          'bg-hive-background-primary border border-hive-border-default rounded-lg p-4 shadow-lg',
          'max-w-sm'
        )}>
          <div className="flex items-center justify-between space-x-3">
            <div className="flex-1">
              <Text variant="body-sm" color="primary" className="font-medium">
                {isSyncing ? 'Syncing changes...' : `${pendingCount} changes to sync`}
              </Text>
              <Text variant="body-xs" color="muted">
                {isSyncing ? 'Please wait' : 'Made while offline'}
              </Text>
            </div>
            {!isSyncing && (
              <ButtonEnhanced
                size="sm"
                variant="primary"
                onClick={handleSync}
                disabled={!connectionState.isOnline}
              >
                Sync Now
              </ButtonEnhanced>
            )}
          </div>
        </div>
      )}
      
      {/* Development debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-16 left-4 bg-black/90 text-[var(--hive-text-inverse)] text-xs p-3 rounded-lg font-mono z-50 max-w-xs">
          <div className="font-semibold mb-2">Offline Debug</div>
          <div>Status: {connectionState.isOnline ? 'Online' : 'Offline'}</div>
          <div>Quality: {connectionState.connectionQuality}</div>
          <div>Offline Duration: {Math.round(connectionState.offlineDuration / 1000)}s</div>
          <div>Pending Actions: {pendingCount}</div>
          <div>Capability: {offlineCapability}</div>
          <div>Sync Strategy: {syncStrategy}</div>
          <div>Is Syncing: {isSyncing ? 'Yes' : 'No'}</div>
          {campusContext && (
            <>
              <div>Location: {campusContext.location}</div>
              <div>WiFi Status: {campusContext.campusWifiStatus}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Export utilities
export { CampusOfflineManager, useConnectionMonitor };
export type {
  OfflineHandlerProps,
  OfflineCapability,
  SyncStrategy,
  CampusOfflineContext,
  OfflineActivity,
  ConnectionState,
  SyncResult
};