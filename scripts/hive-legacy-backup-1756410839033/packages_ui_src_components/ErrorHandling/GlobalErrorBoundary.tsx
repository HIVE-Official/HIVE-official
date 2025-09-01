'use client';

import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { HiveErrorBoundary, type HiveError, HiveErrorHandler } from './ErrorBoundary';
import { LoadingOrchestrator } from '../Loading/LoadingOrchestrator';
import { cn } from '../lib/utils';

// Global error tracking and analytics
interface ErrorAnalytics {
  errorCount: number;
  errorTypes: Record<string, number>;
  userPatterns: {
    hasMultipleErrors: boolean;
    errorSequence: string[];
    timeSpent: number;
  };
  campusIssues: {
    networkProblems: number;
    authIssues: number;
    campusSystemErrors: number;
  };
}

class GlobalErrorTracker {
  private static instance: GlobalErrorTracker;
  private analytics: ErrorAnalytics = {
    errorCount: 0,
    errorTypes: {},
    userPatterns: {
      hasMultipleErrors: false,
      errorSequence: [],
      timeSpent: 0,
    },
    campusIssues: {
      networkProblems: 0,
      authIssues: 0,
      campusSystemErrors: 0,
    },
  };
  private sessionStart = Date.now();

  static getInstance() {
    if (!GlobalErrorTracker.instance) {
      GlobalErrorTracker.instance = new GlobalErrorTracker();
    }
    return GlobalErrorTracker.instance;
  }

  trackError(error: HiveError, context?: any) {
    this.analytics.errorCount++;
    this.analytics.errorTypes[error.category] = (this.analytics.errorTypes[error.category] || 0) + 1;
    this.analytics.userPatterns.errorSequence.push(`${error.category}:${error.code}`);
    this.analytics.userPatterns.hasMultipleErrors = this.analytics.errorCount > 1;
    this.analytics.userPatterns.timeSpent = Date.now() - this.sessionStart;

    // Track campus-specific issues
    switch (error.category) {
      case 'network':
        this.analytics.campusIssues.networkProblems++;
        break;
      case 'auth':
        this.analytics.campusIssues.authIssues++;
        break;
      case 'campus':
        this.analytics.campusIssues.campusSystemErrors++;
        break;
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.group('🌐 Global Error Tracking');
      console.log('Error:', error);
      console.log('Analytics:', this.analytics);
      console.log('Context:', context);
      console.groupEnd();
    }

    // Send to analytics service (implement based on your needs)
    this.sendToAnalytics(error, context);
  }

  private async sendToAnalytics(error: HiveError, context?: any) {
    try {
      // This would integrate with your analytics service
      // Example: Mixpanel, Amplitude, or custom analytics
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.track('Error Occurred', {
          error_category: error.category,
          error_code: error.code,
          error_severity: error.severity,
          page_type: context?.pageType,
          user_id: context?.user?.id,
          campus_id: context?.campus?.id,
          is_repeat_error: this.analytics.userPatterns.hasMultipleErrors,
          session_error_count: this.analytics.errorCount,
        });
      }
    } catch (analyticsError) {
      console.warn('Failed to send error analytics:', analyticsError);
    }
  }

  getAnalytics(): ErrorAnalytics {
    return { ...this.analytics };
  }

  reset() {
    this.analytics = {
      errorCount: 0,
      errorTypes: {},
      userPatterns: {
        hasMultipleErrors: false,
        errorSequence: [],
        timeSpent: 0,
      },
      campusIssues: {
        networkProblems: 0,
        authIssues: 0,
        campusSystemErrors: 0,
      },
    };
    this.sessionStart = Date.now();
  }
}

interface GlobalErrorBoundaryProps {
  children: ReactNode;
  enableAnalytics?: boolean;
  enableAutoRecovery?: boolean;
  maxRetryAttempts?: number;
  context?: {
    user?: { id: string; name?: string; email?: string; isAdmin?: boolean };
    campus?: { id: string; name?: string };
    session?: { startTime: Date; userAgent: string };
  };
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  hiveError: HiveError | null;
  errorId: string;
  retryCount: number;
  autoRecoveryAttempted: boolean;
  isRecovering: boolean;
}

export class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  private errorTracker = GlobalErrorTracker.getInstance();
  private recoveryTimer: NodeJS.Timeout | null = null;

  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      hiveError: null,
      errorId: '',
      retryCount: 0,
      autoRecoveryAttempted: false,
      isRecovering: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<GlobalErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `global-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const hiveError = HiveErrorHandler.handleError(error, errorInfo, this.props.context);
    
    this.setState({ hiveError });

    // Track error in global analytics
    if (this.props.enableAnalytics !== false) {
      this.errorTracker.trackError(hiveError, this.props.context);
    }

    // Attempt auto-recovery for certain types of errors
    if (this.props.enableAutoRecovery && this.shouldAttemptAutoRecovery(hiveError)) {
      this.attemptAutoRecovery(hiveError);
    }

    // Enhanced logging
    console.group('🌍 Global Error Boundary');
    console.error('Original Error:', error);
    console.error('Error Info:', errorInfo);
    console.log('HIVE Error Analysis:', hiveError);
    console.log('Error ID:', this.state.errorId);
    console.log('Global Analytics:', this.errorTracker.getAnalytics());
    console.groupEnd();

    // Report critical errors immediately
    if (hiveError.severity === 'critical') {
      this.reportCriticalError(error, errorInfo, hiveError);
    }
  }

  private shouldAttemptAutoRecovery(error: HiveError): boolean {
    // Only attempt auto-recovery for certain error types
    const recoverableErrors = ['network', 'auth'];
    return (
      recoverableErrors.includes(error.category) &&
      error.recovery.isRetryable &&
      this.state.retryCount < (this.props.maxRetryAttempts || 2) &&
      !this.state.autoRecoveryAttempted
    );
  }

  private attemptAutoRecovery(error: HiveError) {
    this.setState({ isRecovering: true, autoRecoveryAttempted: true });

    // Wait a bit before attempting recovery
    this.recoveryTimer = setTimeout(() => {
      console.log('🔄 Attempting auto-recovery for error:', error.category);

      switch (error.category) {
        case 'network':
          // Try to refresh the connection
          this.handleRetry();
          break;
        case 'auth':
          // Try to refresh the auth token
          this.refreshAuthAndRetry();
          break;
        default:
          this.setState({ isRecovering: false });
      }
    }, 2000); // 2 second delay
  }

  private async refreshAuthAndRetry() {
    try {
      // This would integrate with your auth system
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('✅ Auth refresh successful, retrying...');
        this.handleRetry();
      } else {
        console.log('❌ Auth refresh failed');
        this.setState({ isRecovering: false });
      }
    } catch (refreshError) {
      console.error('Auth refresh error:', refreshError);
      this.setState({ isRecovering: false });
    }
  }

  private async reportCriticalError(error: Error, errorInfo: ErrorInfo, hiveError: HiveError) {
    try {
      // Send critical errors to monitoring service immediately
      await fetch('/api/errors/critical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
          errorInfo,
          hiveError,
          errorId: this.state.errorId,
          context: this.props.context,
          analytics: this.errorTracker.getAnalytics(),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (reportError) {
      console.error('Failed to report critical error:', reportError);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      hiveError: null,
      errorId: '',
      retryCount: prevState.retryCount + 1,
      isRecovering: false,
    }));
  };

  componentWillUnmount() {
    if (this.recoveryTimer) {
      clearTimeout(this.recoveryTimer);
    }
  }

  render() {
    // Show recovery screen during auto-recovery
    if (this.state.isRecovering) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-hive-background-primary">
          <div className="text-center space-y-6">
            <LoadingOrchestrator
              resources={[
                {
                  id: 'recovery',
                  name: 'Attempting to recover',
                  priority: 'critical',
                  estimatedTime: 2000,
                }
              ]}
              strategy="progressive"
              showStudentFriendlyMessages={true}
              campusContext={{
                networkQuality: 'fair',
                timeOfDay: 'morning',
                campusLoad: 'medium',
                deviceType: 'desktop',
              }}
            />
            <div className="text-center space-y-2">
              <p className="text-hive-text-secondary text-sm">
                HIVE is trying to fix this automatically...
              </p>
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 text-hive-text-secondary hover:text-hive-text-secondary transition-colors text-xs"
              >
                Skip auto-recovery
              </button>
            </div>
          </div>
        </div>
      );
    }

    // If there's an error, show enhanced error boundary
    if (this.state.hasError && this.state.hiveError) {
      return (
        <GlobalErrorFallback
          error={this.state.hiveError}
          errorId={this.state.errorId}
          retryCount={this.state.retryCount}
          analytics={this.errorTracker.getAnalytics()}
          onRetry={this.handleRetry}
          context={this.props.context}
          maxRetryAttempts={this.props.maxRetryAttempts || 3}
        />
      );
    }

    return this.props.children;
  }
}

interface GlobalErrorFallbackProps {
  error: HiveError;
  errorId: string;
  retryCount: number;
  analytics: ErrorAnalytics;
  onRetry: () => void;
  context?: GlobalErrorBoundaryProps['context'];
  maxRetryAttempts: number;
}

function GlobalErrorFallback({
  error,
  errorId,
  retryCount,
  analytics,
  onRetry,
  context,
  maxRetryAttempts,
}: GlobalErrorFallbackProps) {
  const isRepeatedError = analytics.userPatterns.hasMultipleErrors;
  const hasNetworkIssues = analytics.campusIssues.networkProblems > 0;
  const hasAuthIssues = analytics.campusIssues.authIssues > 0;

  // Generate contextual help based on error patterns
  const getContextualHelp = () => {
    if (hasNetworkIssues && hasAuthIssues) {
      return {
        title: "Multiple campus issues detected",
        message: "We're seeing both network and authentication problems. This might be a campus-wide issue.",
        suggestions: [
          "Check if other students are having similar issues",
          "Try using mobile data instead of campus Wi-Fi",
          "Contact campus IT if the problem persists"
        ]
      };
    } else if (isRepeatedError) {
      return {
        title: "Persistent issue detected",
        message: "You've encountered multiple errors in this session. Let's get you back on track.",
        suggestions: [
          "Try refreshing your browser completely",
          "Clear your browser cache",
          "Check if HIVE has any known issues on our status page"
        ]
      };
    } else {
      return null;
    }
  };

  const contextualHelp = getContextualHelp();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-hive-background-primary to-hive-background-secondary">
      <div className="max-w-lg w-full">
        {/* Main error card */}
        <div className="bg-hive-background-primary/95 backdrop-blur-xl border border-hive-border-default/20 rounded-2xl p-8 shadow-2xl">
          {/* Error icon and title */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-hive-gold/20 to-hive-gold/5 rounded-full flex items-center justify-center">
              <span className="text-5xl" role="img" aria-label="Error">
                {error.category === 'network' ? '📶' : 
                 error.category === 'auth' ? '🔐' : 
                 error.category === 'campus' ? '🏢' : '🤔'}
              </span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-hive-text-primary">
                {error.studentFriendly.title}
              </h1>
              <p className="text-hive-text-secondary leading-relaxed">
                {error.studentFriendly.description}
              </p>
              
              {error.studentFriendly.encouragement && (
                <p className="text-hive-gold text-sm italic">
                  {error.studentFriendly.encouragement}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 mb-6">
            {error.recovery.isRetryable && retryCount < maxRetryAttempts && (
              <button
                onClick={onRetry}
                className="w-full py-3 px-4 bg-hive-gold text-hive-text-primary font-semibold rounded-xl hover:bg-hive-gold/90 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Try Again {retryCount > 0 && `(Attempt ${retryCount + 1})`}
              </button>
            )}

            {retryCount >= maxRetryAttempts && (
              <div className="text-center space-y-3">
                <p className="text-hive-text-secondary text-sm">
                  We've tried {maxRetryAttempts} times. This might need manual attention.
                </p>
                <button
                  onClick={() => window.location.href = 'mailto:support@hive.io?subject=Error Report&body=' + encodeURIComponent(`Error ID: ${errorId}\nUser: ${context?.user?.email || 'Unknown'}\nTime: ${new Date().toISOString()}`)}
                  className="w-full py-3 px-4 bg-hive-blue text-[var(--hive-text-inverse)] font-semibold rounded-xl hover:bg-hive-blue/90 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2 px-4 text-hive-text-secondary hover:text-hive-text-primary transition-colors border border-hive-border-default/20 rounded-lg"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 py-2 px-4 text-hive-text-secondary hover:text-hive-text-primary transition-colors border border-hive-border-default/20 rounded-lg"
              >
                Go Home
              </button>
            </div>
          </div>

          {/* Session analytics for admins or development */}
          {(context?.user?.isAdmin || process.env.NODE_ENV === 'development') && (
            <details className="border-t border-hive-border-default/10 pt-6">
              <summary className="cursor-pointer text-hive-text-secondary text-sm font-medium mb-4">
                Session Analytics {isRepeatedError && '⚠️'}
              </summary>
              <div className="bg-hive-background-secondary/30 rounded-lg p-4 text-xs space-y-2 font-mono">
                <div>Total Errors: {analytics.errorCount}</div>
                <div>Network Issues: {analytics.campusIssues.networkProblems}</div>
                <div>Auth Issues: {analytics.campusIssues.authIssues}</div>
                <div>Session Time: {Math.round(analytics.userPatterns.timeSpent / 1000 / 60)}min</div>
                <div>Error ID: {errorId}</div>
              </div>
            </details>
          )}
        </div>

        {/* Contextual help card */}
        {contextualHelp && (
          <div className="mt-6 bg-hive-gold/5 border border-hive-gold/20 rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-2">
              💡 {contextualHelp.title}
            </h3>
            <p className="text-hive-text-secondary text-sm mb-4">
              {contextualHelp.message}
            </p>
            <ul className="space-y-2">
              {contextualHelp.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start text-sm text-hive-text-secondary">
                  <span className="mr-2 text-hive-gold">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Student-friendly footer */}
        <div className="mt-6 text-center">
          <p className="text-hive-text-secondary text-xs">
            Hey {context?.user?.name?.split(' ')[0] || 'there'}! HIVE is built for students like you. 
            We're always working to make it better. 🐝
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook for using global error boundary
export function useGlobalErrorBoundary() {
  const errorTracker = GlobalErrorTracker.getInstance();
  
  return {
    trackError: (error: Error, context?: any) => {
      const hiveError = HiveErrorHandler.handleError(error, undefined, context);
      errorTracker.trackError(hiveError, context);
    },
    getAnalytics: () => errorTracker.getAnalytics(),
    reset: () => errorTracker.reset(),
  };
}

export { GlobalErrorTracker };
export default GlobalErrorBoundary;