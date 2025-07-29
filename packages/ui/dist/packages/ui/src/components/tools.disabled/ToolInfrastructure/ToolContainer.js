"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BarChart3, Maximize2, Minimize2, RotateCcw, AlertTriangle, Wifi, WifiOff, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../hive-button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { cn } from '../../../lib/utils';
// Default tool state
const createDefaultToolState = (toolId) => ({
    id: toolId,
    name: toolId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: '🔧',
    status: 'loading',
    version: '1.0.0',
    lastSync: new Date(),
    dataSize: 0,
    isConnected: true,
    analytics: {
        sessions: 0,
        totalTime: 0,
        lastUsed: new Date(),
        errorCount: 0
    }
});
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};
const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1
        }
    }
};
const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2
        }
    }
};
export const ToolContainer = ({ toolId, installationId, configuration, systemContext, children, onStateChange, onConfigChange, onAction, className }) => {
    // State management
    const [toolState, setToolState] = useState(() => createDefaultToolState(toolId));
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [sessionStartTime] = useState(new Date());
    // Initialize tool
    useEffect(() => {
        const initializeTool = async () => {
            try {
                setToolState(prev => ({ ...prev, status: 'loading' }));
                // Simulate initialization
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Load tool data if available
                try {
                    const savedState = localStorage.getItem(`tool_${installationId}_state`);
                    if (savedState) {
                        const parsed = JSON.parse(savedState);
                        setToolState(prev => ({ ...prev, ...parsed, status: 'ready' }));
                    }
                    else {
                        setToolState(prev => ({ ...prev, status: 'ready' }));
                    }
                }
                catch (error) {
                    console.warn('Failed to load saved tool state:', error);
                    setToolState(prev => ({ ...prev, status: 'ready' }));
                }
                // Register with system context if available
                if (systemContext) {
                    systemContext.registerComponent(toolId, toolState);
                }
            }
            catch (error) {
                console.error(`Failed to initialize tool ${toolId}:`, error);
                setToolState(prev => ({
                    ...prev,
                    status: 'error',
                    analytics: {
                        ...prev.analytics,
                        errorCount: prev.analytics.errorCount + 1
                    }
                }));
            }
        };
        initializeTool();
    }, [toolId, installationId, systemContext]);
    // Auto-save state
    useEffect(() => {
        if (configuration.autoSave && toolState.status === 'ready') {
            const saveState = () => {
                try {
                    localStorage.setItem(`tool_${installationId}_state`, JSON.stringify(toolState));
                }
                catch (error) {
                    console.warn('Failed to save tool state:', error);
                }
            };
            const saveTimer = setTimeout(saveState, 2000);
            return () => clearTimeout(saveTimer);
        }
    }, [toolState, installationId, configuration.autoSave]);
    // Track analytics
    useEffect(() => {
        if (configuration.trackingEnabled && toolState.status === 'ready') {
            const updateAnalytics = () => {
                const now = new Date();
                const sessionTime = now.getTime() - sessionStartTime.getTime();
                setToolState(prev => ({
                    ...prev,
                    analytics: {
                        ...prev.analytics,
                        sessions: prev.analytics.sessions + 1,
                        totalTime: prev.analytics.totalTime + sessionTime,
                        lastUsed: now
                    }
                }));
            };
            const analyticsTimer = setInterval(updateAnalytics, 60000); // Update every minute
            return () => clearInterval(analyticsTimer);
        }
    }, [toolState.status, configuration.trackingEnabled, sessionStartTime]);
    // System integration effects
    useEffect(() => {
        if (systemContext && toolState.status === 'ready') {
            systemContext.updateComponent(toolId, toolState);
        }
    }, [toolState, systemContext, toolId]);
    // Notify parent of state changes
    useEffect(() => {
        onStateChange?.(toolState);
    }, [toolState, onStateChange]);
    // Connection monitoring
    useEffect(() => {
        const checkConnection = () => {
            const isOnline = navigator.onLine;
            setToolState(prev => ({ ...prev, isConnected: isOnline }));
        };
        window.addEventListener('online', checkConnection);
        window.addEventListener('offline', checkConnection);
        return () => {
            window.removeEventListener('online', checkConnection);
            window.removeEventListener('offline', checkConnection);
        };
    }, []);
    // Tool actions
    const handleRestart = useCallback(() => {
        setToolState(prev => ({ ...prev, status: 'loading' }));
        onAction?.('restart');
        setTimeout(() => {
            setToolState(prev => ({ ...prev, status: 'ready', lastSync: new Date() }));
        }, 1500);
    }, [onAction]);
    const handleReset = useCallback(() => {
        try {
            localStorage.removeItem(`tool_${installationId}_state`);
        }
        catch (error) {
            console.warn('Failed to clear tool state:', error);
        }
        setToolState(createDefaultToolState(toolId));
        onAction?.('reset');
    }, [installationId, toolId, onAction]);
    const handleConfigUpdate = useCallback((updates) => {
        const newConfig = { ...configuration, ...updates };
        onConfigChange?.(newConfig);
    }, [configuration, onConfigChange]);
    // Status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'loading':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'ready':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'error':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'updating':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        }
        return `${minutes}m`;
    };
    if (isMinimized) {
        return (_jsx(motion.div, { className: "fixed bottom-4 right-4 z-50", initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", stiffness: 200, damping: 20 }, children: _jsx(Card, { className: "bg-[var(--hive-text-primary)] shadow-lg border-2", children: _jsx(CardContent, { className: "p-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "text-sm font-medium", children: toolState.name }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setIsMinimized(false), className: "h-6 w-6 p-0", children: _jsx(Maximize2, { className: "h-3 w-3" }) })] }) }) }) }));
    }
    return (_jsx(motion.div, { className: cn("tool-container", className), variants: containerVariants, initial: "hidden", animate: "visible", exit: "exit", children: _jsxs(Card, { className: cn("h-full flex flex-col", isExpanded && "fixed inset-4 z-50 shadow-2xl"), children: [_jsx(motion.div, { variants: headerVariants, children: _jsxs(CardHeader, { className: "flex-shrink-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-2xl", children: toolState.icon }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: toolState.name }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [_jsxs("span", { children: ["v", toolState.version] }), _jsx("div", { className: "w-1 h-1 bg-gray-400 rounded-full" }), _jsxs("span", { children: ["ID: ", installationId.slice(0, 8)] })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [toolState.isConnected ? (_jsx(Wifi, { className: "h-4 w-4 text-green-500" })) : (_jsx(WifiOff, { className: "h-4 w-4 text-red-500" })), _jsx(Badge, { variant: "outline", className: cn("text-xs", getStatusStyle(toolState.status)), children: toolState.status })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowAnalytics(!showAnalytics), className: "h-8 w-8 p-0", children: _jsx(BarChart3, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowSettings(!showSettings), className: "h-8 w-8 p-0", children: _jsx(Settings, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleRestart, disabled: toolState.status === 'loading', className: "h-8 w-8 p-0", children: _jsx(RotateCcw, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsExpanded(!isExpanded), className: "h-8 w-8 p-0", children: isExpanded ? _jsx(Minimize2, { className: "h-4 w-4" }) : _jsx(Maximize2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsMinimized(true), className: "h-8 w-8 p-0", children: _jsx(X, { className: "h-4 w-4" }) })] })] }), toolState.status === 'error' && (_jsx("div", { className: "mt-2 p-2 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2 text-red-700", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Tool encountered an error" }), _jsx(Button, { size: "sm", variant: "outline", onClick: handleRestart, children: "Retry" })] }) })), systemContext && (_jsx("div", { className: "mt-2 p-2 bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20 rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2 text-[var(--hive-brand-secondary)]", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full animate-pulse" }), _jsx("span", { className: "text-sm", children: "Connected to Event System" })] }) }))] }) }), _jsx(motion.div, { className: "flex-1 flex flex-col overflow-hidden", variants: contentVariants, children: _jsxs(CardContent, { className: "flex-1 flex flex-col p-6", children: [toolState.status === 'loading' && (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-8 h-8 border-2 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin mx-auto" }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Initializing ", toolState.name, "..."] })] }) })), toolState.status === 'ready' && (_jsx("div", { className: "flex-1 flex flex-col", children: children }))] }) }), _jsx(AnimatePresence, { children: showSettings && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "border-t", children: _jsx(CardContent, { className: "p-4", children: _jsxs(Tabs, { defaultValue: "general", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "general", children: "General" }), _jsx(TabsTrigger, { value: "privacy", children: "Privacy" }), _jsx(TabsTrigger, { value: "advanced", children: "Advanced" })] }), _jsxs(TabsContent, { value: "general", className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Theme" }), _jsxs("select", { value: configuration.theme, onChange: (e) => handleConfigUpdate({ theme: e.target.value }), className: "w-full mt-1 p-2 border rounded-md", children: [_jsx("option", { value: "light", children: "Light" }), _jsx("option", { value: "dark", children: "Dark" }), _jsx("option", { value: "auto", children: "Auto" })] })] }), _jsx("div", { children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: configuration.autoSave, onChange: (e) => handleConfigUpdate({ autoSave: e.target.checked }) }), _jsx("span", { className: "text-sm", children: "Auto-save" })] }) })] }), _jsx(TabsContent, { value: "privacy", className: "space-y-4", children: _jsx("div", { children: _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", checked: configuration.trackingEnabled, onChange: (e) => handleConfigUpdate({ trackingEnabled: e.target.checked }) }), _jsx("span", { className: "text-sm", children: "Enable analytics" })] }) }) }), _jsx(TabsContent, { value: "advanced", className: "space-y-4", children: _jsx(Button, { variant: "outline", onClick: handleReset, className: "w-full", children: "Reset Tool Data" }) })] }) }) })) }), _jsx(AnimatePresence, { children: showAnalytics && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "border-t", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold", children: toolState.analytics.sessions }), _jsx("div", { className: "text-xs text-gray-600", children: "Sessions" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold", children: formatTime(toolState.analytics.totalTime) }), _jsx("div", { className: "text-xs text-gray-600", children: "Total Time" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold", children: toolState.analytics.errorCount }), _jsx("div", { className: "text-xs text-gray-600", children: "Errors" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold", children: [Math.round(toolState.dataSize / 1024), "KB"] }), _jsx("div", { className: "text-xs text-gray-600", children: "Data Size" })] })] }), _jsxs("div", { className: "mt-4 text-xs text-gray-500 text-center", children: ["Last used: ", toolState.analytics.lastUsed.toLocaleString()] })] }) })) })] }) }));
};
export default ToolContainer;
//# sourceMappingURL=ToolContainer.js.map