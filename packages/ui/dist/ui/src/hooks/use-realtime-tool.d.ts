/**
 * HIVE Real-time Tool Hook
 * Real-time state synchronization and updates for tools
 */
import type { ToolUpdateEvent } from '../lib/api-client';
interface RealtimeToolState {
    toolState: any;
    isLoading: boolean;
    error: string | null;
    syncStatus: 'connected' | 'disconnected' | 'syncing' | 'conflict' | 'error';
    lastSync: Date | null;
    serverVersion: number;
    clientVersion: number;
    updates: ToolUpdateEvent[];
    pendingUpdates: number;
    isConnected: boolean;
    connectionId: string | null;
}
interface RealtimeToolActions {
    updateToolState: (newState: any, optimistic?: boolean) => Promise<void>;
    syncWithServer: (force?: boolean) => Promise<void>;
    resetToServerState: () => Promise<void>;
    sendUpdate: (updateType: string, eventData: any) => Promise<void>;
    markUpdateAsRead: (updateId: string) => void;
    connect: () => void;
    disconnect: () => void;
    reconnect: () => void;
}
interface UseRealtimeToolOptions {
    toolId: string;
    deploymentId?: string;
    spaceId?: string;
    initialState?: any;
    autoConnect?: boolean;
    syncInterval?: number;
    maxRetries?: number;
    onStateChange?: (newState: any, previousState: any) => void;
    onUpdate?: (update: ToolUpdateEvent) => void;
    onError?: (error: string) => void;
    onConnectionChange?: (isConnected: boolean) => void;
}
export declare function useRealtimeTool(options: UseRealtimeToolOptions): [RealtimeToolState, RealtimeToolActions];
export declare function useToolState(toolId: string, initialState?: any): {
    state: any;
    setState: (newState: any, optimistic?: boolean) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    isConnected: boolean;
    sync: (force?: boolean) => Promise<void>;
};
export {};
//# sourceMappingURL=use-realtime-tool.d.ts.map