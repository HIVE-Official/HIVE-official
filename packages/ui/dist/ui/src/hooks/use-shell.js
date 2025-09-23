"use client";
import { useState, createContext, useContext, useCallback } from "react";
// Create shell context
const ShellContext = createContext(null);
// useShell hook
export function useShell() {
    const context = useContext(ShellContext);
    if (!context) {
        // During SSR or when context is not available, provide a safe fallback
        if (typeof window === 'undefined') {
            // SSR fallback - provide minimal shell state without hooks
            return {
                isLoading: false,
                error: null,
                sidebarOpen: false,
                commandPaletteOpen: false,
                notifications: [],
                theme: 'system',
                user: null,
                setLoading: () => { },
                setError: () => { },
                setSidebarOpen: () => { },
                setCommandPaletteOpen: () => { },
                addNotification: () => { },
                removeNotification: () => { },
                markNotificationRead: () => { },
                clearNotifications: () => { },
                setTheme: () => { },
                setUser: () => { },
            };
        }
        // Return a default implementation if no provider
        return createDefaultShellContext();
    }
    return context;
}
// Create default shell context for when no provider exists
function createDefaultShellContext() {
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        sidebarOpen: false,
        commandPaletteOpen: false,
        notifications: [],
        theme: 'system',
        user: null,
    });
    const setLoading = useCallback((loading) => {
        setState(prev => ({ ...prev, isLoading: loading }));
    }, []);
    const setError = useCallback((error) => {
        setState(prev => ({ ...prev, error }));
    }, []);
    const setSidebarOpen = useCallback((open) => {
        setState(prev => ({ ...prev, sidebarOpen: open }));
    }, []);
    const setCommandPaletteOpen = useCallback((open) => {
        setState(prev => ({ ...prev, commandPaletteOpen: open }));
    }, []);
    const addNotification = useCallback((notification) => {
        const newNotification = {
            ...notification,
            id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            read: false,
        };
        setState(prev => ({
            ...prev,
            notifications: [newNotification, ...prev.notifications]
        }));
    }, []);
    const removeNotification = useCallback((id) => {
        setState(prev => ({
            ...prev,
            notifications: prev.notifications.filter(n => n.id !== id)
        }));
    }, []);
    const markNotificationRead = useCallback((id) => {
        setState(prev => ({
            ...prev,
            notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        }));
    }, []);
    const clearNotifications = useCallback(() => {
        setState(prev => ({ ...prev, notifications: [] }));
    }, []);
    const setTheme = useCallback((theme) => {
        setState(prev => ({ ...prev, theme }));
    }, []);
    const setUser = useCallback((user) => {
        setState(prev => ({ ...prev, user }));
    }, []);
    return {
        ...state,
        setLoading,
        setError,
        setSidebarOpen,
        setCommandPaletteOpen,
        addNotification,
        removeNotification,
        markNotificationRead,
        clearNotifications,
        setTheme,
        setUser,
    };
}
// Provider component
export const ShellProvider = ShellContext.Provider;
// Create shell value for provider
export function createShellValue() {
    return createDefaultShellContext();
}
//# sourceMappingURL=use-shell.js.map