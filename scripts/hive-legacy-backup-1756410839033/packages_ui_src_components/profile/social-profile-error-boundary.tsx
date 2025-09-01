/**
 * Social Profile Error Boundary
 * Provides comprehensive error handling for social profile components
 */

"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { motion } from '../../lib/motion';
import { butterClasses } from '../../lib/motion';
import '../../styles/social-profile.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolateError?: boolean;
  context?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class SocialProfileErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Call error callback if provided
    this.props.onError?.(error, errorInfo);

    // Log error for monitoring (in production, this would go to your error tracking service)
    console.error('Social Profile Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      context: this.props.context
    });
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.retryCount < this.maxRetries;
      const contextName = this.props.context || 'Profile Component';

      return (
        <motion.div 
          className={cn(
            "social-profile-card error-boundary-card",
            butterClasses.card
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center justify-center text-center p-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AlertCircle size={48} className="text-red-400 mb-4" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h3 className="profile-heading text-primary mb-2">
                Something went wrong
              </h3>
              <p className="profile-body text-secondary mb-6">
                {contextName} encountered an unexpected error
              </p>
            </motion.div>

            <motion.div 
              className="space-y-3 w-full max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {canRetry && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <ButtonEnhanced
                    onClick={this.handleRetry}
                    className={cn("social-action-button w-full", butterClasses.button)}
                  >
                    <RefreshCw size={16} />
                    Try Again ({this.maxRetries - this.state.retryCount} left)
                  </ButtonEnhanced>
                </motion.div>
              )}
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ButtonEnhanced
                  onClick={this.handleReset}
                  variant="secondary"
                  className={cn("social-action-button secondary w-full", butterClasses.button)}
                >
                  <Home size={16} />
                  Reset Component
                </ButtonEnhanced>
              </motion.div>
            </motion.div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details 
                className="mt-6 w-full text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <summary className="cursor-pointer text-xs text-tertiary hover:text-secondary">
                  Developer Info (click to expand)
                </summary>
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-xs font-mono text-red-400 overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export function withSocialProfileErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  context?: string,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <SocialProfileErrorBoundary context={context} fallback={fallback}>
      <Component {...props} />
    </SocialProfileErrorBoundary>
  );
  
  WrappedComponent.displayName = `withSocialProfileErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default SocialProfileErrorBoundary;