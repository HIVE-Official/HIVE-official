"use client";

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { captureError } from '../stories/mocks/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  shouldReset?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
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
    // 1. Log to analytics
    captureError(error, {
      componentStack: errorInfo.componentStack,
      type: 'react_error_boundary',
      location: window.location.href,
      timestamp: new Date().toISOString()
    });

    // 2. Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // 3. Update state with error info
    this.setState({
      errorInfo
    });
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state if shouldReset prop changes
    if (this.props.shouldReset && !prevProps.shouldReset) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <details className="text-sm">
            <summary className="cursor-pointer">Technical Details</summary>
            <pre className="mt-2 p-2 bg-background/50 rounded overflow-auto">
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
} 