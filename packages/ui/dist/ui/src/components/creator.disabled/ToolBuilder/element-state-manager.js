"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
const StateManagerContext = createContext(null);
// State reducer
function stateReducer(state, action) {
    switch (action.type) {
        case 'INITIALIZE_STATE':
            return action.payload;
        case 'UPDATE_ELEMENT':
            if (!state)
                return null;
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.payload.instanceId]: {
                        ...state.elements[action.payload.instanceId],
                        ...action.payload.state,
                        lastUpdated: new Date().toISOString(),
                    },
                },
                metadata: {
                    ...state.metadata,
                    updatedAt: new Date().toISOString(),
                },
            };
        case 'BULK_UPDATE':
            if (!state)
                return null;
            const updatedElements = { ...state.elements };
            Object.entries(action.payload.updates).forEach(([instanceId, elementState]) => {
                updatedElements[instanceId] = {
                    ...updatedElements[instanceId],
                    ...elementState,
                    lastUpdated: new Date().toISOString(),
                };
            });
            return {
                ...state,
                elements: updatedElements,
                metadata: {
                    ...state.metadata,
                    updatedAt: new Date().toISOString(),
                },
            };
        case 'RESET_ELEMENT':
            if (!state)
                return null;
            const { [action.payload.instanceId]: _, ...remainingElements } = state.elements;
            return {
                ...state,
                elements: remainingElements,
                metadata: {
                    ...state.metadata,
                    updatedAt: new Date().toISOString(),
                },
            };
        case 'TOGGLE_VISIBILITY':
            if (!state)
                return null;
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.payload.instanceId]: {
                        ...state.elements[action.payload.instanceId],
                        visible: action.payload.visible,
                        lastUpdated: new Date().toISOString(),
                    },
                },
                metadata: {
                    ...state.metadata,
                    updatedAt: new Date().toISOString(),
                },
            };
        default:
            return state;
    }
}
export const ElementStateManager = ({ toolId, spaceId, userId, instances, children, enablePersistence = true, autoSaveInterval = 5000, // Auto-save every 5 seconds
 }) => {
    const [state, dispatch] = useReducer(stateReducer, null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [lastSynced, setLastSynced] = React.useState(null);
    // Initialize state for all element instances
    const initializeState = useCallback(() => {
        const initialState = {
            toolId,
            spaceId,
            userId,
            elements: {},
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                version: "1.0.0",
                sessionId: crypto.randomUUID(),
            },
        };
        // Initialize element states
        instances.forEach(instance => {
            initialState.elements[instance.id] = {
                value: null,
                visible: instance.isVisible,
                disabled: false,
                data: {},
                lastUpdated: new Date().toISOString(),
            };
        });
        dispatch({ type: 'INITIALIZE_STATE', payload: initialState });
    }, [toolId, spaceId, userId, instances]);
    // Load state from persistence layer
    const loadState = useCallback(async () => {
        if (!enablePersistence)
            return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/tools/${toolId}/state?spaceId=${spaceId}&userId=${userId}`);
            if (response.ok) {
                const persistedState = await response.json();
                dispatch({ type: 'INITIALIZE_STATE', payload: persistedState });
                setLastSynced(new Date().toISOString());
            }
            else if (response.status === 404) {
                // No saved state exists, initialize fresh
                initializeState();
            }
            else {
                throw new Error(`Failed to load state: ${response.statusText}`);
            }
        }
        catch (err) {
            console.error('Failed to load tool state:', err);
            setError(err instanceof Error ? err.message : 'Failed to load state');
            // Initialize fresh state as fallback
            initializeState();
        }
        finally {
            setLoading(false);
        }
    }, [toolId, spaceId, userId, enablePersistence, initializeState]);
    // Save state to persistence layer
    const saveState = useCallback(async () => {
        if (!enablePersistence || !state)
            return;
        try {
            const response = await fetch(`/api/tools/${toolId}/state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spaceId,
                    userId,
                    state,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to save state: ${response.statusText}`);
            }
            setLastSynced(new Date().toISOString());
            dispatch({ type: 'SYNC_COMPLETE', payload: { timestamp: new Date().toISOString() } });
        }
        catch (err) {
            console.error('Failed to save tool state:', err);
            setError(err instanceof Error ? err.message : 'Failed to save state');
        }
    }, [toolId, spaceId, userId, state, enablePersistence]);
    // Reset state to initial values
    const resetState = useCallback(async () => {
        initializeState();
        if (enablePersistence) {
            await saveState();
        }
    }, [initializeState, saveState, enablePersistence]);
    // Action handlers
    const updateElement = useCallback((instanceId, newState) => {
        dispatch({ type: 'UPDATE_ELEMENT', payload: { instanceId, state: newState } });
    }, []);
    const bulkUpdate = useCallback((updates) => {
        dispatch({ type: 'BULK_UPDATE', payload: { updates } });
    }, []);
    const resetElement = useCallback((instanceId) => {
        dispatch({ type: 'RESET_ELEMENT', payload: { instanceId } });
    }, []);
    const toggleVisibility = useCallback((instanceId, visible) => {
        dispatch({ type: 'TOGGLE_VISIBILITY', payload: { instanceId, visible } });
    }, []);
    // Initialize state on mount
    useEffect(() => {
        loadState();
    }, [loadState]);
    // Auto-save functionality
    useEffect(() => {
        if (!enablePersistence || !state)
            return;
        const autoSaveTimer = setInterval(() => {
            saveState();
        }, autoSaveInterval);
        return () => clearInterval(autoSaveTimer);
    }, [state, saveState, enablePersistence, autoSaveInterval]);
    // Save on page unload
    useEffect(() => {
        if (!enablePersistence)
            return;
        const handleBeforeUnload = () => {
            if (state) {
                // Use sendBeacon for reliable save on page unload
                navigator.sendBeacon(`/api/tools/${toolId}/state`, JSON.stringify({
                    spaceId,
                    userId,
                    state,
                }));
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [toolId, spaceId, userId, state, enablePersistence]);
    const contextValue = {
        state,
        loading,
        error,
        lastSynced,
        updateElement,
        bulkUpdate,
        resetElement,
        toggleVisibility,
        saveState,
        loadState,
        resetState,
    };
    return (_jsx(StateManagerContext.Provider, { value: contextValue, children: children }));
};
// Hook to use the state manager
export const useElementState = () => {
    const context = useContext(StateManagerContext);
    if (!context) {
        throw new Error('useElementState must be used within ElementStateManager');
    }
    return context;
};
// Hook to get state for a specific element
export const useElementInstanceState = (instanceId) => {
    const { state, updateElement } = useElementState();
    const elementState = state?.elements[instanceId] || {
        value: null,
        visible: true,
        disabled: false,
        data: {},
        lastUpdated: new Date().toISOString(),
    };
    const updateThisElement = useCallback((newState) => {
        updateElement(instanceId, newState);
    }, [instanceId, updateElement]);
    return {
        ...elementState,
        updateState: updateThisElement,
    };
};
// Utility hook for conditional logic
export const useConditionalLogic = (instances) => {
    const { state, bulkUpdate } = useElementState();
    const evaluateConditions = useCallback(() => {
        if (!state)
            return;
        const updates = {};
        instances.forEach(instance => {
            const config = instance.config;
            const conditionalRules = config?.conditionalRules || [];
            conditionalRules.forEach((rule) => {
                const sourceState = state.elements[rule.condition.sourceElementId];
                if (!sourceState)
                    return;
                const sourceValue = sourceState.value;
                let conditionMet = false;
                // Evaluate condition
                switch (rule.condition.type) {
                    case 'equals':
                        conditionMet = sourceValue === rule.condition.value;
                        break;
                    case 'notEquals':
                        conditionMet = sourceValue !== rule.condition.value;
                        break;
                    case 'contains':
                        conditionMet = String(sourceValue).includes(String(rule.condition.value));
                        break;
                    case 'greaterThan':
                        conditionMet = Number(sourceValue) > Number(rule.condition.value);
                        break;
                    case 'lessThan':
                        conditionMet = Number(sourceValue) < Number(rule.condition.value);
                        break;
                    case 'isEmpty':
                        conditionMet = !sourceValue || sourceValue === '';
                        break;
                    case 'isNotEmpty':
                        conditionMet = !!sourceValue && sourceValue !== '';
                        break;
                }
                // Apply actions if condition is met
                if (conditionMet) {
                    rule.actions.forEach((action) => {
                        if (!updates[action.targetElementId]) {
                            updates[action.targetElementId] = {};
                        }
                        switch (action.type) {
                            case 'show':
                                updates[action.targetElementId].visible = true;
                                break;
                            case 'hide':
                                updates[action.targetElementId].visible = false;
                                break;
                            case 'setValue':
                                updates[action.targetElementId].value = action.value;
                                break;
                            case 'setStyle':
                                updates[action.targetElementId].style = {
                                    ...updates[action.targetElementId].style,
                                    [action.targetProperty]: action.value,
                                };
                                break;
                        }
                    });
                }
            });
        });
        // Apply bulk updates if any conditions were met
        if (Object.keys(updates).length > 0) {
            bulkUpdate(updates);
        }
    }, [state, instances, bulkUpdate]);
    // Re-evaluate conditions when state changes
    useEffect(() => {
        evaluateConditions();
    }, [evaluateConditions]);
    return { evaluateConditions };
};
export default ElementStateManager;
//# sourceMappingURL=element-state-manager.js.map