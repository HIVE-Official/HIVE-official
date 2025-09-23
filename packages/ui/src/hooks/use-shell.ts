"use client"

import { useState, useEffect, createContext, useContext, useCallback } from "react"

// Shell state interface for managing global app state
export interface ShellState {
  isLoading: boolean
  error: string | null
  sidebarOpen: boolean
  commandPaletteOpen: boolean
  notifications: ShellNotification[]
  theme: 'light' | 'dark' | 'system'
  user: any | null
}

export interface ShellNotification {
  id: string
  title: string
  message?: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
  actions?: Array<{
    label: string
    action: () => void
    variant?: 'default' | 'destructive'
  }>
}

export interface ShellActions {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSidebarOpen: (open: boolean) => void
  setCommandPaletteOpen: (open: boolean) => void
  addNotification: (notification: Omit<ShellNotification, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setUser: (user: any | null) => void
}

export interface ShellContextType extends ShellState, ShellActions {}

// Create shell context
const ShellContext = createContext<ShellContextType | null>(null)

// useShell hook
export function useShell(): ShellContextType {
  const context = useContext(ShellContext)
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
        setLoading: () => {},
        setError: () => {},
        setSidebarOpen: () => {},
        setCommandPaletteOpen: () => {},
        addNotification: () => {},
        removeNotification: () => {},
        markNotificationRead: () => {},
        clearNotifications: () => {},
        setTheme: () => {},
        setUser: () => {},
      }
    }
    // Return a default implementation if no provider
    return createDefaultShellContext()
  }
  return context
}

// Create default shell context for when no provider exists
function createDefaultShellContext(): ShellContextType {
  const [state, setState] = useState<ShellState>({
    isLoading: false,
    error: null,
    sidebarOpen: false,
    commandPaletteOpen: false,
    notifications: [],
    theme: 'system',
    user: null,
  })

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }))
  }, [])

  const setCommandPaletteOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, commandPaletteOpen: open }))
  }, [])

  const addNotification = useCallback((notification: Omit<ShellNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: ShellNotification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    }

    setState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications]
    }))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }))
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    }))
  }, [])

  const clearNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notifications: [] }))
  }, [])

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    setState(prev => ({ ...prev, theme }))
  }, [])

  const setUser = useCallback((user: any | null) => {
    setState(prev => ({ ...prev, user }))
  }, [])

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
  }
}

// Provider component
export const ShellProvider = ShellContext.Provider

// Create shell value for provider
export function createShellValue(): ShellContextType {
  return createDefaultShellContext()
}