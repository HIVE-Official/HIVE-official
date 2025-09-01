"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from "@hive/ui";
import { Alert as _Alert } from "@/components/temp-stubs";
import { logger } from '../../../../lib/logger';

interface SpaceErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface SpaceErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
  onError?: (error: Error, _errorInfo: React.ErrorInfo) => void;
}

class SpaceErrorBoundary extends React.Component<SpaceErrorBoundaryProps, SpaceErrorBoundaryState> {
  constructor(props: SpaceErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SpaceErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error with structured logging
    logger.error('Space Error Boundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      errorBoundary: 'SpaceErrorBoundary',
      spaceContext: 'space-loading'
    });
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            
            <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-3">
              Something went wrong
            </h2>
            
            <p className="text-neutral-400 mb-6 leading-relaxed">
              We encountered an error loading this space. This might be a temporary issue.
            </p>
            
            <div className="space-y-3">
              <Button
                className="w-full bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                onClick={this.resetError}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-white/[0.2] text-[var(--hive-text-inverse)] hover:bg-white/[0.1]"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 border-white/[0.2] text-[var(--hive-text-inverse)] hover:bg-white/[0.1]"
                  onClick={() => window.location.href = '/spaces'}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Browse Spaces
                </Button>
              </div>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-400">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier usage
export function SpaceErrorBoundaryWrapper({ 
  children, 
  fallback,
  onError 
}: SpaceErrorBoundaryProps) {
  return (
    <SpaceErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </SpaceErrorBoundary>
  );
}

export default SpaceErrorBoundary;