/**
 * HIVE Live Tool Executor;
 * Real-time tool execution with state management and collaborative features;
 */

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar, HiveBadge as Badge } from '../index';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Save, 
  Share, 
  Download,
  Upload,
  Settings,
  Maximize2,
  Minimize2,
  Users,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Zap,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Terminal,
  Bug,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Copy,
  ExternalLink,
  GitBranch,
  History,
  Layers,
  Box,
  Database,
  Network,
  Cpu,
  HardDrive;
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToolExecutionState {id: string;
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
    responsiveness: number;};
  versions: {
    current: string;
    history: ToolVersion[];
  };
  collaborators: Collaborator[];
  permissions: ExecutionPermissions;
}

export interface ExecutionError {id: string;
  type: 'runtime' | 'syntax' | 'network' | 'permission' | 'validation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details?: string;
  timestamp: string;
  line?: number;
  column?: number;
  stackTrace?: string;
  suggestions?: string[];}

export interface ExecutionLog {id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  source: string;
  data?: any;}

export interface ToolVersion {id: string;
  version: string;
  timestamp: string;
  changes: string;
  author: {
    id: string;
    name: string;
    avatar?: string;};
  isStable: boolean;
}

export interface Collaborator {id: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  cursor?: {
    x: number;
    y: number;
    color: string;};
  lastActivity?: string;
}

export interface ExecutionPermissions {canEdit: boolean;
  canExecute: boolean;
  canSave: boolean;
  canShare: boolean;
  canManageCollaborators: boolean;
  canViewLogs: boolean;
  canDebug: boolean;}

export interface ToolConfig {id: string;
  name: string;
  version: string;
  type: 'web' | 'api' | 'script' | 'widget';
  runtime: 'browser' | 'node' | 'python' | 'custom';
  framework?: string;
  dependencies: string[];
  permissions: string[];
  allowCollaboration: boolean;
  autoSave: boolean;
  sandboxed: boolean;}

interface LiveToolExecutorProps {toolConfig: ToolConfig;
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
  enableFeatureFlag?: boolean;}

interface SharePermissions {public: boolean;
  allowEdit: boolean;
  allowExecute: boolean;
  expiresAt?: string;}

interface ExecutionControlsProps {status: ToolExecutionState['status'];
  onExecute: () => Promise<void>;
  onPause: () => Promise<void>;
  onStop: () => Promise<void>;
  onReset: () => Promise<void>;
  permissions: ExecutionPermissions;
  isLoading?: boolean;}

interface PerformanceMonitorProps {performance: ToolExecutionState['performance'];
  status: ToolExecutionState['status'];}

interface CollaboratorsPanelProps {collaborators: Collaborator[];
  currentUserId: string;
  permissions: ExecutionPermissions;
  onInvite?: (email: string, role: Collaborator['role']) => Promise<void>;
  onUpdateRole?: (userId: string, role: Collaborator['role']) => Promise<void>;
  onRemove?: (userId: string) => Promise<void>;}

interface LogsPanelProps {logs: ExecutionLog[];
  errors: ExecutionError[];
  permissions: ExecutionPermissions;
  onClearLogs?: () => void;
  onExportLogs?: (format: 'json' | 'csv' | 'txt') => Promise<void>;}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  status,
  onExecute,
  onPause,
  onStop,
  onReset,
  permissions,
  isLoading = false;
}) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = useCallback(async () => {
    if (!permissions.canExecute || isExecuting) return;
    setIsExecuting(true);
    try {
      await onExecute();
    } finally {
      setIsExecuting(false);
    }
  }, [onExecute, permissions.canExecute, isExecuting]);

  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Activity className="w-4 h-4 text-green-400 animate-pulse" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
      case 'crashed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Square className="w-4 h-4 text-gray-400" />;
    }}
  };

  const getStatusText = () => {
    switch (status) {
      case 'running': return 'Running';
      case 'paused': return 'Paused';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      case 'crashed': return 'Crashed';
      default: return 'Ready';
    }}
  };

  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'completed': return 'text-green-400';
      case 'error':
      case 'crashed': return 'text-red-400';
      default: return 'text-gray-400';
    }}
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Status Indicator */}
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-2">
        {status === 'idle' || status === 'completed' || status === 'error' || status === 'crashed' ? (
          <Button;
            onClick={handleExecute}
            disabled={!permissions.canExecute || isExecuting || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            {isExecuting || isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>Run</span>
          </Button>
        ) : status === 'running' ? (
          <Button;
            onClick={onPause}
            disabled={!permissions.canExecute}
            className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center space-x-2"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </Button>
        ) : status === 'paused' ? (
          <Button;
            onClick={handleExecute}
            disabled={!permissions.canExecute}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Resume</span>
          </Button>
        ) : null}

        {(status === 'running' || status === 'paused') && (
          <Button;
            onClick={onStop}
            disabled={!permissions.canExecute}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10 flex items-center space-x-2"
          >
            <Square className="w-4 h-4" />
            <span>Stop</span>
          </Button>
        )}

        <Button;
          onClick={onReset}
          disabled={!permissions.canEdit || status === 'running'}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );
};

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  performance,
  status;
}) => {
  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-red-400';
    if (usage > 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatUsage = (usage: number) => `${usage.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center space-x-2">
        <Cpu className="w-4 h-4 text-[var(--hive-text-muted)]" />
        <div>
          <div className="text-xs text-[var(--hive-text-muted)]">CPU</div>
          <div className={`text-sm font-medium ${getUsageColor(performance.cpuUsage)}`}>
            {formatUsage(performance.cpuUsage)}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <HardDrive className="w-4 h-4 text-[var(--hive-text-muted)]" />
        <div>
          <div className="text-xs text-[var(--hive-text-muted)]">Memory</div>
          <div className={`text-sm font-medium ${getUsageColor(performance.memoryUsage)}`}>
            {formatUsage(performance.memoryUsage)}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Network className="w-4 h-4 text-[var(--hive-text-muted)]" />
        <div>
          <div className="text-xs text-[var(--hive-text-muted)]">Network</div>
          <div className={`text-sm font-medium ${getUsageColor(performance.networkActivity)}`}>
            {formatUsage(performance.networkActivity)}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-[var(--hive-text-muted)]" />
        <div>
          <div className="text-xs text-[var(--hive-text-muted)]">Response</div>
          <div className={`text-sm font-medium ${getUsageColor(100 - performance.responsiveness)}`}>
            {performance.responsiveness.toFixed(0)}ms;
          </div>
        </div>
      </div>
    </div>
  );
};

const CollaboratorsPanel: React.FC<CollaboratorsPanelProps> = ({
  collaborators,
  currentUserId,
  permissions,
  onInvite,
  onUpdateRole,
  onRemove;
}) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Collaborator['role']>('viewer');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = useCallback(async () => {
    if (!inviteEmail.trim() || isInviting) return;
    
    setIsInviting(true);
    try {
      await onInvite?.(inviteEmail, inviteRole);
      setInviteEmail('');
      setShowInviteForm(false);
    } finally {
      setIsInviting(false);
    }
  }, [inviteEmail, inviteRole, onInvite, isInviting]);

  const formatLastActivity = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getRoleColor = (role: Collaborator['role']) => {
    switch (role) {
      case 'owner': return 'text-purple-400';
      case 'editor': return 'text-blue-400';
      case 'viewer': return 'text-gray-400';
      default: return 'text-gray-400';
    }}
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[var(--hive-text-primary)]">
          Collaborators ({collaborators.length})
        </h3>
        {permissions.canManageCollaborators && (
          <Button;
            size="sm"
            onClick={() => setShowInviteForm(true)}
            className="bg-[var(--hive-primary)] text-white"
          >
            Invite;
          </Button>
        )}
      </div>

      {/* Invite Form */}
      <AnimatePresence>
        {showInviteForm && (
          <motion.div;
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]"
          >
            <div className="space-y-3">
              <input;
                type="email"
                placeholder="Enter email address..."
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full p-2 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]"
              />
              <select;
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as Collaborator['role'])}
                className="w-full p-2 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="owner">Owner</option>
              </select>
              <div className="flex items-center space-x-2">
                <Button;
                  size="sm"
                  onClick={handleInvite}
                  disabled={!inviteEmail.trim() || isInviting}
                  className="bg-[var(--hive-primary)] text-white"
                >
                  {isInviting ? 'Inviting...' : 'Invite'}
                </Button>
                <Button;
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowInviteForm(false)}
                >
                  Cancel;
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaborators List */}
      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div;
            key={collaborator.id}
            className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar;
                  src={collaborator.avatar}
                  initials={collaborator.name.charAt(0)}
                  size="sm"
                />
                {collaborator.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[var(--hive-background-secondary)] rounded-full" />
                )}
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">
                  {collaborator.name}
                  {collaborator.id === currentUserId && ' (You)'}
                </div>
                <div className="text-xs text-[var(--hive-text-muted)]">
                  Last active: {formatLastActivity(collaborator.lastActivity)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge;
                size="sm"
                className={`${getRoleColor(collaborator.role)} capitalize`}
              >
                {collaborator.role}
              </Badge>
              
              {permissions.canManageCollaborators && collaborator.id !== currentUserId && (
                <div className="relative">
                  <Button variant="ghost" size="xs">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                  {/* Role management menu would go here */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LogsPanel: React.FC<LogsPanelProps> = ({
  logs,
  errors,
  permissions,
  onClearLogs,
  onExportLogs;
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'errors'>('logs');
  const [logLevel, setLogLevel] = useState<'all' | 'debug' | 'info' | 'warn' | 'error'>('all');
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'logs') {
      logsEndRef.current?.scrollIntoView({behavior: 'smooth')};
    }
  }, [logs, activeTab]);

  const filteredLogs = useMemo(() => {
    if (logLevel === 'all') return logs;
    return logs.filter(log => log.level === logLevel);
  }, [logs, logLevel]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getLevelIcon = (level: ExecutionLog['level']) => {
    switch (level) {
      case 'debug': return <Bug className="w-3 h-3 text-gray-400" />;
      case 'info': return <CheckCircle className="w-3 h-3 text-blue-400" />;
      case 'warn': return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-3 h-3 text-red-400" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }}
  };

  const getLevelColor = (level: ExecutionLog['level']) => {
    switch (level) {
      case 'debug': return 'text-gray-400';
      case 'info': return 'text-blue-400';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }}
  };

  const getErrorSeverityColor = (severity: ExecutionError['severity']) => {
    switch (severity) {
      case 'low': return 'text-blue-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }}
  };

  if (!permissions.canViewLogs) {
    return (
      <div className="text-center py-8">
        <EyeOff className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" />
        <p className="text-[var(--hive-text-muted)]">You don't have permission to view logs</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1">
            <button;
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === 'logs'
                  ? 'bg-[var(--hive-primary)] text-white'
                  : 'text-[var(--hive-text-muted)]'
              }`}
            >
              Logs ({logs.length})
            </button>
            <button;
              onClick={() => setActiveTab('errors')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === 'errors'
                  ? 'bg-[var(--hive-primary)] text-white'
                  : 'text-[var(--hive-text-muted)]'
              }`}
            >
              Errors ({errors.length})
            </button>
          </div>

          {activeTab === 'logs' && (
            <select;
              value={logLevel}
              onChange={(e) => setLogLevel(e.target.value as any)}
              className="px-2 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] text-sm"
            >
              <option value="all">All Levels</option>
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button;
            size="sm"
            variant="outline"
            onClick={() => onExportLogs?.('json')}
          >
            Export;
          </Button>
          <Button;
            size="sm"
            variant="outline"
            onClick={onClearLogs}
          >
            Clear;
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-64 overflow-y-auto bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
        {activeTab === 'logs' ? (
          <div className="p-3 space-y-2">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8">
                <Terminal className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" />
                <p className="text-[var(--hive-text-muted)] text-sm">No logs to display</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-2 text-sm font-mono">
                  <span className="text-[var(--hive-text-muted)] text-xs">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getLevelIcon(log.level)}
                    <span className={`uppercase text-xs ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </div>
                  <span className="text-[var(--hive-text-secondary)] flex-1">
                    [{log.source}] {log.message}
                  </span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {errors.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-[var(--hive-text-muted)] text-sm">No errors detected</p>
              </div>
            ) : (
              errors.map((error) => (
                <div key={error.id} className="p-3 bg-[var(--hive-background-elevated)] rounded border border-[var(--hive-border-default)]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`w-4 h-4 ${getErrorSeverityColor(error.severity)}`} />
                      <span className={`text-sm font-medium ${getErrorSeverityColor(error.severity)} capitalize`}>
                        {error.severity} {error.type} Error;
                      </span>
                    </div>
                    <span className="text-xs text-[var(--hive-text-muted)]">
                      {formatTimestamp(error.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{error.message}</p>
                  {error.line && (
                    <p className="text-xs text-[var(--hive-text-muted)]">
                      Line {error.line}{error.column ? `, Column ${error.column}` : ''}
                    </p>
                  )}
                  {error.suggestions && error.suggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-[var(--hive-text-muted)] mb-1">Suggestions:</p>
                      <ul className="text-xs text-[var(--hive-text-secondary)] space-y-1">
                        {error.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const LiveToolExecutor: React.FC<LiveToolExecutorProps> = ({
  toolConfig,
  initialState,
  currentUserId,
  onStateChange,
  onExecute,
  onPause,
  onStop,
  onReset,
  onSave,
  onShare,
  onInviteCollaborator,
  onUpdatePermissions,
  onExportLogs,
  enableFeatureFlag = true;
}) => {
  const [executionState, setExecutionState] = useState<ToolExecutionState>({
    id: '',
    toolId: toolConfig.id,
    sessionId: '',
    status: 'idle',
    inputData: {},
    outputData: {},
    errors: [],
    logs: [],
    performance: {
      cpuUsage: 0,
      memoryUsage: 0,
      networkActivity: 0,
      responsiveness: 0
    },
    versions: {
      current: toolConfig.version,
      history: []
    },
    collaborators: [],
    permissions: {
      canEdit: true,
      canExecute: true,
      canSave: true,
      canShare: true,
      canManageCollaborators: true,
      canViewLogs: true,
      canDebug: true;
    },
    ...initialState;
  });

  const [activePanel, setActivePanel] = useState<'performance' | 'collaborators' | 'logs' | 'settings'>('performance');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoSave, setAutoSave] = useState(toolConfig.autoSave);

  // Feature flag check;
  if (!enableFeatureFlag) return null;

  useEffect(() => {
    onStateChange?.(executionState);
  }, [executionState, onStateChange]);

  // Auto-save functionality;
  useEffect(() => {
    if (autoSave && executionState.status === 'completed') {
      onSave?.(executionState);
    }}
  }, [autoSave, executionState, onSave]);

  const handleExecute = useCallback(async () => {
    setExecutionState(prev => ({ ...prev, status: 'running', startTime: new Date().toISOString() }));
    await onExecute?.();
  }, [onExecute]);

  const handlePause = useCallback(async () => {
    setExecutionState(prev => ({ ...prev, status: 'paused' }));
    await onPause?.();
  }, [onPause]);

  const handleStop = useCallback(async () => {
    setExecutionState(prev => ({ ...prev, status: 'idle', endTime: new Date().toISOString() }));
    await onStop?.();
  }, [onStop]);

  const handleReset = useCallback(async () => {
    setExecutionState(prev => ({
      ...prev,
      status: 'idle',
      inputData: {},
      outputData: {},
      errors: [],
      logs: [],
      startTime: undefined,
      endTime: undefined,
      duration: undefined;
    }));
    await onReset?.();
  }, [onReset]);

  const handleSave = useCallback(async () => {
    await onSave?.(executionState);
  }, [onSave, executionState]);

  const formatDuration = (duration?: number) => {
    if (!duration) return '0s';
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className={`bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-[var(--hive-border-subtle)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-[var(--hive-primary)]" />
            <h2 className="font-semibold text-[var(--hive-text-primary)]">{toolConfig.name}</h2>
            <Badge size="sm" variant="secondary">v{toolConfig.version}</Badge>
          </div>
          {executionState.duration && (
            <div className="text-sm text-[var(--hive-text-muted)]">
              Duration: {formatDuration(executionState.duration)}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {executionState.permissions.canSave && (
            <Button;
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </Button>
          )}
          
          {executionState.permissions.canShare && (
            <Button;
              variant="outline"
              size="sm"
              onClick={() => onShare?.({ public: false, allowEdit: false, allowExecute: false }}
              className="flex items-center space-x-1"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          )}

          <Button;
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Execution Controls */}
      <div className="p-4 border-b border-[var(--hive-border-subtle)]">
        <ExecutionControls;
          status={executionState.status}
          onExecute={handleExecute}
          onPause={handlePause}
          onStop={handleStop}
          onReset={handleReset}
          permissions={executionState.permissions}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Tool Interface - This would be where the actual tool runs */}
        <div className="flex-1 p-4">
          <div className="h-64 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Box className="w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" />
              <p className="text-[var(--hive-text-muted)]">Tool interface will render here</p>
              <p className="text-sm text-[var(--hive-text-muted)] mt-1">
                Framework: {toolConfig.framework || toolConfig.runtime}
              </p>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 border-l border-[var(--hive-border-subtle)]">
          {/* Panel Tabs */}
          <div className="flex border-b border-[var(--hive-border-subtle)]">
            {[
              { key: 'performance', label: 'Performance', icon: Activity },
              { key: 'collaborators', label: 'Team', icon: Users },
              { key: 'logs', label: 'Logs', icon: Terminal },
              { key: 'settings', label: 'Settings', icon: Settings }
            ].map(({ key, label, icon: Icon })} => (
              <button;
                key={key}
                onClick={() => setActivePanel(key as any)}
                className={`flex-1 p-3 text-sm font-medium border-b-2 transition-colors ${
                  activePanel === key;
                    ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                    : 'border-transparent text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4 mx-auto" />
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="p-4 h-80 overflow-y-auto">
            {activePanel === 'performance' && (
              <div className="space-y-4">
                <h3 className="font-medium text-[var(--hive-text-primary)]">Performance Monitor</h3>
                <PerformanceMonitor;
                  performance={executionState.performance}
                  status={executionState.status}
                />
              </div>
            )}

            {activePanel === 'collaborators' && (
              <CollaboratorsPanel;
                collaborators={executionState.collaborators}
                currentUserId={currentUserId}
                permissions={executionState.permissions}
                onInvite={onInviteCollaborator}
              />
            )}

            {activePanel === 'logs' && (
              <LogsPanel;
                logs={executionState.logs}
                errors={executionState.errors}
                permissions={executionState.permissions}
                onExportLogs={onExportLogs}
              />
            )}

            {activePanel === 'settings' && (
              <div className="space-y-4">
                <h3 className="font-medium text-[var(--hive-text-primary)]">Tool Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input;
                      type="checkbox"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="text-[var(--hive-primary)]"
                    />
                    <span className="text-sm text-[var(--hive-text-secondary)]">Auto-save on completion</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Runtime;
                    </label>
                    <div className="text-sm text-[var(--hive-text-secondary)]">{toolConfig.runtime}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Permissions;
                    </label>
                    <div className="space-y-1">
                      {toolConfig.permissions.map((permission) => (
                        <div key={permission} className="text-xs text-[var(--hive-text-muted)]">
                          • {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};