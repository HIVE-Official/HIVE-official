import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Live Tool Executor
 * Real-time tool execution with state management and collaborative features
 */
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar, HiveBadge as Badge } from '../index';
import { Play, Pause, Square, RotateCcw, Save, Share, Settings, Maximize2, Minimize2, Users, EyeOff, Loader2, AlertTriangle, CheckCircle, Clock, Activity, Zap, Terminal, Bug, MoreHorizontal, Box, Network, Cpu, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const ExecutionControls = ({ status, onExecute, onPause, onStop, onReset, permissions, isLoading = false }) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const handleExecute = useCallback(async () => {
        if (!permissions.canExecute || isExecuting)
            return;
        setIsExecuting(true);
        try {
            await onExecute();
        }
        finally {
            setIsExecuting(false);
        }
    }, [onExecute, permissions.canExecute, isExecuting]);
    const getStatusIcon = () => {
        switch (status) {
            case 'running':
                return _jsx(Activity, { className: "w-4 h-4 text-green-400 animate-pulse" });
            case 'paused':
                return _jsx(Pause, { className: "w-4 h-4 text-yellow-400" });
            case 'completed':
                return _jsx(CheckCircle, { className: "w-4 h-4 text-green-400" });
            case 'error':
            case 'crashed':
                return _jsx(AlertTriangle, { className: "w-4 h-4 text-red-400" });
            default:
                return _jsx(Square, { className: "w-4 h-4 text-gray-400" });
        }
    };
    const getStatusText = () => {
        switch (status) {
            case 'running': return 'Running';
            case 'paused': return 'Paused';
            case 'completed': return 'Completed';
            case 'error': return 'Error';
            case 'crashed': return 'Crashed';
            default: return 'Ready';
        }
    };
    const getStatusColor = () => {
        switch (status) {
            case 'running': return 'text-green-400';
            case 'paused': return 'text-yellow-400';
            case 'completed': return 'text-green-400';
            case 'error':
            case 'crashed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    return (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(), _jsx("span", { className: `text-sm font-medium ${getStatusColor()}`, children: getStatusText() })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [status === 'idle' || status === 'completed' || status === 'error' || status === 'crashed' ? (_jsxs(Button, { onClick: handleExecute, disabled: !permissions.canExecute || isExecuting || isLoading, className: "bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2", children: [isExecuting || isLoading ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin" })) : (_jsx(Play, { className: "w-4 h-4" })), _jsx("span", { children: "Run" })] })) : status === 'running' ? (_jsxs(Button, { onClick: onPause, disabled: !permissions.canExecute, className: "bg-yellow-600 hover:bg-yellow-700 text-white flex items-center space-x-2", children: [_jsx(Pause, { className: "w-4 h-4" }), _jsx("span", { children: "Pause" })] })) : status === 'paused' ? (_jsxs(Button, { onClick: handleExecute, disabled: !permissions.canExecute, className: "bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2", children: [_jsx(Play, { className: "w-4 h-4" }), _jsx("span", { children: "Resume" })] })) : null, (status === 'running' || status === 'paused') && (_jsxs(Button, { onClick: onStop, disabled: !permissions.canExecute, variant: "outline", className: "border-red-500 text-red-400 hover:bg-red-500/10 flex items-center space-x-2", children: [_jsx(Square, { className: "w-4 h-4" }), _jsx("span", { children: "Stop" })] })), _jsxs(Button, { onClick: onReset, disabled: !permissions.canEdit || status === 'running', variant: "outline", className: "flex items-center space-x-2", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), _jsx("span", { children: "Reset" })] })] })] }));
};
const PerformanceMonitor = ({ performance, status }) => {
    const getUsageColor = (usage) => {
        if (usage > 80)
            return 'text-red-400';
        if (usage > 60)
            return 'text-yellow-400';
        return 'text-green-400';
    };
    const formatUsage = (usage) => `${usage.toFixed(1)}%`;
    return (_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Cpu, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "CPU" }), _jsx("div", { className: `text-sm font-medium ${getUsageColor(performance.cpuUsage)}`, children: formatUsage(performance.cpuUsage) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(HardDrive, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Memory" }), _jsx("div", { className: `text-sm font-medium ${getUsageColor(performance.memoryUsage)}`, children: formatUsage(performance.memoryUsage) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Network, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Network" }), _jsx("div", { className: `text-sm font-medium ${getUsageColor(performance.networkActivity)}`, children: formatUsage(performance.networkActivity) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: "Response" }), _jsxs("div", { className: `text-sm font-medium ${getUsageColor(100 - performance.responsiveness)}`, children: [performance.responsiveness.toFixed(0), "ms"] })] })] })] }));
};
const CollaboratorsPanel = ({ collaborators, currentUserId, permissions, onInvite, onUpdateRole, onRemove }) => {
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('viewer');
    const [isInviting, setIsInviting] = useState(false);
    const handleInvite = useCallback(async () => {
        if (!inviteEmail.trim() || isInviting)
            return;
        setIsInviting(true);
        try {
            await onInvite?.(inviteEmail, inviteRole);
            setInviteEmail('');
            setShowInviteForm(false);
        }
        finally {
            setIsInviting(false);
        }
    }, [inviteEmail, inviteRole, onInvite, isInviting]);
    const formatLastActivity = (timestamp) => {
        if (!timestamp)
            return 'Never';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        if (diffMins < 1)
            return 'Just now';
        if (diffMins < 60)
            return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24)
            return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };
    const getRoleColor = (role) => {
        switch (role) {
            case 'owner': return 'text-purple-400';
            case 'editor': return 'text-blue-400';
            case 'viewer': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: ["Collaborators (", collaborators.length, ")"] }), permissions.canManageCollaborators && (_jsx(Button, { size: "sm", onClick: () => setShowInviteForm(true), className: "bg-[var(--hive-primary)] text-white", children: "Invite" }))] }), _jsx(AnimatePresence, { children: showInviteForm && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "email", placeholder: "Enter email address...", value: inviteEmail, onChange: (e) => setInviteEmail(e.target.value), className: "w-full p-2 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]" }), _jsxs("select", { value: inviteRole, onChange: (e) => setInviteRole(e.target.value), className: "w-full p-2 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-primary)]", children: [_jsx("option", { value: "viewer", children: "Viewer" }), _jsx("option", { value: "editor", children: "Editor" }), _jsx("option", { value: "owner", children: "Owner" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { size: "sm", onClick: handleInvite, disabled: !inviteEmail.trim() || isInviting, className: "bg-[var(--hive-primary)] text-white", children: isInviting ? 'Inviting...' : 'Invite' }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowInviteForm(false), children: "Cancel" })] })] }) })) }), _jsx("div", { className: "space-y-3", children: collaborators.map((collaborator) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Avatar, { src: collaborator.avatar, initials: collaborator.name.charAt(0), size: "sm" }), collaborator.isOnline && (_jsx("div", { className: "absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[var(--hive-background-secondary)] rounded-full" }))] }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium text-[var(--hive-text-primary)]", children: [collaborator.name, collaborator.id === currentUserId && ' (You)'] }), _jsxs("div", { className: "text-xs text-[var(--hive-text-muted)]", children: ["Last active: ", formatLastActivity(collaborator.lastActivity)] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { size: "sm", className: `${getRoleColor(collaborator.role)} capitalize`, children: collaborator.role }), permissions.canManageCollaborators && collaborator.id !== currentUserId && (_jsx("div", { className: "relative", children: _jsx(Button, { variant: "ghost", size: "xs", children: _jsx(MoreHorizontal, { className: "w-3 h-3" }) }) }))] })] }, collaborator.id))) })] }));
};
const LogsPanel = ({ logs, errors, permissions, onClearLogs, onExportLogs }) => {
    const [activeTab, setActiveTab] = useState('logs');
    const [logLevel, setLogLevel] = useState('all');
    const logsEndRef = useRef(null);
    useEffect(() => {
        if (activeTab === 'logs') {
            logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs, activeTab]);
    const filteredLogs = useMemo(() => {
        if (logLevel === 'all')
            return logs;
        return logs.filter(log => log.level === logLevel);
    }, [logs, logLevel]);
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString();
    };
    const getLevelIcon = (level) => {
        switch (level) {
            case 'debug': return _jsx(Bug, { className: "w-3 h-3 text-gray-400" });
            case 'info': return _jsx(CheckCircle, { className: "w-3 h-3 text-blue-400" });
            case 'warn': return _jsx(AlertTriangle, { className: "w-3 h-3 text-yellow-400" });
            case 'error': return _jsx(AlertTriangle, { className: "w-3 h-3 text-red-400" });
            default: return _jsx(Clock, { className: "w-3 h-3 text-gray-400" });
        }
    };
    const getLevelColor = (level) => {
        switch (level) {
            case 'debug': return 'text-gray-400';
            case 'info': return 'text-blue-400';
            case 'warn': return 'text-yellow-400';
            case 'error': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getErrorSeverityColor = (severity) => {
        switch (severity) {
            case 'low': return 'text-blue-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-orange-400';
            case 'critical': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    if (!permissions.canViewLogs) {
        return (_jsxs("div", { className: "text-center py-8", children: [_jsx(EyeOff, { className: "w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "You don't have permission to view logs" })] }));
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1", children: [_jsxs("button", { onClick: () => setActiveTab('logs'), className: `px-3 py-1 text-sm rounded transition-colors ${activeTab === 'logs'
                                            ? 'bg-[var(--hive-primary)] text-white'
                                            : 'text-[var(--hive-text-muted)]'}`, children: ["Logs (", logs.length, ")"] }), _jsxs("button", { onClick: () => setActiveTab('errors'), className: `px-3 py-1 text-sm rounded transition-colors ${activeTab === 'errors'
                                            ? 'bg-[var(--hive-primary)] text-white'
                                            : 'text-[var(--hive-text-muted)]'}`, children: ["Errors (", errors.length, ")"] })] }), activeTab === 'logs' && (_jsxs("select", { value: logLevel, onChange: (e) => setLogLevel(e.target.value), className: "px-2 py-1 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "all", children: "All Levels" }), _jsx("option", { value: "debug", children: "Debug" }), _jsx("option", { value: "info", children: "Info" }), _jsx("option", { value: "warn", children: "Warning" }), _jsx("option", { value: "error", children: "Error" })] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => onExportLogs?.('json'), children: "Export" }), _jsx(Button, { size: "sm", variant: "outline", onClick: onClearLogs, children: "Clear" })] })] }), _jsx("div", { className: "h-64 overflow-y-auto bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]", children: activeTab === 'logs' ? (_jsxs("div", { className: "p-3 space-y-2", children: [filteredLogs.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Terminal, { className: "w-8 h-8 text-[var(--hive-text-muted)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--hive-text-muted)] text-sm", children: "No logs to display" })] })) : (filteredLogs.map((log) => (_jsxs("div", { className: "flex items-start space-x-2 text-sm font-mono", children: [_jsx("span", { className: "text-[var(--hive-text-muted)] text-xs", children: formatTimestamp(log.timestamp) }), _jsxs("div", { className: "flex items-center space-x-1", children: [getLevelIcon(log.level), _jsx("span", { className: `uppercase text-xs ${getLevelColor(log.level)}`, children: log.level })] }), _jsxs("span", { className: "text-[var(--hive-text-secondary)] flex-1", children: ["[", log.source, "] ", log.message] })] }, log.id)))), _jsx("div", { ref: logsEndRef })] })) : (_jsx("div", { className: "p-3 space-y-3", children: errors.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("p", { className: "text-[var(--hive-text-muted)] text-sm", children: "No errors detected" })] })) : (errors.map((error) => (_jsxs("div", { className: "p-3 bg-[var(--hive-background-elevated)] rounded border border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: `w-4 h-4 ${getErrorSeverityColor(error.severity)}` }), _jsxs("span", { className: `text-sm font-medium ${getErrorSeverityColor(error.severity)} capitalize`, children: [error.severity, " ", error.type, " Error"] })] }), _jsx("span", { className: "text-xs text-[var(--hive-text-muted)]", children: formatTimestamp(error.timestamp) })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-2", children: error.message }), error.line && (_jsxs("p", { className: "text-xs text-[var(--hive-text-muted)]", children: ["Line ", error.line, error.column ? `, Column ${error.column}` : ''] })), error.suggestions && error.suggestions.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-xs text-[var(--hive-text-muted)] mb-1", children: "Suggestions:" }), _jsx("ul", { className: "text-xs text-[var(--hive-text-secondary)] space-y-1", children: error.suggestions.map((suggestion, index) => (_jsxs("li", { children: ["\u2022 ", suggestion] }, index))) })] }))] }, error.id)))) })) })] }));
};
export const LiveToolExecutor = ({ toolConfig, initialState, currentUserId, onStateChange, onExecute, onPause, onStop, onReset, onSave, onShare, onInviteCollaborator, onUpdatePermissions, onExportLogs, enableFeatureFlag = true }) => {
    const [executionState, setExecutionState] = useState({
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
            canDebug: true
        },
        ...initialState
    });
    const [activePanel, setActivePanel] = useState('performance');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [autoSave, setAutoSave] = useState(toolConfig.autoSave);
    // Feature flag check
    if (!enableFeatureFlag)
        return null;
    useEffect(() => {
        onStateChange?.(executionState);
    }, [executionState, onStateChange]);
    // Auto-save functionality
    useEffect(() => {
        if (autoSave && executionState.status === 'completed') {
            onSave?.(executionState);
        }
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
            duration: undefined
        }));
        await onReset?.();
    }, [onReset]);
    const handleSave = useCallback(async () => {
        await onSave?.(executionState);
    }, [onSave, executionState]);
    const formatDuration = (duration) => {
        if (!duration)
            return '0s';
        const seconds = Math.floor(duration / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        }
        return `${seconds}s`;
    };
    return (_jsxs("div", { className: `bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`, children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-subtle)] flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Box, { className: "w-5 h-5 text-[var(--hive-primary)]" }), _jsx("h2", { className: "font-semibold text-[var(--hive-text-primary)]", children: toolConfig.name }), _jsxs(Badge, { size: "sm", variant: "secondary", children: ["v", toolConfig.version] })] }), executionState.duration && (_jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: ["Duration: ", formatDuration(executionState.duration)] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [executionState.permissions.canSave && (_jsxs(Button, { variant: "outline", size: "sm", onClick: handleSave, className: "flex items-center space-x-1", children: [_jsx(Save, { className: "w-4 h-4" }), _jsx("span", { children: "Save" })] })), executionState.permissions.canShare && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onShare?.({ public: false, allowEdit: false, allowExecute: false }), className: "flex items-center space-x-1", children: [_jsx(Share, { className: "w-4 h-4" }), _jsx("span", { children: "Share" })] })), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsFullscreen(!isFullscreen), children: isFullscreen ? _jsx(Minimize2, { className: "w-4 h-4" }) : _jsx(Maximize2, { className: "w-4 h-4" }) })] })] }), _jsx("div", { className: "p-4 border-b border-[var(--hive-border-subtle)]", children: _jsx(ExecutionControls, { status: executionState.status, onExecute: handleExecute, onPause: handlePause, onStop: handleStop, onReset: handleReset, permissions: executionState.permissions }) }), _jsxs("div", { className: "flex-1 flex", children: [_jsx("div", { className: "flex-1 p-4", children: _jsx("div", { className: "h-64 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Box, { className: "w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Tool interface will render here" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: ["Framework: ", toolConfig.framework || toolConfig.runtime] })] }) }) }), _jsxs("div", { className: "w-80 border-l border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex border-b border-[var(--hive-border-subtle)]", children: [[
                                        { key: 'performance', label: 'Performance', icon: Activity },
                                        { key: 'collaborators', label: 'Team', icon: Users },
                                        { key: 'logs', label: 'Logs', icon: Terminal },
                                        { key: 'settings', label: 'Settings', icon: Settings }
                                    ].map(({ key, label, icon: Icon })), " => (", _jsx("button", { onClick: () => setActivePanel(key), className: `flex-1 p-3 text-sm font-medium border-b-2 transition-colors ${activePanel === key
                                            ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                                            : 'border-transparent text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'}`, children: _jsx(Icon, { className: "w-4 h-4 mx-auto" }) }, key), "))}"] }), _jsxs("div", { className: "p-4 h-80 overflow-y-auto", children: [activePanel === 'performance' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: "Performance Monitor" }), _jsx(PerformanceMonitor, { performance: executionState.performance, status: executionState.status })] })), activePanel === 'collaborators' && (_jsx(CollaboratorsPanel, { collaborators: executionState.collaborators, currentUserId: currentUserId, permissions: executionState.permissions, onInvite: onInviteCollaborator })), activePanel === 'logs' && (_jsx(LogsPanel, { logs: executionState.logs, errors: executionState.errors, permissions: executionState.permissions, onExportLogs: onExportLogs })), activePanel === 'settings' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: "Tool Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: autoSave, onChange: (e) => setAutoSave(e.target.checked), className: "text-[var(--hive-primary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Auto-save on completion" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Runtime" }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: toolConfig.runtime })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-1", children: "Permissions" }), _jsx("div", { className: "space-y-1", children: toolConfig.permissions.map((permission) => (_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)]", children: ["\u2022 ", permission] }, permission))) })] })] })] }))] })] })] })] }));
};
//# sourceMappingURL=live-tool-executor.js.map