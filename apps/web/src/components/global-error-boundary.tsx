'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    logger.error('Global error boundary caught error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      digest: (errorInfo as any).digest
    });

    this.setState({
      error,
      errorInfo
    });

    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // Would send to Sentry/LogRocket here
      this.reportErrorToService(error, errorInfo);
    }
  }

  reportErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Send error to tracking service
    fetch('/api/errors/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        url: typeof window !== 'undefined' ? window.location.href : 'server'
      })
    }).catch(err => {
      console.error('Failed to report error:', err);
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--hive-bg-primary)]">
          <div className="max-w-md w-full p-8 bg-[var(--hive-card-bg)] rounded-xl shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-red-500/10 rounded-full">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Something went wrong
              </h1>
              
              <p className="text-[var(--hive-text-secondary)] mb-6">
                We encountered an unexpected error. The issue has been reported and we're working on a fix.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-[var(--hive-accent)] hover:underline">
                    Show error details
                  </summary>
                  <div className="mt-2 p-4 bg-gray-900 rounded-lg overflow-auto">
                    <p className="text-xs text-red-400 font-mono mb-2">
                      {this.state.error.message}
                    </p>
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </details>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 py-2 bg-[var(--hive-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 border border-[var(--hive-border)] text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-bg-tertiary)] transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    logger.error('Error handled by hook', {
      error: error.message,
      stack: error.stack,
      errorInfo
    });

    // Could trigger a state update or navigation here
    throw error; // Re-throw to be caught by boundary
  };
}