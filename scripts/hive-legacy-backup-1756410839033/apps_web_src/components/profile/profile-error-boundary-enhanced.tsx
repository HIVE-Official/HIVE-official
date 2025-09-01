'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, LogOut } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  showLogout?: boolean;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

/**
 * Enhanced Profile Error Boundary
 * 
 * PRODUCTION-READY error boundary specifically designed for the HIVE profile system.
 * Handles authentication errors, API failures, and component crashes gracefully.
 * 
 * Features:
 * - Automatic error reporting
 * - Graceful fallback UI
 * - Authentication error handling
 * - Retry mechanisms
 * - Error categorization
 */
export class ProfileErrorBoundaryEnhanced extends Component<Props, State> {
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(props: Props) {
    super(props);
    
    this.state = {
      hasError: false,
      errorId: `profile_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `profile_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.group('🚨 HIVE Profile Error Boundary - Critical Error Caught');
    console.error('Error ID:', this.state.errorId);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    console.groupEnd();

    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // Report to error tracking service (replace with your service)
    this.reportError(error, errorInfo);
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    try {
      // PRODUCTION: Replace with your error tracking service
      // Example: Sentry, LogRocket, Bugsnag, etc.
      const errorReport = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        category: this.categorizeError(error)
      };

      console.info('[HIVE_ERROR_REPORT]', errorReport);
      
      // Send to monitoring service
      // await errorTrackingService.report(errorReport);
      
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private categorizeError = (error: Error): string => {
    const message = error.message.toLowerCase();
    
    if (message.includes('auth') || message.includes('login') || message.includes('token')) {
      return 'authentication';
    }
    if (message.includes('network') || message.includes('fetch') || message.includes('api')) {
      return 'network';
    }
    if (message.includes('render') || message.includes('component')) {
      return 'rendering';
    }
    if (message.includes('data') || message.includes('parse') || message.includes('invalid')) {
      return 'data_validation';
    }
    
    return 'unknown';
  };

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined
      });

      // Call custom retry handler if provided
      if (this.props.onRetry) {
        this.props.onRetry();
      }
      
      // Force re-render the component tree
      this.forceUpdate();
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('hive_session_token');
    localStorage.removeItem('hive_session');
    localStorage.removeItem('auth_token');
    
    // Redirect to login
    window.location.href = '/auth/login?reason=profile_error';
  };

  private renderErrorUI() {
    const { error } = this.state;
    const { fallbackTitle = "Profile System Error", showLogout = true } = this.props;
    
    const isAuthError = error?.message.toLowerCase().includes('auth') || 
                       error?.message.toLowerCase().includes('login') ||
                       error?.message.toLowerCase().includes('token');

    const canRetry = this.retryCount < this.maxRetries;

    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-hive-background-elevated rounded-2xl border border-hive-border-subtle shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-hive-text-primary mb-3">
            {isAuthError ? 'Authentication Required' : fallbackTitle}
          </h1>

          {/* Error Message */}
          <p className="text-hive-text-secondary mb-6 leading-relaxed">
            {isAuthError 
              ? 'Your session has expired or become invalid. Please log in again to continue.'
              : 'Something went wrong with your profile. Our team has been notified and is working on a fix.'
            }
          </p>

          {/* Error ID for Support */}
          <div className="bg-hive-background-secondary rounded-lg p-3 mb-6">
            <p className="text-xs text-hive-text-tertiary mb-1">Error ID (for support)</p>
            <code className="text-xs font-mono text-hive-text-secondary select-all">
              {this.state.errorId}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Retry Button */}
            {canRetry && !isAuthError && (
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-hive-brand-secondary text-hive-text-on-brand rounded-lg font-medium hover:bg-hive-brand-hover transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again ({this.maxRetries - this.retryCount} attempts left)
              </button>
            )}

            {/* Logout Button (for auth errors) */}
            {(isAuthError || showLogout) && (
              <button
                onClick={this.handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-[var(--hive-text-inverse)] rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {isAuthError ? 'Log In Again' : 'Logout & Restart'}
              </button>
            )}

            {/* Home Button */}
            <button
              onClick={this.handleGoHome}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg font-medium hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </button>
          </div>

          {/* Development Error Details */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-6 text-left">
              <summary className="text-sm font-medium text-hive-text-tertiary cursor-pointer hover:text-hive-text-secondary">
                Development Error Details
              </summary>
              <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800 mb-2">
                  {error.name}: {error.message}
                </p>
                <pre className="text-xs text-red-700 overflow-auto">
                  {error.stack}
                </pre>
                {this.state.errorInfo && (
                  <>
                    <p className="text-sm font-medium text-red-800 mt-3 mb-2">
                      Component Stack:
                    </p>
                    <pre className="text-xs text-red-700 overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

export default ProfileErrorBoundaryEnhanced;