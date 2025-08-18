/**
 * HIVE Live Tool Executor
 * Real-time tool execution with state management and collaborative features
 */
import React from 'react';
export interface ToolExecutionState {
    id: string;
    toolId: string;
    sessionId: string;
    status: 'idle' | 'running' | 'paused' | 'completed' | 'error' | 'crashed';
    startTime?: string;
    endTime?: string;
    duration?: number;
    inputData: Record<string, any>;
    outputData: Record<string, any>;
    errors: ExecutionError[];
    logs: ExecutionLog[];
    performance: {
        cpuUsage: number;
        memoryUsage: number;
        networkActivity: number;
        responsiveness: number;
    };
    versions: {
        current: string;
        history: ToolVersion[];
    };
    collaborators: Collaborator[];
    permissions: ExecutionPermissions;
}
export interface ExecutionError {
    id: string;
    type: 'runtime' | 'syntax' | 'network' | 'permission' | 'validation';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    details?: string;
    timestamp: string;
    line?: number;
    column?: number;
    stackTrace?: string;
    suggestions?: string[];
}
export interface ExecutionLog {
    id: string;
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    timestamp: string;
    source: string;
    data?: any;
}
export interface ToolVersion {
    id: string;
    version: string;
    timestamp: string;
    changes: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    isStable: boolean;
}
export interface Collaborator {
    id: string;
    name: string;
    avatar?: string;
    role: 'owner' | 'editor' | 'viewer';
    isOnline: boolean;
    cursor?: {
        x: number;
        y: number;
        color: string;
    };
    lastActivity?: string;
}
export interface ExecutionPermissions {
    canEdit: boolean;
    canExecute: boolean;
    canSave: boolean;
    canShare: boolean;
    canManageCollaborators: boolean;
    canViewLogs: boolean;
    canDebug: boolean;
}
export interface ToolConfig {
    id: string;
    name: string;
    version: string;
    type: 'web' | 'api' | 'script' | 'widget';
    runtime: 'browser' | 'node' | 'python' | 'custom';
    framework?: string;
    dependencies: string[];
    permissions: string[];
    allowCollaboration: boolean;
    autoSave: boolean;
    sandboxed: boolean;
}
interface LiveToolExecutorProps {
    toolConfig: ToolConfig;
    initialState?: Partial<ToolExecutionState>;
    currentUserId: string;
    onStateChange?: (state: ToolExecutionState) => void;
    onExecute?: () => Promise<void>;
    onPause?: () => Promise<void>;
    onStop?: () => Promise<void>;
    onReset?: () => Promise<void>;
    onSave?: (state: ToolExecutionState) => Promise<void>;
    onShare?: (permissions: SharePermissions) => Promise<string>;
    onInviteCollaborator?: (email: string, role: Collaborator['role']) => Promise<void>;
    onUpdatePermissions?: (userId: string, permissions: Partial<ExecutionPermissions>) => Promise<void>;
    onExportLogs?: (format: 'json' | 'csv' | 'txt') => Promise<void>;
    enableFeatureFlag?: boolean;
}
interface SharePermissions {
    public: boolean;
    allowEdit: boolean;
    allowExecute: boolean;
    expiresAt?: string;
}
export declare const LiveToolExecutor: React.FC<LiveToolExecutorProps>;
export {};
//# sourceMappingURL=live-tool-executor.d.ts.map