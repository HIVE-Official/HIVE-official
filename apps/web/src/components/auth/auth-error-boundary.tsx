"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, LogOut, Home } from 'lucide-react';
import { Card } from "@hive/ui";
import { logger } from '@/lib/logger';

interface AuthErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorType?: 'auth_failure' | 'token_expired' | 'network_error' | 'unknown';
}

interface AuthErrorBoundaryProps {
  children: ReactNode;
  onRetry?: () => void;
  onLogout?: () => void;
}

/**
 * Authentication-specific error boundary that handles auth failures gracefully
 * Provides clear recovery paths for students when authentication issues occur
 */
export class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    // Categorize error types for better user experience
    let errorType: AuthErrorBoundaryState['errorType'] = 'unknown';
    
    if (error.message.includes('auth/')) {
      errorType = 'auth_failure';
    } else if (error.message.includes('token') || error.message.includes('expired')) {
      errorType = 'token_expired';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      errorType = 'network_error';
    }

    return {
      hasError: true,
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log authentication errors with structured context
    logger.error('Authentication Error Boundary triggered', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorType: this.state.errorType,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      timestamp: new Date().toISOString(),
      boundary: 'AuthErrorBoundary'
    });

    // Report to external monitoring if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: {
          component: 'AuthErrorBoundary',
          errorType: this.state.errorType,
        },
        extra: errorInfo
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorType: undefined });
    this.props.onRetry?.();
  };

  handleLogout = () => {
    // Clear any stored auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('firebase-auth-token');
      localStorage.removeItem('hive-user-data');
      sessionStorage.clear();
    }
    
    this.props.onLogout?.();
    window.location.href = '/schools';
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  getErrorMessage(): { title: string; description: string; actions: Array<{ label: string; action: () => void; variant: 'default' | 'outline' | 'destructive' }> } {
    const { errorType } = this.state;

    switch (errorType) {
      case 'auth_failure':
        return {
          title: 'Authentication Failed',
          description: 'There was a problem with your login session. Please sign in again to continue using HIVE.',
          actions: [
            { label: 'Sign In Again', action: this.handleLogout, variant: 'default' },
            { label: 'Try Again', action: this.handleRetry, variant: 'outline' }
          ]
        };
      
      case 'token_expired':
        return {
          title: 'Session Expired',
          description: 'Your login session has expired for security. Please sign in again to continue.',
          actions: [
            { label: 'Sign In Again', action: this.handleLogout, variant: 'default' },
          ]
        };
      
      case 'network_error':
        return {
          title: 'Connection Problem',
          description: 'Unable to connect to HIVE servers. Please check your internet connection and try again.',
          actions: [
            { label: 'Try Again', action: this.handleRetry, variant: 'default' },
            { label: 'Go Home', action: this.handleGoHome, variant: 'outline' }
          ]
        };
      
      default:
        return {
          title: 'Something went wrong',
          description: 'We encountered an unexpected error. Please try again or contact support if the problem persists.',
          actions: [
            { label: 'Try Again', action: this.handleRetry, variant: 'default' },
            { label: 'Sign Out', action: this.handleLogout, variant: 'outline' },
          ]
        };
    }
  }

  render() {
    if (this.state.hasError) {
      const { title, description, actions } = this.getErrorMessage();
      const isDev = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-8 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            
            <h1 className="text-2xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground mb-6">{description}</p>

            {isDev && this.state.error && (
              <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left">
                <h3 className="text-sm font-medium text-destructive mb-2">Development Error Details:</h3>
                <div className="text-xs text-muted-foreground font-mono bg-background/50 p-2 rounded border overflow-auto max-h-32">
                  <div className="mb-2"><strong>Type:</strong> {this.state.errorType}</div>
                  <div><strong>Message:</strong> {this.state.error.message}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="min-w-32 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {action.label === 'Try Again' && <RefreshCw className="w-4 h-4 mr-2" />}
                  {action.label === 'Sign In Again' && <LogOut className="w-4 h-4 mr-2" />}
                  {action.label === 'Sign Out' && <LogOut className="w-4 h-4 mr-2" />}
                  {action.label === 'Go Home' && <Home className="w-4 h-4 mr-2" />}
                  {action.label}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-xs text-muted-foreground">
                Need help? Contact{' '}
                <a href="mailto:support@hive.college" className="text-primary hover:underline">
                  support@hive.college
                </a>
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook to trigger auth error boundary programmatically
 */
export function useAuthErrorHandler() {
  return {
    reportAuthError: (error: Error, context?: Record<string, any>) => {
      logger.error('Authentication error reported', {
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        source: 'useAuthErrorHandler'
      });
      
      // Re-throw to trigger error boundary
      throw error;
    }
  };
}

export default AuthErrorBoundary;