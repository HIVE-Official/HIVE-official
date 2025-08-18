import React from 'react';
type OfflineCapability = 'full' | 'read-only' | 'essential' | 'limited' | 'none';
type SyncStrategy = 'immediate' | 'batched' | 'manual' | 'intelligent' | 'background';
interface CampusOfflineContext {
    location: 'dorm' | 'library' | 'classroom' | 'outdoor' | 'commuting' | 'unknown';
    commonDisconnectPatterns: {
        expectedDuration: number;
        reliability: 'high' | 'medium' | 'low';
        alternatives: string[];
    };
    campusWifiStatus: 'operational' | 'maintenance' | 'outage' | 'unknown';
}
interface OfflineActivity {
    actionsPerformed: {
        id: string;
        type: 'create' | 'edit' | 'delete' | 'view' | 'interact';
        data: any;
        timestamp: Date;
        syncPriority: 'high' | 'medium' | 'low';
    }[];
    contentViewed: string[];
    timeSpentOffline: number;
    userFrustrationLevel: 'low' | 'medium' | 'high';
}
interface OfflineHandlerProps {
    offlineCapability?: OfflineCapability;
    syncStrategy?: SyncStrategy;
    campusContext?: CampusOfflineContext;
    enableOfflineNotifications?: boolean;
    enableSmartSync?: boolean;
    enableOfflineAnalytics?: boolean;
    showOfflineIndicator?: boolean;
    cachedContent?: any;
    essentialFeatures?: string[];
    offlineActions?: string[];
    syncBatchSize?: number;
    syncTimeout?: number;
    maxRetries?: number;
    onOffline?: (context?: CampusOfflineContext) => void;
    onOnline?: (offlineActivity: OfflineActivity) => void;
    onSyncStart?: (pendingActions: any[]) => void;
    onSyncComplete?: (results: SyncResult[]) => void;
    onSyncError?: (error: Error, retryCount: number) => void;
    offlineMessage?: string;
    reconnectingMessage?: string;
    className?: string;
    children?: React.ReactNode;
}
interface SyncResult {
    actionId: string;
    success: boolean;
    error?: string;
    serverResponse?: any;
}
interface ConnectionState {
    isOnline: boolean;
    isReconnecting: boolean;
    lastOnlineTime?: Date;
    offlineDuration: number;
    connectionQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';
    estimatedReconnectTime?: number;
}
declare class CampusOfflineManager {
    private static instance;
    private pendingActions;
    private offlineContent;
    private syncQueue;
    private isRetrying;
    static getInstance(): CampusOfflineManager;
    queueAction(action: OfflineActivity['actionsPerformed'][0]): void;
    cacheContent(key: string, content: any, expiryTime?: number): void;
    getCachedContent(key: string): any | null;
    syncPendingActions(strategy: SyncStrategy, batchSize?: number, maxRetries?: number): Promise<SyncResult[]>;
    private syncSingleAction;
    private simulateApiCall;
    private persistPendingActions;
    getPendingActionsCount(): number;
    clearPendingActions(): void;
}
declare function useConnectionMonitor(): ConnectionState;
export declare const OfflineHandler: React.FC<OfflineHandlerProps>;
export { CampusOfflineManager, useConnectionMonitor };
export type { OfflineHandlerProps, OfflineCapability, SyncStrategy, CampusOfflineContext, OfflineActivity, ConnectionState, SyncResult };
//# sourceMappingURL=OfflineHandler.d.ts.map