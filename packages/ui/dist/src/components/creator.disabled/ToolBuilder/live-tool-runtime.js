"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../../lib/utils.js";
import { ElementRuntimeRenderer } from "./element-runtime-renderer.js";
import { ElementStateManager, useElementState, useConditionalLogic } from "./element-state-manager.js";
import { Badge } from "../../ui/badge.js";
import { Button } from "../../../index.js";
import { RefreshCw, Save, AlertCircle, CheckCircle, Wifi, WifiOff } from "lucide-react";
// Internal component that uses the state manager context
const LiveToolRuntimeInternal = ({ instances, toolName, className, enableRealTime = true, onAction, }) => {
    const { state, loading, error, lastSynced, updateElement, saveState, loadState, resetState } = useElementState();
    const { evaluateConditions } = useConditionalLogic(instances);
    const [isOnline, setIsOnline] = useState(true);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // Monitor online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    // Track unsaved changes
    useEffect(() => {
        if (state && lastSynced) {
            const hasChanges = new Date(state.metadata.updatedAt) > new Date(lastSynced);
            setHasUnsavedChanges(hasChanges);
        }
    }, [state, lastSynced]);
    // Handle element state changes
    const handleStateChange = useCallback((instanceId, newState) => {
        updateElement(instanceId, newState);
        // Re-evaluate conditional logic after state change
        setTimeout(() => {
            evaluateConditions();
        }, 0);
    }, [updateElement, evaluateConditions]);
    // Handle element actions (button clicks, timer completions, etc.)
    const handleAction = useCallback(async (instanceId, action, data) => {
        console.log('Tool action:', { instanceId, action, data });
        // Handle built-in actions
        switch (action) {
            case 'click':
                if (data?.type === 'navigate' && data.target) {
                    window.location.href = data.target;
                }
                else if (data?.type === 'submit') {
                    // Handle form submission
                    const formData = getFormData();
                    console.log('Form submission:', formData);
                }
                break;
            case 'timer_complete':
                if (data?.type === 'message') {
                    alert(data.value);
                }
                else if (data?.type === 'redirect') {
                    window.location.href = data.value;
                }
                break;
        }
        // Call external action handler
        onAction?.(instanceId, action, data);
    }, [onAction]);
    // Get current form data from all input elements
    const getFormData = useCallback(() => {
        if (!state)
            return {};
        const formData = {};
        instances.forEach(instance => {
            const elementState = state.elements[instance.id];
            if (elementState?.value !== null && elementState?.value !== undefined) {
                formData[instance.id] = elementState.value;
            }
        });
        return formData;
    }, [state, instances]);
    // Manual save handler
    const handleManualSave = useCallback(async () => {
        await saveState();
    }, [saveState]);
    // Reset tool handler
    const handleReset = useCallback(async () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            await resetState();
        }
    }, [resetState]);
    if (loading) {
        return (_jsx("div", { className: cn("flex items-center justify-center p-8", className), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }), _jsx("span", { children: "Loading tool..." })] }) }));
    }
    if (error) {
        return (_jsxs("div", { className: cn("p-4 border border-red-200 rounded-lg bg-red-50", className), children: [_jsxs("div", { className: "flex items-center gap-2 text-red-700 mb-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx("span", { className: "font-medium", children: "Tool Error" })] }), _jsx("p", { className: "text-sm text-red-600 mb-3", children: error }), _jsxs(Button, { variant: "outline", size: "sm", onClick: loadState, children: [_jsx(RefreshCw, { className: "h-3 w-3 mr-1" }), "Retry"] })] }));
    }
    if (!state) {
        return (_jsx("div", { className: cn("flex items-center justify-center p-8", className), children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Tool not initialized" })] }) }));
    }
    return (_jsxs("div", { className: cn("live-tool-runtime", className), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b bg-muted/50", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "font-semibold", children: toolName }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: isOnline ? "default" : "destructive", className: "text-xs", children: isOnline ? (_jsxs(_Fragment, { children: [_jsx(Wifi, { className: "h-3 w-3 mr-1" }), "Online"] })) : (_jsxs(_Fragment, { children: [_jsx(WifiOff, { className: "h-3 w-3 mr-1" }), "Offline"] })) }), hasUnsavedChanges ? (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), "Unsaved changes"] })) : lastSynced ? (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Saved"] })) : null] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleManualSave, disabled: !hasUnsavedChanges || !isOnline, children: [_jsx(Save, { className: "h-3 w-3 mr-1" }), "Save"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleReset, children: "Reset" })] })] }), _jsx("div", { className: "p-4", children: _jsx(ElementRuntimeRenderer, { instances: instances, onStateChange: handleStateChange, onAction: handleAction, initialState: state.elements }) }), lastSynced && (_jsxs("div", { className: "p-2 text-xs text-muted-foreground text-center border-t bg-muted/20", children: ["Last saved: ", new Date(lastSynced).toLocaleString()] }))] }));
};
// Main component with state management provider
export const LiveToolRuntime = ({ toolId, spaceId, userId, instances, enablePersistence = true, ...props }) => {
    return (_jsx(ElementStateManager, { toolId: toolId, spaceId: spaceId, userId: userId, instances: instances, enablePersistence: enablePersistence, children: _jsx(LiveToolRuntimeInternal, { instances: instances, ...props }) }));
};
export default LiveToolRuntime;
//# sourceMappingURL=live-tool-runtime.js.map