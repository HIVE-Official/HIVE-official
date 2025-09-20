"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';
import { Card, CardContent } from '../../atomic/ui/card';
import { Button } from '../hive-button';

// Loading state interfaces
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
  stage?: string
}

export interface ErrorState {
  hasError: boolean;
  error?: Error | string;
  errorCode?: string;
  isRecoverable?: boolean;
  retryCount?: number
}

export interface ConnectionState {
  isOnline: boolean;
  isConnected: boolean;
  lastSync?: Date;
  syncStatus: 'synced' | 'syncing' | 'error' | 'offline'
}

// Simple loading skeleton
export function DashboardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`dashboard-skeleton space-y-6 ${className}`} role="status">
      <div className="h-8 bg-gray-200 rounded animate-pulse" />
      <div className="h-32 bg-gray-200 rounded animate-pulse" />
      <div className="h-64 bg-gray-200 rounded animate-pulse" />
    </div>
  )
}

// Widget skeleton
export function WidgetSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={`widget-skeleton ${className}`}>
      <CardContent className="p-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  )
}

// Error component
export function DashboardError({
  error,
  onRetry,
  className = ""
}: {
  error: ErrorState;
  onRetry?: () => void;
  className?: string
}) {
  return (
    <Card className={`dashboard-error ${className}`}>
      <CardContent className="p-8 text-center">
        <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-4">
          {typeof error.error === 'string' ? error.error : 'An unexpected error occurred'}
        </p>
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Loading progress
export function LoadingProgress({
  state,
  className = ""
}: {
  state: LoadingState;
  className?: string
}) {
  return (
    <Card className={`loading-progress ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <div className="flex-1">
            <p className="font-medium">{state.message || 'Loading...'}</p>
            {state.progress && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${state.progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Connection status
export function ConnectionStatus({
  state,
  onReconnect,
  className = ""
}: {
  state: ConnectionState;
  onReconnect?: () => void;
  className?: string
}) {
  return (
    <Card className={`connection-status ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {state.isOnline ? (
              <Wifi className="h-4 w-4 text-green-400" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm">
              {state.isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
          {!state.isConnected && onReconnect && (
            <Button variant="outline" size="sm" onClick={onReconnect}>
              Reconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Accessibility announcer
export function AccessibilityAnnouncer({
  message,
  type = 'polite'
}: {
  message: string;
  type?: 'polite' | 'assertive'
}) {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// Empty state
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = ""
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string
}) {
  return (
    <Card className={`empty-state ${className}`}>
      <CardContent className="p-12 text-center">
        <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  )
}

export default {
  DashboardSkeleton,
  WidgetSkeleton,
  DashboardError,
  LoadingProgress,
  ConnectionStatus,
  AccessibilityAnnouncer,
  EmptyState
};