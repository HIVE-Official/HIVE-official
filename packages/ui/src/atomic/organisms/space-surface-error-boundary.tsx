'use client';

import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  surfaceName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class SpaceSurfaceErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    console.error('Space surface error:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, etc.)
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-8 bg-red-500/5 border border-red-500/20 rounded-xl"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
            {this.props.surfaceName ? `${this.props.surfaceName} Error` : 'Something went wrong'}
          </h3>
          
          <p className="text-sm text-neutral-400 text-center mb-6 max-w-md">
            {this.props.surfaceName 
              ? `There was a problem loading the ${this.props.surfaceName.toLowerCase()} section.`
              : 'An unexpected error occurred. Please try refreshing or contact support if the problem persists.'
            }
          </p>

          {/* Error Details in Development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 w-full max-w-md">
              <summary className="text-xs text-neutral-500 cursor-pointer hover:text-neutral-400">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-red-400 bg-red-900/10 p-3 rounded-lg mt-2 overflow-auto">
                {this.state.error instanceof Error ? this.state.error.message : String(this.state.error)}
                {this.state.errorInfo?.componentStack && (
                  <>
                    {'\n\nComponent Stack:'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}

          <div className="flex items-center gap-3">
            <motion.button
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </motion.button>

            <motion.button
              onClick={this.handleGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-neutral-400 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="h-4 w-4" />
              Go Home
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useSpaceSurfaceErrorHandler(surfaceName?: string) {
  return React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    console.error(`${surfaceName || 'Space surface'} error:`, error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, etc.)
    }
  }, [surfaceName]);
}

export default SpaceSurfaceErrorBoundary;