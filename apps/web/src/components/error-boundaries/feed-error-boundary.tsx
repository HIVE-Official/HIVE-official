"use client";

import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription } from '@hive/ui';
import { Button } from '@hive/ui';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId: string;
  retryCount: number;
}

export class FeedErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: this.generateErrorId(),
      retryCount: 0
    };
  }

  private generateErrorId(): string {
    return `feed_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `feed_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for monitoring
    console.error('Feed Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString()
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to monitoring service (in production)
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    try {
      // Report to error monitoring service
      fetch('/api/errors/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorId: this.state.errorId,
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          type: 'feed_error_boundary'
        })
      }).catch(reportError => {
        console.error('Failed to report error:', reportError);
      });
    } catch (reportError) {
      console.error('Error reporting failed:', reportError);
    }
  }

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorId: this.generateErrorId(),
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorId: this.generateErrorId(),
      retryCount: 0
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-4">
            {/* Error Alert */}
            <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-400">
                <strong>Something went wrong with the feed</strong>
                <br />
                We're sorry, but the feed couldn't load properly. This might be a temporary issue.
              </AlertDescription>
            </Alert>

            {/* Error Details (Development Only) */}
            {this.props.showDetails && this.state.error && process.env.NODE_ENV === 'development' && (
              <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                <h4 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h4>
                <p className="text-xs text-gray-300 font-mono break-all">
                  {this.state.error.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Error ID: {this.state.errorId}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              {this.state.retryCount < this.maxRetries && (
                <Button
                  onClick={this.handleRetry}
                  className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again {this.state.retryCount > 0 && `(${this.state.retryCount}/${this.maxRetries})`}
                </Button>
              )}

              <Button onClick={this.handleReset} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Feed
              </Button>

              <Button onClick={this.handleGoHome} variant="secondary">
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-hive-text-secondary">
              <p>If this problem persists, try refreshing the page or contact support.</p>
              {process.env.NODE_ENV === 'production' && (
                <p className="mt-1 text-xs text-gray-500">
                  Error ID: {this.state.errorId}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}