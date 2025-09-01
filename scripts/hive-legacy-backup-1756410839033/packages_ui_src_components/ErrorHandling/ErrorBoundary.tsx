'use client';

import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { cn } from '../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../button';

// Enhanced error types with HIVE context
interface HiveError {
  message: string;
  code: string;
  severity: 'critical' | 'error' | 'warning' | 'info';
  category: 'network' | 'auth' | 'permission' | 'validation' | 'system' | 'campus' | 'unknown';
  context?: {
    userId?: string;
    campusId?: string;
    pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
    userAgent?: string;
    timestamp?: Date;
  };
  recovery: {
    isRetryable: boolean;
    action?: 'retry' | 'refresh' | 'navigate' | 'contact-support' | 'sign-in' | 'join-waitlist';
    actionUrl?: string;
    customMessage?: string;
  };
  studentFriendly: {
    title: string;
    description: string;
    encouragement?: string;
    nextSteps?: string[];
  };
}

// Campus-aware error handler with empathetic messaging
class HiveErrorHandler {
  private static campusMessages = {
    network: {
      poor: "Looks like the campus Wi-Fi is having a moment 😅",
      timeout: "The connection timed out - campus networks can be tricky!",
      offline: "You're offline right now, but don't worry - some features still work!"
    },
    auth: {
      expired: "Your session expired - happens to the best of us!",
      invalid: "Let's get you signed back in to your HIVE account",
      permissions: "You don't have access to this yet - but you can request it!"
    },
    campus: {
      maintenance: "The campus systems are getting some love right now",
      capacity: "Lots of students are using HIVE right now - that's awesome!",
      integration: "We're having trouble connecting to your campus systems"
    }
  };

  static handleError(error: Error, errorInfo?: ErrorInfo, context?: any): HiveError {
    const timestamp = new Date();
    const isNetworkError = error.message.toLowerCase().includes('network') || 
                          error.message.toLowerCase().includes('fetch');
    const isAuthError = error.message.toLowerCase().includes('auth') ||
                       error.message.toLowerCase().includes('unauthorized');
    
    // Determine error category and generate student-friendly messaging
    let category: HiveError['category'] = 'unknown';
    let severity: HiveError['severity'] = 'error';
    let studentFriendly: HiveError['studentFriendly'];
    let recovery: HiveError['recovery'];
    
    if (isNetworkError) {
      category = 'network';
      severity = 'warning';
      studentFriendly = {
        title: "Connection hiccup!",
        description: this.campusMessages.network.poor,
        encouragement: "These things happen on campus - let's try again!",
        nextSteps: [
          "Check if you're connected to campus Wi-Fi",
          "Try refreshing the page",
          "Switch to mobile data if available"
        ]
      };
      recovery = {
        isRetryable: true,
        action: 'retry',
        customMessage: "Retry connection"
      };
    } else if (isAuthError) {
      category = 'auth';
      severity = 'warning';
      studentFriendly = {
        title: "Quick sign-in needed",
        description: this.campusMessages.auth.expired,
        encouragement: "Your data is safe - just need to verify it's you!"
      };
      recovery = {
        isRetryable: true,
        action: 'sign-in',
        actionUrl: '/auth/login'
      };
    } else {
      // Generic error with encouraging tone
      studentFriendly = {
        title: "Something unexpected happened",
        description: "Don't worry - this isn't your fault! Our team gets notified about these issues automatically.",
        encouragement: "HIVE is built for students like you, and we're always working to make it better.",
        nextSteps: [
          "Try refreshing the page",
          "Check back in a few minutes",
          "Reach out if this keeps happening"
        ]
      };
      recovery = {
        isRetryable: true,
        action: 'retry'
      };
    }
    
    return {
      message: error.message,
      code: error.name || 'UNKNOWN_ERROR',
      severity,
      category,
      context: {
        userId: context?.user?.id,
        campusId: context?.campus?.id,
        pageType: context?.pageType,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        timestamp
      },
      recovery,
      studentFriendly
    };
  }

  static getErrorIcon(category: HiveError['category'], severity: HiveError['severity']): {
    emoji: string;
    color: string;
  } {
    const iconMap = {
      network: { emoji: '📶', color: 'text-hive-gold' },
      auth: { emoji: '🔐', color: 'text-hive-emerald' },
      permission: { emoji: '🚧', color: 'text-hive-amber' },
      validation: { emoji: '✨', color: 'text-hive-purple' },
      system: { emoji: '🔧', color: 'text-hive-blue' },
      campus: { emoji: '🏢', color: 'text-hive-green' },
      unknown: { emoji: '🤔', color: 'text-hive-text-secondary' }
    };
    
    return iconMap[category] || iconMap.unknown;
  }
}

interface Props {
  children: ReactNode;
  fallback?: (error: HiveError, retry: () => void, context?: any) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, hiveError: HiveError) => void;
  context?: {
    user?: { id: string; name?: string; email?: string };
    campus?: { id: string; name?: string };
    pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
  };
  enableErrorReporting?: boolean;
  showDebugInfo?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  hiveError: HiveError | null;
  errorId: string;
  retryCount: number;
}

export class HiveErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      hiveError: null,
      errorId: '',
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `hive-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const hiveError = HiveErrorHandler.handleError(error, errorInfo, this.props.context);
    
    this.setState({ hiveError });
    
    // Log to console with context
    console.group('🐝 HIVE Error Boundary');
    console.error('Original Error:', error);
    console.error('Error Info:', errorInfo);
    console.log('HIVE Error Analysis:', hiveError);
    console.log('Error ID:', this.state.errorId);
    console.groupEnd();
    
    // Call the optional onError prop
    this.props.onError?.(error, errorInfo, hiveError);
    
    // Report to error tracking service (if enabled)
    if (this.props.enableErrorReporting) {
      this.reportError(error, errorInfo, hiveError);
    }
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo, hiveError: HiveError) => {
    try {
      // This would integrate with your error reporting service
      // await errorReportingService.report({
      //   error,
      //   errorInfo,
      //   hiveError,
      //   errorId: this.state.errorId,
      //   context: this.props.context
      // });
      
      console.log('Error reported to tracking service');
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      hiveError: null,
      errorId: '',
      retryCount: prevState.retryCount + 1
    }));
  };

  handleAction = (action: HiveError['recovery']['action'], actionUrl?: string) => {
    switch (action) {
      case 'retry':
        this.handleRetry();
        break;
      case 'refresh':
        window.location.reload();
        break;
      case 'navigate':
        if (actionUrl) {
          window.location.href = actionUrl;
        }
        break;
      case 'sign-in':
        window.location.href = actionUrl || '/auth/login';
        break;
      case 'join-waitlist':
        window.location.href = actionUrl || '/waitlist';
        break;
      case 'contact-support':
        // Could open a modal or navigate to support page
        console.log('Contact support requested', { errorId: this.state.errorId });
        break;
    }
  };

  render() {
    if (this.state.hasError && this.state.hiveError) {
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.hiveError, 
          this.handleRetry,
          this.props.context
        );
      }

      return (
        <HiveErrorFallback
          error={this.state.hiveError}
          errorId={this.state.errorId}
          retryCount={this.state.retryCount}
          onAction={this.handleAction}
          showDebugInfo={this.props.showDebugInfo || process.env.NODE_ENV === 'development'}
          context={this.props.context}
        />
      );
    }

    return this.props.children;
  }
}

interface HiveErrorFallbackProps {
  error: HiveError;
  errorId: string;
  retryCount: number;
  onAction: (action: HiveError['recovery']['action'], actionUrl?: string) => void;
  showDebugInfo?: boolean;
  context?: Props['context'];
}

function HiveErrorFallback({
  error,
  errorId,
  retryCount,
  onAction,
  showDebugInfo = false,
  context
}: HiveErrorFallbackProps) {
  const { emoji, color } = HiveErrorHandler.getErrorIcon(error.category, error.severity);
  
  const severityColors = {
    critical: 'border-red-500/30 bg-red-500/5',
    error: 'border-orange-500/30 bg-orange-500/5',
    warning: 'border-hive-gold/30 bg-hive-gold/5',
    info: 'border-hive-blue/30 bg-hive-blue/5'
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-hive-background-primary">
      <div className={cn(
        'max-w-md w-full border rounded-xl p-8 text-center space-y-6',
        'backdrop-blur-xl bg-hive-background-primary/90',
        severityColors[error.severity]
      )}>
        {/* Error icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-hive-background-secondary/50 flex items-center justify-center border border-hive-border-default/20">
          <span className="text-4xl" role="img" aria-label="Error icon">
            {emoji}
          </span>
        </div>

        {/* Error title */}
        <div className="space-y-2">
          <Text 
            variant="heading-lg" 
            color="primary"
            className="font-semibold"
          >
            {error.studentFriendly.title}
          </Text>
          
          <Text 
            variant="body-md" 
            color="secondary"
            className="leading-relaxed"
          >
            {error.studentFriendly.description}
          </Text>
          
          {error.studentFriendly.encouragement && (
            <Text 
              variant="body-sm" 
              color="secondary"
              className="italic text-hive-gold"
            >
              {error.studentFriendly.encouragement}
            </Text>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {error.recovery.isRetryable && (
            <ButtonEnhanced
              variant="primary"
              onClick={() => onAction(error.recovery.action || 'retry', error.recovery.actionUrl)}
              className="w-full"
              disabled={retryCount >= 3} // Prevent infinite retries
            >
              {error.recovery.customMessage || {
                retry: 'Try Again',
                refresh: 'Refresh Page',
                navigate: 'Go Back',
                'sign-in': 'Sign In',
                'join-waitlist': 'Join Waitlist',
                'contact-support': 'Get Help'
              }[error.recovery.action || 'retry']}
              {retryCount > 0 && ` (${retryCount + 1})`}
            </ButtonEnhanced>
          )}
          
          {retryCount >= 3 && (
            <ButtonEnhanced
              variant="ghost"
              onClick={() => onAction('contact-support')}
              className="w-full text-hive-text-secondary"
            >
              This keeps happening - Get Help
            </ButtonEnhanced>
          )}
          
          <ButtonEnhanced
            variant="ghost"
            onClick={() => window.location.href = '/'}
            className="w-full text-hive-text-secondary"
          >
            Take me home
          </ButtonEnhanced>
        </div>

        {/* Next steps */}
        {error.studentFriendly.nextSteps && error.studentFriendly.nextSteps.length > 0 && (
          <div className="text-left space-y-2">
            <Text variant="body-sm" color="secondary" className="font-medium">
              What you can try:
            </Text>
            <ul className="space-y-1">
              {error.studentFriendly.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start text-sm text-hive-text-secondary">
                  <span className="mr-2 text-hive-gold">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Context info for students */}
        {context?.user && (
          <div className="text-xs text-hive-text-secondary border-t border-hive-border-default/10 pt-4">
            <Text variant="body-xs" color="secondary">
              Hey {context.user.name?.split(' ')[0] || 'there'}! If this keeps happening, 
              screenshot this and reach out to support.
            </Text>
          </div>
        )}

        {/* Debug information */}
        {showDebugInfo && (
          <details className="text-left text-xs border-t border-hive-border-default/10 pt-4">
            <summary className="cursor-pointer font-medium text-hive-text-secondary mb-2">
              Debug Info (for developers)
            </summary>
            <div className="bg-hive-background-secondary/30 rounded p-3 font-mono space-y-1 text-hive-text-secondary">
              <div><strong>Error ID:</strong> {errorId}</div>
              <div><strong>Code:</strong> {error.code}</div>
              <div><strong>Category:</strong> {error.category}</div>
              <div><strong>Severity:</strong> {error.severity}</div>
              <div><strong>Retry Count:</strong> {retryCount}</div>
              <div><strong>Timestamp:</strong> {error.context?.timestamp?.toISOString()}</div>
              {context?.pageType && (
                <div><strong>Page Type:</strong> {context.pageType}</div>
              )}
              {context?.campus && (
                <div><strong>Campus:</strong> {context.campus.name || context.campus.id}</div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

// Hook for using error boundary in functional components
export function useHiveErrorBoundary() {
  return {
    ErrorBoundary: HiveErrorBoundary,
    throwError: (error: Error) => {
      throw error;
    }
  };
}

// Utility for manual error reporting
export function reportHiveError(error: Error, context?: any) {
  const hiveError = HiveErrorHandler.handleError(error, undefined, context);
  console.error('Manual HIVE error report:', hiveError);
  // Could also send to error reporting service
}

export default HiveErrorBoundary;
export { HiveErrorHandler };
export type { HiveError, Props as HiveErrorBoundaryProps };