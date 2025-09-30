"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, ExternalLink } from 'lucide-react';
import { Button, Card } from "@hive/ui";
import { logger } from '../lib/logger';
import { errorReporting } from '../lib/error-reporting';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void; errorId?: string }>;
  context?: string; // 'global' | 'feed' | 'spaces' | 'profile' | 'tools'
  enableRecovery?: boolean;
  maxRetries?: number;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeout?: NodeJS.Timeout;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const context = this.props.context || 'global';

    this.setState({ error, errorInfo, errorId });

    // Enhanced error logging with context and Firebase integration
    logger.error('Error Boundary caught an error', {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack ?? undefined,
      errorBoundary: `${context}ErrorBoundary`,
      context,
      retryCount: this.state.retryCount,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      timestamp: new Date().toISOString(),
      // Production-ready metadata
      buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
      environment: process.env.NODE_ENV,
    });

    // Send to production error reporting service
    errorReporting.reportError({
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack ?? undefined,
      context: `${context}ErrorBoundary`,
      retryCount: this.state.retryCount,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    }).catch((reportingError) => {
      logger.error('Failed to report error to external service', {
        originalErrorId: errorId,
        reportingError: reportingError instanceof Error ? reportingError.message : 'Unknown'
      });
    });

    // Auto-recovery for non-critical contexts
    if (this.props.enableRecovery && context !== 'global') {
      const maxRetries = this.props.maxRetries || 3;
      if (this.state.retryCount < maxRetries) {
        this.retryTimeout = setTimeout(() => {
          this.retry();
        }, 5000); // Auto-retry after 5 seconds
      }
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  retry = () => {
    const newRetryCount = this.state.retryCount + 1;

    // Log retry attempt
    logger.info('Error boundary retry attempt', {
      errorId: this.state.errorId,
      retryCount: newRetryCount,
      context: this.props.context || 'global'
    });

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: newRetryCount
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent
          error={this.state.error}
          retry={this.retry}
          errorId={this.state.errorId}
        />;
      }

      return <DefaultErrorFallback
        error={this.state.error}
        retry={this.retry}
        errorId={this.state.errorId}
        context={this.props.context || 'global'}
        retryCount={this.state.retryCount}
        maxRetries={this.props.maxRetries || 3}
      />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  retry,
  errorId,
  context = 'global',
  retryCount = 0,
  maxRetries = 3
}: {
  error?: Error;
  retry: () => void;
  errorId?: string;
  context?: string;
  retryCount?: number;
  maxRetries?: number;
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isGlobalError = context === 'global';
  const canRetry = retryCount < maxRetries;

  // HIVE brand voice for different contexts
  const getContextualMessage = () => {
    switch (context) {
      case 'feed':
        return {
          title: "Feed Temporarily Unavailable",
          message: "We're having trouble loading your campus feed. Your connections are safe - this is just a temporary hiccup.",
          suggestion: "Try refreshing or check your spaces directly while we fix this."
        };
      case 'spaces':
        return {
          title: "Space Explorer Offline",
          message: "We can't load the spaces right now, but your communities are still there waiting for you.",
          suggestion: "Try again in a moment or navigate to a specific space if you know its URL."
        };
      case 'profile':
        return {
          title: "Profile Temporarily Unavailable",
          message: "We're having trouble accessing profile data. Don't worry - your information is safe.",
          suggestion: "This usually resolves quickly. Try refreshing in a moment."
        };
      case 'tools':
        return {
          title: "HiveLab Tools Offline",
          message: "The tool builder is temporarily unavailable. Your projects are safe and saved.",
          suggestion: "Check back soon - we're working to restore full functionality."
        };
      default:
        return {
          title: "Something Unexpected Happened",
          message: "We hit a snag, but HIVE is still running. This doesn't affect your data or connections.",
          suggestion: "Try refreshing the page or navigate to a different section while we investigate."
        };
    }
  };

  const { title, message, suggestion } = getContextualMessage();

  return (
    <div className={`${isGlobalError ? 'min-h-screen' : 'min-h-[400px]'} bg-hive-background flex items-center justify-center p-4`}>
      <Card className="max-w-lg w-full p-8 bg-hive-surface border-hive-border-default text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </div>

        <h1 className="text-xl font-bold text-hive-text-primary mb-3">{title}</h1>
        <p className="text-hive-text-secondary mb-2">
          {message}
        </p>
        <p className="text-hive-text-tertiary text-sm mb-6">
          {suggestion}
        </p>

        {/* Error ID for support */}
        {errorId && (
          <div className="mb-4 p-3 bg-hive-surface-elevated border border-hive-border rounded-lg">
            <p className="text-xs text-hive-text-tertiary mb-1">Error ID for support:</p>
            <code className="text-xs text-hive-text-secondary font-mono">
              {errorId}
            </code>
          </div>
        )}

        {/* Retry information */}
        {retryCount > 0 && (
          <div className="mb-4 p-3 bg-hive-surface-elevated border border-hive-border rounded-lg">
            <p className="text-xs text-hive-text-secondary">
              Retry attempt {retryCount} of {maxRetries}
            </p>
          </div>
        )}

        {/* Development error details */}
        {isDevelopment && error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-400 mb-2">Development Error Details:</h3>
            <pre className="text-xs text-red-300 overflow-auto max-h-32">
              {error.message}
              {error.stack && '\n\nStack trace:\n' + error.stack}
            </pre>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          {canRetry && (
            <Button
              onClick={retry}
              className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}

          {!isGlobalError && (
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
              className="border-hive-border text-hive-text-secondary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={() => window.location.href = '/feed'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Feed
          </Button>

          {isDevelopment && (
            <Button
              variant="outline"
              onClick={() => {
                if (error && errorId) {
                  const errorReport = {
                    errorId,
                    message: error.message,
                    stack: error.stack,
                    context,
                    retryCount,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                  };
                  navigator.clipboard?.writeText(JSON.stringify(errorReport, null, 2));
                }
              }}
              className="border-hive-border text-hive-text-tertiary"
            >
              <Bug className="w-4 h-4 mr-2" />
              Copy Error
            </Button>
          )}
        </div>

        {/* Support link for production */}
        {!isDevelopment && (
          <div className="mt-6 pt-4 border-t border-hive-border">
            <p className="text-xs text-hive-text-tertiary">
              If this keeps happening, reach out to our team with the error ID above.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export { ErrorBoundary, DefaultErrorFallback };