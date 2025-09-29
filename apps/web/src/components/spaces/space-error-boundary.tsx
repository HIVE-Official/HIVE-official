'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HiveCard, HiveButton } from '@hive/ui';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class SpaceErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorId: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: Math.random().toString(36).substring(7)
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = this.state.errorId || 'unknown';

    // Log error for monitoring
    logger.error('Space component error caught by boundary', {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      timestamp: new Date().toISOString()
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, report to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service (Sentry, etc.)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI - mobile optimized
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <HiveCard className="max-w-md w-full bg-gray-900/50 border-gray-800 p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  Something went wrong
                </h3>
                <p className="text-sm text-gray-400">
                  We're having trouble loading this space. This usually fixes itself quickly.
                </p>
                {this.state.errorId && (
                  <p className="text-xs text-gray-500 font-mono">
                    Error ID: {this.state.errorId}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <HiveButton
                  onClick={this.handleRetry}
                  className="bg-hive-gold text-black hover:bg-yellow-400 flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </HiveButton>

                <HiveButton
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="border-gray-700 text-gray-300 hover:text-white flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </HiveButton>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="w-full mt-4 text-left">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                    Debug Info
                  </summary>
                  <pre className="text-xs text-red-400 mt-2 p-2 bg-gray-800 rounded overflow-auto max-h-32">
                    {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </HiveCard>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withSpaceErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  customFallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <SpaceErrorBoundary fallback={customFallback}>
        <Component {...props} />
      </SpaceErrorBoundary>
    );
  };
}

// Hook for triggering error boundary from function components
export function useErrorBoundary() {
  const [, setState] = React.useState();

  return React.useCallback((error: Error) => {
    setState(() => {
      throw error;
    });
  }, []);
}